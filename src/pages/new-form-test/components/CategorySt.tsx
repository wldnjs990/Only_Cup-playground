import { ButtonCn } from '@/components/ui/button_cn';
import { categoryTree } from '@/constants/new/category_tree';
import type { CategoryName, TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

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
  categoryName: CategoryName;
  setStNodeIdx: React.Dispatch<React.SetStateAction<number>>;
  stNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree`;
  setNdNodeListPath: React.Dispatch<
    React.SetStateAction<
      `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children` | null
    >
  >;
  setLeafNodeListPath: React.Dispatch<
    React.SetStateAction<
      | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
      | null
    >
  >;
}

export default function CategorySt({
  categoryName,
  setStNodeIdx,
  stNodeListPath,
  setNdNodeListPath,
  setLeafNodeListPath,
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

    // 현재 선택된 노드가 있는지 체크
    const currentSelected = stNodeList.findIndex((node) => node.selected);

    // leafNode 초기화
    setLeafNodeListPath(null);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택
    if (currentSelected !== selectedIdx && currentSelected >= 0) {
      setValue(stNodeListPath, initialCategory);
      setValue(selectedPath, !selected);
      setNdNodeListPath(childrenPath);
      setStNodeIdx(selectedIdx);
    }
    // 이미 선택된 노드면 리셋
    else if (selected) {
      setValue(stNodeListPath, initialCategory);
      setNdNodeListPath(null);
    }
    // 아니면 활성화
    else {
      setValue(selectedPath, !selected);
      setNdNodeListPath(childrenPath);
      setStNodeIdx(selectedIdx);
    }
  };

  return (
    <article>
      {stNodeList.map(({ id, label, selected }, idx) => {
        const childrenPath = `${stNodeListPath}.${idx}.children` as const;
        const selectedPath = `${stNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id + label + categoryName}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() =>
              handleStNodeClick(stNodeListPath, selectedPath, childrenPath, selected, idx)
            }
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
