# 커핑 폼 스키마 리팩토링 작업 컨텍스트

## 📋 프로젝트 개요

React Hook Form + Zod를 사용한 커피 커핑 평가 폼의 스키마 구조를 **Config(UI 메타데이터)**와 **Values(사용자 입력 데이터)**로 분리하는 리팩토링 작업

---

## 🎯 핵심 목표

### 문제점
기존 스키마는 UI 메타데이터(label, options, cascaderTree 등)와 사용자 입력값(value, valueList 등)이 혼재되어 있음

### 해결 방안
1. **Config 스키마**: 서버에서 관리하는 UI 설정 (재배포 불필요)
2. **Values 스키마**: 프론트에서 관리하는 사용자 입력 (타입 안전)

### 기대 효과
- Config 변경 시 재배포 불필요 (서버 DB만 수정)
- 타입 안전성 보장 (TypeScript 컴파일 타임 체크)
- 유지보수성 향상 (관심사 분리)
- Props 대폭 감소 (Config는 Context로, Values만 RHF로)

---

## 🔥 작업 현황

### ✅ Phase 1: 스키마 설계 및 Mock 데이터 생성 (완료)
- [x] `form_values_schema.ts` 생성 - RHF 전용 사용자 입력 스키마
- [x] `server_config_schema.ts` 생성 - 서버 Config UI 메타데이터 스키마
- [x] `form_values_mock.ts` 생성 - RHF 초기값 Mock (EMPTY_FORM_VALUES, EXAMPLE_FORM_VALUES)
- [x] `server_config_mock.ts` 생성 - 서버 Config Mock (SERVER_FORM_CONFIG)
- [x] `rhf-path.ts` 생성 - RHF path 타입 헬퍼
- [x] 헬퍼 함수 작성 - `createEmptyCuppingFormValue()`, `createDefaultRootFormValue()`
- [x] Zod Resolver 생성 - `RootCuppingFormValueResolver`

**결과**: 모든 타입 정의와 Mock 데이터 완성. 컴포넌트 리팩토링 준비 완료.

### ⏳ Phase 2: 컴포넌트 대규모 리팩토링 (다음 작업)
**목표**: 기존 컴포넌트들이 Config와 Values를 분리해서 사용하도록 전면 수정

**작업 범위**:
1. **Context 구현**
   - `FormConfigContext` 생성 및 Provider 설정
   - `useFormConfig()` 커스텀 훅

2. **최상위 컴포넌트 수정**
   - CuppingPage: Config와 Values 분리
   - useForm 설정: `RootCuppingFormValue` + `RootCuppingFormValueResolver` + `EMPTY_FORM_VALUES`

3. **Input 컴포넌트 리팩토링**
   - RadioInput: Config와 Values path 분리
   - SelectInput: Config와 Values path 분리
   - TextInput: Config와 Values path 분리
   - CascaderInput: 동적 렌더링 적용

4. **평가 컴포넌트 리팩토링**
   - EvaluationSection: Config 기반 동적 렌더링
   - DetailEvaluation: selectedCategories 기반 동적 생성
   - CuppingItem: Config Context 사용

5. **Props 정리**
   - 기존: label, options, tooltip 등 모두 props로 전달
   - 개선: path만 전달, Config는 Context에서

**예상 변경점**:
```typescript
// Before: Props 많음
<RadioInput
  path="purpose"
  label={schema.purpose.label}
  options={schema.purpose.optionList}
  tooltip={schema.purpose.tooltip}
/>

// After: Path만 전달
<RadioInput path="purposeValue" />
```

### 📋 Phase 3: 기존 코드 제거 (마지막)
- [ ] `new_form_schema.ts` 삭제
- [ ] `new_form_schema_mock.ts` 삭제
- [ ] 사용하지 않는 타입 정리

---

## 📂 파일 구조

### 타입 정의
```
src/types/new/
├── form_values_schema.ts        # RHF 폼 값 스키마 (NEW)
├── server_config_schema.ts      # 서버 Config 스키마 (NEW)
├── new_form_schema.ts          # 기존 스키마 (LEGACY)
└── README.md                    # 타입 구조 가이드 (NEW)
```

### Mock 데이터
```
src/constants/new/
├── server_config_mock.ts        # 서버 Config Mock (NEW)
├── form_values_mock.ts          # RHF Values Mock (NEW)
├── new_form_schema_mock.ts     # 기존 Mock (DEPRECATED)
├── category_tree.ts            # 카테고리 트리 (Config 전용)
└── options_list.ts             # 옵션 목록 (Config 전용)
```

### 문서
```
docs/
├── schema-separation-guide.md           # 스키마 분리 가이드
└── why-separate-config-from-values.md   # Config vs Values 개념 설명
```

---

## 🔑 핵심 개념

