import CategoryButton from './CategoryButton';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';

export default function CategorySt() {
  const { evaluationsIdx, handleStNodeClick, stNodeIdx } = useCuppingEvaluationContext();

  const stNodeList =
    SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].category.cascaderTree;

  return (
    <>
      {stNodeList.map((node, idx) => {
        const isSelected = stNodeIdx === idx;
        return (
          <CategoryButton
            key={node.id + node.label}
            selected={isSelected}
            onClick={() => handleStNodeClick(idx)}
          >
            {node.label}
          </CategoryButton>
        );
      })}
    </>
  );
}
