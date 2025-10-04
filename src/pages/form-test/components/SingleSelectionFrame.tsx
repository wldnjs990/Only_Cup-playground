import type { EvaluationRootSchema, SingleSelectionSchema } from '@/types/new_naming';
import { useFormContext, type FieldPath } from 'react-hook-form';
import SingleSelection from './SingleSelection';

export default function SingleSelectionFrame({
  parentPath,
}: {
  parentPath: FieldPath<EvaluationRootSchema>;
}) {
  // context
  const methods = useFormContext<EvaluationRootSchema>();

  // nowPath
  const nowPath = `${parentPath}.single_selections` as FieldPath<EvaluationRootSchema>;
  // SingleSelection 배열(참조용)
  const singleSelections = methods.getValues(nowPath) as SingleSelectionSchema[];

  return (
    <section className="mt-5">
      {singleSelections.map((singleSelection, idx) => {
        return <SingleSelection key={singleSelection.id} parentPath={nowPath} idx={idx} />;
      })}
    </section>
  );
}
