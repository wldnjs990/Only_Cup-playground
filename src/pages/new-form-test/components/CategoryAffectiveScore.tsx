import { useCuppingEvaluationContext } from '@/contexts/CuppingEvaluationContext';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import SliderInput from '@/components/SliderInput';

export default function CategoryAffectiveScore({ detailsIdx }: { detailsIdx: number }) {
  const { cuppingsIdx, evaluationsIdx } = useCuppingEvaluationContext();

  const affectiveScorePath =
    `cuppings.${cuppingsIdx}.evaluations.${evaluationsIdx}.details.${detailsIdx}.affectiveScore` as const;

  const affectiveScoreConfig =
    SERVER_FORM_CONFIG.cuppingForm.evaluations[evaluationsIdx].detailEvaluation.affectiveScore;

  return <SliderInput path={affectiveScorePath} config={affectiveScoreConfig} />;
}
