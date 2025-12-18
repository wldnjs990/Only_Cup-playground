/**
 * Value → Label 매핑 상수
 * 저장된 value를 사용자가 읽을 수 있는 label로 변환
 */

export const INTENSITY_LABELS: Record<string, string> = {
  low: '낮음',
  mid: '중간',
  high: '높음',
  very_weak: '매우 약함',
  weak: '약함',
  moderate: '보통',
  strong: '강함',
  very_strong: '매우 강함',
};

export const CATEGORY_NAME_LABELS: Record<string, string> = {
  aroma: '향',
  taste: '맛',
  acidity: '산미',
  sweetness: '단맛',
  mouthfeel: '마우스필',
};

/**
 * Value에서 Label을 찾는 헬퍼 함수
 */
export function getIntensityLabel(value: string): string {
  return INTENSITY_LABELS[value] || value;
}

export function getCategoryNameLabel(value: string): string {
  return CATEGORY_NAME_LABELS[value] || value;
}
