# 스키마 분리 가이드: UI vs 서버 데이터 구분

## 📖 개요

React Hook Form(RHF)과 Zod를 사용한 폼 개발 시, 서버 연동을 고려한 스키마 설계 가이드입니다.
현재 프로젝트의 커핑 폼 스키마를 서버 연동에 최적화하기 위한 데이터 분류 기준과 개선 방안을 제시합니다.

---

## 🎯 핵심 개념: 3가지 데이터 타입

### 1️⃣ 서버 Config (Configuration/Metadata)
**서버가 "이런 폼을 보여줘"라고 지시하는 설정 정보**

```typescript
✅ 서버 → 클라이언트 (GET /api/cupping/form-config)
- label: "원두 종류"          // 폼에 표시할 텍스트
- required: true              // 필수 입력 여부
- inputType: "dropdown"       // 어떤 컴포넌트를 렌더링할지
- optionList: [{...}]         // 선택 가능한 옵션들
- tooltip: "도움말"           // 설명 텍스트
- min: 0, max: 10            // 슬라이더 범위
```

**특징:**
- 서버에서 한 번 받아오면 변경되지 않음 (읽기 전용)
- 폼의 "구조"와 "설정"을 정의
- UI 컴포넌트를 렌더링하는 데 필요한 메타데이터

### 2️⃣ 사용자 입력 (Form State)
**사용자가 실제로 입력/선택한 값**

```typescript
✅ 클라이언트 상태 (RHF가 관리)
- value: "아라비카"                    // 사용자가 선택한 값
- valueList: ["sweet", "chocolate"]   // 선택된 카테고리들
- score: 8                            // 입력한 점수
```

**특징:**
- 사용자 인터랙션에 따라 변경됨
- RHF의 `watch`, `setValue` 등으로 관리
- 최종적으로 서버에 제출할 데이터의 원천

### 3️⃣ UI 전용 (Derived/Computed State)
**다른 데이터로부터 계산 가능하거나 UI 렌더링에만 필요한 것**

```typescript
❌ 서버 전송 불필요 (계산으로 구함)
- selectedName: "아라비카"    // value + optionList에서 찾을 수 있음
- selected: true              // valueList 포함 여부로 계산 가능
- colorClass: "text-red-500"  // CSS는 프론트엔드 관심사
- bgClass: "bg-blue-100"      // CSS는 프론트엔드 관심사
```

**특징:**
- `useMemo`, `useCallback` 등으로 계산
- 저장하지 않고 매번 계산하는 게 더 효율적
- 스키마에 포함하면 데이터 중복/불일치 위험

---

## 🔍 데이터 분류 기준

각 필드에 다음 질문들을 순서대로 적용하세요:

### Question 1: "이 데이터를 서버가 알고 있나?"
```typescript
// Yes → 서버 Config
label: "향 강도"
optionList: [{id: 1, label: "약함", value: "weak"}]

// No → 다음 질문으로
```

### Question 2: "이 데이터를 사용자가 입력하나?"
```typescript
// Yes → 사용자 입력
value: "strong"
score: 8

// No → 다음 질문으로
```

### Question 3: "이 데이터를 다른 데이터로부터 계산할 수 있나?"
```typescript
// Yes → UI 전용 (저장 X)
selectedName = optionList.find(opt => opt.value === value)?.label

// No → 서버 Config일 가능성
```

### Question 4: "이 데이터를 서버에 저장해야 하나?"
```typescript
// Yes → 제출 데이터에 포함
userId: 123
cuppingResults: {...}

// No → UI 전용
```

---

## 🔧 현재 스키마 분석

### SelectInput 예시

```typescript
// ❌ 현재: 모든 것이 혼재
const SelectInput = z.object({
  // 🔵 서버 Config
  inputType: InputType,
  required: z.boolean(),
  label: z.string(),
  optionList: z.array(Option),
  tooltip: z.string().optional(),

  // 🟢 사용자 입력
  value: z.string(),

  // 🟡 UI 전용 (불필요!)
  selectedName: z.string(),  // ← optionList에서 찾으면 됨
});
```

### CategoryNode 예시

