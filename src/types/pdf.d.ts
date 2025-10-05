// TODO : range타입 enum으로 바꾸고, 연관된 코드들 리팩토링 하기

interface EvaluationRoot {
  version: number;
  sca_info: ScaInfo;
  evaluation_schemas: EvaluationSchema[];
  total_evaluation: TotalEvaluation;
}

interface ScaInfo {
  name: string;
  purpose: string;
  created_at: string;
  sample_no: string;
}

interface EvaluationSchema {
  id: number;
  explanation: string;
  single_selections: SingleSelection[];
  multiple_selections: MultipleSelection[];
  affective_assessments: AffectiveAssessments[];
  affective_comment: string;
}

interface TotalEvaluation {
  extrinsic_attributes_comment: string;
  affective_assessments_title: string;
  affective_assessments: AffectiveAssessments[];
  affective_comment: string;
  cup_defect_items: CupDefectItems[];
  coffee_defect_title: string;
  coffee_defect_items: SelectionItem[];
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
type SingleSelectionSet<N extends number> = {
  id: number;
  label: string;
  range: number;
  selected: Range0ToN<N>;
};

type AffectiveAssessmentsSet<N extends number> = {
  id: number;
  range: N;
  selected: Range0ToN<N>;
};

type CupDefectItemsSet<N extends number> = {
  id: number;
  defect_name: string;
  range: N;
  selected: Range0ToN<N>;
};

interface SingleSelection extends SingleSelectionSet<3> {}

interface AffectiveAssessments extends AffectiveAssessmentsSet<9> {}

interface CupDefectItems extends CupDefectItemsSet<5> {}

interface MultipleSelection {
  id: number;
  title: string; // 그룹 제목 ("해당되는 기술어")
  limit: number | null; // 선택 제한 (ex. 5개)
  items: SelectionItem[]; // 라벨 아이템 배열
}

interface SelectionItem {
  id: number;
  parentId: number | null; // null이면 최상위 카테고리
  label: string;
  selected: boolean; // 선택 여부
}
