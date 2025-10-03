import type { FieldPath } from 'react-hook-form';
import { MultipleSelectionTest } from './MultipleSelectionTest';
import SingleSelectionTest from './SingleSelectionTest';
import type { EvaluationRootSchema, EvaluationSchemaSection } from '@/types/schema';

export default function EvaluationTest({
  evaluationSchema,
}: {
  evaluationSchema: EvaluationSchemaSection;
}) {
  const { id, title, explanation, single_selections, multiple_selections, affective_assessment } =
    evaluationSchema;
  // 메인 평가 경로
  const EVALUATION_SCHEMAS_NAME = 'evaluation_schemas' satisfies FieldPath<EvaluationRootSchema>;
  return (
    <article>
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-3">{explanation}</p>
      <section className="mt-5 flex flex-col gap-3">
        {single_selections.map((single_selection, idx) => {
          return (
            <SingleSelectionTest
              key={single_selection.id}
              idx={idx}
              parent_name={`${EVALUATION_SCHEMAS_NAME}`}
            />
          );
        })}
      </section>
      {/* <section>
        {multiple_selections.map((multiple_selection, idx) => {
          return (
            <MultipleSelectionTest
              idx={idx}
              key={multiple_selection.id}
              multiple_selection={multiple_selection}
              parent_name={EVALUATION_SCHEMAS_NAME}
            ></MultipleSelectionTest>
          );
        })}
      </section> */}
    </article>
  );
}
