import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const base = (
  process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:32802"
).replace(/\/$/, "");
const output = process.env.PORTFOLIO_OUTPUT || "docs/rebrand-20261110/final";
const projects = [
  {
    slug: "relayops",
    ru: "Маяк",
    en: "Mayak",
    live: "https://relayops-godaylor.onrender.com",
  },
  {
    slug: "signal-studio",
    ru: "Ракурс",
    en: "Rakurs",
    live: "https://signal-studio-smoky.vercel.app/demo",
  },
  {
    slug: "opsweave",
    ru: "По шагам",
    en: "Po Shagam",
    live: "https://opsweave.onrender.com",
  },
  {
    slug: "napoli",
    ru: "Napoli",
    en: "Napoli",
    live: "https://napoli-pizza-tau.vercel.app",
  },
  {
    slug: "solecraft",
    ru: "Solecraft",
    en: "Solecraft",
    live: "https://solecraft-two.vercel.app",
  },
  {
    slug: "folio",
    ru: "Aster",
    en: "Aster",
    live: "https://folio-crypto-godaylor.maxeemzhuparov.chatgpt.site",
  },
  {
    slug: "replaylab",
    ru: "Пятый темп",
    en: "Fifth Tempo",
    live: "https://replaylab-godaylor.onrender.com",
  },
  {
    slug: "variantlab",
    ru: "Просто монтаж",
    en: "Prosto Montage",
    live: "https://variantlab-creative-ops-demo.maxeemzhuparov.chatgpt.site/variantlab/",
  },
];
const report = {
  base,
  checkedAt: new Date().toISOString(),
  browser: "Installed Chrome",
  assets: [],
  checks: [],
  screenshots: [],
  errors: [],
};
const checkedAssets = new Map();
const staleName = /Яснослед|Yasnosled|Кадроли|Kadrol[iy]|Сборитм|Sboritm|Кинорит|Kinorit|Дежурно(?![а-яё])|Dezhurno/i;
await mkdir(output, { recursive: true });

