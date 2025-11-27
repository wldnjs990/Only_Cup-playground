import { ButtonCn } from '@/components/ui/button_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function CategorySt({
  stNodeListPath,
  setNdNodeListPath,
  setLeafNodeListPath,
  valueListPath,
}: {
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
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
}) {
  const { setValue, control, register, resetField } = useFormContext<TRootCuppingFormSchema>();

  const stNodeList = useWatch({ name: stNodeListPath, control });

  // 1뎁스 selected 핸들러
  const handleStSelected = (
    stNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree`,
    selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.selected`,
    childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`,
    selected: boolean,
    selectedIdx: number,
  ) => {
    // 현재 선택된 노드가 있는지 체크
    const currentSelected = stNodeList.findIndex((node) => node.selected);

    // valueList 초기화
    register(valueListPath);
    resetField(valueListPath);

    // leafNode 초기화
    setLeafNodeListPath(null);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택
    if (currentSelected !== selectedIdx && currentSelected >= 0) {
      register(stNodeListPath);
      resetField(stNodeListPath);
      setValue(selectedPath, !selected);
      setNdNodeListPath(childrenPath);
    }
    // 이미 선택된 노드면 리셋
    else if (selected) {
      register(stNodeListPath);
      resetField(stNodeListPath);
      setNdNodeListPath(null);
    }
    // 아니면 활성화
    else {
      setValue(selectedPath, !selected);
      setNdNodeListPath(childrenPath);
    }
  };

  return (
    <article>
      {stNodeList.map(({ id, label, selected }, idx) => {
        const childrenPath = `${stNodeListPath}.${idx}.children` as const;
        const selectedPath = `${stNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() =>
              handleStSelected(stNodeListPath, selectedPath, childrenPath, selected, idx)
            }
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
