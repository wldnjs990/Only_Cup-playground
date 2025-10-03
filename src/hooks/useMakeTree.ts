import { useMemo } from 'react';

export const useMakeTreeList = (items: SelectionItem[]) => {
  // [부모item, 자식items]로 배열 정제하는 로직(useMemo 메모이제이션 적용)
  const treeList = useMemo<TreeSelectionItem[]>(() => {
    const treeObject: Record<number, TreeSelectionItem> = {};
    console.log(items);
    // parentId가 null인 것만 돌리기(부모 담기)
    items.forEach(
      (item) => item.parentId === null && (treeObject[item.id] = { ...item, childrens: [] }),
    );
    // parentId가 있는 것만 들리기(자식 담기)
    items.forEach(
      (item) =>
        item.parentId &&
        treeObject[item.parentId] &&
        treeObject[item.parentId].childrens.push(item),
    );

    return Object.values(treeObject);
  }, [items]);

  return {
    treeList: treeList,
  };
};
