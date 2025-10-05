import type { EvaluationRootSchema, TreeSelectionParentItem } from '@/types/new_naming';
import { useFormContext, useWatch, type FieldPath } from 'react-hook-form';
import CheckBox from './CheckBox';
import type { CheckedState } from '@radix-ui/react-checkbox';

export default function TreeCheckBox({
  multipleSelectionTree,
  parentPath,
}: {
  multipleSelectionTree: TreeSelectionParentItem;
  parentPath: FieldPath<EvaluationRootSchema>;
}) {
  // TODO : 부모 - 자식 연결되게 체크박스 수정하기

  const { setValue, control } = useFormContext<EvaluationRootSchema>();

  // multipleSelectionTree 트리 아이템 가져오기(트리로 변형해서 getValues 못 씀
  const { childrens, idx, label, parentId } = multipleSelectionTree;

  // 현재 경로(체크박스 아이템)
  const nowPath = `${parentPath}.items` as FieldPath<EvaluationRootSchema>;
  // 부모 체크박스 경로
  const parentCheckBoxPath = `${nowPath}.${idx}.checked` as FieldPath<EvaluationRootSchema>;
  // 총 체크된 박스 갯수 경로
  const nowCheckedPath = `${parentPath}.now_checked` as FieldPath<EvaluationRootSchema>;
  // 체크박스 체크 제한 수 경로
  const limitPath = `${parentPath}.limit` as FieldPath<EvaluationRootSchema>;

  // 현재 체크 총 갯수 상태
  const checkCount = useWatch({ control: control, name: nowCheckedPath }) as number;
  // 체크박스 체크 제한 수 상태
  const limit = useWatch({ control: control, name: limitPath }) as number;

  // 체크 검증 로직(체크박스 자식 컴포넌트 props 전송용)
  function handleCheck(
    val: CheckedState,
    checked: boolean,
    targetPath: FieldPath<EvaluationRootSchema>,
  ) {
    // 체크 / limit 검증
    if (checked) {
      setValue(nowCheckedPath, checkCount - 1);
      setValue(targetPath, val);
    } else if (limit > checkCount) {
      setValue(nowCheckedPath, checkCount + 1);
      setValue(targetPath, val);
    } else if (!limit) {
      setValue(targetPath, val);
    }
  }
  return (
    <article className="flex flex-col gap-2">
      <CheckBox
        nowPath={parentCheckBoxPath}
        label={label}
        parentId={parentId}
        onChange={handleCheck}
      />
      <article className="ml-5 flex gap-1">
        {childrens.map((children) => {
          const { id, idx, label, parentId } = children;
          const childrenCheckBoxPath =
            `${nowPath}.${idx}.checked` as FieldPath<EvaluationRootSchema>;
          return (
            <CheckBox
              key={id}
              nowPath={childrenCheckBoxPath}
              label={label}
              parentId={parentId}
              onChange={handleCheck}
            />
          );
        })}
      </article>
    </article>
  );
}
