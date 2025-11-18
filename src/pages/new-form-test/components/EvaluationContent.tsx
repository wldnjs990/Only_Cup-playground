import type { Evaluation, TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, type FieldPath } from 'react-hook-form';

export default function EvaluationContent({
  nowEvaluationPath,
}: {
  nowEvaluationPath: FieldPath<TRootCuppingFormSchema>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const evaluationList = getValues(nowEvaluationPath) as Evaluation;

  return <div>{evaluationList.label}</div>;
}
