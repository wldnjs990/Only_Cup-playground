import type { SelectionItemSchema, TreeSelectionParentItem } from '@/types/new_naming';
import { useMemo } from 'react';

export const useMakeTreeList = (items: SelectionItemSchema[]) => {
  // [부모item, 자식items]로 배열 정제하는 로직(useMemo 메모이제이션 적용)
  const treeList = useMemo<TreeSelectionParentItem[]>(() => {
    const treeObject: Record<number, TreeSelectionParentItem> = {};
    // parentId가 null인 것만 돌리기(부모 담기)
    items.forEach(
      (item, idx) =>
        item.parentId === null && (treeObject[item.id] = { ...item, childrens: [], idx: idx }), // RHF 경로 저장용 idx값 추가 저장
    );
    // parentId가 있는 것만 들리기(자식 담기)
    items.forEach(
      (item, idx) =>
        item.parentId &&
        treeObject[item.parentId] &&
        treeObject[item.parentId].childrens.push({ ...item, idx: idx }), // RHF 경로 저장용 idx값 추가 저장
    );

    return Object.values(treeObject);
  }, [items]);

  return treeList;
};
