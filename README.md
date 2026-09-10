# Liquid Glass Button Kit

React와 Next.js에서 사용할 수 있는 입체형 리퀴드 글라스 버튼 컴포넌트입니다.

`preview.html`을 브라우저에서 열면 설치 없이 네 가지 재질과 호버·클릭 효과를 확인할 수 있습니다.

첨부 영상의 두꺼운 캡슐형 유리, 어두운 반사면과 흐르는 색을 CSS 레이어로 재해석한 버튼 4종입니다. 이번 버전은 볼록한 렌즈의 입체감을 강조합니다. 중앙의 어두운 반사면, 양 끝의 곡면 반사, 하단에 모이는 밝은 굴절광, 접촉 그림자와 넓은 그림자를 각각 겹칩니다. `border: 0`을 유지하면서 그라디언트의 명암으로 두께를 표현합니다. 원본의 3D 굴절을 픽셀 단위로 복제한 구현은 아닙니다. 외부 이미지·폰트·애니메이션 패키지 없이 동작합니다.

기존 버전에서 업데이트할 때는 `glass-button.css`만 교체하면 됩니다. React 컴포넌트의 사용법은 같습니다. 기본·호버·토글 선택 상태에 장식용 테두리를 사용하지 않습니다. 키보드 탐색 시의 포커스 표시와 시스템 고대비 모드의 식별용 테두리는 유지합니다.

## 파일

- `glass-button.css`: 재질·상태·애니메이션. CSS만 사용할 때도 필요한 파일.
- `GlassButton.tsx`: React/Next.js용 TypeScript 컴포넌트. 포인터 반사광·기울기·클릭 파동 포함.
- `Demo.tsx`: React 사용 예시. 검색/AI/오디오 기능은 연결하지 않은 UI 데모.
- `preview.html`: 설치 없이 브라우저에서 열어보는 단독 데모. 동일 CSS를 내장했습니다.

## Next.js App Router

1. `GlassButton.tsx`와 `glass-button.css`를 `components/glass-button/`에 복사합니다.
2. `app/layout.tsx`에 스타일을 한 번 불러옵니다.

```tsx
import "@/components/glass-button/glass-button.css";
```

3. 버튼을 사용합니다. 이벤트 핸들러를 전달하는 부모는 Client Component로 작성합니다.

```tsx
"use client";

import { GlassButton } from "@/components/glass-button/GlassButton";

export default function Actions() {
  return (
    <GlassButton variant="aurora" onClick={() => console.log("clicked")}>
      시작하기
    </GlassButton>
  );
}
```

`@/` 경로 별칭이 없는 프로젝트는 실제 상대 경로로 바꾸세요. Pages Router는 `pages/_app.tsx`, 일반 React는 `main.tsx` 또는 `App.tsx`에서 CSS를 불러옵니다. 컴포넌트 자체는 CSS를 자동으로 가져오지 않습니다. React 18/19 스타일의 `forwardRef`를 사용합니다.

## 변형·상태

```tsx
<GlassButton variant="aurora" animate>Thinking…</GlassButton>
<GlassButton variant="chrome">Searching…</GlassButton>
<GlassButton variant="prism">Planning…</GlassButton>
<GlassButton variant="smoke">Listening…</GlassButton>

<GlassButton size="sm">작게</GlassButton>
<GlassButton size="lg" fullWidth>계속하기</GlassButton>
<GlassButton disabled>비활성</GlassButton>
<GlassButton loading={isSubmitting} loadingLabel="저장 중…">저장</GlassButton>
<GlassButton aria-pressed={selected} onClick={() => setSelected(!selected)}>
  즐겨찾기
</GlassButton>
<GlassButton iconOnly aria-label="추가">+</GlassButton>
```

| Prop | 기본값 | 기능 |
| --- | --- | --- |
| `variant` | `aurora` | `aurora`, `chrome`, `prism`, `smoke` |
| `size` | `md` | `sm` 44px, `md` 60px, `lg` 72px 최소 높이 |
| `animate` | `false` | 영상처럼 재질이 계속 흐름. 기본은 호버/로딩 중에 움직임 |
| `loading` | `false` | 중복 클릭 차단, `aria-busy`, 재질 애니메이션 |
| `loadingLabel` | 없음 | 로딩 중 표시 문구. 미지정 시 기존 children 유지 |
| `iconOnly` | `false` | 정사각 버튼. `aria-label`을 함께 지정 |
| `fullWidth` | `false` | 부모 너비 사용 |
| `style`, `className` | — | CSS 변수와 기존 스타일 조합 |

