import {
  useForm,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
} from 'react-hook-form';
import TestFrame from './components/TestFrame';
import SettingPage from './SettingPage';
import {
  RootCuppingFormSchemaZodResolver,
  type TRootCuppingFormSchema,
} from '@/types/new/new_form_schema';
import RHFContext from '@/components/RHFContext';
import { NEW_FORM_SCHEMA } from '@/constants/new/new_form_schema_mock';

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
    console.log(data);
  };
  const onError: SubmitErrorHandler<TRootCuppingFormSchema> = (error) => {
    console.error(error);
  };

  return (
    <TestFrame>
      <RHFContext methods={methods} onSubmit={onSubmit} onError={onError}>
        <SettingPage />
      </RHFContext>
    </TestFrame>
  );
}
