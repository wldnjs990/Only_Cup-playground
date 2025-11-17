import { useState, type ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';

import { ButtonCn } from '@/components/ui/button_cn';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export function DrawerUI({
  children,
  increaseFunc,
  decreaseFunc,
}: {
  children: ReactNode;
  increaseFunc: () => void;
  decreaseFunc: (idx: number) => void;
}) {
  const [count, setCount] = useState(1);

  function onClick(adjustment: number) {
    setCount(Math.max(1, Math.min(15, count + adjustment)));
  }

  return (
    <Drawer>
      {/* Drawer 버튼 */}
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      {/* Drawer 컨텐츠 */}
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>커핑 갯수 선택</DrawerTitle>
            <DrawerDescription>평가할 커피 갯수를 입력해주세요</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <ButtonCn
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => {
                  decreaseFunc(count)
                  onClick(-1)
                }}
                disabled={count <= 1}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </ButtonCn>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">{count}</div>
              </div>
              <ButtonCn
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => {
                  onClick(1)
                  increaseFunc()
                }}
                disabled={count >= 15}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </ButtonCn>
            </div>
          </div>
          <DrawerFooter>
            <ButtonCn>결정</ButtonCn>
            <DrawerClose asChild>
              <ButtonCn variant="outline">취소</ButtonCn>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
