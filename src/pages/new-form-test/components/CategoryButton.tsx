import { ButtonCn } from '@/components/ui/button_cn';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function CategoryButton({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonCn
      variant="outline"
      hoverEffect={true}
      className={twMerge(
        clsx(selected && 'bg-purple-400 text-white'),
        'aspect-square h-full w-1/4 rounded-full border border-purple-400 p-1 text-xs',
      )}
      onClick={onClick}
    >
      {children}
    </ButtonCn>
  );
}
