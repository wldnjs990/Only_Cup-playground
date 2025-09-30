import { Text, View } from '@react-pdf/renderer';

export default function CommentArea({ affective_comment }: { affective_comment: string }) {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 2, minHeight: 40 }}>
      <Text style={{ fontSize: 7 }}>{affective_comment}</Text>
    </View>
  );
}
