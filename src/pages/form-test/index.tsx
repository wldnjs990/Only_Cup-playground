import { FormProvider, useForm } from 'react-hook-form';
import type { EvaluationRootSchema } from '@/types/new_naming';
import MainEvaluationFrame from './components/MainEvaluationFrame';
import { FORM_SCHEMA_MOCK } from '@/constants/new_naming';

export default function FormTest() {
  // RHF 사용
  const methods = useForm<EvaluationRootSchema>({
    defaultValues: FORM_SCHEMA_MOCK,
    shouldUnregister: false,
  });

  return (
    <FormProvider {...methods}>
      <form>
        {/* 기본 정보지 */}

        {/* 메인 평가지 */}
        <MainEvaluationFrame />
        {/* 전체 평가지 */}
      </form>
    </FormProvider>
  );
}
