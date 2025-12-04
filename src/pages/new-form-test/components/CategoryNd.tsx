import { ButtonCn } from '@/components/ui/button_cn';
import { categoryTree } from '@/constants/new/category_tree';
import type { CategoryName, TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, useWatch } from 'react-hook-form';

// 2뎁스 selected 핸들러 타입
type T_HandleNdNodeClick = (
  ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`,
  selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.selected`,
  childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`,
  selected: boolean,
) => void;

// props 타입
interface T_CategoryNd {
  categoryButtonStyle: (selected: boolean) => string;
  stNodeIdx: number;
  categoryName: CategoryName;
  ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`;
  setNowDepth: React.Dispatch<React.SetStateAction<number>>;
  setLeafNodeListPath: React.Dispatch<
    React.SetStateAction<
      | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
      | null
    >
  >;
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
  nowCategoryEvaluationListPath: `root.${number}.evaluationList.${number}.detailEvaluation.categoryEvaluationList`;
}

export default function CategoryNd({
  categoryButtonStyle,
  stNodeIdx,
  categoryName,
  ndNodeListPath,
  setNowDepth,
  setLeafNodeListPath,
  valueListPath,
  nowCategoryEvaluationListPath,
}: T_CategoryNd) {
  const { setValue, control } = useFormContext<TRootCuppingFormSchema>();

  const ndNodeList = useWatch({ name: ndNodeListPath, control });

  // 2뎁스 selected 핸들러
  const handleNdNodeClick: T_HandleNdNodeClick = (
    ndNodeListPath,
    selectedPath,
    childrenPath,
    selected,
  ) => {
    // 초기화용 categoryTree 상수
    const initialCategory = categoryTree[categoryName][stNodeIdx].children;

    // 이미 선택된 노드면 다음 노드 이동
    if (selected) {
      setNowDepth((cur) => cur + 1);
      return;
    }

    // valueList 필드 초기화
    setValue(valueListPath, []);
    // CategoryEvaluationList 필드 초기화
    setValue(nowCategoryEvaluationListPath, []);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택

    // 2뎁스 노드 초기화
    setValue(ndNodeListPath, initialCategory);
    // 선택 해제
    setValue(selectedPath, !selected);
    // 리프 노드 경로 등록
    setLeafNodeListPath(childrenPath);
    setNowDepth((cur) => cur + 1);
  };

  return (
    <>
      {ndNodeList.map(({ id, label, selected }, idx) => {
        const selectedPath = `${ndNodeListPath}.${idx}.selected` as const;
        const childrenPath = `${ndNodeListPath}.${idx}.children` as const;

        return (
          <ButtonCn
            key={id + label + categoryName}
            className={categoryButtonStyle(selected)}
            onClick={() => handleNdNodeClick(ndNodeListPath, selectedPath, childrenPath, selected)}
          >
            {label}
          </ButtonCn>
        );
      })}
    </>
  );
}
