import { useForm, type SubmitErrorHandler, type SubmitHandler } from 'react-hook-form';
import TestFrame from './components/TestFrame';
import SettingPage from './SettingPage';
import {
  RootCuppingFormSchemaZodResolver,
  type TRootCuppingFormSchema,
} from '@/types/new/new_form_schema';
import RHFContext from '@/components/RHFContext';
import { NEW_FORM_SCHEMA } from '@/constants/new/new_form_schema_mock';

export default function NewFormTest() {
  // 폼 초기값
  const defaultCuppingFormSchema = { root: [NEW_FORM_SCHEMA] };
  // RHF 폼 스키마 생성
  const methods = useForm<TRootCuppingFormSchema>({
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
