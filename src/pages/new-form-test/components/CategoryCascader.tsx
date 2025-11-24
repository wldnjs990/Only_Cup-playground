import Cascader from '@/pages/new-form-test/components/Cascader';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function CategoryCascader({
  nowCategoryPath,
}: {
  nowCategoryPath: `root.${number}.evaluationList.${number}.category`;
}) {
  const { getValues, control } = useFormContext<TRootCuppingFormSchema>();
  // 라벨만 따로 빼기
  const categoryLabel = getValues(`${nowCategoryPath}.label`);
  const required = getValues(`${nowCategoryPath}.required`);

  const cascaderTreePath = `${nowCategoryPath}.cascaderTree` as const;

  const [childPath, setChildPath] = useState<string>('');

  return (
    <article>
      <div className="flex gap-2">
        <h3>{categoryLabel}</h3>
        {required && <span className="text-red-600">*</span>}
      </div>

      <Controller
        render={({ field }) => {
          console.log('필드', field);
          return (
            <Cascader
              cascaderTreePath={cascaderTreePath}
              childPath={childPath}
              setChildPath={setChildPath}
            />
          );
        }}
        name={nowCategoryPath}
        control={control}
      />
    </article>
  );
}
