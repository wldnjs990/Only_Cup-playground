import { create } from 'zustand';

interface UseNewFormStore {
  // 폼 단계
  step: number;
  nextstep: () => void;
  prevstep: () => void;
  // 커핑 갯수
  cuppingCount: number;
  increaseCuppingCount: () => void;
  decreaseCuppingCount: () => void;
}

// 폼 단계 최대, 최소 상수
const MAX_STEP = 2;
const MIN_STEP = 1;

// 커핑 최대, 최소 상수
const MAX_CUPPING_COUNT = 15;
const MIN_CUPPING_COUNT = 1;

const useNewFormStore = create<UseNewFormStore>((set) => ({
  // 폼 단계
  step: 1,
  nextstep: () =>
    set((state) => ({
      step: Math.min(state.step + 1, MAX_STEP),
    })),
  prevstep: () =>
    set((state) => ({
      step: Math.max(state.step - 1, MIN_STEP),
    })),

  // 커핑 갯수
  cuppingCount: 1,
  increaseCuppingCount: () =>
    set((state) => ({
      cuppingCount: Math.min(state.cuppingCount + 1, MAX_CUPPING_COUNT),
    })),
  decreaseCuppingCount: () =>
    set((state) => ({
      cuppingCount: Math.max(state.cuppingCount - 1, MIN_CUPPING_COUNT),
    })),
}));

export default useNewFormStore;
