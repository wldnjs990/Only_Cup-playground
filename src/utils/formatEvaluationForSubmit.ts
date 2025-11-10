// src/utils/formatEvaluationForSubmit.ts
import type {
  EvaluationRootSchema, // 원본 폼 값 타입 (@/types/new_naming)
  SingleSelectionSchema,
  MultipleSelectionSchema,
  AssessmentsSchema,
  SelectionItemSchema,
} from '@/types/form_schema_mock';

// sort 필드가 있으면 정렬
const sortBy = <T extends { sort?: number }>(arr?: T[]) =>
  (arr ?? []).slice().sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

export function formatEvaluationForSubmit(form: EvaluationRootSchema): EvaluationRoot {
  /* ---------- 기본 정보 ---------- */
  const sca_info: ScaInfo = {
    name: String(form.basic_info?.name?.value ?? ''),
    purpose: String(form.basic_info?.purpose?.value ?? ''),
    created_at: String(form.basic_info?.created_at ?? ''),
    sample_no: String(form.basic_info?.sample_no?.value ?? ''),
  };

  /* ---------- 유틸 매퍼 ---------- */
  const mapSingles = (arr?: SingleSelectionSchema[]) =>
    sortBy(arr).map<SingleSelection>((s) => ({
      id: s.id,
      label: s.label,
      range: s.range,
      selected: s.selected as SingleSelection['selected'],
    }));

  const mapAffective = (arr?: AssessmentsSchema[]) =>
    sortBy(arr).map<AffectiveAssessments>((a) => ({
      id: a.id,
      range: a.range as AffectiveAssessments['range'],
      selected: a.selected as AffectiveAssessments['selected'],
    }));

  const mapItems = (items?: SelectionItemSchema[]) =>
    (items ?? []).map<SelectionItem>((it) => ({
      id: it.id,
      parentId: it.parentId,
      label: it.label,
      checked: !!it.checked,
    }));

  const mapMulti = (arr?: MultipleSelectionSchema[]) =>
    sortBy(arr).map<MultipleSelection>((g) => ({
      id: g.id,
      title: g.title,
      limit: g.limit,
      items: mapItems(g.items),
    }));

  /* ---------- main_evaluations ---------- */
  const evaluation_schemas: EvaluationSchema[] = (form.main_evaluations ?? []).map((me) => ({
    id: me.id,
    explanation: me.explanation,
    single_selections: mapSingles(me.single_selections),
    multiple_selections: mapMulti(me.multiple_selections),
    affective_assessments: mapAffective(me.affective_assessment?.assessments),
    affective_comment: String(me.affective_assessment?.comment?.value ?? ''),
  }));

  /* ---------- total_evaluation ---------- */
  const cupSingles = sortBy(form.total_evaluation?.defect?.cup?.single_selections);
  const coffeeGroups = sortBy(form.total_evaluation?.defect?.coffee?.multiple_selections);

  // 기본 정책: 커피 결함은 여러 그룹이 와도 items는 플랫으로 합치고, title은 첫 그룹 제목 사용
  const coffee_defect_title = String(coffeeGroups[0]?.title ?? '');
  const coffee_defect_items: SelectionItem[] = coffeeGroups.flatMap((g) => mapItems(g.items));

  const total_evaluation: TotalEvaluation = {
    extrinsic_attributes_comment: String(
      form.total_evaluation?.extrinsic_attributes?.comment?.value ?? '',
    ),
    affective_assessments_title: String(form.total_evaluation?.title ?? ''),
    affective_assessments: mapAffective(form.total_evaluation?.affective_assessment?.assessments),
    affective_comment: String(form.total_evaluation?.affective_assessment?.comment?.value ?? ''),
    cup_defect_items: cupSingles.map<CupDefectItems>((s) => ({
      id: s.id,
      defect_name: s.label,
      range: s.range as CupDefectItems['range'],
      selected: s.selected as CupDefectItems['selected'],
    })),
    coffee_defect_title,
    coffee_defect_items,
  };

  return {
    version: Number(form.version ?? 1),
    sca_info,
    evaluation_schemas,
    total_evaluation,
  };
}
