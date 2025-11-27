import { ButtonCn } from '@/components/ui/button_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function CategoryLeaf({
  leafNodeListPath,
  valueListPath,
}: {
  leafNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`;
  valueListPath: `root.${number}.evaluationList.${number}.category.valueList`;
}) {
  const { control, setValue } = useFormContext<TRootCuppingFormSchema>();

  const leafNodeList = useWatch({ name: leafNodeListPath, control });
  const valueList = useWatch({ name: valueListPath, control });
  return (
    <article className="flex gap-1">
      {leafNodeList.map(({ id, label, selected, value }, idx) => {
        const selectedPath = `${leafNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() => {
              if (selected) {
                setValue(
                  valueListPath,
                  valueList.filter((cur) => value !== cur),
                );
              } else {
                setValue(valueListPath, [...valueList, value]);
              }
              setValue(selectedPath, !selected);
            }}
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
