# 왜 Config와 Values를 분리해야 하는가?

## 📌 핵심 질문

> "전송해야 하는 데이터가 바뀌는 경우엔, 서버 개발자와 소통하면서 프론트 코드를 수정해야 하는건가요?"

**답: 두 가지 경우로 나뉩니다!**

### 1️⃣ Config 변경 (UI 옵션/설정) → 재배포 불필요
- **예시**: 원두 옵션 추가, 번역 수정, 평가 항목 변경
- **방법**: 서버 DB/API만 수정
- **결과**: 프론트 코드 수정 없음, 관리자가 직접 수정 가능

### 2️⃣ Values 구조 변경 (데이터 스키마) → 협의 필요
- **예시**: `coffeeId` 필드 추가, 새 데이터 구조 설계
- **방법**: 프론트-백 협의 후 양쪽 코드 수정
- **이유**: API 명세 변경이므로 당연히 양쪽 수정 필요

---

## 🎯 핵심 개념: 데이터 vs 메타데이터

### 데이터 (Values)
- **의미**: 사용자가 입력한 실제 값
- **예시**: "에티오피아 예가체프 선택", "향 강도 8점"
- **변경 빈도**: 매번 (사용자가 입력할 때마다)
- **관리 주체**: 클라이언트 (RHF)

### 메타데이터 (Config)
- **의미**: 데이터를 입력받기 위한 설정
- **예시**: "원두 선택 옵션 목록", "향 강도는 0~10점"
- **변경 빈도**: 드물게 (비즈니스 요구사항 변경 시)
- **관리 주체**: 서버 (DB/API)

---

## 💡 시나리오별 비교

### 시나리오 1: 원두 옵션 추가

**상황**: 사장님이 "브라질 산토스" 원두를 새로 추가하고 싶어함

#### ❌ 분리 안 했을 때 (기존 방식)

```typescript
// 프론트 코드 수정 필요!
const coffeeOptions = [
  { id: 1, label: '에티오피아 예가체프', value: 'ethiopia' },
  { id: 2, label: '콜롬비아 수프리모', value: 'colombia' },
  // 프론트 개발자가 직접 추가해야 함
  { id: 3, label: '브라질 산토스', value: 'brazil' },  // ← 코드 수정
];
```

**문제점**:
1. 프론트 개발자가 코드 수정해야 함
2. 재배포 필요
3. 사장님이 직접 추가 못함

#### ✅ 분리 했을 때 (권장 방식)

```typescript
// 프론트 코드는 그대로!
function CoffeeSelector() {
  const config = useFormConfig();
  const { watch, setValue } = useFormContext();

  return (
    <Select
      options={config.cuppingForm.basicInfo.coffeeSelect.optionList}
      // ↑ 서버에서 받아온 옵션들 (동적)
      value={watch('coffeeId')}
      onChange={(v) => setValue('coffeeId', v)}
    />
  );
}
```

**서버에서만 변경**:
```sql
-- DB에 데이터만 추가
INSERT INTO coffee_options (label, value)
VALUES ('브라질 산토스', 'brazil');
```

**결과**:
1. 프론트 코드 수정 없음
2. 재배포 불필요
3. 관리자 페이지로 사장님이 직접 추가 가능!

---

### 시나리오 2: 평가 항목 변경

**상황**: "단맛" 평가를 없애고 "쓴맛" 평가를 추가하고 싶음

#### ❌ 분리 안 했을 때

```typescript
// 프론트 코드 대규모 수정 필요!
const evaluations = [
  { name: 'aroma', label: '향', ... },
  { name: 'taste', label: '맛', ... },
  { name: 'acidity', label: '산미', ... },
  // { name: 'sweetness', label: '단맛', ... },  // 삭제
  { name: 'bitterness', label: '쓴맛', ... },    // 추가 → 코드 수정
];

// Zod 스키마도 수정!
const CategoryName = z.enum([
  'aroma', 'taste', 'acidity',
  // 'sweetness',  // 삭제
  'bitterness'     // 추가 → 타입 수정
]);

// 컴포넌트도 수정!
// cascaderTree.sweetness → cascaderTree.bitterness
```

