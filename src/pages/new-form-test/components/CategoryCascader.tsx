import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { Controller, useFormContext } from 'react-hook-form';
import CategoryList from './CategoryList';

export default function CategoryCascader({
  nowCategoryPath,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
}) {
  const { getValues, control } = useFormContext<TRootCuppingFormSchema>();

  // 라벨만 따로 빼기
  const categoryLabel = getValues(`${nowCategoryPath}.label`);
  const required = getValues(`${nowCategoryPath}.required`);

  return (
    <article>
      <div className="flex gap-2">
        <h3>{categoryLabel}</h3>
        {required && <span className="text-red-600">*</span>}
      </div>
      <article className="flex flex-wrap">
        <CategoryList nowCategoryPath={nowCategoryPath}/>
      </article>
    </article>
  );
}
