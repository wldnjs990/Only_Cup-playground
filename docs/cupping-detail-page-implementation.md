# 커핑 상세 페이지 구현 일지

## 작업 일자
2025-12-18

## 작업 개요
커핑 평가 완료 후 결과를 확인할 수 있는 상세 페이지를 구현했습니다. 로컬 스토리지를 활용한 데이터 저장/조회 시스템과 함께, 워드클라우드 및 스파이더 차트를 통한 시각화 기능을 추가했습니다.

---

## 주요 구현 사항

### 1. 로컬 스토리지 유틸리티 함수

**파일**: `src/utils/localStorage.ts`

커핑 평가 데이터를 로컬 스토리지에서 관리하는 유틸리티 함수 세트를 구현했습니다.

```typescript
// 제공하는 함수들
- saveCupping(data): 새 커핑 평가 저장
- getCuppingById(id): ID로 특정 커핑 조회
- getAllCuppings(): 전체 커핑 목록 조회
- updateCupping(id, data): 커핑 수정
- deleteCupping(id): 커핑 삭제
- clearAllCuppings(): 전체 삭제
```

**저장 데이터 구조**:
```typescript
{
  id: "cupping_1234567890",       // timestamp 기반 고유 ID
  createdAt: "2025-12-18T...",    // 생성 시간
  purposeValue: "basic",
  purposeLabel: "입문자",
  cuppings: [...]                 // 커핑 평가 데이터
}
```

---

### 2. 스키마 업데이트 (Value + Label 저장)

**파일**: `src/types/new/form_values_schema.ts`

사용자가 이해할 수 있는 label을 value와 함께 저장하도록 스키마를 확장했습니다.

#### 변경 사항

```typescript
// Before
const CategoryDetailValue = z.object({
  categoryValue: z.string(),
  intensity: z.string(),
  affectiveScore: z.number(),
  affectiveNote: z.string().optional(),
});

// After
const CategoryDetailValue = z.object({
  categoryValue: z.string(),     // 예: "aroma_floral_white_jasmine"
  categoryLabel: z.string(),     // 예: "자스민"
  intensity: z.string(),         // 예: "high"
  intensityLabel: z.string(),    // 예: "높음"
  affectiveScore: z.number(),
  affectiveNote: z.string().optional(),
});
```

**추가된 Label 필드**:
- `categoryLabel`: 카테고리 이름 (예: "자스민")
- `intensityLabel`: 강도 레이블 (예: "높음")
- `coffeeLabel`: 커피 이름 (예: "에티오피아 예가체프")
- `purposeLabel`: 목적 레이블 (예: "전문가")

#### 설계 근거

**Value + Label 함께 저장하는 이유**:
1. **이력 데이터 보존**: 카테고리가 삭제되어도 과거 평가는 원래 이름으로 표시
2. **동적 옵션 지원**: 서버/관리자가 카테고리를 추가/삭제해도 기존 데이터 안전
3. **매핑 테이블 불필요**: 수백 개의 카테고리를 클라이언트에서 관리할 필요 없음

**Value의 활용처**:
- 서버 통계 (가장 많이 선택된 향)
- 필터링 (특정 향이 포함된 커핑 검색)
- 추천 알고리즘 (비슷한 향 찾기)
- 데이터 무결성 (label 변경되어도 value는 동일)

---

### 3. 자동 Label 저장 구현

폼 컴포넌트에서 value 선택 시 자동으로 label도 함께 저장하도록 개선했습니다.

#### RadioInput & SelectInput

**파일**: `src/components/RadioInput.tsx`, `src/components/SelectInput.tsx`

```typescript
const handleValueChange = (value: string) => {
  // Value 저장
  setValue(path, value as PathValue<TFieldValues, typeof path>);

  // Label도 자동 저장 (path가 "intensity"면 "intensityLabel"에 저장)
  const selectedOption = optionList.find(opt => opt.value === value);
  if (selectedOption) {
    const labelPath = `${path}Label` as any;
    setValue(labelPath, selectedOption.label as PathValue<TFieldValues, typeof labelPath>);
  }
};
```

#### CategoryLeaf (카테고리 선택)

**파일**: `src/pages/new-form-test/components/CategoryLeaf.tsx`

```typescript
// Label도 함께 전달
<CategoryButton
  onClick={() => handleLeafNodeClick(idx, node.value, node.label)}
>
  {node.label}
</CategoryButton>
```

#### useCuppingEvaluation Hook

