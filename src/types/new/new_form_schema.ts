import z from 'zod';

// 공용 타입
const InputType = z.enum(['text', 'radio', 'dropdown', 'cascader', 'slider']);

// 커핑 옵션
const Option = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

const OptionLists = z.object({
  coffeeTitleOptions: z.array(Option),
  purposeOptions: z.array(Option),
});

// 기본 정보
const BasicInfo = z.object({
  title: z.object({
    inputType: InputType,
    label: z.string(),
    value: z.string(),
    required: z.boolean(),
    optionList: z.array(Option),
  }),
  purpose: z.object({
    inputType: InputType,
    label: z.string(),
    value: z.string(),
    required: z.boolean(),
    optionList: z.array(Option),
  }),
});

// 카테고리
const CategoryThirdNode = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
});

const CategorySecondNode = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
  children: z.array(CategoryThirdNode),
});

const CategoryFirstNode = z.object({
  id: z.number(),
  label: z.string(),
  value: z.string(),
  children: z.array(CategorySecondNode),
});

const CategoryTree = z.object({
  aroma: z.array(CategoryFirstNode),
  taste: z.array(CategoryFirstNode),
  acidity: z.array(CategoryFirstNode),
  switness: z.array(CategoryFirstNode),
  mouthfeel: z.array(CategoryFirstNode),
});

const Category = z.object({
  inputType: InputType,
  required: z.boolean(),
  cascaderTree: CategoryTree,
});

// 상세평가
// 카테고리 상세 평가

// 강도 평가
const Intensity = z.object({
  title: z.string(),
  type: InputType,
  required: z.boolean(),
  value: z.number(),
  label: z.enum(['낮음', '중간', '높음']),
  tooltip: z.string(),
});
// 정동 평가
const AffectiveScore = z.object({
  title: z.string(),
  type: InputType,
  required: z.boolean(),
  tooltip: z.string(),
  value: z.number(),
  min: z.number(),
  max: z.number(),
});
// 정동평가(서술)
const AffectiveNote = z.object({
  title: z.string(),
  type: InputType,
  required: z.boolean(),
  tooltip: z.string(),
  value: z.string(),
});

const CategoryEvaluations = z.object({
  title: z.string(),
  value: z.string(),
  // 강도 평가
  intensity: Intensity,
  // 정동 평가
  affectiveScore: AffectiveScore,
  // 정동평가(서술)
  affectiveNote: AffectiveNote,
});

const DetailEvaluation = z.object({
  label: z.string(),
  // 카테고리 상세 평가
  category_evaluations: z.array(CategoryEvaluations),
});

// 평가
const Evaluation = z.object({
  id: z.number(),
  title: z.string(),
  label: z.string(),
  // 카테고리
  category: Category,
  // 상세평가
  detailEvaluation: DetailEvaluation,
});

// 루트 스키마
const CuppingFormSchema = z.object({
  // 기본 정보
  basicInfo: BasicInfo,
  // 평가
  evaluationList: z.array(Evaluation),
});

export type CuppingFormSchema = z.infer<typeof CuppingFormSchema>;
export type OptionLists = z.infer<typeof OptionLists>;
export type CategoryTree = z.infer<typeof CategoryTree>;
