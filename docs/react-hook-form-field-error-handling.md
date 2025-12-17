# React Hook Form 필드 에러 처리 가이드

## 📖 개요

React Hook Form을 사용할 때, 특정 필드의 에러를 가져오는 과정에서 발생하는 타입 이슈와 해결 방법을 정리한 문서입니다.
`formState.errors[path]`와 `getFieldState(path, formState)`의 차이점을 이해하고, 올바른 에러 처리 방법을 제시합니다.

---

## 🎯 문제 상황

### 발생한 타입 에러

```typescript
// RadioInput.tsx
const error = formState.errors[path];
// error의 타입: FieldErrors<TFieldValues>[Path<TFieldValues>]

// ErrorMessage.tsx
export default function ErrorMessage({ error }: { error: FieldError }) {
  return <p>{error.message}</p>;
}

// ❌ 타입 에러 발생!
<ErrorMessage error={error} />
```

**에러 메시지**: `FieldErrors<TFieldValues>[Path<TFieldValues>]` 타입을 `FieldError`에 할당할 수 없습니다.

---

## 🔍 타입 에러의 원인

### formState.errors[path]의 타입 추론

```typescript
const error = formState.errors[path];
// TypeScript 추론 타입:
// FieldError | FieldErrors<객체> | FieldError[] | Merge<FieldError, FieldErrors<객체>> | undefined
```

React Hook Form의 `formState.errors`는 폼 전체의 에러 객체입니다. `path`로 인덱싱할 때, TypeScript는 해당 경로가 가리키는 필드의 모든 가능한 타입을 유니온으로 반환합니다.

### 왜 이렇게 복잡한 타입인가?

폼 데이터가 중첩된 구조를 가질 수 있기 때문입니다:

```typescript
// 폼 스키마 예시
type MyForm = {
  name: string;              // 단순 필드
  age: number;               // 단순 필드
  address: {                 // 중첩 객체
    city: string;
    zipCode: string;
  };
  hobbies: string[];         // 배열
}

// 각 필드의 에러 타입
errors["name"]       // FieldError | undefined
errors["address"]    // FieldErrors<{city, zipCode}> | undefined
errors["hobbies"]    // FieldError[] | undefined
```

TypeScript는 `path`가 어떤 필드를 가리키는지 미리 알 수 없기 때문에, 모든 가능성을 포함한 타입을 반환합니다.

### Merge 타입이란?

가장 복잡한 경우로, **객체 전체에 대한 에러**와 **하위 필드들의 에러**가 동시에 존재할 수 있습니다:

```typescript
// address 객체 전체 + 하위 필드에 대한 검증
formState.errors.address = {
  // FieldError 속성 (객체 전체의 에러)
  type: "validate",
  message: "주소 형식이 올바르지 않습니다",

  // FieldErrors 속성 (하위 필드들의 에러)
  city: {
    type: "required",
    message: "도시를 입력해주세요"
  },
  zipCode: {
    type: "pattern",
    message: "우편번호 형식이 틀립니다"
  }
}

// 타입: Merge<FieldError, FieldErrors<Address>>
```

---

## ✅ 해결 방법

### 방법 1: getFieldState 사용 (권장)

`getFieldState`는 특정 필드의 상태를 **타입 안전하게** 조회하도록 설계된 React Hook Form의 헬퍼 함수입니다.

```typescript
// ✅ 권장 방법
const { error } = getFieldState(path, formState);
// 타입: FieldError | undefined
```

**장점:**
- ✅ 타입이 정확하게 좁혀짐 (`FieldError | undefined`)
- ✅ 타입 가드나 단언 불필요
- ✅ `isDirty`, `isTouched`, `invalid` 등 추가 상태 정보도 함께 제공
- ✅ React Hook Form이 권장하는 방법

**사용 예시:**

```typescript
// RadioInput.tsx
export default function RadioInput<TFieldValues extends FieldValues>({
  path,
  config,
}: RHFPathProps<TFieldValues>) {
  const { register, formState, getFieldState } = useFormContext<TFieldValues>();

  const { error } = getFieldState(path, formState);

  return (
    <section>
      <RadioGroup {...register(path)}>
        {/* ... */}
        <ErrorMessage error={error} />
      </RadioGroup>
    </section>
  );
}

// ErrorMessage.tsx
export default function ErrorMessage({ error }: { error: FieldError | undefined }) {
  return <>{error && <p className="text-sm text-red-400">{error.message}</p>}</>;
}
```

### 방법 2: 타입 가드 사용

`formState.errors[path]`를 계속 사용하고 싶다면, 타입 가드로 타입을 좁혀야 합니다.

```typescript
// 타입 가드 함수 정의
function isFieldError(error: any): error is FieldError {
  return error && 'message' in error && typeof error.type === 'string';
}

// 사용
const error = formState.errors[path];
{error && isFieldError(error) && <ErrorMessage error={error} />}
```

**단점:**
- 타입 가드를 매번 작성해야 함
- `message` 속성만으로는 `Merge` 타입을 완전히 배제할 수 없음

### 방법 3: 타입 단언 (비권장)

```typescript
// ⚠️ 타입 안정성이 낮음
const error = formState.errors[path];
<ErrorMessage error={error as FieldError} />
```

**단점:**
- 런타임 타입 안정성 보장 안 됨
- 실제로 다른 타입이 들어와도 에러를 감지하지 못함

---

## 🔧 getFieldState 상세 가이드

### 시그니처

```typescript
getFieldState: (name: string, formState?: Object) => ({
  isDirty,    // 필드가 수정되었는지
  isTouched,  // 필드가 포커스/블러를 받았는지
  invalid,    // 필드가 유효하지 않은지
  error       // 필드 에러 객체 (FieldError | undefined)
})
```

