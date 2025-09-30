import { View } from '@react-pdf/renderer';
import EvaluationTitle from './EvaluationTitle';
import CommentArea from './CommentArea';

export default function ExtrinsicAttributes({
  extrinsic_attributes_comment,
}: Pick<TotalEvaluation, 'extrinsic_attributes_comment'>) {
  return (
    <View>
      <EvaluationTitle title="파트 3 : 외재적 속성 평가" />
      <CommentArea affective_comment={extrinsic_attributes_comment} />
    </View>
  );
}
