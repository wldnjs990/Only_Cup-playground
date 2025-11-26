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
  const { getValues, setValue, control } = useFormContext<TRootCuppingFormSchema>();

  useWatch({ name: ndNodeListPath, control });

  const ndNodeList = getValues(ndNodeListPath);
  return (
    <article className="flex gap-1">
      {ndNodeList.map(({ id, label, selected }, idx) => {
        const childrenPath = `${ndNodeListPath}.${idx}.children` as const;
        const selectedPath = `${ndNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() => {
              setValue(selectedPath, !selected);
              setLeafNodeListPath(childrenPath);
            }}
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
