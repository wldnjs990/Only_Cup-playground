import type { EvaluationRootSchema, MultipleSelectionSchema } from '@/types/form_schema_mock';
import { useFormContext, type FieldPath } from 'react-hook-form';
import MultipleSelection from './MultipleSelection';

export default function MultipleSelectionFrame({
  parentPath,
}: {
  parentPath: FieldPath<EvaluationRootSchema>;
}) {
  const { getValues } = useFormContext<EvaluationRootSchema>();
  const nowPath = `${parentPath}.multiple_selections` as FieldPath<EvaluationRootSchema>;
  // multipleSelections(참조용)
  const multipleSelections = getValues(nowPath) as MultipleSelectionSchema[];

  if (!multipleSelections.length) return <></>;
  return (
    <>
      <hr />
      <section className="flex flex-col gap-10">
        {multipleSelections.map((multipleSelection, idx) => {
          return (
            <MultipleSelection
              key={multipleSelection.id}
              selectionRootPath={parentPath}
              parentPath={nowPath}
              idx={idx}
            />
          );
        })}
      </section>
    </>
  );
}
