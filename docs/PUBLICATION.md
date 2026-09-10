# Публикация на Vercel

## Настройки

- Framework preset: Next.js; root directory: корень этого репозитория.
- Node.js: 22.x; pnpm: 10.15.1 из packageManager.
- Install command: `pnpm install --frozen-lockfile`.
- Build command: `pnpm build`; Output directory: стандартная настройка Next.js.
- `vercel.json` уже содержит framework/install/build.
- `NEXT_PUBLIC_SITE_URL`: точный HTTPS origin, без пути, задаётся до сборки.
  Для production укажите в Production environment. После изменения нужен redeploy.
- Preview получает noindex даже при заданном production origin благодаря
  `VERCEL_ENV`. Локальная версия без origin тоже noindex; sitemap пуст.
- Локальный порт 32800 не нужно настраивать на Vercel: provider использует
  Next.js runtime. `pnpm start` — только для локальной проверки сборки.

Версии Node задаются через engines согласно
[Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
Маршрутизация локалей использует серверные страницы согласно
[Next.js internationalization](https://nextjs.org/docs/app/guides/internationalization).

## Текущее состояние

- `origin` настроен на `https://github.com/godaylor/personal-portfolio.git`,
  ветка — `main`.
- Локальная папка связана с Vercel project id через `.vercel/project.json`
  (файл игнорируется Git).
- Сохранённая GitHub CLI-сессия недействительна; push и GitHub About требуют
  повторного входа владельца.
- Vercel production deployment `dpl_3H7jGtrS7drRKFPQFjd4tYcbmG2n` имеет статус
  Ready и aliases `personal-portfolio-omega-ten-12.vercel.app` и
  `personal-portfolio-maxeem.vercel.app`.
- `NEXT_PUBLIC_SITE_URL` установлен в стабильный alias
  `https://personal-portfolio-maxeem.vercel.app`.
- Deployment Protection сейчас имеет значение `all_except_custom_domains`,
  поэтому анонимный посетитель перенаправляется на Vercel Login. Для публичного
  релиза нужно явно одобренное переключение Vercel Authentication на `preview`;
  preview deployments останутся защищёнными.

## Что нужно для фактической публикации

Эта конфигурация не требует платной базы данных, API-ключей или внешнего
сервиса. Тариф и лимиты Vercel зависят от аккаунта владельца.

1. Явно разрешить смену Vercel Authentication с `all_except_custom_domains` на
   `preview`, чтобы открыть production и сохранить защиту preview.
2. Восстановить CLI-вход владельца в GitHub на этом компьютере.
3. Push локальной `main` в настроенный `origin`; убедиться, что CI зелёный.
4. На публичном URL проверить обе локали, все проекты, контакты, 404, OG,
   canonical/hreflang, robots/sitemap, HTTPS и мобильный вид.

## GitHub About после входа

- **Description:** `Bilingual product-minded frontend portfolio with 8 React case studies, accessible UX and end-to-end browser verification.`
- **Website:** точный production HTTPS URL после Vercel deploy.
- **Topics:** `portfolio`, `frontend`, `react`, `nextjs`, `typescript`,
  `accessibility`, `i18n`, `playwright`, `case-study`.

Команды не должны завершать чужие процессы или затрагивать Docker. Если 32800
занят, текущий проект следует запустить на свободном порту, а проверке передать
`PORTFOLIO_BASE_URL`.

## Контент после публикации

Контакты уже подтверждены и добавлены. Дополнительно, по желанию:
город/часовой пояс, фотография, PDF-резюме, опыт и образование с датами.
Эти поля не блокируют текущую версию сайта.

Для более подробных кейсов нужны описание личного вклада, задачи и решения,
разрешённые скриншоты/видео, подтверждённые URL репозиториев каждого проекта.
Публичные демо добавляются после собственного deploy проектов.

Обновлять `PROJECT_PUBLICATION` в `src/data/projects.ts`: `links`, `cover.src`.
Статус демо автоматически меняется при добавлении ссылки с label `Live demo`.
Описания редактируются в полях `ru` и `en` соответствующей записи.
URL и обложки следует хранить в общих полях записи проекта, а текст — в локалях.
Имена и контакты: `src/data/resume.tsx`.
Не использовать localhost и upstream demos в публичных ссылках.

Лицензии `LICENSE` и `ATTRIBUTION.md` остаются в репозитории.
