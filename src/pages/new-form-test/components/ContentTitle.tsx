import { twMerge } from 'tailwind-merge';
import { ToolTip } from './ToolTip';

// h1, h2, h3 인지 등을 설정해줘야 하는데..
// TODO : 이거 컴파운드 컴포넌트로 한번 만들어보자 나중에
type HeadingLevel = 'h1' | 'h2' | 'h3';
export default function ContentTitle({
  title,
  as = 'h1',
  className = '',
  required = false,
  tooltip = '',
}: {
  title?: string;
  as?: HeadingLevel;
  className?: string;
  required?: boolean;
  tooltip?: string;
}) {
  const HTag = as;
  const HTagClassName = {
    h1: 'h1-style',
    h2: 'h2-style',
    h3: 'h3-style',
  };

  // 툴팁만 보여주고싶을때(relative를 부모에 걸어줘야함!)
  if (!title)
    return (
      <>
        {tooltip && (
          <ToolTip tooltipText={tooltip} className="absolute top-2 right-0 z-10 -translate-0.5" />
        )}
      </>
    );

  return (
    <article className={twMerge('flex justify-between', className)}>
      <article className="flex gap-2">
        <HTag className={twMerge('font-bold', HTagClassName[HTag])}>{title}</HTag>
        {required && <span className="text-red-600">*</span>}
      </article>
      {tooltip && <ToolTip tooltipText={tooltip} />}
    </article>
  );
}
