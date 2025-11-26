import { ButtonCn } from '@/components/ui/button_cn';
import type {
  CategoryFirstNode,
  CategoryLeafNode,
  CategorySecondNode,
  TRootCuppingFormSchema,
} from '@/types/new/new_form_schema';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CategoryList({
  nowCategoryPath,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
}) {
  const categoryType = ['aroma', 'taste', 'acidity', 'switness', 'mouthfeel'] as const;

  // 현재 카테고리
  const [nowCategory, setNowCategory] = useState<number>(0);

  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const stNodeListPath = `${nowCategoryPath}.cascaderTree.${categoryType[nowCategory]}` as const;
  const stNodeList = getValues(stNodeListPath);
  const {} = stNodeList;

  return (
    <>
      {/* 루트 노드 */}
      {stNodeList.map(({ id, label, children }) => {
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
