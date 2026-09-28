# Подтверждение содержания

## Презентации после V3 — 28 сентября

`src/data/presentations.ts` содержит RU/EN аудиторию, возможности и подписи.
20 новых JPEG в `public/projects/presentation/` сняты через настоящий браузер
на публичных приложениях. Ни один экран не сгенерирован и не подменён макетом.

- RelayOps: новый гостевой workspace «Portfolio — учебное пространство», сервис
  «Учебный API», штатный явно помеченный демоинцидент, доска и список сервисов.
- Signal Studio: события → анализ → сохранённый анализ → дашборд публичного demo;
  только его фиксированные вымышленные данные.
- OpsWeave: новая изолированная гостевая сессия, обзор и несохранённый редактор
  сценария; первый рабочий снимок оставлен из старых материалов и подписан архивным.
- Napoli: меню, настройка пиццы, гостевая корзина. Заказ не отправлялся.
- Solecraft: каталог, карточка Signal 01, объяснение посадки. Отдельно проверено
  добавление EU 39 в гостевую корзину без покупки; её снимок не использован из-за
  чрезмерно растянутой строки товара в самом приложении (его код не изменялся).
- Folio: пустой локальный портфель, рынок и управление данными. Покупки не добавлялись.
- VariantLab: новая локальная учебная кампания, версия 9:16, форматы и экспорт.
  Медиа не загружались, распознавание и рендер не запускались. Это не проверка
  облачной обработки и не доказательство успешного экспорта видео.
- ReplayLab: публичный адрес показал 503/запуск сервера; поздний повторный запрос
  завершился по timeout 20 секунд. Оставлен один архивный рабочий снимок, нехватка
  свежих экранов объяснена на странице. Код и адрес сервера доступны отдельно.

Все восемь GitHub URL вернули 200. Личные браузерные данные владельца, общие
сессии, соседние репозитории и инфраструктура не изменялись.

Обновлено 2026-09-28 по заданию V3. README и статусные документы соседних
репозиториев читались как источники; изменения в них не вносились. VariantLab
включён отдельно в разработке согласно новому заданию.

## Владелец и позиционирование

- Maxeem в обеих локалях (публичное имя из задания V3).
- Frontend / Full-stack Developer.
- Email: maxeemit@mail.ru.
- Telegram: https://t.me/maximsberbank.
- GitHub: https://github.com/godaylor.

Неподтверждённые годы опыта, работодатели, образование, клиенты и бизнес-метрики
не заявляются.

## Проекты

| Проект | Основной источник | Публичные ссылки | Screenshot |
| --- | --- | --- | --- |
| RelayOps | `01-relayops/PORTFOLIO_HANDOFF.md` | GitHub + Render Live проверены HTTP 200 | `docs/screenshots/incident-room.png` |
| Signal Studio | `02-signal-studio/README.md` | GitHub + `/demo` проверены HTTP 200 | Новый screenshot публичного демо |
| OpsWeave | `04-opsweave/PORTFOLIO_HANDOFF.md` | GitHub + Render Live проверены HTTP 200 | `screenshots/03-incident-action.png` |
| ReplayLab | `05-replaylab/standalone/PORTFOLIO_HANDOFF.md` | GitHub 200; известный Render URL повторно отвечает 503, Live CTA скрыт | Существующий screenshot редактора из release evidence |
| Napoli | `06-napoli/PORTFOLIO_HANDOFF.md` | GitHub + Vercel Live проверены HTTP 200 | `docs/screenshots/menu-desktop.jpg` |
| Solecraft | `07-solecraft/PORTFOLIO_HANDOFF.md` | GitHub + Vercel Live проверены HTTP 200 | `docs/screenshots/solecraft-catalog-desktop.png` |
| Folio | `08-crypto-portfolio/PORTFOLIO_HANDOFF.md` | GitHub + Sites Live проверены HTTP 200 | `docs/screenshots/portfolio-desktop.png` |
| VariantLab | `03-variantlab/PORTFOLIO_HANDOFF.md` и публичный редактор | GitHub и редактор 200; локальная кампания повторно открыта; cloud processing не подтверждён | Новый screenshot публичного редактора |

Для каждого проекта использованы актуальные название, стек, вклад, проверенные
capabilities, production/local-release границы и 2–4 инженерных результата.
Устаревшие проценты готовности, localhost URL и upstream demos исключены.

## Медиа и provenance

Файлы в `public/projects/` — release screenshots предыдущей работы и два новых
снимка публичных страниц. Они показывают приложения с synthetic/QA data, а не
production traffic или реальные пользовательские данные. Происхождение
open-source основ раскрыто на case-study страницах и в документах проектов.
