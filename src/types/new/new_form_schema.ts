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

const Category = z.object({
  inputType: InputType,
  required: z.boolean(),
  cascaderTree: z.array(CategoryFirstNode),
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
  inputType: InputType,
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

// 루트 스키마
const RootCuppingFormSchema = z.object({
  root: z.array(CuppingFormSchema),
});

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
export type Evaluation = z.infer<typeof Evaluation>

// 카테고리 트리 데이터 전용 타입
const CategoryTree = z.object({
  aroma: z.array(CategoryFirstNode),
  taste: z.array(CategoryFirstNode),
  acidity: z.array(CategoryFirstNode),
  switness: z.array(CategoryFirstNode),
  mouthfeel: z.array(CategoryFirstNode),
});
export type CategoryTree = z.infer<typeof CategoryTree>;
