import { SliderCn } from '@/components/ui/slider_cn';
import type {
  AssessmentsSchema,
  CupDefectItemsSchema,
  EvaluationRootSchema,
  SingleSelectionSchema,
} from '@/types/new_naming';
import { useFormContext, useWatch, type FieldPath } from 'react-hook-form';

export default function SlideSelection({
  parentPath,
  idx,
  slider_range,
}: {
  parentPath: FieldPath<EvaluationRootSchema>;
  idx: number;
  slider_range: number;
}) {
  // context
  const { setValue, control } = useFormContext<EvaluationRootSchema>();
  // nowPath
  const nowPath = `${parentPath}.${idx}` as FieldPath<EvaluationRootSchema>;
  // selected path 저장
  const selectedPath = `${nowPath}.selected` as FieldPath<EvaluationRootSchema>;
  // singleSelection 단일(구독)
  let slideSelection;
  switch (slider_range) {
    case 9:
      slideSelection = useWatch({ control: control, name: nowPath }) as AssessmentsSchema;
      break;
    case 5:
      slideSelection = useWatch({ control: control, name: nowPath }) as CupDefectItemsSchema;
      break;
    case 3:
      slideSelection = useWatch({ control: control, name: nowPath }) as SingleSelectionSchema;
      break;
    default:
      // TODO : 슬라이드 범위를 제네릭으로 설정해놔서 switch문으로 하드코딩 하듯이 맞춰놨는데 이걸 어떻게 처리한담..
      slideSelection = useWatch({ control: control, name: nowPath }) as SingleSelectionSchema;
      break;
  }
  // singleSelection 객체 뽑아내기
  const { label, range, selected } = slideSelection;

  return (
    <article className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <h3 className="h3-style">{label}</h3>
        <span className="text-sm">
          {selected} / {range}
        </span>
      </div>

      <SliderCn
        max={range}
        min={1}
        step={1}
        value={[selected]}
        onValueChange={(val) => {
          setValue(selectedPath, val[0]);
        }}
      />
    </article>
  );
}
