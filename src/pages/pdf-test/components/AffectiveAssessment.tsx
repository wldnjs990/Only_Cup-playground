import AffectiveScaleBadgeGroup from './AffectiveScaleBadgeGroup';
import CommentArea from './CommentArea';

export default function AffectiveAssessment({
  affective_assessments,
  affective_comment,
}: {
  affective_assessments: AffectiveAssessments[];
  affective_comment: string;
}) {
  return (
    <>
      <AffectiveScaleBadgeGroup affective_assessments={affective_assessments} />
      <CommentArea affective_comment={affective_comment} />
    </>
  );
}
