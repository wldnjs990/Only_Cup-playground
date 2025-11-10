import type { EvaluationRootSchema, MainEvaluation } from '@/types/form_schema_mock';
import { useFormContext, type FieldPath } from 'react-hook-form';
import SingleSelectionFrame from './SingleSelectionFrame';
import MultipleSelectionFrame from './MultipleSelectionFrame';
import AffectiveAssessmentFrame from './AffectiveAssessmentFrame';

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
  const title = methods.getValues(`${nowPath}.title` as FieldPath<EvaluationRootSchema>) as string;
  // 메인 평가지 설명(참조용)
  const explanation = methods.getValues(
    `${nowPath}.explanation` as FieldPath<EvaluationRootSchema>,
  ) as string;
  return (
    <main>
      {/* 타이틀 영역 */}
      <section className="flex flex-col gap-2">
        <h1 className="h1-style md:h1-md-style">감각 묘사 평가 - {title}</h1>
        <p className="text-sm font-semibold md:text-[16px]">{explanation}</p>
      </section>
      <section className="mt-5 flex flex-col gap-10">
        {/* SingleSelection 영역 */}
        <SingleSelectionFrame parentPath={nowPath} />
        {/* MultipliSelection 영역 */}
        <MultipleSelectionFrame parentPath={nowPath} />
        {/* AffectiveAssessmentFrame 영역 */}
        <AffectiveAssessmentFrame parentPath={nowPath} />
      </section>
    </main>
  );
}