**문제점**:
1. 여러 파일 수정 (타입, 컴포넌트, mock 데이터 등)
2. 휴먼 에러 가능성
3. 재배포 필수

#### ✅ 분리 했을 때

```typescript
// 프론트 코드는 그대로!
function EvaluationList() {
  const config = useFormConfig();

  return (
    <div>
      {config.cuppingForm.evaluations.map((evalConfig, idx) => (
        // ↑ 서버에서 받아온 평가 목록 (동적)
        <EvaluationSection key={evalConfig.id} config={evalConfig} idx={idx} />
      ))}
    </div>
  );
}
```

**서버에서만 변경**:
```sql
-- DB에서 삭제/추가
DELETE FROM evaluation_categories WHERE name = 'sweetness';
INSERT INTO evaluation_categories (name, label, order)
VALUES ('bitterness', '쓴맛', 4);
```

**결과**:
1. 프론트 코드 수정 없음
2. 타입 안전성 유지 (서버가 보내는 게 맞다고 가정)
3. 유연한 비즈니스 로직 변경

---

### 시나리오 3: 다국어 지원

**상황**: 한국어/영어/일본어 지원

#### ❌ 분리 안 했을 때

```typescript
// 프론트에 모든 번역 하드코딩
const translations = {
  ko: { coffeeLabel: '원두 선택', purposeLabel: '목적', ... },
  en: { coffeeLabel: 'Select Coffee', purposeLabel: 'Purpose', ... },
  ja: { coffeeLabel: 'コーヒーを選択', purposeLabel: '目的', ... },
};

// 언어별로 분기 처리
const label = translations[currentLang].coffeeLabel;
```

**문제점**:
1. 번역 추가/수정할 때마다 재배포
2. 번역가가 직접 수정 불가
3. 번역 누락 가능성

#### ✅ 분리 했을 때

```typescript
// 프론트 코드는 그대로!
function CoffeeSelector() {
  const config = useFormConfig(); // 현재 언어에 맞는 Config

  return (
    <Select
      label={config.cuppingForm.basicInfo.coffeeSelect.label}
      // ↑ 서버에서 현재 언어로 번역된 label 받음
    />
  );
}
```

**서버 API**:
```typescript
GET /api/cupping/form-config?lang=ko
// 응답: { label: "원두 선택", ... }

GET /api/cupping/form-config?lang=en
// 응답: { label: "Select Coffee", ... }
```

**결과**:
1. 번역 관리 DB/CMS에서 가능
2. 번역가가 관리자 페이지에서 직접 수정
3. 재배포 불필요

---

## 🔧 데이터 구조가 바뀔 때

### 질문: "전송 데이터가 바뀌면?"

**상황**: 기존에는 `coffeeId`만 전송했는데, 이제 `roastLevel`도 추가하고 싶음

#### Before (기존)
```typescript
// Values 스키마
{
  coffeeId: "ethiopia"
}

// 서버 제출
POST /api/cupping
{
  coffeeId: "ethiopia"
}
```

#### After (변경)
```typescript
// 1. Values 스키마 수정 (프론트)
const CuppingFormValue = z.object({
  coffeeId: z.string(),
  roastLevel: z.string(),  // ← 추가
});

// 2. Config 스키마에 UI 추가 (서버)
{
  basicInfo: {
    coffeeSelect: { ... },
    roastLevelSelect: {      // ← 서버가 추가
      label: "로스팅 단계",
      optionList: [
        { id: 1, label: "라이트", value: "light" },
        { id: 2, label: "미디엄", value: "medium" },
        { id: 3, label: "다크", value: "dark" }
      ]
    }
  }
}

// 3. 컴포넌트는 동적 렌더링 (수정 최소화)
function BasicInfoSection() {
  const config = useFormConfig();

  return (
    <div>
      {/* 기존 */}
      <Select {...config.basicInfo.coffeeSelect} path="coffeeId" />

      {/* 서버에 roastLevelSelect가 있으면 자동 렌더링 */}
      {config.basicInfo.roastLevelSelect && (
        <Select {...config.basicInfo.roastLevelSelect} path="roastLevel" />
      )}
    </div>
  );
}
```

