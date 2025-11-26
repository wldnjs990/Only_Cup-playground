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
              const exist = valueList.findIndex((cur) => cur === value);
              const updateValueList = valueList.filter((_, idx) => (idx === exist ? true : false));
              if (exist === -1) updateValueList.push(value);
              setValue(selectedPath, !selected);
              setValue(valueListPath, updateValueList);
            }}
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
