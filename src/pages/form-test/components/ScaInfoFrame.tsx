import { useFormContext, useWatch } from 'react-hook-form';
import TestFrame from './TestFrame';
import type { EvaluationRootSchema } from '@/types/new_naming';
import { InputCn } from '@/components/ui/input_cn';
import SequenceButton from './SequenceButton';

export default function ScaInfoFrame({
  setSequence,
}: {
  setSequence: React.Dispatch<React.SetStateAction<3 | 1 | 2>>;
}) {
  const { getValues, control, setValue } = useFormContext<EvaluationRootSchema>();
  const nowPath = 'basic_info';
  const explain = getValues(`${nowPath}.title`);
  const nameLabel = getValues(`${nowPath}.name.label`);
  const purposeLabel = getValues(`${nowPath}.purpose.label`);
  const sampleNoLabel = getValues(`${nowPath}.sample_no.label`);

  const naemValue = useWatch({ control: control, name: `${nowPath}.name.value` });
  const purposeValue = useWatch({ control: control, name: `${nowPath}.purpose.value` });
  const sampleNoValue = useWatch({ control: control, name: `${nowPath}.sample_no.value` });

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
            value={naemValue}
            onChange={(val) => setValue(`${nowPath}.name.value`, val.target.value)}
            className="flex-1"
          />
        </article>
        <article className="flex items-center gap-2">
          <label htmlFor="purposeLabel" className="w-[20%]">
            {purposeLabel}
          </label>
          <InputCn
            id="purposeLabel"
            value={purposeValue}
            onChange={(val) => setValue(`${nowPath}.purpose.value`, val.target.value)}
            className="flex-1"
          />
        </article>
        <article className="flex items-center gap-2">
          <label htmlFor="sampleNoLabel" className="w-[20%]">
            {sampleNoLabel}
          </label>
          <InputCn
            id="sampleNoLabel"
            value={sampleNoValue}
            onChange={(val) => setValue(`${nowPath}.sample_no.value`, val.target.value)}
            className="flex-1"
          />
        </article>
        <SequenceButton text="평가 시작" onClick={() => setSequence(2)} />
      </section>
    </TestFrame>
  );
}
