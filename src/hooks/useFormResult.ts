import { useCallback, useMemo, useState } from 'react';

/** ---------- (필요한 최소 타입) 스키마 입력 측 ---------- */
type Id = number;

interface SchemaTextField {
  type: 'text';
  label: string;
  value?: string;
}

interface SchemaScaInfo {
  title?: string;
  name: SchemaTextField;
  purpose: SchemaTextField;
  created_at: string; // FORMATTED 같은 문자열
  sample_no: SchemaTextField;
}

interface SchemaSingleSelectionItem {
  id: Id;
  label: string;
  type?: 'slider';
  sort?: number;
  // single_selections는 range 또는 min/max 둘 중 하나로 올 수 있다고 가정
  range?: number;
  min?: number;
  max?: number;
  selected?: number;
}

interface SchemaMultipleItem {
  id: Id;
  parentId: Id | null;
  label: string;
  selected?: boolean;
  sort?: number;
}

interface SchemaMultipleGroup {
  id: Id;
  title: string;
  limit: number | null; // null이면 무제한
  type?: 'multi_select';
  items: SchemaMultipleItem[];
  sort?: number;
}

interface SchemaAffectiveAssessmentItem {
  id: Id;
  type?: 'slider';
  label: string;
  min?: number; // 기본 1
  max?: number; // 기본 9
  selected?: number;
  sort?: number;
}

interface SchemaAffectiveAssessmentBlock {
  explanation?: string;
  tooltips?: string[];
  assessments?: SchemaAffectiveAssessmentItem[];
  comment?: { type: 'textarea'; placeholder?: string; comment?: string };
}

interface EvaluationSchemaSection {
  id: Id;
  title?: string;
  explanation: string;
  single_selections?: SchemaSingleSelectionItem[];
  multiple_selections?: SchemaMultipleGroup[];
  /** 섹션 내부 정동평가(신규 구조) */
  affective_assessment?: SchemaAffectiveAssessmentBlock;
}

interface SchemaCoffeeDefect {
  id: Id;
  title: string;
  type: 'multi_select';
  limit: number | null;
  items: { id: Id; parentId: Id | null; label: string; selected?: boolean; sort?: number }[];
}

interface SchemaTotalEvaluation {
  extrinsic_attributes_comment?:
    | string
    | { type: 'textarea'; placeholder?: string; comment?: string };
  /** 전역 종합 정동평가(있을 수도/없을 수도) */
  affective_assessment?: SchemaAffectiveAssessmentBlock;
  cup_defect_items?: {
    id: Id;
    sort?: number;
    type?: 'slider';
    label: string; // (스키마에서는 label로 통일)
    min?: number; // 기본 0
    max?: number; // 기본 5
    selected?: number; // 기본 0
  }[];
  coffee_defect?: SchemaCoffeeDefect;
}

export interface EvaluationRootSchema {
  version: number;
  sca_info: SchemaScaInfo;
  evaluation_schemas: EvaluationSchemaSection[];
  total_evaluation?: SchemaTotalEvaluation;
}

/** ---------- 결과(폼 값) 측: FORM_RESULT_MOCK과 동일한 구조 ---------- */
export interface FormResult {
  version: number;
  sca_info: {
    name: string;
    purpose: string;
    created_at: string; // 스키마의 문자열 유지
    sample_no: string;
  };
  evaluation_schemas: {
    id: Id;
    explanation: string;
    single_selections: { id: Id; label: string; range: number; selected: number }[];
    multiple_selections: {
      id: Id;
      title: string;
      limit: number | null;
      items: { id: Id; parentId: Id | null; label: string; selected: boolean }[];
    }[];
    affective_assessments: { id: Id; range: number; selected: number }[];
    affective_comment: string;
  }[];
  total_evaluation: {
    extrinsic_attributes_comment: string;
    affective_assessments_title: string;
    affective_assessments: { id: Id; range: number; selected: number }[];
    affective_comment: string;
    cup_defect_items: { id: Id; defect_name: string; range: number; selected: number }[];
    coffee_defect_title: string;
    coffee_defect_items: { id: Id; parentId: Id | null; label: string; selected: boolean }[];
  };
}

