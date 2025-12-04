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
import type { TRootCuppingFormSchema } from '@/types/new/new_form_schema';
import { useFormContext } from 'react-hook-form';
import EvaluationContent from './EvaluationContent';

export function EvaluationDrawer({
  imgPath,
  basicInfoTitlePath,
  evaluationListPath,
}: {
  imgPath: string;
  basicInfoTitlePath: `root.${number}.basicInfo.title`;
  evaluationListPath: `root.${number}.evaluationList`;
}) {
  const { getValues } = useFormContext<TRootCuppingFormSchema>();

  const step = useNewFormStore((state) => state.step);

  const BasicInfoTitle = getValues(basicInfoTitlePath);

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
            {/* sr-only 라는 테일윈드 유틸 클래스는 스크린 리더에만 보일수 있도록 UI를 가리는 역할 */}
            <DrawerDescription className="sr-only">
              선택하신 커핑 평가를 이곳에서 할 수 있습니다.
            </DrawerDescription>
          </DrawerHeader>
          {/* 컨텐츠 (카테고리 - 강도 평가 - 정동평가) */}
          <div className="h-80 overflow-y-scroll p-4 pb-0">
            <EvaluationContent evaluationListPath={evaluationListPath} />
          </div>
          {/* 컨텐츠 */}
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
