import { useRef } from 'react';
import { Minus, Plus } from 'lucide-react';

import { ButtonCn } from '@/components/ui/button_cn';

export function SettingDrawer({
  cuppingCount,
  increaseFunc,
  decreaseFunc,
}: {
  cuppingCount: number;
  increaseFunc: () => void;
  decreaseFunc: (idx: number) => void;
}) {
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="p-4 pb-0">
      <div className="flex items-center justify-center space-x-2">
        {/* 가장 첫 번째 포커스를 이곳으로 지정하기 위한 ref 객체 */}
        <ButtonCn
          ref={firstFocusRef}
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
          <span className="sr-only">Decrease</span>
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
          <span className="sr-only">Increase</span>
        </ButtonCn>
      </div>
    </div>
  );
}
