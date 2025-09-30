import { Text, View } from '@react-pdf/renderer';

export default function CountCheckItem({
  name,
  range,
  selected,
}: {
  name: string;
  range: number;
  selected: number;
}) {
  const checkbox_range = new Array(range).fill(0).map((_, idx) => idx + 1);
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 6, fontWeight: 700 }}>{name}</Text>
      <View style={{ flexDirection: 'row', gap: 1 }}>
        {checkbox_range.map((now) => {
          return (
            <View
              key={now}
              style={{
                width: 5,
                height: 5,
                border: '0.5pt solid black',
                backgroundColor: now <= selected ? 'black' : 'transparent',
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
