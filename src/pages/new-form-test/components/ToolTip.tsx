import { ButtonCn } from '@/components/ui/button_cn';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function ToolTip({ tooltipText }: { tooltipText: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonCn variant="outline" className="h-7 w-7 rounded-full p-0">
          ?
        </ButtonCn>
      </PopoverTrigger>
      <PopoverContent>
        <p>{tooltipText}</p>
      </PopoverContent>
    </Popover>
  );
}
