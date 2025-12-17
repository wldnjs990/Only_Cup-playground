import { useFormContext, useWatch } from 'react-hook-form';
import CategoryButton from './CategoryButton';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';

export default function CategoryLeaf() {
  const { control } = useFormContext<RootCuppingFormValue>();

  const { handleLeafNodeClick, leafNodeListPath } = useCuppingEvaluationContext();

  const leafNodeList = leafNodeListPath && useWatch({ name: leafNodeListPath, control });

  if (!leafNodeList) {
    return <div>오류</div>;
  }
  return (
    <>
      {leafNodeList.map(({ id, label, selected, value }, idx) => {
        const selectedPath = `${leafNodeListPath}.${idx}.selected` as const;

        return (
          <CategoryButton
            key={id + label}
            selected={selected}
            onClick={() => {
              handleLeafNodeClick(selected, value, label, selectedPath);
            }}
          >
            {label}
          </CategoryButton>
        );
      })}
    </>
  );
}
