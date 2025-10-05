import type { AffectiveAssessmentSchema, EvaluationRootSchema } from '@/types/new_naming';
import { useFormContext, type FieldPath } from 'react-hook-form';
import SlideSelection from './SlideSelection';
import Textarea from './Textarea';

export default function AffectiveAssessmentFrame({
  parentPath,
}: {
  parentPath: FieldPath<EvaluationRootSchema>;
}) {
  const { getValues } = useFormContext<EvaluationRootSchema>();
  const nowPath = `${parentPath}.affective_assessment` as FieldPath<EvaluationRootSchema>;
  const { title, explanation, assessments } = getValues(nowPath) as AffectiveAssessmentSchema;
  // 현재 평가 대상 타이틀
  const rootTitle = getValues(`${parentPath}.title` as FieldPath<EvaluationRootSchema>) as string;
  // 정동평가 슬라이드 경로
  const assessmentsPath = `${nowPath}.assessments` as FieldPath<EvaluationRootSchema>;

  return (
    <>
      <hr />
      <section className="flex flex-col gap-5">
        <article className="flex flex-col gap-1">
          <h2 className="h2-style md:h2-md-style">
            {title} - {rootTitle}
          </h2>
          <span className="text-sm font-medium md:text-[16px]">{explanation}</span>
        </article>
        <article>
          {assessments.map((assessment, idx) => {
            return (
              <SlideSelection
                key={assessment.id}
                idx={idx}
                parentPath={assessmentsPath}
                slider_range={assessment.range}
              />
            );
          })}
        </article>
        <article>
          <Textarea parentPath={nowPath} />
        </article>
      </section>
    </>
  );
}
