import { ButtonCn } from '@/components/ui/button_cn';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import clsx from 'clsx';
import { useFormContext, useWatch } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function EvaluationNav({
  cuppingsIdx,
  evaluationsIdx,
  setEvaluationsIdx,
}: {
  cuppingsIdx: number;
  evaluationsIdx: number;
  setEvaluationsIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { control } = useFormContext<RootCuppingFormValue>();

  // evaluations config
  const evaluations = SERVER_FORM_CONFIG.cuppingForm.evaluations;

  return (
    <nav className="flex justify-between">
      {evaluations.map((evaluation, idx) => {
        // TODO : useWatch로 성능저하 발생하고 있음. 컴포넌트로 묶어서 렌더링 최적화하기

        // selectedCategories data
        const selectedCategories = useWatch({
          control,
          name: `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.selectedCategories`,
        });

        // 카테고리 체크 완료됐는지 체크
        const isCompleated = selectedCategories.length > 0;
        // 현재 선택된 내비게이션인지 체크
        const isSelected = idx === evaluationsIdx;

        return (
          <ButtonCn
            key={evaluation.id}
            onClick={() => setEvaluationsIdx(evaluationsIdx)}
            variant="outline"
            className={twMerge(
              'w-1/5 brightness-100 transition',
              clsx(isCompleated ? 'bg-purple-500 text-white' : 'bg-rose-300'),
              clsx(isSelected && 'brightness-130'),
            )}
          >
            {evaluation.title}
          </ButtonCn>
        );
      })}
    </nav>
  );
}
