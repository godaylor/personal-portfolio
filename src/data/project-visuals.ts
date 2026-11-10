/** Current application media. Stable slugs keep existing case URLs intact. */
export type VisualCopy = readonly [string, string];
type VisualScreen = { src: string; caption: VisualCopy };
type ProjectVisual = {
  title: VisualCopy;
  cover: string;
  mobile?: string;
  film?: string;
  source: "public" | "local";
  sourceLabel: VisualCopy;
  note: VisualCopy;
  screens: VisualScreen[];
};
const screen = (file: string, ru: string, en: string): VisualScreen => ({
  src: `/projects/presentation/${file}.jpg`,
  caption: [ru, en],
});

export const projectVisuals: Record<string, ProjectVisual> = {
  relayops: {
    title: ["Маяк", "Mayak"],
    cover: "/projects/presentation/v7-mayak-overview.jpg",
    mobile: "/projects/presentation/v7-mayak-mobile.jpg",
    film: "/projects/reels/v7-mayak.mp4",
    source: "public",
    sourceLabel: ["Учебное пространство", "Sample workspace"],
    note: [
      "Учебное пространство с демонстрационным сервисом и инцидентом.",
      "A sample workspace with a demonstration service and incident.",
    ],
    screens: [
      screen(
        "v7-mayak-overview",
        "Сводка Маяка: активный инцидент и последние действия команды. Проверенная демосборка.",
        "Mayak overview: active incident and latest team actions. Verified demo build.",
      ),
      screen(
        "v7-mayak-room",
        "Комната инцидента: ответственный, этапы реагирования и история сбоя.",
        "Incident room: coordinator, response stages and event history.",
      ),
      screen(
        "v7-mayak-board",
        "Доска реагирования: инциденты по этапам работы.",
        "Response board: incidents grouped by response stage.",
      ),
    ],
  },
  "signal-studio": {
    title: ["Ракурс", "Rakurs"],
    cover: "/projects/presentation/v7-rakurs-home.jpg",
    mobile: "/projects/presentation/v7-rakurs-mobile.jpg",
    film: "/projects/reels/v7-rakurs.mp4",
    source: "public",
    sourceLabel: ["Синтетические данные", "Synthetic data"],
    note: [
      "На экранах синтетические события: расчёт воронки и сохранённые анализы.",
      "Synthetic events: a calculated funnel and saved analyses.",
    ],
    screens: [
      screen(
        "v7-rakurs-home",
        "Вход в Ракурс: синтетический пример воронки активации.",
        "Rakurs entry: a synthetic activation funnel example.",
      ),
      screen(
        "v7-rakurs-explore",
        "Анализ: настоящая воронка и её табличное представление на синтетических данных.",
        "Analysis: a calculated funnel and its table using synthetic events.",
      ),
      screen(
        "v7-rakurs-dynamics",
        "Динамика событий по дням на синтетических данных.",
        "Daily event trends calculated from synthetic data.",
      ),
    ],
  },
  opsweave: {
    title: ["По шагам", "Po Shagam"],
    cover: "/projects/presentation/v7-po-shagam-workspace.jpg",
    source: "public",
    sourceLabel: ["Работающее приложение · учебный сценарий", "Working application · sample procedure"],
    note: [
      "Отдельное гостевое пространство. На экранах — учебная инструкция и пример выполнения.",
      "An isolated guest workspace showing a sample procedure and its execution.",
    ],
    screens: [
      screen(
        "v7-po-shagam-workspace",
        "Рабочее пространство По шагам: сценарии и ход выполнения.",
        "Po Shagam workspace: procedures and execution progress.",
      ),
      screen(
        "v7-po-shagam-editor",
        "Редактор пошаговой инструкции.",
        "Step-by-step procedure editor.",
      ),
      screen(
        "v7-po-shagam-run",
        "Запущенная инструкция: текущий шаг и история действий.",
        "Running procedure: current step and action history.",
      ),
    ],
  },
  replaylab: {
    title: ["Пятый темп", "Fifth Tempo"],
    cover: "/projects/presentation/v6-replaylab-home.jpg",
    film: "/projects/reels/v6-replaylab.mp4",
    source: "public",
    sourceLabel: [
      "Опубликованная версия · 3D-просмотр",
      "Published version · 3D playback",
    ],
    note: [
      "На телефоне доступны просмотр и воспроизведение. Редактирование — на большом экране.",
      "Phones support viewing and playback. Authoring requires a larger screen.",
    ],
    screens: [
      screen(
        "v6-replaylab-home",
        "Стартовый экран: готовая комбинация на трёхмерной площадке.",
        "Home: a sample play on the three-dimensional court.",
      ),
      screen(
        "v6-replaylab-watch",
        "Просмотр комбинации в 3D с фазами движения и пояснениями.",
        "3D play playback with movement phases and captions.",
      ),
      screen(
        "v6-replaylab-editor",
        "Точный редактор сверху: игроки, маршруты и шаги комбинации.",
        "Precise overhead editor: players, paths and play steps.",
      ),
    ],
  },
  folio: {
    title: ["Aster", "Aster"],
    cover: "/projects/presentation/v6-folio-overview.jpg",
    source: "public",
    sourceLabel: [
      "Опубликованная версия · учебный портфель",
      "Published version · sample portfolio",
    ],
    note: [
      "Учебный портфель и примерные цены. Пользовательские записи хранятся в браузере.",
      "A sample portfolio with example prices. User records are stored in the browser.",
    ],
    screens: [
      screen(
        "v6-folio-overview",
        "Обзор учебного портфеля Aster.",
        "Aster sample portfolio overview.",
      ),
      screen(
        "v6-folio-assets",
        "Активы и распределение учебного портфеля.",
        "Sample portfolio assets and allocation.",
      ),
      screen(
        "v6-folio-market",
        "Рынок в режиме учебных цен.",
        "Market using example prices.",
      ),
    ],
  },
  solecraft: {
    title: ["Solecraft", "Solecraft"],
    cover: "/projects/presentation/v6-solecraft-home.jpg",
    source: "public",
    sourceLabel: ["Демонстрационный каталог", "Sample catalog"],
    note: [
      "Демонстрационные товары. Оформление и оплата учебные.",
      "Demonstration products with simulated checkout and payment.",
    ],
    screens: [
      screen(
        "v6-solecraft-home",
        "Главная нового Solecraft: товарная фотография и навигация по коллекции.",
        "New Solecraft home: product photography and collection navigation.",
      ),
      screen(
        "v6-solecraft-catalog",
        "Каталог с фильтрами и товарами.",
        "Catalog with filters and products.",
      ),
      screen(
        "v6-solecraft-product",
        "Карточка кроссовок: варианты, размер и добавление в корзину.",
        "Sneaker product page: options, size and add to cart.",
      ),
    ],
  },
  variantlab: {
    title: ["Просто монтаж", "Prosto Montage"],
    cover: "/projects/presentation/v6-variantlab-home.jpg",
    source: "public",
    sourceLabel: ["Опубликованная версия", "Published version"],
    note: [
      "Локальный монтаж — без входа. Для облачного сохранения и экспорта нужен вход через ChatGPT.",
      "Local editing needs no account. Cloud saving and export require ChatGPT sign-in.",
    ],
    screens: [
      screen(
        "v6-variantlab-home",
        "Новый стартовый экран «Просто монтаж».",
        "New Prosto Montage welcome screen.",
      ),
      screen(
        "v6-variantlab-editor",
        "Работающий редактор с роликом на монтажной ленте.",
        "Working editor with footage on the timeline.",
      ),
      screen(
        "v6-variantlab-compare",
        "Предпросмотр вертикальной версии в разделе сравнения.",
        "Vertical version preview in the comparison workspace.",
      ),
    ],
  },
  napoli: {
    title: ["Napoli", "Napoli"],
    cover: "/projects/presentation/v6-napoli-product.jpg",
    mobile: "/projects/presentation/v6-napoli-mobile.jpg",
    film: "/projects/reels/v6-napoli.mp4",
    source: "public",
    sourceLabel: [
      "Работающее приложение · демозаказ",
      "Working application · sample order",
    ],
    note: [
      "Записан настоящий сценарий публичного приложения: меню, настройка пиццы и гостевая корзина. Заказ и оплата не отправлялись.",
      "Actual public application footage: menu, pizza options and guest cart. No order or payment was submitted.",
    ],
    screens: [
      screen(
        "v6-napoli-menu",
        "Меню: категории, фильтры и доступность блюд.",
        "Menu: categories, filters and item availability.",
      ),
      screen(
        "v6-napoli-product",
        "Настройка пиццы: размер, тесто и ингредиенты.",
        "Pizza options: size, crust and ingredients.",
      ),
      screen(
        "v6-napoli-cart",
        "Гостевая корзина с выбранной пиццей.",
        "Guest cart with the selected pizza.",
      ),
    ],
  },
};
