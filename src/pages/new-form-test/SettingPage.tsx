import { useFieldArray, useFormContext } from 'react-hook-form';
import { DrawerUI } from './components/DrawerEx';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import CuppingInfoItem from './components/SettingPage/CuppingInfoItem';
import { ButtonCn } from '@/components/ui/button_cn';
import { NEW_FORM_SCHEMA } from '@/constants/new/new_form_schema_mock';

export default function SettingPage() {
  const { control } = useFormContext<TRootCuppingFormSchema>();

  // 동적 스키마 필드
  const {
    fields: F_root,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'root',
  });

  // 커핑 추가, 제거
  const CuppingFormIncrease = () => {
    append(NEW_FORM_SCHEMA);
  };
  const CuppingFormDecrease = (idx: number) => {
    remove(idx);
  };
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <ul className="flex w-full flex-wrap">
        {F_root.map((_, idx) => {
          return <CuppingInfoItem key={idx} idx={idx} />;
        })}
      </ul>

      <DrawerUI increaseFunc={CuppingFormIncrease} decreaseFunc={CuppingFormDecrease}>
        <ButtonCn>커핑 갯수 설정</ButtonCn>
      </DrawerUI>
    </section>
  );
}
