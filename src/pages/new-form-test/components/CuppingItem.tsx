import onlycup_logo_200 from '@/assets/images/onlycup_logo_200.png';
import { SelectInput } from '@/components/SelectInput';
import { EvaluationDrawer } from './EvaluationDrawer';
import useNewFormStore from '@/store/newFormStore';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';
import { DrawerCoffeeTitle } from './DrawerCoffeeTitle';

export default function CuppingItem({ cuppingsIdx }: { cuppingsIdx: number }) {
  const step = useNewFormStore((state) => state.step);

  const coffeeIdPath = `cuppings.${cuppingsIdx}.coffeeId` as const;

  const coffeeSelectConfig = SERVER_FORM_CONFIG.cuppingForm.basicInfo.coffeeSelect;

  return (
    <li className="flex w-full flex-col items-center justify-center gap-2 p-4">
      <EvaluationDrawer imgPath={onlycup_logo_200} cuppingsIdx={cuppingsIdx} />
      {/* TODO : useWatch 때문에 페이지 전체가 리렌더링되는데, ContentTitle을 확장해서 최적화 해볼까? */}
      {/* ContentTitle에서 useWatch를 사용해서 렌더링 범위 축소시키기 */}
      {step == 2 && <DrawerCoffeeTitle cuppingsIdx={cuppingsIdx} />}

      {/* 커피 select */}
      {step == 1 && (
        <SelectInput<RootCuppingFormValue> path={coffeeIdPath} config={coffeeSelectConfig} />
      )}
    </li>
  );
}