```typescript
// ❌ 현재: selected가 스키마에 포함
const CategoryFirstNode = z.object({
  id: z.number(),
  label: z.string(),
  children: z.array(CategorySecondNode),
  selected: z.boolean(),  // ← valueList로 계산 가능!
});
```

### AffectiveExplain 예시

```typescript
// ❌ 현재: CSS 클래스가 스키마에 포함
const AffectiveExplain = z.object({
  explain: z.string(),
  colorClass: z.string(),  // ← 프론트엔드 관심사
  bgClass: z.string(),     // ← 프론트엔드 관심사
});
```

---

## ✅ 개선된 구조

### 1. 스키마 분리

```typescript
// ============================================
// 서버 응답 스키마 (GET /api/cupping/form-config)
// ============================================
const SelectInputConfig = z.object({
  inputType: InputType,
  required: z.boolean(),
  label: z.string(),
  optionList: z.array(Option),
  tooltip: z.string().optional(),
});

export type SelectInputConfig = z.infer<typeof SelectInputConfig>;

// ============================================
// 클라이언트 폼 스키마 (RHF가 사용)
// ============================================
const SelectInputForm = z.object({
  // 서버 설정 (읽기 전용)
  config: SelectInputConfig,

  // 사용자 입력값
  value: z.string().refine((val) => val !== '', {
    message: '선택되지 않았어요!'
  }),
});

export type SelectInputForm = z.infer<typeof SelectInputForm>;

// ============================================
// 서버 제출 스키마 (POST /api/cupping)
// ============================================
const SelectInputSubmit = z.object({
  fieldId: z.string(),     // 어떤 필드인지
  value: z.string(),       // 선택한 값
});

export type SelectInputSubmit = z.infer<typeof SelectInputSubmit>;
```

### 2. CategoryNode 개선

```typescript
// ✅ 서버 데이터: selected 제거
const CategoryNodeConfig = z.object({
  id: z.number(),
  label: z.string(),
  children: z.array(CategorySecondNode),
});

// ✅ 컴포넌트에서 계산
function CategoryCascader({ config, valueList }: Props) {
  // selected는 계산으로 구함
  const isSelected = useMemo(
    () => valueList.includes(config.id.toString()),
    [valueList, config.id]
  );

  return <Node selected={isSelected} {...config} />;
}
```

### 3. AffectiveExplain 개선

```typescript
// ✅ 서버 데이터: 레벨만 받음
const AffectiveExplainConfig = z.object({
  level: z.number(),      // 1~5
  explain: z.string(),
});

// ✅ 프론트엔드 코드: 스타일 맵핑
const AFFECTIVE_STYLES = {
  1: { color: 'text-red-500', bg: 'bg-red-100' },
  2: { color: 'text-orange-500', bg: 'bg-orange-100' },
  3: { color: 'text-yellow-500', bg: 'bg-yellow-100' },
  4: { color: 'text-green-500', bg: 'bg-green-100' },
  5: { color: 'text-blue-500', bg: 'bg-blue-100' },
} as const;

function AffectiveExplainItem({ config }: Props) {
  const style = AFFECTIVE_STYLES[config.level];

  return (
    <div className={`${style.color} ${style.bg}`}>
      {config.explain}
    </div>
  );
}
```

---

## 🚀 실전 적용 플로우

### 1단계: 앱 시작 시 폼 설정 받기

```typescript
// API 호출
const { data: formConfig } = await fetch('/api/cupping/form-config');

// 응답 예시
{
  purpose: {
    inputType: "radio",
    label: "커핑 목적",
    required: true,
    optionList: [
      { id: 1, label: "품질 평가", value: "quality" },
      { id: 2, label: "블렌딩", value: "blending" }
    ],
    tooltip: "커핑의 목적을 선택하세요"
  },
  evaluationList: [...]
}
```

### 2단계: RHF 초기화

```typescript
const form = useForm<TRootCuppingFormSchema>({
  resolver: RootCuppingFormSchemaZodResolver,
  defaultValues: {
    purpose: {
      config: formConfig.purpose,
      value: ''  // 초기값: 빈 문자열
    },
    schemaList: formConfig.schemaList.map(schema => ({
      basicInfo: {
        title: {
          config: schema.basicInfo.title,
          value: ''
        }
      },
      evaluationList: schema.evaluationList.map(evaluation => ({
        ...evaluation,
        category: {
          config: evaluation.category,
          valueList: []  // 초기값: 빈 배열
        }
      }))
    }))
  }
});
```

