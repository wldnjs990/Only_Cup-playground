import type { EvaluationSchemaSection } from '../../../hooks/useFormResult';
import SingleSelectionTest from './SingleSelectionTest';

export default function EvaluationTest({
  evaluationSchema,
}: {
  evaluationSchema: EvaluationSchemaSection;
}) {
  const { id, title, explanation, single_selections, multiple_selections, affective_assessment } =
    evaluationSchema;
  return (
    <article>
      <h2 className="text-2xl">{title}</h2>
      <p>{explanation}</p>
      {single_selections.map((single_selection) => {
        return (
          <SingleSelectionTest key={single_selection.id} single_selection={single_selection} />
        );
      })}
    </article>
  );
}
