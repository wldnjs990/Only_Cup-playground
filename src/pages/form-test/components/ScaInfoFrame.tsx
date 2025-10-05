import { useController, useFormContext } from 'react-hook-form';
import TestFrame from './TestFrame';
import type { EvaluationRootSchema } from '@/types/new_naming';
import { InputCn } from '@/components/ui/input_cn';
import SequenceButton from './SequenceButton';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export default function ScaInfoFrame({
  setSequence,
}: {
  setSequence: React.Dispatch<React.SetStateAction<3 | 1 | 2>>;
}) {
  const { getValues, control, trigger } = useFormContext<EvaluationRootSchema>();
  const nowPath = 'basic_info';
  const explain = getValues(`${nowPath}.title`);
  const nameLabel = getValues(`${nowPath}.name.label`);
  const purposeLabel = getValues(`${nowPath}.purpose.label`);
  const sampleNoLabel = getValues(`${nowPath}.sample_no.label`);

  const { field: nameField, fieldState: nameState } = useController({
    name: `${nowPath}.name.value`,
    control: control,
    rules: {
      validate: (val) => (val.trim().length > 0 ? true : '이름을 입력해주세요!'),
    },
  });
  const { field: purposeField, fieldState: purposeState } = useController({
    name: `${nowPath}.purpose.value`,
    control: control,
    rules: {
      validate: (val) => (val.trim().length > 0 ? true : '커핑 목적을 입력해주세요!'),
    },
  });
  const { field: sampleNoField, fieldState: sampleNoState } = useController({
    name: `${nowPath}.sample_no.value`,
    control: control,
    rules: {
      validate: (val) => (val.trim().length > 0 ? true : '샘플 번호를 입력해주세요!'),
    },
  });

  return (
    <TestFrame>
      <section className="flex w-full max-w-100 flex-col gap-5">
        <article className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-black">SCA 커피 가치 평가</h1>
          <p className="text-xl">Prod by. OnlyCup</p>
          <img src="/src/assets/images/onlycup_logo_200.png" alt="온리컵 로고" />
        </article>
        <p className="text-center text-lg font-medium">{explain}</p>
        <article className="flex items-center gap-2">
          <label htmlFor="nameLabel" className="w-[20%]">
            {nameLabel}
          </label>
          <InputCn
            id="nameLabel"
            value={nameField.value}
            onChange={(val) => nameField.onChange(val)}
            className={twMerge('flex-1', clsx(nameState.error && 'border-red-600'))}
          />
          {/* {nameState && <p className="text-sm text-red-600">{nameState.error?.message}</p>} */}
        </article>
        <article className="flex items-center gap-2">
          <label htmlFor="purposeLabel" className="w-[20%]">
            {purposeLabel}
          </label>
          <InputCn
            id="purposeLabel"
            value={purposeField.value}
            onChange={(val) => purposeField.onChange(val)}
            className={twMerge('flex-1', clsx(purposeState.error && 'border-red-600'))}
          />
          {/* {purposeState && <p className="text-sm text-red-600">{purposeState.error?.message}</p>} */}
        </article>
        <article className="flex items-center gap-2">
          <label htmlFor="sampleNoLabel" className="w-[20%]">
            {sampleNoLabel}
          </label>
          <InputCn
            id="sampleNoLabel"
            value={sampleNoField.value}
            onChange={(val) => sampleNoField.onChange(val)}
            className={twMerge('flex-1', clsx(sampleNoState.error && 'border-red-600'))}
          />
          {/* {sampleNoState && <p className="text-sm text-red-600">{sampleNoState.error?.message}</p>} */}
        </article>
        <SequenceButton
          text="평가 시작"
          onClick={async () => {
            const nameOk = await trigger(`${nowPath}.name.value`);
            const purposeOk = await trigger(`${nowPath}.purpose.value`);
            const sampleNoOk = await trigger(`${nowPath}.sample_no.value`);

            if (nameOk !== true) return alert(`${nameState.error?.message}`);
            if (purposeOk !== true) return alert(`${purposeState.error?.message}`);
            if (sampleNoOk !== true) return alert(`${sampleNoState.error?.message}`);
            setSequence(2);
          }}
        />
      </section>
    </TestFrame>
  );
}
