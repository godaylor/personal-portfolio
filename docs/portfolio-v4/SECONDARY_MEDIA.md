# Актуальные материалы второстепенных проектов

Проверено и подготовлено 18 октября 2026 года (Москва). Соседние репозитории не
изменялись. Использованы реальные снимки запущенных приложений и записи браузера;
концепты, сгенерированные макеты и снимки панели деплоя исключены.

JPEG: максимум 1440 px по ширине, качество 90. Изображения не растягивались и не
обрезались. Мобильные оригиналы сохраняют родную ширину (390 px, Solecraft 360 px).
Полностраничные mobile-снимки следует показывать целиком в галерее; для отдельного
экранного макета нужен контейнер с прокруткой, а не принудительное растяжение.

## Имена, версии и действия

| Технический проект | Текущее имя | Подтверждённая версия / доступ | Правка действия в портфолио |
| --- | --- | --- | --- |
| ReplayLab | Пятый темп / Fifth Tempo | Coach workbench / 3D, опубликован 18.10; исходник `cd6fd3a`, публичный Render | Убрать «демо недоступно». «Открыть приложение» → https://replaylab-godaylor.onrender.com/ ; не публиковать приватные room-capabilities |
| VariantLab | Просто монтаж / Prosto Montage | Публичная v18 от 17.10; «Кадроли» заменено этим именем | «Открыть видеоредактор» → https://variantlab-creative-ops-demo.maxeemzhuparov.chatgpt.site/variantlab/ ; локальный монтаж без аккаунта, облако отдельно |
| Folio | Долемер / Dolemer | Публичная cinematic v6, опубликованная и проверенная 17–18.10 | «Открыть приложение» → https://folio-crypto-godaylor.maxeemzhuparov.chatgpt.site/ ; примеры не называть реальными личными финансами |
| Solecraft | Solecraft | Последняя локальная M10 от 17.10; публичный сайт пока старее | Показывать «Локальная версия M10». Внешнее действие «Публичная версия» → https://solecraft-two.vercel.app/ с пояснением, что дизайн может отличаться |
| OpsWeave | Дежурно / Dezhurno | Последняя локальная redesign-v2 от 17.10, не опубликована | Показывать «Локальная версия». Внешнее действие «Предыдущая публичная версия» → https://opsweave.onrender.com/ ; не выдавать localhost за общедоступное демо |

Основные доказательства: `05-replaylab/standalone/docs/PRODUCTION_VERIFICATION.md`,
`03-variantlab/docs/WELCOME_V18.md`,
`08-crypto-portfolio/docs/design/cinematic/verification/final-public/report.md`,
`07-solecraft/docs/REDESIGN_M10.md`,
`04-opsweave/docs/standalone/VERIFICATION.md` (раздел 2026-10-17).
Все пути ниже относительно `E:/Projects/PetProjects/`.

## Пятый темп

Источник: `05-replaylab/standalone/docs/design/public-coach3d-*.png`, реальные
публичные снимки 18.10.2026 00:42. Первоначальный домашний снимок полный, поэтому
его высота больше стандартного viewport. Проверены 3D-площадка, реальный overhead
редактор, читаемые подписи и mobile playback без десктопных инструментов.

| Файл `/projects/presentation/` | Точный исходник (после `public-coach3d-`) | Подпись RU | Caption EN |
| --- | --- | --- | --- |
| `v4-replaylab-home.jpg` | `home.png` | Пятый темп: живая 3D-комбинация на главной. | Fifth Tempo: a live 3D play on the homepage. |
| `v4-replaylab-watch.jpg` | `watch.png` | Просмотр пик-н-ролла в 3D: движение игроков, шаги и шкала времени. | Watch a pick-and-roll in 3D: player movement, steps and timeline. |
| `v4-replaylab-editor.jpg` | `editor.png` | Редактор комбинации: точная схема сверху и инструменты действий. | Play editor: an accurate overhead board and action tools. |
| `v4-replaylab-mobile.jpg` | `mobile-ru.png` | Мобильный просмотр комбинации и переключение шагов. | Mobile play review and step navigation. |

## Просто монтаж

