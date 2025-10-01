'use client';

import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';
import { FORM_SCHEMA_MOCK } from '../../constants/form_schema_mock';
import type { EvaluationRootSchema, EvaluationSchemaSection } from '../../hooks/useFormResult';
import EvaluationTest from './components/EvaluationTest';

export default function FormTest() {
  // 탭 선택 여부
  const [selectedTab, setSelectedTab] = useState<number>(0);
  // 평가지 스키마
  const [formSchema, setFormSchema] = useState<EvaluationRootSchema>(FORM_SCHEMA_MOCK);

  // 감각 묘사 평가 스키마(단일 선택)
  const [evaluationSchema, setEvaluationSchema] = useState<EvaluationSchemaSection | null>(null);

  // 탭 바뀔때 마다 평가할 스키마값 변경
  useEffect(() => {
    setEvaluationSchema(() => formSchema.evaluation_schemas[selectedTab]);
  }, [selectedTab]);

  return (
    <div className="flex h-screen w-full flex-row-reverse rounded-lg bg-white shadow-xl/20">
      <nav className="bg-[#fdfdfd] px-5 py-2">
        <ul className="flex w-40 flex-col">
          {formSchema.evaluation_schemas.map((item, idx) => {
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
      <main className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={evaluationSchema?.title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full px-5 py-10"
          >
            {evaluationSchema ? (
              <EvaluationTest evaluationSchema={evaluationSchema} />
            ) : (
              <div>평가지를 골라주세요</div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
