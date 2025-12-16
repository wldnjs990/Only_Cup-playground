import {
  useForm,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import TestFrame from './components/TestFrame';
import RHFContext from '@/components/RHFContext';
import CuppingPage from './CuppingPage';
import { useEffect } from 'react';
import { EMPTY_FORM_VALUES } from '@/constants/new/form_values_mock';
import {
  RootCuppingFormValueResolver,
  type RootCuppingFormValue,
} from '@/types/new/form_values_schema';

// useForm 사용시 타입추론을 위해 RootCuppingFormValue 타입을 FieldValues와 합쳐 추론 가능한 스키마 타입으로 만들어줌
interface RHFRootCuppingFormSchema extends FieldValues, RootCuppingFormValue {}

export default function NewFormTest() {
  // RHF 폼 스키마 생성
  const methods = useForm<RHFRootCuppingFormSchema>({
    defaultValues: EMPTY_FORM_VALUES,
    resolver: RootCuppingFormValueResolver,
  });

  const onSubmit: SubmitHandler<RootCuppingFormValue> = (data) => {
    console.log('submit 발동됨.');
    console.log(data);
  };
  const onError: SubmitErrorHandler<RootCuppingFormValue> = (error) => {
    console.error(error);
  };

  // vaul이 만든 drawer 라이브러리가 canvas 태그관련 레이아웃 버그를 발생시킴
  // 그래서 body태그에 인라인 스타일로 강제 고정
  // TODO : drawer 라이브러리 직접 구현하기
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <TestFrame>
      <RHFContext methods={methods} onSubmit={onSubmit} onError={onError} className="h-full">
        <CuppingPage />
      </RHFContext>
    </TestFrame>
  );
}
