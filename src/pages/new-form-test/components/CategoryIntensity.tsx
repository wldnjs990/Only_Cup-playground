import RadioInput from '@/components/RadioInput';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';

export default function CategoryEvaluation({ detailsIdx }: { detailsIdx: number }) {
  const { cuppingsIdx, evaluationsIdx } = useCuppingEvaluationContext();

  const intensityConfig =
    SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].detailEvaluation.intensity;

  const intensityPath =
    `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.details.${detailsIdx}.intensity` as const;

  return (
    <article>
      {/* intensity radio */}
      <RadioInput
        path={intensityPath}
        config={intensityConfig}
        className="flex w-full items-center justify-center p-4"
      />
    </article>
  );
}
