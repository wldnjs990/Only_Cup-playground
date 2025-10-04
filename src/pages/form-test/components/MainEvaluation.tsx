import type { EvaluationRootSchema, MainEvaluation } from '@/types/new_naming';
import { useFormContext, type FieldPath } from 'react-hook-form';
import SingleSelectionFrame from './SingleSelectionFrame';

export default function MainEvaluation({
  idx,
  parentPath,
}: {
  idx: number;
  parentPath: FieldPath<EvaluationRootSchema>;
}) {
  const nowPath = `${parentPath}.${idx}` as FieldPath<EvaluationRootSchema>;
  // useFormContext 가져오기
  const methods = useFormContext<EvaluationRootSchema>();
  // 메인 평가지 제목(참조용)
  const title = methods.getValues(`${nowPath}.title` as FieldPath<EvaluationRootSchema>);
  // 메인 평가지 설명(참조용)
  const explanation = methods.getValues(
    `${nowPath}.explanation` as FieldPath<EvaluationRootSchema>,
  );
  return (
    <>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="font-semibold">{explanation}</p>
      <SingleSelectionFrame parentPath={nowPath} />
    </>
  );
}