`type` 기본값은 `button`입니다. 폼 제출은 `type="submit"`을 지정하세요. 일반 button 속성과 `ref`를 전달할 수 있습니다. `onClick`에서 `preventDefault()`를 호출하면 추가 파동도 생략됩니다. 토글 상태는 부모가 `aria-pressed`로 관리합니다. 로딩 완료·오류 결과는 실제 서비스의 `role="status"` 영역에서 안내하세요.

## CSS 커스텀 / Tailwind 함께 사용

Tailwind 설치는 필수가 아닙니다. Tailwind는 레이아웃에 사용하고 버튼의 재질과 상태는 이 CSS로 유지할 수 있습니다.

```tsx
<div className="flex flex-wrap items-center gap-4">
  <GlassButton
    variant="prism"
    className="w-56 text-lg"
    style={{
      "--lg-height": "64px",
      "--lg-radius": "20px",
      "--lg-accent": "#70eaff",
      "--lg-duration": "7s",
      "--lg-depth": 1,
      "--lg-reflection": 0.9,
    }}
  >
    커스텀 버튼
  </GlassButton>
</div>
```

CSS 변수: `--lg-height` 높이, `--lg-radius` 둥글기, `--lg-color` 글자색, `--lg-accent` 포커스·선택색, `--lg-duration` 재질 움직임 주기, `--lg-blur` 배경 블러. `--lg-depth`는 곡면의 명암 강도(0~1, 기본 1), `--lg-reflection`은 하단 굴절광의 강도(0~1, 기본 0.9)입니다. 내부 색은 `.lg-button[data-variant="…"] .lg-button__material`의 gradient를 수정하세요. 영상 느낌은 어두운 배경에서 가장 잘 드러납니다.

Tailwind v4의 계층 규칙과 충돌을 피하려면 크기·둥글기는 위 CSS 변수나 `style`로 조절하세요. 비계층 CSS의 `padding`, `border-radius`는 같은 속성의 계층형 유틸리티보다 우선할 수 있습니다. `transform`, `animation`, `overflow`를 외부에서 덮어쓰면 인터랙션이 바뀝니다.

## CSS만 사용

```html
<link rel="stylesheet" href="glass-button.css">
<button type="button" class="lg-button" data-variant="aurora" data-animate="true">
  <span class="lg-button__material" aria-hidden="true"></span>
  <span class="lg-button__shine" aria-hidden="true"></span>
  <span class="lg-button__label">시작하기</span>
</button>
```

이 마크업만으로 재질, 호버 리프트, 눌림, 포커스가 작동합니다. 마우스를 따라 움직이는 빛·기울기와 클릭 지점의 파동에는 컴포넌트의 작은 이벤트 핸들러가 필요합니다. 단독 HTML의 스크립트도 참고할 수 있습니다.

## 동작·접근성

- 마우스: 호버 시 약 3px 떠오르고 반사광·재질이 움직입니다. 클릭 중 0.965배로 눌리고 클릭 지점에서 빛의 파동이 퍼집니다.
- 터치: 호버 기울기 없이 눌림과 파동이 동작합니다.
- 키보드: Tab 포커스 링, Enter/Space 네이티브 클릭. 키보드 클릭 파동은 중앙에서 시작합니다.
- `prefers-reduced-motion: reduce`: 재질 이동, 기울기, 파동을 끕니다.
- `forced-colors`: 재질을 숨기고 시스템 버튼 색과 테두리를 사용합니다.
- 배경 블러가 없는 환경에서도 그라디언트 재질은 남습니다. 실시간 광학 굴절이나 WebGL 셰이더는 사용하지 않습니다.
- 많은 버튼을 한 화면에 배치할 때는 기본값인 `animate={false}`를 권장합니다.

## 확인 범위

CSS/HTML 구조 및 JavaScript 구문을 정적으로 확인했습니다. 이번 수정에서는 브라우저 연결은 성공했으나, 환경의 URL 보안 정책이 로컬 미리보기 접근을 차단하여 실제 렌더링·상호작용 검증은 완료하지 못했습니다. React/Next.js 프로젝트 빌드도 수행하지 않았습니다. `preview.html`을 브라우저에서 열어 효과를 확인하고, 실제 프로젝트에서 버전·스타일과 함께 최종 확인하세요.
