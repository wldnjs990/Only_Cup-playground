import * as z from 'zod';
// zod 스키마 만들기

// MultipleSelectionSchema 동적 생성
function makeMultipleSelectionSchema(limit: number = 0) {
  const MultipleSelectionSchema = z.object({
    id: z.number(),
    sort: z.number().optional(),
    type: z.literal('multi_select'),
    title: z.string(),
    limit: limit > 0 ? z.literal(null) : z.literal(limit),
    now_checked: limit > 0 ? z.literal(null) : z.number().min(0).max(limit),
    items: z.array(SelectionItemSchema),
  });
  return MultipleSelectionSchema;
}

const MainEvaluationMultipleSelectionSchema = makeMultipleSelectionSchema(3);
const CupSchemaMultipleSelectionSchema = makeMultipleSelectionSchema();

// TextAreaSchema 동적 생성
// 나중에 텍스트 제한 따로 필요할 경우 동적으로 추가하기
function makeTextAreaSchema() {
  const TextAreaSchema = z.object({
    type: z.literal('textarea'),
    placeholder: z.string().default('100자 이내로 작성해주세요.'),
    value: z.string().max(100, '100자 이내로 작성해주세요.'),
  });
  return TextAreaSchema;
}

// TextSchema 동적 생성
function makeTextSchema(label: string) {
  const TextSchema = z.object({
    type: z.literal('text'),
    label: z.string(),
    value: z.string().trim().min(1, label),
  });
  return TextSchema;
}

const NameTextSchema = makeTextSchema('이름을 입력해주세요.');
const PurposeTextSchema = makeTextSchema('커핑 목적을 입력해주세요.');
const SampleNoTextSchema = makeTextSchema('샘플 번호를 입력해주세요.');

// SlideSelection 동적 생성
function makeSlideSelection(min: number, max: number) {
  const SlideSelection = z.object({
    id: z.number(),
    sort: z.number().optional(),
    type: z.literal('slider'),
    label: z.string(),
    range: z.literal(max),
    selected: z.number().min(min).max(max),
  });
  return SlideSelection;
}

const AffectiveAssessmentSlideSelection = makeSlideSelection(1, 9);
const MainEvaluationsSlideSelection = makeSlideSelection(1, 3);
const CupSchemaSlideSelection = makeSlideSelection(0, 5);

// BasicInfo
const BasicInfo = z.object({
  title: z.string(),
  name: NameTextSchema,
  purpose: PurposeTextSchema,
  created_at: z.iso.date(), // ISO 날짜 문자열(YYYY-MM-DD)는 iso 객체에서 구할 수 있음
  sample_no: SampleNoTextSchema,
});

// AffectiveAssessmentSchema
const AffectiveAssessmentSchema = z.object({
  title: z.string(),
  explanation: z.string(),
  tooltips: z.array(z.string()),
  assessments: z.array(AffectiveAssessmentSlideSelection),
  comment: makeTextAreaSchema(),
});

// MainEvaluations
const MainEvaluations = z.object({
  id: z.number(),
  sort: z.number().optional(),
  title: z.string(),
  explanation: z.string(),
  single_selections: z.array(MainEvaluationsSlideSelection),
  multiple_selections: z.array(MainEvaluationMultipleSelectionSchema),
  affective_assessment: AffectiveAssessmentSchema,
});

// ExtrinsicAttributes
// TODO : 이거 s 붙일 필요 없어보임
const ExtrinsicAttributesSchema = z.object({
  comment: makeTextAreaSchema(),
});

// CupSchema
const CupSchema = z.object({
  id: z.number(),
  title: z.string(),
  explanation: z.string(),
  single_selections: z.array(CupSchemaSlideSelection),
});

// CoffeeSchema
const CoffeeSchema = z.object({
  id: z.number(),
  title: z.string(),
  explanation: z.string(),
  multiple_selections: z.array(CupSchemaMultipleSelectionSchema),
});

// DefectSchema
const DefectSchema = z.object({
  cup: CupSchema,
  coffee: CoffeeSchema,
});

// TotalEvaluationSchema
const TotalEvaluationSchema = z.object({
  title: z.string(),
  extrinsic_attributes: ExtrinsicAttributesSchema,
  affective_assessment: AffectiveAssessmentSchema,
  defect: DefectSchema,
});

// EvaluationRootSchema
const EvaluationRootSchema = z.object({
  version: z.number(),
  basic_info: BasicInfo,
  main_evaluations: z.array(MainEvaluations),
  total_evaluation: TotalEvaluationSchema,
});

// SelectionItemSchema
const SelectionItemSchema = z.object({
  id: z.number(),
  sort: z.number().optional(),
  parentId: z.number().nullable(),
  label: z.string(),
  checked: z.boolean(),
});

// 평가 루트 스키마
export type EvaluationRootSchema = z.infer<typeof EvaluationRootSchema>;
