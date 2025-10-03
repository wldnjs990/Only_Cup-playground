// src/hooks/useFormResult.ts (or a dedicated types file)

// 제네릭 + 재귀를 활용한 동적 enum값
// A['length'] : 배열 A의 현재 길이 (ex. [1, 2] == 2)
// A[number] : 배열 안 요소들을 유니온 타입으로 변환 (ex. [1, 2]면 1 | 2
type Range0ToN<N extends number, A extends number[] = [1]> =
  // 시작 A의 길이는 1
  // N을 달성 못했을 경우 A애 현재 A의 길이를 담아서 다음으로 이동
  // 삼항연산자로 A의 길이가 목표길이 N을 당성했으면 A[number]로 유니온 타입 변환
  A['length'] extends N ? A[number] | N : Range0ToN<N, [...A, A['length']]>;

// 공통 타입 식별자
export type InputType = 'text' | 'textarea' | 'multi_select' | 'slider';

// ---------- SCA 기본 정보 ----------
export type TextField = {
  type: 'text';
  label: string;
  value: string;
};

export type ScaInfoSchema = {
  title: string;
  name: TextField;
  purpose: TextField;
  created_at: string; // 이미 포맷된 문자열 FORMATTED 사용
  sample_no: TextField;
};

// ---------- 슬라이더 ----------
export type SliderField = {
  id: number;
  sort: number;
  type: 'slider';
  label: string;
  range: N;
  selected: Range0ToN<N>;
};

// 싱글 선택(= 슬라이더 목록)
export type SchemaSingleSelectionItem = SliderField;

// ---------- 멀티 셀렉트(트리 지원) ----------
export type SelectionItemSchema = {
  id: number;
  parentId: number | null; // null이면 최상위
  label: string;
  selected: boolean;
  sort?: number; // 일부 섹션에는 sort가 있음
};

export type MultipleSelectionSchema = {
  id: number;
  sort: number;
  type: 'multi_select';
  title: string;
  limit: number | null;
  items: SelectionItemSchema[];
};

// ---------- 정서적 평가(affective_assessment) ----------
export type TextareaField = {
  type: 'textarea';
  placeholder: string;
  comment: string;
};

export type AffectiveAssessmentSchema = {
  title: string;
  explanation: string;
  tooltips: string[]; // 9단계 라벨 등
  assessments: SliderField[]; // 각 항목은 슬라이더
  comment: TextareaField; // 자유 텍스트 코멘트
};

// ---------- 평가 섹션 ----------
export type EvaluationSchemaSection = {
  id: number;
  title: string;
  explanation: string;
  single_selections: SchemaSingleSelectionItem[];
  multiple_selections: MultipleSelectionSchema[];
  affective_assessment: AffectiveAssessmentSchema;
};

// ---------- 총평(total_evaluation) ----------
export type CoffeeDefectSchema = {
  id: number;
  title: string;
  type: 'multi_select';
  limit: number | null; // 스키마에선 null
  items: SelectionItemSchema[];
};

export type TotalEvaluationSchema = {
  extrinsic_attributes_comment: TextareaField; // 추가 코멘트
  affective_assessment: AffectiveAssessmentSchema;
  cup_defect_items: SliderField[]; // min/max 0~5 사용
  coffee_defect: CoffeeDefectSchema;
};

// ---------- 루트 ----------
export type EvaluationRootSchema = {
  version: number;
  sca_info: ScaInfoSchema;
  evaluation_schemas: EvaluationSchemaSection[];
  total_evaluation: TotalEvaluationSchema;
};
