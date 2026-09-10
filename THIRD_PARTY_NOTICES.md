# Third-party notices

This repository uses open-source packages through pnpm. Package names, resolved
versions and transitive dependencies are recorded in `pnpm-lock.yaml`; run
`pnpm licenses list --prod` for the license inventory of the installed tree.

Material direct dependencies include:

| Surface | Packages | License family |
| --- | --- | --- |
| Framework | Next.js, React, React DOM | MIT |
| Styling | Tailwind CSS, tailwind-merge, animation helpers | MIT |
| UI primitives | Radix UI packages | MIT |
| Icons | Lucide React | ISC |
| Motion | Motion | MIT |
| Content | Content Collections, React Markdown, Remark/Rehype, Shiki | MIT |
| Validation and utilities | Zod, clsx | MIT |
| Browser verification | Playwright Test | Apache-2.0 |

Geist and Geist Mono are loaded through `next/font`; their font licensing is
retained by the package-provided assets. Project imagery currently consists of
original CSS-generated interface placeholders and locally captured screenshots
of this portfolio. No third-party product screenshots are shipped.

The original Magic UI Portfolio template attribution is documented separately
in `ATTRIBUTION.md`, and its MIT copyright notice remains in `LICENSE`.
