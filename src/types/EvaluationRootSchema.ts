import * as z from 'zod';
// zod 스키마 만들기

// BasicInfo
const BasicInfo = z.object({
  title: z.string(),
  name: makeTextSchema('이름을 입력해주세요.'),
  purpose: makeTextSchema('커핑 목적을 입력해주세요.'),
  created_at: z.date(),
  sample_no: makeTextSchema('샘플 번호를 입력해주세요.'),
});

// AffectiveAssessmentSchema
const AffectiveAssessmentSchema = z.object({
  title: z.string(),
  explanation: z.string(),
  tooltips: z.array(z.string()),
  accessments: makeSingleSelection(1, 9),
  comment: makeTextAreaSchema(),
});

// MainEvaluations
const MainEvaluations = z.object({
  id: z.number(),
  title: z.string(),
  explanation: z.string(),
  single_selections: z.array(makeSingleSelection(1, 3)),
  multiple_selections: z.array(makeMultipleSelectionSchema(3)),
  affective_assessment: AffectiveAssessmentSchema,
});

// ExtrinsicAttributes
// TODO : 이거 s 붙일 필요 없어보임
const ExtrinsicAttributesSchema = z.object({
  comment: z.string().max(100, '100자 이하로 작성해주세요.'),
});

// CupSchema
const CupSchema = z.object({
  id: z.number(),
  title: z.string(),
  explanation: z.string(),
  single_selections: z.array(makeSingleSelection(0, 5)),
});

// CoffeeSchema
const CoffeeSchema = z.object({
  id: z.number(),
  title: z.string(),
  explanation: z.string(),
  multiple_selections: makeMultipleSelectionSchema(),
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
  main_evaluations: MainEvaluations,
  total_evaluation: TotalEvaluationSchema,
});

// SingleSelection 동적 생성
function makeSingleSelection(min: number, max: number) {
  const SingleSelection = z.object({
    id: z.number(),
    type: z.literal('slider'),
    label: z.string(),
    range: z.literal(max),
    selected: z.number().min(min).max(max),
  });
  return SingleSelection;
}

// SelectionItemSchema
const SelectionItemSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),
  label: z.string(),
  checked: z.boolean(),
});

// MultipleSelectionSchema 동적 생성
function makeMultipleSelectionSchema(limit: number = 0) {
  const MultipleSelectionSchema = z.object({
    id: z.number(),
    type: z.literal('multi_select'),
    title: z.string(),
    limit: limit > 0 ? z.literal(null) : z.literal(limit),
    now_checked: limit > 0 ? z.literal(null) : z.number().min(0).max(limit),
    items: SelectionItemSchema,
  });
  return MultipleSelectionSchema;
}

// TextAreaSchema 동적 생성
function makeTextAreaSchema() {
  const TextAreaSchema = z.object({
    type: z.literal('textarea'),
    placeholder: z.string(),
    value: z.string().max(100, '100자 이하로 작성해주세요.'),
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
