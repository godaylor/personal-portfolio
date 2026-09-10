# Аудит очищенной основы

Дата проверки: 2026-08-28.

> Этот документ фиксирует состояние очищенной foundation до персонализации.
> Актуальная production-shell итерация описана в конце файла.

## Структура

- `src/app/` — Next.js App Router, layout, metadata, Open Graph и маршруты.
- `src/components/` — секции, навигация, карточки, анимации и UI-примитивы.
- `src/data/resume.tsx` — единый источник персональных данных и проектов.
- `content/` — будущие MDX-материалы блога; сейчас папка пустая.
- `docs/screenshots/` — проверочные desktop/mobile screenshots.
- `public/` — каталог для будущих проверенных статических материалов владельца.

## Страницы и секции

- `/` — hero, about, work experience, education, skills, projects и contact.
- `/blog` — пустой список статей с честным placeholder.
- `/blog/[slug]` — сохранённая MDX-инфраструктура для будущих статей.
- Исходная секция hackathons удалена как специфичная для прежнего владельца.

## Данные, проекты и анимации

- Персональные данные, контакты, навыки, опыт, образование и проекты находятся в
  `src/data/resume.tsx`.
- Проекты собираются из подтверждённых записей `src/data/projects.ts` через
  `getProjects(locale)`; неподтверждённые URL и медиа остаются пустыми.
- Основные анимации находятся в `src/components/magicui/blur-fade.tsx`,
  `blur-fade-text.tsx`, `flickering-grid.tsx` и `dock.tsx`.
- Анимационный runtime — уже существующая зависимость `motion`; новые библиотеки
  не добавлялись.

## Что можно оставить

- App Router layout и responsive-контейнер.
- Theme provider и переключатель темы.
- Dock-навигацию, BlurFade и FlickeringGrid.
- UI-примитивы, ProjectCard и WorkSection.
- MDX/blog pipeline и security headers из `next.config.mjs`.
- Текстовые Open Graph generators без avatar/media.

## Что ещё нужно перед публикацией

- Добавить production domain и задать `NEXT_PUBLIC_SITE_URL` в Vercel.
- Подключить GitHub remote портфолио и разрешить GitHub Actions.
- При необходимости добавить подтверждённые location, avatar, résumé, work и
  education; текущая версия публикуется без них.
- Добавить только собственные GitHub/live URL, скриншоты и видео проектов после
  их публикации или разрешения.

## Внешние зависимости и ссылки

- Runtime tracking, analytics, redirect-ссылок, социальных и личных URL нет.
- `ATTRIBUTION.md` содержит обязательную справочную ссылку на исходный шаблон.
- `components.json` содержит только dev-time registry URLs shadcn/SVGL.
- `https://schema.org` используется как словарь JSON-LD, не как сетевой сервис.
- `next/font/google` загружает Geist на этапе build; браузеру внешний запрос не
  требуется.
- Metadata base временно указывает на `http://localhost:3000`.

## Материалы от владельца

- Подтверждённые имя, роль, краткая биография и локация.
- Опыт, образование, навыки и резюме.
- Для каждого проекта: название, роль, описание, даты, технологии, repository,
  live URL и разрешённые изображения или видео.
- Email и социальные профили, которые разрешено публиковать: email, Telegram и
  GitHub уже подтверждены и добавлены.
- Аватар или решение работать без него.
- Production domain и пожелания по языкам; RU по умолчанию и EN-переключатель
  уже добавлены.
- Материалы блога, если блог остаётся.

## Проверка

- `pnpm install --frozen-lockfile` — успешно.
- `pnpm lint` — успешно, без предупреждений.
- `pnpm build` — успешно.
- Production server — HTTP 200.
- Desktop 1440 px и mobile 390 px — hydration и responsive layout проверены.
- `/`, `/blog` и favicon отвечают HTTP 200.
- Console/network errors отсутствуют; HTML-изображений нет.

## Production portfolio shell

После foundation-аудита основа была существенно адаптирована:

- добавлены hero, about, grouped stack, compact background и contact CTA;
- Selected Work стал главным блоком с единой сеткой из восьми карточек;
- добавлена типизированная project data architecture и маршруты
  `/[locale]/work/[slug]` для восьми case studies на двух языках;
- placeholders не содержат выдуманных метрик, пользователей, результатов или
  неподтверждённого стека;
- добавлены responsive media fallbacks, semantic headings/landmarks,
  keyboard focus, reduced motion, production metadata и branded Open Graph;
- созданы QA screenshots для desktop 1440 px, tablet 820 px и mobile 390 px.

Актуальные проверки, включая responsive browser smoke, MDX и dependency audit,
зафиксированы в `docs/VERIFICATION.md`.
