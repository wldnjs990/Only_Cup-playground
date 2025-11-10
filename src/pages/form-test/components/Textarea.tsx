import { TextareaCn } from '@/components/ui/textarea_cn';
import type { EvaluationRootSchema, TextareaField } from '@/types/form_schema_mock';
import { useFormContext, useWatch, type FieldPath } from 'react-hook-form';

export default function Textarea({ parentPath }: { parentPath: FieldPath<EvaluationRootSchema> }) {
  const { setValue, getValues, control } = useFormContext<EvaluationRootSchema>();
  const nowPath = `${parentPath}.comment` as FieldPath<EvaluationRootSchema>;

  const { placeholder } = getValues(nowPath) as TextareaField;
  // 댓글 value만 watch로 구독
  const commentValuePath = `${nowPath}.value` as FieldPath<EvaluationRootSchema>;
  const commentValue = useWatch({ control: control, name: commentValuePath }) as string;

  return (
    <>
      <TextareaCn
        onChange={(e) => setValue(commentValuePath, e.target.value)}
        placeholder={`${placeholder} (최대 100자 이내)`}
        className="h-30"
        value={commentValue}
        maxLength={100}
      />
    </>
  );
}
