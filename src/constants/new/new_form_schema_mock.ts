import type { CuppingFormSchema } from '@/types/new/new_form_schema';
import { categoryTree } from './category_tree';
import { optionsList } from './options_list';

export const NEW_FORM_SCHEMA: CuppingFormSchema = {
  // 필요한거
  // 1. 3뎁스 카테고리
  // 2. 카테고리 강도 평가(낮음, 중간, 높음) + 툴팁
  // 3. 정동평가(1 ~ 10점)
  // 4. 정동평가(서술) <= 이건 평가 이후에 작성 가능

  // TODO : 다국어 지원을 지원한다고 가정했을때, label을 프론트에서 온전히 관리하게 해야할까?
  // label 대신 label_key로 만들어서 관리하게 하면..
  // 아니면 구글 스프레드시트로 사장님이 작성해서 API를 내가 받아 사용해도 됨
  // 사용자 페이지 안만들어도 되고 간편함
  // 사장님이 작성하신 스프레드 시트 API 파일을 내가 받아서 JSON 파일로 변환시켜 I18N을 적용시키는 방법이 좋다고 함

  // 커피 정보 스키마
  basicInfo: {
    // 커피 이름,
    title: {
      inputType: 'dropdown',
      label: '평가할 원두를 선택해주세요!',
      value: '',
      required: true,
      optionList: optionsList.coffeeTitleOptions,
    },
    purpose: {
      inputType: 'dropdown',
      label: '무슨 목적으로 커핑에 참여하시나요?',
      value: '',
      required: false,
      optionList: optionsList.purposeOptions,
    },
  },
  // 평가 스키마
  evaluationList: [
    // 향
    {
      id: 1,
      title: '향',
      label: '커피에서 무슨 향이 나나요?',
      // 연쇄 선택 ui 데이터
      category: {
        inputType: 'cascader',
        required: true,
        cascaderTree: categoryTree.aroma,
      },
      // 카테고리 선택시 동적으로 생성되는 스키마(강도평가, 정동평가)
      detailEvaluation: {
        label: '선택하신 카테고리를 더 자세히 평가해주세요!',
        category_evaluations: [],
      },
    },
    // 맛
    {
      id: 2,
      title: '맛',
      label: '커피에서 어떤 맛이 느껴지시나요?',
      category: {
        inputType: 'cascader',
        required: true,
        cascaderTree: categoryTree.taste,
      },
      detailEvaluation: {
        label: '선택하신 카테고리를 더 자세히 평가해주세요!',
        category_evaluations: [],
      },
    },
    // 산미
    {
      id: 3,
      title: '산미',
      label: '커피에서 산미가 느껴지시나요?',
      category: {
        inputType: 'cascader',
        required: true,
        cascaderTree: categoryTree.acidity,
      },
      detailEvaluation: {
        label: '선택하신 카테고리를 더 자세히 평가해주세요!',
        category_evaluations: [],
      },
    },
    // 단 맛
    {
      id: 4,
      title: '단 맛',
      label: '커피에서 느껴지는 단 맛이 있나요?',
      category: {
        inputType: 'cascader',
        required: true,
        cascaderTree: categoryTree.switness,
      },
      detailEvaluation: {
        label: '선택하신 카테고리를 더 자세히 평가해주세요!',
        category_evaluations: [],
      },
    },
    // 마우스필
    {
      id: 5,
      title: '마우스필',
      label: '커피를 마신 후 느껴지는 여운이 있나요?',
      category: {
        inputType: 'cascader',
        required: true,
        cascaderTree: categoryTree.mouthfeel,
      },
      detailEvaluation: {
        label: '선택하신 카테고리를 더 자세히 평가해주세요!',
        category_evaluations: [],
      },
    },
  ],
};
