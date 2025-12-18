import type { RootCuppingFormConfig, AffectiveExplainList } from '@/types/new/server_config_schema';
import { categoryTree } from './category_tree';
import { optionsList } from './options_list';

// ============================================
// 서버에서 받게 될 폼 Config Mock 데이터
// ============================================

/**
 * 서버 응답 Mock: 커핑 폼 UI 설정
 * GET /api/cupping/form-config
 */
export const SERVER_FORM_CONFIG: RootCuppingFormConfig = {
  // 목적 선택 설정
  purpose: {
    required: false,
    inputType: 'radio',
    title: '',
    label: '목적을 선택해주세요',
    optionList: optionsList.purposeOptions,
    tooltip: '입문자 모드는 툴팁을 제공해줍니다.',
  },

  // 커핑 폼 설정
  cuppingForm: {
    // 기본 정보: 원두 선택
    basicInfo: {
      coffeeSelect: {
        inputType: 'dropdown',
        label: '평가할 원두를 선택해주세요',
        placeholder: '원두를 선택하세요',
        required: true,
        optionList: optionsList.coffeeTitleOptions,
      },
    },

    // 평가 항목 설정 (향, 맛, 산미, 단맛, 마우스필)
    evaluations: [
      // 향
      {
        id: 1,
        title: '향',
        label: '어떤 향이 나나요?',
        categoryName: 'aroma',
        category: {
          inputType: 'cascader',
          label: '기술어를 선택해주세요',
          placeholder: '기술어 선택',
          required: true,
          cascaderTree: categoryTree.aroma,
          maxSelection: 5,
          tooltip: '최대 5개까지 선택 가능합니다',
        },
        detailEvaluation: {
          title: '상세 평가',
          label: '선택한 기술어를 자세히 평가해주세요',
          intensity: {
            title: '강도',
            label: '향의 강도를 평가해주세요',
            required: true,
            inputType: 'radio',
            optionList: [
              { id: 1, label: '약함', value: 'low' },
              { id: 2, label: '중간', value: 'medium' },
              { id: 3, label: '강함', value: 'high' },
            ],
            tooltip: '향의 강도를 선택하세요',
          },
          affectiveScore: {
            title: '정동 평가',
            label: '향에 대한 만족도를 평가해주세요',
            inputType: 'slider',
            required: true,
            min: 0,
            max: 9,
            step: 1,
            tooltip: '0은 매우 나쁨, 10은 매우 좋음',
          },
          affectiveNote: {
            title: '정동 메모',
            label: '향에 대한 느낌을 자유롭게 작성해주세요',
            inputType: 'text',
            placeholder: '예) 달콤한 초콜릿 향이 강하게 느껴짐',
            tooltip: '선택 항목입니다',
          },
        },
      },
      // 맛
      {
        id: 2,
        title: '맛',
        label: '어떤 맛이 느껴지나요?',
        categoryName: 'taste',
        category: {
          inputType: 'cascader',
          label: '기술어를 선택해주세요',
          placeholder: '기술어 선택',
          required: true,
          cascaderTree: categoryTree.taste,
          maxSelection: 5,
          tooltip: '최대 5개까지 선택 가능합니다',
        },
        detailEvaluation: {
          title: '상세 평가',
          label: '선택한 기술어를 자세히 평가해주세요',
          intensity: {
            title: '강도',
            label: '맛의 강도를 평가해주세요',
            required: true,
            inputType: 'radio',
            optionList: [
              { id: 1, label: '약함', value: 'low' },
              { id: 2, label: '중간', value: 'medium' },
              { id: 3, label: '강함', value: 'high' },
            ],
            tooltip: '맛의 강도를 선택하세요',
          },
          affectiveScore: {
            title: '정동 평가',
            label: '맛에 대한 만족도를 평가해주세요',
            inputType: 'slider',
            required: true,
            min: 0,
            max: 10,
            step: 1,
            tooltip: '0은 매우 나쁨, 10은 매우 좋음',
          },
          affectiveNote: {
            title: '정동 메모',
            label: '맛에 대한 느낌을 자유롭게 작성해주세요',
            inputType: 'text',
            placeholder: '예) 은은한 베리류의 신맛과 단맛의 조화',
            tooltip: '선택 항목입니다',
          },
        },
      },
      // 산미
      {
        id: 3,
        title: '산미',
        label: '산미가 느껴지나요?',
        categoryName: 'acidity',
        category: {
          inputType: 'cascader',
          label: '기술어를 선택해주세요',
          placeholder: '기술어 선택',
          required: true,
          cascaderTree: categoryTree.acidity,
          maxSelection: 5,
          tooltip: '최대 5개까지 선택 가능합니다',
        },
        detailEvaluation: {
          title: '상세 평가',
          label: '선택한 기술어를 자세히 평가해주세요',
          intensity: {
            title: '강도',
            label: '산미의 강도를 평가해주세요',
            required: true,
            inputType: 'radio',
            optionList: [
              { id: 1, label: '약함', value: 'low' },
              { id: 2, label: '중간', value: 'medium' },
              { id: 3, label: '강함', value: 'high' },
            ],
            tooltip: '산미의 강도를 선택하세요',
          },
          affectiveScore: {
            title: '정동 평가',
            label: '산미에 대한 만족도를 평가해주세요',
            inputType: 'slider',
            required: true,
            min: 0,
            max: 10,
            step: 1,
            tooltip: '0은 매우 나쁨, 10은 매우 좋음',
          },
          affectiveNote: {
            title: '정동 메모',
            label: '산미에 대한 느낌을 자유롭게 작성해주세요',
            inputType: 'text',
            placeholder: '예) 상큼한 시트러스 산미가 부드럽게 느껴짐',
            tooltip: '선택 항목입니다',
          },
        },
      },
      // 단맛
      {
        id: 4,
        title: '단맛',
        label: '단맛이 느껴지나요?',
        categoryName: 'sweetness',
        category: {
          inputType: 'cascader',
          label: '기술어를 선택해주세요',
          placeholder: '기술어 선택',
          required: true,
          cascaderTree: categoryTree.sweetness,
          maxSelection: 5,
          tooltip: '최대 5개까지 선택 가능합니다',
        },
        detailEvaluation: {
          title: '상세 평가',
          label: '선택한 기술어를 자세히 평가해주세요',
          intensity: {
            title: '강도',
            label: '단맛의 강도를 평가해주세요',
            required: true,
            inputType: 'radio',
            optionList: [
              { id: 1, label: '약함', value: 'low' },
              { id: 2, label: '중간', value: 'medium' },
              { id: 3, label: '강함', value: 'high' },
            ],
            tooltip: '단맛의 강도를 선택하세요',
          },
          affectiveScore: {
            title: '정동 평가',
            label: '단맛에 대한 만족도를 평가해주세요',
            inputType: 'slider',
            required: true,
            min: 0,
            max: 10,
            step: 1,
            tooltip: '0은 매우 나쁨, 10은 매우 좋음',
          },
          affectiveNote: {
            title: '정동 메모',
            label: '단맛에 대한 느낌을 자유롭게 작성해주세요',
            inputType: 'text',
            placeholder: '예) 캐러멜과 같은 깊은 단맛',
            tooltip: '선택 항목입니다',
          },
        },
      },
      // 마우스필
      {
        id: 5,
        title: '마우스필',
        label: '입안의 느낌은 어떤가요?',
        categoryName: 'mouthfeel',
        category: {
          inputType: 'cascader',
          label: '기술어를 선택해주세요',
          placeholder: '기술어 선택',
          required: true,
          cascaderTree: categoryTree.mouthfeel,
          maxSelection: 5,
          tooltip: '최대 5개까지 선택 가능합니다',
        },
        detailEvaluation: {
          title: '상세 평가',
          label: '선택한 기술어를 자세히 평가해주세요',
          intensity: {
            title: '강도',
            label: '마우스필의 강도를 평가해주세요',
            required: true,
            inputType: 'radio',
            optionList: [
              { id: 1, label: '약함', value: 'low' },
              { id: 2, label: '중간', value: 'medium' },
              { id: 3, label: '강함', value: 'high' },
            ],
            tooltip: '마우스필의 강도를 선택하세요',
          },
          affectiveScore: {
            title: '정동 평가',
            label: '마우스필에 대한 만족도를 평가해주세요',
            inputType: 'slider',
            required: true,
            min: 0,
            max: 10,
            step: 1,
            tooltip: '0은 매우 나쁨, 10은 매우 좋음',
          },
          affectiveNote: {
            title: '정동 메모',
            label: '마우스필에 대한 느낌을 자유롭게 작성해주세요',
            inputType: 'text',
            placeholder: '예) 부드럽고 크리미한 질감',
            tooltip: '선택 항목입니다',
          },
        },
      },
    ],
  },

  // 최대 커핑 개수
  maxCuppingCount: 15,
};

