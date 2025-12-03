import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import CategoryCascader from './CategoryCascader';
import DetailEvaluation from './DetailEvaluation';
import { ButtonCn } from '@/components/ui/button_cn';

export default function EvaluationContent({
  evaluationListPath,
}: {
  evaluationListPath: `root.${number}.evaluationList`;
}) {
  const { getValues, control } = useFormContext<TRootCuppingFormSchema>();

  // 일단 평가순서는 고정요소로 박아두자
  // TODO : 이거 순서대로 체크하는게 아니라 맛, 향... 5개 버튼을 만들어서 선택한 애 보여주는걸로 해야겠는디
  const [eIdx, setEIdx] = useState<number>(0);

  // 현재 평가 경로
  const [nowEvaluationPath, setNowEvaluationPath] =
    useState<`root.${number}.evaluationList.${number}`>(`${evaluationListPath}.${eIdx}`);

  useWatch({ name: nowEvaluationPath, control });

  // 현재 평가 라벨(맛, 향, 산미, 단맛, 마우스필) 경로
  const [nowEvaluationLabelPath, setNowEvaluationLabelPath] =
    useState<`root.${number}.evaluationList.${number}.label`>(
      `${evaluationListPath}.${eIdx}.label`,
    );

  // 현재 평가 라벨(맛, 향, 산미, 단맛, 마우스필)
  const nowEvaluationLabel = getValues(nowEvaluationLabelPath);

  // 현재 평가 카테고리 경로
  const [nowCategoryPath, setNowCategoryPath] =
    useState<`root.${number}.evaluationList.${number}.category`>(
      `${evaluationListPath}.${eIdx}.category`,
    );

  // 현재 평가 디테일 평가 경로
  const [nowDetailPath, setNowDetailPath] =
    useState<`root.${number}.evaluationList.${number}.detailEvaluation`>(
      `${evaluationListPath}.${eIdx}.detailEvaluation`,
    );

  useEffect(() => {
    setNowEvaluationPath(`${evaluationListPath}.${eIdx}`);
    setNowEvaluationLabelPath(`${evaluationListPath}.${eIdx}.label`);
    setNowCategoryPath(`${evaluationListPath}.${eIdx}.category`);
    setNowDetailPath(`${evaluationListPath}.${eIdx}.detailEvaluation`);
  }, [eIdx]);

  return (
    <div>
      {/* 버튼 리스트 */}
      <ButtonCn onClick={() => setEIdx(0)}>1</ButtonCn>
      <ButtonCn onClick={() => setEIdx(1)}>2</ButtonCn>
      <ButtonCn onClick={() => setEIdx(2)}>3</ButtonCn>
      <ButtonCn onClick={() => setEIdx(3)}>4</ButtonCn>
      <ButtonCn onClick={() => setEIdx(4)}>5</ButtonCn>
      <h2 className="h2-style">{`step.${eIdx + 1} ${nowEvaluationLabel}`}</h2>
      {/* 카테고리 선택 */}
      <CategoryCascader
        key={nowCategoryPath}
        nowCategoryPath={nowCategoryPath}
        nowDetailPath={nowDetailPath}
      />
      {/* 선택한 카테고리 평가 */}
      {nowDetailPath && (
        <DetailEvaluation key={nowEvaluationPath} nowDetailPath={nowDetailPath} setEIdx={setEIdx} />
      )}
    </div>
  );
}