### 매개변수

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | string | ✅ | 등록된 필드의 이름 (path) |
| `formState` | object | ⚠️ | formState를 구독하지 않을 때만 필요 |

### formState 매개변수 사용 가이드

#### Case 1: formState를 구독한 경우 (생략 가능)

```typescript
const { register, getFieldState, formState } = useForm();
//                                ^^^^^^^^^^ 구독함

// formState 인자 생략 가능
const fieldState = getFieldState("firstName");

// 또는 명시적으로 전달 (더 안전)
const fieldState = getFieldState("firstName", formState);
```

#### Case 2: formState를 구독하지 않은 경우 (필수)

```typescript
const { register, getFieldState } = useForm();
//                                 ^^^^^^^^ formState 구독 안 함

// ❌ 에러 발생
const fieldState = getFieldState("firstName");

// ✅ formState를 따로 가져와서 전달
const { formState } = useForm();
const fieldState = getFieldState("firstName", formState);
```

### 반환값 활용 예시

```typescript
const { error, isDirty, isTouched, invalid } = getFieldState(path, formState);

// 예시 1: 에러 표시
{error && <span className="text-red-500">{error.message}</span>}

// 예시 2: 수정된 필드만 강조
<input className={isDirty ? "border-yellow-500" : "border-gray-300"} />

// 예시 3: 터치된 필드만 에러 표시
{isTouched && error && <span>{error.message}</span>}

// 예시 4: 조건부 제출 버튼
<button disabled={invalid}>제출</button>
```

---

## 🎨 ErrorMessage 컴포넌트 구현 패턴

### 패턴 1: 단순 에러 메시지

```typescript
import { type FieldError } from 'react-hook-form';

export default function ErrorMessage({ error }: { error: FieldError | undefined }) {
  return <>{error && <p className="text-sm text-red-400">{error.message}</p>}</>;
}
```

### 패턴 2: 에러 타입별 스타일링

```typescript
import { type FieldError } from 'react-hook-form';

const ERROR_STYLES = {
  required: 'text-red-500',
  pattern: 'text-orange-500',
  validate: 'text-yellow-500',
} as const;

export default function ErrorMessage({ error }: { error: FieldError | undefined }) {
  if (!error) return null;

  const colorClass = ERROR_STYLES[error.type as keyof typeof ERROR_STYLES] || 'text-red-400';

  return <p className={`text-sm ${colorClass}`}>{error.message}</p>;
}
```

### 패턴 3: 애니메이션 포함

```typescript
import { type FieldError } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

export default function ErrorMessage({ error }: { error: FieldError | undefined }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-red-400"
        >
          {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
```

---

## 📊 비교표: formState.errors vs getFieldState

| 항목 | `formState.errors[path]` | `getFieldState(path, formState)` |
|------|--------------------------|----------------------------------|
| **타입 추론** | 넓은 유니온 타입 | 정확한 타입 (`FieldError \| undefined`) |
| **타입 가드 필요** | ✅ 필요 | ❌ 불필요 |
| **추가 정보** | 에러만 | `isDirty`, `isTouched`, `invalid` 포함 |
| **사용 복잡도** | 중간 | 낮음 |
| **권장 사용처** | 전체 에러 객체 접근 시 | 특정 필드 상태 조회 시 (일반적) |
| **TypeScript 안정성** | 낮음 | 높음 |

---

## 💡 핵심 정리

### 타입 이슈의 본질

- `formState.errors[path]`는 **모든 가능한 필드 타입**을 고려한 넓은 유니온 타입 반환
- 라디오 버튼은 항상 `FieldError | undefined`지만, TypeScript는 이를 추론할 수 없음
- 중첩 객체, 배열, Merge 타입 등 모든 경우의 수가 타입에 포함됨

### 권장 해결 방법

1. **1순위**: `getFieldState(path, formState)` 사용
   - 타입 안정성 높음
   - React Hook Form 공식 권장
   - 추가 상태 정보도 제공

2. **2순위**: 타입 가드 사용
   - `formState.errors`를 계속 사용해야 할 때
   - 타입 가드 함수 작성 필요

3. **비권장**: 타입 단언
   - 런타임 안정성 보장 안 됨
   - 디버깅 어려움

### FieldError 타입 구조

```typescript
type FieldError = {
  type: string;       // "required", "pattern", "validate" 등
  message?: string;   // 에러 메시지
  ref?: Ref;         // input 참조
}
```

---

## 🛠️ 실전 적용 예시

### Before (문제 상황)

```typescript
// RadioInput.tsx - 타입 에러 발생
const error = formState.errors[path];
// 타입: FieldErrors<TFieldValues>[Path<TFieldValues>]

<ErrorMessage error={error} />  // ❌ 타입 에러!

// ErrorMessage.tsx
export default function ErrorMessage({ error }: { error: FieldError }) {
  return <p>{error.message}</p>;
}
```

### After (getFieldState 사용)

```typescript
// RadioInput.tsx - 타입 안전
const { error } = getFieldState(path, formState);
// 타입: FieldError | undefined

<ErrorMessage error={error} />  // ✅ 타입 에러 없음!

// ErrorMessage.tsx
export default function ErrorMessage({ error }: { error: FieldError | undefined }) {
  return <>{error && <p className="text-sm text-red-400">{error.message}</p>}</>;
}
```

---

## 📚 참고 자료

- [React Hook Form - getFieldState API](https://react-hook-form.com/docs/useform/getfieldstate)
- [React Hook Form - useFormContext](https://react-hook-form.com/docs/useformcontext)
- [TypeScript Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

---

**작성일**: 2025-12-16
**버전**: 1.0
**관련 파일**:
- `src/components/RadioInput.tsx`
- `src/components/ErrorMessage.tsx`
- `src/types/new/rhf-path.ts`
