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
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function SelectInput<TFieldValues extends FieldValues>({
  path,
}: RHFPathProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={path}
      control={control}
      // TODO : error 객체가 안받아지는지 에러 UI 핸들링이 안됨
      render={({ field, fieldState: { error } }) => {
        // TODO : 지금 select 데이터를 as 단언으로 억지로 SelectInput으로 맞춰놨음
        // as 단언 쓸 필요 없이 path 경로가 SelectInput 객체를 가지는 경로인지 검증하는 방법 찾기
        const { label, optionList, required } = field.value as SelectInput;
        return (
          <Select
            value={field.value.value}
            onValueChange={(changedValue) => {
              // 선택한 label값 역참조해서 가져오기(방법이 이거밖에 없따)
              const selected = optionList.find((opt) => opt.value === changedValue);

              field.onChange({
                ...field.value,
                value: changedValue,
                selectedName: selected?.label ?? '',
              });
            }}
            required={required}
          >
            <SelectTrigger
              className={twMerge('w-[280px]', clsx(error && 'border-red-500'))}
              onBlur={field.onBlur}
            >
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {optionList.map((option) => {
                  const { id, value, label } = option;
                  return (
                    <SelectItem key={id} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      }}
    />
  );
}
