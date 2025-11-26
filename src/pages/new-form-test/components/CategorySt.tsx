import { ButtonCn } from '@/components/ui/button_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function CategorySt({
  stNodeListPath,
  setNdNodeListPath,
}: {
  stNodeListPath: `root.${number}.evaluationList.${number}.category.cascaderTree`;
  setNdNodeListPath: React.Dispatch<
    React.SetStateAction<
      `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children` | null
    >
  >;
}) {
  const { getValues, setValue, control } = useFormContext<TRootCuppingFormSchema>();

  const stNodeList = getValues(stNodeListPath);

  useWatch({ name: stNodeListPath, control });

  return (
    <article>
      {stNodeList.map(({ id, label, selected }, idx) => {
        const childrenPath = `${stNodeListPath}.${idx}.children` as const;
        const selectedPath = `${stNodeListPath}.${idx}.selected` as const;

        return (
          <ButtonCn
            key={id}
            className={twMerge(clsx(selected && 'bg-amber-200'), 'border p-2')}
            onClick={() => {
              setValue(selectedPath, !selected);
              setNdNodeListPath(childrenPath);
            }}
          >
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
