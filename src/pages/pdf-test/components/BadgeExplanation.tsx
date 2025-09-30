import { Text, View } from '@react-pdf/renderer';

export default function BadgeExplanation({ no, explanation }: { no: number; explanation: string }) {
  return (
    <View
      style={{
        width: '33.333%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 6,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          border: '0.5pt solid black',
        }}
      >
        <Text style={{ fontSize: 4 }}>{no}</Text>
      </View>
      <Text style={{ fontSize: 6 }}>{explanation}</Text>
    </View>
  );
}
