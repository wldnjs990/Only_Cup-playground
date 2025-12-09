import useCuppingEvaluation, {
  type HandleLeafNodeClick,
  type HandleNdNodeClick,
  type HandleStNodeClick,
} from '@/hooks/new/useCuppingEvaluation';
import { createContext, useContext, type ReactNode } from 'react';
import type { InputType } from 'zlib';

type StNodeListPath = `root.${number}.evaluationList.${number}.category.cascaderTree`;

type NdNodeListPath =
  | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`
  | null;

type LeafNodeListPath =
  | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
  | null;

interface Context {
  evaluationListPath: `root.${number}.evaluationList`;
  navIdx: number;
  categoryPath: `root.${number}.evaluationList.${number}.category`;
  detailPath: `root.${number}.evaluationList.${number}.detailEvaluation`;
  evaluationPath: `root.${number}.evaluationList.${number}`;
  stNodeListPath: StNodeListPath;
  ndNodeListPath: NdNodeListPath;
  leafNodeListPath: LeafNodeListPath;
  categoryName: InputType;
  nowDepth: number;
  setNavIdx: React.Dispatch<React.SetStateAction<number>>;
  handlePrevButtonClick: () => void;
  handleDetailEvaluateButtonClick: () => void;
  handleStNodeClick: HandleStNodeClick;
  handleNdNodeClick: HandleNdNodeClick;
  handleLeafNodeClick: HandleLeafNodeClick;
}

// 컨텍스트 생성
const CuppingEvaluationContext = createContext<Context | null>(null);

// 카테고리, 디테일 평가 컨텍스트 provider
export function CuppingEvaluationProvider({
  children,
  evaluationListPath,
}: {
  children: ReactNode;
  evaluationListPath: `root.${number}.evaluationList`;
}) {
  const value = useCuppingEvaluation(evaluationListPath);
  return (
    <CuppingEvaluationContext.Provider value={value}>{children}</CuppingEvaluationContext.Provider>
  );
}

// 훅 데이터 사용
export function useCuppingEvaluationContext() {
  const context = useContext(CuppingEvaluationContext);
  if (!context) {
    throw new Error('CuppingEvaluationProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
