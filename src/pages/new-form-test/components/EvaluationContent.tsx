import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CategoryCascader from './CategoryCascader';
import DetailEvaluation from './DetailEvaluation';

export default function EvaluationContent({
  evaluationListPath,
}: {
  evaluationListPath: `root.${number}.evaluationList`;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();
  console.log(getValues());

  // 일단 평가순서는 고정요소로 박아두자
  const [eIdx, setEIdx] = useState<number>(0);
  // 현재 평가(맛, 향, 산미, 단맛, 마우스필) 경로
  const nowEvaluationPath = `${evaluationListPath}.${eIdx}` as const;
  // 현재 평가(맛, 향, 산미, 단맛, 마우스필)
  const nowEvaluation = getValues(nowEvaluationPath);

  // 현재 평가 카테고리 경로
  const nowCategoryPath = `${evaluationListPath}.${eIdx}.category` as const;

  return (
    <div>
      <h2 className="h2-style">{`step.${eIdx + 1} ${nowEvaluation.label}`}</h2>
      {/* 카테고리 선택 */}
      <CategoryCascader nowCategoryPath={nowCategoryPath} />
      {/* 선택한 카테고리 평가 */}
      <DetailEvaluation setEIdx={setEIdx} />
    </div>
  );
}
