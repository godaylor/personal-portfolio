import type { Locale } from "@/lib/i18n";
import type { PortfolioProject } from "./resume";

// Public entry points checked for V3; see docs/UX_CONTENT_PASS.md.
const entries = [
  {
    slug: "relayops", title: "RelayOps", featured: true, visual: "cobalt",
    status: ["Можно попробовать", "Try it online"],
    stack: ["React", "TypeScript", "Hono", "PostgreSQL", "WebSocket"],
    links: [
      { label: "Live", href: "https://relayops-godaylor.onrender.com" },
      { label: "GitHub", href: "https://github.com/godaylor/relayops" },
    ],
    cover: ["/projects/relayops.png", "RelayOps: комната инцидента с журналом событий", "RelayOps incident room with a durable event timeline"],
    ru: {
      summary: "Сервис для ИТ-команд: помогает распределить работу при сбое и проследить, как его устранили.",
      tryIt: "Создайте инцидент, назначьте ответственного и отметьте проблему решённой.",
      access: "Есть гостевой вход. После простоя запуск может занять несколько минут.",
      description: "Команда видит, какой сервис сломался, кто занимается восстановлением и какие решения уже приняты.",
      contribution: "Разработал работу с инцидентами, доску задач, журнал событий и обновления для участников команды.",
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
      boundaries: "Бесплатный хостинг засыпает при простое. Для проверки не нужны внешние интеграции.",
    },
    en: {
      summary: "An app for IT teams to assign work during an outage and track how it was resolved.",
      tryIt: "Create an incident, assign an owner and mark it resolved.",
      access: "Guest access is available. Startup after inactivity can take a few minutes.",
      description: "The team can see which service failed, who is restoring it and what decisions have been made.",
      contribution: "Built incident management, the response board, event history and live updates for the team.",
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
      boundaries: "Free hosting sleeps when idle. No external integrations are needed to try the app.",
    },
  },
  {
    slug: "signal-studio", title: "Signal Studio", featured: true, visual: "violet",
    status: ["Демо без регистрации", "Demo without sign-in"],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma"],
    links: [
      { label: "Live", href: "https://signal-studio-smoky.vercel.app/demo" },
      { label: "GitHub", href: "https://github.com/godaylor/signal-studio" },
    ],
    cover: ["/projects/signal-studio-v3.png", "Signal Studio: анализ вымышленных событий в публичном демо", "Signal Studio analysis of fictional events in the public demo"],
    ru: {
      summary: "Аналитика для продуктовых команд: помогает понять, чем пользуются люди и на каком шаге уходят.",
      tryIt: "Пройдите пример от событий до анализа, панели и экспорта.",
      access: "Без регистрации, на вымышленных данных. Изменения демо сбрасываются после обновления страницы.",
      description: "Фильтры и сравнение периодов помогают изучить действия пользователей. Результаты можно сохранить в общий отчёт.",
      contribution: "Разработал конструктор анализа, сохранение отчётов, общие панели и выбор групп пользователей.",
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
      boundaries: "Для подключения своего источника и сохранения реальных данных нужен аккаунт от администратора.",
    },
    en: {
      summary: "Analytics for product teams to see what people use and where they drop off.",
      tryIt: "Follow the example from events to analysis, dashboard and export.",
      access: "No sign-in, with fictional data. Demo changes reset when the page reloads.",
      description: "Filters and period comparisons help teams explore user activity and save the results in a shared report.",
      contribution: "Built the analysis builder, saved reports, shared dashboards and user groups.",
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
      boundaries: "Connecting your own source and saving real data requires an account from an administrator.",
    },
  },
  {
    slug: "opsweave", title: "OpsWeave", featured: true, visual: "coral",
    status: ["Можно попробовать", "Try it online"],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Playwright"],
    links: [
      { label: "Live", href: "https://opsweave.onrender.com" },
      { label: "GitHub", href: "https://github.com/godaylor/opsweave" },
    ],
    cover: ["/projects/opsweave.png", "OpsWeave: инцидент и следующий шаг инструкции", "OpsWeave incident with the next procedure step"],
    ru: {
      summary: "Пошаговые инструкции для дежурных инженеров: помогают не пропустить действия при сбое.",
      tryIt: "Откройте гостевой режим, запустите инструкцию и пройдите задачу с подтверждением.",
      access: "Можно попробовать гостем. После простоя запуск может занять несколько минут.",
      description: "Приложение ведёт по шагам инструкции, ждёт подтверждений и записывает, что было сделано.",
      contribution: "Создал выполнение инструкций, задачи и подтверждения, историю действий и интерфейс на двух языках.",
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
      boundaries: "Для личной работы: нет командных ролей и отправки внешних уведомлений.",
    },
    en: {
      summary: "Step-by-step procedures for on-call engineers to avoid missing actions during an outage.",
      tryIt: "Enter as a guest, run a procedure and complete a task and an approval.",
      access: "You can try it as a guest. Startup after inactivity can take a few minutes.",
      description: "The app walks through a procedure, waits for approvals and records what was done.",
      contribution: "Built procedure execution, tasks and approvals, action history and the bilingual interface.",
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
      boundaries: "Designed for individual use; team roles and external notifications are not included.",
    },
  },
  {
    slug: "napoli", title: "Napoli", featured: true, visual: "coral",
    status: ["Можно попробовать", "Try it online"],
    stack: ["React", "TypeScript", "Redux Toolkit", "Vite", "PostgreSQL"],
    links: [
      { label: "Live", href: "https://napoli-pizza-tau.vercel.app" },
      { label: "GitHub", href: "https://github.com/godaylor/napoli-pizza" },
    ],
    cover: ["/projects/napoli.jpg", "Napoli: каталог пиццерии с фильтрами", "Napoli pizzeria catalog with filters"],
    ru: {
      summary: "Демо пиццерии для покупателей: выбор блюд, корзина и заказ доставки или самовывоза.",
      tryIt: "Выберите пиццу, измените размер и оформите пробный заказ.",
      access: "Без регистрации. Оплата и доставка демонстрационные; деньги не списываются.",
      description: "Можно подобрать пиццу по составу, изменить размер и добавки, затем посмотреть итоговую стоимость заказа.",
      contribution: "Разработал каталог, настройку блюд, корзину, оформление и сохранение заказов, интерфейс RU/EN.",
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
      boundaries: "Заказ сохраняется, но настоящей оплаты, доставки и синхронизации аккаунта нет.",
    },
    en: {
      summary: "A demo pizzeria for customers to choose food and order delivery or pickup.",
      tryIt: "Choose a pizza, change its size and place a sample order.",
      access: "No sign-up. Payment and delivery are simulated; you will not be charged.",
      description: "Choose a pizza by ingredients, adjust its size and extras, then see the total order price.",
      contribution: "Built the catalog, food options, cart, checkout, saved orders and RU/EN interface.",
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
      boundaries: "Orders are saved, but real payment, delivery and account sync are not included.",
    },
  },
  {
    slug: "solecraft", title: "Solecraft", featured: false, visual: "cyan",
    status: ["Можно попробовать", "Try it online"],
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Supabase"],
    links: [
      { label: "Live", href: "https://solecraft-two.vercel.app" },
      { label: "GitHub", href: "https://github.com/godaylor/solecraft" },
    ],
    cover: ["/projects/solecraft.png", "Solecraft: каталог кроссовок с подбором посадки", "Solecraft sneaker catalog with fit filters"],
    ru: {
      summary: "Демо магазина кроссовок: помогает покупателю сравнить посадку и выбрать цвет и размер.",
      tryIt: "Отфильтруйте каталог, выберите размер и добавьте пару в корзину.",
      access: "Можно без входа; аккаунт — по ссылке из письма. Покупки демонстрационные.",
      description: "Каталог позволяет сравнивать ширину, амортизацию и поддержку, а затем оформить пробный заказ.",
      contribution: "Разработал подбор обуви, карточку товара, корзину, оформление заказа и сохранение покупок в аккаунте.",
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
      boundaries: "Реальной оплаты и доставки нет. Оценки посадки демонстрационные.",
    },
    en: {
      summary: "A demo sneaker shop for customers to compare fit and choose a colour and size.",
      tryIt: "Filter the catalog, choose a size and add a pair to your cart.",
      access: "Guest shopping is available; account sign-in uses an email link. Purchases are simulated.",
      description: "The catalog compares width, cushioning and support, then lets you place a sample order.",
      contribution: "Built shoe discovery, product pages, cart, checkout and account order history.",
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
      boundaries: "No real payment or delivery. Fit ratings are illustrative.",
    },
  },
  {
    slug: "folio", title: "Folio", featured: false, visual: "violet",
    status: ["Можно попробовать", "Try it online"],
    stack: ["React", "TypeScript", "Vite", "Playwright", "LocalStorage"],
    links: [
      { label: "Live", href: "https://folio-crypto-godaylor.maxeemzhuparov.chatgpt.site" },
      { label: "GitHub", href: "https://github.com/godaylor/crypto-portfolio" },
    ],
    cover: ["/projects/folio.png", "Folio: обзор криптопортфеля и показателей P&L", "Folio crypto portfolio overview and P&L metrics"],
    ru: {
      summary: "Учёт криптовалюты для владельца портфеля: показывает расходы на покупки и текущую стоимость.",
      tryIt: "Добавьте покупку и сравните расходы с текущей стоимостью. Скачайте копию данных.",
      access: "Без входа и подключения кошелька. Данные хранятся только в этом браузере.",
      description: "Покупки вводятся вручную, а цены обновляются из открытых источников. Приложение показывает разницу между вложенной суммой и стоимостью монет.",
      contribution: "Создал расчёты стоимости и доходности, загрузку цен, сохранение и восстановление данных, интерфейс RU/EN.",
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
      boundaries: "Нет торговли, учёта продаж и синхронизации между устройствами. Перед очисткой браузера сохраните копию данных.",
    },
    en: {
      summary: "A crypto tracker for portfolio owners to compare purchase costs with current value.",
      tryIt: "Add a purchase, compare its cost with its current value and download a backup.",
      access: "No login or wallet connection. Data stays in this browser only.",
      description: "Enter purchases manually and get prices from public sources. The app shows the difference between the amount spent and the current value of your coins.",
      contribution: "Built value and return calculations, price loading, data backup and recovery, and the RU/EN interface.",
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
      boundaries: "No trading, sales accounting or device sync. Save a backup before clearing browser data.",
    },
  },
  {
    slug: "replaylab", title: "ReplayLab", featured: false, visual: "lime",
    status: ["Сайт временно недоступен", "Site temporarily unavailable"],
    stack: ["React", "TypeScript", "Yjs", "IndexedDB", "BlockSuite"],
    links: [{ label: "GitHub", href: "https://github.com/godaylor/replaylab" }],
    cover: ["/projects/replaylab.png", "ReplayLab: редактор баскетбольной комбинации", "ReplayLab basketball play editor"],
    ru: {
      summary: "Редактор для баскетбольных тренеров: помогает нарисовать комбинацию и показать движение игроков.",
      tryIt: "Расставьте игроков, задайте движение по фазам и проиграйте комбинацию.",
      access: "Публичный сервер пока отвечает страницей запуска. Код и снимок редактора доступны.",
      description: "Тренер расставляет игроков, задаёт действия по шагам и воспроизводит комбинацию. Можно работать без интернета.",
      contribution: "Создал редактор комбинаций, воспроизведение, совместную работу и восстановление после закрытия приложения.",
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
      boundaries: "На телефоне доступны просмотр и воспроизведение; полное редактирование — на большом экране. Сохраняйте резервную копию локальных комбинаций.",
    },
    en: {
      summary: "An editor for basketball coaches to draw plays and show player movement.",
      tryIt: "Place players, set movement phase by phase and play the sequence.",
      access: "The public server currently shows its startup page. Source code and an editor screenshot are available.",
      description: "Place players, set actions step by step and play the sequence. You can also work offline.",
      contribution: "Built the play editor, playback, collaboration and recovery after the app closes.",
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
      boundaries: "Phones support viewing and playback; full editing needs a larger screen. Keep a backup of your local plays.",
    },
  },
  {
    slug: "variantlab", title: "VariantLab", featured: false, visual: "violet",
    status: ["Можно попробовать · облачный рендер", "Try it online · cloud rendering"],
    stack: ["React", "TypeScript", "Next.js", "Rust / WASM", "FFmpeg", "D1 / R2"],
    links: [
      { label: "Live", href: "https://variantlab-creative-ops-demo.maxeemzhuparov.chatgpt.site/variantlab/" },
      { label: "GitHub", href: "https://github.com/godaylor/variantlab" },
    ],
    cover: ["/projects/variantlab.png", "VariantLab: локальный редактор рекламных версий", "VariantLab local advertising video editor"],
    ru: {
      summary: "Редактор для авторов рекламы: несколько версий ролика с разными форматами и текстами из одного монтажа.",
      tryIt: "Создайте версии ролика и скачайте результат локального или облачного экспорта.",
      access: "Локальное редактирование и экспорт — без регистрации. Для облачного сохранения и рендера нужен вход через ChatGPT.",
      description: "Кампания объединяет исходный ролик и рекламные версии. Экспорт работает на устройстве или в облаке: фоновый FFmpeg-рендер создаёт WebM для скачивания. Облачный экспорт и воспроизведение проверены в форматах 9:16, 16:9 и 1:1.",
      contribution: "Разработал кампании и варианты, локальное и облачное сохранение, предварительную проверку, экспорт и скачивание поверх редактора на основе OpenCut; подключил фоновый FFmpeg-рендер и приватное хранение медиа.",
      results: [], architecture: [],
      boundaries: "Медиа загружаются в облако только явно. Проверены короткие ролики; длительные нагрузки и будущая доступность бесплатных ресурсов хостинга не гарантируются. Локальный экспорт зависит от браузера и исходного файла.",
    },
    en: {
      summary: "An editor for ad creators to make several video versions with different formats and copy from one edit.",
      tryIt: "Create video variants and download a local or cloud export.",
      access: "Local editing and export need no account. Cloud saving and rendering require ChatGPT sign-in.",
      description: "A campaign groups the source video and its advertising variants. Export runs on your device or in the cloud: background FFmpeg rendering produces downloadable WebM files. Cloud export and playback were verified in 9:16, 16:9 and 1:1 formats.",
      contribution: "Built campaigns and variants, local and cloud persistence, preflight checks, export and downloads on an editor based on OpenCut; integrated background FFmpeg rendering and private media storage.",
      results: [], architecture: [],
      boundaries: "Media is uploaded to the cloud only explicitly. Short videos were verified; sustained workloads and future free hosting capacity are not guaranteed. Local export depends on the browser and source file.",
    },
  },
] as const;

