import type { Locale } from "@/lib/i18n";
import type { PortfolioProject, ProjectLink } from "./resume";

// Evidence and release boundaries: docs/CONTENT_SOURCES.md.
// Public URLs stay empty until the owner supplies them. Never use upstream demos.
const entries = [
  {
    slug: "relayops", title: "RelayOps", featured: true, visual: "cobalt",
    status: ["Скоро", "Coming soon"],
    stack: ["React", "TypeScript", "Hono", "PostgreSQL", "WebSocket"],
    ru: ["Реагирование на инциденты — от сигнала до истории решений.", "Платформа объединяет сервисы, входящие сигналы и инциденты в одном рабочем процессе. Неизменяемая история помогает восстановить последовательность действий. Проект развивается на основе Kaneo и готовится к портфолио-демонстрации.", "Актуализация клиентов через WebSocket; PostgreSQL остаётся источником истины.", "Hono API служит границей авторизации. Основа — Kaneo, MIT; проект не является официальным продуктом Kaneo."],
    en: ["Incident response, from incoming signals to a history of decisions.", "The platform connects services, incoming signals and incidents in one workflow. An immutable timeline records the sequence of actions. Built on Kaneo, the project is being prepared for a portfolio demonstration.", "WebSocket events update clients while PostgreSQL remains the source of truth.", "The Hono API is the authorization boundary. Based on Kaneo under MIT; not an official Kaneo product."],
  },
  {
    slug: "signal-studio", title: "Signal Studio", featured: true, visual: "violet",
    status: ["Скоро", "Coming soon"],
    stack: ["React", "TypeScript", "Next.js", "PostgreSQL"],
    ru: ["Рабочее пространство для продуктовой аналитики.", "Трансформация Umami в продуктовый аналитический инструмент. В основе сохраняется аналитическое ядро Umami; подготовлены воспроизводимые демоданные и отдельные проверки аналитических запросов. Публичное демо ещё не опубликовано.", "Временные интервалы задаются точными моментами времени, а часовой пояс управляет группировкой результатов.", "Сборка отделена от миграций базы данных. Основа — Umami, MIT; исходные уведомления об авторских правах сохранены."],
    en: ["A workspace for product analytics.", "A transformation of Umami into a product-intelligence workspace. It retains the Umami analytics kernel, with reproducible demo data and dedicated analytics query checks. A public demo has not been published yet.", "Time ranges use explicit instants while the requested time zone controls result bucketing.", "Builds are separate from database migrations. Based on Umami under MIT, with original copyright notices preserved."],
  },
  {
    slug: "variantlab", title: "VariantLab", featured: true, visual: "cyan",
    status: ["Скоро", "Coming soon"],
    stack: ["React", "TypeScript", "Next.js", "Rust", "WebAssembly"],
    ru: ["Студия рекламных вариантов на основе мастер-таймлайна.", "Проект исследует управляемое создание рекламных вариантов из одного исходного монтажа. В репозитории есть web-сценарий VariantLab и отдельный инструментарий Rust/WASM. Это развитие OpenCut Classic, а не редактор, созданный с нуля.", "Связь web-интерфейса с ядром обработки и воспроизводимой сборкой WASM.", "Web-приложение находится в apps/web, платформонезависимое ядро — в rust. Основа — OpenCut Classic, MIT; официальной связи с OpenCut нет."],
    en: ["An advertising-variant studio built around a master timeline.", "The project explores controlled advertising variants from one source edit. The repository includes a VariantLab web flow and a separate Rust/WASM toolchain. It builds on OpenCut Classic rather than claiming a video editor made from scratch.", "Connecting the web interface to the processing core and a reproducible WASM build.", "The web app lives in apps/web and the platform-independent core in rust. Based on OpenCut Classic under MIT; not affiliated with OpenCut."],
  },
  {
    slug: "opsweave", title: "OpsWeave", featured: true, visual: "coral",
    status: ["Скоро", "Coming soon"],
    stack: ["React", "TypeScript", "NestJS", "BullMQ"],
    ru: ["Оркестрация реагирования: инциденты, playbook и аудит.", "B2B-инструмент связывает инциденты с версионированными сценариями реагирования. В плане подтверждены этапы M0–M6, включая интерфейсы аналитики и аудита; M7 и M8 ещё не начаты. Публичный релиз не заявляется.", "Упорядоченные взаимоисключающие ветви в визуальном сценарии и идемпотентные бизнес-действия.", "Отдельный доменный контекст поверх разрешённых поверхностей Novu Community Edition. Состояние сохраняется независимо от realtime-уведомлений; Enterprise-код исключён."],
    en: ["Response orchestration with incidents, playbooks and audit history.", "A B2B tool connecting incidents to versioned response playbooks. The plan confirms M0–M6, including analytics and audit interfaces; M7 and M8 have not started. No public-release readiness is claimed.", "Ordered, mutually exclusive branches in the visual workflow and idempotent business actions.", "An isolated domain context over permitted Novu Community Edition surfaces. Persisted state is independent of realtime notifications; Enterprise code is excluded."],
  },
  {
    slug: "replaylab", title: "ReplayLab", featured: false, visual: "lime",
    status: ["Скоро", "Coming soon"],
    stack: ["React", "TypeScript", "Yjs", "IndexedDB", "BlockSuite"],
    ru: ["Совместный редактор и аниматор баскетбольных комбинаций.", "Local-first инструмент для комбинаций на половине площадки: десять игроков, мяч, от двух до двенадцати фаз и текстовые подсказки. План фиксирует готовность срезов 0–6 и реализацию среза 7 до границы релиза; финальный release gate остаётся заблокирован.", "Офлайн-редактирование, синхронизация после подключения и разрешение смысловых конфликтов.", "Проверенное ядро BlockSuite за узкими интерфейсами редактора и синхронизации. Продукт не использует backend, облачные аккаунты или брендинг AFFiNE. Мобильный сценарий ограничен просмотром и воспроизведением."],
    en: ["A collaborative basketball play editor and animator.", "A local-first tool for half-court plays: ten players, a ball, two to twelve phases and rich-text cues. The plan records slices 0–6 as complete and slice 7 implemented to the release boundary; the final release gate remains blocked.", "Offline editing, reconnect synchronization and meaningful conflict resolution.", "A reviewed BlockSuite kernel behind narrow editor and sync interfaces. AFFiNE backend, cloud accounts and branding are excluded. Mobile supports review and playback rather than full authoring."],
  },
  {
    slug: "napoli", title: "Napoli", featured: true, visual: "coral",
    status: ["Готово", "Ready"],
    stack: ["React", "TypeScript", "Redux Toolkit", "React Router", "Vite"],
    ru: ["Пиццерия: от настройки пиццы до отслеживания заказа.", "Портфолио-приложение с каталогом, конфигуратором пиццы, корзиной и гостевым оформлением заказа. Можно выбрать доставку или самовывоз, применить промокод и пройти демонстрационную оплату. Подтверждение и отслеживание сохраняются после перезагрузки.", "Сохранение разных конфигураций товара в корзине и восстановление сценария после перезагрузки.", "Поиск и фильтры принадлежат URL. Оплата имитируется без сбора реквизитов карты. Проект развивает учебную основу react-pizza-v2 с сохранением сведений об источнике."],
    en: ["A pizzeria journey, from configuring a pizza to tracking an order.", "A portfolio app with a menu, pizza configurator, cart and guest checkout. Customers can choose delivery or pickup, apply a promo code and try a simulated payment. Confirmation and tracking survive a reload.", "Keeping distinct product configurations in the cart and recovering the journey after a reload.", "Search and filters live in the URL. Payment is simulated without collecting card details. The project develops the react-pizza-v2 learning foundation with source attribution retained."],
  },
  {
    slug: "solecraft", title: "Solecraft", featured: false, visual: "cyan",
    status: ["Скоро", "Coming soon"],
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Supabase"],
    ru: ["Магазин кроссовок с подбором посадки и точным учётом SKU.", "Каталог помогает сравнивать ширину, амортизацию и поддержку. Выбранные цвет и размер сохраняют идентичность товара до заказа. Есть гостевая корзина, wishlist и демонстрационный checkout. Публикация самого магазина зависит от проверки доступности, deploy и прав на изображения.", "Согласование гостевой и пользовательской корзины; повторная проверка цены и остатков на сервере.", "URL управляет каталогом, TanStack Query — серверными данными, Zustand — гостевым состоянием. Supabase обеспечивает вход и изоляцию пользовательских данных."],
    en: ["A fit-first sneaker store with precise SKU identity.", "The catalog compares width, cushioning and support. Selected color and size preserve the exact item identity through to the order. It includes a guest cart, wishlist and demo checkout. Publishing the store still depends on accessibility checks, deployment validation and image rights.", "Merging guest and account carts, with server-side price and stock revalidation.", "URL state drives the catalog, TanStack Query owns server data and Zustand holds guest state. Supabase provides authentication and user-data isolation."],
  },
  {
    slug: "crypto-portfolio", title: "Crypto Portfolio", featured: false, visual: "violet",
    status: ["Требует обновления", "Needs update"],
    stack: ["React", "JavaScript", "Ant Design", "Chart.js", "Vite"],
    ru: ["Учебный дашборд криптопортфеля на демонстрационных данных.", "Приложение показывает состав портфеля и вычисляемые показатели активов. Можно добавить или удалить запись и восстановить демоданные. Рыночные значения берутся из локальных fixtures: подключения к бирже и реальных операций нет.", "Производные показатели стоимости и изменения цены, а также уникальная идентичность записей портфеля.", "React Context хранит портфель; локальный API имитирует асинхронную загрузку. Ant Design используется для интерфейса, Chart.js — для диаграмм."],
    en: ["A learning-project crypto dashboard using demo data.", "The app displays portfolio composition and derived asset metrics. Users can add or remove an entry and reset the demo data. Market values come from local fixtures; there is no exchange connection or real trading.", "Derived value and price-change metrics, with distinct identities for portfolio entries.", "React Context holds the portfolio and a local API simulates asynchronous loading. Ant Design provides UI components and Chart.js renders charts."],
  },
] as const;

export const PROJECT_PUBLICATION: Partial<Record<(typeof entries)[number]["slug"], {
  links?: ProjectLink[];
  cover?: PortfolioProject["cover"];
}>> = {};

export function getProjects(locale: Locale): PortfolioProject[] {
  return entries.map(entry => {
    const [summary, description, challenge, architecture] = entry[locale];
    const publication = PROJECT_PUBLICATION[entry.slug];
    const hasDemo = publication?.links?.some(link => link.label === "Live demo");
    return {
      slug: entry.slug, title: entry.title, featured: entry.featured, visual: entry.visual,
      status: hasDemo
        ? (locale === "ru" ? "Демо доступно" : "Demo available")
        : (locale === "ru" ? entry.status[0] : entry.status[1]),
      summary, description, stack: [...entry.stack],
      engineeringChallenges: [challenge], architectureHighlights: [architecture],
      links: publication?.links ?? [], cover: publication?.cover ?? { src: "", alt: entry.title },
    };
  });
}
