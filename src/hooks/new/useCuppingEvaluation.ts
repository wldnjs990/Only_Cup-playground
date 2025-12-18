import { createEmptyDetailValue } from '@/constants/new/form_values_mock';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import type { CategoryFirstNode, CategoryTree } from '@/types/new/server_config_schema';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

// 상수 정의
const MIN_CASCADER_DEPTH = 1;
const MAX_CASCADER_DEPTH = 3;
const MAX_LEAF_NODES = 5;

// 타입 정의
export type HandleStNodeClick = (selectedIdx: number) => void;
export type HandleNdNodeClick = (selectedIdx: number) => void;
export type HandleLeafNodeClick = (selectedIdx: number, selectedValue: string, selectedLabel: string) => void;
export type HandleEvaluationsIdx = (selectedIdx: number) => void;
export type EvaluationSequence = 'category' | 'detail';

// 선택된 카테고리 값으로 부모 노드 역추적하는 유틸리티 함수
export const restoreNodeSelectionFromCategories = (
  cascaderTree: CategoryFirstNode[],
  selectedCategories: string[],
) => {
  if (selectedCategories.length === 0) {
    return {
      stNodeIdx: null,
      ndNodeIdx: null,
      leafNodeSelected: new Array(MAX_LEAF_NODES).fill(false),
      cascaderDepth: MIN_CASCADER_DEPTH,
    };
  }

  // 첫 번째 선택된 카테고리를 기준으로 역추적
  const firstCategory = selectedCategories[0];

  // 1뎁스 순회
  for (let stIdx = 0; stIdx < cascaderTree.length; stIdx++) {
    const stNode = cascaderTree[stIdx];

    // 2뎁스 순회
    for (let ndIdx = 0; ndIdx < stNode.children.length; ndIdx++) {
      const ndNode = stNode.children[ndIdx];

      // 3뎁스(리프) 순회
      for (let leafIdx = 0; leafIdx < ndNode.children.length; leafIdx++) {
        const leafNode = ndNode.children[leafIdx];

        // 선택된 카테고리를 찾았을 때
        if (leafNode.value === firstCategory) {
          // 모든 선택된 리프 노드 찾기 (같은 2뎁스 내에서)
          const leafSelection = new Array(MAX_LEAF_NODES).fill(false);
          // set 자료형 사용해서 아이템 여부 O(1)로 탐색
          const selectedSet = new Set(selectedCategories);
          ndNode.children.forEach((leaf, idx) => {
            if (selectedSet.has(leaf.value)) {
              // O(1) 조회
              leafSelection[idx] = true;
            }
          });

          return {
            stNodeIdx: stIdx,
            ndNodeIdx: ndIdx,
            leafNodeSelected: leafSelection,
            cascaderDepth: MAX_CASCADER_DEPTH, // 리프까지 선택된 상태
          };
        }
      }
    }
  }

  // 못 찾은 경우 초기화
  return {
    stNodeIdx: null,
    ndNodeIdx: null,
    leafNodeSelected: new Array(MAX_LEAF_NODES).fill(false),
    cascaderDepth: MIN_CASCADER_DEPTH,
  };
};

interface UseCuppingEvaluationProps {
  cuppingsIdx: number;
  cascaderTrees: CategoryTree;
}