function originalSource(src) {
  const parsed = new URL(src, base);
  return parsed.pathname === "/_next/image"
    ? parsed.searchParams.get("url")
    : parsed.pathname;
}
function verifyVersion(src, project) {
  const expected =
    ["relayops", "signal-studio", "opsweave"].includes(project.slug)
      ? /^\/projects\/presentation\/v7-(?:mayak|rakurs|po-shagam)-[\w-]+\.jpg$/
      : /^\/projects\/presentation\/v6-[\w-]+\.jpg$/;
  assert.match(src, expected, `Current media version: ${project.slug} ${src}`);
}
async function verifyJpeg(context, src, project) {
  verifyVersion(src, project);
  if (checkedAssets.has(src)) return;
  const response = await context.request.get(base + src);
  assert.equal(response.status(), 200, `JPEG HTTP response: ${src}`);
  const buffer = await response.body();
  const metadata = await sharp(buffer).metadata();
  assert.equal(metadata.format, "jpeg", `Actual JPEG data: ${src}`);
  assert.ok(
    metadata.width >= 320 && metadata.height >= 200,
    `Actual dimensions: ${src}`,
  );
  const asset = {
    src,
    width: metadata.width,
    height: metadata.height,
    bytes: buffer.length,
  };
  checkedAssets.set(src, asset);
  report.assets.push(asset);
}
async function verifyLoaded(locator, label) {
  await locator.scrollIntoViewIfNeeded();
  await locator.evaluate((img) => img.decode());
  assert.ok(
    await locator.evaluate(
      (img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0,
    ),
    `Rendered image: ${label}`,
  );
}
async function verifyPage(page, label) {
  const text = await page.locator("body").innerText();
  assert.doesNotMatch(text, staleName, `No old product names: ${label}`);
  assert.doesNotMatch(
    (
      await page
        .locator("img")
        .evaluateAll((imgs) => imgs.map((img) => img.alt))
    ).join(" "),
    staleName,
    `No old image labels: ${label}`,
  );
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    `No horizontal overflow: ${label}`,
  );
}
async function screenshot(pageOrLocator, name) {
  const path = `${output}/${name}.png`;
  await pageOrLocator.screenshot({ path, animations: "disabled" });
  report.screenshots.push(path);
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const mobile of [false, true]) {
    const device = mobile ? "mobile" : "desktop";
    const context = await browser.newContext({
      viewport: mobile
        ? { width: 390, height: 844 }
        : { width: 1440, height: 1000 },
      isMobile: mobile,
      hasTouch: mobile,
      reducedMotion: "reduce",
      colorScheme: "light",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => report.errors.push(error.message));
    for (const locale of ["ru", "en"]) {
      const prefix = locale === "en" ? "/en" : "";
      const response = await page.goto(base + prefix + "/", {
        waitUntil: "networkidle",
      });
      assert.equal(response.status(), 200);
      assert.equal(await page.locator(".project-card").count(), 8);
      await verifyPage(page, `${locale} home ${device}`);
      for (const project of projects) {
        const card = page.locator(
          `.project-card[data-project="${project.slug}"]`,
        );
        assert.equal(await card.locator("h3").innerText(), project[locale]);
        const relative = `${prefix}/work/${project.slug}`;
        assert.equal(
          await card.locator(".project-card__media-link").getAttribute("href"),
          relative,
        );
        assert.equal(await card.locator("h3 a").getAttribute("href"), relative);
        const media = card.locator(".project-media > img");
        await verifyLoaded(media, `${locale} ${project.slug} card ${device}`);
        const src = originalSource(await media.getAttribute("src"));
        await verifyJpeg(context, src, project);
        const status = await card.locator(".project-card__meta").innerText();
        assert.equal(
          /локальная версия|local version/i.test(status),
          Boolean(project.local),
          `Only OpsWeave and Solecraft are local: ${project.slug}`,
        );
        assert.equal(
          await card.locator(`a[href="${project.live}"]`).count(),
          1,
          `Stable public action: ${project.slug}`,
        );
        if (project.slug === "replaylab")
          assert.doesNotMatch(
            await card.innerText(),
            /демо недоступно|demo unavailable|unavailable/i,
          );
        await screenshot(
          card,
          `current-card-${locale}-${project.slug}-${device}`,
        );
      }
      for (const project of projects) {
        const relative = `${prefix}/work/${project.slug}`;
        const response = await page.goto(base + relative, {
          waitUntil: "networkidle",
        });
        assert.equal(response.status(), 200, `Stable case route: ${relative}`);
        assert.equal(new URL(page.url()).pathname, relative);
        assert.equal(
          await page.locator("h1#project-title").innerText(),
          project[locale],
        );
        assert.ok(
          (await page.title()).startsWith(project[locale]),
          `Current metadata title: ${relative}`,
        );
        const canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute("href");
        assert.equal(
          new URL(canonical, base).pathname,
          relative,
          `Stable canonical path: ${relative}`,
        );
        const live = page.locator(
          `.case-study__actions a[href="${project.live}"]`,
        );
        assert.equal(await live.count(), 1);
        assert.equal(
          /previous interface|прежний интерфейс/i.test(await live.innerText()),
          Boolean(project.local),
        );
        assert.equal(
          /local version|локальная версия/i.test(
            await page.locator(".case-study__status").innerText(),
          ),
          Boolean(project.local),
        );
        if (project.slug === "replaylab") {
          assert.match(
            await live.innerText(),
            /Открыть приложение|Open application/,
          );
          assert.doesNotMatch(
            await page.locator("main").innerText(),
            /демо недоступно|demo unavailable|unavailable/i,
          );
        }
        const thumbs = page.locator(".project-gallery__thumbnails button");
        assert.equal(
          await thumbs.count(),
          3,
          `Three current screens: ${relative}`,
        );
        for (let index = 0; index < 3; index++) {
          const thumbnail = thumbs.nth(index);
          const src = originalSource(
            await thumbnail.locator("img").getAttribute("src"),
          );
          await verifyJpeg(context, src, project);
          await thumbnail.click();
          const main = page.locator(".project-gallery__main img");
          await verifyLoaded(main, `${relative} gallery ${index}`);
          assert.equal(originalSource(await main.getAttribute("src")), src);
          assert.equal(await thumbnail.getAttribute("aria-pressed"), "true");
        }
        await thumbs.first().click();
        await verifyPage(page, `${relative} ${device}`);
        await page.locator(".project-gallery").evaluate((el) =>
          window.scrollTo({
            top: el.getBoundingClientRect().top + scrollY - 100,
            behavior: "instant",
          }),
        );
        await screenshot(
          page,
          `current-case-${locale}-${project.slug}-${device}`,
        );
        if (locale === "ru" && !mobile) {
          const alias = await context.request.get(
            base + `/ru/work/${project.slug}`,
          );
          assert.equal(
            alias.status(),
            200,
            `Existing /ru alias: ${project.slug}`,
          );
          assert.ok(
            (await alias.text()).includes(project.ru),
            `Russian alias retains current identity: ${project.slug}`,
          );
        }
        report.checks.push(`${locale}/${project.slug}/${device}`);
        console.log(
          "PASS current identity, cover/gallery JPEGs, stable links and source status",
          locale,
          project.slug,
          device,
        );
      }
    }
    await context.close();
  }
  assert.deepEqual(report.errors, [], "No browser JavaScript errors");
  console.log(
    `PASS ${report.checks.length} case/locale/device checks; ${report.assets.length} unique JPEGs; ${report.screenshots.length} screenshots`,
  );
} finally {
  await writeFile(
    `${output}/current-media-report.json`,
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
