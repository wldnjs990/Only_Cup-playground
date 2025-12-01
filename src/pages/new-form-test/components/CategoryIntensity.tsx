import RequiredIcon from '@/components/RequiredIcon';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';

import { useFormContext, useWatch } from 'react-hook-form';

export default function CategoryEvaluation({
  categoryEvaluationPath,
}: {
  categoryEvaluationPath: `root.${number}.evaluationList.${number}.detailEvaluation.categoryEvaluationList.${number}`;
}) {
  const { getValues, setValue, control } = useFormContext<TRootCuppingFormSchema>();

  // 강도 평가 주소
  const categoryIntensityPath = `${categoryEvaluationPath}.intensity` as const;

  // 강도 평가 옵션 리스트 주소
  const categoryIntensityValuePath = `${categoryIntensityPath}.value` as const;

  const { title, required, optionList, tooltip } = getValues(categoryIntensityPath);

  // 강도 평가 감시
  const value = useWatch({ name: categoryIntensityValuePath, control });

  return (
    <article>
      {/* 평가 대상 */}
      <div>
        <span>{title}</span>
        <RequiredIcon required={required} />
      </div>
      {/* 강도 평가 라디오 버튼 */}
      <RadioGroup
        defaultValue={value}
        onValueChange={(changingValue) => setValue(categoryIntensityValuePath, changingValue)}
      >
        {optionList.map((option) => {
          return (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem value={option.value} id={`intensity${option.value}`} />
              <Label htmlFor={`intensity${option.value}`}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </article>
  );
}
