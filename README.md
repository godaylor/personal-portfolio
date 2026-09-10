# Максим Жупаров — персональное портфолио

Существующий сайт на Next.js, React и TypeScript. Русский язык открывается по
`/`, английский — по `/en`. Переключатель сохраняет текущий путь и якорь;
язык закреплён в URL, поэтому сохраняется после перезагрузки.

## Содержание

- Персональные тексты и подтверждённые email, Telegram, GitHub.
- Единая сетка из восьми карточек: Napoli, RelayOps, Signal Studio, VariantLab,
  OpsWeave, ReplayLab, Solecraft и Crypto Portfolio.
- Внутренние страницы `/work/[slug]` и `/en/work/[slug]`: описание, стек,
  инженерные задачи, архитектура, происхождение и ограничения.
- Адаптивный интерфейс, светлая/тёмная темы, focus и reduced motion.
- Локализованные metadata, canonical/hreflang, JSON-LD, Open Graph, sitemap и robots.
- Сохранён MDX/blog pipeline; статей пока нет, раздел не включён в навигацию.

Источники: [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md).
Данные владельца: `src/data/resume.tsx`; проекты: `src/data/projects.ts`.
Неподтверждённые опыт, образование, фотография и резюме не отображаются.

Статусы сейчас такие: Napoli — «Готово» для локально подтверждённого сценария;
RelayOps, Signal Studio, VariantLab, OpsWeave, ReplayLab и Solecraft — «Скоро»;
старый Crypto Portfolio — «Требует обновления». У Napoli пока нет публичного
live URL, поэтому карточка ведёт на внутреннюю страницу проекта.

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
node scripts/verify-mdx.mjs
pnpm build
pnpm start
```

`scripts/verify-browser.mjs` проверяет обе локали, страницы проектов, контакты,
переключение темы/языка, 404 и ширины 320/390/820/1440. Для запуска нужен
Playwright с установленным Chromium. Если он уже доступен вне этого проекта,
задайте `PORTFOLIO_PLAYWRIGHT_MODULE` абсолютным путём к `@playwright/test`;
скрипт не меняет этот runtime или его репозиторий.

## Публикация

Результаты проверок: [docs/VERIFICATION.md](docs/VERIFICATION.md).

Инструкция и остающиеся входные данные:
[docs/PUBLICATION.md](docs/PUBLICATION.md).

Укажите `NEXT_PUBLIC_SITE_URL` — точный HTTPS origin сайта — до production build.
Без него, а также в Vercel Preview, сайт остаётся noindex. Контакты публичны;
секреты, БД, ключи аналитики не требуются.

## Происхождение

Основа сайта — Magic UI Portfolio, адаптированная для Максима Жупарова.
[LICENSE](LICENSE) и [ATTRIBUTION.md](ATTRIBUTION.md) сохранены.
