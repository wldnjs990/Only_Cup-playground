// 원두, 목적은 사장님이 그때그때 추가하실거니, 따로 API로 관리해야함
// value는 서버에 전송할 값
// label은 UI로 보여줄 텍스트
export const optionsList = {
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
