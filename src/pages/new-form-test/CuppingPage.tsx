import { useFieldArray, useFormContext, type FieldPath } from 'react-hook-form';
import { SettingDrawer } from './components/SettingDrawerEx';
import CuppingItem from './components/CuppingItem';
import { ButtonCn } from '@/components/ui/button_cn';
import RadioInput from '@/components/RadioInput';
import ContentTitle from './components/ContentTitle';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import { createEmptyCuppingFormValue } from '@/constants/new/form_values_mock';

export default function CuppingPage() {
  // rhf context
  const { control, trigger } = useFormContext<RootCuppingFormValue>();

  // 동적 스키마 필드
  const {
    fields: cuppings,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'cuppings',
  });

  // 커핑 추가, 제거
  const CuppingFormIncrease = () => {
    append(createEmptyCuppingFormValue());
  };
  const CuppingFormDecrease = (idx: number) => {
    remove(idx - 1);
  };

  // 커핑 기본 정보 검증 후 다음 스텝 이동
  // TODO : 따로 함수 ts 파일에 분리해두기
  const validateBasicInfoAndGoNextStep = async () => {
    // TODO: 않이 이거 타입 맞는데 왜이래 타입단언해야하나.. => 타입단언했는데 무슨 해결책 없나

    const cuppingsLength = cuppings.length;

    const pathArr = new Array(cuppingsLength)
      .fill(0)
      .map((_, idx) => `cuppings.${idx}.coffeeId`) as `cuppings.${number}.coffeeId`[];
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
      <RadioInput path="purpose" />
      {step === 2 && (
        <ContentTitle
          as="h2"
          title="사진 클릭해서 평가해주세요.(임시)"
          className="mt-5 flex justify-center"
        />
      )}

      <div className="h-full min-h-0 flex-1 overflow-y-auto">
        <ul className="grid h-fit grid-cols-1 sm:grid-cols-2">
          {cuppings.map((_, idx) => {
            return <CuppingItem key={idx} idx={idx} />;
          })}
        </ul>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-4">
        {/* 1페이지 */}
        {step === 1 && (
          <SettingDrawer
            cuppingCount={cuppingCount}
            increaseFunc={CuppingFormIncrease}
            decreaseFunc={CuppingFormDecrease}
          />
        )}
        {step === 1 && <ButtonCn onClick={validateBasicInfoAndGoNextStep}>시작!</ButtonCn>}
        {/* 2페이지 */}
        {step === 2 && <ButtonCn>평가 완료!</ButtonCn>}
        {step === 2 && <ButtonCn onClick={goPrevStep}>뒤로가기</ButtonCn>}
      </div>
    </section>
  );
}
