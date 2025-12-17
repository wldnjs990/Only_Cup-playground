import { useFormContext, useWatch } from 'react-hook-form';
import CategoryButton from './CategoryButton';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';

export default function CategorySt() {
  const { control } = useFormContext<RootCuppingFormValue>();

  const { stNodeListPath, handleStNodeClick } = useCuppingEvaluationContext();

  const stNodeList = useWatch({ name: stNodeListPath, control });

  return (
    <>
      {stNodeList.map(({ id, label, selected }, idx) => {
        const selectedPath = `${stNodeListPath}.${idx}.selected` as const;
        const childrenPath = `${stNodeListPath}.${idx}.children` as const;

        return (
          <CategoryButton
            key={id + label + selected}
            selected={selected}
            onClick={() => handleStNodeClick(selectedPath, childrenPath, selected)}
          >
            {label}
          </CategoryButton>
        );
      })}
    </>
  );
}
