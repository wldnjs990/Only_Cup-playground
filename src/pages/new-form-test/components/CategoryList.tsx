import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CategorySt from './CategorySt';
import CategoryNd from './CategoryNd';
import CategoryLeaf from './CategoryLeaf';

export default function CategoryList({
  nowCategoryPath,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  // valueList 경로
  const valueListPath = `${nowCategoryPath}.valueList` as const;

  // 1뎁스 노드 주소
  const stNodeListPath = `${nowCategoryPath}.cascaderTree` as const;

  // 2뎁스 노드 주소
  const [ndNodeListPath, setNdNodeListPath] = useState<
    `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children` | null
  >(null);

  // 리프 노드 주소
  const [leafNodeListPath, setLeafNodeListPath] = useState<
    | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
    | null
  >(null);

  // selected 확인용 1뎁스 노드
  const stNodeList = getValues(stNodeListPath);

  useEffect(() => {
    // 1뎁스 선택됐는지 확인
    const selectedIndex = stNodeList.findIndex((stNodeList) => stNodeList.selected);
    // 선택된 체크박스 있으면 업데이트 해주기
    if (selectedIndex !== -1) {
      setNdNodeListPath(`${stNodeListPath}.${selectedIndex}.children`);
    }
    // 2뎁스 선택됐는지 확인
  }, []);

  return (
    <>
      {/* 루트 노드 */}
      {<CategorySt stNodeListPath={stNodeListPath} setNdNodeListPath={setNdNodeListPath} />}
      {/* 두번째 노드 */}
      {ndNodeListPath && (
        <CategoryNd ndNodeListPath={ndNodeListPath} setLeafNodeListPath={setLeafNodeListPath} />
      )}
      {/* 리프 노드 */}
      {leafNodeListPath && (
        <CategoryLeaf leafNodeListPath={leafNodeListPath} valueListPath={valueListPath} />
      )}
    </>
  );
}
