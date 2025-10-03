import { Text, View } from '@react-pdf/renderer';
// import { useEffect, useState } from 'react';
import SelectionItems from './SelectionItems';
import { useMakeTreeList } from '../../../hooks/useMakeTree';

export default function MultiSelection({
  multiple_selection,
}: {
  multiple_selection: MultipleSelection;
}) {
  const { treeList: treeSelectionItems } = useMakeTreeList(multiple_selection.items);

  return (
    <>
      <View style={{ paddingVertical: 2 }}>
        <Text style={{ fontSize: 7, fontWeight: 'bold' }}>
          {multiple_selection.title}
          {multiple_selection?.limit && `(최대${multiple_selection?.limit}개)`}
        </Text>
        <View style={{ flexDirection: 'column' }}>
          {treeSelectionItems.map((treeSelectionItem) => (
            <SelectionItems key={treeSelectionItem.id} selectionItems={treeSelectionItem} />
          ))}
        </View>
      </View>
    </>
  );
}
