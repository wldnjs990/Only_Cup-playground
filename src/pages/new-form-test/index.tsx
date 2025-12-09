import {
  useForm,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import TestFrame from './components/TestFrame';
import {
  RootCuppingFormSchemaZodResolver,
  type TRootCuppingFormSchema,
} from '@/types/new/new_form_schema';
import RHFContext from '@/components/RHFContext';
import { NEW_FORM_SCHEMA } from '@/constants/new/new_form_schema_mock';
import CuppingPage from './CuppingPage';
import { useEffect } from 'react';

// useForm 사용시 타입추론을 위해 TRootCuppingFormSchema 타입을 FieldValues와 합쳐 추론 가능한 스키마 타입으로 만들어줌
interface RHFRootCuppingFormSchema extends FieldValues, TRootCuppingFormSchema {}

export default function NewFormTest() {
  // 폼 초기값
  const defaultCuppingFormSchema = {
    root: [NEW_FORM_SCHEMA],
  };
  // RHF 폼 스키마 생성
  const methods = useForm<RHFRootCuppingFormSchema>({
    defaultValues: defaultCuppingFormSchema,
    resolver: RootCuppingFormSchemaZodResolver,
  });

  const onSubmit: SubmitHandler<TRootCuppingFormSchema> = (data) => {
    console.log('submit 발동됨.');
    console.log(data);
  };
  const onError: SubmitErrorHandler<TRootCuppingFormSchema> = (error) => {
    console.error(error);
  };

  // 커핑 리스트 높이만큼 웹사이트 높이가 추가되는 문제 해결이 안됨;;
  // 그냥 인덱스 들어올때만 useEffect로 body에 overflow 박아야겠다
  // html도 높이가 그대로 고정인데 왜 측정되지도 않는 높이가 추가로 생겨나는거지
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