**포인트**:
1. **프론트**: Values 타입만 수정 (필드 추가)
2. **서버**: Config API에 UI 설정 추가
3. **계약**: 프론트-백 간 Values 타입 합의 필요 (당연함!)

---

## 📊 관심사 분리 (Separation of Concerns)

### 개념

```
┌─────────────────────────────────────────┐
│            비즈니스 로직               │
│   (어떤 데이터를 받을지 결정)           │
│                                         │
│  - 원두 옵션 관리                      │
│  - 평가 카테고리 구성                  │
│  - 다국어 번역                         │
│                                         │
│  ↓ 서버가 관리 (DB/API)                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│             표현 로직                  │
│   (어떻게 보여줄지 결정)                │
│                                         │
│  - 컴포넌트 구조                       │
│  - CSS 스타일                          │
│  - 애니메이션                          │
│  - 반응형 레이아웃                     │
│                                         │
│  ↓ 프론트가 관리 (React/CSS)           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│             상태 관리                  │
│   (사용자 입력 추적)                    │
│                                         │
│  - 폼 값 저장                          │
│  - 유효성 검사                         │
│  - 에러 처리                           │
│                                         │
│  ↓ 프론트가 관리 (RHF/Zod)             │
└─────────────────────────────────────────┘
```

---

## 🎓 판단 기준

### Config (서버 관리)로 분리할 것

다음 조건 중 **하나라도** 해당되면 Config로 관리:

1. **변경 가능성**
   - "원두 옵션이 추가될 수 있나요?" → YES → Config
   - "평가 항목이 바뀔 수 있나요?" → YES → Config

2. **권한**
   - "사장님/관리자가 직접 수정할 수 있어야 하나요?" → YES → Config
   - "마케팅팀이 문구를 바꿀 수 있어야 하나요?" → YES → Config

3. **다국어**
   - "번역이 필요한가요?" → YES → Config

4. **환경별 차이**
   - "개발/스테이징/프로덕션에서 다를 수 있나요?" → YES → Config

5. **A/B 테스트**
   - "사용자 그룹별로 다르게 보일 수 있나요?" → YES → Config

### Values (클라이언트 관리)로 유지할 것

1. **사용자 입력**
   - 모든 사용자 입력값은 Values

2. **임시 상태**
   - 드로어 열림/닫힘 같은 UI 상태

### 하드코딩 (프론트 코드)으로 유지할 것

1. **절대 변하지 않는 것**
   - 컴포넌트 구조
   - CSS 클래스 매핑 로직

2. **프론트 관심사**
   - 애니메이션 duration
   - 레이아웃 breakpoint

---

## 🏗️ 실전 적용 가이드

### 새 프로젝트 시작 시

#### Step 1: 데이터 모델링

```
질문: 이 폼에서 어떤 데이터를 수집하는가?

답변 예시:
- 사용자 이름
- 이메일
- 관심사 (다중 선택)
- 선호도 (1-10점)
```

#### Step 2: Config/Values 구분

| 데이터 | Config? | Values? | 이유 |
|--------|---------|---------|------|
| 이름 label | ✅ | ❌ | "이름"이 "성함"으로 바뀔 수 있음 |
| 이름 값 | ❌ | ✅ | 사용자 입력 |
| 관심사 옵션 | ✅ | ❌ | 새 옵션 추가 가능 |
| 선택된 관심사 | ❌ | ✅ | 사용자 선택 |
| 선호도 범위 (1-10) | ✅ | ❌ | 0-5로 바뀔 수 있음 |
| 선호도 값 | ❌ | ✅ | 사용자 입력 |

