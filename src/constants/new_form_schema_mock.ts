import { id } from 'zod/v4/locales';
import { FORMATTED as FORMATED_DATE } from './now_date';

// 원두, 목적은 사장님이 그때그때 추가하실거니, 따로 API로 관리해야함
// value는 서버에 전송할 값
// label은 UI로 보여줄 텍스트
const optionsList = {
  coffeeTitleOptions: [
    { id: 1, label: '에티오피아 예가체프', value: 'ethiopia_yirgacheffe' },
    { id: 2, label: '콜롬비아 수프리모', value: 'colombia_supremo' },
    { id: 3, label: '케냐 AA', value: 'kenya_aa' },
    { id: 4, label: '브라질 산토스', value: 'brazil_santos' },
  ],
  purposeOptions: [
    { id: 1, label: '커핑 입문', value: 'basic' },
    { id: 2, label: '전문 커피 감별', value: 'expert' },
  ],
};

// cascaderTree
const cascaderTree = [
  {
    id: 1,
    label: '꽃',
    children: [
      {
        id: 1,
        label: '흰 꽃',
        children: [
          { id: 1, label: '자스민', value: 'aroma_floral_white_jasmine' },
          { id: 2, label: '백합', value: 'aroma_floral_white_lily' },
          { id: 3, label: '박하', value: 'aroma_floral_white_mint' },
          { id: 4, label: '민들레', value: 'aroma_floral_white_dandelion' },
          { id: 5, label: '동백', value: 'aroma_floral_white_camellia' },
        ],
      },
      {
        id: 2,
        label: '장미',
        children: [
          { id: 1, label: '샤리파 아스마', value: 'aroma_floral_white_jasmine' },
          { id: 2, label: '포시즌스', value: 'aroma_floral_white_lily' },
          { id: 3, label: '박하', value: 'aroma_floral_white_mint' },
          { id: 4, label: '민들레', value: 'aroma_floral_white_dandelion' },
          { id: 5, label: '동백', value: 'aroma_floral_white_camellia' },
        ],
      },
      {
        id: 3,
        label: '화이트 플라워',
        children: [
          { id: 1, label: '자스민', value: 'aroma_floral_white_jasmine' },
          { id: 2, label: '백합', value: 'aroma_floral_white_lily' },
          { id: 3, label: '박하', value: 'aroma_floral_white_mint' },
          { id: 4, label: '민들레', value: 'aroma_floral_white_dandelion' },
          { id: 5, label: '동백', value: 'aroma_floral_white_camellia' },
        ],
      },
      {
        id: 4,
        label: '화이트 플라워',
        children: [
          { id: 1, label: '자스민', value: 'aroma_floral_white_jasmine' },
          { id: 2, label: '백합', value: 'aroma_floral_white_lily' },
          { id: 3, label: '박하', value: 'aroma_floral_white_mint' },
          { id: 4, label: '민들레', value: 'aroma_floral_white_dandelion' },
          { id: 5, label: '동백', value: 'aroma_floral_white_camellia' },
        ],
      },
      {
        id: 5,
        label: '화이트 플라워',
        children: [
          { id: 1, label: '자스민', value: 'aroma_floral_white_jasmine' },
          { id: 2, label: '백합', value: 'aroma_floral_white_lily' },
          { id: 3, label: '박하', value: 'aroma_floral_white_mint' },
          { id: 4, label: '민들레', value: 'aroma_floral_white_dandelion' },
          { id: 5, label: '동백', value: 'aroma_floral_white_camellia' },
        ],
      },
    ],
  },
];

export const NEW_FORM_SCHEMA = {
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
      type: 'dropdown',
      label: '평가할 원두를 선택해주세요!',
      value: '',
      required: true,
      options: optionsList.coffeeTitleOptions,
    },
    purpose: {
      type: 'dropdown',
      label: '무슨 목적으로 커핑에 참여하시나요?',
      value: '',
      required: false,
      options: optionsList.purposeOptions,
    },
    createdAt: FORMATED_DATE,
  },
  // 평가 스키마
  evaluations: [
    // 향
    {
      id: 1,
      title: '향',
      label: '커피를 음미했을때 느껴지는 향을 알려주세요.',
      // 연쇄 선택 ui 데이터
      category: {
        type: 'cascader',
        cascaderTree: cascaderTree,
      },
    },
    // 맛
    {},
    // 산미
    {},
    // 단 맛
    {},
    // 마우스필
    {},
  ],
};
