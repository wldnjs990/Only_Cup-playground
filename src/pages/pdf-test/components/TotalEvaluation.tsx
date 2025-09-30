import { View } from '@react-pdf/renderer';
import AffectiveScaleBadgeGroup from './AffectiveScaleBadgeGroup';
import CommentArea from './CommentArea';
import CupDefectsGroup from './CupDefectsGroup';
import CoffeeDefectsGroup from './CoffeeDefectsGroup';

export default function TotalEvaluation({
  affective_assessments_title,
  affective_assessments,
  affective_comment,
  cup_defect_items,
  coffee_defect_title,
  coffee_defect_items,
}: Omit<TotalEvaluation, 'extrinsic_attributes_comment'>) {
  return (
    <>
      <AffectiveScaleBadgeGroup
        affective_assessments={affective_assessments}
        affective_assessments_title={affective_assessments_title}
      />
      <CommentArea affective_comment={affective_comment} />

      <View style={{ flexDirection: 'row', borderTop: '0.5pt solid black' }}>
        {/* 컵 결점 */}
        <View style={{ flex: 1, borderRight: '0.5pt solid black' }}>
          <CupDefectsGroup cup_defect_items={cup_defect_items} />
        </View>
        {/* 커피 결점 */}
        <View style={{ flex: 1 }}>
          <CoffeeDefectsGroup
            coffee_defect_title={coffee_defect_title}
            coffee_defect_items={coffee_defect_items}
          />
        </View>
      </View>
    </>
  );
}
