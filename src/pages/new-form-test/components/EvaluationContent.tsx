import EvaluationNav from './EvaluationNav';
import Evaluation from './Evaluation';
import { CuppingEvaluationProvider } from '@/contexts/CuppingEvaluationContext';

export default function EvaluationContent({
  evaluationListPath,
}: {
  evaluationListPath: `root.${number}.evaluationList`;
}) {
  return (
    <>
      <CuppingEvaluationProvider evaluationListPath={evaluationListPath}>
        {/* 내비게이션 */}
        <EvaluationNav />
        {/* 평가(카테고리 선택 -> 디테일 평가) */}
        <Evaluation />
      </CuppingEvaluationProvider>
    </>
  );
}