Главная и mobile: `03-variantlab/docs/screenshots/welcome-v18-dark.png` и
`welcome-v18-mobile-en.png`, публичная v18, 17.10.2026 23:41. Редактор и сравнение
пересняты **с публичной v18 18.10.2026** в установленном Chrome, 1440×1000,
с новым временным браузерным контекстом: «Начать монтаж» → «Попробовать на примере»
→ создать вертикальную версию → добавить форматы 16:9 и 1:1 → выбрать три ячейки →
включить → сравнить → воспроизвести стену. Это штатный локальный пример; аккаунт,
облачные данные и существующие проекты пользователя не открывались и не менялись.
Старые studio-v2 снимки с заголовком «Кадроли» не использованы.

| Файл `/projects/presentation/` | Подпись RU | Caption EN |
| --- | --- | --- |
| `v4-variantlab-home.jpg` | Просто монтаж v18: интерактивный пример кадрирования на главной. | Prosto Montage v18: an interactive crop example on the homepage. |
| `v4-variantlab-editor.jpg` | Реальный локальный редактор: исходник, вертикальный кадр и монтажная лента. | The actual local editor: source media, portrait crop and timeline. |
| `v4-variantlab-compare.jpg` | Сравнение одного монтажа в форматах 16:9, 1:1 и 9:16. | Compare one edit in 16:9, 1:1 and 9:16 formats. |
| `v4-variantlab-mobile.jpg` | Мобильная главная v18 на английском языке. | The v18 mobile homepage in English. |

## Долемер

Источник: `08-crypto-portfolio/docs/design/cinematic/implementation/`, настоящая
cinematic-реализация, 17.10.2026 23:35. Эти снимки используют явно обозначенный
«Пример портфеля» с учебными ценами. Они не свидетельствуют о текущих рыночных
котировках. Совпадение текущей публичной v6 и сценарии обоих движков подтверждены
в `verification/final-public/report.md`.

| Файл `/projects/presentation/` | Исходник | Подпись RU | Caption EN |
| --- | --- | --- | --- |
| `v4-folio-overview.jpg` | `desktop-dark-overview.png` | Учебный портфель: история стоимости и объёмное распределение активов. | Example portfolio: value history and a dimensional asset allocation. |
| `v4-folio-assets.jpg` | `desktop-dark-assets.png` | Активы учебного портфеля: доли, количество, средняя цена и результат. | Example portfolio assets: allocation, holdings, average cost and result. |
| `v4-folio-market.jpg` | `desktop-light-markets.png` | Светлая тема: экран рынка в режиме учебных цен. | Light theme: the market screen using example prices. |
| `v4-folio-mobile.jpg` | `mobile-dark-overview.png` | Мобильный обзор учебного портфеля в тёмной теме. | Mobile example-portfolio overview in the dark theme. |

## Solecraft

Источник: `07-solecraft/docs/screenshots/redesign/after-*.png`, локальная M10,
17.10.2026 02:13. Отчёт прямо указывает: commit/push/deploy не выполнялись.
Следовательно, обновлённые экраны полезно показывать, но обозначать локальную
версию рядом с экраном и пояснять отличие публичного адреса.

| Файл `/projects/presentation/` | Исходник (после `after-`) | Подпись RU | Caption EN |
| --- | --- | --- | --- |
| `v4-solecraft-home.jpg` | `hero-desktop.png` | Локальная M10: предметная главная с реальной моделью из демо-каталога. | Local M10: a product-led homepage using a model from the demo catalog. |
| `v4-solecraft-product.jpg` | `product-desktop.png` | Локальная M10: выбор цвета и размера, пояснение посадки. | Local M10: color and size selection with fit guidance. |
| `v4-solecraft-catalog.jpg` | `catalog-desktop.png` | Локальная M10: каталог, фильтры и сравнимые характеристики посадки. | Local M10: catalog, filters and comparable fit characteristics. |
| `v4-solecraft-mobile.jpg` | `hero-mobile.png` | Локальная M10: мобильная главная, 360 px. | Local M10: the mobile homepage at 360 px. |

## Дежурно

Источник: `04-opsweave/output/redesign-v2/screens/chrome-latest-*.png`, локальная
версия 17.10.2026 21:20. Новый интерфейс использует гостевое личное пространство.
Публичный деплой этой версии не выполнялся. В снимках нет приватных credentials;
видимый `payments-api` — демонстрационный сервис.

