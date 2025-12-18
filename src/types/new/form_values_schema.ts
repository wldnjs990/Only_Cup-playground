import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues } from 'react-hook-form';
import z from 'zod';

// ============================================
// RHF 폼 값 스키마 (사용자 입력 데이터만)
// ============================================

/**
 * 카테고리 이름 enum
 */
const CategoryName = z.enum(['aroma', 'taste', 'acidity', 'sweetness', 'mouthfeel']);

/**
 * 카테고리 상세 평가 값
 * - 사용자가 선택한 각 카테고리에 대한 평가 데이터
 */
const CategoryDetailValue = z.object({
  categoryValue: z.string(), // 선택한 카테고리 값 (예: "sweet", "chocolate")
  intensity: z.string().min(1, '강도를 선택해주세요'),
  affectiveScore: z.number().min(0).max(9),
  affectiveNote: z.string().optional().default(''),
});

/**
 * 평가 항목 값 (향, 맛, 산미, 단맛, 마우스필)
 */
const EvaluationValue = z.object({
  categoryName: CategoryName,
  // 선택된 카테고리 목록
  selectedCategories: z.array(z.string()).min(1, '최소 1개 이상 선택해주세요'),
  // 각 카테고리에 대한 상세 평가
  details: z.array(CategoryDetailValue),
});

/**
 * 단일 커핑 폼 값
 */
const CuppingFormValue = z.object({
  // 기본 정보: 선택한 커피 ID
  coffeeId: z.string().min(1, '원두를 선택해주세요'),

  // 평가 목록 (향, 맛, 산미, 단맛, 마우스필)
  evaluations: z.array(EvaluationValue),
});

/**
 * 루트 커핑 폼 값 (최대 15개까지 동적 추가 가능)
 */
const RootCuppingFormValue = z.object({
  // 커핑 목적
  purposeValue: z.string().min(1, '목적을 선택해주세요'),

  // 커핑 목록 (최대 15개)
  cuppings: z.array(CuppingFormValue).max(15, '최대 15개까지 추가 가능합니다'),
});

// ============================================
// 타입 export
// ============================================

export type CategoryName = z.infer<typeof CategoryName>;
export type CategoryDetailValue = z.infer<typeof CategoryDetailValue>;
export type EvaluationValue = z.infer<typeof EvaluationValue>;
export type CuppingFormValue = z.infer<typeof CuppingFormValue>;
export type RootCuppingFormValue = z.infer<typeof RootCuppingFormValue>;

// Field type
export interface RHFRootCuppingFormSchema extends FieldValues, RootCuppingFormValue {}
// RHF resolver
export const RootCuppingFormValueResolver = zodResolver(RootCuppingFormValue);
