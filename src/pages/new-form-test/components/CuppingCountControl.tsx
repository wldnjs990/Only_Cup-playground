import { Minus, Plus } from 'lucide-react';

import { ButtonCn } from '@/components/ui/button_cn';

export function CuppingCountControl({
  cuppingCount,
  increaseFunc,
  decreaseFunc,
}: {
  cuppingCount: number;
  increaseFunc: () => void;
  decreaseFunc: (idx: number) => void;
}) {
  return (
    <div className="p-4 pb-0">
      <div className="flex items-center justify-center space-x-2">
        <ButtonCn
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            decreaseFunc(cuppingCount);
          }}
          disabled={cuppingCount <= 1}
        >
          <Minus />
          <span className="sr-only">감소버튼</span>
        </ButtonCn>
        <div className="flex-1 text-center">
          <div className="text-7xl font-bold tracking-tighter">{cuppingCount}</div>
        </div>
        <ButtonCn
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            increaseFunc();
          }}
          disabled={cuppingCount >= 15}
        >
          <Plus />
          <span className="sr-only">증가버튼</span>
        </ButtonCn>
      </div>
    </div>
  );
}
