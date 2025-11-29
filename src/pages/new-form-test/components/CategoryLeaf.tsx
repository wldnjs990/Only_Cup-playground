import { ButtonCn } from '@/components/ui/button_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

// 리프 selected 핸들러 타입
type T_HandleLeafNodeClick = (
  selected: boolean,
  value: string,
  selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children.${number}.selected`,
) => void;

// props 타입
interface T_CategoryFeaf {
  leafNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`;
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
}

export default function CategoryLeaf({ leafNodeListPath, valueListPath }: T_CategoryFeaf) {
  const { control, setValue } = useFormContext<TRootCuppingFormSchema>();

  const leafNodeList = useWatch({ name: leafNodeListPath, control });
  const valueList = useWatch({ name: valueListPath, control });

  // 리프 selected 핸들러
  const handleLeafNodeClick: T_HandleLeafNodeClick = (selected, value, selectedPath) => {
    if (selected) {
      setValue(
        valueListPath,
        valueList.filter((cur) => value !== cur),
      );
    } else {
      setValue(valueListPath, [...valueList, value]);
    }
    setValue(selectedPath, !selected);
  };

  return (
    <article className="flex gap-1">
      {leafNodeList.map(({ id, label, selected, value }, idx) => {
        const selectedPath = `${leafNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id + label}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() => {
              handleLeafNodeClick(selected, value, selectedPath);
            }}
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
