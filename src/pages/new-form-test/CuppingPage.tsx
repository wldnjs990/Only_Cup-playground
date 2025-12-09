import { useFieldArray, useFormContext, type FieldPath } from 'react-hook-form';
import { SettingDrawer } from './components/SettingDrawerEx';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import CuppingItem from './components/CuppingItem';
import { ButtonCn } from '@/components/ui/button_cn';
import { NEW_FORM_SCHEMA } from '@/constants/new/new_form_schema_mock';
import useNewFormStore from '@/store/newFormStore';

export default function CuppingPage() {
  // store
  const step = useNewFormStore((state) => state.step);
  const nextstep = useNewFormStore((state) => state.nextstep);
  const prevstep = useNewFormStore((state) => state.prevstep);

  const cuppingCount = useNewFormStore((state) => state.cuppingCount);
  const increaseCuppingCount = useNewFormStore((state) => state.increaseCuppingCount);
  const decreaseCuppingCount = useNewFormStore((state) => state.decreaseCuppingCount);

  // rhf context
  const { control, trigger } = useFormContext<TRootCuppingFormSchema>();

  // rhf 동적 스키마 필드
  const {
    fields: root,
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
    remove(idx - 1);
    decreaseCuppingCount();
  };

  // 커핑 기본 정보 검증 후 다음 스텝 이동
  // TODO : 따로 함수 ts 파일에 분리해두기
  const validateBasicInfoAndGoNextStep = async () => {
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
    <section className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      <div className="h-full min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col flex-wrap sm:flex-row">
          {root.map((_, idx) => {
            return <CuppingItem key={idx} idx={idx} />;
          })}
        </ul>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-4">
        {/* 1페이지 */}
        {step == 1 && (
          <SettingDrawer
            cuppingCount={cuppingCount}
            increaseFunc={CuppingFormIncrease}
            decreaseFunc={CuppingFormDecrease}
          >
            <ButtonCn>커핑 갯수 설정</ButtonCn>
          </SettingDrawer>
        )}
        {step == 1 && <ButtonCn onClick={validateBasicInfoAndGoNextStep}>시작!</ButtonCn>}
        {/* 2페이지 */}
        {step == 2 && <ButtonCn>평가 완료!</ButtonCn>}
        {step == 2 && <ButtonCn onClick={goPrevStep}>뒤로가기</ButtonCn>}
      </div>
    </section>
  );
}
