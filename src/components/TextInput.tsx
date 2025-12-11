import type { RHFPathProps } from '@/constants/new/rhf-path';
import { InputCn } from './ui/input_cn';
import { useFormContext, type FieldValues } from 'react-hook-form';

export default function TextInput<TFieldValues extends FieldValues>({
  path,
}: RHFPathProps<TFieldValues>) {
  const { register } = useFormContext<TFieldValues>();
  // TODO : 지금 select 데이터를 as 단언으로 억지로 TextInput으로 맞춰놨음
  // as 단언 쓸 필요 없이 path 경로가 TextInput 객체를 가지는 경로인지 검증하는 방법 찾기
  const field = register(path);
  // TODO : 넓이 하드코딩함(나중에 고치기)
  return <InputCn className="w-70" {...field} />;
}
