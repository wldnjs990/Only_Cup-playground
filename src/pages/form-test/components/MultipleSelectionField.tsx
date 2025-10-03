// MultipleSelectionField.tsx
import { Controller, useFormContext, type Control, type FieldPath } from 'react-hook-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useMemo, useCallback, useEffect } from 'react';

// 트리 노드 타입(필요시 useMakeTreeList의 필드명에 맞춰 children/childrens만 바꿔주세요)
type TreeNode = {
  id: number;
  label: string;
  selected?: boolean;
  childrens?: TreeNode[]; // useMakeTreeList가 'childrens'라면 이름만 바꿔주세요
};

type GroupState = {
  parents: Record<number, number | null>;
  singles: Record<number, boolean>;
};

type Props = {
  /** RHF 필드 이름. 예: `evaluation_schemas.${si}.multiple.${gi}` */
  parent_name: FieldPath<EvaluationRoot>;
  /** useMakeTreeList(items)로 만든 트리 */
  tree: TreeNode[];
  /** limit (null이면 무제한) */
  limit: number | null;
  /** 선택 불가 시 메시지/토스트 등을 띄우고 싶다면 훅업 */
  onBlockedSelect?: () => void;
  /** RHF control (FormProvider 쓰면 생략 가능) */
  control?: Control<any>;
};

/** 트리 유틸 */
const hasChildren = (n: TreeNode) => Array.isArray(n.childrens) && n.childrens.length > 0;

/** 초기값: 아이템의 selected를 읽어서 GroupState로 변환 */
function buildInitialState(tree: TreeNode[]): GroupState {
  const state: GroupState = { parents: {}, singles: {} };

  for (const p of tree) {
    if (hasChildren(p)) {
      // 자식 중 첫 selected를 반영
      const selectedChild = p.childrens!.find((c) => c.selected);
      state.parents[p.id] = selectedChild ? selectedChild.id : null;
    } else {
      state.singles[p.id] = !!p.selected;
    }
  }
  return state;
}

/** 현재 선택된 '유닛(단독 or 부모-자식쌍)' 개수 */
function countUnits(v: GroupState) {
  const singlesCnt = Object.values(v.singles).filter(Boolean).length;
  const parentsCnt = Object.values(v.parents).filter((cid) => cid != null).length;
  return singlesCnt + parentsCnt;
}

/** 불변 업데이트 헬퍼 */
function cloneState(v: GroupState): GroupState {
  return {
    parents: { ...v.parents },
    singles: { ...v.singles },
  };
}

/** limit 체크: 새 유닛을 추가해야 할 때만 제한 */
function canAddOneMore(v: GroupState, limit: number | null) {
  if (limit == null) return true;
  return countUnits(v) < limit;
}

