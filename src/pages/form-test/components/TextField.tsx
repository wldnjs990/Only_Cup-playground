import { InputCn } from '@/components/ui/input_cn';
import type { EvaluationRootSchema } from '@/types/form_schema_mock';
import clsx from 'clsx';
import { useController, useFormContext, type FieldPathByValue } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function TextField({
  label,
  labelHide = false,
  nowPath,
  validateCallback,
}: {
  label?: string;
  labelHide?: boolean;
  nowPath: FieldPathByValue<EvaluationRootSchema, string | number>;
  validateCallback: () => true | string;
}) {
  const { control } = useFormContext<EvaluationRootSchema>();

  const { field, fieldState } = useController({
    control: control,
    name: nowPath,
    rules: {
      validate: validateCallback,
    },
  });

  return (
    <article className="flex items-center gap-2">
      <label htmlFor="sampleNoLabel" className="w-[20%] text-xs md:text-sm" hidden={labelHide}>
        {label}
      </label>
      <InputCn
        id="sampleNoLabel"
        value={field.value}
        onChange={(val) => field.onChange(val)}
        className={twMerge(
          'flex-1 text-sm md:text-[16px]',
          clsx(fieldState.error && 'border-red-600'),
        )}
      />
      {/* {sampleNoState && <p className="text-sm text-red-600">{sampleNoState.error?.message}</p>} */}
    </article>
  );
}
