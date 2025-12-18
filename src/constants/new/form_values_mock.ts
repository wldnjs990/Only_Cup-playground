import type {
  CategoryName,
  CuppingFormValue,
  EvaluationValue,
  RootCuppingFormValue,
} from '@/types/new/form_values_schema';

// ============================================
// RHF 폼 초기값 Mock
// ============================================

// ============================================
// 기본값 생성 헬퍼
// ============================================

/**
 * 빈 카테고리 상사 평가 값 생성
 */
export const createEmptyDetailValue = (categoryValue: string) => ({
  categoryValue,
  intensity: 'medium',
  affectiveScore: 4,
  affectiveNote: '',
});

/**
 * 빈 평가 값 생성
 */
export const createEmptyEvaluationValue = (categoryName: CategoryName): EvaluationValue => ({
  categoryName,
  selectedCategories: [],
  details: [],
});

/**
 * 빈 커핑 폼 값 생성
 */
export const createEmptyCuppingFormValue = (): CuppingFormValue => ({
  coffeeId: '',
  evaluations: [
    createEmptyEvaluationValue('aroma'),
    createEmptyEvaluationValue('taste'),
    createEmptyEvaluationValue('acidity'),
    createEmptyEvaluationValue('sweetness'),
    createEmptyEvaluationValue('mouthfeel'),
  ],
});

/**
 * 루트 폼 기본값 생성
 */
const createDefaultRootFormValue = (): RootCuppingFormValue => ({
  purposeValue: 'basic',
  cuppings: [createEmptyCuppingFormValue()],
});

/**
 * 빈 폼 초기값
 */
export const EMPTY_FORM_VALUES: RootCuppingFormValue = createDefaultRootFormValue();

/**
 * 예시 폼 값 (테스트용)
 */
export const EXAMPLE_FORM_VALUES: RootCuppingFormValue = {
  purposeValue: 'basic',
  cuppings: [
    {
      coffeeId: 'ethiopia_yirgacheffe',
      evaluations: [
        // 향
        {
          categoryName: 'aroma',
          selectedCategories: ['aroma_floral_white_jasmine', 'aroma_fruit_citrus_lemon'],
          details: [
            {
              categoryValue: 'aroma_floral_white_jasmine',
              intensity: 'high',
              affectiveScore: 8,
              affectiveNote: '자스민 향이 강하게 느껴집니다',
            },
            {
              categoryValue: 'aroma_fruit_citrus_lemon',
              intensity: 'medium',
              affectiveScore: 7,
              affectiveNote: '은은한 레몬 향',
            },
          ],
        },
        // 맛
        {
          categoryName: 'taste',
          selectedCategories: ['taste_sweet_chocolate'],
          details: [
            {
              categoryValue: 'taste_sweet_chocolate',
              intensity: 'medium',
              affectiveScore: 9,
              affectiveNote: '다크 초콜릿의 깊은 맛',
            },
          ],
        },
        // 산미
        {
          categoryName: 'acidity',
          selectedCategories: [],
          details: [],
        },
        // 단맛
        {
          categoryName: 'sweetness',
          selectedCategories: [],
          details: [],
        },
        // 마우스필
        {
          categoryName: 'mouthfeel',
          selectedCategories: [],
          details: [],
        },
      ],
    },
  ],
};
