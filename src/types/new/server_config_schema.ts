import z from 'zod';

// ============================================
// 서버 Config 스키마 (UI 메타데이터)
// ============================================

/**
 * 공통 옵션
 */
const Option = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

const OptionLists = z.object({
  coffeeTitleOptions: z.array(Option),
  purposeOptions: z.array(Option),
});

/**
 * Input 타입
 */
const InputType = z.enum(['text', 'radio', 'dropdown', 'cascader', 'slider']);

/**
 * 카테고리 이름
 */
const CategoryName = z.enum(['aroma', 'taste', 'acidity', 'sweetness', 'mouthfeel']);

// ============================================
// Cascader 트리 구조 (UI 전용)
// ============================================

/**
 * Cascader 리프 노드 (3depth)
 */
const CategoryLeafNode = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

/**
 * Cascader 중간 노드 (2depth)
 */
const CategorySecondNode = z.object({
  id: z.number(),
  label: z.string(),
  children: z.array(CategoryLeafNode),
});

/**
 * Cascader 루트 노드 (1depth)
 */
const CategoryFirstNode = z.object({
  id: z.number(),
  label: z.string(),
  children: z.array(CategorySecondNode),
});

// ============================================
// Input Config (UI 메타데이터)
// ============================================

/**
 * Select/Dropdown Input 설정
 */
const SelectInputConfig = z.object({
  inputType: z.literal('dropdown'),
  title: z.string().optional(), // 섹션/필드셋 제목 (선택)
  label: z.string(), // 필드 레이블
  placeholder: z.string().optional(), // 입력 힌트
  required: z.boolean(),
  optionList: z.array(Option),
  tooltip: z.string().optional(),
});

/**
 * Radio Input 설정
 */
const RadioInputConfig = z.object({
  inputType: z.literal('radio'),
  title: z.string().optional(), // 섹션/필드셋 제목 (선택)
  label: z.string(), // 필드 레이블
  placeholder: z.string().optional(), // 입력 힌트 (라디오에는 보통 불필요)
  required: z.boolean(),
  optionList: z.array(Option),
  tooltip: z.string().optional(),
});

/**
 * Slider Input 설정
 */
const SliderInputConfig = z.object({
  inputType: z.literal('slider'),
  title: z.string().optional(), // 섹션 제목 (선택)
  label: z.string(), // 필드 레이블
  required: z.boolean(),
  min: z.number(),
  max: z.number(),
  step: z.number().optional().default(1),
  tooltip: z.string().optional(),
});

/**
 * Text Input 설정
 */
const TextInputConfig = z.object({
  inputType: z.literal('text'),
  label: z.string(),
  required: z.boolean(),
  placeholder: z.string().optional(),
  tooltip: z.string().optional(),
});

/**
 * Cascader Input 설정
 */
const CascaderInputConfig = z.object({
  inputType: z.literal('cascader'),
  title: z.string().optional(), // 섹션 제목 (선택)
  label: z.string(), // 필드 레이블
  placeholder: z.string().optional(), // 입력 힌트
  required: z.boolean(),
  cascaderTree: z.array(CategoryFirstNode),
  maxSelection: z.number().optional().default(5),
  tooltip: z.string().optional(),
});

// ============================================
// 평가 항목 Config
// ============================================

/**
 * 카테고리 상세 평가 설정
 */
const DetailEvaluationConfig = z.object({
  title: z.string().optional(), // 섹션 제목 (선택)
  label: z.string(), // 섹션 설명
  // 강도 평가 설정
  intensity: RadioInputConfig,
  // 정동 평가 설정
  affectiveScore: SliderInputConfig,
  // 정동 평가 서술 설정
  affectiveNote: z.object({
    title: z.string().optional(),
    label: z.string(),
    inputType: z.literal('text'),
    placeholder: z.string().optional(),
    tooltip: z.string().optional(),
  }),
});

/**
 * 평가 항목 Config (향, 맛, 산미, 단맛, 마우스필)
 */
const EvaluationConfig = z.object({
  id: z.number(),
  title: z.string(),
  label: z.string(),
  categoryName: CategoryName,
  // Cascader 설정
  category: CascaderInputConfig,
  // 상세 평가 설정
  detailEvaluation: DetailEvaluationConfig,
});

/**
 * 커핑 폼 Config
 */
const CuppingFormConfig = z.object({
  // 기본 정보: 원두 선택 설정
  basicInfo: z.object({
    coffeeSelect: SelectInputConfig,
  }),
  // 평가 항목 설정 목록
  evaluations: z.array(EvaluationConfig),
});

/**
 * 루트 커핑 폼 Config
 */
const RootCuppingFormConfig = z.object({
  // 목적 선택 설정
  purpose: RadioInputConfig,
  // 커핑 폼 설정
  cuppingForm: CuppingFormConfig,
  // 최대 커핑 개수
  maxCuppingCount: z.number().default(15),
});

// ============================================
// 정동 평가 설명 리스트 (UI 전용)
// ============================================

/**
 * 정동 평가 레벨별 설명
 */
const AffectiveExplain = z.object({
  level: z.number(),
  explain: z.string(),
});

const AffectiveExplainList = z.array(AffectiveExplain);

// ============================================
// 타입 export
// ============================================

export type Option = z.infer<typeof Option>;
export type OptionLists = z.infer<typeof OptionLists>;
export type InputType = z.infer<typeof InputType>;
export type CategoryName = z.infer<typeof CategoryName>;

// Cascader 트리
export type CategoryLeafNode = z.infer<typeof CategoryLeafNode>;
export type CategorySecondNode = z.infer<typeof CategorySecondNode>;
export type CategoryFirstNode = z.infer<typeof CategoryFirstNode>;

// Input Config
export type SelectInputConfig = z.infer<typeof SelectInputConfig>;
export type RadioInputConfig = z.infer<typeof RadioInputConfig>;
export type SliderInputConfig = z.infer<typeof SliderInputConfig>;
export type TextInputConfig = z.infer<typeof TextInputConfig>;
export type CascaderInputConfig = z.infer<typeof CascaderInputConfig>;

// Evaluation Config
export type DetailEvaluationConfig = z.infer<typeof DetailEvaluationConfig>;
export type EvaluationConfig = z.infer<typeof EvaluationConfig>;
export type CuppingFormConfig = z.infer<typeof CuppingFormConfig>;
export type RootCuppingFormConfig = z.infer<typeof RootCuppingFormConfig>;

// 정동 평가
export type AffectiveExplain = z.infer<typeof AffectiveExplain>;
export type AffectiveExplainList = z.infer<typeof AffectiveExplainList>;

// 카테고리 트리 타입
export type CategoryTree = {
  aroma: CategoryFirstNode[];
  taste: CategoryFirstNode[];
  acidity: CategoryFirstNode[];
  sweetness: CategoryFirstNode[];
  mouthfeel: CategoryFirstNode[];
};
