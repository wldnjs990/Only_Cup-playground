import { useRef, type ReactNode } from 'react';
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

export function SettingDrawer({
  children,
  cuppingCount,
  increaseFunc,
  decreaseFunc,
}: {
  children: ReactNode;
  cuppingCount: number;
  increaseFunc: () => void;
  decreaseFunc: (idx: number) => void;
}) {
  const firstFocusRef = useRef<HTMLButtonElement | null>(null);

  const openChangeHandler = (open: boolean) => {
    // Vaul이 만든 drawer 라이브러리엔 접근성 관련해서 버그가 있음
    // drawer가 켜질때, focus를 drawer로 고정해야 하기 때문에 #root 영역에 aria-hidden을 걸고, drawer는 body 바깥에 활성화시킴
    // 그런데, body 안에 존재하는 shadcn의 버튼 컴포넌트가 focus를 계속 가지고 있어서 치명적인 접근성 오류를 발생시킴(drawer 올라왔는데도, 가려져야할 버튼이 포커싱됨)
    // 그래서 아래처럼 drawer를 열때, 강제로 focus를 drawer로 맞춰주는 함수를 집어넣는 방법이 있음
    if (open) {
      // 1. 기존 포커스(트리거 등) blur
      const active = document.activeElement as HTMLElement | null;
      active?.blur();
      // 2. 드로어 안의 특정 요소로 포커스 이동
      queueMicrotask(() => {
        firstFocusRef.current?.focus();
      });
    }
  };

  return (
    <Drawer onOpenChange={openChangeHandler}>
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
              {/* 가장 첫 번째 포커스를 이곳으로 지정하기 위한 ref 객체 */}
              <ButtonCn
                ref={firstFocusRef}
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => {
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
                onClick={() => {
                  increaseFunc();
                }}
                disabled={cuppingCount >= 15}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </ButtonCn>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <ButtonCn variant="outline">결정</ButtonCn>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
