import { View } from '@react-pdf/renderer';
import MultiSelection from './MultiSelection';

export default function MultiSelectionGroup({
  multipleSelections,
}: {
  multipleSelections: MultipleSelection[];
}) {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 2 }}>
      {/* 기술어, 주요 맛 같은 라디오 버튼 리스트들 담는 그룹 박스 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {multipleSelections.map((multipleSelection) => {
          return (
            <MultiSelection key={multipleSelection.title} multiple_selection={multipleSelection} />
          );
        })}
      </View>
    </View>
  );
}
