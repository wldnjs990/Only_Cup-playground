import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select_cn';
import type { RHFPathProps } from '@/types/new/rhf-path';
import type { SelectInput } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext, useWatch, type FieldValues, type PathValue } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { SelectInputConfig } from '@/types/new/server_config_schema';
import ContentTitle from '@/pages/new-form-test/components/ContentTitle';

export function SelectInput<TFieldValues extends FieldValues>({
  path,
  config,
}: RHFPathProps<TFieldValues>) {
  const { control, setValue, formState, getFieldState } = useFormContext<TFieldValues>();

  // TODO : inputType에 따라 적절한 input UI를 반환해주는 통합 컴포넌트 만들기
  const { title, placeholder, label, required, optionList, tooltip } = config as SelectInputConfig;

  const { error } = getFieldState(path, formState);

  // useWatch로 값 감시 (기본값: 빈 문자열)
  const watchedValue = useWatch({ name: path, control });
  const selectedValue = (watchedValue ?? '') as string;

  const handleValueChange = (value: string) => {
    setValue(path, value as PathValue<TFieldValues, typeof path>);
  };

  return (
    <section>
      {title && <ContentTitle title={title} required={required} tooltip={tooltip} />}
      <Select value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger className={twMerge('w-[280px]', clsx(error && 'border-red-500'))}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {optionList.map((option) => {
              return (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
}
