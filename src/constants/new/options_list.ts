// 원두, 목적은 사장님이 그때그때 추가하실거니, 따로 API로 관리해야함
// value는 서버에 전송할 값

import type { OptionLists } from '@/types/new/new_form_schema';

// label은 UI로 보여줄 텍스트
export const optionsList: OptionLists = {
  coffeeTitleOptions: [
    { id: 1, label: '에티오피아 예가체프', value: 'ethiopia_yirgacheffe' },
    { id: 2, label: '콜롬비아 수프리모', value: 'colombia_supremo' },
    { id: 3, label: '케냐 AA', value: 'kenya_aa' },
    { id: 4, label: '브라질 산토스', value: 'brazil_santos' },
  ],
  purposeOptions: [
    { id: 1, label: '입문자', value: 'basic' },
    { id: 2, label: '전문가', value: 'expert' },
  ],
};
