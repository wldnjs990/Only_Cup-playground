import { Text, View } from '@react-pdf/renderer';
import SelectionItems from './SelectionItems';

export default function CoffeeDefectsGroup({
  coffee_defect_title,
  coffee_defect_items,
}: {
  coffee_defect_title: string;
  coffee_defect_items: SelectionItem[];
}) {
  return (
    <View style={{ padding: 2 }}>
      <Text style={{ fontSize: 6, fontWeight: 700 }}>{coffee_defect_title}</Text>
      <View style={{ flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
        {coffee_defect_items.map((coffee_defect_item) => {
          return <SelectionItems selectionItems={[coffee_defect_item]} />;
        })}
      </View>
    </View>
  );
}
