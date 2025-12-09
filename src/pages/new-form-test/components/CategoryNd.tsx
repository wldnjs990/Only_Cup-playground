import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, useWatch } from 'react-hook-form';
import CategoryButton from './CategoryButton';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';

export default function CategoryNd() {
  const { control } = useFormContext<TRootCuppingFormSchema>();

  const { categoryName, ndNodeListPath, handleNdNodeClick } = useCuppingEvaluationContext();

  const ndNodeList = ndNodeListPath && useWatch({ name: ndNodeListPath, control });

  if (!ndNodeList) {
    return <div>오류</div>;
  }
  return (
    <>
      {ndNodeList.map(({ id, label, selected }, idx) => {
        const selectedPath = `${ndNodeListPath}.${idx}.selected` as const;
        const childrenPath = `${ndNodeListPath}.${idx}.children` as const;

        return (
          <CategoryButton
            key={id + label + categoryName}
            selected={selected}
            onClick={() => handleNdNodeClick(selectedPath, childrenPath, selected)}
          >
            {label}
          </CategoryButton>
        );
      })}
    </>
  );
}
