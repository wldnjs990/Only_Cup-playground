import { useFormContext } from 'react-hook-form';
import CategoryIntensity from './CategoryIntensity';
import CategoryAffectiveScore from './CategoryAffectiveScore';
import ContentTitle from './ContentTitle';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';

export default function DetailEvaluation() {
  const { getValues } = useFormContext<RootCuppingFormValue>();

  const { detailPath, handlePrevButtonClick } = useCuppingEvaluationContext();

  const { label, categoryEvaluationList } = getValues(detailPath);

  // 선택된 카테고리가 없으면 빈공간 출력
  if (categoryEvaluationList.length === 0) {
    return <></>;
  }

  return (
    <section className="flex flex-col">
      <ContentTitle title={label} as="h2" />
      <button className="flex text-sm" onClick={handlePrevButtonClick}>{`< 이전 단계`}</button>

      <article className="mt-2 flex flex-col gap-3">
        {categoryEvaluationList.map((categoryEvaluation, idx) => {
          const categoryEvaluationPath = `${detailPath}.categoryEvaluationList.${idx}` as const;
          return (
            <article
              key={categoryEvaluation.value}
              className="flex flex-col gap-3 rounded-lg bg-gray-100 p-3"
            >
              <span className="flex justify-center font-bold">{categoryEvaluation.title}</span>
              <hr />
              <CategoryIntensity
                categoryEvaluationPath={categoryEvaluationPath}
                categoryTitle={categoryEvaluation.title}
              />
              <hr />
              <CategoryAffectiveScore categoryEvaluationPath={categoryEvaluationPath} />
            </article>
          );
        })}
      </article>
    </section>
  );
}
