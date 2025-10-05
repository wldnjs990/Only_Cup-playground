import type { EvaluationRootSchema, SingleSelectionSchema } from '@/types/new_naming';
import { useFormContext, type FieldPath } from 'react-hook-form';
import SlideSelection from './SlideSelection';

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
    <>
      <hr />
      <section>
        {singleSelections.map((singleSelection, idx) => {
          return (
            <SlideSelection
              key={singleSelection.id}
              parentPath={nowPath}
              idx={idx}
              slider_range={singleSelection.range}
            />
          );
        })}
      </section>
    </>
  );
}
