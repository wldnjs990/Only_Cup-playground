import { Text, View } from '@react-pdf/renderer';
import BadgeExplanation from './BadgeExplanation';

export default function AffectiveScaleBadgeExplanation() {
  const EXPLANATIONS = [
    { no: 1, explanation: '극히 낮음' },
    { no: 2, explanation: '매우 낮음' },
    { no: 3, explanation: '적당히 낮음' },
    { no: 4, explanation: '약간 낮음' },
    { no: 5, explanation: '높지도 낮지도 않음' },
    { no: 6, explanation: '약간 높음' },
    { no: 7, explanation: '적당히 높음' },
    { no: 8, explanation: '매우 높음' },
    { no: 9, explanation: '극히 높음' },
  ];
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text style={{ fontSize: 6, marginBottom: 2, fontWeight: 700 }}>품질에 대한 인상</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {EXPLANATIONS.map((EXPLANATION) => {
          return <BadgeExplanation key={EXPLANATION.no} {...EXPLANATION} />;
        })}
      </View>
    </View>
  );
}
