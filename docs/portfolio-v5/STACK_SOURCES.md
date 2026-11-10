# Источники технологического стека

Дата сверки: 23 октября 2026 года. Документ собран по уже проверенным манифестам,
активным исходным файлам и отчётам восьми проектов. Повторный запуск приложений
или изменение соседних репозиториев для этого документа не выполнялись.

Стек означает **технологии, применённые в представленных проектах**. Это не оценка
личной экспертизы, стажа, авторства сторонних библиотек или уровня владения каждым
инструментом. Прямые зависимости, браузерные API и платформы размещения обозначены
раздельно по смыслу. Транзитивные пакеты не использованы для расширения списка.

## Главная: 41 позиция в шести группах

Составные позиции `Rust / WebAssembly`, `Redux Toolkit / RTK Query` и
`Motion / Framer Motion` считаются одной позицией каждая. FFmpeg — отдельная
позиция; вместе с Rust/WASM относится к группе графики и медиа.

| Группа | Позиции | Количество |
| --- | --- | ---: |
| Frontend | React; TypeScript; Next.js; Vite; Tailwind CSS; Sass / CSS Modules | 6 |
| Состояние, формы и маршруты | TanStack Query; Redux Toolkit / RTK Query; Zustand; React Router; TanStack Router; React Hook Form | 6 |
| Backend и API | Node.js; Hono; Zod; Better Auth; WebSockets | 5 |
| Данные и хранение | PostgreSQL; Drizzle ORM; Prisma; Supabase; IndexedDB; localStorage | 6 |
| Графика и медиа | Rust / WebAssembly; Yjs; BlockSuite; Motion / Framer Motion; Three.js; WebCodecs; Mediabunny; FFmpeg | 8 |
| Качество и выпуск | Vitest; Testing Library; Playwright; axe-core; MSW; Lighthouse; Docker; GitHub Actions; Vercel; Render | 10 |
| **Всего** | | **41** |

## Проверяемые источники

Все ссылки ведут в фактические соседние исходные проекты. Запись в манифесте
проверялась вместе с активным кодом там, где важно отличить применяемую функцию
от сохранённой зависимости наследованного приложения.

