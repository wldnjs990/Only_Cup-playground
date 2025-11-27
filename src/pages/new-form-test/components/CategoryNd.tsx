import { ButtonCn } from '@/components/ui/button_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function CategoryNd({
  ndNodeListPath,
  setLeafNodeListPath,
}: {
  ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`;
  setLeafNodeListPath: React.Dispatch<
    React.SetStateAction<
      | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
      | null
    >
  >;
}) {
  const { setValue, control, resetField } = useFormContext<TRootCuppingFormSchema>();

  const ndNodeList = useWatch({ name: ndNodeListPath, control });

  // 2뎁스 selected 핸들러
  const handleNdSelected = (
    ndNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`,
    ndNodePath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}`,
    selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.selected`,
    childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`,
    selected: boolean,
    selectedIdx: number,
  ) => {
    // 현재 선택된 노드가 있는지 체크
    const currentSelected = ndNodeList.findIndex((node) => node.selected);
    console.log(currentSelected, selectedIdx);
    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋
    if (currentSelected !== selectedIdx && currentSelected >= 0) {
      console.log(`${ndNodeListPath}.${currentSelected}.selected`);
      resetField(`${ndNodeListPath}.${currentSelected}`);
      setLeafNodeListPath(null);
    }

    // 이미 선택된 노드면 리셋, 아니면 활성화
    if (selected) {
      resetField(selectedPath);
      resetField(childrenPath);
      setLeafNodeListPath(null);
    } else {
      setValue(selectedPath, !selected);
      setLeafNodeListPath(childrenPath);
    }
  };
  return (
    <article className="flex gap-1">
      {ndNodeList.map(({ id, label, selected }, idx) => {
        const ndNodePath = `${ndNodeListPath}.${idx}` as const;
        const selectedPath = `${ndNodeListPath}.${idx}.selected` as const;
        const childrenPath = `${ndNodeListPath}.${idx}.children` as const;

        return (
          <ButtonCn
            key={id}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() =>
              handleNdSelected(
                ndNodeListPath,
                ndNodePath,
                selectedPath,
                childrenPath,
                selected,
                idx,
              )
            }
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
