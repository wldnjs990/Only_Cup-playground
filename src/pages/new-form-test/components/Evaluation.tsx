import DetailEvaluation from './DetailEvaluation';
import CategoryCascader from './CategoryCascader';
import { ButtonCn } from '@/components/ui/button_cn';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import ContentTitle from './ContentTitle';

export default function Evaluation() {
  // 커스텀 컨텍스트
  const {
    evaluationsIdx,
    evaluationSequence,
    updateEvaluationSequence,
    leafNodeIdx,
    cascaderDepth,
  } = useCuppingEvaluationContext();

  // 평가 타이틀
  const evaluationTitle = SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].title;

  return (
    <section className="mt-1 flex flex-col">
      <ContentTitle as="h2" title={`step.${evaluationsIdx + 1} ${evaluationTitle}`} />

      <article className="h-60 overflow-y-scroll">
        {evaluationSequence === 'category' && <CategoryCascader />}
        {evaluationSequence === 'detail' && <DetailEvaluation />}
      </article>
      {/* 카테고리 선택, 다음 평가 이동 버튼 */}
      <article className="flex py-3">
        <ButtonCn
          variant="outline"
          className="flex-1 bg-purple-500 text-white disabled:bg-gray-400"
          onClick={updateEvaluationSequence}
          disabled={!leafNodeIdx.includes(true)}
        >
          {leafNodeIdx.includes(true) ? '카테고리 선택 완료' : `${cascaderDepth}/3 선택중`}
        </ButtonCn>
      </article>
    </section>
  );
}
