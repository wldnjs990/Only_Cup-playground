import type { RHFPathProps } from '@/constants/new/rhf-path';
import type { RadioInput } from '@/types/new/new_form_schema';
import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group_cn';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { ToolTip } from '@/pages/new-form-test/components/ToolTip';

export default function RadioInput<TFieldValues extends FieldValues>({
  path,
}: RHFPathProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      name={path}
      control={control}
      render={({ field }) => {
        const { value, optionList, tooltip } = field.value as RadioInput;
        return (
          <RadioGroup
            defaultValue={value}
            onValueChange={(changingValue) => {
              const selected = optionList.find((opt) => opt.value === changingValue);
              field.onChange({ ...field.value, value: changingValue, label: selected?.label });
            }}
            className="relative flex justify-center gap-0"
          >
            <ToolTip tooltipText={tooltip} className="absolute right-0 h-6 w-6" />
            {optionList.map((option, idx) => {
              return (
                <div
                  key={option.value}
                  className={twMerge(
                    'border px-2 py-1 transition',
                    clsx(idx === 0 && 'rounded-l-full'),
                    clsx(idx === optionList.length - 1 && 'rounded-r-full'),
                    clsx(
                      option.value === value
                        ? 'border-purple-400 bg-purple-400 text-white'
                        : 'bg-gray-100',
                    ),
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`intensity-${idx}-${option.value}`}
                    hidden
                  />
                  <Label htmlFor={`intensity-${idx}-${option.value}`}>{option.label}</Label>
                </div>
              );
            })}
          </RadioGroup>
        );
      }}
    ></Controller>
  );
}
