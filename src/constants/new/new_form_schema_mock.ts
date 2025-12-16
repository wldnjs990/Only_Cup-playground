import { categoryTree } from './category_tree';
import { optionsList } from './options_list';
import type { CuppingFormConfig } from '@/types/new/server_config_schema';

/**
 * ⚠️ DEPRECATED: 이 파일은 레거시입니다.
 * 새 스키마는 server_config_mock.ts를 사용하세요.
 *
 * @deprecated Use SERVER_FORM_CONFIG from './server_config_mock' instead
 */
export const NEW_FORM_SCHEMA: CuppingFormConfig = {
  // 커피 정보 스키마
  basicInfo: {
    coffeeSelect: {
      inputType: 'dropdown',
      label: '평가할 원두를 선택해주세요!',
      required: true,
      optionList: optionsList.coffeeTitleOptions,
      tooltip: '원두 선택은 필수입니다',
    },
  },
  // 평가 스키마
  evaluations: [
    // 향
    {
      id: 1,
      title: '향',
      label: '커피에서 무슨 향이 나나요?',
      categoryName: 'aroma',
      category: {
        inputType: 'cascader',
        label: '해당되는 기술어를 선택해주세요!',
        required: true,
        cascaderTree: categoryTree.aroma,
        maxSelection: 5,
        tooltip: '최대 5개까지 선택 가능합니다',
      },
      detailEvaluation: {
        label: '선택하신 기술어에 대해 자세히 평가해주세요!',
        intensity: {
          label: '강도 평가',
          inputType: 'radio',
          optionList: [
            { id: 1, label: '약함', value: 'low' },
            { id: 2, label: '중간', value: 'medium' },
            { id: 3, label: '강함', value: 'high' },
          ],
          tooltip: '향의 강도를 평가해주세요',
        },
        affectiveScore: {
          label: '정동 평가',
          inputType: 'slider',
          min: 0,
          max: 10,
          step: 1,
          tooltip: '0은 매우 나쁨, 10은 매우 좋음',
        },
        affectiveNote: {
          label: '정동 평가 (서술)',
          inputType: 'text',
          placeholder: '느낀 점을 자유롭게 작성해주세요',
          tooltip: '선택 항목입니다',
        },
      },
    },
    // 맛
    {
      id: 2,
      title: '맛',
      label: '커피에서 어떤 맛이 느껴지시나요?',
      categoryName: 'taste',
      category: {
        inputType: 'cascader',
        label: '해당되는 기술어를 선택해주세요!',
        required: true,
        cascaderTree: categoryTree.taste,
        maxSelection: 5,
        tooltip: '최대 5개까지 선택 가능합니다',
      },
      detailEvaluation: {
        label: '선택하신 기술어에 대해 자세히 평가해주세요!',
        intensity: {
          label: '강도 평가',
          inputType: 'radio',
          optionList: [
            { id: 1, label: '약함', value: 'low' },
            { id: 2, label: '중간', value: 'medium' },
            { id: 3, label: '강함', value: 'high' },
          ],
          tooltip: '맛의 강도를 평가해주세요',
        },
        affectiveScore: {
          label: '정동 평가',
          inputType: 'slider',
          min: 0,
          max: 10,
          step: 1,
          tooltip: '0은 매우 나쁨, 10은 매우 좋음',
        },
        affectiveNote: {
          label: '정동 평가 (서술)',
          inputType: 'text',
          placeholder: '느낀 점을 자유롭게 작성해주세요',
          tooltip: '선택 항목입니다',
        },
      },
    },
    // 산미
    {
      id: 3,
      title: '산미',
      label: '커피에서 산미가 느껴지시나요?',
      categoryName: 'acidity',
      category: {
        inputType: 'cascader',
        label: '해당되는 기술어를 선택해주세요!',
        required: true,
        cascaderTree: categoryTree.acidity,
        maxSelection: 5,
        tooltip: '최대 5개까지 선택 가능합니다',
      },
      detailEvaluation: {
        label: '선택하신 기술어에 대해 자세히 평가해주세요!',
        intensity: {
          label: '강도 평가',
          inputType: 'radio',
          optionList: [
            { id: 1, label: '약함', value: 'low' },
            { id: 2, label: '중간', value: 'medium' },
            { id: 3, label: '강함', value: 'high' },
          ],
          tooltip: '산미의 강도를 평가해주세요',
        },
        affectiveScore: {
          label: '정동 평가',
          inputType: 'slider',
          min: 0,
          max: 10,
          step: 1,
          tooltip: '0은 매우 나쁨, 10은 매우 좋음',
        },
        affectiveNote: {
          label: '정동 평가 (서술)',
          inputType: 'text',
          placeholder: '느낀 점을 자유롭게 작성해주세요',
          tooltip: '선택 항목입니다',
        },
      },
    },
    // 단 맛
    {
      id: 4,
      title: '단 맛',
      label: '커피에서 느껴지는 단 맛이 있나요?',
      categoryName: 'sweetness',
      category: {
        inputType: 'cascader',
        label: '해당되는 기술어를 선택해주세요!',
        required: true,
        cascaderTree: categoryTree.sweetness,
        maxSelection: 5,
        tooltip: '최대 5개까지 선택 가능합니다',
      },
      detailEvaluation: {
        label: '선택하신 기술어에 대해 자세히 평가해주세요!',
        intensity: {
          label: '강도 평가',
          inputType: 'radio',
          optionList: [
            { id: 1, label: '약함', value: 'low' },
            { id: 2, label: '중간', value: 'medium' },
            { id: 3, label: '강함', value: 'high' },
          ],
          tooltip: '단맛의 강도를 평가해주세요',
        },
        affectiveScore: {
          label: '정동 평가',
          inputType: 'slider',
          min: 0,
          max: 10,
          step: 1,
          tooltip: '0은 매우 나쁨, 10은 매우 좋음',
        },
        affectiveNote: {
          label: '정동 평가 (서술)',
          inputType: 'text',
          placeholder: '느낀 점을 자유롭게 작성해주세요',
          tooltip: '선택 항목입니다',
        },
      },
    },
    // 마우스필
    {
      id: 5,
      title: '마우스필',
      label: '커피를 마신 후 느껴지는 여운이 있나요?',
      categoryName: 'mouthfeel',
      category: {
        inputType: 'cascader',
        label: '해당되는 기술어를 선택해주세요!',
        required: true,
        cascaderTree: categoryTree.mouthfeel,
        maxSelection: 5,
        tooltip: '최대 5개까지 선택 가능합니다',
      },
      detailEvaluation: {
        label: '선택하신 기술어에 대해 자세히 평가해주세요!',
        intensity: {
          label: '강도 평가',
          inputType: 'radio',
          optionList: [
            { id: 1, label: '약함', value: 'low' },
            { id: 2, label: '중간', value: 'medium' },
            { id: 3, label: '강함', value: 'high' },
          ],
          tooltip: '마우스필의 강도를 평가해주세요',
        },
        affectiveScore: {
          label: '정동 평가',
          inputType: 'slider',
          min: 0,
          max: 10,
          step: 1,
          tooltip: '0은 매우 나쁨, 10은 매우 좋음',
        },
        affectiveNote: {
          label: '정동 평가 (서술)',
          inputType: 'text',
          placeholder: '느낀 점을 자유롭게 작성해주세요',
          tooltip: '선택 항목입니다',
        },
      },
    },
  ],
};
