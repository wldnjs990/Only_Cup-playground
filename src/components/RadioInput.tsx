import type { RHFPathProps } from '@/types/new/rhf-path';
import type { RadioInput } from '@/types/new/new_form_schema';
import { useFormContext, type FieldValues } from 'react-hook-form';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group_cn';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import ContentTitle from '@/pages/new-form-test/components/ContentTitle';
import ErrorMessage from './ErrorMessage';
import type { RadioInputConfig } from '@/types/new/server_config_schema';

export default function RadioInput<TFieldValues extends FieldValues>({
  path,
  config,
}: RHFPathProps<TFieldValues>) {
  const { register, formState, getFieldState } = useFormContext<TFieldValues>();

  // TODO : inputType에 따라 적절한 input UI를 반환해주는 통합 컴포넌트 만들기
  const { inputType, label, required, optionList, tooltip } = config as RadioInputConfig;

  const { error } = getFieldState(path, formState);

  return (
    <section>
      {/* 라디오 title */}
      <ContentTitle as="h2" title={label} tooltip={tooltip} required={required} />
      {/* 라디오 input */}
      <RadioGroup {...register(path)} className="relative flex justify-center gap-0">
        {optionList.map((option, idx) => {
          const { id, label, value } = option;
          return (
            <div
              key={id}
              className={twMerge(
                'border bg-gray-100 px-2 py-1 transition',
                'checked:border-purple-400 checked:bg-purple-400 checked:text-white',
                clsx(idx === 0 && 'rounded-l-full'),
                clsx(idx === optionList.length - 1 && 'rounded-r-full'),
              )}
            >
              <RadioGroupItem value={value} id={`${path}-${id}-${value}`} hidden />
              <Label htmlFor={`${path}-${id}-${value}`}>{label}</Label>
            </div>
          );
        })}
        {/* 라디오 error */}
        <ErrorMessage error={error} />
      </RadioGroup>
    </section>
  );
}
