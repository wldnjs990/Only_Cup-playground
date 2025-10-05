import { useFormContext } from 'react-hook-form';
import SequenceButton from './SequenceButton';
import TestFrame from './TestFrame';
import type { EvaluationRootSchema } from '@/types/new_naming';
import Textarea from './Textarea';
import AffectiveAssessmentFrame from './AffectiveAssessmentFrame';
import SingleSelectionFrame from './SingleSelectionFrame';
import MultipleSelectionFrame from './MultipleSelectionFrame';
import { motion } from 'motion/react';

export default function TotalEvaluationTest({
  setSequence,
}: {
  setSequence: React.Dispatch<React.SetStateAction<1 | 3 | 2>>;
}) {
  const { getValues } = useFormContext<EvaluationRootSchema>();
  const nowPath = 'total_evaluation';
  // 외재적 속성 평가 경로
  const extrinsicAttributesCommentPath = `${nowPath}.extrinsic_attributes`;
  // 결함 평가 루트 경로
  const defectPath = `${nowPath}.defect`;
  // 컵 결함 경로
  const cupDefectPath = `${defectPath}.cup`;
  const { title: cupTitle, explanation: cupExplanation } = getValues(cupDefectPath);
  // 제품 결함 경로
  const coffeeDefectPath = `${defectPath}.coffee`;
  const { title: coffeeTitle, explanation: coffeeExplanation } = getValues(coffeeDefectPath);

  return (
    <TestFrame>
      <motion.section
        key={nowPath}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex h-full min-h-0 flex-1 flex-col gap-10 overflow-y-auto p-5"
      >
        <article className="flex flex-col gap-2">
          <h1 className="h1-style md:h1-md-style">최종 평가</h1>
          <p className="text-sm font-medium md:text-lg">커핑에 대한 종합적인 평가를 남겨주세요!</p>
        </article>
        {/* 정동 평가 */}
        <AffectiveAssessmentFrame parentPath={nowPath} />
        <hr />
        {/* 외부요인 평가 */}
        <section className="flex flex-col gap-3">
          <article className="flex flex-col gap-1">
            <h2 className="h2-style">외재적 속성 평가</h2>
            <p className="font-medium">커핑에 영향을 주는 외부요인이 있었다면 작성해주세요.</p>
          </article>
          <Textarea parentPath={extrinsicAttributesCommentPath} />
        </section>
        <hr />
        {/* 결함 평가 - 컵 */}
        <section className="flex flex-col gap-3">
          <article className="flex flex-col gap-1">
            <h2 className="h2-style">결함 요인 - {cupTitle}</h2>
            <p className="font-medium">{cupExplanation}</p>
          </article>
          <SingleSelectionFrame parentPath={cupDefectPath} />
        </section>
        {/* 결함 평가 - 커피 */}
        <section className="flex flex-col gap-3">
          <article className="flex flex-col gap-1">
            <h2 className="h2-style">결함 요인 - {coffeeTitle}</h2>
            <p className="font-medium">{coffeeExplanation}</p>
          </article>
          <MultipleSelectionFrame parentPath={coffeeDefectPath} />
        </section>
        {/* 제출 버튼 */}
        <section className="mt-5 flex justify-center">
          <article className="flex w-full gap-2 md:w-2/3">
            <SequenceButton text="이전" onClick={() => setSequence(2)} className="flex-1" />
            <SequenceButton text="평가 종료" submit={true} className="flex-1" />
          </article>
        </section>
      </motion.section>
    </TestFrame>
  );
}
