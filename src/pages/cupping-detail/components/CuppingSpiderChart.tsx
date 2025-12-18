import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { CuppingFormValue } from '@/types/new/form_values_schema';

interface SpiderChartProps {
  cupping: CuppingFormValue;
}

// 카테고리 이름 한글 매핑
const CATEGORY_LABELS: Record<string, string> = {
  aroma: '향',
  taste: '맛',
  acidity: '산미',
  sweetness: '단맛',
  mouthfeel: '마우스필',
};

export default function CuppingSpiderChart({ cupping }: SpiderChartProps) {
  // 각 평가 항목의 affectiveScore 평균 계산
  const chartData = cupping.evaluations.map((evaluation) => {
    const scores = evaluation.details.map((detail) => detail.affectiveScore);
    const average = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;

    return {
      category: CATEGORY_LABELS[evaluation.categoryName] || evaluation.categoryName,
      score: Math.round(average * 10) / 10, // 소수점 1자리
    };
  });

  return (
    <div className="h-[400px] w-full rounded-lg border bg-white p-4">
      <h3 className="mb-4 text-center text-lg font-semibold">커핑 평가 종합</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 14 }} />
          <PolarRadiusAxis angle={90} domain={[0, 9]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Radar name="평가 점수" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
