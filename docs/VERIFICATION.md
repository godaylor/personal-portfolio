# Проверка готовности — 2026-09-20

Среда: Windows, Node 22, pnpm 10.15.1, Next.js 16.3.4. Соседние PetProjects
использовались только как read-only источники фактов и release screenshots. Их
код, процессы, Docker-контейнеры, сети и volumes не изменялись. Для локального
smoke использован свободный порт 32811; процесс этого проекта после проверки
остановлен.

## Локальные проверки

- `pnpm lint`: PASS.
- `pnpm verify:mdx`: PASS.
- `pnpm build`: PASS — 24 статические страницы, включая 14 локализованных
  project pages; маршрутов VariantLab нет.
- `pnpm verify:browser`: PASS — RU/EN, главная, 14 case studies, blog, 404,
  theme/language/contact interactions, точные external href и assets.
- Viewports 320, 390, 820 и 1440: PASS без горизонтального overflow.
- Runtime: нет неожиданных console, hydration или page errors.
- `pnpm audit --prod`: PASS, известных production-уязвимостей нет.
- Secret-pattern scan и `git diff --check`: PASS.

Скриншоты текущей проверки находятся в `docs/screenshots/portfolio-*.png`.
Desktop и mobile результаты просмотрены визуально.

## Контент и ссылки

- Публично представлены 7 кейсов: RelayOps, Signal Studio, OpsWeave, Napoli,
  Solecraft, Folio и ReplayLab.
- Для 6 опубликованных приложений GitHub и Live URL независимо ответили HTTP 200.
- У каждого кейса есть актуальный release screenshot, описание продукта, личный
  вклад, стек, 2–4 инженерных результата, архитектура и честные границы.
- ReplayLab помечен как local release и не получил выдуманные GitHub/Live ссылки.
- VariantLab отсутствует в data, UI, static routes и sitemap; RU/EN URL возвращают
  HTTP 404.

## Production

Deployment `dpl_6x8eQJPxWkhutyRrjgJEqy1yUVVt` имеет статус `READY`, target
`production` и назначен stable alias:
`https://personal-portfolio-maxeem.vercel.app`.

Анонимный smoke в новом in-app browser подтвердил:

- production проходит штатную Vercel Security Checkpoint без входа;
- RU home показывает новое позиционирование и ровно 7 актуальных кейсов;
- `/en` открывает полную английскую версию;
- `/work/folio` открывает case study, screenshot, Live и GitHub CTA;
- VariantLab в production не показывается.

Плотный автоматический probe временно активировал `X-Vercel-Mitigated:
challenge`; это anti-bot защита, а не Vercel Authentication. Она пройдена
штатным браузером и не отключалась.

Vercel API подтверждает `ssoProtection.deploymentType = preview`. Production
публичен; анонимный запрос к preview `dpl_7hYsFQ4MV1jYqWaxmanFd5khYXpM`
перенаправляется на Vercel SSO. Password protection и остальные защиты не
изменялись.

## Границы

Реальная отправка email и полный screen-reader аудит не выполнялись. Signal
Studio честно помечен как `Production · sign-in`; публичной регистрации или
демо-аккаунта не заявлено. Следующее контентное добавление — только VariantLab
после отдельного разрешения и подтверждённых GitHub/Live URL и screenshot.
