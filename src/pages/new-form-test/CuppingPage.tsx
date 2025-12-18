import { useFieldArray, useFormContext } from 'react-hook-form';
import { CuppingCountControl } from './components/CuppingCountControl';
import CuppingItem from './components/CuppingItem';
import { ButtonCn } from '@/components/ui/button_cn';
import RadioInput from '@/components/RadioInput';
import ContentTitle from './components/ContentTitle';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import { createEmptyCuppingFormValue } from '@/constants/new/form_values_mock';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import useNewFormStore from '@/store/newFormStore';

export default function CuppingPage() {
  const { control, trigger, getValues } = useFormContext<RootCuppingFormValue>();

  // new form store
  const step = useNewFormStore((state) => state.step);
  const nextstep = useNewFormStore((state) => state.nextstep);
  const prevstep = useNewFormStore((state) => state.prevstep);

  // 동적 스키마 필드
  const {
    fields: cuppings,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'cuppings',
  });

  // TODO : 함수 ts 파일에 분리하기

  // 커핑 추가, 제거
  const CuppingFormIncrease = () => {
    append(createEmptyCuppingFormValue());
  };
  const CuppingFormDecrease = (idx: number) => {
    remove(idx - 1);
  };

  // 커핑 기본 정보 검증 후 다음 스텝 이동
  const validateBasicInfoAndGoNextStep = async () => {
    const cuppingLength = getValues('cuppings').length;

    const pathArr = new Array(cuppingLength)
      .fill(0)
      .map((_, idx) => `cuppings.${idx}.coffeeId`) as `cuppings.${number}.coffeeId`[];

    const isValid = await trigger(pathArr);

    // 디버깅: 실제 값과 에러 확인
    if (!isValid) {
      alert('커핑할 원두를 모두 선택해주세요!');
    } else {
      nextstep();
    }
  };

  const goPrevStep = async () => {
    prevstep();
  };

  // purpose UI 메타데이터
  const purposeConfig = SERVER_FORM_CONFIG.purpose;

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      {/* purpose radio */}
      <RadioInput valuePath="purposeValue" labelPath="purposeLabel" config={purposeConfig} />

      {step === 2 && (
        <ContentTitle
          as="h2"
          title="클릭해서 평가해주세요.(임시)"
          className="mt-5 flex justify-center"
        />
      )}

      <div className="h-full min-h-0 flex-1 overflow-y-auto">
        <ul className="grid h-fit grid-cols-1 sm:grid-cols-2">
          {cuppings.map((cupping, idx) => {
            return <CuppingItem key={cupping.id} cuppingsIdx={idx} />;
          })}
        </ul>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-4">
        {/* 1페이지 */}
        {step === 1 && (
          <CuppingCountControl
            cuppingCount={cuppings.length}
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
