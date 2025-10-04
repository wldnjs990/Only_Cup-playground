import type { EvaluationRootSchema } from '@/types/new_naming';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'motion/react';
import MainEvaluation from './MainEvaluation';

export default function MainEvaluationFrame() {
  // 현재 주소
  const nowPath = 'main_evaluations';
  // useFormContext 가져오기
  const methods = useFormContext<EvaluationRootSchema>();
  // 메인 평가지 배열(참조용)
  const mainEvaluations = methods.getValues(nowPath);
  // 탭 인덱스
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div className="flex h-screen w-full flex-row-reverse rounded-lg bg-white shadow-xl/20">
      {/* 메인 폼 네비게이션 */}
      {/* TODO : 네비게이션 바 렌더링 최적화 하기(selectedTab 상태를 사용하는게 문제인거 같은데..) */}
      <nav className="bg-[#fdfdfd] px-5 py-2">
        <ul className="flex w-40 flex-col">
          {mainEvaluations?.map((item, idx) => {
            const { id, title } = item;
            return (
              <motion.li
                key={id}
                initial={false}
                animate={{
                  backgroundColor: idx === selectedTab ? '#eee' : '#eee0',
                }}
                className="relative flex h-6 w-full min-w-0 flex-1 cursor-pointer items-center justify-between rounded-[5px] rounded-b-none bg-white px-[15px] py-[10px] text-[#0f1115] select-none"
                onClick={() => setSelectedTab(idx)}
              >
                {title}
                {idx === selectedTab ? <motion.div layoutId="underline" id="underline" /> : null}
              </motion.li>
            );
          })}
        </ul>
      </nav>
      {/* 메인 폼 (감각 묘사 평가, 정동 평가) */}
      <main className="flex flex-1 overflow-y-scroll px-10 py-15">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {mainEvaluations ? (
              <MainEvaluation key={selectedTab} idx={selectedTab} parentPath={nowPath} />
            ) : (
              <div>평가지를 골라주세요</div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