#### Step 3: 타입 정의

```typescript
// 1. Values 타입 (서버와 계약)
type FormValues = {
  name: string;
  email: string;
  interests: string[];  // 선택된 옵션들의 value
  preference: number;
};

// 2. Config 타입 (서버가 보낼 UI 설정)
type FormConfig = {
  nameField: {
    label: string;
    placeholder: string;
  };
  interestsField: {
    label: string;
    options: Array<{ id: number; label: string; value: string }>;
  };
  preferenceField: {
    label: string;
    min: number;
    max: number;
  };
};
```

#### Step 4: 서버 협의

```typescript
// API 명세서 작성
GET /api/form/config
// 응답: FormConfig 타입

POST /api/form/submit
// 요청: FormValues 타입
```

---

## 📈 장점 정리

### 1. 유연성 (Flexibility)

```
프로덕트 오너: "다음 주부터 원두 5개 추가해야 해요"
개발자: "서버 DB에만 추가하면 됩니다. 재배포 불필요합니다."
```

### 2. 확장성 (Scalability)

```
CEO: "일본 시장 진출합니다. 일본어 지원해주세요"
개발자: "번역만 추가하면 됩니다. 코드 수정 없습니다."
```

### 3. 유지보수성 (Maintainability)

```
마케팅: "이 문구 'A'를 'B'로 바꿔주세요"
개발자: "관리자 페이지에서 직접 수정하세요."
```

### 4. 테스트 용이성 (Testability)

```typescript
// Config mock만 바꿔서 다양한 시나리오 테스트
const testConfig1 = { options: [옵션2개] };
const testConfig2 = { options: [옵션100개] };

<FormComponent config={testConfig1} />  // 적은 옵션 테스트
<FormComponent config={testConfig2} />  // 많은 옵션 테스트
```

---

## 🚫 흔한 오해

### 오해 1: "분리하면 코드가 복잡해진다"

**반박**:
- 초기 설정은 조금 더 많지만
- 장기적으로는 훨씬 단순함
- 변경 시 수정 범위가 명확함

### 오해 2: "작은 프로젝트에는 과하다"

**반박**:
```typescript
// "작은" 프로젝트도 이런 요구사항 나옴:
"여기 문구 바꿔주세요"          // ← Config 분리했으면 쉬움
"옵션 하나만 추가해주세요"      // ← Config 분리했으면 쉬움
"영어도 지원해야 해요"          // ← Config 분리했으면 쉬움
```

### 오해 3: "서버 개발자 부담이 늘어난다"

**반박**:
- Config API는 한 번만 만들면 됨
- CRUD 자동화 가능 (Admin 페이지)
- 프론트 요청("이거 수정해주세요")이 줄어듦

---

## 🎯 언제 분리하지 않아도 되는가?

### 예외 상황

1. **정말 절대 안 바뀌는 것**
   ```typescript
   // OK: 하드코딩
   const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];
   ```

2. **프로토타입/MVP**
   - 빠른 검증이 목표
   - 나중에 리팩토링 예정

3. **내부 도구**
   - 사용자 1~2명
   - 개발자가 직접 사용

---

## 💼 실무 사례

### Case 1: 쿠팡 이츠 - 메뉴 옵션

```typescript
// Config: 서버 관리
{
  menuOptions: [
    { id: 1, label: "맵기 선택", type: "radio", options: [...] },
    { id: 2, label: "토핑 추가", type: "checkbox", options: [...] }
  ]
}

// 사장님이 관리자 페이지에서:
// - "곱빼기 옵션" 추가
// - "맵기" → "매운맛" 으로 변경
// ↑ 프론트 재배포 없이 즉시 반영
```

