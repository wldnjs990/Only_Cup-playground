import { useFormContext, useWatch } from 'react-hook-form';
import type { RootCuppingFormValue } from '@/types/new/form_values_schema';
import { getOptionLabel } from '@/utils/getOptionLabel';
import { SERVER_FORM_CONFIG } from '@/constants/new/server_config_mock';

interface DrawerCoffeeTitleProps {
  cuppingsIdx: number;
}

/**
 * Drawer 타이틀: coffeeId를 실시간으로 표시
 * useWatch를 사용하여 리렌더링 범위를 이 컴포넌트로 제한
 */
export function DrawerCoffeeTitle({ cuppingsIdx }: DrawerCoffeeTitleProps) {
  const { control } = useFormContext<RootCuppingFormValue>();

  const coffeeIdPath = `cuppings.${cuppingsIdx}.coffeeId` as const;

  const coffeeId = useWatch({ control, name: coffeeIdPath });
  const coffeeLabel = getOptionLabel(
    SERVER_FORM_CONFIG.cuppingForm.basicInfo.coffeeSelect.optionList,
    coffeeId,
  );
  return <span>{coffeeLabel}</span>;
}
