import { ToolTip } from './ToolTip';

// h1, h2, h3 인지 등을 설정해줘야 하는데..
// TODO : 이거 컴파운드 컴포넌트로 한번 만들어보자 나중에
export default function ContentTitle({
  title,
  required = false,
  tooltip = '',
}: {
  title: string;
  required?: boolean;
  tooltip?: string;
}) {
  return (
    <article className="flex justify-between">
      <article className="flex gap-2">
        <span className="font-bold">{title}</span>
        {required && <span className="text-red-600">*</span>}
      </article>
      {tooltip && <ToolTip tooltipText={tooltip} />}
    </article>
  );
}
