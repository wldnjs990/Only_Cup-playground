import { Text } from '@react-pdf/renderer';
import AffectiveScaleBadge from './AffectiveScaleBadge';
import TopGroupFrame from './TopGroupFrame';

export default function AffectiveScaleBadgeGroup({
  affective_assessments,
  affective_assessments_title,
}: {
  affective_assessments: AffectiveAssessments[];
  affective_assessments_title?: string;
}) {
  return (
    <TopGroupFrame>
      {affective_assessments_title && (
        <Text style={{ fontSize: 7, fontWeight: 700, marginLeft: 2 }}>
          {affective_assessments_title}
        </Text>
      )}
      {affective_assessments.map((affective_assessment) => {
        const { id, range, selected } = affective_assessment;
        return <AffectiveScaleBadge key={id} range={range} selected={selected} />;
      })}
    </TopGroupFrame>
  );
}
