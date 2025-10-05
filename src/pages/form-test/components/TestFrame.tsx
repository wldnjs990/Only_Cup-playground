import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function TestFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main
      className={twMerge(
        'flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-white p-5 shadow-xl/20',
        className,
      )}
    >
      {children}
    </main>
  );
}