### Case 2: 배달의민족 - 주문 폼

```typescript
// Config: 서버 관리
{
  deliveryTimeOptions: [
    { label: "빠른 배달 (30분)", value: "fast" },
    { label: "예약 배달", value: "scheduled" }
  ]
}

// 코로나 시기: "비대면 배달" 옵션 추가
// ↑ DB 추가만으로 전국 모든 앱에 즉시 반영
```

### Case 3: 토스 - 금융 상품 신청

```typescript
// Config: 서버 관리
{
  requiredDocuments: [
    { id: 1, label: "신분증", type: "image" },
    { id: 2, label: "소득증명서", type: "pdf" }
  ]
}

// 법 개정: "재직증명서" 추가 필요
// ↑ 서버 설정만 변경, 앱 업데이트 불필요
```

---

## 🔑 핵심 원칙

### 1. 데이터 소유권 (Data Ownership)

```
누가 이 데이터를 "소유"하는가?

- 사용자 입력 → 클라이언트 (Values)
- 비즈니스 규칙 → 서버 (Config)
- UI 로직 → 클라이언트 (Component)
```

### 2. 변경 주체 (Change Authority)

```
누가 이것을 변경할 권한이 있는가?

- 개발자만 → 하드코딩 OK
- 관리자/사장님 → Config (서버)
- 사용자 → Values (RHF)
```

### 3. 변경 빈도 (Change Frequency)

```
얼마나 자주 바뀌는가?

- 매 입력마다 → Values
- 가끔 (월 1회~) → Config
- 거의 안 바뀜 → 하드코딩
```

---

## 📚 참고 자료

### 관련 디자인 패턴

1. **Configuration Pattern**
   - 설정을 코드에서 분리
   - 런타임에 동적으로 로드

2. **Strategy Pattern**
   - 알고리즘(UI 구성)을 런타임에 선택
   - Config가 전략을 정의

3. **Data-Driven UI**
   - 데이터가 UI 구조를 결정
   - 선언적 UI 렌더링

### 학습 키워드

- Content Management System (CMS)
- Backend-Driven UI (BDUI)
- Server-Driven UI (SDUI)
- Dynamic Forms
- Headless CMS

---

## ✅ 체크리스트: Config 분리가 필요한가?

프로젝트 시작 시 다음 질문에 답하세요:

- [ ] 옵션/선택지가 추가될 가능성이 있는가?
- [ ] 비개발자(관리자)가 내용을 수정해야 하는가?
- [ ] 다국어 지원이 필요한가?
- [ ] 환경(dev/prod)별로 다른 설정이 필요한가?
- [ ] A/B 테스트나 점진적 배포가 예상되는가?
- [ ] 재배포 없이 내용 변경이 필요한가?

**3개 이상 YES** → Config 분리 강력 권장
**1~2개 YES** → Config 분리 고려
**모두 NO** → 하드코딩도 괜찮음

---

---

## 🔍 심화 학습: 왜 Values는 프론트가 관리하나?

### 질문: "RHF Values 스키마도 서버에서 보내주면 안 되나요?"

**답: 가능하지만 권장하지 않습니다.** 이유는 다음과 같습니다:

### 이유 1: 타입 안전성 상실

```typescript
// ❌ 서버에서 Values 스키마를 보내면?
GET /api/form/values-schema
{
  fields: [
    { name: "coffeeId", type: "string", required: true },
    { name: "score", type: "number", min: 0, max: 10 }
  ]
}

// 프론트에서 동적으로 Zod 생성
const schema = buildSchemaFromServer(serverSchema);
// → 타입이 any가 되어 타입 안전성 상실!

const formData = form.getValues(); // any 타입
formData.coffeeId; // 자동완성 안 됨, 오타 감지 불가
```

