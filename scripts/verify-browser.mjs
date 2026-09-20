import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || "@playwright/test");
const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:32800";
const slugs = ["relayops", "signal-studio", "opsweave", "napoli", "solecraft", "folio", "replaylab"];
const externalLinks = {
  relayops: ["https://relayops-godaylor.onrender.com", "https://github.com/godaylor/relayops"],
  "signal-studio": ["https://signal-studio-smoky.vercel.app", "https://github.com/godaylor/signal-studio"],
  opsweave: ["https://opsweave.onrender.com", "https://github.com/godaylor/opsweave"],
  napoli: ["https://napoli-pizza-tau.vercel.app", "https://github.com/godaylor/napoli-pizza"],
  solecraft: ["https://solecraft-two.vercel.app", "https://github.com/godaylor/solecraft"],
  folio: ["https://folio-crypto-godaylor.maxeemzhuparov.chatgpt.site", "https://github.com/godaylor/crypto-portfolio"],
};
const channel = process.env.PORTFOLIO_PLAYWRIGHT_CHANNEL || "chrome";

for (let attempt = 0; attempt < 30; attempt += 1) {
  try {
    const response = await fetch(base);
    if (response.ok) break;
  } catch {
    if (attempt === 29) throw new Error(`Portfolio server did not become available at ${base}`);
  }
  await new Promise(resolve => setTimeout(resolve, 500));
}

const browser = await chromium.launch({ headless: true, channel });
const errors = [];
await mkdir("docs/screenshots", { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
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
      if (path.startsWith("/work/")) {
        assert.ok(await page.locator(".case-study__next").isVisible());
        assert.ok(await page.locator(".case-study__section").filter({ hasText: prefix ? "My contribution" : "Мой вклад" }).isVisible());
        assert.ok(await page.locator(".case-study__section").filter({ hasText: prefix ? "Engineering outcomes" : "Инженерные результаты" }).isVisible());
      }
      if (path === "" && !prefix) {
        assert.equal(await page.locator(".project-card").count(), 7);
        assert.equal(await page.locator(".project-card img").count(), 7);
        assert.equal(await page.getByText("VariantLab", { exact: true }).count(), 0);
        assert.equal((await page.locator(".project-card").filter({ hasText: "RelayOps" }).locator(".project-card__meta").innerText()).toLocaleLowerCase("ru-RU"), "production");
        assert.equal((await page.locator(".project-card").filter({ hasText: "Signal Studio" }).locator(".project-card__meta").innerText()).toLocaleLowerCase("ru-RU"), "production · вход");
        assert.equal((await page.locator(".project-card").filter({ hasText: "ReplayLab" }).locator(".project-card__meta").innerText()).toLocaleLowerCase("ru-RU"), "локальный release");
        for (const [slug, hrefs] of Object.entries(externalLinks)) {
          const card = page.locator(`.project-card:has(a[href="/work/${slug}"])`);
          for (const href of hrefs) assert.equal(await card.locator(`a[href="${href}"]`).count(), 1, href);
        }
        assert.equal(await page.locator('.project-card:has(a[href="/work/replaylab"]) .project-card__links').count(), 0);
      }
      if (path === "" && prefix) {
        assert.equal(await page.locator(".project-card").count(), 7);
        assert.equal(await page.locator(".project-card img").count(), 7);
        assert.equal(await page.getByText("VariantLab", { exact: true }).count(), 0);
        assert.equal((await page.locator(".project-card").filter({ hasText: "Signal Studio" }).locator(".project-card__meta").innerText()).toLowerCase(), "production · sign-in");
        assert.equal((await page.locator(".project-card").filter({ hasText: "ReplayLab" }).locator(".project-card__meta").innerText()).toLowerCase(), "local release");
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
    if ([390, 820, 1440].includes(width)) {
      await page.screenshot({ path: "docs/screenshots/portfolio-production-" + (width === 390 ? "mobile-390" : width === 820 ? "tablet-820" : "desktop-1440") + ".png", fullPage: true });
    }
  }
  await page.goto(base + "/");
  await page.locator('a[href="/#contact"]').first().click();
  await page.locator('a[href="mailto:maxeemzhuparov@mail.ru"]').waitFor({ state: "visible" });
  assert.equal(await page.locator('a[href="https://t.me/maximsberbank"]').count(), 1);
  await page.getByRole("button", { name: "Скопировать email" }).click();
  await page.getByText("Адрес сохранён в буфере обмена.").waitFor({ state: "visible" });
  assert.equal(await page.locator(".contact-panel__feedback").innerText(), "Адрес сохранён в буфере обмена.");
  const before = await page.locator("html").getAttribute("class");
  await page.getByRole("button", { name: "Сменить тему" }).click();
  assert.notEqual(await page.locator("html").getAttribute("class"), before);
  await page.screenshot({ path: "docs/screenshots/portfolio-dark-contact.png" });
  for (const prefix of ["", "/en"]) {
    for (const slug of ["does-not-exist", "variantlab"]) {
      const response = await page.goto(base + prefix + "/work/" + slug);
      assert.equal(response.status(), 404);
      assert.ok((await page.locator("h1").innerText()).includes(prefix ? "Page not found" : "Страница не найдена"));
    }
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
