# Проверка готовности — 2026-09-12

Среда: Windows, Node 22.15.1, pnpm 10.15.1, Next.js 16.3.4.
Финальная проверка выполнена на production server http://127.0.0.1:32802.
Порты 32800–32801 были заняты, поэтому выбран свободный 32802; чужие процессы и Docker
не останавливались и не изменялись.
Соседние репозитории не изменялись. Чужие процессы и Docker не затрагивались.

## Результат

- `pnpm lint`: PASS.
- `pnpm build`: PASS, TypeScript и генерация страниц проходят.
- `pnpm verify:mdx`: PASS — компиляция MDX, serialization,
  UUID и TOML после точечных security overrides.
- `pnpm verify:browser`: PASS через собственный `@playwright/test` 1.63.0 и
  установленный Chrome; соседние репозитории больше не используются как runtime.
- `pnpm audit` и `pnpm audit --prod`: PASS, известных уязвимостей нет.
- `git diff --check`: PASS; LICENSE, attribution и third-party notices присутствуют.

## Браузер

`scripts/verify-browser.mjs` выполнен через локальную dependency проекта.
Запуск браузера headless; соседние процессы и репозитории не использовались.

- HTTP 200: две главные, шестнадцать страниц проектов, два списка блога.
- У каждой страницы правильный html lang, один h1 и main, нет повторяющихся id.
- RU/EN сохраняет текущий проект; reload сохраняет язык из URL.
- Контакты имеют точные подтверждённые href; email-письмо не отправлялось.
- GitHub и Telegram отдельно проверены GET: HTTP 200.
- Переключение темы работает.
- Несуществующие проекты возвращают HTTP 404 и локализованный текст.
- Статусы карточек отражают release-зрелость: Napoli — «Локально проверено»,
  Crypto Portfolio — «На переработке», остальные — «В разработке»; в EN
  используются Locally verified / Being rebuilt / In development.
- Каждая project page содержит текущий объём и конкретный следующий release step.
- Копирование email возвращает доступный `aria-live` success feedback.
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

GitHub workflow в `.github/workflows/ci.yml` использует Node 22, pnpm 10.15.1,
frozen install, lint, MDX smoke, build и полный browser smoke. `origin` настроен
на `godaylor/personal-portfolio`, но сохранённая GitHub CLI-сессия недействительна.

Устаревшие автоматически созданные `.next/dev/types` удалены после переноса
маршрутов: это воспроизводимый кэш, не исходники. При необходимости Next.js
создаст его заново.

## Границы проверки

Production deployment `dpl_3H7jGtrS7drRKFPQFjd4tYcbmG2n` имеет статус Ready.
Stable alias `https://personal-portfolio-maxeem.vercel.app` проверен анонимно
через curl и новый Playwright browser context без cookies: `/`, `/en` и
`/work/napoli` вернули HTTP 200 без перехода на login, имеют правильные lang,
один h1 и индексируемую robots meta. robots.txt и sitemap.xml вернули HTTP 200,
несуществующий маршрут — HTTP 404.

Vercel Authentication переключена только на `preview`. Для доказательной
проверки создан preview deployment `dpl_7hYsFQ4MV1jYqWaxmanFd5khYXpM`: анонимный
запрос вернул HTTP 302 на Vercel SSO, а свежий browser context оказался на
Vercel Login. Password protection и прочие защиты проекта не изменялись.

Реальная доставка email и полная проверка screen reader не выполнялись.
Другие приложения портфолио не запускались и не проходили повторный аудит.
Скриншоты самих проектов и публичные demo URLs отсутствуют намеренно.
Оставшиеся действия и доступы — в PUBLICATION.md.
