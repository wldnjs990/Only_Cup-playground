import { useFormContext, useWatch, type FieldPath } from 'react-hook-form';
import type { CheckedState } from '@radix-ui/react-checkbox';
import type { EvaluationRootSchema } from '@/types/form_schema_mock';

type UseParentChildToggleParams = {
  /** 부모 체크박스 경로: e.g. `${base}.items.${parentIdx}.checked` */
  parentPath: FieldPath<EvaluationRootSchema>;
  /** 자식 체크박스 경로 배열: e.g. `${base}.items.${childIdx}.checked`[] */
  childPaths: FieldPath<EvaluationRootSchema>[];
  /** 카운트 경로: e.g. `${groupPath}.now_checked` */
  nowCheckedPath: FieldPath<EvaluationRootSchema>;
  /* 체크박스 제한 수 */
  limit: number | null;
  /** 부모 on 시, 자식이 하나도 없거나 모두 off면 첫 자식을 자동 선택할지 */
  selectFirstOnParent?: boolean;
};

export function useParentChildToggle({
  parentPath,
  childPaths,
  nowCheckedPath,
  limit,
  selectFirstOnParent = true,
}: UseParentChildToggleParams) {
  const { setValue, getValues, control } = useFormContext<EvaluationRootSchema>();

  const OPT = { shouldValidate: true, shouldDirty: true, shouldTouch: true } as const;
  const toBool = (v: CheckedState) => v === true;

  // 클릭되어있는 자식 있는지 체크
  const selectedChildIdx = () => childPaths.findIndex((p) => !!getValues(p));

  const now_checked = useWatch({ control: control, name: nowCheckedPath }) as number;
  const parentToggled = useWatch({ control: control, name: parentPath }) as boolean;

  const toggleParent = (next: boolean) => {
    // 체크 on일 시
    if (next) {
      // limit 초과라면 추가 X
      if (limit && limit <= now_checked) return;
      // 부모 on
      setValue(parentPath, true, OPT);

      // 자식 단일선택 보장
      let pick = selectedChildIdx();
      if (pick < 0 && selectFirstOnParent && childPaths.length > 0) pick = 0;

      childPaths.forEach((p, idx) => setValue(p, idx === pick, OPT));
      // 단일선택 규칙: 카운트 1 (자식이 없으면 0)
      setValue(nowCheckedPath, now_checked + 1, OPT);
    } else {
      // 부모 off → 자식 전부 off, 카운트 0
      setValue(parentPath, false, OPT);
      childPaths.forEach((p) => setValue(p, false, OPT));
      setValue(nowCheckedPath, now_checked - 1, OPT);
    }
  };

  const toggleChild = (targetPath: FieldPath<EvaluationRootSchema>, next: boolean) => {
    // 체크 on일 시
    if (next) {
      // 부모가 켜져있지 않고(now_checked가 + 1 될 수 있는 상태), limit가 있고, limit를 초과라면 추가 X
      if (!parentToggled && limit && limit <= now_checked) return;
      // 클릭한 자식만 on, 형제는 off (라디오처럼)
      childPaths.forEach((p) => setValue(p, (p === targetPath) as boolean, OPT));
      // 부모가 켜져있지 않은 상태일 경우
      if (!parentToggled) {
        // 부모 on, 카운트 1
        setValue(parentPath, true, OPT);
        setValue(nowCheckedPath, now_checked + 1, OPT);
      }
    } else {
      // 해당 자식 off
      setValue(targetPath, false, OPT);
      // 남은 on 자식이 없으면
      const anyOtherOn = childPaths.some((p) => p !== targetPath && !!getValues(p));
      if (!anyOtherOn) {
        // 부모 off, 카운트 - 1
        setValue(parentPath, false, OPT);
        setValue(nowCheckedPath, now_checked - 1, OPT);
      }
    }
  };

  /** CheckBox 컴포넌트 onChange 시그니처에 그대로 물리기 위한 핸들러 */
  const handleCheck = (
    val: CheckedState,
    _wasChecked: boolean,
    targetPath: FieldPath<EvaluationRootSchema>,
  ) => {
    const next = toBool(val);
    if (targetPath === parentPath) {
      toggleParent(next);
    } else {
      toggleChild(targetPath, next);
    }
  };

  return { handleCheck, toggleParent, toggleChild, selectedChildIdx };
}
