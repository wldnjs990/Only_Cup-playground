import { ButtonCn } from '@/components/ui/button_cn';

export default function DownloadButton({
  title,
  onClick,
  className,
}: {
  title: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <>
      <ButtonCn children={title} size={'lg'} onClick={onClick} className={className} />
    </>
  );
}