| Файл `/projects/presentation/` | Исходник (после `chrome-latest-`) | Подпись RU | Caption EN |
| --- | --- | --- | --- |
| `v4-opsweave-workspace.jpg` | `workspace-dark-1440.png` | Дежурно, локальная версия: активный инцидент и следующий шаг. | Dezhurno, local version: an active incident and its next action. |
| `v4-opsweave-editor.jpg` | `editor-light-1440.png` | Локальная версия: редактор пошаговой инструкции восстановления. | Local version: an editor for a step-by-step recovery playbook. |
| `v4-opsweave-run.jpg` | `run-dark-1440.png` | Локальная версия: выполнение инструкции с задачей и историей действий. | Local version: playbook execution with a task and audit history. |
| `v4-opsweave-mobile.jpg` | `workspace-dark-390.png` | Локальная версия: мобильное рабочее пространство гостя. | Local version: the guest workspace on mobile. |

## Видеозаписи

| Файл | Исходник | Проверенные свойства | Подпись RU / EN |
| --- | --- | --- | --- |
| `/projects/reels/v4-replaylab.mp4` | `05-replaylab/standalone/docs/design/coach3d-motion.webm`, запись реального packaged app от 18.10, исходные секунды 2–18 | 16.00 s, H.264 High, yuv420p, 1280×800, 24 fps, без звука, faststart, 642030 B | Запись работающего Пятого темпа: 3D-площадка и движение игроков. / Recording of Fifth Tempo: the 3D court and player movement. |
| `/projects/reels/v4-folio.mp4` | `08-crypto-portfolio/docs/design/cinematic/implementation/motion.mp4`, запись реального приложения от 17.10 | 12.42 s, H.264 High, yuv420p, 1280×800, 24 fps, без звука, faststart, 1132349 B | Запись работающего Долемера в режиме учебного портфеля. / Recording of Dolemer in example-portfolio mode. |

Оба ролика содержат всё исходное окно: `scale` с сохранением пропорций и `pad`,
без обрезки интерфейса. Финальная проверка всей длительности с шагом 1 s обнаружила
белую загрузку в начале Пятого темпа; первые 2 s исходника удалены, включая входное
проявление сцены. Новый клип начинается с готовой главной. Долемер не потребовал
изменений. Контактные листы: `replaylab-motion-review.jpg` и
`folio-motion-review.jpg` в этой директории; чёрные свободные ячейки после конца
ролика принадлежат листу, а не видео. Все 384 кадра Пятого темпа и 298 кадров
Долемера декодированы и проверены по яркости/дисперсии: однородных белых или чёрных
кадров нет. Каждый кадр 1 fps визуально проверен: загрузок и end card нет.
Точные poster-кадры:
`/projects/presentation/v4-replaylab-motion-poster.jpg` и
`/projects/presentation/v4-folio-motion-poster.jpg` (1280×800). Не применять к ролику
`object-fit: cover`, если требуется сохранить меню и всю сцену.

Это обновление материалов портфолио. Оно не публикует и не изменяет локальные
версии Solecraft и Дежурно и не переносит на них результаты тестов портфолио.

## Финальная проверка фильма Кинорита

По дополнительному поручению проверен также `/projects/reels/v4-kinorit.mp4`.
В первоначальном 15.75-секундном клипе обнаружены белые экраны и состояния загрузки:
0.000–0.917 s, 5.458–5.708 s, 7.292–7.417 s, 11.500–11.708 s. Вокруг некоторых
загрузок также присутствовала краткая инициализация результата.

Оставлены три безопасных интервала исходного файла в исходном порядке:
**1.000–5.250 s**, **7.750–11.250 s**, **12.000–15.750 s**. Они показывают
готовую живую главную, рассчитанную воронку с настоящим диалогом настроек и
дашборд с переключением темы. Исключены загрузки и промежуточный повтор гостевой
главной; новые данные или экраны не создавались.

Итог: **11.50 s, 441602 B, H.264 High, yuv420p, 1280×800, 24 fps,
без звука, faststart**. Все **276** кадров полностью декодируются. Проверка
центральной области всех кадров не обнаружила преимущественно белого экрана.
Итоговый контактный лист с шагом 1 s просмотрен целиком: нет загрузок, спиннеров
или заставки после завершения. Лист: `kinorit-motion-review-final.jpg`;
исходная диагностика сохранена в `kinorit-motion-review.jpg` и
`kinorit-motion-detail-{0,4,6}.jpg`.
