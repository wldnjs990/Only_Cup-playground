import CategoryButton from './CategoryButton';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';

export default function CategoryNd() {
  const { evaluationsIdx, stNodeIdx, ndNodeIdx, handleNdNodeClick } = useCuppingEvaluationContext();

  // 이전 노드 선택 안됐는데 렌더링된거면 오류 처리(임시)
  if (stNodeIdx === null) return <span>오류(stNodeIdx 없음)</span>;

  const ndNodeList =
    SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].category.cascaderTree[stNodeIdx]
      .children;

  return (
    <>
      {ndNodeList.map((node, idx) => {
        const isSelected = ndNodeIdx === idx;
        return (
          <CategoryButton
            key={node.id + node.label}
            selected={isSelected}
            onClick={() => handleNdNodeClick(idx)}
          >
            {node.label}
          </CategoryButton>
        );
      })}
    </>
  );
}