### Config (서버 관리)
**의미**: "어떤 UI를 보여줄까?"
- 예시: 원두 옵션 목록, label 문구, cascaderTree, tooltip
- 변경 시: 서버만 수정 → 재배포 불필요
- 관리: DB/Admin 페이지

### Values (프론트 관리)
**의미**: "어떤 데이터를 보낼까?"
- 예시: 선택한 원두 ID, 입력한 점수, 선택된 카테고리
- 변경 시: 프론트-백 협의 → 재배포 필요
- 관리: TypeScript 코드 (타입 안전)

---

## 📐 스키마 구조

### 1. form_values_schema.ts (RHF 폼 값)

```typescript
// 루트 폼 값
type RootCuppingFormValue = {
  purposeValue: string;              // 목적
  cuppings: CuppingFormValue[];      // 커핑 목록 (최대 15개)
};

// 단일 커핑
type CuppingFormValue = {
  coffeeId: string;                  // 선택한 원두
  evaluations: EvaluationValue[];    // 평가 목록 (향, 맛 등)
};

// 평가 항목
type EvaluationValue = {
  categoryName: CategoryName;        // 'aroma' | 'taste' | ...
  selectedCategories: string[];      // 선택한 카테고리들
  details: CategoryDetailValue[];    // 상세 평가
};

// 카테고리 상세 평가
type CategoryDetailValue = {
  categoryValue: string;             // "sweet"
  intensity: string;                 // "high"
  affectiveScore: number;            // 8
  affectiveNote: string;             // "매우 달콤함"
};
```

**특징**:
- 사용자 입력값만 포함
- Zod validation 포함
- RHF resolver로 사용

### 2. server_config_schema.ts (서버 Config)

```typescript
// 루트 Config
type RootCuppingFormConfig = {
  purpose: RadioInputConfig;
  cuppingForm: CuppingFormConfig;
  maxCuppingCount: number;
};

// 커핑 폼 Config
type CuppingFormConfig = {
  basicInfo: {
    coffeeSelect: SelectInputConfig;
  };
  evaluations: EvaluationConfig[];
};

// 평가 항목 Config
type EvaluationConfig = {
  id: number;
  title: string;                     // "향"
  label: string;                     // "커피에서 무슨 향이 나나요?"
  categoryName: CategoryName;
  category: CascaderInputConfig;
  detailEvaluation: DetailEvaluationConfig;
};

// Input Config 타입들
type SelectInputConfig = {
  inputType: 'dropdown';
  label: string;
  optionList: Option[];
  tooltip?: string;
};

type CascaderInputConfig = {
  inputType: 'cascader';
  label: string;
  cascaderTree: CategoryFirstNode[];
  maxSelection: number;
  tooltip?: string;
};
```

**특징**:
- UI 렌더링에 필요한 메타데이터
- 서버 응답 타입
- 사용자 입력값 제외

---

## 🔄 데이터 흐름

```
1. 앱 시작
   ↓
2. GET /api/cupping/form-config
   → RootCuppingFormConfig 받음
   ↓
3. 폼 초기화
   - Config: Context/State로 관리 (불변)
   - Values: RHF로 관리 (createDefaultRootFormValue())
   ↓
4. 사용자 입력
   → setValue로 values만 업데이트
   ↓
5. 제출
   → POST /api/cupping
   → RootCuppingFormValue 데이터 전송
```

---

## 🎨 사용 예시

### 컴포넌트 구조

```typescript
function CuppingFormPage() {
  // 1. Config 로드 (서버에서 한 번만)
  const [config, setConfig] = useState<RootCuppingFormConfig>(null);

  useEffect(() => {
    fetch('/api/cupping/form-config')
      .then(res => res.json())
      .then(setConfig);
  }, []);

  // 2. RHF 초기화 (값만)
  const form = useForm<RootCuppingFormValue>({
    resolver: RootCuppingFormValueResolver,
    defaultValues: createDefaultRootFormValue(),
  });

  // 3. 제출
  const onSubmit = async (values: RootCuppingFormValue) => {
    await fetch('/api/cupping', {
      method: 'POST',
      body: JSON.stringify(values),
    });
  };

  if (!config) return <Loading />;

  return (
    <FormConfigContext.Provider value={config}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <PurposeSelector />
          <CuppingFormList />
        </form>
      </FormProvider>
    </FormConfigContext.Provider>
  );
}
```

### 하위 컴포넌트

