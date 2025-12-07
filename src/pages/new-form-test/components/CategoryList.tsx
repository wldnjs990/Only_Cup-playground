import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CategorySt from './CategorySt';
import CategoryNd from './CategoryNd';
import CategoryLeaf from './CategoryLeaf';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { AnimatePresence, motion } from 'motion/react';

export default function CategoryList({
  nowCategoryPath,
  nowDetailPath,
  nowDepth,
  setNowDepth,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
  nowDetailPath: `root.${number}.evaluationList.${number}.detailEvaluation`;
  nowDepth: number;
  setNowDepth: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  // 현재 카테고리명
  const categoryName = getValues(`${nowCategoryPath}.name`);

  // valueList 경로
  const valueListPath = `${nowCategoryPath}.valueList` as const;

  // 1뎁스 노드 주소
  const stNodeListPath = `${nowCategoryPath}.cascaderTree` as const;

  // 2뎁스 노드 주소
  const [ndNodeListPath, setNdNodeListPath] = useState<
    `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children` | null
  >(null);
  // 2뎁스 노드 인덱스(초기화용으로 사용)
  const [stNodeIdx, setStNodeIdx] = useState<number>(0);

  // 리프 노드 주소
  const [leafNodeListPath, setLeafNodeListPath] = useState<
    | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
    | null
  >(null);

  // selected 확인용 1뎁스 노드
  const stNodeList = getValues(stNodeListPath);

  // 카테고리 상세평가 경로(초기화용)
  const nowCategoryEvaluationListPath = `${nowDetailPath}.categoryEvaluationList` as const;

  useEffect(() => {
    // 1뎁스 선택됐는지 확인
    const stSelectedIndex = stNodeList.findIndex((NodeList) => NodeList.selected);
    // 선택된 체크박스 있으면 업데이트 해주기
    if (stSelectedIndex !== -1) {
      setNdNodeListPath(`${stNodeListPath}.${stSelectedIndex}.children`);
      setStNodeIdx(stSelectedIndex);
      setNowDepth(2);

      // useEffect 안에서 다른 훅 사용이 가능하나..? 왜 되는거지? 시점이 안 겹치나?
      // 생각해보니 커스텀훅 반환값이라서 그냥 메서드일 뿐이겠다.
      const ndNodeList = getValues(`${stNodeListPath}.${stSelectedIndex}.children`);
      // 2뎁스 선택됐는지 확인
      const ndSelectedIndex = ndNodeList.findIndex((NodeList) => NodeList.selected);
      // 선택된 체크박스 있으면 업데이트 해주기
      if (ndSelectedIndex !== -1) {
        setLeafNodeListPath(
          `${stNodeListPath}.${stSelectedIndex}.children.${ndSelectedIndex}.children`,
        );
        setNowDepth(3);
      }
    } else {
      setNowDepth(1);
    }
  }, []);

  const handlePrevButtonClick = () => {
    setNowDepth((cur) => Math.max(cur - 1, 1));
  };

  const categoryButtonStyle = (selected: boolean) =>
    twMerge(clsx(selected && 'bg-amber-200'), 'border p-2');

  return (
    <section className="w-full flex-1 overflow-hidden">
      {/* 이전 단계 버튼 */}
      <button className="text-sm" onClick={handlePrevButtonClick}>{`< 이전 단계`}</button>

      {/* cascader 노드 */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={nowDepth}
          className="flex flex-wrap justify-around gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {/* 루트 노드 */}
          {nowDepth === 1 && (
            <CategorySt
              categoryButtonStyle={categoryButtonStyle}
              categoryName={categoryName}
              valueListPath={valueListPath}
              stNodeListPath={stNodeListPath}
              nowCategoryEvaluationListPath={nowCategoryEvaluationListPath}
              setNowDepth={setNowDepth}
              setStNodeIdx={setStNodeIdx}
              setNdNodeListPath={setNdNodeListPath}
            />
          )}
          {/* 두번째 노드 */}
          {nowDepth === 2 && ndNodeListPath && (
            <CategoryNd
              key={ndNodeListPath + stNodeIdx}
              categoryButtonStyle={categoryButtonStyle}
              stNodeIdx={stNodeIdx}
              categoryName={categoryName}
              ndNodeListPath={ndNodeListPath}
              setNowDepth={setNowDepth}
              setLeafNodeListPath={setLeafNodeListPath}
              valueListPath={valueListPath}
              nowCategoryEvaluationListPath={nowCategoryEvaluationListPath}
            />
          )}
          {/* 리프 노드 */}
          {nowDepth === 3 && leafNodeListPath && (
            <CategoryLeaf
              // leafNodeListPath가 바뀌면 다른 필드를 보게 되므로 key로 강제 리마운트(useWatch 새 경로 구독)
              key={leafNodeListPath}
              categoryButtonStyle={categoryButtonStyle}
              leafNodeListPath={leafNodeListPath}
              valueListPath={valueListPath}
              nowCategoryEvaluationListPath={nowCategoryEvaluationListPath}
            />
          )}
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
