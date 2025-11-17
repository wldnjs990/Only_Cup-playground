import onlycup_logo_200 from '@/assets/images/onlycup_logo_200.png';
import { SelectInput } from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import type { FieldPath } from 'react-hook-form';

export default function CuppingInfoItem({ idx }: { idx: number }) {
  const basicInfoTitlePath: FieldPath<TRootCuppingFormSchema> = `root.${idx}.basicInfo.title`;
  const basicInfoPurposePath: FieldPath<TRootCuppingFormSchema> = `root.${idx}.basicInfo.purpose`;

  return (
    <li className="flex flex-1/2 flex-col items-center justify-center gap-4 p-4">
      <img src={onlycup_logo_200} alt="커핑 이미지" className="h-40 w-40 rounded-full border" />
      <SelectInput<TRootCuppingFormSchema> path={basicInfoTitlePath} />
      <TextInput<TRootCuppingFormSchema> path={basicInfoPurposePath} />
    </li>
  );
}