```typescript
function EvaluationSection({ evaluationIdx }: Props) {
  // Config에서 UI 메타데이터
  const config = useFormConfig();
  const evalConfig = config.cuppingForm.evaluations[evaluationIdx];

  // RHF에서 값 관리
  const { watch, setValue } = useFormContext<RootCuppingFormValue>();
  const selectedCategories = watch(
    `cuppings.0.evaluations.${evaluationIdx}.selectedCategories`
  );

  return (
    <div>
      <h3>{evalConfig.title}</h3>

      {/* Config로 UI 렌더링 */}
      <Cascader
        label={evalConfig.category.label}
        tree={evalConfig.category.cascaderTree}
        value={selectedCategories}
        onChange={(val) =>
          setValue(
            `cuppings.0.evaluations.${evaluationIdx}.selectedCategories`,
            val
          )
        }
      />

      {/* 동적 상세 평가 */}
      {selectedCategories.map(categoryValue => (
        <DetailEvaluation
          key={categoryValue}
          config={evalConfig.detailEvaluation}
          categoryValue={categoryValue}
        />
      ))}
    </div>
  );
}
```

---

## 📊 주요 개선 사항

### 1. selected 필드 제거

**Before**:
```typescript
// category_tree.ts
{
  id: 1,
  selected: false,  // ❌ UI 상태가 Config에 포함
  label: '꽃',
  children: [...]
}
```

**After**:
```typescript
// Config (서버)
{
  id: 1,
  label: '꽃',
  children: [...]
}

// 컴포넌트에서 계산
const isSelected = selectedCategories.includes(node.value);
```

### 2. categoryEvaluationList 동적 생성

**Before**:
```typescript
detailEvaluation: {
  categoryEvaluationList: []  // ❌ 빈 배열이 Config에 포함
}
```

**After**:
```typescript
// Config에는 설정만
detailEvaluation: {
  label: "...",
  intensity: { label: "강도", ... },
  affectiveScore: { min: 0, max: 10, ... }
}

// 컴포넌트에서 동적 렌더링
{selectedCategories.map(category => (
  <DetailForm config={config.detailEvaluation} />
))}
```

### 3. 확장 가능한 Values 스키마

**Bad**:
```typescript
// ❌ 하드코딩: 평가 항목 추가 시 타입 수정 필요
{
  aroma: { ... },
  taste: { ... },
  acidity: { ... }
}
```

**Good**:
```typescript
// ✅ 확장 가능: 평가 항목 추가 시 타입 수정 불필요
evaluations: Array<{
  categoryName: CategoryName;
  selectedCategories: string[];
  details: CategoryDetailValue[];
}>
```

---

## 🔧 헬퍼 함수

### 폼 초기화

```typescript
// 빈 평가 값 생성
export const createEmptyEvaluationValue = (
  categoryName: CategoryName
): EvaluationValue => ({
  categoryName,
  selectedCategories: [],
  details: [],
});

// 빈 커핑 폼 값 생성
export const createEmptyCuppingFormValue = (): CuppingFormValue => ({
  coffeeId: '',
  evaluations: [
    createEmptyEvaluationValue('aroma'),
    createEmptyEvaluationValue('taste'),
    createEmptyEvaluationValue('acidity'),
    createEmptyEvaluationValue('sweetness'),
    createEmptyEvaluationValue('mouthfeel'),
  ],
});

// 루트 폼 기본값 생성
export const createDefaultRootFormValue = (): RootCuppingFormValue => ({
  purposeValue: '',
  cuppings: [createEmptyCuppingFormValue()],
});
```

---

## 🚀 다음 작업 시작점 (Phase 2 상세)

### Step 1: Context 구현
```typescript
// src/contexts/FormConfigContext.tsx
import { createContext, useContext } from 'react';
import type { RootCuppingFormConfig } from '@/types/new/server_config_schema';

export const FormConfigContext = createContext<RootCuppingFormConfig | null>(null);

export const useFormConfig = () => {
  const context = useContext(FormConfigContext);
  if (!context) throw new Error('FormConfigContext Provider가 필요합니다');
  return context;
};
```

### Step 2: 최상위 래퍼 (App 또는 CuppingPage 상위)
```typescript
import { FormProvider, useForm } from 'react-hook-form';
import { RootCuppingFormValue, RootCuppingFormValueResolver } from '@/types/new/form_values_schema';
import { EMPTY_FORM_VALUES } from '@/constants/new/form_values_mock';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import { FormConfigContext } from '@/contexts/FormConfigContext';

function CuppingFormWrapper() {
  // Config는 서버에서 받아올 예정 (현재는 Mock)
  const config = SERVER_FORM_CONFIG;

  // RHF 초기화 - Values만!
  const form = useForm<RootCuppingFormValue>({
    resolver: RootCuppingFormValueResolver,
    defaultValues: EMPTY_FORM_VALUES,
  });

  return (
    <FormConfigContext.Provider value={config}>
      <FormProvider {...form}>
        <CuppingPage />
      </FormProvider>
    </FormConfigContext.Provider>
  );
}
```