| Технологии | Где подтверждено применение |
| --- | --- |
| React, TypeScript, Vite, Tailwind CSS | [RelayOps web package.json](E:/Projects/PetProjects/01-relayops/apps/web/package.json). React/TS/Vite также подтверждены активными манифестами Napoli, Solecraft, ReplayLab и Долемера. |
| Next.js | [Signal Studio package.json](E:/Projects/PetProjects/02-signal-studio/package.json), [VariantLab web package.json](E:/Projects/PetProjects/03-variantlab/apps/web/package.json). |
| Sass, CSS Modules | [Napoli package.json](E:/Projects/PetProjects/06-napoli/package.json), [Solecraft package.json](E:/Projects/PetProjects/07-solecraft/package.json); активные `.module.scss` в исходниках этих приложений. |
| TanStack Query, TanStack Router | [RelayOps web package.json](E:/Projects/PetProjects/01-relayops/apps/web/package.json), [router](E:/Projects/PetProjects/01-relayops/apps/web/src/tanstack/router.tsx), активные query/mutation hooks в `apps/web/src/hooks`. Query также прямая зависимость самостоятельного OpsWeave. |
| Redux Toolkit, RTK Query | [Napoli store](E:/Projects/PetProjects/06-napoli/src/redux/store.ts), [catalogApi](E:/Projects/PetProjects/06-napoli/src/features/catalog/api/catalogApi.ts). |
| Zustand | [Solecraft guestCartStore](E:/Projects/PetProjects/07-solecraft/src/entities/cart/model/guestCartStore.ts), [guestWishlistStore](E:/Projects/PetProjects/07-solecraft/src/entities/wishlist/model/guestWishlistStore.ts). |
| React Router | [Solecraft createAppRouter](E:/Projects/PetProjects/07-solecraft/src/app/router/createAppRouter.tsx), [Napoli App](E:/Projects/PetProjects/06-napoli/src/App.tsx). |
| React Hook Form | [Napoli Checkout](E:/Projects/PetProjects/06-napoli/src/pages/Checkout.tsx), [OpsWeave standalone package.json](E:/Projects/PetProjects/04-opsweave/scripts/opsweave-standalone/package.json). |
| Node.js, Hono, Zod | [RelayOps API package.json](E:/Projects/PetProjects/01-relayops/apps/api/package.json), [incident commands](E:/Projects/PetProjects/01-relayops/apps/api/src/relayops/incident-commands.ts), [analytics router](E:/Projects/PetProjects/01-relayops/apps/api/src/relayops/analytics-router.ts). Самостоятельный OpsWeave запускает Node HTTP server, а не исторический NestJS runtime. |
| Better Auth | [RelayOps auth](E:/Projects/PetProjects/01-relayops/apps/api/src/auth.ts), [VariantLab web package.json](E:/Projects/PetProjects/03-variantlab/apps/web/package.json). |
| PostgreSQL, Drizzle ORM | [RelayOps API package.json](E:/Projects/PetProjects/01-relayops/apps/api/package.json) и активные incident/service controllers; [OpsWeave standalone package.json](E:/Projects/PetProjects/04-opsweave/scripts/opsweave-standalone/package.json) подтверждает прямой `pg`. |
| Prisma | [Signal Studio Prisma client](E:/Projects/PetProjects/02-signal-studio/src/lib/prisma.ts), [PostgreSQL export storage](E:/Projects/PetProjects/02-signal-studio/src/server/exports/postgres-storage.ts). |
| Supabase SDK / Auth / PostgreSQL | [Solecraft supabaseClient](E:/Projects/PetProjects/07-solecraft/src/shared/api/supabaseClient.ts), [AuthProvider](E:/Projects/PetProjects/07-solecraft/src/app/providers/AuthProvider.tsx), [catalog repository](E:/Projects/PetProjects/07-solecraft/src/entities/product/api/supabaseCatalogRepository.ts). |
| IndexedDB | [ReplayLab facade](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/src/facade.ts): активный `IndexedDBDocSource` из BlockSuite sync. Это браузерный API хранения, не npm-пакет. |
| localStorage | [Долемер App](E:/Projects/PetProjects/08-crypto-portfolio/frontend/src/App.tsx), [market cache](E:/Projects/PetProjects/08-crypto-portfolio/frontend/src/market.ts), [themes](E:/Projects/PetProjects/08-crypto-portfolio/frontend/src/themes.tsx). Это браузерный API. |
| Rust / WebAssembly | [VariantLab WASM Cargo.toml](E:/Projects/PetProjects/03-variantlab/rust/wasm/Cargo.toml), [WASM media-time adapter](E:/Projects/PetProjects/03-variantlab/apps/web/src/wasm/media-time.ts). Манифест подключает собственные domain/render crates через прямые workspace paths. |
| Yjs, BlockSuite, RxJS | [ReplayLab foundation package.json](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/package.json), [facade](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/src/facade.ts), [domain](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/src/domain.ts). BlockSuite — явно сторонний framework, не авторская разработка портфолио. |
| WebSockets | [ReplayLab network source](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/src/network-source.ts), [awareness](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/src/awareness.ts), [server entry](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/src/server-entry.ts). |
| Motion / Framer Motion | [RelayOps signal scene](E:/Projects/PetProjects/01-relayops/apps/web/src/components/relayops/signal-scene.tsx), [Долемер package.json](E:/Projects/PetProjects/08-crypto-portfolio/frontend/package.json), [visuals](E:/Projects/PetProjects/08-crypto-portfolio/frontend/src/visuals.tsx). |
| Three.js | [Долемер sculpture scene](E:/Projects/PetProjects/08-crypto-portfolio/frontend/src/sculpture-scene.ts), [package.json](E:/Projects/PetProjects/08-crypto-portfolio/frontend/package.json). |
| WebCodecs, Mediabunny, Web Workers | [VariantLab export worker](E:/Projects/PetProjects/03-variantlab/apps/web/src/variantlab/export-worker.ts), [media worker](E:/Projects/PetProjects/03-variantlab/apps/web/src/variantlab/media-worker.ts), [Mediabunny adapter](E:/Projects/PetProjects/03-variantlab/apps/web/src/media/mediabunny.ts). WebCodecs и Workers — браузерные API. |
| FFmpeg | [VariantLab server-render handoff](E:/Projects/PetProjects/03-variantlab/docs/SITES_RENDER_HANDOFF.md), [connected architecture](E:/Projects/PetProjects/03-variantlab/docs/CONNECTED_SITES.md): проверенный серверный медиапайплайн и native render/export. Не приписывается браузерному WebCodecs-пути. |
| Vitest, Testing Library, MSW | [Solecraft package.json](E:/Projects/PetProjects/07-solecraft/package.json), [cart integration test](E:/Projects/PetProjects/07-solecraft/src/routes/cart/CartRoute.integration.test.tsx), [MSW test](E:/Projects/PetProjects/07-solecraft/src/test/msw.test.ts). |
| Playwright, axe-core | [Solecraft package.json](E:/Projects/PetProjects/07-solecraft/package.json), [ReplayLab foundation package.json](E:/Projects/PetProjects/05-replaylab/standalone/packages/replaylab/foundation/package.json); используются в реальных browser/accessibility suites. |
| Lighthouse | [Napoli performance audit](E:/Projects/PetProjects/06-napoli/scripts/performance-audit.mjs), [Solecraft package.json](E:/Projects/PetProjects/07-solecraft/package.json). |
| Docker, Render | [RelayOps Dockerfile](E:/Projects/PetProjects/01-relayops/Dockerfile.kaneo), [Render config](E:/Projects/PetProjects/01-relayops/render.yaml), [ReplayLab production verification](E:/Projects/PetProjects/05-replaylab/standalone/docs/PRODUCTION_VERIFICATION.md). Платформа размещения не означает собственную реализацию облачной инфраструктуры. |
| GitHub Actions, Vercel | [Napoli CI](E:/Projects/PetProjects/06-napoli/.github/workflows/ci.yml), [Vercel config](E:/Projects/PetProjects/06-napoli/vercel.json), [Solecraft build/deploy scripts](E:/Projects/PetProjects/07-solecraft/package.json). |

