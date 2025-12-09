import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, useWatch } from 'react-hook-form';
import CategoryButton from './CategoryButton';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';

export default function CategorySt() {
  const { control } = useFormContext<TRootCuppingFormSchema>();

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
