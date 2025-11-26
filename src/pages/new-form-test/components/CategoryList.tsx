import { ButtonCn } from '@/components/ui/button_cn';
import type {
  CategoryFirstNode,
  CategoryLeafNode,
  CategorySecondNode,
} from '@/types/new/new_form_schema';
import { useState } from 'react';

export default function CategoryList({
  nowCategoryPath,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
}) {
  // cascader는 control로 통째로 관리하면서 리프노드의 value만 따로 업데이트 하도록 결정
  const [ndNodeList, setNdNodeList] = useState<null | CategorySecondNode[]>(null);
  const [leafNodeList, setLeafNodeList] = useState<null | CategoryLeafNode[]>(null);

  return (
    <>
      {/* 루트 노드 */}
      {!ndNodeList &&
        stNodeList.map(({ id, label, children }) => {
          return (
            <ButtonCn key={id} className="border p-2" onClick={() => setNdNodeList(children)}>
              {label}
            </ButtonCn>
          );
        })}
      {/* 두번째 노드 */}
      {ndNodeList &&
        !leafNodeList &&
        ndNodeList.map(({ id, label, children }) => {
          return (
            <ButtonCn key={id} className="border p-2" onClick={() => setLeafNodeList(children)}>
              {label}
            </ButtonCn>
          );
        })}
      {/* 리프 노드 */}
      {leafNodeList &&
        leafNodeList.map(({ id, label, value }) => {
          return (
            <ButtonCn key={id} className={'border p-2'} onClick={() => handleLeafValue(value)}>
              {label}
            </ButtonCn>
          );
        })}
    </>
  );
}