/** ---------- 유틸: 안전한 숫자 파생 ---------- */
const toRange = (item: { range?: number; min?: number; max?: number }, fallback = 3) => {
  if (typeof item.range === 'number') return item.range;
  const min = typeof item.min === 'number' ? item.min : 1;
  const max = typeof item.max === 'number' ? item.max : fallback;
  return Math.max(0, max - min + 1);
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** ---------- 스키마 → 초기 결과 변환 ---------- */
function makeInitialResultFromSchema(schema: EvaluationRootSchema): FormResult {
  const result: FormResult = {
    version: schema.version,
    sca_info: {
      name: schema.sca_info.name.value ?? '',
      purpose: schema.sca_info.purpose.value ?? '',
      created_at: schema.sca_info.created_at,
      sample_no: schema.sca_info.sample_no.value ?? '',
    },
    evaluation_schemas: schema.evaluation_schemas.map((sec) => {
      const singles = (sec.single_selections ?? []).map((it) => ({
        id: it.id,
        label: it.label,
        range: toRange(it, 3), // 1~3 기본
        selected: typeof it.selected === 'number' ? it.selected : 0,
      }));

      const multis = (sec.multiple_selections ?? []).map((g) => ({
        id: g.id,
        title: g.title,
        limit: g.limit ?? null,
        items: g.items.map((x) => ({
          id: x.id,
          parentId: x.parentId ?? null,
          label: x.label,
          selected: !!x.selected,
        })),
      }));

      // 섹션 내부 정동평가 블록 → result의 affective_* 로 투영
      const affBlock = sec.affective_assessment;
      const affective_assessments = (affBlock?.assessments ?? []).map((a) => ({
        id: a.id,
        range: toRange({ range: undefined, min: a.min ?? 1, max: a.max ?? 9 }, 9),
        selected: typeof a.selected === 'number' ? a.selected : 0,
      }));
      const affective_comment = affBlock?.comment?.comment ?? '';

      return {
        id: sec.id,
        explanation: sec.explanation,
        single_selections: singles,
        multiple_selections: multis,
        affective_assessments,
        affective_comment,
      };
    }),
    total_evaluation: {
      extrinsic_attributes_comment:
        typeof schema.total_evaluation?.extrinsic_attributes_comment === 'string'
          ? schema.total_evaluation?.extrinsic_attributes_comment
          : (schema.total_evaluation?.extrinsic_attributes_comment?.comment ?? ''),
      affective_assessments_title: '전체적 인상',
      affective_assessments: (schema.total_evaluation?.affective_assessment?.assessments ?? []).map(
        (a) => ({
          id: a.id,
          range: toRange({ min: a.min ?? 1, max: a.max ?? 9 }, 9),
          selected: typeof a.selected === 'number' ? a.selected : 0,
        }),
      ),
      affective_comment: schema.total_evaluation?.affective_assessment?.comment?.comment ?? '',
      cup_defect_items: (schema.total_evaluation?.cup_defect_items ?? []).map((x) => ({
        id: x.id,
        defect_name: x.label, // 결과 구조를 존중
        range: toRange({ min: x.min ?? 0, max: x.max ?? 5 }, 5),
        selected: typeof x.selected === 'number' ? x.selected : 0,
      })),
      coffee_defect_title: schema.total_evaluation?.coffee_defect?.title ?? '결점(있을 경우)',
      coffee_defect_items: (schema.total_evaluation?.coffee_defect?.items ?? []).map((x) => ({
        id: x.id,
        parentId: x.parentId ?? null,
        label: x.label,
        selected: !!x.selected,
      })),
    },
  };

  return result;
}

/** ---------- 결과 검증 ---------- */
type ValidationIssue = { path: string; message: string };

function validateResult(result: FormResult): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // per-section
  result.evaluation_schemas.forEach((sec, si) => {
    // singles
    sec.single_selections.forEach((it, ii) => {
      if (it.selected < 0 || it.selected > it.range) {
        issues.push({
          path: `evaluation_schemas[${si}].single_selections[${ii}]`,
          message: `selected(${it.selected}) must be between 0 and range(${it.range}).`,
        });
      }
    });

    // multis: limit
    sec.multiple_selections.forEach((g, gi) => {
      if (typeof g.limit === 'number') {
        const cnt = g.items.filter((x) => x.selected).length;
        if (cnt > g.limit) {
          issues.push({
            path: `evaluation_schemas[${si}].multiple_selections[${gi}]`,
            message: `selected ${cnt} exceeds limit ${g.limit}.`,
          });
        }
      }

      // parentId 존재성(최상위만 부모인 2단계 트리 기준)
      const parents = new Set(g.items.filter((x) => x.parentId == null).map((x) => x.id));
      g.items.forEach((x, xi) => {
        if (x.parentId != null && !parents.has(x.parentId)) {
          issues.push({
            path: `evaluation_schemas[${si}].multiple_selections[${gi}].items[${xi}]`,
            message: `parentId ${x.parentId} not found among top-level items.`,
          });
        }
      });
    });
  });

  // total_evaluation
  result.total_evaluation.affective_assessments.forEach((a, ai) => {
    if (a.selected < 0 || a.selected > a.range) {
      issues.push({
        path: `total_evaluation.affective_assessments[${ai}]`,
        message: `selected(${a.selected}) must be between 0 and range(${a.range}).`,
      });
    }
  });

  // cup defects
  result.total_evaluation.cup_defect_items.forEach((c, ci) => {
    if (c.selected < 0 || c.selected > c.range) {
      issues.push({
        path: `total_evaluation.cup_defect_items[${ci}]`,
        message: `selected(${c.selected}) must be between 0 and range(${c.range}).`,
      });
    }
  });

  return issues;
}

