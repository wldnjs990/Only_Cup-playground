import { View } from '@react-pdf/renderer';
import CountCheckItem from './CountCheckItem';

export default function CupDefectsGroup({
  cup_defect_items,
}: {
  cup_defect_items: CupDefectItems[];
}) {
  return (
    <View style={{ padding: 3 }}>
      {cup_defect_items.map((cup_defect_item) => {
        const { id, defect_name, range, selected } = cup_defect_item;
        return <CountCheckItem key={id} name={defect_name} range={range} selected={selected} />;
      })}
    </View>
  );
}
