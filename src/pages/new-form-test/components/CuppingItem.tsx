import onlycup_logo_200 from '@/assets/images/onlycup_logo_200.png';
import { SelectInput } from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext } from 'react-hook-form';
import { EvaluationDrawer } from './EvaluationDrawer';
import useNewFormStore from '@/store/newFormStore';

export default function CuppingItem({ idx }: { idx: number }) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const step = useNewFormStore((state) => state.step);

  const basicInfoTitlePath = `root.${idx}.basicInfo.title` as const;
  const basicInfoPurposePath = `root.${idx}.basicInfo.purpose` as const;
  const evaluationListPath = `root.${idx}.evaluationList` as const;

  const title = getValues(basicInfoTitlePath);

  return (
    <li className="flex flex-1/2 flex-col items-center justify-center gap-2 p-4">
      {step == 2 && <p>사진 클릭해서 평가해주세요.(임시)</p>}
      <EvaluationDrawer
        imgPath={onlycup_logo_200}
        basicInfoTitlePath={basicInfoTitlePath}
        evaluationListPath={evaluationListPath}
      />
      {step == 2 && <span className="font-bold">{title.selectedName}</span>}
      {step == 1 && <SelectInput<TRootCuppingFormSchema> path={basicInfoTitlePath} />}
      {step == 1 && <TextInput<TRootCuppingFormSchema> path={basicInfoPurposePath} />}
    </li>
  );
}
