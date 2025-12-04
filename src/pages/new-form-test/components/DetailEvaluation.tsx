import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import type { Dispatch } from 'react';
import { useFormContext } from 'react-hook-form';
import CategoryIntensity from './CategoryIntensity';
import CategoryAffectiveScore from './CategoryAffectiveScore';
import { ButtonCn } from '@/components/ui/button_cn';
import ContentTitle from './ContentTitle';

export default function DetailEvaluation({
  nowDetailPath,
  setEIdx,
}: {
  nowDetailPath: `root.${number}.evaluationList.${number}.detailEvaluation`;
  setEIdx: Dispatch<React.SetStateAction<number>>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const { label, categoryEvaluationList } = getValues(nowDetailPath);

  const handleNextButtonClick = () => {
    setEIdx((val) => {
      return Math.min(val + 1, 4);
    });
  };

  // 선택된 카테고리가 없으면 빈공간 출력
  if (categoryEvaluationList.length === 0) {
    return <></>;
  }

  return (
    <section className="flex flex-col gap-3">
      <ContentTitle title={label} />

      <article className="flex flex-col gap-3">
        {categoryEvaluationList.map((categoryEvaluation, idx) => {
          const categoryEvaluationPath = `${nowDetailPath}.categoryEvaluationList.${idx}` as const;
          return (
            <article key={categoryEvaluation.value}>
              <h4 className="font-bold">{categoryEvaluation.title}</h4>
              <hr />
              <CategoryIntensity
                categoryEvaluationPath={categoryEvaluationPath}
                categoryTitle={categoryEvaluation.title}
              />
              <CategoryAffectiveScore categoryEvaluationPath={categoryEvaluationPath} />
            </article>
          );
        })}
      </article>

      <ButtonCn onClick={handleNextButtonClick}>다음으로 이동</ButtonCn>
    </section>
  );
}
