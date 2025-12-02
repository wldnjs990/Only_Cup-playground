import { zodResolver } from '@hookform/resolvers/zod';
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

const SelectInput = z.object({
  inputType: InputType,
  label: z.string(),
  value: z.string().refine((val) => val !== '', { error: '선택되지 않았어요!' }),
  selectedName: z.string(),
  required: z.boolean(),
  optionList: z.array(Option),
});

const TextInput = z.object({
  inputType: InputType,
  label: z.string(),
  value: z.string(),
  required: z.boolean(),
  optionList: z.array(Option),
});

// 기본 정보
const BasicInfo = z.object({
  title: SelectInput,
  purpose: TextInput,
});

// 카테고리
const CategoryLeafNode = z.object({
  id: z.number(),
  selected: z.boolean(),
  label: z.string(),
  value: z.string(),
});

const CategorySecondNode = z.object({
  id: z.number(),
  selected: z.boolean(),
  label: z.string(),
  children: z.array(CategoryLeafNode),
});

const CategoryFirstNode = z.object({
  id: z.number(),
  selected: z.boolean(),
  label: z.string(),
  children: z.array(CategorySecondNode),
});

const CategoryName = z.enum(['aroma', 'taste', 'acidity', 'switness', 'mouthfeel']);

const Category = z.object({
  inputType: InputType,
  name: CategoryName,
  label: z.string(),
  required: z.boolean(),
  cascaderTree: z.array(CategoryFirstNode),
  // cascader 결과 담는 배열
  valueList: z.array(z.string()),
});

// 상세평가
// 카테고리 상세 평가

// 강도 평가 옵션
const IntensityOption = z.object({
  label: z.enum(['낮음', '중간', '높음']),
  value: z.string(),
});

const IntensityOptionList = z.array(IntensityOption);

// 강도 평가
const Intensity = z.object({
  title: z.string(),
  inputType: InputType,
  required: z.boolean(),
  value: z.string(),
  optionList: IntensityOptionList,
  tooltip: z.string(),
});

const AffectiveExplain = z.object({
  color: z.string(),
  explain: z.string(),
});

const AffectiveExplainList = z.array(AffectiveExplain);

// 정동 평가
const AffectiveScore = z.object({
  title: z.string(),
  inputType: InputType,
  required: z.boolean(),
  tooltip: z.string(),
  explainList: AffectiveExplainList,
  value: z.number(),
  min: z.number(),
  max: z.number(),
});
// 정동평가(서술)
const AffectiveNote = z.object({
  title: z.string(),
  inputType: InputType,
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

const CategoryEvaluationList = z.array(CategoryEvaluations);

const DetailEvaluation = z.object({
  label: z.string(),
  // 카테고리 상세 평가
  categoryEvaluationList: CategoryEvaluationList,
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

// 루트 스키마
const RootCuppingFormSchema = z.object({
  root: z.array(CuppingFormSchema),
});

// 타입 export --------------------------------------------------------------------------------------

// RHF 상속 스키마
export type TRootCuppingFormSchema = z.infer<typeof RootCuppingFormSchema>;
export type TCuppingFormSchema = z.infer<typeof CuppingFormSchema>;
// zod validation용 resolver 스키마
export const RootCuppingFormSchemaZodResolver = zodResolver(RootCuppingFormSchema);

// select 전용 타입
export type SelectInput = z.infer<typeof SelectInput>;

// text 전용 타입
export type TextInput = z.infer<typeof TextInput>;

// select 옵선들 전용 타입
export type OptionLists = z.infer<typeof OptionLists>;

// evaluation 전용 타입
export type Evaluation = z.infer<typeof Evaluation>;

// 카테고리 cascader 전용 타입
export type Category = z.infer<typeof Category>;

// 카테고리 트리 데이터 전용 타입
const CategoryTree = z.object({
  aroma: z.array(CategoryFirstNode),
  taste: z.array(CategoryFirstNode),
  acidity: z.array(CategoryFirstNode),
  switness: z.array(CategoryFirstNode),
  mouthfeel: z.array(CategoryFirstNode),
});

export type CategoryTree = z.infer<typeof CategoryTree>;
export type CategoryFirstNode = z.infer<typeof CategoryFirstNode>;
export type CategorySecondNode = z.infer<typeof CategorySecondNode>;
export type CategoryLeafNode = z.infer<typeof CategoryLeafNode>;

export type CategoryName = z.infer<typeof CategoryName>;

export type CategoryEvaluations = z.infer<typeof CategoryEvaluations>;

export type AffectiveExplainList = z.infer<typeof AffectiveExplainList>;
