import { FormProvider, useForm } from 'react-hook-form';
import type { EvaluationRootSchema } from '@/types/new_naming';
import { FORM_SCHEMA_MOCK } from '@/constants/new_naming';
import ScaInfoFrame from './components/ScaInfoFrame';
import MainEvaluationTest from './components/MainEvaluationTest';
import { useState } from 'react';
import TotalEvaluationTest from './components/TotalEvaluationTest';
import { formatEvaluationForSubmit } from '@/utils/formatEvaluationForSubmit';
import { useNavigate } from 'react-router';

export default function FormTest() {
  const navigate = useNavigate();

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
          // 결과 정제 + json전환 로직
          const request: EvaluationRoot = formatEvaluationForSubmit(methods.getValues());
          // localStorage에서 값 뽑아주기
          const docListJson = localStorage.getItem('docList');
          const docList: EvaluationRoot[] = docListJson ? JSON.parse(docListJson) : [];
          docList.push(request);
          // 다시 localStorage에 담기
          localStorage.setItem('docList', JSON.stringify(docList));
          alert('평가 완료!');
          navigate('/pdf');
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
