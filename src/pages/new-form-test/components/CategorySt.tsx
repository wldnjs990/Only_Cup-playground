import { ButtonCn } from '@/components/ui/button_cn';
import { categoryTree } from '@/constants/new/category_tree';
import type { CategoryName, TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, useWatch } from 'react-hook-form';

// 1뎁스 selected 핸들러 타입
type T_HandleStNodeClick = (
  stNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree`,
  selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.selected`,
  childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`,
  selected: boolean,
  selectedIdx: number,
) => void;

// props 타입
interface T_CategorySt {
  categoryButtonStyle: (selected: boolean) => string;
  categoryName: CategoryName;
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
  stNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree`;
  nowCategoryEvaluationListPath: `root.${number}.evaluationList.${number}.detailEvaluation.categoryEvaluationList`;
  setNowDepth: React.Dispatch<React.SetStateAction<number>>;
  setStNodeIdx: React.Dispatch<React.SetStateAction<number>>;
  setNdNodeListPath: React.Dispatch<
    React.SetStateAction<
      `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children` | null
    >
  >;
}

export default function CategorySt({
  categoryButtonStyle,
  categoryName,
  valueListPath,
  stNodeListPath,
  nowCategoryEvaluationListPath,
  setNowDepth,
  setStNodeIdx,
  setNdNodeListPath,
}: T_CategorySt) {
  const { setValue, control } = useFormContext<TRootCuppingFormSchema>();

  const stNodeList = useWatch({ name: stNodeListPath, control });

  // 1뎁스 selected 핸들러
  const handleStNodeClick: T_HandleStNodeClick = (
    stNodeListPath,
    selectedPath,
    childrenPath,
    selected,
    selectedIdx,
  ) => {
    // 초기화용 categoryTree 상수
    const initialCategory = categoryTree[categoryName];

    // 이미 선택된 노드면 다음 뎁스 이동
    if (selected) {
      setNowDepth((cur) => cur + 1);
      return;
    }

    // valueList 필드 초기화
    setValue(valueListPath, []);
    // CategoryEvaluationList 필드 초기화
    setValue(nowCategoryEvaluationListPath, []);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택
    setValue(stNodeListPath, initialCategory);
    setValue(selectedPath, !selected);
    setNdNodeListPath(childrenPath);
    setStNodeIdx(selectedIdx);
    setNowDepth((cur) => cur + 1);
  };

  return (
    <>
      {stNodeList.map(({ id, label, selected }, idx) => {
        const childrenPath = `${stNodeListPath}.${idx}.children` as const;
        const selectedPath = `${stNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id + label + categoryName}
            className={categoryButtonStyle(selected)}
            onClick={() =>
              handleStNodeClick(stNodeListPath, selectedPath, childrenPath, selected, idx)
            }
          >
            {label}
          </ButtonCn>
        );
      })}
    </>
  );
}
