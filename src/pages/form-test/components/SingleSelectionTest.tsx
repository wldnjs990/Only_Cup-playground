import { Slider } from '@/components/ui/slider';
import { Controller, useFormContext, useWatch, type FieldPath } from 'react-hook-form';

export default function SingleSelectionTest({
  idx,
  parent_name,
}: {
  idx: number;
  parent_name: FieldPath<EvaluationRoot>;
}) {
  const SINGLE_SELECTION_ITEM_PATH =
    `${parent_name}.single_selections.${idx}` as FieldPath<EvaluationRoot>;
  const { control, setValue } = useFormContext<EvaluationRoot>();
  const item = useWatch({
    control,
    name: '' as FieldPath<EvaluationRoot>,
  }) as SingleSelection;
  console.log(item);
  const { label, range, selected } = item;
  const min = 1;
  const max = range ?? 3;
  return (
    <article>
      <p>
        {label} {selected}/{range}
      </p>
      <Controller
        name={`${SINGLE_SELECTION_ITEM_PATH}.selected` as FieldPath<EvaluationRoot>}
        control={control}
        render={({ field }) => (
          <Slider
            onValueChange={(val) => field.onChange(val[0])}
            max={max}
            min={min}
            value={[(field.value as number) ?? min]}
            step={1}
          />
        )}
      />
    </article>
  );
}
