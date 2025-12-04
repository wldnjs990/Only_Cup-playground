import { ButtonCn } from '@/components/ui/button_cn';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function EvaluationNav({
  evaluationListPath,
  nowEvaluationLabelPath,
  setEIdx,
}: {
  evaluationListPath: `root.${number}.evaluationList`;
  nowEvaluationLabelPath: `root.${number}.evaluationList.${number}.label`;
  setEIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const evaluationList = getValues(evaluationListPath);
  const nowEvaluationLabel = getValues(nowEvaluationLabelPath);

  return (
    <nav className="flex gap-2">
      {evaluationList.map((evaluation, idx) => {
        const isCompleated = evaluation.category.valueList.length > 0;
        const isSelected = evaluation.label === nowEvaluationLabel;

        return (
          <ButtonCn
            key={evaluation.id}
            onClick={() => setEIdx(idx)}
            variant="outline"
            className={twMerge(
              'brightness-125 transition',
              clsx(isCompleated ? 'bg-green-300' : 'bg-rose-300'),
              clsx(isSelected && 'brightness-95'),
            )}
          >
            {evaluation.title}
          </ButtonCn>
        );
      })}
    </nav>
  );
}
