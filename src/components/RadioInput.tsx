import type { RHFRadioPathProps } from '@/types/new/rhf-path';
import type { RadioInput } from '@/types/new/new_form_schema';
import { useFormContext, useWatch, type FieldValues, type PathValue } from 'react-hook-form';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group_cn';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import ContentTitle from '@/pages/new-form-test/components/ContentTitle';
import ErrorMessage from './ErrorMessage';

export default function RadioInput<TFieldValues extends FieldValues>({
  valuePath,
  labelPath,
  config,
  className,
}: RHFRadioPathProps<TFieldValues>) {
  const { control, setValue, formState, getFieldState } = useFormContext<TFieldValues>();

  // TODO : inputType에 따라 적절한 input UI를 반환해주는 통합 컴포넌트 만들기
  const { title, label, required, optionList, tooltip } = config;

  const { error } = getFieldState(valuePath, formState);

  // useWatch로 값 감시 (기본값: 빈 문자열)
  const watchedValue = useWatch({ name: valuePath, control });
  const selectedValue = (watchedValue ?? '') as string;

  const handleValueChange = (value: string) => {
    // value 저장
    setValue(valuePath, value as PathValue<TFieldValues, typeof valuePath>);

    // label도 함께 저장
    const selectedOption = optionList.find((opt) => opt.value === value);
    if (selectedOption) {
      setValue(labelPath, selectedOption.label as PathValue<TFieldValues, typeof labelPath>);
    }
  };

  return (
    <section className="relative py-2">
      {/* 라디오 title */}
      <ContentTitle as="h2" title={title} tooltip={tooltip} required={required} />
      <span className="sr-only">{label}</span>
      {/* 라디오 input */}
      <RadioGroup
        value={selectedValue}
        onValueChange={handleValueChange}
        className="relative flex justify-center gap-0"
      >
        {optionList.map((option, idx) => {
          const isSelected = selectedValue === option.value;
          return (
            <div
              key={option.id}
              className={twMerge(
                'border bg-gray-100 px-2 py-1 transition',
                clsx(isSelected && 'border-purple-400 bg-purple-400 text-white'),
                clsx(idx === 0 && 'rounded-l-full'),
                clsx(idx === optionList.length - 1 && 'rounded-r-full'),
              )}
            >
              <RadioGroupItem
                value={option.value}
                id={`${valuePath}-${option.id}-${option.value}`}
                hidden
              />
              <Label htmlFor={`${valuePath}-${option.id}-${option.value}`} className={className}>
                {option.label}
              </Label>
            </div>
          );
        })}
        {/* 라디오 error */}
        <ErrorMessage error={error} />
      </RadioGroup>
    </section>
  );
}
