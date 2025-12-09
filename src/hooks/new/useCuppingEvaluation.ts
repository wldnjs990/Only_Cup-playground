import createDetailEvaluations from '@/constants/new/category_detail_evaluations';
import { categoryTree } from '@/constants/new/category_tree';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

// 1뎁스 노드
type StNodeListPath = `root.${number}.evaluationList.${number}.category.cascaderTree`;
// 1뎁스 selected 핸들러 타입
export type HandleStNodeClick = (
  selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.selected`,
  childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`,
  selected: boolean,
) => void;

// 2뎁스 노드
type NdNodeListPath =
  | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children`
  | null;
// 2뎁스 selected 핸들러 타입
export type HandleNdNodeClick = (
  selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.selected`,
  childrenPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`,
  selected: boolean,
) => void;

// 3뎁스 노드
type LeafNodeListPath =
  | `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children`
  | null;
// 리프 selected 핸들러 타입
export type HandleLeafNodeClick = (
  selected: boolean,
  label: string,
  value: string,
  selectedPath: `root.${number}.evaluationList.${number}.category.cascaderTree.${number}.children.${number}.children.${number}.selected`,
) => void;

export default function useCuppingEvaluation(evaluationListPath: `root.${number}.evaluationList`) {
  const { getValues, setValue, control } = useFormContext<TRootCuppingFormSchema>();

  // 내비게이션 영역 -----------------------------------------------------------------------------------------

  // 현재 평가(맛, 향 ... 5개)
  const [navIdx, setNavIdx] = useState<number>(0);

  // 현재 평가 경로
  const [evaluationPath, setEvaluationPath] = useState<`root.${number}.evaluationList.${number}`>(
    `${evaluationListPath}.${navIdx}`,
  );

  // 평가 영역 -----------------------------------------------------------------------------------------

  const [categoryPath, setCategoryPath] =
    useState<`root.${number}.evaluationList.${number}.category`>(`${evaluationPath}.category`);
  const [detailPath, setDetailPath] =
    useState<`root.${number}.evaluationList.${number}.detailEvaluation`>(
      `${evaluationPath}.detailEvaluation`,
    );

  // 선택한 카테고리 이름
  const categoryName = getValues(`${categoryPath}.name`);

  // 1뎁스 노드 ----------------------------------------------------------------------------------------
  const [stNodeListPath, setStNodeListPath] = useState<StNodeListPath>(
    `${categoryPath}.cascaderTree`,
  );
  // 1뎁스 선택 인덱스
  const [stNodnavIdx, setStNodnavIdx] = useState<number>(0);
  // 1뎁스 selected 핸들러
  const handleStNodeClick: HandleStNodeClick = (selectedPath, childrenPath, selected) => {
    // 초기화용 categoryTree 상수
    const initialCategory = categoryTree[categoryName];

    // 이미 선택된 노드면 다음 뎁스 이동
    if (selected) {
      setNowDepth((cur) => cur + 1);
      return;
    }

    // valueList 필드 초기화
    setValue(`${categoryPath}.valueList`, []);
    // CategoryEvaluationList 필드 초기화
    setValue(`${detailPath}.categoryEvaluationList`, []);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택
    setValue(stNodeListPath, initialCategory);
    setValue(selectedPath, !selected);
    setNdNodeListPath(childrenPath);
    setNowDepth((cur) => cur + 1);
  };

  // 2뎁스 노드 ------------------------------------------------------------------------------------------
  const [ndNodeListPath, setNdNodeListPath] = useState<NdNodeListPath>(null);
  // 2뎁스 selected 핸들러
  const handleNdNodeClick: HandleNdNodeClick = (selectedPath, childrenPath, selected) => {
    // 초기화용 categoryTree 상수
    const initialCategory = categoryTree[categoryName][stNodnavIdx].children;

    // 이미 선택된 노드면 다음 노드 이동
    if (selected) {
      setNowDepth((cur) => cur + 1);
      return;
    }

    // valueList 필드 초기화
    setValue(`${categoryPath}.valueList`, []);
    // CategoryEvaluationList 필드 초기화
    setValue(`${detailPath}.categoryEvaluationList`, []);

    // 선택된 노드 외에 활성화된 노드가 있으면 있으면 해당 노드 리셋하고 현재 노드 선택

    // 2뎁스 노드 초기화
    if (ndNodeListPath) setValue(ndNodeListPath, initialCategory);
    // 선택 해제
    setValue(selectedPath, !selected);
    // 리프 노드 경로 등록
    setLeafNodeListPath(childrenPath);
    setNowDepth((cur) => cur + 1);
  };
  // 3뎁스 노드 ----------------------------------------------------------------------------------------------
  const [leafNodeListPath, setLeafNodeListPath] = useState<LeafNodeListPath>(null);

  // 카테고리 상세평가 업데이트용 필드
  const { append, remove } = useFieldArray({
    control,
    name: `${detailPath}.categoryEvaluationList`,
  });
  // valueList 업데이트용 필드
  const valueList = useWatch({ name: `${categoryPath}.valueList`, control });

  // 리프 selected 핸들러
  const handleLeafNodeClick: HandleLeafNodeClick = (selected, value, label, selectedPath) => {
    // 선택
    if (!selected) {
      // 카테고리 상세 평가 목록 추가
      const newCreateDetailEvaluations = createDetailEvaluations(value, label);
      append(newCreateDetailEvaluations);
      // 카테고리 추가
      setValue(`${categoryPath}.valueList`, [...valueList, value]);
    }

    // 선택 취소
    if (selected) {
      // 카테고리 상세 평가 목록 제거
      const removnavIdx = valueList.findIndex((cur) => value === cur);
      remove(removnavIdx);
      // 카테고리 제거
      setValue(
        `${categoryPath}.valueList`,
        valueList.filter((_, idx) => idx !== removnavIdx),
      );
    }

    // 클릭한 노드 selected 업데이트
    setValue(selectedPath, !selected);
  };

  // 평가 뎁스 ------------------------------------------------------------------------------
  const [nowDepth, setNowDepth] = useState(1);

  const handlePrevButtonClick = () => {
    setNowDepth((cur) => Math.max(cur - 1, 1));
  };
  const handleDetailEvaluateButtonClick = () => {
    setNowDepth(4);
  };
  // 평가 뎁스 ------------------------------------------------------------------------------

  useEffect(() => {
    const nowCategoryPath = `${evaluationListPath}.${navIdx}.category` as const;
    setEvaluationPath(`${evaluationListPath}.${navIdx}`);
    setCategoryPath(`${evaluationListPath}.${navIdx}.category`);
    setDetailPath(`${evaluationListPath}.${navIdx}.detailEvaluation`);

    const stNodeListPath = `${nowCategoryPath}.cascaderTree` as const;
    // selected 확인용 1뎁스 노드
    const stNodeList = getValues(stNodeListPath);
    // 1뎁스 선택됐는지 확인
    const stSelectedIndex = stNodeList.findIndex((NodeList) => NodeList.selected);
    // 선택된 체크박스 있으면 업데이트 해주기
    if (stSelectedIndex !== -1) {
      setNdNodeListPath(`${stNodeListPath}.${stSelectedIndex}.children`);
      setNowDepth(2);
      setStNodnavIdx(stSelectedIndex);

      // useEffect 안에서 다른 훅 사용이 가능하나..? 왜 되는거지? 시점이 안 겹치나?
      // 생각해보니 커스텀훅 반환값이라서 그냥 메서드일 뿐이겠다.
      const ndNodeList = getValues(`${stNodeListPath}.${stSelectedIndex}.children`);
      // 2뎁스 선택됐는지 확인
      const ndSelectedIndex = ndNodeList.findIndex((NodeList) => NodeList.selected);
      // 선택된 체크박스 있으면 업데이트 해주기
      if (ndSelectedIndex !== -1) {
        setLeafNodeListPath(
          `${stNodeListPath}.${stSelectedIndex}.children.${ndSelectedIndex}.children`,
        );
        setNowDepth(3);

        const isCategorySelected = getValues(`${nowCategoryPath}.valueList`).length > 0;
        // 리프노드까지 선택됐는지 확인
        if (isCategorySelected) setNowDepth(4);
      }
    } else {
      setStNodeListPath(stNodeListPath);
      setNowDepth(1);
    }
  }, [navIdx]);

  return {
    evaluationListPath,
    navIdx,
    evaluationPath,
    categoryPath,
    detailPath,
    stNodeListPath,
    ndNodeListPath,
    leafNodeListPath,
    categoryName,
    nowDepth,
    setNavIdx,
    handlePrevButtonClick,
    handleDetailEvaluateButtonClick,
    handleStNodeClick,
    handleNdNodeClick,
    handleLeafNodeClick,
  };
}
