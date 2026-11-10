# Focused portfolio verification — 23 October 2026

The final local production build at http://127.0.0.1:32801 passed the focused home check in Chrome: RU/EN × light/dark × 320×568, 390×844, 844×390, 1440×1000 = 16 combinations. The rerun followed the final technology-section CSS refinement. Browser viewports are emulated, not physical device tests.

Confirmed on every home combination:

- Six technology groups and 41 unique tool labels; every group links to at least two localized project cases.
- No horizontal overflow or clipped stack labels, project links or contact actions.
- The actual navigation links scroll the stack/contact sections below the normal sticky header.
- The contact heading is exactly «Контакты» / «Contact», with the old slogan absent. Email link and clipboard copy work.
- Theme controls work; mobile language switching works in both directions.
- Aster uses its new v5 cover. The old Dolemer title/film and stale local-only/public-previous-interface tags are absent.
- No browser page errors.

The original full run also passed all 8 cases × RU/EN at 320px and 1440px: 16 routes and 32 case layouts. Full technology counts are 15 for Сборитм, 15 for Кинорит, 12 for Дежурно, 15 for Napoli, 15 for Solecraft, 14 for Aster, 15 for Пятый темп, 15 for Просто монтаж. All main gallery images loaded; all three Aster v5 images were individually selected and decoded. The final follow-up changed only home technology presentation, so the full case pass is retained rather than unnecessarily repeated.

Evidence:

- `copy-stack-results.json`: original complete home/case results.
- `copy-stack-home-results.json`: final rebuilt home-only rerun.
- `stack-desktop.png`, `stack-mobile.png`, `contact-desktop.png`, `contact-mobile.png`: final four proof images, all visually inspected. Full-section captures temporarily omit fixed header/skip-link paint so these overlays do not appear in the middle of a tall section screenshot. Normal header/anchor behavior was separately checked without that capture-only style.

The final stack images show plain tool labels and headings that use the available width; the former white pill backgrounds and forced narrow heading wraps are gone. No actionable visual issue was found in these four final captures.

Only `scripts/verify-copy-stack.mjs` and verification artifacts were changed by this subtask. App source, data and CSS were not edited. Public deployment verification belongs to the orchestrating agent.

