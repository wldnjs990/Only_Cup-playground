import { ButtonCn } from '@/components/ui/button_cn';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function ToolTip({ tooltipText, className }: { tooltipText: string; className?: string }) {
  const { control } = useFormContext<TRootCuppingFormSchema>();
  // 툴팁 표시 / 제거 트리거
  const purpose = useWatch({ name: 'purpose.value', control });
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
