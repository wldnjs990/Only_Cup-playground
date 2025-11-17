import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext } from 'react-hook-form';

export default function CuppingInfoItem({ idx }: { idx: number }) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();
  const basicInfo = getValues(`root.${idx}.basicInfo`);

  return <li className="flex-1/2">{basicInfo.title.label}</li>;
}
