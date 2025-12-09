import DetailEvaluation from './DetailEvaluation';
import CategoryCascader from './CategoryCascader';
import { ButtonCn } from '@/components/ui/button_cn';
import { useFormContext, useWatch } from 'react-hook-form';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';

export default function Evaluation() {
  const { getValues, control } = useFormContext<TRootCuppingFormSchema>();

  const {
    navIdx,
    categoryPath,
    evaluationPath,
    nowDepth,
    detailPath,
    handleDetailEvaluateButtonClick,
  } = useCuppingEvaluationContext();

  const evaluationLabel = useWatch({ name: `${evaluationPath}.label`, control });

  const isCategorySelected = getValues(`${categoryPath}.valueList`).length > 0;

  return (
    <section className="mt-1 flex flex-col">
      <h2 className="h2-style mt-3">{`step.${navIdx + 1} ${evaluationLabel}`}</h2>

      <article className="h-60 overflow-y-scroll">
        {nowDepth <= 3 && <CategoryCascader />}
        {nowDepth > 3 && <DetailEvaluation key={detailPath} />}
      </article>
      {/* 카테고리 선택, 다음 평가 이동 버튼 */}
      <article className="flex py-3">
        <ButtonCn
          variant="outline"
          className="flex-1 bg-purple-500 text-white disabled:bg-gray-400"
          onClick={handleDetailEvaluateButtonClick}
          disabled={!isCategorySelected}
        >
          {isCategorySelected ? '카테고리 선택 완료' : `${nowDepth}/3 선택중`}
        </ButtonCn>
      </article>
    </section>
  );
}
