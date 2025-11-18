import { ButtonCn } from '@/components/ui/button_cn';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useNewFormStore from '@/store/newFormStore';
import type { Evaluation, SelectInput, TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useState } from 'react';
import { useFormContext, type FieldPath } from 'react-hook-form';
import EvaluationContent from './EvaluationContent';

export function EvaluationDrawer({
  imgPath,
  basicInfoTitlePath,
  evaluationListPath,
}: {
  imgPath: string;
  basicInfoTitlePath: FieldPath<TRootCuppingFormSchema>;
  evaluationListPath: FieldPath<TRootCuppingFormSchema>;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const step = useNewFormStore((state) => state.step);

  const BasicInfoTitle = getValues(basicInfoTitlePath) as SelectInput;
  const evaluationList = getValues(evaluationListPath) as Evaluation[];

  // 일단 평가순서는 고정요소로 박아두자
  const [eIdx, setEIdx] = useState<number>(0);
  const nowEvaluationPath = `${evaluationListPath}.${eIdx}` as const;

  return (
    <Drawer>
      <DrawerTrigger
        asChild
        onClick={(e) => {
          if (step === 1) e.preventDefault();
        }}
      >
        {/* Todo 이거 버튼을 체크할때마다 꾸며주자(꽃 고르면 꽃 달아주기 등) */}
        <img src={imgPath} alt="커핑 평가 버튼" className="h-40 w-40 rounded-full border" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{BasicInfoTitle.selectedName}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <EvaluationContent nowEvaluationPath={nowEvaluationPath} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <ButtonCn variant="outline">닫기</ButtonCn>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