export default function useCuppingEvaluation({
  cuppingsIdx,
  cascaderTrees,
}: UseCuppingEvaluationProps) {
  const { getValues, setValue, control } = useFormContext<RootCuppingFormValue>();

  // 선택된 평가 내비게이션 인덱스 -----------------------------------------------------------------------------------------
  const [evaluationsIdx, setEvaluationsIdx] = useState<number>(0);

  // 내비게이션 인덱스 핸들러
  const handleEvaluationsIdx: HandleEvaluationsIdx = (selectedIdx) => {
    setEvaluationsIdx(selectedIdx);
  };

  // 평가 시퀸스 ----------------------------------------------------------------------
  const [evaluationSequence, setEvaluationSequence] = useState<EvaluationSequence>('category');

  // 평가 시퀸스 업데이트 함수
  const updateEvaluationSequence = () => {
    //selectedCategories 선택 여부
    const isCategorySelected =
      getValues(`cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`).length >
      0;

    if (isCategorySelected) setEvaluationSequence('detail');
    else setEvaluationSequence('category');
  };

  // detail에서 category로 가는 함수
  const goToCategortSelect = () => {
    setEvaluationSequence('category');
  };

  // 카테고리 cascader 뎁스 ------------------------------------------------------------------------------
  const [cascaderDepth, setCascaderDepth] = useState(1);

  // 다음 뎁스
  const nextCascaderDepth = () => {
    setCascaderDepth((cur) => Math.min(cur + 1, MAX_CASCADER_DEPTH));
  };

  // 이전 뎁스
  const prevCascaderDepth = () => {
    setCascaderDepth((cur) => Math.max(cur - 1, MIN_CASCADER_DEPTH));
  };

  // cascader 노드 선택여부 ------------------------------------------------------------------
  // 1뎁스
  const [stNodeIdx, setStNodeIdx] = useState<number | null>(null);
  // 2뎁스
  const [ndNodeIdx, setNdNodeIdx] = useState<number | null>(null);
  // 3뎁스(리프) - 복수 선택 가능
  const leafNodeIdxConfig: boolean[] = new Array(MAX_LEAF_NODES).fill(false);
  const [leafNodeIdx, setLeafNodeIdx] = useState<boolean[]>(leafNodeIdxConfig);

  // 1뎁스 selected 핸들러 ----------------------------------------------------------------------------------------
  const handleStNodeClick: HandleStNodeClick = (selectedIdx) => {
    // 이미 선택된 노드인지 체크
    const isSelected = stNodeIdx === selectedIdx;

    // 이미 선택된 노드면 다음 뎁스 이동
    if (isSelected) {
      setCascaderDepth((cur) => cur + 1);
      return;
    }

    // selectedCategories 필드 초기화
    setValue(`cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`, []);
    // evaluation details 필드 초기화
    setValue(`cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.details`, []);
    // 하위 노드 선택 초기화
    setNdNodeIdx(null);
    setLeafNodeIdx(leafNodeIdxConfig);

    // 선택된 노드 업데이트해주고, cascader depth 증가
    setStNodeIdx(selectedIdx);
    setCascaderDepth((cur) => cur + 1);
  };

  // 2뎁스 selected 핸들러 ------------------------------------------------------------------------------------------
  const handleNdNodeClick: HandleNdNodeClick = (selectedIdx) => {
    // 이미 선택된 노드인지 체크
    const isSelected = ndNodeIdx === selectedIdx;

    // 이미 선택된 노드면 다음 노드 이동
    if (isSelected) {
      setCascaderDepth((cur) => cur + 1);
      return;
    }

    // selectedCategories 필드 초기화
    setValue(`cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`, []);
    // evaluation details 필드 초기화
    setValue(`cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.details`, []);
    // 하위 노드 선택 초기화
    setLeafNodeIdx(leafNodeIdxConfig);

    // 선택된 노드 업데이트해주고, cascader depth 증가
    setNdNodeIdx(selectedIdx);
    setCascaderDepth((cur) => cur + 1);
  };

  // 리프 selected 핸들러 ----------------------------------------------------------------------------------------------

  // details 업데이트용 필드
  const { append: detailsAppend, remove: detailsRemove } = useFieldArray({
    control,
    name: `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.details`,
  });

  // 핸들러
  const handleLeafNodeClick: HandleLeafNodeClick = (selectedIdx, selectedValue, selectedLabel) => {
    // 이미 선택된 노드인지 체크
    const isSelected = leafNodeIdx[selectedIdx];

    // 이미 선택된 노드라면 선택 해제
    if (isSelected) {
      //selectedCategories 값 제거
      const removeUpdateCategories = getValues(
        `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`,
      ).filter((categoryValue) => categoryValue !== selectedValue);

      // selectedCategories 업데이트
      setValue(
        `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`,
        removeUpdateCategories,
      );

      // 제거할 details 인덱스 찾기
      const removeDetailIdx = getValues(
        `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.details`,
      ).findIndex((detail) => detail.categoryValue === selectedValue);

      // details 객체 제거
      detailsRemove(removeDetailIdx);
    }
    // 선택되지 않은 노드라면 선택
    else {
      //selectedCategories 값
      const appendUpdateCategories = getValues(
        `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`,
      );

      // selectedCategories 추가
      setValue(`cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`, [
        ...appendUpdateCategories,
        selectedValue,
      ]);

      // details 객체 추가 (value와 label 함께 저장)
      detailsAppend(createEmptyDetailValue(selectedValue, selectedLabel));
    }

    // 리프 노드 선택 업데이트
    setLeafNodeIdx(leafNodeIdx.map((value, idx) => (idx === selectedIdx ? !value : value)));
  };

  // evaluationsIdx 변경 시 선택 상태 복원 -----------------------------------------------
  useEffect(() => {
    // 평가 시퀸스 업데이트
    updateEvaluationSequence();

    const cascaderTree =
      SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].category.cascaderTree;

    const selectedCategories = getValues(
      `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`,
    );

    // 사용자 카테고리 선택 상태 복원
    const restoredState = restoreNodeSelectionFromCategories(cascaderTree, selectedCategories);

    setStNodeIdx(restoredState.stNodeIdx);
    setNdNodeIdx(restoredState.ndNodeIdx);
    setLeafNodeIdx(restoredState.leafNodeSelected);
    setCascaderDepth(restoredState.cascaderDepth);
  }, [evaluationsIdx, cascaderTrees]);

  return {
    cuppingsIdx,
    // evaluationSequence
    evaluationSequence,
    updateEvaluationSequence,
    goToCategortSelect,
    // evaluationsIdx
    evaluationsIdx,
    handleEvaluationsIdx,
    // cascader depth
    cascaderDepth,
    nextCascaderDepth,
    prevCascaderDepth,
    // cascader
    stNodeIdx,
    ndNodeIdx,
    leafNodeIdx,
    handleStNodeClick,
    handleNdNodeClick,
    handleLeafNodeClick,
  };
}
