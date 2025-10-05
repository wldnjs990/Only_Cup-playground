import MainEvaluation from './MainEvaluation';
import type { EvaluationRootSchema } from '@/types/new_naming';
import { useCallback, useState } from 'react';
import { useFormContext, type FieldPath } from 'react-hook-form';
import { AnimatePresence, motion } from 'motion/react';
import TestFrame from './TestFrame';
import SequenceButton from './SequenceButton';

export default function MainEvaluationTest({
  setSequence,
}: {
  setSequence: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}) {
  // 현재 주소
  const nowPath = 'main_evaluations';
  // useFormContext 가져오기
  const { getValues } = useFormContext<EvaluationRootSchema>();
  // 메인 평가지 배열(참조용)
  const mainEvaluations = getValues(nowPath);
  // 탭 인덱스
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // 다음으로 넘어갈때 multiple selection 하나라도 체크됐는지 검증하기 위한 path배열
  // useCallback으로 메모이제이션 처리
  // TODO : 경로 배열 만드는거 재사용 가능하다면 공용 함수 만들어보기
  const getNowCheckedPaths = useCallback(() => {
    const paths: FieldPath<EvaluationRootSchema>[] = [];
    mainEvaluations.forEach((mainEvaluation, idx) => {
      const savePath = `${nowPath}.${idx}` as FieldPath<EvaluationRootSchema>;
      mainEvaluation.multiple_selections.forEach((_, idx) => {
        paths.push(
          `${savePath}.multiple_selections.${idx}.now_checked` as FieldPath<EvaluationRootSchema>,
        );
      });
    });
    return paths;
  }, []);

  // 검증할 값들 경로등록
  const nowCheckedPaths = getNowCheckedPaths();

  // 입력값 검증 함수
  // TODO : 지금 입력값 검증을 RHF trigger 같은거 사용 안하고 야매로 구현했는데, 추후에 zod등 배워서 제대로 검증 구현하기
  const multipleCheckValidate = () => {
    const errorPath = nowCheckedPaths.find((nowCheckedPath) => {
      // 현재 경로의 now_checked값을 가져와 하나라도 체크되어있는지 검증
      const now_checked = getValues(nowCheckedPath);
      if (Number(now_checked) < 1) return true;
    });
    if (errorPath) {
      const pathArr = errorPath.split('.');
      const rootPath = `${pathArr[0]}.${pathArr[1]}.title` as FieldPath<EvaluationRootSchema>;
      const errorTitle = getValues(rootPath);
      alert(`${errorTitle} 평가를 완료해주세요!`);
      return false;
    }
    return true;
  };

  return (
    <TestFrame className={'flex-row-reverse'}>
      {/* 메인 폼 네비게이션 */}
      {/* TODO : 네비게이션 바 렌더링 최적화 하기(selectedTab 상태를 사용하는게 문제인거 같은데..) */}
      <nav className="flex h-full flex-col justify-between bg-[#fdfdfd] p-2">
        <ul className="flex w-40 flex-col">
          {mainEvaluations?.map((item, idx) => {
            const { id, title } = item;
            return (
              <motion.li
                key={id}
                initial={false}
                animate={{
                  backgroundColor: idx === selectedTab ? '#eee' : '#eee0',
                }}
                className="relative flex h-6 w-full min-w-0 flex-1 cursor-pointer items-center justify-between rounded-[5px] rounded-b-none bg-white px-[15px] py-[10px] text-[#0f1115] select-none"
                onClick={() => setSelectedTab(idx)}
              >
                {title}
                {idx === selectedTab ? <motion.div layoutId="underline" id="underline" /> : null}
              </motion.li>
            );
          })}
        </ul>
        <article className="flex flex-col gap-1">
          <SequenceButton
            text="이전"
            onClick={() => {
              setSequence(1);
            }}
          />
          <SequenceButton
            text="다음"
            onClick={() => {
              // 다중 체크 요소 1개라도 체크 안 된 파트 있는지 확인되면 다음 단계 이동
              if (multipleCheckValidate()) {
                setSequence(3);
              }
            }}
          />
        </article>
      </nav>
      {/* 메인 폼 (감각 묘사 평가, 정동 평가) */}
      <section className="h-[100dvh] min-h-0 flex-1 overflow-y-auto px-5 py-15">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-[600px]"
          >
            {mainEvaluations ? (
              <MainEvaluation key={selectedTab} idx={selectedTab} parentPath={nowPath} />
            ) : (
              <div>평가지가 없습니다.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </TestFrame>
  );
}