### Step 3: 컴포넌트 리팩토링 우선순위
1. **RadioInput** - 가장 단순, 먼저 수정
2. **SelectInput** - RadioInput과 유사
3. **TextInput** - 가장 단순
4. **CascaderInput** - 복잡, 나중에
5. **EvaluationSection** - Cascader 이후
6. **DetailEvaluation** - 동적 생성 로직

### Step 4: Props 인터페이스 변경
```typescript
// Before
interface RadioInputProps {
  path: string;
  label: string;
  options: Option[];
  tooltip?: string;
  value: string;
  onChange: (v: string) => void;
}

// After
interface RadioInputProps {
  path: FieldPath<RootCuppingFormValue>;  // 'purposeValue'만
  // Config는 내부에서 useFormConfig()로
  // value/onChange는 내부에서 useFormContext()로
}
```

### Step 5: 동적 렌더링 적용
```typescript
// 평가 항목을 Config 기반으로 동적 렌더링
function EvaluationList() {
  const config = useFormConfig();

  return (
    <>
      {config.cuppingForm.evaluations.map((evalConfig, idx) => (
        <EvaluationSection
          key={evalConfig.id}
          evaluationIdx={idx}
          // Config는 전달 안 함 (Context에서)
        />
      ))}
    </>
  );
}
```

---

## 📝 중요 원칙

### Config로 분리할 것
- 변경 가능성 있는 것
- 관리자가 수정해야 하는 것
- 다국어 지원이 필요한 것
- 환경별로 다를 수 있는 것

### Values로 유지할 것
- 사용자 입력값
- 서버에 전송할 데이터

### 하드코딩 유지할 것
- 절대 변하지 않는 것
- 프론트 관심사 (CSS, 애니메이션)

---

## 🎯 핵심 기억 포인트

### 이전 방식의 문제점
```typescript
// ❌ Config + Values 혼재
const schema = {
  purpose: {
    label: '...',      // Config (UI)
    options: [...],    // Config (UI)
    value: '',         // Values (사용자 입력)
    selectedName: ''   // 불필요 (계산 가능)
  }
};

// RHF가 Config까지 관리 → 메모리 낭비
const form = useForm({ defaultValues: schema });

// getValue로 모든 것 가져옴
const purposeData = form.watch('purpose');
<RadioInput {...purposeData} />  // Props 많음
```

### 새로운 방식의 개선점
```typescript
// ✅ Config와 Values 분리
const config = SERVER_FORM_CONFIG;  // Context/Props로
const form = useForm({
  defaultValues: EMPTY_FORM_VALUES  // Values만 RHF로
});

// Config는 Context, Values는 RHF
<RadioInput path="purposeValue" />  // Props 최소화
```

### 핵심 구분
```
Config (서버 관리):
  - "어떤 UI를 보여줄까?" → label, options, tooltip
  - 변경 시 재배포 불필요 (서버 DB만 수정)
  - Context/Props로 전달 (불변)

Values (프론트 관리):
  - "어떤 데이터를 보낼까?" → coffeeId, score, selectedCategories
  - 변경 시 재배포 필요 (프론트-백 협의)
  - RHF로 관리 (변경 가능)
  - 타입 안전성 보장

Props 감소:
  - Before: label, options, tooltip, value, onChange (5개+)
  - After: path (1개)
```

### 작업 순서 요약
1. ✅ **Phase 1 완료**: 타입 정의 + Mock 데이터 생성
2. ⏳ **Phase 2 진행 예정**: Context 생성 → 컴포넌트 리팩토링 (RadioInput → SelectInput → TextInput → Cascader → EvaluationSection)
3. 📋 **Phase 3 예정**: 기존 코드 제거 (new_form_schema.ts, new_form_schema_mock.ts)

---

## 📚 관련 문서

- [why-separate-config-from-values.md](../docs/why-separate-config-from-values.md) - 개념 상세 설명
- [schema-separation-guide.md](../docs/schema-separation-guide.md) - 기술 가이드
- [src/types/new/README.md](../src/types/new/README.md) - 타입 사용법

---

## 💾 주요 파일 위치

### 타입 정의
- `src/types/new/form_values_schema.ts` - RHF Values 스키마
- `src/types/new/server_config_schema.ts` - 서버 Config 스키마
- `src/types/new/rhf-path.ts` - RHF path 헬퍼

### Mock 데이터
- `src/constants/new/form_values_mock.ts` - EMPTY_FORM_VALUES, EXAMPLE_FORM_VALUES
- `src/constants/new/server_config_mock.ts` - SERVER_FORM_CONFIG

### 다음 작업 시 생성할 파일
- `src/contexts/FormConfigContext.tsx` - Config Context (미생성)

---

**최종 수정**: 2025-12-16
**작성자**: Claude AI
**프로젝트**: OnlyCup 커핑 폼 리팩토링
**현재 상태**: Phase 1 완료, Phase 2 준비 완료
