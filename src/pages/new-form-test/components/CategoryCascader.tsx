import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext } from 'react-hook-form';
import CategoryList from './CategoryList';
import ContentTitle from './ContentTitle';
import DetailEvaluation from './DetailEvaluation';
import { useState } from 'react';

export default function CategoryCascader({
  nowCategoryPath,
  nowDetailPath,
  setEIdx,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
  nowDetailPath: `root.${number}.evaluationList.${number}.detailEvaluation`;
  setEIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  // 라벨만 따로 빼기
  const categoryLabel = getValues(`${nowCategoryPath}.label`);
  const required = getValues(`${nowCategoryPath}.required`);

  // 현재 뎁스
  const [nowDepth, setNowDepth] = useState(1);

  return (
    <article className="mt-5 flex flex-col">
      <ContentTitle title={categoryLabel} required={required} />

      <CategoryList
        nowCategoryPath={nowCategoryPath}
        nowDetailPath={nowDetailPath}
        nowDepth={nowDepth}
        setNowDepth={setNowDepth}
      />

      {nowDepth === 3 && (
        <DetailEvaluation key={nowDetailPath} nowDetailPath={nowDetailPath} setEIdx={setEIdx} />
      )}
    </article>
  );
}