const practicalDetails: Record<string, { ru: { steps: string[]; results: string[] }; en: { steps: string[]; results: string[] } }> = {
  relayops: {
    ru: { steps: ["Войдите гостем.", "Создайте учебный инцидент и назначьте ответственного.", "Добавьте действие и отметьте проблему решённой."], results: ["Повтор запроса после обрыва связи не создаёт второй инцидент.", "Участники видят обновления; после восстановления связи приложение перечитывает сохранённые данные."] },
    en: { steps: ["Continue as a guest.", "Create a sample incident and assign an owner.", "Record an action and mark the incident resolved."], results: ["Retrying after a connection failure does not create a duplicate incident.", "Participants see updates; reconnecting reloads the saved data."] },
  },
  'signal-studio': {
    ru: { steps: ["Откройте демо на вымышленных событиях.", "Выберите анализ и сравните результаты.", "Сохраните пример анализа и добавьте его на панель.", "Перейдите к аудитории и экспорту."], results: ["Фильтры и сравнение периодов используют общий формат запроса.", "Демонстрация отделена от рабочих пространств и не читает реальные данные."] },
    en: { steps: ["Open the demo with fictional events.", "Choose an analysis and compare results.", "Save the sample analysis and add it to a dashboard.", "Continue to audiences and export."], results: ["Filters and period comparisons share one query format.", "The demo is separate from workspaces and does not read real data."] },
  },
  opsweave: {
    ru: { steps: ["Откройте личное гостевое пространство.", "Создайте инструкцию и запустите её.", "Выполните задачу, подтвердите действие и посмотрите историю."], results: ["Сохранённый шаг позволяет продолжить инструкцию после перезапуска сервера.", "Повторные и одновременные запросы не выполняют один переход дважды."] },
    en: { steps: ["Open a personal guest workspace.", "Create a procedure and run it.", "Complete a task, approve an action and inspect the history."], results: ["The saved step lets a procedure resume after a server restart.", "Repeated or concurrent requests do not perform the same transition twice."] },
  },
  napoli: {
    ru: { steps: ["Выберите пиццу и измените размер или добавки.", "Добавьте её в корзину и проверьте сумму.", "Оформите демонстрационный заказ и откройте его статус."], results: ["Разные размеры и добавки одного блюда остаются отдельными позициями корзины.", "Сервер повторно проверяет заказ и защищает его от дублей при повторной отправке."] },
    en: { steps: ["Choose a pizza and change its size or extras.", "Add it to the cart and check the total.", "Place a simulated order and open its status."], results: ["Different sizes and extras remain separate cart items.", "The server revalidates orders and prevents duplicates on retry."] },
  },
  solecraft: {
    ru: { steps: ["Отфильтруйте каталог по посадке.", "Откройте пару и выберите цвет и размер.", "Добавьте пару в корзину и проверьте демонстрационный заказ."], results: ["Фильтры сохраняются в адресе страницы и переживают обновление.", "При входе гостевая корзина объединяется с сохранённой, а заказ повторно проверяет цену и наличие."] },
    en: { steps: ["Filter the catalog by fit.", "Open a pair and choose a colour and size.", "Add it to the cart and review a simulated order."], results: ["Filters stay in the page URL and survive reloads.", "Sign-in merges guest and saved carts; checkout rechecks price and availability."] },
  },
  folio: {
    ru: { steps: ["Добавьте учебную покупку монеты.", "Сравните вложенную сумму и текущую стоимость.", "Скачайте резервную копию своих записей."], results: ["Расчёты учитывают цену отдельных покупок и комиссии.", "Котировки показывают источник и время обновления; записи можно переносить резервной копией."] },
    en: { steps: ["Add a sample coin purchase.", "Compare its cost with the current value.", "Download a backup of your records."], results: ["Calculations include individual purchase prices and fees.", "Quotes show source and update time; records are portable through backups."] },
  },
  replaylab: {
    ru: { steps: ["Создайте комбинацию на большом экране.", "Расставьте игроков и добавьте фазы движения.", "Включите воспроизведение и сохраните резервную копию."], results: ["Локальное сохранение позволяет работать без соединения.", "При совместной работе конфликты текста разбираются явно, а локальная отмена сохраняет чужие изменения."] },
    en: { steps: ["Create a play on a larger screen.", "Place players and add movement phases.", "Play the sequence and save a backup."], results: ["Local persistence allows work without a connection.", "Collaborative text conflicts are resolved explicitly; local undo preserves other people's changes."] },
  },
  variantlab: {
    ru: { steps: ["Создайте кампанию, импортируйте своё видео и соберите монтаж.", "Выберите версии и форматы, выполните предварительную проверку.", "Экспортируйте локально или войдите через ChatGPT, сохраните кампанию и явно загрузите исходник для облачного рендера.", "Дождитесь завершения и скачайте готовые ролики."], results: ["Кампании сохраняются локально и в облаке; облачная кампания и готовый результат открываются после обновления страницы.", "Версии ролика используют общий монтаж и отдельные настройки формата.", "Фоновые задания проходят через D1 и FFmpeg-worker; исходники и готовые файлы хранятся в приватном R2.", "Облачные WebM в 9:16, 16:9 и 1:1 скачаны и воспроизведены; после merge повторно проверен полный облачный сценарий."] },
    en: { steps: ["Create a campaign, import your video and assemble an edit.", "Choose variants and formats, then run preflight checks.", "Export locally, or sign in with ChatGPT, save the campaign and explicitly upload the source for cloud rendering.", "Wait for completion and download the finished videos."], results: ["Campaigns persist locally and in the cloud; the cloud campaign and completed result reopen after reload.", "Video variants share an edit while retaining separate format settings.", "Background jobs run through D1 and an FFmpeg worker; originals and rendered files live in private R2 storage.", "Cloud WebM files in 9:16, 16:9 and 1:1 were downloaded and played; the full cloud journey was rechecked after merge."] },
  },
};

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
      tryIt: copy.tryIt,
      access: copy.access,
      contribution: copy.contribution,
      stack: [...entry.stack],
      results: practicalDetails[entry.slug][locale].results,
      steps: practicalDetails[entry.slug][locale].steps,
      documentationUrl: entry.slug === "variantlab"
        ? "https://github.com/godaylor/variantlab/pull/3"
        : entry.links.find(link => link.label === "GitHub")!.href + "#readme",
      boundaries: copy.boundaries,
      links: entry.links.map(link => ({ ...link })),
      cover: { src: entry.cover[0], alt: locale === "ru" ? entry.cover[1] : entry.cover[2] },
    };
  });
}
