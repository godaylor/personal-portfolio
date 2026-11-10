# Focused aspect-ratio audit

Date: 2026-10-18. Audited local production at http://127.0.0.1:32801 before V4 changes. Chrome, reduced motion for stable geometry. Read-only app/source audit.

## Actionable findings

1. **Tall desktop/tablet portrait crops real app edges.** At 1080×1920, `.project-reel__screen` measures 820.8×630 (ratio 1.303 instead of 1.6). The final CSS supplies a fixed height `calc(100cqh - 170px)` and independently limits `max-width:76%`. The width cap does not reduce the fixed height. `object-fit:cover` then cuts the left/right of RelayOps, including the logo, menu, incident title and columns. Set both dimensions from one bounded size, or give the screen a width constrained by both available stage height and viewport width, then `height:auto; aspect-ratio:1.6`. Evidence: `1080x1920-reel.png`; metrics: `report.json`.

2. **Short landscape cannot keep the scene and project selectors together.** At 844×390 the sticky header is90px, stage480px, rail97px; after selecting RelayOps, the scene starts y110, screen ends y475, caption starts y487, and selector rail starts y590. Most of the scene and all controls fall below the viewport. At320×568 the rail bottom is629, so the selector labels are cut off when the chosen scene scrolls to its start. A `(max-height:...) and (orientation:landscape)` composition should use a compact horizontal scene, shorter screen, caption beside it, and a44px selector rail; small portrait can reduce stage height when needed. Evidence: `844x390-reel.png`, `320x568-reel.png`.

## Passed focused checks

Tested320×568,390×844,844×390,1024×768,1366×768,1920×1080,2560×1080,1080×1920. No horizontal overflow on homepage or RelayOps case at any target size. Main nav, about, featured case and contact maintain readable columns without overlap. Screenshot gallery modal stays within96dvh; close button remains visible and hittable, receives focus, and Escape closes on every target. Screenshot image itself may scroll within a short modal, which is expected.

## Notes on evidence

Some reel and chapter screenshots show the hover arrow because automated clicking scrolls the target under the stationary mouse. This is a genuine hover state, not permanently painted UI. It is not reported as a functional defect. Move the pointer to the header before final showcase captures.

Gallery and featured section shots are diagnostic viewport captures at an intermediate scroll position; clipping by the viewport here does not imply that content is inaccessible.