### 3단계: 사용자 입력 처리

```typescript
// value만 변경됨, config는 불변
const handleSelect = (value: string) => {
  form.setValue('purpose.value', value);
};

// selectedName은 계산으로 구함
const selectedName = useMemo(() => {
  const config = form.watch('purpose.config');
  const value = form.watch('purpose.value');

  return config.optionList.find(opt => opt.value === value)?.label ?? '';
}, [form.watch('purpose.config'), form.watch('purpose.value')]);
```

### 4단계: 제출 시 데이터 변환

```typescript
const onSubmit = (formData: TRootCuppingFormSchema) => {
  // 값만 추출해서 전송
  const submitData = {
    purposeId: formData.purpose.value,
    schemaList: formData.schemaList.map(schema => ({
      coffeeId: schema.basicInfo.title.value,
      evaluations: schema.evaluationList.map(evaluation => ({
        categoryName: evaluation.category.config.name,
        selectedValues: evaluation.category.valueList,
        intensity: evaluation.detailEvaluation.categoryEvaluationList.map(
          item => ({
            id: item.value,
            intensityScore: item.intensity.value,
            affectiveScore: item.affectiveScore.value,
            note: item.affectiveNote.value
          })
        )
      }))
    }))
  };

  await fetch('/api/cupping', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submitData)
  });
};
```

---

## 🎨 구체적인 분리 원칙

### Rule 1: 서버는 "어떻게 보일지"만 알려줌

```typescript
// ✅ Good: 서버는 구조만 정의
{
  label: "향 강도",
  inputType: "slider",
  min: 0,
  max: 10,
  step: 1,
  tooltip: "0은 약함, 10은 강함"
}

// ❌ Bad: 서버가 사용자 값까지 포함
{
  label: "향 강도",
  inputType: "slider",
  min: 0,
  max: 10,
  value: 7,              // ← 이건 사용자가 입력할 값
  selectedName: "강함"   // ← 이건 계산 가능
}
```

### Rule 2: 계산 가능한 건 저장 안 함

```typescript
// ❌ Bad: selectedName 저장
const formData = {
  value: "arabica",
  selectedName: "아라비카"  // optionList에서 찾으면 되는데?
};

// ✅ Good: 필요할 때 계산
const formData = {
  value: "arabica"
};

const selectedName = useMemo(() => {
  const option = optionList.find(opt => opt.value === formData.value);
  return option?.label ?? '';
}, [formData.value, optionList]);
```

### Rule 3: CSS/스타일은 프론트 코드에

```typescript
// ❌ Bad: 서버가 CSS 관여
const serverData = {
  items: [
    {
      text: "매우 좋음",
      colorClass: "text-green-500",
      bgClass: "bg-green-100"
    }
  ]
};

// ✅ Good: 서버는 의미만 전달, 스타일은 프론트에서
const serverData = {
  items: [
    {
      text: "매우 좋음",
      level: "excellent"  // or severity: 5
    }
  ]
};

// 프론트엔드
const LEVEL_STYLES = {
  excellent: 'text-green-500 bg-green-100',
  good: 'text-blue-500 bg-blue-100',
  neutral: 'text-gray-500 bg-gray-100',
} as const;
```

### Rule 4: ID 참조 vs 전체 객체

```typescript
// ❌ Bad: 제출 시 전체 객체 포함
const submitData = {
  selectedCoffee: {
    id: 5,
    label: "에티오피아 예가체프",
    value: "ethiopia_yirgacheffe",
    region: "예가체프",
    process: "워시드"
  }
};

// ✅ Good: ID만 전송
const submitData = {
  coffeeId: 5
};
```

---

## 📋 마이그레이션 체크리스트

현재 스키마를 개선하기 위한 단계별 체크리스트:

### Phase 1: 분석
- [ ] 모든 스키마 필드를 Config/FormState/UIOnly로 분류
- [ ] 계산 가능한 필드(selectedName, selected 등) 식별
- [ ] CSS 관련 필드(colorClass, bgClass 등) 식별

