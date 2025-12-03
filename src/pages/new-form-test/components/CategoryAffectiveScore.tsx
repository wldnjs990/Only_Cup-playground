import { SliderCn } from '@/components/ui/slider_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext, useWatch } from 'react-hook-form';
import ContentTitle from './ContentTitle';
import { affectiveExplainList } from '@/constants/new/affectiveExplainList';

// 정동평가에 슬라이드바 색상, 설명 같은건 프론트에서 관리하는게 맞는거 같음.
// 디자인 관련되었는데, 자주 바뀔거 같지 않는 요소니깐 그냥 프론트에서 관리하고, 관리자가 수정 요청하면 개발자가 직접 수정해주면 되니깐
// 색상이나 설명이 막 바뀌는 경우는 없을거같긴해

export default function CategoryAffectiveScore({
  categoryEvaluationPath,
}: {
  categoryEvaluationPath: `root.${number}.evaluationList.${number}.detailEvaluation.categoryEvaluationList.${number}`;
}) {
  const { getValues, setValue, control } = useFormContext<TRootCuppingFormSchema>();

  const categoryAffectiveScorePath = `${categoryEvaluationPath}.affectiveScore` as const;
  const { title, required, max, min, tooltip } = getValues(categoryAffectiveScorePath);

  const valuePath = `${categoryAffectiveScorePath}.value` as const;

  const value = useWatch({ name: valuePath, control });

  return (
    <article>
      {/* 평가 대상 */}
      <ContentTitle title={title} required={required} tooltip={tooltip} />

      <article>
        <SliderCn
          max={max}
          min={min}
          defaultValue={[value]}
          value={[value]}
          onValueChange={(nowValue) => setValue(valuePath, nowValue[0])}
          canChangeTrackColor={true}
          trackColorIndex={value - 1}
        />
        <p>{affectiveExplainList[value - 1].explain}</p>
      </article>
    </article>
  );
}
