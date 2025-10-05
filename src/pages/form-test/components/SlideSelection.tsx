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
  // 0개도 가능한 경우)
  // TODO : 0개 선택 가능한 요소임을 검증하는 boolean값 json에 추가해서 리팩토링 하기)
  let zeroAble = false;
  switch (slider_range) {
    case 9:
      slideSelection = useWatch({ control: control, name: nowPath }) as AssessmentsSchema;
      break;
    case 5:
      slideSelection = useWatch({ control: control, name: nowPath }) as CupDefectItemsSchema;
      // 지금 컵 결점 선택은 0개도 가능한데, 그걸 검증하는 방법이 따로 없어서 이렇게 하드코딩식으로 변수를 넣었는데 리팩토링 해야함
      zeroAble = true;
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
        <h3 className="h3-style md:h3-md-style">{label}</h3>
        <span className="text-xs md:text-sm">
          {selected} / {range}
        </span>
      </div>

      <SliderCn
        max={range}
        min={0}
        step={1}
        value={[selected]}
        onValueChange={(val) => {
          if (!zeroAble && val[0] < 1) return;
          setValue(selectedPath, val[0]);
        }}
      />
    </article>
  );
}
