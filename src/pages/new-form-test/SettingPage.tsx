import { useFieldArray, useFormContext, type FieldPath } from 'react-hook-form';
import { DrawerUI } from './components/DrawerEx';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import CuppingItem from './components/CuppingItem';
import { ButtonCn } from '@/components/ui/button_cn';
import { NEW_FORM_SCHEMA } from '@/constants/new/new_form_schema_mock';
import useNewFormStore from '@/store/newFormStore';

export default function SettingPage() {
  const { control, trigger } = useFormContext<TRootCuppingFormSchema>();

  const step = useNewFormStore((state) => state.step);
  const nextstep = useNewFormStore((state) => state.nextstep);
  const prevstep = useNewFormStore((state) => state.prevstep);

  const cuppingCount = useNewFormStore((state) => state.cuppingCount);
  const increaseCuppingCount = useNewFormStore((state) => state.increaseCuppingCount);
  const decreaseCuppingCount = useNewFormStore((state) => state.decreaseCuppingCount);

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
    increaseCuppingCount();
  };
  const CuppingFormDecrease = (idx: number) => {
    remove(idx);
    decreaseCuppingCount();
  };

  const validateAndGoNextStep = async () => {
    // TODO: 않이 이거 타입 맞는데 왜이래 타입단언해야하나.. => 타입단언했는데 무슨 해결책 없나
    const pathArr = new Array(cuppingCount)
      .fill(0)
      .map((_, idx) => `root.${idx}.basicInfo`) as FieldPath<TRootCuppingFormSchema>[];
    const isValid = await trigger(pathArr);
    if (!isValid) alert('커핑할 원두를 모두 선택해주세요!');
    else {
      nextstep();
    }
  };

  const goPrevStep = async () => {
    prevstep();
  };

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex w-full flex-wrap">
          {F_root.map((_, idx) => {
            return <CuppingItem key={idx} idx={idx} />;
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        {step == 1 && (
          <DrawerUI increaseFunc={CuppingFormIncrease} decreaseFunc={CuppingFormDecrease}>
            <ButtonCn>커핑 갯수 설정</ButtonCn>
          </DrawerUI>
        )}
        {/* 1페이지 */}
        {step == 1 && <ButtonCn onClick={validateAndGoNextStep}>시작!</ButtonCn>}
        {/* 2페이지 */}
        {step == 2 && <ButtonCn onClick={goPrevStep}>뒤로가기</ButtonCn>}
      </div>
    </section>
  );
}
