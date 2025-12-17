import DetailEvaluation from './DetailEvaluation';
import CategoryCascader from './CategoryCascader';
import { ButtonCn } from '@/components/ui/button_cn';
import { useFormContext, useWatch } from 'react-hook-form';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import ContentTitle from './ContentTitle';

export default function Evaluation({
  cuppingsIdx,
  evaluationsIdx,
}: {
  cuppingsIdx: number;
  evaluationsIdx: number;
}) {
  const { getValues, control } = useFormContext<RootCuppingFormValue>();

  // const {
  //   navIdx,
  //   categoryPath,
  //   evaluationPath,
  //   nowDepth,
  //   detailPath,
  //   handleDetailEvaluateButtonClick,
  // } = useCuppingEvaluationContext();

  // const evaluationLabel = useWatch({ name: `${evaluationPath}.label`, control });

  // const isCategorySelected = getValues(`${categoryPath}.valueList`).length > 0;

  // selectedCategories data
  const selectedCategories = useWatch({
    control,
    name: `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`,
  });
  // 카테고리 선택 여부
  const categorySelected = selectedCategories.length > 0;

  // 평가 타이틀
  const evaluationTitle = SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].title;

  return (
    <section className="mt-1 flex flex-col">
      <ContentTitle as="h2" title={`step.${evaluationsIdx + 1} ${evaluationTitle}`} />

      <article className="h-60 overflow-y-scroll">
        {categorySelected ? (
          <DetailEvaluation cuppingsIdx={cuppingsIdx} evaluationsIdx={evaluationsIdx} />
        ) : (
          <CategoryCascader cuppingsIdx={cuppingsIdx} evaluationsIdx={evaluationsIdx} />
        )}
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
