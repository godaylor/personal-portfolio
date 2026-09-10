# Локальная проверка готовности — 2026-09-08

Среда: Windows, Node 22.15.1, pnpm 10.15.1, Next.js 16.3.4.
Проверка выполнена на production server http://127.0.0.1:32800.
Порт был свободен перед запуском; использовались только собственные процессы.
Соседние репозитории не изменялись. Commit/push/deploy не выполнялись.

## Результат

- `pnpm install --frozen-lockfile --store-dir .pnpm-store`: PASS.
- `pnpm lint`: PASS.
- `pnpm build`: PASS, TypeScript и генерация страниц проходят.
- `pnpm audit` и `pnpm audit --prod`: 0 уязвимостей.
- `node scripts/verify-mdx.mjs`: PASS — компиляция MDX, serialization,
  UUID и TOML после точечных security overrides.
- `git diff --check`: PASS; LICENSE и ATTRIBUTION.md без изменений.

## Браузер

`scripts/verify-browser.mjs` выполнен через существующий Playwright из
`07-solecraft/node_modules/@playwright/test` в режиме read-only runtime reuse.
Запуск браузера headless; в соседнем репозитории ничего не создавалось.

- HTTP 200: две главные, шестнадцать страниц проектов, два списка блога.
- У каждой страницы правильный html lang, один h1 и main, нет повторяющихся id.
- RU/EN сохраняет текущий проект; reload сохраняет язык из URL.
- Контакты имеют точные подтверждённые href; email-письмо не отправлялось.
- GitHub и Telegram отдельно проверены GET: HTTP 200.
- Переключение темы работает.
- Несуществующие проекты возвращают HTTP 404 и локализованный текст.
- Статусы карточек совпадают с договорённостью: Napoli — «Готово», Crypto
  Portfolio — «Требует обновления», остальные — «Скоро»; в EN используются
  Ready / Needs update / Coming soon.
- robots.txt, sitemap.xml, opengraph-image (PNG), icon.svg: HTTP 200.
- Локальная версия содержит noindex; placeholder localhost-ссылок в UI нет.
- Ширины 320, 390, 820 и 1440 проверены для RU/EN главных и внутренних страниц:
  горизонтальный overflow и выход проверяемых элементов за экран не обнаружены.
- Ошибок JavaScript/hydration/console, кроме ожидаемых HTTP 404 probes, нет.
- Мобильный 390px и desktop 1440px просмотрены визуально после исправления
  переноса русского hero-заголовка.

Скриншоты текущей проверки: `docs/screenshots/portfolio-ru-*.png`,
`portfolio-hero-*.png`, `portfolio-dark-contact.png`.
Ранее существовавшие screenshots не удалялись.

## Что изменилось в инфраструктуре

Next.js обновлён с 16.1.1 до 16.3.4; совместимые dependency ranges обновлены
в lockfile. Для прежнего MDX pipeline зафиксированы security overrides:
serialize-javascript 7.0.5, uuid 11.1.1 и toml 4.2.0.
Обе локали генерируются на сервере; дополнительная i18n-библиотека не добавлена.
Open Graph переведён с deprecated Edge runtime на Node.js.

GitHub-ready workflow добавлен в `.github/workflows/ci.yml`: Node 22, pnpm
10.15.1, frozen install, lint, MDX smoke и build. Git remote проекта пока пуст.

Устаревшие автоматически созданные `.next/dev/types` удалены после переноса
маршрутов: это воспроизводимый кэш, не исходники. При необходимости Next.js
создаст его заново.

## Границы проверки

Фактический Vercel deploy, production origin/DNS, индексация на реальном домене,
реальная доставка email и полная проверка screen reader не выполнялись.
Другие приложения портфолио не запускались и не проходили повторный аудит.
Скриншоты самих проектов и публичные demo URLs отсутствуют намеренно.
Оставшиеся действия и доступы — в PUBLICATION.md.
