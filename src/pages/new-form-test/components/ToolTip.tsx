import { ButtonCn } from '@/components/ui/button_cn';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function ToolTip({ tooltipText, className }: { tooltipText: string; className?: string }) {
  const { getValues } = useFormContext<RootCuppingFormValue>();
  // 툴팁 표시 / 제거 트리거
  const purpose = getValues('purposeValue');
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonCn
          variant="outline"
          className={twMerge(
            'h-7 w-7 rounded-full p-0',
            className,
            purpose === 'expert' && 'hidden',
          )}
        >
          ?
        </ButtonCn>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm whitespace-pre-line">{tooltipText}</p>
      </PopoverContent>
    </Popover>
  );
}
