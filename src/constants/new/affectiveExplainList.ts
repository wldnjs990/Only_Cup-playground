import type { AffectiveExplainList } from '@/types/new/new_form_schema';

// 이건 프론트에서 관리하는 데이터(서버에서 받지 말자)

export const affectiveExplainList: AffectiveExplainList = [
  {
    colorClass: 'text-[#D32F2F]', // 강한 빨강
    bgClass: 'bg-[#D32F2F]',
    explain: '향미나 느낌 자체가 불편하게 느껴지는 수준입니다.',
  },
  {
    colorClass: 'text-[#E64A19]', // 빨강-주황
    bgClass: 'bg-[#E64A19]', // 빨강-주황
    explain: '가능하면 피하고 싶은 정도입니다.',
  },
  {
    colorClass: 'text-[#F57C00]', // 진한 주황
    bgClass: 'bg-[#F57C00]', // 진한 주황
    explain: '뚜렷하게 맞지 않는 부분이 느껴집니다.',
  },
  {
    colorClass: 'text-[#FFA000]', // 주황-노랑
    bgClass: 'bg-[#FFA000]', // 주황-노랑
    explain: '큰 불만은 없지만 굳이 찾지는 않을 수준입니다.',
  },
  {
    colorClass: 'text-[#FBC02D]', // 따뜻한 노랑
    bgClass: 'bg-[#FBC02D]', // 따뜻한 노랑
    explain: '무난하나 특별한 매력은 느껴지지 않습니다.',
  },
  {
    colorClass: 'text-[#FDD835]', // 중립 노랑
    bgClass: 'bg-[#FDD835]', // 중립 노랑
    explain: '좋지도 나쁘지도 않은 무난한 선호도입니다.',
  },
  {
    colorClass: 'text-[#C0CA33]', // 노랑-연두
    bgClass: 'bg-[#C0CA33]', // 노랑-연두
    explain: '상황에 따라 충분히 선택할 만한 수준입니다.',
  },
  {
    colorClass: 'text-[#7CB342]', // 연두
    bgClass: 'bg-[#7CB342]', // 연두
    explain: '긍정적인 인상이 더 강하게 느껴지는 단계입니다.',
  },
  {
    colorClass: 'text-[#388E3C]', // 진한 초록
    bgClass: 'bg-[#388E3C]', // 진한 초록
    explain: '개인적으로 강한 만족감을 느끼는 편입니다.',
  },
  {
    colorClass: 'text-[#2E7D32]', // 깊은 초록
    bgClass: 'bg-[#2E7D32]', // 깊은 초록
    explain: '적극적으로 찾고 즐길 정도의 강한 호감입니다.',
  },
];
