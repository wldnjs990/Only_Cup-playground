import { Text, View } from '@react-pdf/renderer';

export default function AffectiveScaleBadge({
  range,
  selected,
}: Pick<AffectiveAssessments, 'range' | 'selected'>) {
  const rangeArr = new Array(range).fill(0).map((_, idx) => idx + 1);
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
      {rangeArr.map((now) => (
        <View
          key={now}
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            border: '0.5pt solid black',
            backgroundColor: now === selected ? 'black' : 'transparent',
          }}
        >
          <Text style={{ fontSize: 7, color: now === selected ? '#FFFFFF' : 'black' }}>{now}</Text>
        </View>
      ))}
      <View
        style={{
          width: 24,
          height: 12,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          border: '0.5pt solid black',
        }}
      >
        <Text style={{ fontSize: 7, color: 'gray', fontWeight: 600 }}>최종</Text>
      </View>
    </View>
  );
}
