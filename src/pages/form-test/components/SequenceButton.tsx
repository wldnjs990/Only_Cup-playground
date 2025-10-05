import { ButtonCn } from '@/components/ui/button_cn';

export default function SequenceButton({
  text,
  onClick,
  submit = false,
  className,
}: {
  text: string;
  onClick?: () => void;
  submit?: boolean;
  className?: string;
}) {
  return (
    <ButtonCn
      children={text}
      variant={'outline'}
      size={'lg'}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      className={className}
    />
  );
}
