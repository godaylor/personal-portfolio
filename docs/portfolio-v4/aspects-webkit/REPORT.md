# WebKit extreme-resize diagnosis

Date: 2026-10-18. Final V4 production build at http://127.0.0.1:32801.

The reported 320px dark-theme overflow is a transient WebKit viewport update, not a persistent application layout defect.

- Direct 320px dark: document/body scrollWidth stayed 320 from the first measurement through 2 seconds.
- 7680px light → 320px dark: immediate scrollWidth 485, with the previous 80px gutter still applied to some content. After two animation frames plus 100ms, scrollWidth was 320 and stayed 320.
- Full 22-width light sequence ending at 7680px → 320px dark: the same immediate 485 → settled 320 behavior. No persistent out-of-bounds content. The only remaining negative rectangle is the decorative reel backdrop, deliberately contained by the stage's clipping.

Raw selector rectangles and timing snapshots: `diagnostics.json`. Settled visual evidence: `matrixLightTo320dark-100.png`, `matrixLightTo320dark-1000.png`, and the equivalent direct/7680-only captures. The later screenshot also confirms the dark theme's text colors finish updating correctly.

Updated only the layout test's wait in `scripts/verify-browser.mjs`: after its existing two animation frames, it polls for the document scroll extent for at most 1500ms. The original overflow assertion still runs afterward and still fails permanent overflow. Non-timeout browser errors are rethrown. No application CSS or components changed.

Full production WebKit verification then passed: routes and metadata, project actions/links, 320/1440 layouts, both languages and themes at 22 widths from 320 to 7680px, keyboard/anchors/history/theme/contact, denied clipboard fallback, failed-image fallback, and no unexpected runtime errors. Process exited 0.
