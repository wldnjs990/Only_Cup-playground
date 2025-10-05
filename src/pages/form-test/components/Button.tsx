import { ButtonCn } from '@/components/ui/button_cn';

export default function Button({ title, onClick }: { title: string; onClick?: () => void }) {
  return (
    <>
      <ButtonCn value={title} onClick={() => onClick} />
    </>
  );
}
