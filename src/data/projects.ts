import type { Locale } from "@/lib/i18n";
import type { PortfolioProject } from "./resume";

// Verified against each project's repository, handoff and public URL on 2026-09-20.
// VariantLab is intentionally excluded until the owner explicitly approves publication.
const entries = [
  {
    slug: "relayops", title: "RelayOps", featured: true, visual: "cobalt",
    status: ["Production", "Production"],
    stack: ["React", "TypeScript", "Hono", "PostgreSQL", "WebSocket"],
    links: [
      { label: "Live", href: "https://relayops-godaylor.onrender.com" },
      { label: "GitHub", href: "https://github.com/godaylor/relayops" },
    ],
    cover: ["/projects/relayops.png", "RelayOps: комната инцидента с журналом событий", "RelayOps incident room with a durable event timeline"],
    ru: {
      summary: "Платформа реагирования на инциденты: сервисы, сигналы, решения и восстановление в одном процессе.",
      description: "RelayOps помогает инженерной команде понять влияние сбоя, назначить действия и сохранить проверяемую хронологию от первого сигнала до восстановления. Production работает на Render и Neon.",
      contribution: "Спроектировал домен Service → Signal → Incident, incident workbench и response board, API-границы авторизации, append-only timeline, transactional outbox, realtime-восстановление и production-контур. Проект — самостоятельная производная Kaneo с сохранённой MIT-атрибуцией.",
      results: [
        "Публичный сценарий создания, ведения и завершения инцидента проходит с сохранением после reload.",
        "Идемпотентные команды и transactional outbox не дублируют инцидент при потере ответа и повторе запроса.",
        "Server-side фильтрация, виртуализированный workbench и saved views сохраняют состояние в URL.",
        "808 тестов в 10 задачах и 13 browser-сценариев прошли в release-проверке.",
      ],
      architecture: [
        "Typed Hono API → workspace authorization → PostgreSQL transaction; изменения и outbox фиксируются атомарно.",
        "WebSocket инвалидирует клиентские данные, а reconnect всегда перечитывает PostgreSQL как источник истины.",
      ],
      boundaries: "Базовый single-instance flow не требует Redis, SMTP, S3 или внешних интеграций. Render Free может просыпаться после паузы.",
    },
    en: {
      summary: "Incident response across services, signals, decisions and recovery in one connected workflow.",
      description: "RelayOps helps an engineering team understand impact, coordinate actions and retain an auditable timeline from the first signal through recovery. Production runs on Render and Neon.",
      contribution: "Designed the Service → Signal → Incident domain, incident workbench and response board, API authorization boundaries, append-only timeline, transactional outbox, realtime recovery and production runtime. It is an independent Kaneo derivative with MIT attribution retained.",
      results: [
        "The public create → respond → resolve journey persists correctly across reloads.",
        "Idempotent commands and a transactional outbox prevent duplicate incidents after a lost response and retry.",
        "Server-side filtering, a virtualized workbench and saved views keep operational state shareable in the URL.",
        "808 tests across 10 tasks and 13 browser scenarios passed the release verification.",
      ],
      architecture: [
        "Typed Hono API → workspace authorization → PostgreSQL transaction; domain changes and outbox records commit atomically.",
        "WebSocket invalidates client data while reconnects always refetch PostgreSQL as the source of truth.",
      ],
      boundaries: "The core single-instance flow needs no Redis, SMTP, S3 or external integrations. Render Free may need a cold start.",
    },
  },
  {
    slug: "signal-studio", title: "Signal Studio", featured: true, visual: "violet",
    status: ["Production · вход", "Production · sign-in"],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma"],
    links: [
      { label: "Live", href: "https://signal-studio-smoky.vercel.app" },
      { label: "GitHub", href: "https://github.com/godaylor/signal-studio" },
    ],
    cover: ["/projects/signal-studio.png", "Signal Studio: конструктор аналитического запроса Query Spine", "Signal Studio Query Spine analytics builder"],
    ru: {
      summary: "Product intelligence workspace: от продуктовых событий к insights, дашбордам и аудиториям.",
      description: "Signal Studio превращает сырые события продукта в повторяемые аналитические вопросы. Query Spine оставляет определение анализа видимым, воспроизводимым и доступным по URL.",
      contribution: "Спроектировал продуктовую модель Studio, Query Spine, интерфейсы анализа, executors, saved insights, dashboards и audiences, усилил auth/permissions, onboarding источников и release-инфраструктуру. Это MIT-трансформация Umami с явным разделением собственного и upstream-кода.",
      results: [
        "Один контракт анализа связывает фильтры, breakdown, сравнение периодов, drill-down и shareable URL.",
        "Точные временные диапазоны и timezone-aware bucketing проверены на PostgreSQL.",
        "Путь source → query → insight → dashboard → audience → export покрыт интеграционными и browser-тестами.",
        "Все 6 CI jobs прошли для текущей Vercel + Neon конфигурации.",
      ],
      architecture: [
        "Next.js API и scoped permissions отделяют workspace-данные; Prisma/PostgreSQL хранят продуктовые события и saved entities.",
        "Сборка, миграции и background exports разделены, чтобы deploy не запускал небезопасные изменения схемы.",
      ],
      boundaries: "Публична страница входа; self-registration и открытый demo-аккаунт не заявлены. Полная production acceptance аналитического пути ещё продолжается.",
    },
    en: {
      summary: "A product-intelligence workspace that turns product events into insights, dashboards and audiences.",
      description: "Signal Studio turns raw product events into reusable analytical questions. Query Spine keeps each analysis definition visible, reproducible and shareable by URL.",
      contribution: "Designed the Studio product model, Query Spine, analysis interfaces and executors, saved insights, dashboards and audiences; hardened auth/permissions, source onboarding and release infrastructure. It is an MIT transformation of Umami with explicit source boundaries.",
      results: [
        "One analysis contract connects filters, breakdowns, period comparison, drill-down and a shareable URL.",
        "Exact time ranges and time-zone-aware bucketing are verified against PostgreSQL.",
        "The source → query → insight → dashboard → audience → export path has integration and browser coverage.",
        "All 6 CI jobs passed for the current Vercel + Neon configuration.",
      ],
      architecture: [
        "Next.js APIs and scoped permissions isolate workspace data; Prisma/PostgreSQL store events and saved entities.",
        "Builds, migrations and background exports are separated so deployment cannot apply unsafe schema changes implicitly.",
      ],
      boundaries: "The public URL exposes sign-in; self-registration and a public demo account are not claimed. Full production acceptance of the analytics journey is still in progress.",
    },
  },
  {
    slug: "opsweave", title: "OpsWeave", featured: true, visual: "coral",
    status: ["Production", "Production"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Playwright"],
    links: [
      { label: "Live", href: "https://opsweave.onrender.com" },
      { label: "GitHub", href: "https://github.com/godaylor/opsweave" },
    ],
    cover: ["/projects/opsweave.png", "OpsWeave: инцидент и следующий шаг playbook", "OpsWeave incident with the next playbook action"],
    ru: {
      summary: "Playbook-оркестрация инцидентов с человеческими решениями и неизменяемой историей выполнения.",
      description: "OpsWeave показывает следующий безопасный шаг во время инцидента, останавливается на задачах и approvals, а затем сохраняет точную историю выполнения для разбора и повторного запуска.",
      contribution: "Создал самостоятельную архитектуру продукта, Node/PostgreSQL execution engine и auth, транзакционную идемпотентность/replay, React-интерфейс RU/EN, incoming API, release package и production deploy. Раннее Novu-исследование отделено от опубликованного runtime.",
      results: [
        "Публичный путь playbook → incident → task → approval → timer → completion проходит на desktop и mobile.",
        "Сохранённый run cursor и deadlines продолжают workflow после sleep/restart бесплатного хоста.",
        "Schema-scoped transaction locks и idempotency защищают переходы при параллельных запросах.",
        "Guest workspace, account sessions и scoped API keys изолируют доступ к данным.",
      ],
      architecture: [
        "Same-origin Node API и React UI работают поверх приватной PostgreSQL schema.",
        "Server loop продвигает только сохранённый cursor и атомарно записывает effects; клиент перечитывает authoritative state.",
      ],
      boundaries: "Это personal-workspace продукт без team RBAC, SSO, email recovery, внешней доставки и parallel DAG. Render Free может просыпаться после паузы.",
    },
    en: {
      summary: "Incident playbook orchestration with human decisions and a durable execution history.",
      description: "OpsWeave surfaces the next safe action during an incident, pauses for tasks and approvals, then retains an exact execution history for review and replay.",
      contribution: "Built the standalone product architecture, Node/PostgreSQL execution engine and auth, transactional idempotency/replay, RU/EN React interface, incoming API, release package and production deployment. The earlier Novu exploration is separated from the published runtime.",
      results: [
        "The public playbook → incident → task → approval → timer → completion journey passes on desktop and mobile.",
        "A persisted run cursor and deadlines resume workflows after free-host sleep or restart.",
        "Schema-scoped transaction locks and idempotency protect transitions under concurrent requests.",
        "Guest workspaces, account sessions and scoped API keys isolate access to data.",
      ],
      architecture: [
        "A same-origin Node API and React UI run over a private PostgreSQL schema.",
        "The server loop advances only the persisted cursor and records effects atomically; the client refetches authoritative state.",
      ],
      boundaries: "This is a personal-workspace product without team RBAC, SSO, email recovery, external delivery or parallel DAGs. Render Free may need a cold start.",
    },
  },
  {
    slug: "napoli", title: "Napoli", featured: true, visual: "coral",
    status: ["Production", "Production"],
    stack: ["React", "TypeScript", "Redux Toolkit", "Vite", "PostgreSQL"],
    links: [
      { label: "Live", href: "https://napoli-pizza-tau.vercel.app" },
      { label: "GitHub", href: "https://github.com/godaylor/napoli-pizza" },
    ],
    cover: ["/projects/napoli.jpg", "Napoli: каталог пиццерии с фильтрами", "Napoli pizzeria catalog with filters"],
    ru: {
      summary: "Гостевой pizza-delivery flow: 36 позиций, конфигуратор, checkout, заказ и отслеживание.",
      description: "Napoli проводит пользователя от поиска и настройки блюда до delivery/pickup checkout, подтверждения и reload-safe tracking — без обязательной регистрации и без сбора карточных данных.",
      contribution: "Заменил учебный runtime самостоятельной продуктовой архитектурой и интерфейсом: strict TypeScript/Vite, каталог и media pipeline, URL-контракты, pricing/configuration domain, Redux/RTK Query, durable cart, RU/EN, recovery states и server-order extension.",
      results: [
        "36-позиционный каталог поддерживает поиск, категории, availability/dietary filters и shareable URL.",
        "Canonical fingerprints сохраняют разные размеры и модификации одного продукта как отдельные cart items.",
        "Идемпотентный server order переживает потерю ответа, reload и повтор запроса без дубликатов.",
        "Production путь cart → checkout → persisted order → tracking/history проверен поверх Vercel + PostgreSQL.",
      ],
      architecture: [
        "React Router владеет URL state; RTK Query — catalog/quote server state; Redux slices — cart, fulfillment и favorites.",
        "Vercel Function заново проверяет snapshot заказа и сохраняет его через ограниченную PostgreSQL role.",
      ],
      boundaries: "Оплата и courier tracking демонстрационные; реальные реквизиты карты не собираются. Account sync не заявлен.",
    },
    en: {
      summary: "A guest-first pizza delivery flow with 36 items, configuration, checkout, ordering and tracking.",
      description: "Napoli takes a customer from discovery and configuration through delivery/pickup checkout, confirmation and reload-safe tracking—without mandatory registration or card collection.",
      contribution: "Replaced the learning runtime with an independent product architecture and interface: strict TypeScript/Vite, catalog and media pipeline, URL contracts, pricing/configuration domain, Redux/RTK Query, durable cart, RU/EN, recovery states and a server-order extension.",
      results: [
        "A 36-item catalog supports search, categories, availability/dietary filters and shareable URL state.",
        "Canonical fingerprints preserve distinct sizes and modifications as separate cart items.",
        "Idempotent server orders survive a lost response, reload and retry without duplicates.",
        "The production cart → checkout → persisted order → tracking/history journey is verified on Vercel + PostgreSQL.",
      ],
      architecture: [
        "React Router owns URL state; RTK Query owns catalog/quote server state; Redux slices own cart, fulfillment and favorites.",
        "A Vercel Function revalidates the order snapshot and persists it through a restricted PostgreSQL role.",
      ],
      boundaries: "Payment and courier tracking are simulations; no real card details are collected. Account sync is not claimed.",
    },
  },
  {
    slug: "solecraft", title: "Solecraft", featured: false, visual: "cyan",
    status: ["Production", "Production"],
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Supabase"],
    links: [
      { label: "Live", href: "https://solecraft-two.vercel.app" },
      { label: "GitHub", href: "https://github.com/godaylor/solecraft" },
    ],
    cover: ["/projects/solecraft.png", "Solecraft: каталог кроссовок с fit-first фильтрами", "Solecraft fit-first sneaker catalog"],
    ru: {
      summary: "Fit-first магазин кроссовок: подбор по посадке, точный SKU и безопасный guest/account checkout.",
      description: "Solecraft помогает сравнивать ширину, амортизацию и поддержку, выбрать точный colorway/размер и провести заказ без потери SKU-идентичности.",
      contribution: "Трансформировал legacy storefront в strict typed продукт: discovery и visual system, domain/data boundaries, RU/EN, responsive/accessibility, Supabase schema/Auth/RLS/atomic checkout, automated browser coverage и Vercel deployment contract.",
      results: [
        "URL-driven каталог объединяет search, facets, sorting и pagination; PDP имеет canonical colorway URL.",
        "Versioned guest cart/wishlist детерминированно сливаются с account state после входа.",
        "Checkout повторно проверяет цену и остаток, создавая заказ атомарно и идемпотентно.",
        "RLS allow/deny paths и guest receipt capability проверены для production Supabase.",
      ],
      architecture: [
        "URL владеет discovery state; TanStack Query — server state; Zustand хранит только versioned guest IDs и quantity.",
        "Supabase Auth и RLS изолируют пользовательские данные; server checkout повторно проверяет catalog truth.",
      ],
      boundaries: "Магазин использует fictional product media. Custom SMTP и полная manual assistive-technology проверка остаются эксплуатационными follow-ups.",
    },
    en: {
      summary: "A fit-first sneaker store with precise SKU identity and safe guest/account checkout.",
      description: "Solecraft helps customers compare width, cushioning and support, select an exact colorway/size and complete an order without losing SKU identity.",
      contribution: "Transformed a legacy storefront into a strict typed product: discovery and visual system, domain/data boundaries, RU/EN, responsive/accessibility work, Supabase schema/Auth/RLS/atomic checkout, browser coverage and a Vercel deployment contract.",
      results: [
        "A URL-driven catalog combines search, facets, sorting and pagination; PDPs use canonical colorway URLs.",
        "Versioned guest cart/wishlist state merges deterministically with an account after sign-in.",
        "Checkout revalidates price and stock, then creates the order atomically and idempotently.",
        "RLS allow/deny paths and a guest receipt capability are verified against production Supabase.",
      ],
      architecture: [
        "The URL owns discovery state; TanStack Query owns server state; Zustand stores only versioned guest IDs and quantities.",
        "Supabase Auth and RLS isolate user data; server checkout revalidates catalog truth.",
      ],
      boundaries: "The store uses fictional product media. Custom SMTP and full manual assistive-technology review remain operational follow-ups.",
    },
  },
  {
    slug: "folio", title: "Folio", featured: false, visual: "violet",
    status: ["Production", "Production"],
    stack: ["React", "TypeScript", "Vite", "Playwright", "LocalStorage"],
    links: [
      { label: "Live", href: "https://folio-crypto-godaylor.maxeemzhuparov.chatgpt.site" },
      { label: "GitHub", href: "https://github.com/godaylor/crypto-portfolio" },
    ],
    cover: ["/projects/folio.png", "Folio: обзор криптопортфеля и показателей P&L", "Folio crypto portfolio overview and P&L metrics"],
    ru: {
      summary: "Приватный crypto tracker с реальными ценами, purchase accounting, P&L и переносимыми backup.",
      description: "Folio показывает стоимость активов относительно фактических покупок без подключения биржевого аккаунта. Данные портфеля остаются в браузере, а котировки приходят из публичных market API.",
      contribution: "Создал самостоятельное React/TypeScript приложение, расчётный домен, market adapters с fallback, storage/recovery, RU/EN UX, responsive/accessibility, тесты, CI и публичный static hosting.",
      results: [
        "Purchase lots с комиссиями дают weighted average cost, current value, unrealized P&L и ROI.",
        "Coinbase/Kraken adapters получают котировки 12 монет, показывают источник/время и stale/fallback состояния.",
        "Versioned persistence переживает reload и cross-tab updates; corrupt data изолируется вместо потери портфеля.",
        "Validated JSON backup/restore и CSV export переносят данные без облачного аккаунта.",
      ],
      architecture: [
        "Браузер валидирует purchase lots, агрегирует holdings и сохраняет versioned local portfolio.",
        "Market adapter кэширует котировки и переключается между провайдерами; history хранит только реальные дневные наблюдения.",
      ],
      boundaries: "Нет cloud sync, trading, sales accounting или выдуманного historical backfill. Это локальный personal tracker.",
    },
    en: {
      summary: "A private crypto tracker with live prices, purchase accounting, P&L and portable backups.",
      description: "Folio compares current asset value with actual purchases without connecting an exchange account. Portfolio data stays in the browser while quotes come from public market APIs.",
      contribution: "Built the independent React/TypeScript application, calculation domain, market adapters with fallback, storage/recovery, RU/EN UX, responsive/accessibility work, tests, CI and public static hosting.",
      results: [
        "Purchase lots with fees produce weighted average cost, current value, unrealized P&L and ROI.",
        "Coinbase/Kraken adapters fetch quotes for 12 coins and expose source, time, stale and fallback states.",
        "Versioned persistence survives reloads and cross-tab updates; corrupt data is isolated instead of losing the portfolio.",
        "Validated JSON backup/restore and CSV export make data portable without a cloud account.",
      ],
      architecture: [
        "The browser validates purchase lots, aggregates holdings and persists a versioned local portfolio.",
        "The market adapter caches quotes and falls back across providers; history contains only actual daily observations.",
      ],
      boundaries: "There is no cloud sync, trading, sales accounting or fabricated historical backfill. This is a local personal tracker.",
    },
  },
  {
    slug: "replaylab", title: "ReplayLab", featured: false, visual: "lime",
    status: ["Локальный release", "Local release"],
    stack: ["React", "TypeScript", "Yjs", "IndexedDB", "BlockSuite"],
    links: [],
    cover: ["/projects/replaylab.png", "ReplayLab: редактор баскетбольной комбинации", "ReplayLab basketball play editor"],
    ru: {
      summary: "Local-first редактор баскетбольных комбинаций с playback, offline-режимом и разрешением конфликтов.",
      description: "ReplayLab позволяет двум тренерам создавать комбинации на половине площадки, работать офлайн, синхронизироваться после reconnect и явно разбирать смысловые конфликты.",
      contribution: "Создал самостоятельный продуктовый слой поверх 4 проверенных BlockSuite packages: тактический domain, responsive editor, playback, collaboration/recovery contracts, narrow framework adapters, release packaging и provenance inventory.",
      results: [
        "10 игроков, derived ball, 2–12 фаз и 4 типа действий формируют воспроизводимый playback.",
        "IndexedDB остаётся authoritative локально, Yjs синхронизирует комнаты, а конфликты title/cues решаются явно.",
        "Versioned emergency journal восстанавливает committed gestures и черновики после аварийного закрытия renderer.",
        "74 теста и 10 повторов immediate-close прошли isolated release verification.",
      ],
      architecture: [
        "Local-first state отделён от узких editor/sync adapters; сервер хранит восстановимую сетевую копию.",
        "Desktop поддерживает authoring, tablet — playback и редактирование, mobile — semantic review и playback.",
      ],
      boundaries: "Публичный repository и Live URL пока отсутствуют; upstream AFFiNE checkout не публикуется как собственный код. Название ожидает отдельной mark/domain проверки.",
    },
    en: {
      summary: "A local-first basketball play editor with playback, offline work and explicit conflict resolution.",
      description: "ReplayLab lets two coaches build half-court plays, continue offline, synchronize after reconnect and resolve meaningful conflicts explicitly.",
      contribution: "Built the independent product layer over 4 reviewed BlockSuite packages: tactical domain, responsive editor, playback, collaboration/recovery contracts, narrow framework adapters, release packaging and provenance inventory.",
      results: [
        "10 players, a derived ball, 2–12 phases and 4 action types produce deterministic playback.",
        "IndexedDB stays authoritative locally, Yjs synchronizes rooms, and title/cue conflicts are resolved explicitly.",
        "A versioned emergency journal restores committed gestures and drafts after abrupt renderer termination.",
        "74 tests and 10 immediate-close repetitions passed isolated release verification.",
      ],
      architecture: [
        "Local-first state is separated from narrow editor/sync adapters; the server retains a recoverable network copy.",
        "Desktop supports authoring, tablet supports playback and editing, and mobile supports semantic review and playback.",
      ],
      boundaries: "A public repository and Live URL do not exist yet; the upstream AFFiNE checkout is not presented as owned code. The working title still needs independent mark/domain review.",
    },
  },
] as const;

export function getProjects(locale: Locale): PortfolioProject[] {
  return entries.map(entry => {
    const copy = entry[locale];
    return {
      slug: entry.slug,
      title: entry.title,
      featured: entry.featured,
      visual: entry.visual,
      status: locale === "ru" ? entry.status[0] : entry.status[1],
      summary: copy.summary,
      description: copy.description,
      contribution: copy.contribution,
      stack: [...entry.stack],
      results: [...copy.results],
      architectureHighlights: [...copy.architecture],
      boundaries: copy.boundaries,
      links: entry.links.map(link => ({ ...link })),
      cover: { src: entry.cover[0], alt: locale === "ru" ? entry.cover[1] : entry.cover[2] },
    };
  });
}
