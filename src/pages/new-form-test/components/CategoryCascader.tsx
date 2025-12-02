import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext } from 'react-hook-form';
import CategoryList from './CategoryList';
import ContentTitle from './ContentTitle';

export default function CategoryCascader({
  nowCategoryPath,
  nowDetailPath,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
  nowDetailPath: `root.${number}.evaluationList.${number}.detailEvaluation`;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  // 라벨만 따로 빼기
  const categoryLabel = getValues(`${nowCategoryPath}.label`);
  const required = getValues(`${nowCategoryPath}.required`);

  return (
    <article>
      <ContentTitle title={categoryLabel} required={required} />
      <article className="flex flex-wrap">
        <CategoryList nowCategoryPath={nowCategoryPath} nowDetailPath={nowDetailPath} />
      </article>
    </article>
  );
}
