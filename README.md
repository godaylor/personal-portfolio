# Максим Жупаров — frontend-портфолио

Самостоятельный двуязычный сайт-портфолио на Next.js, React и TypeScript. Он
показывает продуктовые кейсы не как галерею логотипов, а через сценарий,
текущий объём, инженерные решения, происхождение кода и следующий шаг к релизу.
Русский язык открывается по
`/`, английский — по `/en`. Переключатель сохраняет текущий путь и якорь;
язык закреплён в URL, поэтому сохраняется после перезагрузки.

**Публичный сайт:** https://personal-portfolio-maxeem.vercel.app

## Содержание

- Персональные тексты и подтверждённые email, Telegram, GitHub.
- Единая сетка из 8 карточек: Napoli, RelayOps, Signal Studio, VariantLab,
  OpsWeave, ReplayLab, Solecraft и Crypto Portfolio.
- Внутренние страницы `/work/[slug]` и `/en/work/[slug]`: текущий объём, стек,
  инженерные задачи, архитектура, происхождение, ограничения и release step.
- Адаптивный интерфейс, светлая/тёмная темы, focus и reduced motion.
- Рабочие email, Telegram и GitHub actions; email можно скопировать с доступным
  success/error feedback.
- Локализованные metadata, canonical/hreflang, JSON-LD, Open Graph, sitemap и robots.
- Сохранён MDX/blog pipeline; статей пока нет, раздел не включён в навигацию.

Источники: [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md).
Данные владельца: `src/data/resume.tsx`; проекты: `src/data/projects.ts`.
Неподтверждённые опыт, образование, фотография и резюме не отображаются.

Статусы сейчас такие: Napoli — «Локально проверено»;
RelayOps, Signal Studio, VariantLab, OpsWeave, ReplayLab и Solecraft — «В разработке»;
старый Crypto Portfolio — «На переработке». У Napoli пока нет публичного
live URL, поэтому карточка ведёт на внутреннюю страницу проекта.

## Архитектура

- App Router генерирует русские и английские страницы на сервере.
- Типизированный слой `src/data` отделяет подтверждённые факты от UI.
- `NEXT_PUBLIC_SITE_URL` управляет canonical URLs и индексацией; preview и
  локальная сборка получают `noindex`.
- Content Collections сохраняет MDX-пайплайн для будущих технических заметок,
  но пустой блог не занимает место в основной навигации.
- Backend, база данных и auth сайту не нужны: контакты — обычные безопасные
  ссылки, а контент собирается статически.

## Локальный запуск

Node.js **22.x**, pnpm **10.15.1** (поле `packageManager`).
Ранее указанное требование Node 18 было ошибочным для Next.js 16.

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Сайт: http://127.0.0.1:32800. `dev` и `start` закреплены за этим портом
и loopback-интерфейсом. Перед запуском убедитесь, что порт свободен;
не останавливайте чужие процессы. Дополнительные порты: только 32800–32899.
Docker и база данных этому портфолио не нужны.

В этой рабочей копии использован отдельный store `.pnpm-store`. Для последующих
install/update здесь добавляйте `--store-dir .pnpm-store`. Он исключён из Git;
на чистом checkout и Vercel используется обычная команда выше.

## Проверки

```powershell
pnpm lint
pnpm verify:mdx
pnpm build
pnpm start
pnpm verify:browser
```

`verify:browser` использует собственную зависимость `@playwright/test` и
установленный Chrome. Скрипт проверяет обе локали, страницы проектов, контакты,
переключение темы/языка, 404 и ширины 320/390/820/1440. Для запуска нужен
Chrome; другой канал можно передать через `PORTFOLIO_PLAYWRIGHT_CHANNEL`.
Для занятого порта запустите Next.js на свободном порту и передайте точный origin
через `PORTFOLIO_BASE_URL` — тест не завершает чужие процессы.

## Публикация

Результаты проверок: [docs/VERIFICATION.md](docs/VERIFICATION.md).

Инструкция и остающиеся входные данные:
[docs/PUBLICATION.md](docs/PUBLICATION.md).

Укажите `NEXT_PUBLIC_SITE_URL` — точный HTTPS origin сайта — до production build.
Без него, а также в Vercel Preview, сайт остаётся noindex. Контакты публичны;
секреты, БД, ключи аналитики не требуются.

Vercel Authentication включена только для preview-деплоев. Стабильный production
alias публичен и 12 сентября 2026 года проверен в новом браузерном контексте без
авторизации.

## GitHub и происхождение

`origin`: https://github.com/godaylor/personal-portfolio.git, ветка `main`.
Локальная история содержит отдельный импорт MIT-шаблона и последующую
самостоятельную переработку, поэтому происхождение прослеживается по commit history.

Основа сайта — Magic UI Portfolio, адаптированная для Максима Жупарова.
[LICENSE](LICENSE), [ATTRIBUTION.md](ATTRIBUTION.md) и
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) сохранены.
