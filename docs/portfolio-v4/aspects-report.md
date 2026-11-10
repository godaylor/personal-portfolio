# Aspect-ratio fixes and validation

2026-10-18. Implemented in `src/app/experience.css`; repeatable check in `scripts/verify-aspects.mjs`.

## What changed

- The project screen is sized from one dimension and keeps its 1.6 aspect ratio. Independent maximum width and fixed height no longer crop the real interface sideways on tall tablet/desktop viewports. The phone preview also preserves its 390/800 ratio.
- Stage height is bounded by available viewport height and the actual screen width. Tall portrait layouts no longer leave an unnecessarily large blank space below a width-constrained screen.
- Small portrait phones use a shorter stage and selector rail. At 320×568 the whole chosen project, caption, case action and all 3 selectors fit below the header.
- Short landscape uses a dedicated composition: 60px header, real desktop/phone screens on the left, caption/action on the right, 54px selector rail. Both 844×390 and568×320 keep the complete scene and controls visible.
- The hover affordance is now a 52px corner arrow with 18px inset. It does not wash over the whole screenshot. Touch does not retain a hover overlay; keyboard focus still shows the arrow and a 2px outline.

## Validation

Chrome development build at http://127.0.0.1:32802. Main matrix passed 32 combinations: 320×568,390×844,844×390,1024×768,1366×768,1920×1080,2560×1080,1080×1920 × RU/EN × light/dark. Each checked all 3 project scenes (96 layouts), preserved aspect ratio, visible caption/action/selectors, no overlapping caption or phone, 44px selector targets, full-page scrolling without horizontal overflow, case modal focus/close/Escape/restoration.

A targeted run after the new project assets arrived passed 320×568,844×390 and568×320 × RU/EN × light/dark, including the new Сборитм phone preview. Separate desktop and touch checks passed the 52px corner affordance, transparent overlay background and keyboard focus.

Evidence: `aspects/measurements.json`, `aspects/measurements-targeted.json` and viewport screenshots in `aspects/`. The development-only Next indicator appears in these diagnostic images; final public proof should be captured from the production build.

## Repeat

PowerShell:

```powershell
$env:PORTFOLIO_BASE_URL='http://127.0.0.1:32801'
node scripts/verify-aspects.mjs
```

Optional focused run:

```powershell
$env:PORTFOLIO_ASPECTS='320x568,844x390,568x320'
node scripts/verify-aspects.mjs
```

The development pass was followed by final production validation below. No app components, data, media or external projects were changed by this subtask.


## Final production validation

The final V4 production build at http://127.0.0.1:32801 passed all 9 sizes × RU/EN × light/dark on 2026-10-18: 36 combinations and 108 scene layouts. Sizes: 320×568, 390×844, 844×390, 568×320, 1024×768, 1366×768, 1920×1080, 2560×1080, 1080×1920. Every combination passed screen ratio and bounds, visible controls, caption/action/phone separation, full-scroll horizontal overflow checks, and case gallery focus/close/Escape restoration. No browser page errors.

Visually inspected fresh production screenshots at 320×568, 844×390 and 1080×1920. They show the current Сборитм desktop and mobile interfaces without cropped edges, overlapping captions, persistent hover masks or development indicators. All selected project controls remain visible.

Saved production measurements: `aspects/measurements-production.json`. The viewport screenshot files in `aspects/` now contain the final production captures. Production parity is confirmed; no code changes were made during this final pass.

