import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useNewFormStore from '@/store/newFormStore';
import EvaluationContent from './EvaluationContent';
import { DrawerCoffeeTitle } from './DrawerCoffeeTitle';

export function EvaluationDrawer({
  imgPath,
  cuppingsIdx,
}: {
  imgPath: string;
  cuppingsIdx: number;
}) {
  const step = useNewFormStore((state) => state.step);

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
            <DrawerTitle>
              {/* useWatch로 리렌더링 범위를 DrawerCoffeeTitle 컴포넌트로 제한 */}
              {/* TODO : CuppingItem에 있는 coffeeId 쓰는 값도 렌더링 최적화 해야하는데, ContentTitle을 확장성있게 수정하자 */}
              {/* title이 필요한 데이터를 title 또는 path로 받아서 처리할 수 있도록 수정해보자(아니면 useWatch 렌더링용 컴포넌트를 새로 만들던가) */}
              <DrawerCoffeeTitle cuppingsIdx={cuppingsIdx} />
            </DrawerTitle>
            {/* sr-only 라는 테일윈드 유틸 클래스는 스크린 리더에만 보일수 있도록 UI를 가리는 역할 */}
            <DrawerDescription className="sr-only">
              선택하신 커핑 평가를 이곳에서 할 수 있습니다.
            </DrawerDescription>
          </DrawerHeader>
          {/* 컨텐츠 (카테고리 -> 강도 평가 -> 정동평가) */}
          <EvaluationContent cuppingsIdx={cuppingsIdx} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
