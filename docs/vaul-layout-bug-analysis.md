# Vaul Drawer 레이아웃 버그 분석 및 해결

## 📋 목차
- [문제 개요](#문제-개요)
- [증상](#증상)
- [원인 분석](#원인-분석)
- [시도한 해결 방법](#시도한-해결-방법)
- [근본 원인](#근본-원인)
- [최종 해결책](#최종-해결책)
- [참고 자료](#참고-자료)

---

## 문제 개요

`/new` 페이지에서 화면을 viewport 크기로 고정하려 했으나, 의도치 않은 세로 스크롤이 발생하는 문제

### 환경
- **프레임워크**: React 19.1.1
- **라우팅**: React Router 7.9.3
- **폼**: React Hook Form 7.63.0
- **UI 라이브러리**:
  - Shadcn UI (Radix UI 래퍼)
  - Vaul 1.x (Drawer 컴포넌트)
- **스타일링**: Tailwind CSS 4.1.12

---

## 증상

### 발생 조건
- **Step 1 (원두 선택 화면)**: 스크롤 발생 ❌
- **Step 2 (평가 화면)**: 정상 작동 ✅

### 현상
1. 전체 body에 의도치 않은 세로 스크롤 발생
2. 실제 컨텐츠는 viewport 내에 모두 들어감
3. 개발자 도구에서 body 크기는 375x667로 정상
4. 그러나 스크롤 가능한 높이는 그 이상으로 측정됨

### 시각적 증상
```
┌─────────────────────┐
│  body (375x667)     │  ← 높이는 정상
│  ┌───────────────┐  │
│  │ 흰색 카드     │  │
│  │ (정상 표시)   │  │
│  └───────────────┘  │
│                     │
│  [빈 공간 발생]     │  ← 스크롤 가능 영역
│                     │
└─────────────────────┘
```

---

## 원인 분석

### 1단계: 레이아웃 구조 분석

```
body (height: 100dvh)
└─ div#root
   └─ BrowserRouter
      └─ Layout > div (h-screen max-h-[100svh])
         └─ div (h-full)
            └─ TestFrame > main (h-full p-5 overflow-hidden)
               └─ section (h-full p-5 overflow-y-auto) ← 흰색 카드
                  └─ RHFContext > form (h-full flex-1)
                     └─ CuppingPage > section (h-full flex-1 flex-col gap-2)
                        ├─ RadioInput
                        ├─ ContentTitle (step 2만)
                        ├─ div (h-full flex-1 overflow-y-auto)
                        │  └─ ul (grid)
                        │     └─ CuppingItem (multiple)
                        │        ├─ EvaluationDrawer (Vaul)
                        │        └─ SelectInput (step 1만)
                        └─ div (버튼 영역)
```

### 2단계: Step별 차이점 분석

#### Step 1 (문제 발생)
- `SelectInput` 컴포넌트 렌더링 (Radix Select Portal 사용)
- `SettingDrawer` 컴포넌트 렌더링
- `EvaluationDrawer` 여러 개 (Vaul Drawer)

#### Step 2 (정상)
- `span` 태그만 렌더링 (Portal 없음)
- `ContentTitle` 추가
- `EvaluationDrawer` 동일

### 3단계: Canvas 요소 발견

개발자 도구에서 확인된 의문의 요소:

```html
<canvas popover="manual"
        style="inset: 0px; pointer-events: none; position: fixed;
               background-color: transparent; outline: none;
               box-shadow: none; border: none;
               width: 375px; height: 667px;">
</canvas>
```

**내부 해상도**: `width="750" height="1334"` (2배 Retina)

이 canvas의 **intrinsic size가 1334px**로 설정되어 있어 레이아웃 계산에 영향을 줌

---

## 시도한 해결 방법

### 시도 1: Flex-wrap 제거
```tsx
// Before
<ul className="flex flex-col flex-wrap sm:flex-row">

// After
<ul className="grid grid-cols-1 sm:grid-cols-2">
```
**결과**: ❌ 실패

### 시도 2: Flex-1 제거 (CuppingItem)
```tsx
// Before
<li className="flex w-full flex-1 flex-col ...">

// After
<li className="flex w-full flex-col ...">
```
**결과**: ❌ 실패

### 시도 3: Box-sizing 명시
```tsx
<main className="box-border flex h-full ...">
```
**결과**: ❌ 실패

### 시도 4: Canvas CSS 제어
```css
canvas[popover='manual'] {
  position: fixed !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
}
```
**결과**: ❌ 실패

### 시도 5: Root overflow 제어
```css
#root {
  height: 100%;
  overflow: hidden;
}
```
**결과**: ❌ 실패

### 시도 6: shouldScaleBackground={false}
```tsx
<Drawer shouldScaleBackground={false}>
```
**결과**: ❌ 실패 (canvas는 여전히 생성됨)

---

## 근본 원인

### Vaul 라이브러리의 설계 결함

#### 1. `usePositionFixed` 훅 (iOS Safari 버그 해결용)

**위치**: `node_modules/vaul/dist/index.mjs:770-814`

```javascript
function usePositionFixed({ isOpen, modal, nested, hasBeenOpened,
                           preventScrollRestoration, noBodyStyles }) {
    const setPositionFixed = React.useCallback(() => {
        if (!isSafari()) return;

        if (previousBodyPosition === null && isOpen && !noBodyStyles) {
            previousBodyPosition = {
                position: document.body.style.position,
                top: document.body.style.top,
                left: document.body.style.left,
                height: document.body.style.height,
                right: 'unset'
            };

            const { scrollX, innerHeight } = window;

            // ❌ 문제의 코드
            document.body.style.setProperty('position', 'fixed', 'important');
            Object.assign(document.body.style, {
                top: `-${scrollPos.current}px`,
                left: `-${scrollX}px`,
                right: '0px',
                height: 'auto'  // ← 이것이 문제!
            });
        }
    }, [isOpen]);
}
```

**문제점**:
1. iOS Safari의 스크롤 버그를 해결하기 위해 `body { position: fixed }`를 설정
2. `height: auto`로 변경하면서 **body의 높이 제약이 풀림**
3. Body 내부의 자식 요소들(특히 Portal)이 **실제 content 높이만큼 늘어남**
4. **모든 브라우저**에서 이 코드가 실행됨 (iOS만의 문제가 아님)

#### 2. Canvas 요소의 정체

**Canvas는 Vaul이 직접 생성하는 것이 아님!**

- 브라우저의 **Popover API**가 자동으로 생성하는 backdrop 요소
- Vaul은 Radix UI Dialog를 기반으로 하며, 특정 조건에서 Popover API 사용
- Canvas의 intrinsic size (750x1334)가 `height: auto` 상태의 body에 영향

#### 3. `shouldScaleBackground={false}`가 작동하지 않는 이유

```javascript
// Line 879
function Root({
    shouldScaleBackground = false,  // 기본값 false
    // ...
}) {
    // shouldScaleBackground는 배경 scale 애니메이션만 제어
    // usePositionFixed는 항상 실행됨!
}
```

**`shouldScaleBackground`의 실제 역할**:
- 배경 scale 애니메이션 on/off
- **body position fixed 설정과는 무관**

---

## 최종 해결책

### 현실적 해결 방안

#### 옵션 1: 임시 해결 (현재 적용)
```css
/* index.css */
#root {
  height: 100%;
  overflow: hidden;
}
```

**장점**:
- 빠른 해결
- body에 직접 손대지 않음

**단점**:
- 근본적 해결 아님
- 다른 페이지에 영향 가능성

#### 옵션 2: 라이브러리 교체 (권장)

**Radix UI Dialog를 Drawer 스타일로 커스터마이징**

```tsx
// drawer-radix.tsx (새로 생성)
import * as Dialog from '@radix-ui/react-dialog';

// Radix Dialog를 bottom sheet 스타일로 커스텀
// - position: fixed, bottom: 0
// - slide-up 애니메이션 추가
// - Vaul과 동일한 API 제공
```

**장점**:
- Canvas/Popover API 문제 없음
- 이미 Radix 사용 중이므로 호환성 좋음
- 더 안정적

**단점**:
- 마이그레이션 작업 필요
- 드래그 기능은 직접 구현해야 함

#### 옵션 3: 대체 라이브러리

**추천 라이브러리**:
1. **react-spring-bottom-sheet** - 부드러운 애니메이션
2. **react-modal-sheet** - 경량, 간단
3. **직접 구현** - Dialog + Framer Motion

---

## 기술적 학습 포인트

### 1. Box Model과 Position Fixed
- `position: fixed` + `height: auto` 조합은 예측 불가능한 레이아웃 생성
- 자식 요소의 intrinsic size가 부모 크기에 영향

### 2. Portal과 레이아웃
- Radix UI Portal은 `position: fixed`로 body에 직접 렌더링
- 일반적으로는 레이아웃에 영향 없음
- 하지만 부모(body)가 `height: auto`이면 영향을 줌

### 3. Browser API의 부작용
- Popover API의 canvas backdrop
- Intrinsic size vs CSS size 차이
- Retina 디스플레이 대응 (2배 해상도)

### 4. 라이브러리 선택의 중요성
- iOS Safari 버그 해결이 다른 브라우저에 부작용
- "Works on my machine"의 함정
- 크로스 브라우저 테스트 필수

---

## 참고 자료

### GitHub Issues
- [Drawer breaks canvas height · Issue #563](https://github.com/emilkowalski/vaul/issues/563)
- [Issues when adding max-height and overflow-y · Issue #575](https://github.com/emilkowalski/vaul/issues/575)
- [Page jumps to top when opening the drawer · Issue #318](https://github.com/emilkowalski/vaul/issues/318)

### 관련 문서
- [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
- [Popover API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- [iOS Safari Scrolling Bugs](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/usePreventScroll.ts)

### 대안 라이브러리
- [@xelene/vaul-with-scroll-fix](https://www.npmjs.com/package/@xelene/vaul-with-scroll-fix) - Vaul 포크 버전

---

## 결론

**Vaul 라이브러리는 iOS Safari 버그 해결을 위해 `body { position: fixed; height: auto }`를 사용하며, 이것이 모든 브라우저에서 레이아웃 버그를 유발합니다.**

**실무 권장사항**:
1. 단기: `#root { overflow: hidden }` 임시 적용
2. 중기: Radix Dialog 기반 커스텀 Drawer로 교체
3. 장기: 프로젝트 전반의 UI 라이브러리 일관성 확보

**교훈**:
- 라이브러리는 코드를 직접 확인하고 선택할 것
- 특정 플랫폼 버그 해결이 다른 환경에 미치는 영향 고려
- Shadcn UI처럼 코드를 직접 소유하는 방식의 장점
