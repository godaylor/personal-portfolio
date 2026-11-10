import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
const base =
  process.env.PORTFOLIO_BASE_URL ||
  "https://personal-portfolio-maxeem.vercel.app";
const b = await chromium.launch({ channel: "chrome" });
const failures = [];
try {
  const context = await b.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  const p = await context.newPage();
  p.on("pageerror", (e) => failures.push(e.message));
  for (const prefix of ["", "/en"])
    for (const path of [
      "",
      "/work/relayops",
      "/work/signal-studio",
      "/work/opsweave",
      "/work/napoli",
      "/work/solecraft",
      "/work/folio",
      "/work/replaylab",
      "/work/variantlab",
      "/blog",
    ]) {
      const r = await context.request.get(base + prefix + path);
      assert.equal(r.status(), 200, `${prefix}${path}`);
      assert.ok(!(await r.text()).includes("Authentication Required"));
    }
  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/opengraph-image",
    "/icon.svg",
    "/favicon.ico",
  ]) {
    const r = await context.request.get(base + path);
    assert.equal(r.status(), 200, path);
  }
  await p.goto(base);
  await p.waitForLoadState("networkidle");
  assert.equal(await p.locator(".skill-group").count(), 6);
  assert.equal(await p.locator(".skill-group li").count(), 41);
  assert.equal(await p.locator("#contact-title").innerText(), "Связаться со мной");
  for (const name of ["Маяк", "Ракурс", "По шагам"]) {
    assert.equal(await p.getByRole("heading", { name, exact: true }).count(), 1);
  }
  assert.doesNotMatch(await p.locator("body").innerText(), /Сборитм|Кинорит|Дежурно(?![а-яё])|Открыт к предложениям/);
  assert.match(await p.locator("#about").innerText(), /AI-инструменты/);
  assert.doesNotMatch(await p.locator("#about").innerText(), /бизнес|продуктов[а-яё]* аналитик/i);
  for (const href of await p.locator('a[href^="mailto:"]').evaluateAll(links => links.map(link => link.getAttribute("href")))) {
    assert.equal(href, "mailto:maxeemit@mail.ru");
  }
  assert.ok(
    await p.getByRole("heading", { name: "Aster", exact: true }).isVisible(),
  );
  assert.match(await p.title(), /Maxeem/);
  assert.equal(await p.locator("html").getAttribute("lang"), "ru");
  await p.locator('.project-reel__screen video[data-ready="true"]').waitFor();
  assert.equal(
    await p.locator('link[rel="canonical"]').getAttribute("href"),
    base,
  );
  await p.waitForTimeout(1000);
  await p.screenshot({ path: "docs/rebrand-20261110/final/public-desktop.png" });
  await p
    .getByRole("button", { name: "Остановить анимацию", exact: true })
    .click();
  assert.equal(await p.locator("html").getAttribute("data-motion"), "paused");
  await p
    .getByRole("button", { name: "Включить анимацию", exact: true })
    .click();
  await p.getByRole("link", { name: "Смотреть проекты", exact: true }).click();
  await p.getByRole("button", { name: "Магазины", exact: true }).click();
  assert.equal(await p.locator(".featured-projects .project-card").count(), 2);
  await p
    .getByRole("link", { name: "О проекте Solecraft", exact: true })
    .click();
  await p.waitForURL("**/work/solecraft");
  await p.locator(".project-gallery__main").click();
  assert.equal(await p.locator("dialog[open]").count(), 1);
  await p.keyboard.press("Escape");
  await p.getByRole("link", { name: "Switch to English" }).click();
  await p.waitForURL("**/en/work/solecraft");
  assert.equal(await p.locator("html").getAttribute("lang"), "en");
  await p.goto(base);
  await p.getByRole("button", { name: "Сменить тему" }).click();
  assert.ok(
    await p.locator("html").evaluate((el) => el.classList.contains("dark")),
  );
  await p.waitForTimeout(700);
  await p.screenshot({ path: "docs/rebrand-20261110/final/public-dark.png" });
  const mobile = await b.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    colorScheme: "light",
  });
  const m = await mobile.newPage();
  m.on("pageerror", (e) => failures.push(e.message));
  await m.goto(base);
  await m.waitForLoadState("networkidle");
  await m.locator('.project-reel__screen video[data-ready="true"]').waitFor();
  assert.ok(
    await m.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  );
  await m.screenshot({ path: "docs/rebrand-20261110/final/public-mobile.png" });
  await m.getByRole("link", { name: "Контакты", exact: true }).click();
  await m.getByRole("button", { name: "Скопировать почту" }).click();
  assert.ok(await m.locator(".contact-panel__feedback").isVisible());
  assert.deepEqual(failures, []);
  console.log(
    "PASS anonymous public Chrome: 20 routes, assets, product video, pause, filters, gallery, RU/EN, themes, mobile scroll, contact, no runtime errors",
  );
  await context.close();
  await mobile.close();
} finally {
  await b.close();
}
