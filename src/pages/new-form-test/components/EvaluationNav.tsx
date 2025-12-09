import { ButtonCn } from '@/components/ui/button_cn';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export default function EvaluationNav() {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const { evaluationListPath, evaluationPath, setNavIdx } = useCuppingEvaluationContext();

  const evaluationList = getValues(evaluationListPath);

  const nowEvaluationLabel = getValues(`${evaluationPath}.label`);

  return (
    <nav className="flex justify-between">
      {evaluationList.map((evaluation, idx) => {
        const isCompleated = evaluation.category.valueList.length > 0;
        const isSelected = evaluation.label === nowEvaluationLabel;

        return (
          <ButtonCn
            key={evaluation.id}
            onClick={() => setNavIdx(idx)}
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