```typescript
// ✅ 프론트에서 Values 스키마를 정의
const FormValues = z.object({
  coffeeId: z.string().min(1),
  score: z.number().min(0).max(10)
});

type FormValues = z.infer<typeof FormValues>;
// → 완벽한 타입 안전성!

const formData = form.getValues(); // FormValues 타입
formData.coffeeId; // 자동완성 가능, 오타 즉시 감지
```

### 이유 2: 어차피 UI 컴포넌트는 수정해야 함

**시나리오**: `roastLevel` 필드 추가

```typescript
// Case A: 서버가 Values 스키마를 보내준다면?
const serverSchema = await fetch('/api/form/values-schema');
const FormSchema = buildZodFromServer(serverSchema);
// ↓
// 문제: UI 컴포넌트는 여전히 수동으로 추가해야 함!
<Select path="roastLevel" /> // ← 이건 누가 추가하나?

// Case B: 프론트가 Values 스키마를 관리한다면?
const FormValues = z.object({
  coffeeId: z.string(),
  roastLevel: z.string(), // ← 추가
});
// ↓
<Select path="roastLevel" /> // ← 함께 추가

// 결론: 어차피 프론트 수정 필요 → 타입 안전한 쪽 선택!
```

### 이유 3: 계약(Contract)의 명확성

```typescript
// Values 스키마 = 프론트-백 간의 계약서

// 프론트 Values 타입
type CuppingFormValue = {
  coffeeId: string;
  score: number;
}

// 백엔드 DTO
class CuppingRequest {
  String coffeeId;
  Integer score;
}

// ↑ 이 둘이 일치해야 함 = API 계약
// 변경 시 양쪽 개발자 협의 필요 (당연함!)
```

**핵심**:
- Config는 "비즈니스 로직" → 서버가 독립적으로 관리
- Values는 "API 계약" → 양쪽이 명시적으로 합의하고 관리

### 이유 4: 개발자 편의성

```typescript
// 서버가 Values 스키마를 보내도:
// 1. 프론트는 여전히 UI 컴포넌트 추가/수정 필요
// 2. 타입 안전성 없음 (any 타입)
// 3. 오히려 복잡도만 증가

// 프론트가 Values 스키마를 관리하면:
// 1. 타입 안전성 보장
// 2. 컴파일 타임 에러 감지
// 3. IDE 자동완성 지원
// 4. 리팩토링 안전
```

---

## 📊 Config vs Values 완벽 비교표

| 구분 | Config (서버 관리) | Values (프론트 관리) |
|------|-------------------|---------------------|
| **의미** | "어떤 UI를 보여줄까?" | "어떤 데이터를 보낼까?" |
| **예시** | 원두 옵션 목록, label 문구 | 선택한 원두 ID, 입력한 점수 |
| **변경 이유** | 비즈니스 요구사항 변경 | API 스펙 변경 |
| **변경 주체** | 비개발자(관리자) 가능 | 개발자 필수 |
| **변경 시** | 서버만 수정 (재배포 X) | 양쪽 협의 후 수정 (재배포 O) |
| **타입 안전성** | 덜 중요 (UI 렌더링만) | 매우 중요 (데이터 전송) |
| **변경 빈도** | 자주 (주 1회~월 1회) | 드물게 (기능 추가 시) |
| **관리 방식** | DB/Admin 페이지 | TypeScript 코드 |

### 언제 재배포가 필요한가?

```
✅ 재배포 불필요 (Config 변경):
- 원두 옵션 추가/삭제
- 번역 문구 수정
- tooltip 내용 변경
- 옵션 순서 변경
- 평가 항목 추가/삭제 (Values 구조 잘 설계했다면)
→ 서버 DB만 수정

⚠️ 재배포 필요 (Values 구조 변경):
- 새 필드 추가 (roastLevel)
- 데이터 타입 변경 (string → number)
- 필수/선택 옵션 변경
- 폼 전체 구조 변경
→ 프론트-백 협의 후 양쪽 수정
```

---

