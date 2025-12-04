import { ButtonCn } from '@/components/ui/button_cn';
import createDetailEvaluations from '@/constants/new/category_detail_evaluations';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

// 리프 selected 핸들러 타입
type T_HandleLeafNodeClick = (
  selected: boolean,
  label: string,
  value: string,
  selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children.${number}.selected`,
) => void;

// props 타입
interface T_CategoryFeaf {
  categoryButtonStyle: (selected: boolean) => string;
  leafNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`;
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
  nowCategoryEvaluationListPath: `root.${number}.evaluationList.${number}.detailEvaluation.categoryEvaluationList`;
}

export default function CategoryLeaf({
  categoryButtonStyle,
  leafNodeListPath,
  valueListPath,
  nowCategoryEvaluationListPath,
}: T_CategoryFeaf) {
  const { control, setValue } = useFormContext<TRootCuppingFormSchema>();

  const leafNodeList = useWatch({ name: leafNodeListPath, control });
  const valueList = useWatch({ name: valueListPath, control });

  const { append, remove } = useFieldArray({ control, name: nowCategoryEvaluationListPath });

  // 리프 selected 핸들러
  const handleLeafNodeClick: T_HandleLeafNodeClick = (selected, value, label, selectedPath) => {
    // 선택
    if (!selected) {
      // 카테고리 상세 평가 목록 추가
      const newCreateDetailEvaluations = createDetailEvaluations(value, label);
      append(newCreateDetailEvaluations);
      // 카테고리 추가
      setValue(valueListPath, [...valueList, value]);
    }

    // 선택 취소
    if (selected) {
      // 카테고리 상세 평가 목록 제거
      const removeIdx = valueList.findIndex((cur) => value === cur);
      remove(removeIdx);
      // 카테고리 제거
      setValue(
        valueListPath,
        valueList.filter((_, idx) => idx !== removeIdx),
      );
    }

    // 클릭한 노드 selected 업데이트
    setValue(selectedPath, !selected);
  };

  return (
    <>
      {leafNodeList.map(({ id, label, selected, value }, idx) => {
        const selectedPath = `${leafNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id + label}
            className={categoryButtonStyle(selected)}
            onClick={() => {
              handleLeafNodeClick(selected, value, label, selectedPath);
            }}
          >
            {label}
          </ButtonCn>
        );
      })}
    </>
  );
}
