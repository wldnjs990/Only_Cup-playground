# useCuppingEvaluation 훅 사용 가이드

## 개요

`useCuppingEvaluation` 훅은 커핑 평가 화면에서 다음을 관리합니다:
- 5가지 평가 항목(향, 맛, 산미, 단맛, 마우스필) 탭 전환
- 3단계 Cascader 선택 상태 (1뎁스 → 2뎁스 → 3뎁스 리프)
- 카테고리 선택 ↔ 상세 평가 화면 전환
- **선택 상태 자동 복원** (탭 전환 시)

---

## 핵심 기능

### ✅ 상태 자동 복원

평가 탭을 전환했다가 돌아와도 **이전 선택 상태가 자동 복원**됩니다.

**복원되는 상태:**
1. **1뎁스 노드**: 선택된 "꽃", "과일" 등
2. **2뎁스 노드**: 선택된 "시트러스", "베리" 등
3. **3뎁스 리프 노드**: 선택된 여러 카테고리 (배열)
4. **Cascader Depth**: 현재 보고 있던 단계

---

## 사용법

### 1. 기본 사용 (Context 없이)

```typescript
import useCuppingEvaluation from '@/hooks/new/useCuppingEvaluation';

function CuppingEvaluationPage() {
  const evaluation = useCuppingEvaluation({
    cuppingsIdx: 0
  });

  // ⚠️ 주의: cascaderTrees를 전달하지 않으면
  // 탭 전환 시 선택 상태가 초기화됩니다
}
```

### 2. 상태 복원 활성화 (cascaderTrees 전달)

```typescript
import useCuppingEvaluation from '@/hooks/new/useCuppingEvaluation';
import { categoryTree } from '@/constants/new/category_tree';

function CuppingEvaluationPage() {
  // 5개 평가 항목의 cascaderTree 배열
  const cascaderTrees = [
    categoryTree.aroma,      // 0: 향
    categoryTree.taste,      // 1: 맛
    categoryTree.acidity,    // 2: 산미
    categoryTree.sweetness,  // 3: 단맛
    categoryTree.mouthfeel,  // 4: 마우스필
  ];

  const evaluation = useCuppingEvaluation({
    cuppingsIdx: 0,
    cascaderTrees, // ✅ 전달하면 자동 복원 활성화
  });

  // 탭 전환 예시
  return (
    <div>
      <Tabs value={evaluation.evaluationsIdx} onChange={evaluation.handleEvaluationsIdx}>
        <Tab label="향" />
        <Tab label="맛" />
        <Tab label="산미" />
        <Tab label="단맛" />
        <Tab label="마우스필" />
      </Tabs>

      {evaluation.evaluationSequence === 'category' ? (
        <CategoryCascader {...evaluation} />
      ) : (
        <DetailEvaluation {...evaluation} />
      )}
    </div>
  );
}
```

### 3. Context와 함께 사용 (권장)

```typescript
import { useFormConfig } from '@/contexts/FormConfigContext';
import useCuppingEvaluation from '@/hooks/new/useCuppingEvaluation';

function CuppingEvaluationPage() {
  const config = useFormConfig();

  // Config에서 모든 cascaderTree 추출
  const cascaderTrees = config.cuppingForm.evaluations.map(
    (eval) => eval.category.cascaderTree
  );

  const evaluation = useCuppingEvaluation({
    cuppingsIdx: 0,
    cascaderTrees,
  });

  return (
    <CuppingEvaluationProvider value={evaluation}>
      {/* 하위 컴포넌트들이 evaluation 상태 공유 */}
    </CuppingEvaluationProvider>
  );
}
```

---

## 반환값

```typescript
{
  // 평가 시퀸스 (카테고리 선택 | 상세 평가)
  evaluationSequence: 'category' | 'detail',
  updateEvaluationSequence: () => void,

  // 평가 탭 인덱스 (0: 향, 1: 맛, 2: 산미, 3: 단맛, 4: 마우스필)
  evaluationsIdx: number,
  handleEvaluationsIdx: (selectedIdx: number) => void,

  // Cascader 단계 (1~3)
  cascaderDepth: number,
  nextCascaderDepth: () => void,
  prevCascaderDepth: () => void,

  // 노드 선택 상태
  stNodeIdx: number | null,          // 1뎁스 선택 인덱스
  ndNodeIdx: number | null,          // 2뎁스 선택 인덱스
  leafNodeIdx: boolean[],            // 3뎁스 리프 선택 배열 (최대 5개)

  // 노드 클릭 핸들러
  handleStNodeClick: (idx: number) => void,
  handleNdNodeClick: (idx: number) => void,
  handleLeafNodeClick: (idx: number, value: string) => void,
}
```

