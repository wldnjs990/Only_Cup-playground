import CategorySt from './CategorySt';
import CategoryNd from './CategoryNd';
import CategoryLeaf from './CategoryLeaf';

import { AnimatePresence, motion } from 'motion/react';
import ContentTitle from './ContentTitle';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';

export default function CategoryCascader() {
  const { evaluationsIdx, cascaderDepth, prevCascaderDepth } = useCuppingEvaluationContext();

  const category = SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].category;

  return (
    <section className="w-full flex-1 overflow-hidden">
      <ContentTitle
        title={category.label}
        required={category.required}
        tooltip={category.tooltip}
        as="h3"
      />
      {/* 이전 단계 버튼 */}
      <button className="text-sm" onClick={prevCascaderDepth}>{`< 이전 단계`}</button>

      {/* cascader 노드 */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={cascaderDepth}
          className="flex flex-wrap justify-around gap-1 px-4 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* 루트 노드 */}
          {cascaderDepth === 1 && <CategorySt />}
          {/* 두번째 노드 */}
          {cascaderDepth === 2 && <CategoryNd />}
          {/* 리프 노드 */}
          {cascaderDepth === 3 && <CategoryLeaf />}
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
