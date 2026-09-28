import type { Locale } from "@/lib/i18n";
import type { GalleryImage } from "@/components/project-gallery";

type Copy = readonly [string, string];
type Presentation = { audience: Copy; features: Copy[]; screens: { src: string; caption: Copy }[]; note?: Copy };
const screen = (file: string, ru: string, en: string) => ({ src: `/projects/presentation/${file}.jpg`, caption: [ru, en] as Copy });

// Only the case route imports this collection; galleries are not sent to the home page.
const presentations: Record<string, Presentation> = {
  relayops: {
    audience: ["Для ИТ-команд, которым нужен общий план действий во время сбоя.", "For IT teams that need a shared response plan during an outage."],
    features: [["Инциденты с ответственными и статусами.", "Incidents with owners and statuses."], ["Доска действий для участников команды.", "An action board for the response team."], ["Журнал решений и обновления состояния.", "Decision history and live status updates."]],
    screens: [screen("relayops-incident", "Демонстрационный инцидент в отдельном учебном пространстве.", "Demonstration incident in an isolated sample workspace."), screen("relayops-board", "Доска реагирования: действия участников по инциденту.", "Response board: team actions for the incident."), screen("relayops-services", "Сервис учебного пространства и его состояние.", "A service and its status in the sample workspace.")],
  },
  "signal-studio": {
    audience: ["Для продуктовых команд, которые изучают путь пользователя от регистрации до результата.", "For product teams exploring the journey from sign-up to a useful outcome."],
    features: [["События и этапы пользовательского пути.", "Events and stages of the user journey."], ["Анализ переходов между шагами и сравнение результатов.", "Analysis of progression between steps and result comparisons."], ["Сохранённые анализы и общая панель.", "Saved analyses and a shared dashboard."], ["Аудитории и выгрузка результатов.", "Audiences and exported results."]],
    screens: [screen("signal-events", "События вымышленного сервиса: входные данные для анализа.", "Events from a fictional service: the input for analysis."), screen("signal-analysis", "Воронка первого отчёта на фиксированных демонстрационных данных.", "First-report funnel using fixed demonstration data."), screen("signal-dashboard", "Дашборд с сохранённым анализом в публичном демо.", "A dashboard with saved analysis in the public demo.")],
  },
  opsweave: {
    audience: ["Для дежурного инженера, которому нужно пройти инструкцию и сохранить историю действий.", "For an on-call engineer following a procedure and keeping an action history."],
    features: [["Инструкции из последовательных шагов.", "Procedures built from sequential steps."], ["Задачи, подтверждения и ожидания.", "Tasks, approvals and waiting steps."], ["История выполнения в личном пространстве.", "Execution history in a personal workspace."]],
    screens: [{ src: "/projects/opsweave.png", caption: ["Инцидент и шаг инструкции — архивный рабочий экран.", "Incident and procedure step — an archived application screen."] }, screen("opsweave-workspace", "Новое изолированное гостевое пространство: начало работы.", "New isolated guest workspace: getting started."), screen("opsweave-editor", "Создание сценария в гостевом пространстве.", "Creating a procedure in the guest workspace.")],
    note: ["Первый снимок архивный; остальные сняты 28 сентября в новой гостевой сессии, без данных владельца.", "The first screenshot is archived; the others were captured on September 28 in a new guest session, without the owner’s data."],
  },
  napoli: {
    audience: ["Для покупателя, который выбирает блюдо и собирает заказ пиццерии.", "For a customer choosing food and putting together a pizzeria order."],
    features: [["Каталог с поиском и фильтрами по составу.", "Catalog with search and ingredient filters."], ["Размер, тесто, исключения и добавки к блюду.", "Size, crust, exclusions and extras."], ["Корзина с выбранными вариантами и итоговой суммой.", "Cart with selected options and the order total."], ["Демонстрационное оформление и статус заказа.", "Simulated checkout and order status."]],
    screens: [screen("napoli-catalog", "Меню: категории, фильтры и доступность блюд.", "Menu: categories, filters and item availability."), screen("napoli-product", "Настройка пиццы: размер, тесто и ингредиенты.", "Pizza options: size, crust and ingredients."), screen("napoli-cart", "Учебная корзина с выбранной пиццей. Заказ не отправлялся.", "Sample cart with the selected pizza. No order was submitted.")],
  },
  solecraft: {
    audience: ["Для покупателя, который сравнивает кроссовки по посадке, цвету и размеру.", "For a customer comparing sneakers by fit, colour and size."],
    features: [["Каталог с фильтрами посадки и сортировкой.", "Catalog with fit filters and sorting."], ["Карточка модели с цветами и доступными размерами.", "Product page with colours and available sizes."], ["Гостевая корзина и демонстрационное оформление.", "Guest cart and simulated checkout."], ["Избранное для отложенного выбора.", "Wishlist for later consideration."]],
    screens: [screen("solecraft-catalog", "Каталог с фильтрами посадки; характеристики демонстрационные.", "Catalog with fit filters; characteristics are demonstration data."), screen("solecraft-product", "Карточка модели: цвет, размер и объяснение оценки посадки.", "Product page: colour, size and the fit assessment explanation."), screen("solecraft-fit", "Объяснение ширины, амортизации и поддержки: три независимых признака.", "Explaining width, cushioning and support: three independent attributes.")],
  },
  folio: {
    audience: ["Для человека, который вручную ведёт покупки криптовалюты без подключения кошелька.", "For someone manually tracking cryptocurrency purchases without connecting a wallet."],
    features: [["Записи покупок с ценой и комиссией.", "Purchase records with prices and fees."], ["Оценка портфеля по котировкам с указанным источником.", "Portfolio valuation using quotes with a named source."], ["Обзор рынка и отдельных активов.", "Market and individual asset views."], ["Экспорт и импорт резервной копии локальных записей.", "Export and import of local record backups."]],
    screens: [screen("folio-overview", "Новый локальный портфель: пустое состояние и первое действие.", "New local portfolio: empty state and the first action."), screen("folio-market", "Обзор рынка с публичными котировками.", "Market overview with public quotes."), screen("folio-data", "Управление локальными данными и резервной копией.", "Local data and backup management.")],
  },
  replaylab: {
    audience: ["Для баскетбольного тренера, который готовит и объясняет комбинации команде.", "For a basketball coach preparing and explaining plays to the team."],
    features: [["Расстановка игроков и действия на площадке.", "Player positions and actions on the court."], ["Фазы движения и воспроизведение комбинации.", "Movement phases and play playback."], ["Локальное сохранение и резервная копия.", "Local persistence and backups."], ["Совместное редактирование с обработкой конфликтов.", "Collaborative editing with conflict handling."]],
    screens: [{ src: "/projects/replaylab.png", caption: ["Редактор комбинации — архивный рабочий экран, не снимок текущего публичного сервера.", "Play editor — an archived working screen, not a capture of the current public server."] }],
    note: ["28 сентября публичный адрес возвращал HTTP 503 и экран запуска. Для галереи пока доступен один архивный снимок; новые экраны снять не удалось.", "On September 28 the public URL returned HTTP 503 and a startup screen. One archived screenshot is available; new screens could not be captured."],
  },
  variantlab: {
    audience: ["Для автора рекламы, который готовит версии одного ролика под разные форматы.", "For an ad creator preparing different formats of one video."],
    features: [["Кампании с локальным сохранением в браузере.", "Campaigns saved locally in the browser."], ["Версии ролика с общим монтажом и отдельным форматом.", "Video variants sharing an edit with individual formats."], ["Заголовок и призыв к действию для версии.", "Variant-specific headline and call to action."], ["Предварительная проверка перед локальным экспортом.", "Preflight checks before local export."]],
    screens: [screen("variantlab-editor", "Новая локальная кампания: монтажная лента до загрузки исходного видео.", "New local campaign: timeline before importing source video."), screen("variantlab-variants", "Выбор форматов рекламных версий в учебной кампании.", "Selecting video variant formats in a sample campaign."), screen("variantlab-export", "Параметры локального экспорта. Рендер не запускался.", "Local export settings. Rendering was not started.")],
    note: ["Снимки локального редактора без загруженного видео. Они не подтверждают облачную обработку или успешный экспорт ролика.", "Local editor screenshots without uploaded video. They do not verify cloud processing or a successful video export."],
  },
};

export function getPresentation(slug: string, locale: Locale): { audience: string; features: string[]; images: GalleryImage[]; note?: string } {
  const data = presentations[slug];
  const index = locale === "ru" ? 0 : 1;
  return { audience: data.audience[index], features: data.features.map(copy => copy[index]), images: data.screens.map(screen => ({ src: screen.src, caption: screen.caption[index] })), note: data.note?.[index] };
}
