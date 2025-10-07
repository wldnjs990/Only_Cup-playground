import { Text, View } from '@react-pdf/renderer';
import SelectionItems from './SelectionItems';
import { useMakeTreeList } from '@/hooks/useMakeTreeList';

export default function CoffeeDefectsGroup({
  coffee_defect_title,
  coffee_defect_items,
}: {
  coffee_defect_title: string;
  coffee_defect_items: SelectionItem[];
}) {
  const treeDefectItems = useMakeTreeList(coffee_defect_items);
  return (
    <View style={{ padding: 3 }}>
      <Text style={{ fontSize: 6, fontWeight: 700 }}>{coffee_defect_title}</Text>
      <View style={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
        {treeDefectItems.map((treeDefectItem) => {
          return <SelectionItems key={treeDefectItem.id} selectionItems={treeDefectItem} />;
        })}
      </View>
    </View>
  );
}
