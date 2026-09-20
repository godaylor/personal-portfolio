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
- Vercel production deployment `dpl_6x8eQJPxWkhutyRrjgJEqy1yUVVt` имеет статус
  Ready и aliases `personal-portfolio-omega-ten-12.vercel.app` и
  `personal-portfolio-maxeem.vercel.app`.
- `NEXT_PUBLIC_SITE_URL` установлен в стабильный alias
  `https://personal-portfolio-maxeem.vercel.app`.
- Vercel Authentication имеет значение `preview`: production alias публичен,
  а preview deployments остаются защищёнными. Password protection и остальные
  защиты проекта не изменялись.
- После production deploy обязательны anonymous browser smoke для `/`, `/en`,
  case studies, robots/sitemap и 404, а также отдельная проверка preview → Vercel SSO.

## Что осталось после публикации

Эта конфигурация не требует платной базы данных, API-ключей или внешнего
сервиса. Тариф и лимиты Vercel зависят от аккаунта владельца.

1. Проект 03 добавить только после отдельного разрешения владельца, работающих
   GitHub/Live URL, screenshot и актуального handoff.

## GitHub About после входа

- **Description:** `Frontend / Full-stack portfolio with 7 verified React case studies, 6 live products and end-to-end browser verification.`
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

Актуальные links, covers и RU/EN copy находятся в `src/data/projects.ts`.
Добавлять нужно только URL, которые независимо отвечают по HTTPS, и screenshots
из release evidence самого проекта. Не использовать upstream demos.
Имена и контакты: `src/data/resume.tsx`.
Не использовать localhost и upstream demos в публичных ссылках.

Лицензии `LICENSE` и `ATTRIBUTION.md` остаются в репозитории.
