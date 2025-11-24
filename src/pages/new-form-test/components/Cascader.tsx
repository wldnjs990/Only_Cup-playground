import { ButtonCn } from '@/components/ui/button_cn';
import type { OptionalCascader, TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import type { Dispatch } from 'react';
import { useFormContext, type FieldPath } from 'react-hook-form';

export default function Cascader({
  cascaderTreePath,
  // cascader 뎁스
  childPath,
  setChildPath,
}: {
  cascaderTreePath: `root.${number}.evaluationList.${number}.category.cascaderTree`;
  childPath: string;
  setChildPath: Dispatch<React.SetStateAction<string>>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  // cascader는 타입 단언밖에 방법이 안 떠오르네..
  // TODO : 버그 터질 가능성 높은 코드인데, 어떻게 해결할 수 있을까
  const nowCascaderListPath = (cascaderTreePath + childPath) as FieldPath<TRootCuppingFormSchema>;
  const nowCascaderList = getValues(nowCascaderListPath) as OptionalCascader[];

  // cascader는 control로 통째로 관리하면서 리프노드의 value만 따로 업데이트 하도록 결정

  return (
    <article className="flex flex-wrap">
      {nowCascaderList.map((nowCascader) => {
        const { id, label, children } = nowCascader;
        return (
          <ButtonCn key={id} className="border p-2">
            {label}
          </ButtonCn>
        );
      })}
    </article>
  );
}
