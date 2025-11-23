import Cascader from '@/pages/new-form-test/components/Cascader';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CategoryCascader({
  nowCategoryPath,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();
  // 라벨만 따로 빼기
  const categoryLabel = getValues(`${nowCategoryPath}.label`);
  const required = getValues(`${nowCategoryPath}.required`);

  const cascaderTreePath = `${nowCategoryPath}.cascaderTree` as const;

  const [childPath, setChildPath] = useState<string>('');

  return (
    <article>
      <h3>
        {categoryLabel} {required && <span className="text-red-600">*</span>}
      </h3>
      <Cascader cascaderTreePath={cascaderTreePath} childPath={childPath} setChildPath={setChildPath}/>
    </article>
  );
}
