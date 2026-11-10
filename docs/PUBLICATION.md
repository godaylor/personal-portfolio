# Публикация на Vercel

Актуальное обновление: [portfolio-v6/VERIFICATION.md](portfolio-v6/VERIFICATION.md).
Content/release evidence: [UX_CONTENT_PASS.md](UX_CONTENT_PASS.md).
Ниже сохранена конфигурация существующего Vercel-проекта.

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
- Vercel production deployment `dpl_ArfpcaDcqwGtUSwQGjEyyABdasJy` имеет статус
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

## Предыдущий релиз «Формоток», 17.10.2026

Production обновлён: `dpl_Gp2NGG8bAJkQ8JvgGfSFQ5di4gMC`.
Публичный адрес сохранён: https://personal-portfolio-maxeem.vercel.app.
Проверен без авторизации в чистом Chrome. [Полный отчёт](formotok/VERIFICATION.md).

## Предыдущий релиз Maxeem, 17.10.2026

Спираль и абстрактный бренд заменены презентацией настоящих проектов.
Production: `dpl_GsaxKMms3KKCM6mfwbWmk1EKMARY`, READY.
Публичный адрес сохранён: https://personal-portfolio-maxeem.vercel.app.
Anonymous smoke пройден для 20 страниц, видео, галереи, фильтров, контактов и телефона.
[Результаты и ограничения](portfolio-v3/VERIFICATION.md).

## Предыдущий релиз Maxeem, 18.10.2026

Обновлены презентации семи приложений, актуальные имена, ролики и статусы. Исправлены высокие вертикальные и короткие горизонтальные экраны.
Production: `dpl_7jXqDb1nbiJx2MdEUw3qvK93LxyP`, READY.
Deployment: https://personal-portfolio-bzj9nobfr-maxeem.vercel.app.
Публичный адрес сохранён: https://personal-portfolio-maxeem.vercel.app.
[Результаты и ограничения](portfolio-v4/VERIFICATION.md).

## Предыдущий релиз Maxeem, 23.10.2026

Упрощены тексты; на главной 41 технология из проектов, в кейсах полные списки.
Приняты реальное имя Aster и три новых экрана. Статусы Дежурно/Solecraft сверены с публичными версиями.
Production: `dpl_FnHzJxNJLSHvGAqmtPWSaYTciHpe`, READY.
Deployment: https://personal-portfolio-hzrq23673-maxeem.vercel.app.
Существующий alias явно обновлён: https://personal-portfolio-maxeem.vercel.app.
Anonymous Chrome smoke прошёл: 20 маршрутов, медиа, фильтры, галерея, RU/EN, темы, телефон и контакты. Runtime-ошибок нет.
[Изменения, обзор приложений и границы проверки](portfolio-v5/REVIEW.md).

## Текущая сверка медиа, 23.10.2026

Повторно проверены восемь публичных приложений. Для семи обновлены изображения, для четырёх — реальные ролики. Дежурно отвечал страницей запуска Render (503), поэтому сохранены последние проверенные экраны с точной пометкой.
Production: `dpl_ArfpcaDcqwGtUSwQGjEyyABdasJy`, READY.
Deployment: https://personal-portfolio-36a4gnlcw-maxeem.vercel.app.
Существующий alias явно обновлён: https://personal-portfolio-maxeem.vercel.app.
32 локальные проверки кейсов, воспроизведение в Chrome/Firefox/WebKit и публичный Chrome smoke прошли. SHA256 всех 31 используемых медиафайлов на публичном адресе совпал с проверенными исходниками.
[Результаты и ограничения](portfolio-v6/VERIFICATION.md).