## Компактные массивы для восьми кейсов

Массивы отражают фактическую реализацию конкретного приложения, а не весь стек
его исторического upstream. В них могут быть дополнительные подтверждённые
инструменты кейса, которых нет в 41 позиции главной: например, Mocha, Chart.js,
next-intl, RxJS, Service Worker, OPFS, D1/R2 и Sites.

```ts
const projectStacks: Record<string, string[]> = {
  relayops: [
    "React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Router",
    "TanStack Query", "Framer Motion", "Node.js", "Hono", "Zod",
    "Better Auth", "Drizzle ORM", "PostgreSQL", "WebSockets", "Playwright",
  ],
  "signal-studio": [
    "React", "TypeScript", "Next.js", "Node.js", "TanStack Query",
    "Prisma", "PostgreSQL", "Zod", "Chart.js", "next-intl", "Motion",
    "Vitest", "Testing Library", "Playwright", "Docker",
  ],
  opsweave: [
    "React", "TypeScript", "Vite", "CSS", "TanStack Query",
    "React Hook Form", "Node.js", "PostgreSQL", "Mocha", "Playwright",
    "Docker", "Render",
  ],
  napoli: [
    "React", "TypeScript", "Vite", "React Router", "Redux Toolkit",
    "RTK Query", "React Hook Form", "Sass", "Node.js", "PostgreSQL",
    "Supabase", "Vitest", "Testing Library", "Playwright", "Vercel",
  ],
  solecraft: [
    "React", "TypeScript", "Vite", "React Router", "TanStack Query",
    "Zustand", "Sass", "CSS Modules", "Supabase", "PostgreSQL",
    "Vitest", "Testing Library", "MSW", "Playwright", "Vercel",
  ],
  folio: [
    "React", "TypeScript", "Vite", "CSS", "Motion", "Three.js", "SVG",
    "Canvas API", "localStorage", "Playwright", "axe-core", "ESLint",
    "GitHub Actions", "Sites",
  ],
  replaylab: [
    "React", "TypeScript", "Vite", "Yjs", "BlockSuite", "RxJS",
    "WebSockets", "Node.js", "IndexedDB", "Supabase", "PostgreSQL",
    "Service Worker", "Docker", "Playwright", "axe-core",
  ],
  variantlab: [
    "Rust / WebAssembly", "React", "TypeScript", "Next.js", "Tailwind CSS",
    "Zustand", "WebCodecs", "Mediabunny", "FFmpeg", "IndexedDB / OPFS",
    "Web Workers", "Better Auth", "Cloudflare D1", "Cloudflare R2", "Playwright",
  ],
};
```