export function MultipleSelectionField({
  parent_name,
  tree,
  limit,
  onBlockedSelect,
  control: controlProp,
}: Props) {
  const { control, getValues, setValue } = useFormContext();
  const initialValue = useMemo(() => buildInitialState(tree), [tree]);
  // items 경로
  const ITEMS_PATH = `${parent_name}.items` as FieldPath<EvaluationRoot>;

  /** 부모 토글 */
  const toggleParent = useCallback(
    (curr: GroupState, parent: TreeNode): GroupState => {
      const next = cloneState(curr);

      if (hasChildren(parent)) {
        const currChildId = next.parents[parent.id];
        if (currChildId != null) {
          // 이미 선택됨 → 해제
          next.parents[parent.id] = null;
          return next;
        }
        // 새로 선택 → 첫 번째 자식 자동 선택 (limit 체크)
        const firstChild = parent.childrens![0];
        if (!firstChild) return curr;

        // 새 유닛 추가
        if (!canAddOneMore(curr, limit)) {
          onBlockedSelect?.();
          return curr;
        }
        next.parents[parent.id] = firstChild.id;
        return next;
      } else {
        // 단독 항목
        const currChecked = !!next.singles[parent.id];
        if (currChecked) {
          // 해제
          next.singles[parent.id] = false;
          return next;
        }
        // 선택 (limit 체크)
        if (!canAddOneMore(curr, limit)) {
          onBlockedSelect?.();
          return curr;
        }
        next.singles[parent.id] = true;
        return next;
      }
    },
    [limit, onBlockedSelect],
  );

  /** 자식 토글 */
  const toggleChild = useCallback(
    (curr: GroupState, parent: TreeNode, child: TreeNode): GroupState => {
      const next = cloneState(curr);
      const currChildId = next.parents[parent.id];

      // 같은 자식을 다시 누른 경우 → 해제
      if (currChildId === child.id) {
        next.parents[parent.id] = null;
        return next;
      }

      // 다른 자식으로 스위치 (유닛 수 변화 없음) → 항상 허용
      if (currChildId != null && currChildId !== child.id) {
        next.parents[parent.id] = child.id;
        return next;
      }

      // 현재 아무 자식도 없던 부모 → 새 유닛 추가 (limit 체크)
      if (!canAddOneMore(curr, limit)) {
        onBlockedSelect?.();
        return curr;
      }
      next.parents[parent.id] = child.id;
      return next;
    },
    [limit, onBlockedSelect],
  );

  /** 렌더: 한 노드(부모)와 자식들 */
  const NodeRow = ({
    value,
    onChange,
    node,
  }: {
    value: GroupState;
    onChange: (v: GroupState) => void;
    node: TreeNode;
  }) => {
    const parentChecked = hasChildren(node)
      ? value.parents[node.id] != null
      : !!value.singles[node.id];

    return (
      <div className="mt-5">
        {/* 부모 체크박스 */}
        <div className="flex items-center gap-2">
          <Checkbox.Root
            id={`p-${node.id}`}
            checked={parentChecked}
            onCheckedChange={() => {
              onChange(toggleParent(value, node));
            }}
            className="h-5 w-5 rounded border border-gray-300 data-[state=checked]:bg-black"
          >
            <Checkbox.Indicator />
          </Checkbox.Root>
          <label htmlFor={`p-${node.id}`} className="select-none">
            {node.label}
          </label>
        </div>

        {/* 자식들 */}
        {hasChildren(node) && (
          <div className="mt-2 ml-6 flex gap-2">
            {node.childrens!.map((child) => {
              const childChecked = value.parents[node.id] === child.id;
              return (
                <div key={child.id} className="flex items-center gap-2">
                  <Checkbox.Root
                    id={`c-${node.id}-${child.id}`}
                    checked={childChecked}
                    onCheckedChange={() => {
                      onChange(toggleChild(value, node, child));
                    }}
                    className="h-4 w-4 rounded border border-gray-300 data-[state=checked]:bg-black"
                  >
                    <Checkbox.Indicator />
                  </Checkbox.Root>
                  <label htmlFor={`c-${node.id}-${child.id}`} className="text-sm select-none">
                    {child.label}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // 최초 1회: 폼 스토어에 초기값 심기 (이미 값 있으면 건드리지 않음)
  useEffect(() => {
    const current = getValues(parent_name);
    if (current === undefined) {
      setValue(parent_name, initialValue, { shouldDirty: false, shouldTouch: false });
    }
  }, [name, initialValue, getValues, setValue]);

  return (
    <Controller
      control={control}
      name={parent_name}
      shouldUnregister={false} // 언마운트돼도 값 유지
      render={({ field: { value, onChange } }) => {
        // 첫 렌더에서 value가 undefined일 수 있으니 안전값 사용
        const safeValue: GroupState = (value as GroupState) ?? initialValue;
        return (
          <section>
            {tree.map((parent) => (
              <NodeRow key={parent.id} value={safeValue} onChange={onChange} node={parent} />
            ))}
            {limit != null && (
              <p className="mt-2 text-xs text-gray-500">
                선택 {countUnits(safeValue)} / {limit}
              </p>
            )}
          </section>
        );
      }}
    />
  );
}