/** ---------- React 훅 ---------- */
export function useFormResult(schema: EvaluationRootSchema) {
  const initial = useMemo(() => makeInitialResultFromSchema(schema), [schema]);
  const [formResult, setFormResult] = useState<FormResult>(initial);

  /** 단일 선택 점수 설정 */
  const setSingleSelection = useCallback((sectionId: Id, itemId: Id, value: number) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const sec = next.evaluation_schemas.find((s) => s.id === sectionId);
      if (!sec) return prev;
      const item = sec.single_selections.find((i) => i.id === itemId);
      if (!item) return prev;
      item.selected = clamp(value, 0, item.range);
      return next;
    });
  }, []);

  /** 멀티 선택 토글 (limit 준수) */
  const toggleMultiSelection = useCallback((sectionId: Id, groupId: Id, itemId: Id) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const sec = next.evaluation_schemas.find((s) => s.id === sectionId);
      if (!sec) return prev;
      const group = sec.multiple_selections.find((g) => g.id === groupId);
      if (!group) return prev;
      const item = group.items.find((i) => i.id === itemId);
      if (!item) return prev;

      const currentlySelected = group.items.filter((x) => x.selected).length;
      if (!item.selected) {
        // select
        if (typeof group.limit === 'number' && currentlySelected >= group.limit) {
          return prev; // limit 초과 -> 무시
        }
        item.selected = true;
      } else {
        // deselect
        item.selected = false;
      }
      return next;
    });
  }, []);

  /** 섹션 정동평가 점수 설정(폼 결과 구조상 섹션의 affective_assessments) */
  const setAffectiveScore = useCallback((sectionId: Id, assessmentId: Id, value: number) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const sec = next.evaluation_schemas.find((s) => s.id === sectionId);
      if (!sec) return prev;
      const a = sec.affective_assessments.find((x) => x.id === assessmentId);
      if (!a) return prev;
      a.selected = clamp(value, 0, a.range);
      return next;
    });
  }, []);

  /** 섹션 정동 코멘트 설정 */
  const setAffectiveComment = useCallback((sectionId: Id, text: string) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const sec = next.evaluation_schemas.find((s) => s.id === sectionId);
      if (!sec) return prev;
      sec.affective_comment = text;
      return next;
    });
  }, []);

  /** 전체 총평( total_evaluation ) 설정 */
  const setTotalAffectiveScore = useCallback((assessmentId: Id, value: number) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const a = next.total_evaluation.affective_assessments.find((x) => x.id === assessmentId);
      if (!a) return prev;
      a.selected = clamp(value, 0, a.range);
      return next;
    });
  }, []);

  const setTotalComment = useCallback((text: string) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      next.total_evaluation.affective_comment = text;
      return next;
    });
  }, []);

  /** 컵 결점 슬라이더 설정 */
  const setCupDefectValue = useCallback((defectId: Id, value: number) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const it = next.total_evaluation.cup_defect_items.find((x) => x.id === defectId);
      if (!it) return prev;
      it.selected = clamp(value, 0, it.range);
      return next;
    });
  }, []);

  /** 저장 전 검증 */
  const validate = useCallback(() => validateResult(formResult), [formResult]);

  /** 결과 전체 리셋(스키마가 바뀌었을 때 호출 추천) */
  const reset = useCallback(() => setFormResult(makeInitialResultFromSchema(schema)), [schema]);

  return {
    formResult,
    setFormResult, // 필요시 직접 제어
    setSingleSelection,
    toggleMultiSelection,
    setAffectiveScore,
    setAffectiveComment,
    setTotalAffectiveScore,
    setTotalComment,
    setCupDefectValue,
    validate,
    reset,
  };
}