## Границы формулировок

- **Supabase у Napoli:** это хост PostgreSQL для серверного order API через
  прямую зависимость `pg`. Позиция не заявляет использование Supabase SDK или Auth.
  Источник: [Napoli handoff](E:/Projects/PetProjects/06-napoli/PORTFOLIO_HANDOFF.md)
  и [package.json](E:/Projects/PetProjects/06-napoli/package.json).
- **Supabase у Solecraft:** SDK, Auth, PostgreSQL и RLS действительно входят в
  действующую архитектуру. Клиентские и серверные границы описаны в
  [handoff](E:/Projects/PetProjects/07-solecraft/PORTFOLIO_HANDOFF.md).
- **Supabase у ReplayLab:** hosted persistence использует Supabase Postgres/Data
  API; клиент не получает database secret. Это не заявление о Supabase Auth.
  Источник: [handoff](E:/Projects/PetProjects/05-replaylab/standalone/PORTFOLIO_HANDOFF.md)
  и текущий [production report](E:/Projects/PetProjects/05-replaylab/standalone/docs/PRODUCTION_VERIFICATION.md).
- **VariantLab:** массив для опубликованного connected-варианта называет
  **Cloudflare D1 / R2**, а не подменяет его целевым self-hosted
  PostgreSQL / Redis / MinIO deployment. Последний остаётся отдельным вариантом.
  Источники: [CONNECTED_SITES](E:/Projects/PetProjects/03-variantlab/docs/CONNECTED_SITES.md),
  [SITES_RENDER_HANDOFF](E:/Projects/PetProjects/03-variantlab/docs/SITES_RENDER_HANDOFF.md)
  и [ARCHITECTURE](E:/Projects/PetProjects/03-variantlab/docs/ARCHITECTURE.md).
- **FFmpeg** относится к серверному экспорту VariantLab. Браузерный экспорт
  использует WebCodecs/Mediabunny; эти реализации не объединяются в ложное
  утверждение о браузерном FFmpeg.
- **Долемер:** приложение сохраняет портфель локально и получает публичные
  котировки. Собственный backend, Node API, Redux или сторонняя chart-библиотека
  не приписаны. SVG, Canvas и localStorage названы как браузерные средства.
- **OpsWeave:** используется самостоятельный Node/Postgres runtime. NestJS,
  MongoDB и другие технологии исторического Novu-дерева не переносятся в кейс.
- **Не включены без нужного подтверждения:** Kafka, ClickHouse, Electron, GPUI,
  исторические Enterprise-пакеты. Redis не включён в основной стек RelayOps:
  fan-out с ним необязателен для работающего single-instance сценария.
- Проверки технологий и манифестов не означают, что каждая текущая публичная
  интеграция заново проверена 23 октября. Датированные runtime/deployment claims
  остаются в отчётах соответствующих проектов.
