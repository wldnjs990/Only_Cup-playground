type InputType = 'text' | 'textarea' | 'multi_select';

interface EvaluationSchemaRoot {
  version: number;
  sca_info: ScaInfoSchema;
  evaluation_schemas: EvaluationSchema[];
  total_evaluation: TotalEvaluationSchema;
}

interface ScaInfoSchema {
  name: string;
  purpose: string;
  created_at: string;
  sample_no: string;
}

interface EvaluationSchema {
  id: number;
  explanation: string;
  single_selections: SingleSelectionSchema[];
  multiple_selections: MultipleSelectionSchema[];
  affective_assessments: AffectiveAssessmentsSchema[];
  affective_comment: string;
}

interface TotalEvaluationSchema {
  extrinsic_attributes_comment: string;
  affective_assessments_title: string;
  affective_assessments: AffectiveAssessmentsSchema[];
  affective_comment: string;
  cup_defect_items: CupDefectItemsSchema[];
  coffee_defect_title: string;
  coffee_defect_items: SelectionItemSchema[];
}

// 제네릭 + 재귀를 활용한 동적 enum값
// A['length'] : 배열 A의 현재 길이 (ex. [1, 2] == 2)
// A[number] : 배열 안 요소들을 유니온 타입으로 변환 (ex. [1, 2]면 1 | 2
type Range0ToN<N extends number, A extends number[] = [1]> =
  // 시작 A의 길이는 1
  // N을 달성 못했을 경우 A애 현재 A의 길이를 담아서 다음으로 이동
  // 삼항연산자로 A의 길이가 목표길이 N을 당성했으면 A[number]로 유니온 타입 변환
  A['length'] extends N ? A[number] | N : Range0ToN<N, [...A, A['length']]>;

// 길이 제한값을 제네릭으로 공통으로 관리해 유니온 타입도 자동으로 맞춰지는 함수형태로 설계
type SingleSelectionSchemaSet<N extends number> = {
  id: number;
  label: string;
  range: number;
  selected: Range0ToN<N>;
};

type AffectiveAssessmentsSchemaSet<N extends number> = {
  id: number;
  range: N;
  selected: Range0ToN<N>;
};

type CupDefectItemsSchemaSet<N extends number> = {
  id: number;
  defect_name: string;
  range: N;
  selected: Range0ToN<N>;
};

interface SingleSelectionSchema extends SingleSelectionSchemaSet<3> {}

interface AffectiveAssessmentsSchema extends AffectiveAssessmentsSchemaSet<9> {}

interface CupDefectItemsSchema extends CupDefectItemsSchemaSet<5> {}

interface MultipleSelectionSchema {
  id: number;
  title: string; // 그룹 제목 ("해당되는 기술어")
  limit: number | null; // 선택 제한 (ex. 5개)
  items: SelectionItemSchema[]; // 라벨 아이템 배열
}

interface SelectionItemSchema {
  id: number;
  parentId: number | null; // null이면 최상위 카테고리
  label: string;
  selected: boolean; // 선택 여부
}

interface TreeSelectionItemSchema extends SelectionItem {
  childrens: SelectionItemSchema[];
}
