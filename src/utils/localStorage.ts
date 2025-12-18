import type { RootCuppingFormValue } from '@/types/new/form_values_schema';

const STORAGE_KEY = 'cupping_evaluations';

export interface SavedCuppingData extends RootCuppingFormValue {
  id: string;
  createdAt: string;
}

/**
 * 로컬 스토리지에서 모든 커핑 평가 목록을 가져옵니다.
 */
export function getAllCuppings(): SavedCuppingData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('커핑 목록 조회 실패:', error);
    return [];
  }
}

/**
 * ID로 특정 커핑 평가를 조회합니다.
 */
export function getCuppingById(id: string): SavedCuppingData | null {
  try {
    const cuppings = getAllCuppings();
    return cuppings.find((cupping) => cupping.id === id) ?? null;
  } catch (error) {
    console.error('커핑 조회 실패:', error);
    return null;
  }
}

/**
 * 새로운 커핑 평가를 저장합니다.
 */
export function saveCupping(data: RootCuppingFormValue): SavedCuppingData {
  try {
    const cuppingId = `cupping_${Date.now()}`;

    const savedData: SavedCuppingData = {
      id: cuppingId,
      createdAt: new Date().toISOString(),
      ...data,
    };

    const cuppings = getAllCuppings();
    cuppings.push(savedData);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cuppings));

    return savedData;
  } catch (error) {
    console.error('커핑 저장 실패:', error);
    throw new Error('저장에 실패했습니다.');
  }
}

/**
 * 특정 커핑 평가를 업데이트합니다.
 */
export function updateCupping(id: string, data: Partial<RootCuppingFormValue>): SavedCuppingData | null {
  try {
    const cuppings = getAllCuppings();
    const index = cuppings.findIndex((cupping) => cupping.id === id);

    if (index === -1) {
      console.error('커핑을 찾을 수 없습니다:', id);
      return null;
    }

    cuppings[index] = {
      ...cuppings[index],
      ...data,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cuppings));

    return cuppings[index];
  } catch (error) {
    console.error('커핑 업데이트 실패:', error);
    return null;
  }
}

/**
 * 특정 커핑 평가를 삭제합니다.
 */
export function deleteCupping(id: string): boolean {
  try {
    const cuppings = getAllCuppings();
    const filtered = cuppings.filter((cupping) => cupping.id !== id);

    if (filtered.length === cuppings.length) {
      console.warn('삭제할 커핑을 찾을 수 없습니다:', id);
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('커핑 삭제 실패:', error);
    return false;
  }
}

/**
 * 모든 커핑 평가를 삭제합니다.
 */
export function clearAllCuppings(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('전체 삭제 실패:', error);
  }
}
