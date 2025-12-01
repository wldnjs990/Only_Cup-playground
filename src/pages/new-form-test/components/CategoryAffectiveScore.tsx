import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext } from 'react-hook-form';

export default function CategoryAffectiveScore({
  categoryEvaluationPath,
}: {
  categoryEvaluationPath: `root.${number}.evaluationList.${number}.detailEvaluation.categoryEvaluationList.${number}`;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const categoryAffectiveScorePath = `${categoryEvaluationPath}.affectiveScore` as const;
  const { title, required, max, min, tooltip } = getValues(categoryAffectiveScorePath);

  return (
    <>
      <div>{title}</div>
      <div>{max}</div>
      <div>{min}</div>
      <div>{tooltip}</div>
    </>
  );
}
