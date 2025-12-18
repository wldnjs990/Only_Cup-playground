import type { CategoryDetailValue } from '@/types/new/form_values_schema';

interface WordCloudProps {
  details: CategoryDetailValue[];
}

// intensity 값에 따른 색상 매핑
const INTENSITY_COLORS: Record<string, string> = {
  high: '#0EA5E9', // sky-500
  mid: '#7DD3FC', // sky-300
  low: '#E0F2FE', // sky-100
};

// intensity 한글 라벨
const INTENSITY_LABELS: Record<string, string> = {
  high: '높음',
  mid: '중간',
  low: '낮음',
};

export default function CuppingWordCloud({ details }: WordCloudProps) {
  // affectiveScore 기준으로 정렬 (높은 점수가 먼저)
  const sortedDetails = [...details].sort((a, b) => b.affectiveScore - a.affectiveScore);

  return (
    <div className="h-[300px] w-full overflow-auto rounded-lg border bg-white p-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {sortedDetails.map((detail, index) => {
          // affectiveScore (0-9)를 폰트 크기로 변환 (16-48px)
          const fontSize = 16 + (detail.affectiveScore / 9) * 32;
          const color = INTENSITY_COLORS[detail.intensity] || '#38BDF8';

          return (
            <div
              key={index}
              className="group relative inline-flex cursor-default items-center rounded px-2 py-1 transition-transform hover:scale-110"
              style={{
                backgroundColor: `${color}20`, // 20% opacity
              }}
            >
              <span
                style={{
                  fontSize: `${fontSize}px`,
                  color: color,
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {detail.categoryLabel || detail.categoryValue}
              </span>

              {/* 툴팁 */}
              <div className="invisible absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                <div>점수: {detail.affectiveScore}/9</div>
                <div>
                  강도:{' '}
                  {detail.intensityLabel || INTENSITY_LABELS[detail.intensity] || detail.intensity}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