---

## 상태 복원 로직 설명

### 역추적 알고리즘

```typescript
// RHF에 저장된 선택된 카테고리 값
selectedCategories: ['aroma_fruity_citrus_orange', 'aroma_fruity_citrus_lemon']

// 1. 첫 번째 카테고리로 부모 노드 역추적
'aroma_fruity_citrus_orange'
  ↓
1뎁스: "과일" (stNodeIdx = 1)
  ↓
2뎁스: "시트러스" (ndNodeIdx = 0)
  ↓
3뎁스: "오렌지", "레몬" 선택 (leafNodeIdx = [true, true, false, false, false])

// 2. 상태 복원
setStNodeIdx(1);
setNdNodeIdx(0);
setLeafNodeIdx([true, true, false, false, false]);
setCascaderDepth(3); // 리프까지 선택 완료
```

### 복원 시나리오

| 상황 | RHF 데이터 | 복원 결과 |
|------|-----------|----------|
| **처음 진입** | `selectedCategories: []` | cascaderDepth=1, 모든 노드 미선택 |
| **향 → 맛 탭 전환** | 향: `['aroma_floral_white_jasmine']` | 향 탭 복원: stNodeIdx=0, ndNodeIdx=0, leafNodeIdx=[true,...] |
| **detail → category 이동** | `selectedCategories` 유지 | 이전 선택 상태 유지 (수정 가능) |

---

## 시각적 예시

### 시나리오: 사용자가 "향 → 맛 → 향" 순서로 탭 전환

```
1. 향 탭에서 선택
   1뎁스: "꽃" 선택
   2뎁스: "화이트 플라워" 선택
   3뎁스: "자스민", "백합" 선택
   → RHF 저장: ['aroma_floral_white_jasmine', 'aroma_floral_white_lily']

2. 맛 탭으로 전환
   → 향 탭 상태는 RHF에 보존됨
   → 맛 탭은 초기 상태 (cascaderDepth=1)

3. 다시 향 탭으로 돌아옴
   ✅ 자동 복원:
   - stNodeIdx = 0 (꽃)
   - ndNodeIdx = 0 (화이트 플라워)
   - leafNodeIdx = [true, true, false, false, false] (자스민, 백합)
   - cascaderDepth = 3

   → 사용자는 이어서 선택 가능!
```

---

## 주의사항

### 1. cascaderTrees 배열 순서
```typescript
// ❌ 잘못된 순서
cascaderTrees = [
  categoryTree.taste,      // 0번인데 맛?
  categoryTree.aroma,      // 1번인데 향?
];

// ✅ 올바른 순서 (evaluationsIdx와 일치)
cascaderTrees = [
  categoryTree.aroma,      // 0: 향
  categoryTree.taste,      // 1: 맛
  categoryTree.acidity,    // 2: 산미
  categoryTree.sweetness,  // 3: 단맛
  categoryTree.mouthfeel,  // 4: 마우스필
];
```

### 2. RHF 데이터 구조 의존성
- `restoreNodeSelectionFromCategories` 함수는 **value 필드**로 역추적합니다
- value 형식: `{categoryName}_{1뎁스}_{2뎁스}_{3뎁스}`
- 예: `aroma_floral_white_jasmine`

### 3. 리프 노드 배열 크기
- 현재 `MAX_LEAF_NODES = 5`로 고정
- 만약 2뎁스 노드의 children이 5개를 초과하면 일부만 복원됨
- 필요 시 동적으로 변경 필요

---

## 유틸리티 함수 export

다른 곳에서도 사용 가능:

```typescript
import { restoreNodeSelectionFromCategories } from '@/hooks/new/useCuppingEvaluation';

// 예: 저장된 데이터 검증
const restoredState = restoreNodeSelectionFromCategories(
  cascaderTree,
  ['aroma_fruity_berry_strawberry', 'aroma_fruity_berry_blueberry']
);

console.log(restoredState);
// {
//   stNodeIdx: 1,
//   ndNodeIdx: 1,
//   leafNodeSelected: [true, true, false, false, false],
//   cascaderDepth: 3
// }
```

---

## 다음 단계

1. **CuppingEvaluationContext 생성**
   - 훅 반환값을 Context로 제공
   - 하위 컴포넌트에서 props 없이 사용

2. **FormConfigContext 연동**
   - cascaderTrees를 자동으로 가져오기
   - 수동 전달 불필요

3. **성능 최적화**
   - `restoreNodeSelectionFromCategories` 메모이제이션
   - 불필요한 리렌더링 방지

---

**작성일**: 2025-12-17
**작성자**: Claude AI
