import { Document, Page, View, Font, Text } from '@react-pdf/renderer';
import IntensityScaleBarGroup from './IntensityScaleBarGroup';
import MultiSelectionGroup from './MuitiSelectionGroup';
import EvaluationTitle from './EvaluationTitle';
import AffectiveAssessment from './AffectiveAssessment';
import ScaInfo from './ScaInfo';
import EvaluationFrame from './EvaluationFrame';
import ScaInfoFrame from './ScaInfoFrame';
import AffectiveScaleBadgeExplanation from './AffectiveScaleBadgeExplanation';
import ExtrinsicAttributes from './ExtrinsicAttributes';
import TotalEvaluation from './TotalEvaluation';

// (권장) 폰트는 public에 넣어 로컬 등록
Font.register({
  family: 'Pretendard',
  fonts: [
    { src: '/fonts/Pretendard-Black.ttf', fontWeight: 900 },
    { src: '/fonts/Pretendard-ExtraBold.ttf', fontWeight: 800 },
    { src: '/fonts/Pretendard-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Pretendard-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/Pretendard-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Pretendard-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Pretendard-Light.ttf', fontWeight: 300 },
    { src: '/fonts/Pretendard-ExtraLight.ttf', fontWeight: 200 },
    { src: '/fonts/Pretendard-Thin.ttf', fontWeight: 100 },
  ],
});

const PdfDocument = ({ pdfDoc }: { pdfDoc: EvaluationRoot }) => {
  const { version, sca_info, evaluation_schemas, total_evaluation } = pdfDoc;
  return (
    <Document>
      {/* 페이지 레이아웃 */}
      <Page size="A4" style={{ padding: 30, fontFamily: 'Pretendard', fontWeight: 400 }}>
        {/* 스키마 버전 정보 */}

        <Text
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 6,
            fontWeight: 700,
          }}
        >
          Ver.{version}
        </Text>
        {/* 최상단 결합평가양식 텍스트 부분 */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: 600 }}>SCA 커피 가치 평가</Text>
          <Text style={{ fontSize: 24, fontWeight: 700 }}>결합 평가 양식</Text>
        </View>
        {/* 상단 이름, 날짜 등 정보 + 품질에 대한 인상 온보딩 부분 */}
        <ScaInfoFrame
          leftContent={<ScaInfo sca_info={sca_info} />}
          rightContent={<AffectiveScaleBadgeExplanation />}
        />
        {/* 컨텐츠 부분 */}
        <View style={{ flexDirection: 'column', gap: 5, marginBottom: 10 }}>
          {/* 중단 평가 제목 부분 */}
          <EvaluationFrame
            leftContent={<EvaluationTitle title="파트 1 : 감각 묘사 평가" />}
            rightContent={<EvaluationTitle title="파트 2 : 정동 평가" />}
          />
          {/* 중단 평가 컨텐츠 부분 */}
          {evaluation_schemas.map((evaluation_schema) => {
            const {
              id,
              single_selections,
              multiple_selections,
              affective_assessments,
              affective_comment,
            } = evaluation_schema;
            return (
              <EvaluationFrame
                key={id}
                leftContent={
                  <View>
                    {/* 강도 평가 선택 막대기 영역 */}
                    <IntensityScaleBarGroup single_selections={single_selections} />
                    {/* 감각 묘사 라디오 버튼 영역 */}
                    <MultiSelectionGroup multipleSelections={multiple_selections} />
                  </View>
                }
                rightContent={
                  // 정동평가 영역
                  <AffectiveAssessment
                    affective_assessments={affective_assessments}
                    affective_comment={affective_comment}
                  />
                }
              />
            );
          })}
          {/* 하단 외재적 속성 평가 부분 */}
          <EvaluationFrame
            leftContent={
              // 외재적 속성 평가
              <ExtrinsicAttributes {...total_evaluation} />
            }
            rightContent={
              // 전체적 인상
              <TotalEvaluation {...total_evaluation} />
            }
          />
          {/* 평가 박스 1줄 */}
        </View>
      </Page>
    </Document>
  );
};
export default PdfDocument;
