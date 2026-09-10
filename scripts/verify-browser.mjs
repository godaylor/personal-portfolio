import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || "@playwright/test");
const base = "http://127.0.0.1:32800";
const slugs = ["relayops", "signal-studio", "variantlab", "opsweave", "replaylab", "napoli", "solecraft", "crypto-portfolio"];
const browser = await chromium.launch({ headless: true });
const errors = [];
await mkdir("docs/screenshots", { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  for (const prefix of ["", "/en"]) {
    for (const path of ["", ...slugs.map(slug => "/work/" + slug), "/blog"]) {
      const response = await page.goto(base + prefix + (path || "/"));
      assert.equal(response.status(), 200, prefix + path);
      await page.locator("h1").waitFor();
      assert.equal(await page.locator("html").getAttribute("lang"), prefix ? "en" : "ru");
      assert.equal(await page.locator("main#main-content").count(), 1);
      assert.equal(await page.locator("h1").count(), 1);
      if (path === "" && !prefix) {
        assert.equal((await page.locator(".project-card").filter({ hasText: "Napoli" }).locator(".project-card__meta").innerText()).toLocaleLowerCase("ru-RU"), "готово");
        assert.equal((await page.locator(".project-card").filter({ hasText: "Crypto Portfolio" }).locator(".project-card__meta").innerText()).toLocaleLowerCase("ru-RU"), "требует обновления");
        assert.equal((await page.locator(".project-card").filter({ hasText: "RelayOps" }).locator(".project-card__meta").innerText()).toLocaleLowerCase("ru-RU"), "скоро");
      }
      if (path === "" && prefix) {
        assert.equal((await page.locator(".project-card").filter({ hasText: "Napoli" }).locator(".project-card__meta").innerText()).toLowerCase(), "ready");
        assert.equal((await page.locator(".project-card").filter({ hasText: "Crypto Portfolio" }).locator(".project-card__meta").innerText()).toLowerCase(), "needs update");
        assert.equal((await page.locator(".project-card").filter({ hasText: "RelayOps" }).locator(".project-card__meta").innerText()).toLowerCase(), "coming soon");
      }
      const links = await page.locator("a[href]").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")));
      for (const href of links) {
        assert.ok(!/localhost|127\.0\.0\.1|example\./.test(href), "Placeholder link " + href);
        if (href.startsWith("#")) assert.equal(await page.locator(href).count(), 1, href);
      }
      const duplicates = await page.locator("[id]").evaluateAll(nodes => nodes.map(node => node.id).filter((id, i, ids) => ids.indexOf(id) !== i));
      assert.deepEqual(duplicates, []);
      assert.ok((await page.locator('meta[name="robots"]').getAttribute("content")).includes("noindex"));
      console.log("PASS route", prefix + (path || "/"));
    }
    await page.goto(base + prefix + "/work/napoli");
    await page.locator(".language-switch").click();
    await page.waitForURL(base + (prefix ? "" : "/en") + "/work/napoli");
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("lang"), prefix ? "ru" : "en");
  }
  for (const width of [320, 390, 820, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const prefix of ["", "/en"]) {
      for (const path of ["/", "/work/solecraft"]) {
        await page.goto(base + prefix + path);
        await page.locator("footer, .case-study__body").first().scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollTo(0, 0));
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Overflow " + width + prefix + path);
        const clipped = await page.locator("h1, .site-header__inner, .contact-action").evaluateAll(nodes => nodes.filter(node => {
          const box = node.getBoundingClientRect();
          return box.width > 0 && (box.left < -1 || box.right > innerWidth + 1);
        }).map(node => node.textContent));
        assert.deepEqual(clipped, [], "Clipped content " + width);
      }
    }
    await page.goto(base + "/");
    await page.screenshot({ path: "docs/screenshots/portfolio-ru-" + width + ".png", fullPage: true });
    await page.screenshot({ path: "docs/screenshots/portfolio-hero-" + width + ".png" });
  }
  await page.goto(base + "/");
  await page.locator('a[href="/#contact"]').first().click();
  await page.locator('a[href="mailto:maxeemzhuparov@mail.ru"]').waitFor({ state: "visible" });
  assert.equal(await page.locator('a[href="https://t.me/maximsberbank"]').count(), 1);
  const before = await page.locator("html").getAttribute("class");
  await page.getByRole("button", { name: "Сменить тему" }).click();
  assert.notEqual(await page.locator("html").getAttribute("class"), before);
  await page.screenshot({ path: "docs/screenshots/portfolio-dark-contact.png" });
  for (const prefix of ["", "/en"]) {
    const response = await page.goto(base + prefix + "/work/does-not-exist");
    assert.equal(response.status(), 404);
    assert.ok((await page.locator("h1").innerText()).includes(prefix ? "Page not found" : "Страница не найдена"));
  }
  for (const path of ["/robots.txt", "/sitemap.xml", "/opengraph-image", "/icon.svg"]) {
    const response = await page.request.get(base + path);
    assert.equal(response.status(), 200, path);
    console.log("PASS asset", path, response.headers()["content-type"]);
  }
  // Browsers log expected 404 responses, so only exclude those explicit probes.
  assert.deepEqual(errors.filter(error => !error.includes("404")), []);
  console.log("PASS language switch/reload, contacts, theme, 404, responsive 320/390/820/1440; no runtime errors");
} finally {
  await browser.close();
}