// ============================================
// 정동 평가 설명 리스트 (UI 전용 - 프론트 관리)
// ============================================

/**
 * 정동 평가 점수별 설명
 * 이 데이터는 프론트엔드에서 직접 관리합니다 (서버 전송 불필요)
 */
export const AFFECTIVE_SCORE_EXPLAINS: AffectiveExplainList = [
  { level: 0, explain: '매우 나쁨 - 전혀 마시고 싶지 않음' },
  { level: 1, explain: '나쁨 - 마시기 힘듦' },
  { level: 2, explain: '별로 - 선호하지 않음' },
  { level: 3, explain: '보통 이하 - 아쉬운 점이 많음' },
  { level: 4, explain: '그저 그럼 - 특별한 점이 없음' },
  { level: 5, explain: '보통 - 무난함' },
  { level: 6, explain: '괜찮음 - 마실 만함' },
  { level: 7, explain: '좋음 - 만족스러움' },
  { level: 8, explain: '매우 좋음 - 인상적임' },
  { level: 9, explain: '훌륭함 - 다시 마시고 싶음' },
  { level: 10, explain: '완벽함 - 최고의 경험' },
];

/**
 * 정동 평가 점수별 스타일 (프론트 관리)
 */
export const AFFECTIVE_SCORE_STYLES = {
  0: { color: 'text-red-700', bg: 'bg-red-100' },
  1: { color: 'text-red-600', bg: 'bg-red-100' },
  2: { color: 'text-orange-600', bg: 'bg-orange-100' },
  3: { color: 'text-orange-500', bg: 'bg-orange-100' },
  4: { color: 'text-yellow-600', bg: 'bg-yellow-100' },
  5: { color: 'text-yellow-500', bg: 'bg-yellow-100' },
  6: { color: 'text-lime-600', bg: 'bg-lime-100' },
  7: { color: 'text-green-600', bg: 'bg-green-100' },
  8: { color: 'text-green-500', bg: 'bg-green-100' },
  9: { color: 'text-blue-600', bg: 'bg-blue-100' },
  10: { color: 'text-blue-500', bg: 'bg-blue-100' },
} as const;
