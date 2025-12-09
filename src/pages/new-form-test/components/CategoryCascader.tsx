import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext } from 'react-hook-form';
import CategorySt from './CategorySt';
import CategoryNd from './CategoryNd';
import CategoryLeaf from './CategoryLeaf';

import { AnimatePresence, motion } from 'motion/react';
import ContentTitle from './ContentTitle';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';

export default function CategoryCascader() {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const {
    categoryPath,
    nowDepth,
    handlePrevButtonClick,
    stNodeListPath,
    ndNodeListPath,
    leafNodeListPath,
  } = useCuppingEvaluationContext();

  const categoryLabel = getValues(`${categoryPath}.label`);
  const required = getValues(`${categoryPath}.required`);

  return (
    <section className="w-full flex-1 overflow-hidden">
      <ContentTitle title={categoryLabel} required={required} as="h3" />
      {/* 이전 단계 버튼 */}
      <button className="text-sm" onClick={handlePrevButtonClick}>{`< 이전 단계`}</button>

      {/* cascader 노드 */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={nowDepth}
          className="flex flex-wrap justify-around gap-1 px-4 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {/* 루트 노드 */}
          {nowDepth === 1 && <CategorySt key={stNodeListPath} />}
          {/* 두번째 노드 */}
          {nowDepth === 2 && ndNodeListPath && <CategoryNd key={ndNodeListPath} />}
          {/* 리프 노드 */}
          {nowDepth === 3 && leafNodeListPath && <CategoryLeaf key={leafNodeListPath} />}
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
