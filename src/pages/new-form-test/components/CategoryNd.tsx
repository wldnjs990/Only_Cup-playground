import { ButtonCn } from '@/components/ui/button_cn';
import { categoryTree } from '@/constants/new/category_tree';
import type { CategoryName, TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function CategoryNd({
  stNodeIdx,
  categoryName,
  ndNodeListPath,
  setLeafNodeListPath,
  valueListPath,
}: {
  stNodeIdx: number;
  categoryName: CategoryName;
  ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`;
  setLeafNodeListPath: React.Dispatch<
    React.SetStateAction<
      | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
      | null
    >
  >;
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
}) {
  useEffect(() => {
    console.log(stNodeIdx);
  });
  const { setValue, control } = useFormContext<TRootCuppingFormSchema>();

  const ndNodeList = useWatch({ name: ndNodeListPath, control });

  // 2뎁스 selected 핸들러
  const handleNdSelected = (
    ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`,
    selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.selected`,
    childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`,
    selected: boolean,
    selectedIdx: number,
  ) => {
    // 초기화용 categoryTree 상수
    const initialCategory = categoryTree[categoryName][stNodeIdx].children;

    // 현재 선택된 노드가 있는지 체크
    const currentSelected = ndNodeList.findIndex((node) => node.selected);

    // valueList 필드 초기화
    setValue(valueListPath, []);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택
    if (currentSelected !== selectedIdx && currentSelected >= 0) {
      // 2뎁스 노드 초기화
      setValue(ndNodeListPath, initialCategory);
      // 선택 해제
      setValue(selectedPath, !selected);
      // 리프 노드 경로 등록
      setLeafNodeListPath(childrenPath);
    }
    // 이미 선택된 노드면 리셋
    else if (selected) {
      // 2뎁스 노드 초기화
      setValue(ndNodeListPath, initialCategory);
      // 리프 노드 경로 초기화
      setLeafNodeListPath(null);
    }
    // 아니면 활성화
    else {
      // 선택한 2뎁스 노드 select 활성화
      setValue(selectedPath, !selected);
      // 리프 노드 경로 등록
      setLeafNodeListPath(childrenPath);
    }
  };

  return (
    <article className="flex gap-1">
      {ndNodeList.map(({ id, label, selected }, idx) => {
        const selectedPath = `${ndNodeListPath}.${idx}.selected` as const;
        const childrenPath = `${ndNodeListPath}.${idx}.children` as const;

        return (
          <ButtonCn
            key={id + label + categoryName}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() =>
              handleNdSelected(ndNodeListPath, selectedPath, childrenPath, selected, idx)
            }
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
