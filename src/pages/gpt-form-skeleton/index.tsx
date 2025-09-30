// src/pages/FormSkeleton.tsx
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FORM_SCHEMA_MOCK } from '../../constants/form_schema_mock';
import { useFormResult } from '../../hooks/useFormResult';

export default function FormSkeleton() {
  const navigate = useNavigate();
  const {
    formResult,
    setFormResult,
    setSingleSelection,
    setAffectiveScore,
    setAffectiveComment,
    setTotalAffectiveScore,
    setTotalComment,
    setCupDefectValue,
    reset,
  } = useFormResult(FORM_SCHEMA_MOCK);

  // 기본정보
  const setScaInfo = (key: 'name' | 'purpose' | 'sample_no', value: string) => {
    setFormResult((prev) => ({ ...prev, sca_info: { ...prev.sca_info, [key]: value } }));
  };

  // 총평 코멘트
  const setExtrinsicComment = (text: string) => {
    setFormResult((prev) => ({
      ...prev,
      total_evaluation: { ...prev.total_evaluation, extrinsic_attributes_comment: text },
    }));
  };

  // 커피 결점(체크 박스)
  const toggleCoffeeDefect = (itemId: number) => {
    setFormResult((prev) => ({
      ...prev,
      total_evaluation: {
        ...prev.total_evaluation,
        coffee_defect_items: prev.total_evaluation.coffee_defect_items.map((it) =>
          it.id === itemId ? { ...it, selected: !it.selected } : it,
        ),
      },
    }));
  };

  /** ---------- Multi-select (부모/자식 트리 규칙) ---------- */
  // 그룹 내 선택된 "부모" 개수 (자식은 미포함)
  const countSelectedParents = (group: {
    items: (typeof formResult.evaluation_schemas)[number]['multiple_selections'][number]['items'];
  }) => group.items.filter((i) => i.parentId === null && i.selected).length;

  // 부모 토글 (자식 없는 부모만 허용, 부모는 limit 카운트)
  const toggleParent = (sectionId: number, groupId: number, parentId: number) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const sec = next.evaluation_schemas.find((s) => s.id === sectionId);
      if (!sec) return prev;
      const group = sec.multiple_selections.find((g) => g.id === groupId);
      if (!group) return prev;

      const parent = group.items.find((i) => i.id === parentId && i.parentId === null);
      if (!parent) return prev;

      const hasChildren = group.items.some((i) => i.parentId === parentId);
      if (hasChildren) return prev; // 자식이 있으면 부모 직접 클릭 불가

      // limit 체크 (부모만 카운트)
      const willSelect = !parent.selected;
      if (willSelect && typeof group.limit === 'number') {
        const selectedParents = countSelectedParents(group);
        if (selectedParents >= group.limit) return prev; // 초과 금지
      }
      parent.selected = !parent.selected;
      return next;
    });
  };

  // 자식 선택 (같은 부모 내 단일 선택, 자식은 limit 미반영 / 부모 자동 체크)
  // ✅ 이미 선택된 자식을 다시 클릭하면 자식 해제 + 남은 자식 없으면 부모도 해제
  const selectChild = (sectionId: number, groupId: number, childId: number, parentId: number) => {
    setFormResult((prev) => {
      const next = structuredClone(prev);
      const sec = next.evaluation_schemas.find((s) => s.id === sectionId);
      if (!sec) return prev;
      const group = sec.multiple_selections.find((g) => g.id === groupId);
      if (!group) return prev;

      const parent = group.items.find((i) => i.id === parentId && i.parentId === null);
      if (!parent) return prev;

      const children = group.items.filter((i) => i.parentId === parentId);
      const cur = children.find((c) => c.id === childId);
      if (!cur) return prev;

      if (cur.selected) {
        // ⬇️ 현재 클릭한 자식이 이미 선택되어 있으면 → 해제
        cur.selected = false;

        // 자식 중 하나라도 남아있나?
        const anySelected = children.some((c) => c.selected);
        if (!anySelected) {
          // 아무 자식도 없으면 부모도 해제 (limit 슬롯 반환)
          parent.selected = false;
        }
        return next;
      }

      // 새 자식을 선택하는 경우: 부모가 아직 선택되지 않았다면 limit 체크
      if (!parent.selected && typeof group.limit === 'number') {
        const selectedParents = group.items.filter((i) => i.parentId === null && i.selected).length;
        if (selectedParents >= group.limit) return prev; // 부모 limit 초과 → 무시
      }

      // 같은 부모의 자식은 라디오처럼 1개만 선택
      children.forEach((c) => (c.selected = c.id === childId));
      parent.selected = true; // 부모 자동 체크
      return next;
    });
  };

  // 검증: 부모 limit만 확인(자식은 미포함). 나머지는 UI에서 범위 강제.
  const validateBeforeSave = () => {
    const issues: string[] = [];

    formResult.evaluation_schemas.forEach((sec, si) => {
      // parent-limit만 검사
      sec.multiple_selections.forEach((g, gi) => {
        if (typeof g.limit === 'number') {
          const selectedParents = g.items.filter((i) => i.parentId === null && i.selected).length;
          if (selectedParents > g.limit) {
            issues.push(
              `evaluation_schemas[${si}].multiple_selections[${gi}]: 부모 선택 ${selectedParents}개가 limit ${g.limit}를 초과`,
            );
          }
        }
      });
    });

    return issues;
  };

  /** ---------- 제출 ---------- */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const issues = validateBeforeSave();
      if (issues.length) {
        alert('검증 실패:\n' + issues.map((i) => `- ${i}`).join('\n'));
        return;
      }

      localStorage.setItem('result', JSON.stringify(formResult));
      alert('저장 완료! /pdf로 이동합니다.');
      navigate('/pdf', { replace: true });
    },
    [formResult, navigate],
  );

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <h1>Only Cup 폼</h1>
      <p style={{ color: '#666' }}>
        버전 {formResult.version} · 작성일 {formResult.sca_info.created_at}
      </p>

      {/* 기본 정보 */}
      <section style={{ marginTop: 24 }}>
        <h2>기본 정보</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          <input
            placeholder="이름"
            value={formResult.sca_info.name}
            onChange={(e) => setScaInfo('name', e.target.value)}
          />
          <input
            placeholder="커핑 목적"
            value={formResult.sca_info.purpose}
            onChange={(e) => setScaInfo('purpose', e.target.value)}
          />
          <input
            placeholder="샘플 번호"
            value={formResult.sca_info.sample_no}
            onChange={(e) => setScaInfo('sample_no', e.target.value)}
          />
        </div>
      </section>

      {/* 평가 섹션 */}
      {formResult.evaluation_schemas.map((sec) => (
        <section
          key={sec.id}
          style={{ marginTop: 32, paddingTop: 12, borderTop: '1px solid #eee' }}
        >
          <h2 style={{ margin: 0 }}>ㅇㅇ</h2>
          <p style={{ color: '#666', marginTop: 6 }}>{sec.explanation}</p>

          {/* 단일(슬라이더): 1 ~ max */}
          {sec.single_selections.map((it) => (
            <div key={it.id} style={{ margin: '10px 0' }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                {it.label} &nbsp; <small>(1 ~ {it.range})</small>
              </div>
              <input
                type="range"
                min={1}
                max={it.range}
                value={it.selected}
                onChange={(e) => setSingleSelection(sec.id, it.id, Number(e.target.value))}
                style={{ width: 300 }}
              />
              <span style={{ marginLeft: 8 }}>{it.selected}</span>
            </div>
          ))}

          {/* 다중 선택(부모-자식 트리) */}
          {sec.multiple_selections.map((g) => {
            const parents = g.items.filter((i) => i.parentId === null);
            return (
              <div key={g.id} style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>
                  {g.title}
                  {typeof g.limit === 'number' && (
                    <span style={{ fontWeight: 400, color: '#777' }}> (부모 최대 {g.limit}개)</span>
                  )}
                </div>

                {parents.map((p) => {
                  const children = g.items.filter((i) => i.parentId === p.id);
                  const hasChildren = children.length > 0;

                  return (
                    <div key={p.id} style={{ marginBottom: 8 }}>
                      {/* 부모 행 */}
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <input
                          type="checkbox"
                          checked={!!p.selected}
                          disabled={hasChildren} // 자식 있으면 클릭 불가
                          onChange={() => toggleParent(sec.id, g.id, p.id)}
                        />
                        <span style={{ fontWeight: 600 }}>{p.label}</span>
                      </label>

                      {/* 자식 목록 */}
                      {hasChildren && (
                        <div
                          style={{
                            marginLeft: 24,
                            marginTop: 6,
                            display: 'flex',
                            gap: 12,
                            flexWrap: 'wrap',
                          }}
                        >
                          {children.map((c) => (
                            <label
                              key={c.id}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                            >
                              <input
                                type="checkbox"
                                checked={!!c.selected}
                                onChange={() => selectChild(sec.id, g.id, c.id, p.id)}
                              />
                              {c.label}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* 섹션 정동평가(슬라이더 1~max) + 코멘트 */}
          {sec.affective_assessments.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>정동평가</div>
              {sec.affective_assessments.map((a) => (
                <div key={a.id} style={{ margin: '6px 0' }}>
                  <div>
                    항목 #{a.id} &nbsp; <small>(1 ~ {a.range})</small>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={a.range}
                    value={a.selected}
                    onChange={(e) => setAffectiveScore(sec.id, a.id, Number(e.target.value))}
                    style={{ width: 300 }}
                  />
                  <span style={{ marginLeft: 8 }}>{a.selected}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 8 }}>
            <textarea
              placeholder="정동 코멘트"
              value={sec.affective_comment}
              onChange={(e) => setAffectiveComment(sec.id, e.target.value)}
              rows={3}
              style={{ width: '100%', padding: 10 }}
            />
          </div>
        </section>
      ))}

      {/* 총평 */}
      <section style={{ marginTop: 32, paddingTop: 12, borderTop: '2px solid #ddd' }}>
        <h2>총평</h2>

        <div>
          <textarea
            placeholder="외재적 속성 코멘트"
            value={formResult.total_evaluation.extrinsic_attributes_comment}
            onChange={(e) => setExtrinsicComment(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: 10 }}
          />
        </div>

        {formResult.total_evaluation.affective_assessments.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              {formResult.total_evaluation.affective_assessments_title}
            </div>
            {formResult.total_evaluation.affective_assessments.map((a) => (
              <div key={a.id} style={{ margin: '6px 0' }}>
                <div>
                  항목 #{a.id} &nbsp; <small>(1 ~ {a.range})</small>
                </div>
                <input
                  type="range"
                  min={1}
                  max={a.range}
                  value={a.selected}
                  onChange={(e) => setTotalAffectiveScore(a.id, Number(e.target.value))}
                  style={{ width: 300 }}
                />
                <span style={{ marginLeft: 8 }}>{a.selected}</span>
              </div>
            ))}

            <div style={{ marginTop: 8 }}>
              <textarea
                placeholder="총평 코멘트"
                value={formResult.total_evaluation.affective_comment}
                onChange={(e) => setTotalComment(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: 10 }}
              />
            </div>
          </div>
        )}

        {/* 컵 결점: 0 ~ max */}
        {formResult.total_evaluation.cup_defect_items.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>컵 결점</div>
            {formResult.total_evaluation.cup_defect_items.map((c) => (
              <div key={c.id} style={{ margin: '6px 0' }}>
                <div>
                  {c.defect_name} &nbsp; <small>(0 ~ {c.range})</small>
                </div>
                <input
                  type="range"
                  min={0}
                  max={c.range}
                  value={c.selected}
                  onChange={(e) => setCupDefectValue(c.id, Number(e.target.value))}
                  style={{ width: 300 }}
                />
                <span style={{ marginLeft: 8 }}>{c.selected}</span>
              </div>
            ))}
          </div>
        )}

        {/* 커피 결점(체크박스) — 평범한 flat 체크 */}
        {formResult.total_evaluation.coffee_defect_items.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>
              {formResult.total_evaluation.coffee_defect_title}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {formResult.total_evaluation.coffee_defect_items.map((x) => (
                <label key={x.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={!!x.selected}
                    onChange={() => toggleCoffeeDefect(x.id)}
                  />
                  {x.label}
                </label>
              ))}
            </div>
          </div>
        )}
      </section>

      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button type="submit">저장 후 PDF 이동</button>
        <button type="button" onClick={reset}>
          초기화
        </button>
      </div>
    </form>
  );
}