**파일**: `src/hooks/new/useCuppingEvaluation.ts`

```typescript
// 타입 업데이트
export type HandleLeafNodeClick = (
  selectedIdx: number,
  selectedValue: string,
  selectedLabel: string  // ← 추가
) => void;

// Label 저장
const handleLeafNodeClick: HandleLeafNodeClick = (selectedIdx, selectedValue, selectedLabel) => {
  // ...
  detailsAppend(createEmptyDetailValue(selectedValue, selectedLabel));
};
```

---

### 4. 커핑 상세 페이지 구현

**파일**: `src/pages/cupping-detail/index.tsx`

#### 주요 기능

1. **URL 파라미터로 데이터 조회**: `/cupping/:id`
2. **커피 정보 표시**: 커피명, 평가 목적
3. **차트 영역**: 스파이더 차트 + 워드클라우드
4. **감정 노트 편집**: affectiveNote 추가 작성 기능

```typescript
export default function CuppingDetail() {
  const { id } = useParams<{ id: string }>();
  const [cuppingData, setCuppingData] = useState<SavedCuppingData | null>(null);

  useEffect(() => {
    const data = getCuppingById(id);
    if (data) setCuppingData(data);
  }, [id]);

  // ...
}
```

---

### 5. 커스텀 워드클라우드 컴포넌트

**파일**: `src/pages/cupping-detail/components/CuppingWordCloud.tsx`

react-wordcloud가 React 19와 호환되지 않아 커스텀 구현했습니다.

#### 구현 기능

```typescript
// Intensity별 색상 매핑
const INTENSITY_COLORS: Record<string, string> = {
  very_weak: '#E0F2FE',   // sky-100
  weak: '#BAE6FD',        // sky-200
  moderate: '#7DD3FC',    // sky-300
  strong: '#38BDF8',      // sky-400
  very_strong: '#0EA5E9', // sky-500
};

// affectiveScore → 폰트 크기 (16-48px)
const fontSize = 16 + (detail.affectiveScore / 9) * 32;
```

**주요 특징**:
- ✅ Intensity 값에 따라 색상 변경 (밝음 → 진함)
- ✅ AffectiveScore 값에 따라 글씨 크기 결정
- ✅ 점수 높은 순으로 정렬
- ✅ 호버 시 확대 애니메이션
- ✅ 툴팁으로 점수/강도 표시
- ✅ 배경색으로 intensity 시각화 (투명도 20%)

---

### 6. 스파이더 차트 컴포넌트

**파일**: `src/pages/cupping-detail/components/CuppingSpiderChart.tsx`

Recharts 라이브러리를 사용한 스파이더 차트 구현.

#### 구현 로직

```typescript
// 각 평가 항목(향, 맛, 산미, 단맛, 마우스필)의 affectiveScore 평균 계산
const chartData = cupping.evaluations.map((evaluation) => {
  const scores = evaluation.details.map((detail) => detail.affectiveScore);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  return {
    category: CATEGORY_LABELS[evaluation.categoryName],
    score: Math.round(average * 10) / 10,  // 소수점 1자리
  };
});
```

**표시 항목**:
- 향 (aroma)
- 맛 (taste)
- 산미 (acidity)
- 단맛 (sweetness)
- 마우스필 (mouthfeel)

---

### 7. 감정 노트 편집 컴포넌트

**파일**: `src/pages/cupping-detail/components/AffectiveNoteEditor.tsx`

카테고리별 affectiveNote를 추가 작성할 수 있는 편집기.

#### 주요 기능

```typescript
const [editingDetails, setEditingDetails] = useState(details);
const [isEditing, setIsEditing] = useState(false);

const handleNoteChange = (index: number, note: string) => {
  const updated = [...editingDetails];
  updated[index] = { ...updated[index], affectiveNote: note };
  setEditingDetails(updated);
};

const handleSave = () => {
  onSave(editingDetails);  // 부모 컴포넌트로 전달
  setIsEditing(false);
};
```

**표시 정보**:
- 카테고리 레이블 (예: "자스민")
- 강도 레이블 (예: "높음")
- 점수 (0-9)
- 감정 노트 (편집 가능)

---

### 8. 라우팅 설정

**파일**: `src/App.tsx`

```typescript
import CuppingDetail from './pages/cupping-detail';

<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<FormTest />} />
    <Route path="/new" element={<NewFormTest />} />
    <Route path="/cupping/:id" element={<CuppingDetail />} />  {/* 추가 */}
  </Route>
</Routes>
```

---

