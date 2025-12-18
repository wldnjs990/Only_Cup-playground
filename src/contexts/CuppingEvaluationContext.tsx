import { categoryTree } from '@/constants/new/category_tree';
import useCuppingEvaluation, {
  type EvaluationSequence,
  type HandleEvaluationsIdx,
  type HandleLeafNodeClick,
  type HandleNdNodeClick,
  type HandleStNodeClick,
} from '@/hooks/new/useCuppingEvaluation';
import { createContext, useContext, type ReactNode } from 'react';

/**
 * CuppingEvaluation Context 타입
 * - 단일 커핑 아이템의 평가 상태를 관리
 */
interface CuppingEvaluationContextValue {
  cuppingsIdx: number;
  // 평가 시퀸스 (카테고리 선택 | 상세 평가)
  evaluationSequence: EvaluationSequence;
  updateEvaluationSequence: () => void;
  goToCategortSelect: () => void;

  // 평가 탭 인덱스 (0: 향, 1: 맛, 2: 산미, 3: 단맛, 4: 마우스필)
  evaluationsIdx: number;
  handleEvaluationsIdx: HandleEvaluationsIdx;

  // Cascader 단계 (1~3)
  cascaderDepth: number;
  nextCascaderDepth: () => void;
  prevCascaderDepth: () => void;

  // 노드 선택 상태
  stNodeIdx: number | null; // 1뎁스 선택 인덱스
  ndNodeIdx: number | null; // 2뎁스 선택 인덱스
  leafNodeIdx: boolean[]; // 3뎁스 리프 선택 배열

  // 노드 클릭 핸들러
  handleStNodeClick: HandleStNodeClick;
  handleNdNodeClick: HandleNdNodeClick;
  handleLeafNodeClick: HandleLeafNodeClick;
}

// 컨텍스트 생성
const CuppingEvaluationContext = createContext<CuppingEvaluationContextValue | null>(null);

/**
 * CuppingEvaluation Provider
 * - 단일 커핑 아이템의 평가 상태를 하위 컴포넌트에 제공
 */
export function CuppingEvaluationProvider({
  children,
  cuppingsIdx,
}: {
  children: ReactNode;
  cuppingsIdx: number;
}) {
  const value = useCuppingEvaluation({
    cuppingsIdx,
    cascaderTrees: categoryTree, // 모든 평가 항목의 cascaderTree
  });

  return (
    <CuppingEvaluationContext.Provider value={value}>{children}</CuppingEvaluationContext.Provider>
  );
}

/**
 * CuppingEvaluation Context Hook
 * - CuppingEvaluationProvider 내부에서만 사용 가능
 */
export function useCuppingEvaluationContext() {
  const context = useContext(CuppingEvaluationContext);
  if (!context) {
    throw new Error(
      'useCuppingEvaluationContext는 CuppingEvaluationProvider 내부에서 사용해야 합니다.',
    );
  }
  return context;
}
