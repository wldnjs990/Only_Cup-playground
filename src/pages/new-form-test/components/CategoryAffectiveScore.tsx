import { SliderCn } from '@/components/ui/slider_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, useWatch } from 'react-hook-form';
import ContentTitle from './ContentTitle';

export default function CategoryAffectiveScore({
  categoryEvaluationPath,
}: {
  categoryEvaluationPath: `root.${number}.evaluationList.${number}.detailEvaluation.categoryEvaluationList.${number}`;
}) {
  const { getValues, setValue, control } = useFormContext<TRootCuppingFormSchema>();

  const categoryAffectiveScorePath = `${categoryEvaluationPath}.affectiveScore` as const;
  const { title, required, max, min, tooltip, explainList } = getValues(categoryAffectiveScorePath);

  const valuePath = `${categoryAffectiveScorePath}.value` as const;

  const value = useWatch({ name: valuePath, control });

  return (
    <article>
      {/* 평가 대상 */}
      <ContentTitle title={title} required={required} tooltip={tooltip} />

      <article>
        <SliderCn
          max={max}
          min={min}
          defaultValue={[value]}
          value={[value]}
          onValueChange={(nowValue) => setValue(valuePath, nowValue[0])}
        />
        <p>{explainList[value - 1].explain}</p>
      </article>

      <div>{max}</div>
      <div>{min}</div>
      <div>{tooltip}</div>
    </article>
  );
}