### 9. 평가 완료 후 자동 리다이렉트

**파일**: `src/pages/new-form-test/index.tsx`

```typescript
import { useNavigate } from 'react-router-dom';
import { saveCupping } from '@/utils/localStorage';

const navigate = useNavigate();

const onSubmit: SubmitHandler<RootCuppingFormValue> = (data) => {
  try {
    // 로컬 스토리지에 저장
    const savedData = saveCupping(data);

    console.log('커핑 평가 저장 완료:', savedData);

    // 상세 페이지로 즉시 이동
    navigate(`/cupping/${savedData.id}`);
  } catch (error) {
    console.error('저장 실패:', error);
    alert('저장에 실패했습니다. 다시 시도해주세요.');
  }
};
```

**플로우**:
1. 커핑 평가 완료
2. 로컬 스토리지에 저장 (ID 자동 생성)
3. 상세 페이지로 즉시 리다이렉트 (`/cupping/{id}`)
4. 저장된 데이터로 UI 렌더링

---

## 설치된 라이브러리

### Recharts (차트 라이브러리)

```bash
pnpm add recharts
```

**사용 이유**: 스파이더 차트 구현을 위해 선택. React 19와 호환되며, 커스터마이징이 용이함.

### react-wordcloud (제거됨)

```bash
pnpm remove react-wordcloud d3-cloud @types/d3-cloud
```

**제거 이유**: React 16을 요구하여 React 19와 호환되지 않음. 커스텀 워드클라우드로 대체.

---

## 데이터 흐름

### 1. 평가 작성 → 저장

```
사용자 입력
  ↓
RadioInput/SelectInput (자동으로 value + label 저장)
  ↓
CategoryLeaf (카테고리 value + label 저장)
  ↓
onSubmit (평가 완료)
  ↓
saveCupping() (로컬 스토리지 저장 + ID 생성)
  ↓
navigate(/cupping/:id) (상세 페이지 이동)
```

### 2. 상세 페이지 조회

```
/cupping/:id 접속
  ↓
getCuppingById(id) (로컬 스토리지 조회)
  ↓
데이터 렌더링
  ├─ 커피 정보 (coffeeLabel, purposeLabel)
  ├─ 스파이더 차트 (카테고리별 평균 점수)
  ├─ 워드클라우드 (categoryLabel, intensity 색상, score 크기)
  └─ 감정 노트 편집 (affectiveNote)
```

### 3. 감정 노트 수정

```
편집 버튼 클릭
  ↓
affectiveNote 입력
  ↓
저장 버튼 클릭
  ↓
updateCupping(id, updatedDetails) (로컬 스토리지 업데이트)
  ↓
UI 갱신
```

---

## 파일 구조

```
src/
├── utils/
│   └── localStorage.ts                           # 로컬 스토리지 유틸
│
├── types/new/
│   └── form_values_schema.ts                     # 스키마 (Label 필드 추가)
│
├── constants/new/
│   ├── form_values_mock.ts                       # Mock 데이터 (Label 포함)
│   └── label_mappings.ts                         # Intensity/Category 레이블 매핑
│
├── components/
│   ├── RadioInput.tsx                            # 자동 Label 저장
│   └── SelectInput.tsx                           # 자동 Label 저장
│
├── pages/
│   ├── new-form-test/
│   │   ├── index.tsx                             # onSubmit → navigate
│   │   └── components/
│   │       └── CategoryLeaf.tsx                  # Label 전달
│   │
│   └── cupping-detail/
│       ├── index.tsx                             # 메인 상세 페이지
│       └── components/
│           ├── CuppingWordCloud.tsx              # 커스텀 워드클라우드
│           ├── CuppingSpiderChart.tsx            # 스파이더 차트
│           └── AffectiveNoteEditor.tsx           # 감정 노트 편집기
│
├── hooks/new/
│   └── useCuppingEvaluation.ts                   # Label 저장 로직
│
└── App.tsx                                        # 라우팅 추가
```

---

## 디자인 레퍼런스

사용자가 제공한 이미지를 기반으로 레이아웃 설계:

```
┌─────────────────────────────────────────────────┐
│  커핑 평가 상세           [목록으로]             │
│  2025-12-18 14:30                               │
├─────────────────────────────────────────────────┤
│  커피 정보                                       │
│  커피: 에티오피아 예가체프                      │
│  평가 목적: 전문가                              │
├──────────────────────┬──────────────────────────┤
│  커핑 평가 종합       │  커핑 워드클라우드       │
│  (스파이더 차트)      │  자스민 레몬 초콜릿...   │
│                      │                          │
├──────────────────────┴──────────────────────────┤
│  감정 노트                              [편집]  │
│  ┌─────────────────────────────────────────┐   │
│  │ 자스민 (강도: 높음 / 점수: 8)           │   │
│  │ 자스민 향이 강하게 느껴집니다           │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## 성능 최적화

### 1. Fallback 처리

기존 데이터 호환성을 위해 label이 없을 경우 value를 사용:

```typescript
{detail.categoryLabel || detail.categoryValue}
{detail.intensityLabel || INTENSITY_LABELS[detail.intensity] || detail.intensity}
```

### 2. 에러 처리

```typescript
// 로컬 스토리지 조회 실패 시
if (!data) {
  alert('커핑 데이터를 찾을 수 없습니다.');
  navigate('/new');
  return;
}

// 저장 실패 시
try {
  saveCupping(data);
} catch (error) {
  alert('저장에 실패했습니다. 다시 시도해주세요.');
}
```

---

## 향후 작업 계획

### 1. 페이지네이션 (TODO)

현재는 0번째 커핑만 표시. 여러 커핑 간 이동 기능 추가 필요:

```typescript
const [currentCuppingIndex, setCurrentCuppingIndex] = useState(0);

// 페이지네이션 UI
<div>
  <button onClick={() => setCurrentCuppingIndex(prev => prev - 1)}>이전</button>
  <span>{currentCuppingIndex + 1} / {cuppingData.cuppings.length}</span>
  <button onClick={() => setCurrentCuppingIndex(prev => prev + 1)}>다음</button>
</div>
```

### 2. 워드클라우드 라이브러리 리팩토링

현재 커스텀 구현을 React 19 호환 라이브러리로 교체 검토:
- `@visx/wordcloud`
- `react-d3-cloud` (업데이트 버전)

### 3. 스파이더 차트 개선

- 카테고리별 색상 차별화
- 애니메이션 추가
- 툴팁 개선

### 4. 디자인 개선

- 반응형 레이아웃 최적화
- 다크 모드 지원
- 애니메이션 효과

### 5. 커핑 목록 페이지

전체 커핑 평가 목록을 보여주는 페이지 추가:
- 날짜별 정렬
- 검색/필터링
- 카드 형태 레이아웃

---

## 학습 포인트

### 1. Value + Label 설계 패턴

**언제 사용하나?**
- ✅ 동적 옵션 (사용자/관리자가 추가/삭제 가능)
- ✅ 대량 옵션 (수백 개 이상)
- ✅ 이력 데이터 (과거 데이터 보존 중요)

**언제 사용하지 않나?**
- ❌ 정적 옵션 (성별, 결제수단 등)
- ❌ 소량 옵션 (10개 미만)
- ❌ 다국어 지원 (i18n 사용)

### 2. 로컬 스토리지 vs 서버 저장

**로컬 스토리지 장점**:
- 빠른 프로토타이핑
- 서버 없이 작동
- 오프라인 지원

**서버 저장 장점**:
- 디바이스 간 동기화
- 백업/복구
- 데이터 분석

### 3. React 19 호환성

`react-wordcloud` 같은 구형 라이브러리는 React 19와 호환되지 않을 수 있음.
→ 최신 라이브러리 선택 또는 커스텀 구현 필요

---

## 참고 자료

### 관련 문서
- [Performance Optimization Refactoring](./performance-optimization-refactoring.md)
- [React Hook Form Field Error Handling](./react-hook-form-field-error-handling.md)
- [Schema Separation Guide](./schema-separation-guide.md)

### 공식 문서
- [Recharts Documentation](https://recharts.org/)
- [React Router v7](https://reactrouter.com/)
- [Zod Schema Validation](https://zod.dev/)

---

## 작업자 노트

이번 구현의 핵심은 **"데이터 자체 완결성"**입니다.

저장된 데이터만으로 UI를 완전히 렌더링할 수 있도록 value와 label을 함께 저장했습니다. 이는:
1. 카테고리 변경에 강건함
2. 매핑 테이블 관리 부담 없음
3. 과거 데이터 안전성 보장

특히 커핑 평가처럼 **이력이 중요한 도메인**에서는 이 패턴이 필수적입니다.

다국어 지원이 필요하다면 value만 저장하고 i18n을 사용하는 것이 더 효율적이지만, 단일 언어 서비스에서는 현재 방식(Value + Label)이 최적입니다.
