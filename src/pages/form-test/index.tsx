import { FormProvider, useForm } from 'react-hook-form';
import type { EvaluationRootSchema } from '@/types/new_naming';
import { FORM_SCHEMA_MOCK } from '@/constants/new_naming';
import ScaInfoFrame from './components/ScaInfoFrame';
import MainEvaluationTest from './components/MainEvaluationTest';
import { useState } from 'react';
import TotalEvaluationTest from './components/TotalEvaluationTest';

export default function FormTest() {
  // RHF 사용
  const methods = useForm<EvaluationRootSchema>({
    defaultValues: FORM_SCHEMA_MOCK,
    shouldUnregister: false,
  });

  const { handleSubmit } = methods;

  const [sequence, setSequence] = useState<1 | 2 | 3>(1);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(() => {
          // 제출 테스트
          console.log(methods.getValues());
        })}
        className="flex min-h-0 flex-1"
      >
        <section className="flex min-h-0 flex-1 flex-col p-5">
          {/* 기본 정보지 */}
          {sequence === 1 && <ScaInfoFrame setSequence={setSequence} />}
          {/* 메인 평가지 */}
          {sequence === 2 && <MainEvaluationTest setSequence={setSequence} />}
          {/* 전체 평가지 */}
          {sequence === 3 && <TotalEvaluationTest setSequence={setSequence} />}
        </section>
        {/* <button type="submit">제출 테스트</button> */}
      </form>
    </FormProvider>
  );
}
