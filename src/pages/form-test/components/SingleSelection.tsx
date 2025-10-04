import { Slider } from '@/components/ui/slider';
import type { EvaluationRootSchema, SingleSelectionSchema } from '@/types/new_naming';
import { useController, useFormContext, type FieldPath } from 'react-hook-form';

export default function SingleSelection({
  parentPath,
  idx,
}: {
  parentPath: FieldPath<EvaluationRootSchema>;
  idx: number;
}) {
  // context
  const methods = useFormContext<EvaluationRootSchema>();
  // nowPath
  const nowPath = `${parentPath}.${idx}` as FieldPath<EvaluationRootSchema>;
  // singleSelection 단일(참조용)
  const singleSelection = methods.getValues(nowPath) as SingleSelectionSchema;
  // singleSelection 객체 뽑아내기
  const { label, range, selected } = singleSelection;
  // selected path 저장
  const selectedPath = `${nowPath}.selected` as FieldPath<EvaluationRootSchema>;
  // selected 컨트롤러 (입력용)
  const { field } = useController({ control: methods.control, name: selectedPath });

  return (
    <article className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h2 className="text-lg font-semibold">{label}</h2>
        <span className="text-sm">
          {selected} / {range}
        </span>
      </div>

      <Slider
        max={range}
        min={1}
        step={1}
        value={[selected]}
        onValueChange={(val) => {
          field.onChange(val[0]);
        }}
      />
    </article>
  );
}
