# 타입 구조 가이드

## 📁 파일 구조

```
src/types/new/
├── form_values_schema.ts      # RHF 폼 값 스키마 (사용자 입력 데이터)
├── server_config_schema.ts    # 서버 Config 스키마 (UI 메타데이터)
└── new_form_schema.ts         # 기존 스키마 (레거시 - 리팩토링 대상)
```

## 🎯 각 파일의 역할

### 1. `form_values_schema.ts` - RHF 폼 값 스키마

**용도**: React Hook Form이 관리하는 사용자 입력 데이터

**포함 내용**:
- 사용자가 선택/입력한 값만
- 서버에 제출할 데이터
- Zod validation 포함

**주요 타입**:
- `RootCuppingFormValue`: 루트 폼 값
- `CuppingFormValue`: 단일 커핑 폼 값
- `EvaluationValue`: 평가 항목 값
- `CategoryDetailValue`: 카테고리 상세 평가 값

**예시**:
```typescript
{
  purposeValue: "basic",
  cuppings: [{
    coffeeId: "ethiopia_yirgacheffe",
    evaluations: [{
      categoryName: "aroma",
      selectedCategories: ["sweet", "chocolate"],
      details: [{
        categoryValue: "sweet",
        intensity: "high",
        affectiveScore: 8,
        affectiveNote: "매우 달콤함"
      }]
    }]
  }]
}
```

---

### 2. `server_config_schema.ts` - 서버 Config 스키마

**용도**: 서버에서 받아올 UI 메타데이터 (폼 구조 정의)

**포함 내용**:
- 폼의 구조와 설정
- Input 필드 설정 (label, options, tooltip 등)
- Cascader 트리 구조
- UI 렌더링에 필요한 메타데이터

**주요 타입**:
- `RootCuppingFormConfig`: 루트 폼 설정
- `CuppingFormConfig`: 커핑 폼 설정
- `EvaluationConfig`: 평가 항목 설정
- `SelectInputConfig`, `RadioInputConfig` 등: Input 설정

**예시**:
```typescript
{
  purpose: {
    inputType: "radio",
    label: "커핑 목적을 선택해주세요",
    optionList: [
      { id: 1, label: "입문자", value: "basic" },
      { id: 2, label: "전문가", value: "expert" }
    ]
  },
  cuppingForm: {
    evaluations: [{
      title: "향",
      category: {
        cascaderTree: [...],
        maxSelection: 5
      }
    }]
  }
}
```

---

## 🔄 데이터 흐름

```
1. 앱 시작
   ↓
2. GET /api/cupping/form-config
   → server_config_schema 타입으로 받음
   ↓
3. 폼 초기화
   - Config: Context/State로 관리 (불변)
   - Values: RHF로 관리 (form_values_schema)
   ↓
4. 사용자 입력
   → setValue로 values만 업데이트
   ↓
5. 제출
   → POST /api/cupping
   → form_values_schema 데이터 그대로 전송
```

---

## 📝 사용 예시

### 컴포넌트에서 사용

```typescript
import { useForm } from 'react-hook-form';
import { RootCuppingFormValue, RootCuppingFormValueResolver } from '@/types/new/form_values_schema';
import { RootCuppingFormConfig } from '@/types/new/server_config_schema';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';

function CuppingFormPage() {
  // 1. Config 로드 (서버에서)
  const [config, setConfig] = useState<RootCuppingFormConfig>(SERVER_FORM_CONFIG);

  // 2. RHF 초기화 (값만)
  const form = useForm<RootCuppingFormValue>({
    resolver: RootCuppingFormValueResolver,
    defaultValues: {
      purposeValue: '',
      cuppings: [createEmptyCuppingFormValue()]
    }
  });

  // 3. 렌더링
  return (
    <FormProvider {...form}>
      {/* Config를 props나 Context로 전달 */}
      <PurposeSelector config={config.purpose} />
      <CuppingForm config={config.cuppingForm} />
    </FormProvider>
  );
}
```

### 컴포넌트 구조

```typescript
function PurposeSelector({ config }: { config: RadioInputConfig }) {
  const { setValue, watch } = useFormContext<RootCuppingFormValue>();
  const value = watch('purposeValue');

  return (
    <RadioGroup
      label={config.label}
      options={config.optionList}
      value={value}
      onChange={(v) => setValue('purposeValue', v)}
    />
  );
}
```

---

## ⚠️ 주의사항

### ❌ 하지 말아야 할 것

```typescript
// ❌ Config를 RHF에 저장
const form = useForm({
  defaultValues: {
    config: SERVER_FORM_CONFIG,  // 안됨!
    values: { ... }
  }
});

// ❌ UI 메타데이터를 서버에 전송
const submitData = {
  purpose: {
    label: "커핑 목적",  // 안됨!
    optionList: [...],   // 안됨!
    value: "basic"       // OK
  }
};
```

### ✅ 해야 할 것

```typescript
// ✅ Config는 별도 관리
const config = useContext(ConfigContext);
const { watch, setValue } = useFormContext<RootCuppingFormValue>();

// ✅ 값만 서버에 전송
const submitData: RootCuppingFormValue = form.getValues();
await api.submitCupping(submitData);
```

---

## 🔧 헬퍼 함수

### 빈 폼 값 생성

```typescript
import { createEmptyCuppingFormValue, createDefaultRootFormValue } from '@/types/new/form_values_schema';

// 빈 커핑 폼 추가
const newCupping = createEmptyCuppingFormValue();
append(newCupping);

// 전체 폼 초기화
const defaultValues = createDefaultRootFormValue();
```

---

## 📚 참고 문서

- [schema-separation-guide.md](../../../docs/schema-separation-guide.md) - 스키마 분리 상세 가이드
- [Mock 데이터](../../constants/new/) - 서버 응답 mock 데이터

---

**작성일**: 2025-12-15
**버전**: 1.0
