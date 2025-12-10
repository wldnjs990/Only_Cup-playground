import type { CategoryEvaluations } from '@/types/new/new_form_schema';

const createDetailEvaluations = (category: string, categoryName: string) => {
  const detailEvaluations: CategoryEvaluations = {
    // 선택한 카테고리 이름
    title: categoryName,
    value: category,
    // 강도 평가
    intensity: {
      title: '강도(Intensity)',
      inputType: 'radio',
      required: false,
      value: 'mid',
      optionList: [
        // shadCn의 radio-group은 value를 문자열만 취급함
        { id: 1, label: '낮음', value: 'low' },
        { id: 2, label: '중간', value: 'mid' },
        { id: 3, label: '높음', value: 'high' },
      ],
      tooltip: '선택하신 카테고리가 감각적으로 얼마나 뚜렷하고 강하게 느껴지는지를 평가해주세요.',
    },
    // 정동 평가
    affectiveScore: {
      title: '개인 점수',
      inputType: 'slider',
      required: false,
      tooltip: '선택하신 카테고리에 대한 개인적인 선호도를 평가해주세요.',
      value: 5,
      min: 1,
      max: 10,
    },
    // 정동 평가(서술)
    // 평가 다 끝나고 추가 가능한데, 일단 만들어놓기만
    affectiveNote: {
      title: '세부 묘사',
      inputType: 'text',
      required: false,
      tooltip: '선택하신 카테고리의 세부적인 느낌을 적는 공간압니다.',
      value: '',
    },
  };

  return detailEvaluations;
};

export default createDetailEvaluations;
