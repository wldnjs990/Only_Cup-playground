import { useFormContext } from 'react-hook-form';
import CategoryIntensity from './CategoryIntensity';
import CategoryAffectiveScore from './CategoryAffectiveScore';
import ContentTitle from './ContentTitle';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';

export default function DetailEvaluation() {
  const { getValues } = useFormContext<RootCuppingFormValue>();

  const { cuppingsIdx, evaluationsIdx, goToCategortSelect, stNodeIdx, ndNodeIdx } =
    useCuppingEvaluationContext();

  if (stNodeIdx === null || ndNodeIdx === null)
    return <span>오류(stNodeIdx 또는 ndNodeIdx 없음)</span>;

  const selectedCategories = getValues(
    `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`,
  );

  // 선택된 카테고리가 없으면 빈공간 출력
  if (selectedCategories.length === 0) {
    return <span>오류(selectedCategories 없음)</span>;
  }

  const leafCategory =
    SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].category.cascaderTree[stNodeIdx]
      .children[ndNodeIdx].children;

  const detailEvaluation =
    SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].detailEvaluation;

  return (
    <section className="flex flex-col">
      <ContentTitle title={detailEvaluation.title || ''} as="h2" />
      <span className="sr-only">{}</span>
      <button className="flex text-sm" onClick={goToCategortSelect}>{`< 카테고리 선택`}</button>

      <article className="mt-2 flex flex-col gap-3">
        {/* 선택된 카테고리 수 만큼 detail 평가 생성 */}
        {selectedCategories.map((selectedCategory, idx) => {
          // 선택한 카테고리 label 구하기
          const categoryLabel = leafCategory.find(
            (category) => category.value === selectedCategory,
          )?.label;

          return (
            <article
              key={selectedCategory}
              className="flex flex-col gap-3 rounded-lg bg-gray-100 p-3"
            >
              <span className="flex justify-center font-bold">{`${detailEvaluation.title} - ${categoryLabel}`}</span>
              <hr />
              <CategoryIntensity detailsIdx={idx} />
              <hr />
              <CategoryAffectiveScore detailsIdx={idx} />
            </article>
          );
        })}
      </article>
    </section>
  );
}
