import { Text, View } from '@react-pdf/renderer';

export default function EvaluationTitle({ title }: { title: string }) {
  return (
    <View style={{ backgroundColor: 'black', paddingHorizontal: 10, paddingVertical: 2 }}>
      <Text style={{ color: 'white', fontSize: 6 }}>{title}</Text>
    </View>
  );
}
