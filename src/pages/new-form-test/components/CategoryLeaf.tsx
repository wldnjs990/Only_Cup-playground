import CategoryButton from './CategoryButton';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';

export default function CategoryLeaf() {
  const { evaluationsIdx, stNodeIdx, ndNodeIdx, leafNodeIdx, handleLeafNodeClick } =
    useCuppingEvaluationContext();

  if (stNodeIdx === null || ndNodeIdx === null)
    return <span>오류(stNodeIdx 또는 ndNodeIdx 없음)</span>;

  const leafNodeList =
    SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].category.cascaderTree[stNodeIdx]
      .children[ndNodeIdx].children;

  return (
    <>
      {leafNodeList.map((node, idx) => {
        const isSelected = leafNodeIdx[idx];
        return (
          <CategoryButton
            key={node.id + node.label}
            selected={isSelected}
            onClick={() => handleLeafNodeClick(idx, node.value)}
          >
            {node.label}
          </CategoryButton>
        );
      })}
    </>
  );
}
