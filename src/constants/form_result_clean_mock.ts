import type { EvaluationRootSchema } from '@/types/schema';
import { FORMATTED } from './now_date';

// default로 '비어 있는' 값으로 초기화 (타입: EvaluationRoot)
export function toDefaultEvaluation(root: EvaluationRootSchema): EvaluationRoot {
  return {
    version: root.version,
    sca_info: {
      name: '', // 문자열 초기화
      purpose: '',
      created_at: FORMATTED, // 날짜는 유지하거나 ''로 바꾸고 싶으면 여기 수정
      sample_no: '',
    },
    evaluation_schemas: root.evaluation_schemas.map((sec) => ({
      id: sec.id,
      explanation: sec.explanation, // 설명은 보통 유지(원하면 ''로)
      single_selections: sec.single_selections.map((s) => ({
        id: s.id,
        label: s.label,
        range: s.selected,
        selected: 1, // ✅ Range0ToN 때문에 1로 초기화
      })),
      multiple_selections: sec.multiple_selections.map((g) => ({
        id: g.id,
        title: g.title,
        limit: g.limit ?? null,
        items: g.items.map((it) => ({
          id: it.id,
          parentId: it.parentId ?? null,
          label: it.label,
          selected: false, // ✅ 전부 해제
        })),
      })),
      affective_assessments: sec.affective_assessment.assessments.map((a) => ({
        id: a.id,
        range: a.selected, // 9 등 고정
        selected: 1, // ✅ 1로 초기화
      })),
      affective_comment: '', // 코멘트 초기화
    })),
    total_evaluation: {
      extrinsic_attributes_comment: '',
      affective_assessments_title: root.total_evaluation.affective_assessment.title, // 보통 유지
      affective_assessments: root.total_evaluation.affective_assessment.assessments.map((a) => ({
        id: a.id,
        range: a.selected,
        selected: 1, // ✅ 1로 초기화
      })),
      affective_comment: '',
      cup_defect_items: root.total_evaluation.cup_defect_items.map((c) => ({
        id: c.id,
        defect_name: c.label,
        range: c.selected,
        selected: 1, // ✅ 1로 초기화 (현재 Range0ToN 구현상 0 허용X)
      })),
      coffee_defect_title: root.total_evaluation.coffee_defect.title,
      coffee_defect_items: root.total_evaluation.coffee_defect.items.map((i) => ({
        id: i.id,
        parentId: i.parentId ?? null,
        label: i.label,
        selected: false, // ✅ 전부 해제
      })),
    },
  };
}