### Phase 2: 스키마 분리
- [ ] `*Config` 스키마 생성 (서버 → 클라이언트)
- [ ] `*Form` 스키마 생성 (RHF 사용)
- [ ] `*Submit` 스키마 생성 (클라이언트 → 서버)

### Phase 3: 유틸리티 함수
- [ ] `transformServerToForm()` 함수 작성
- [ ] `transformFormToSubmit()` 함수 작성
- [ ] 타입 가드 함수 추가

### Phase 4: 컴포넌트 수정
- [ ] Computed values를 `useMemo`로 변경
- [ ] CSS 매핑을 상수로 분리
- [ ] Config와 Value를 구분하여 props 전달

### Phase 5: 테스트
- [ ] 서버 응답 mock 데이터 작성
- [ ] 폼 초기화 테스트
- [ ] 제출 데이터 변환 테스트

---

## 🛠️ 유틸리티 함수 예시

### 서버 → 폼 변환

```typescript
export function transformServerToForm(
  config: ServerCuppingConfig
): TRootCuppingFormSchema {
  return {
    purpose: {
      config: config.purpose,
      value: ''
    },
    schemaList: config.schemaList.map(schema => ({
      basicInfo: {
        title: {
          config: schema.basicInfo.title,
          value: '',
          // selectedName은 computed로 처리
        }
      },
      evaluationList: schema.evaluationList.map(evaluation => ({
        id: evaluation.id,
        title: evaluation.title,
        label: evaluation.label,
        category: {
          config: evaluation.category,
          valueList: []
        },
        detailEvaluation: {
          label: evaluation.detailEvaluation.label,
          categoryEvaluationList: evaluation.detailEvaluation.categoryEvaluationList.map(
            item => ({
              ...item,
              intensity: { ...item.intensity, value: '' },
              affectiveScore: { ...item.affectiveScore, value: 0 },
              affectiveNote: { ...item.affectiveNote, value: '' }
            })
          )
        }
      }))
    }))
  };
}
```

### 폼 → 제출 변환

```typescript
export function transformFormToSubmit(
  formData: TRootCuppingFormSchema
): CuppingSubmitData {
  return {
    purposeId: parseInt(formData.purpose.value),
    cuppings: formData.schemaList.map(schema => ({
      coffeeId: parseInt(schema.basicInfo.title.value),
      evaluations: schema.evaluationList.map(evaluation => ({
        categoryName: evaluation.category.config.name,
        selectedCategories: evaluation.category.valueList,
        details: evaluation.detailEvaluation.categoryEvaluationList.map(
          item => ({
            categoryValueId: parseInt(item.value),
            intensity: parseInt(item.intensity.value),
            affectiveScore: item.affectiveScore.value,
            note: item.affectiveNote.value
          })
        )
      }))
    }))
  };
}
```

---

## 💡 자주 묻는 질문

### Q1: Config를 폼 스키마에 넣으면 데이터가 너무 커지지 않나요?

A: Config는 reference로 관리하거나, Context API로 전역 관리하면 됩니다.

```typescript
// Context로 Config 관리
const CuppingConfigContext = createContext<ServerCuppingConfig | null>(null);

// 폼 스키마에는 값만
const formSchema = z.object({
  purposeValue: z.string(),
  // config는 context에서 가져옴
});
```

### Q2: selectedName 같은 건 정말 매번 계산해야 하나요?

A: 네, 하지만 `useMemo`로 최적화하면 성능 문제 없습니다.

```typescript
const selectedName = useMemo(() =>
  options.find(opt => opt.value === value)?.label,
  [value, options]
);
```

### Q3: 서버에서 CSS 클래스를 보내주면 안 되나요?

A: 권장하지 않습니다. 이유:
- 서버와 프론트의 관심사 분리 원칙 위반
- 디자인 변경 시 서버 코드까지 수정해야 함
- Tailwind 클래스는 빌드 타임에 결정되므로 동적 클래스 문제 발생 가능

---

## 📚 참고 자료

- [Zod Documentation](https://zod.dev/)
- [React Hook Form Best Practices](https://react-hook-form.com/advanced-usage)
- [Separation of Concerns Principle](https://en.wikipedia.org/wiki/Separation_of_concerns)

---

**작성일**: 2025-12-15
**버전**: 1.0
**관련 파일**: `src/types/new/new_form_schema.ts`
