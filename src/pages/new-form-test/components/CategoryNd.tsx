import { ButtonCn } from '@/components/ui/button_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function CategoryNd({
  ndNodeListPath,
  setLeafNodeListPath,
  valueListPath,
}: {
  ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`;
  setLeafNodeListPath: React.Dispatch<
    React.SetStateAction<
      | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
      | null
    >
  >;
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
}) {
  const { setValue, control, resetField, register } = useFormContext<TRootCuppingFormSchema>();

  const ndNodeList = useWatch({ name: ndNodeListPath, control });

  // 2뎁스 selected 핸들러
  const handleNdSelected = (
    ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`,
    selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.selected`,
    childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`,
    selected: boolean,
    selectedIdx: number,
  ) => {
    // 현재 선택된 노드가 있는지 체크
    const currentSelected = ndNodeList.findIndex((node) => node.selected);

    // valueList 초기화

    register(valueListPath);
    resetField(valueListPath);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택
    if (currentSelected !== selectedIdx && currentSelected >= 0) {
      register(ndNodeListPath);
      resetField(ndNodeListPath);
      setValue(selectedPath, !selected);
      setLeafNodeListPath(childrenPath);
    }
    // 이미 선택된 노드면 리셋
    else if (selected) {
      register(ndNodeListPath);
      resetField(ndNodeListPath);
      setLeafNodeListPath(null);
    }
    // 아니면 활성화
    else {
      setValue(selectedPath, !selected);
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
            key={id}
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
