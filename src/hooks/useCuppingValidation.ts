import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';

/**
 * 특정 인덱스의 커핑 스키마 유효성 검사 상태를 반환하는 훅
 *
 * @param idx - 검사할 커핑의 인덱스
 * @returns 유효성 검사 상태 및 세부 에러 정보
 *
 * @example
 * ```tsx
 * function CuppingItem({ idx }: { idx: number }) {
 *   const { isValid, hasBasicInfoError, hasEvaluationError } = useCuppingValidation(idx);
 *
 *   return (
 *     <div>
 *       {isValid && <span>✅ 완료</span>}
 *       {hasBasicInfoError && <span>기본 정보 미입력</span>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useCuppingValidation(idx: number) {
  const { formState } = useFormContext<TRootCuppingFormSchema>();

  // 해당 인덱스의 전체 에러 객체 (schemaList[idx] 전체)
  const schemaErrors = useMemo(() => {
    return formState.errors.schemaList?.[idx];
  }, [formState.errors.schemaList, idx]);

  // 전체 유효성 검사 통과 여부
  const isValid = useMemo(() => {
    return !schemaErrors;
  }, [schemaErrors]);

  // basicInfo 필드 에러 여부
  const hasBasicInfoError = useMemo(() => {
    return !!schemaErrors?.basicInfo;
  }, [schemaErrors]);

  // evaluationList 필드 에러 여부
  const hasEvaluationError = useMemo(() => {
    return !!schemaErrors?.evaluationList;
  }, [schemaErrors]);

  // evaluationList의 각 항목별 에러 개수
  const evaluationErrorCount = useMemo(() => {
    if (!schemaErrors?.evaluationList) return 0;

    // evaluationList가 배열 형태의 에러라면 개수 반환
    if (Array.isArray(schemaErrors.evaluationList)) {
      return schemaErrors.evaluationList.filter((item) => item !== undefined).length;
    }

    return 0;
  }, [schemaErrors]);

  return {
    /** 해당 커핑의 모든 유효성 검사 통과 여부 */
    isValid,
    /** 전체 에러 객체 (세부 에러 확인용) */
    schemaErrors,
    /** 기본 정보(원두 선택) 에러 여부 */
    hasBasicInfoError,
    /** 평가 항목 에러 여부 */
    hasEvaluationError,
    /** 평가 항목 중 에러가 있는 개수 */
    evaluationErrorCount,
  };
}