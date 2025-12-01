import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import type { Dispatch } from 'react';
import { useFormContext } from 'react-hook-form';
import CategoryIntensity from './CategoryIntensity';
import CategoryAffectiveScore from './CategoryAffectiveScore';

export default function DetailEvaluation({
  nowDetailPath,
  setEIdx,
}: {
  nowDetailPath: `root.${number}.evaluationList.${number}.detailEvaluation`;
  setEIdx: Dispatch<React.SetStateAction<number>>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const { label, categoryEvaluationList } = getValues(nowDetailPath);

  return (
    <article>
      <h3>{label}</h3>
      {categoryEvaluationList.map((categoryEvaluation, idx) => {
        const categoryEvaluationPath = `${nowDetailPath}.categoryEvaluationList.${idx}` as const;
        return (
          <article key={categoryEvaluation.value}>
            <h4 className="font-bold">{categoryEvaluation.title}</h4>
            <hr />
            <CategoryIntensity categoryEvaluationPath={categoryEvaluationPath} />
            <CategoryAffectiveScore categoryEvaluationPath={categoryEvaluationPath} />
          </article>
        );
      })}
    </article>
  );
}
