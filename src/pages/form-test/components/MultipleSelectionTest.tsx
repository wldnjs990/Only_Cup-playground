// 예시: 섹션 내 멀티셀렉트 그룹
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import { useMakeTreeList } from '@/hooks/useMakeTree';
import type { MultipleSelectionSchema } from '@/types/schema';
import { MultipleSelectionField } from './MultipleSelectionField';

export function MultipleSelectionTest({
  idx,
  multiple_selection,
  parent_name,
}: {
  idx: number;
  multiple_selection: MultipleSelectionSchema;
  parent_name: FieldPath<EvaluationRoot>;
}) {
  const methods = useForm();
  const { control } = methods;

  const MULTIPLE_SELECTIONS_NAME =
    `${parent_name}.${idx}.multiple_selections` as FieldPath<EvaluationRoot>;

  const { treeList } = useMakeTreeList(multiple_selection.items); // {id,label,selected,children[]} 형태를 기대
  // useMakeTreeList가 children 대신 childrens를 쓴다면 MultipleSelectionField 내 타입/접근만 맞춰주세요.

  // TODO : input입력값 탭 섹션별로 다 입력여부를 공유하는 문제 해결하기
  return (
    <MultipleSelectionField
      control={control}
      parent_name={MULTIPLE_SELECTIONS_NAME}
      tree={treeList}
      limit={multiple_selection.limit}
      onBlockedSelect={() => {
        // limit 초과시 알림
        // e.g., toast.error('선택 한도를 초과했습니다.');
        console.warn('선택 한도를 초과했습니다.');
      }}
    />
  );
}