## 💡 실전 예시: 평가 항목 추가

**요구사항**: "쓴맛" 평가 항목 추가

### Values 구조를 잘 설계했다면?

```typescript
// Values 스키마 (변경 불필요!)
const EvaluationValue = z.object({
  categoryName: CategoryName, // enum이지만 동적으로 처리
  selectedCategories: z.array(z.string()),
  details: z.array(CategoryDetailValue)
});

// Config만 변경 (서버)
INSERT INTO evaluations (name, label, order)
VALUES ('bitterness', '쓴맛', 6);

// 프론트 컴포넌트 (자동 렌더링)
{config.evaluations.map(evalConfig => (
  <EvaluationSection key={evalConfig.id} config={evalConfig} />
  // ↑ bitterness도 자동으로 렌더링됨!
))}

// 결과: 프론트 코드 수정 없음!
```

### Values 구조를 잘못 설계했다면?

```typescript
// ❌ 나쁜 설계: 하드코딩
const FormValues = z.object({
  aroma: z.object({...}),
  taste: z.object({...}),
  acidity: z.object({...}),
  sweetness: z.object({...}),
  // bitterness를 추가하려면? → 타입 수정 필요!
});

// 결과: Config 변경인데도 프론트 재배포 필요 😢
```

**교훈**: Values 스키마를 확장 가능하게 설계하면 Config 변경 시에도 유연!

---

## 🎯 레스토랑 비유로 완벽 이해

```
Config (서버) = 메뉴판
- "오늘의 메뉴" (동적으로 변경)
- 메뉴 가격, 설명
- 주방장이 관리
- 손님은 메뉴판만 보고 주문

Values (프론트) = 주문서 양식
- "메뉴 번호: ____"
- "수량: ____"
- "특이사항: ____"
- 시스템 설계자가 만듦
- 양식 자체는 잘 안 바뀜

UI 구조 (프론트) = 주문 방식
- 테이블 주문? 키오스크? 앱?
- UX 디자이너가 설계
```

**시나리오**:

1. **메뉴 추가** (김치찌개):
   - 메뉴판(Config)만 수정 → 즉시 반영
   - 주문서 양식(Values) 변경 불필요

2. **주문서 항목 추가** (알레르기 정보):
   - 주문서(Values) 수정 → 홀/주방 협의 필요
   - 시스템 전체 영향

---

## 🎬 결론

### Config와 Values 분리의 핵심

✅ **Config (서버)**: 재배포 없이 비즈니스 로직 변경
✅ **Values (프론트)**: 타입 안전성을 가진 API 계약
✅ **분리 이유**: 변경 주체와 빈도가 다름
✅ **적용 효과**: 배포 횟수 감소, 유지보수성 증가

### 다음 프로젝트에서는...

1. **기획 단계**: "이게 나중에 바뀔 수 있나?" → Config
2. **설계 단계**: Values 스키마를 확장 가능하게 설계
3. **개발 단계**: Config는 동적 렌더링, Values는 타입 안전하게
4. **운영 단계**: Config 변경은 관리자 페이지에서, Values 변경은 신중히

### 핵심 기억 포인트

```
Config 변경: "원두 추가" → 재배포 X (서버만)
Values 변경: "필드 추가" → 재배포 O (양쪽 협의)

Config는 "콘텐츠" → 자주 바뀜 → 서버가 관리
Values는 "구조" → 드물게 바뀜 → 프론트가 타입 안전하게 관리
```

---

**작성일**: 2025-12-15
**버전**: 1.1 (심화 학습 추가)
**최종 수정**: 2025-12-15

**관련 문서**:
- [schema-separation-guide.md](./schema-separation-guide.md)
- [src/types/new/README.md](../src/types/new/README.md)
- [src/types/new/form_values_schema.ts](../src/types/new/form_values_schema.ts)
- [src/types/new/server_config_schema.ts](../src/types/new/server_config_schema.ts)
