import EvaluationNav from './EvaluationNav';
import Evaluation from './Evaluation';
import { CuppingEvaluationProvider } from '@/contexts/CuppingEvaluationContext';

export default function EvaluationContent({ cuppingsIdx }: { cuppingsIdx: number }) {
  return (
    <section className="p-4 pb-0">
      <CuppingEvaluationProvider cuppingsIdx={cuppingsIdx}>
        {/* 내비게이션 */}
        <EvaluationNav
          cuppingsIdx={cuppingsIdx}
          evaluationsIdx={evaluationsIdx}
          setEvaluationsIdx={setEvaluationsIdx}
        />
        {/* 평가(카테고리 선택 -> 디테일 평가) */}
        <Evaluation cuppingsIdx={cuppingsIdx} evaluationsIdx={evaluationsIdx} />
      </CuppingEvaluationProvider>
    </section>
  );
}
