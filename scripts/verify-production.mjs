import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const base = process.env.PORTFOLIO_PUBLIC_URL || 'https://personal-portfolio-maxeem.vercel.app';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce', permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/', '/en', '/work/signal-studio', '/work/replaylab', '/en/work/variantlab']) {
    await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    // Allow a provider's normal browser check to finish; no bypass headers/cookies.
    await page.locator('main#main-content h1').waitFor({ timeout: 60000 });
    assert.ok(page.url().startsWith(base));
    assert.match(await page.title(), /Maxeem/);
    assert.doesNotMatch(await page.locator('body').innerText(), /Максим|Жупаров|Maksim|Zhuparov/);
    assert.equal(await page.locator('html').getAttribute('lang'), path.startsWith('/en') ? 'en' : 'ru');
    assert.doesNotMatch(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
    if (path === '/' || path === '/en') {
      assert.equal(await page.locator('.project-card').count(), 8);
      assert.equal(await page.locator('.about-card, .hero__system').count(), 0);
      assert.equal(await page.locator('a[href="https://signal-studio-smoky.vercel.app/demo"]').count(), 1);
      assert.equal(await page.locator('a[href="mailto:maxeemit@mail.ru"]').count(), 1);
      const person = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
      assert.equal(person.name, 'Maxeem');
      const email = page.getByRole('button', { name: path === '/' ? 'Скопировать почту' : 'Copy email' });
      await email.click();
      await page.getByText(path === '/' ? 'Адрес сохранён в буфере обмена.' : 'The address is in your clipboard.').waitFor();
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'maxeemit@mail.ru');
    } else {
      const img = page.locator('.project-media img');
      await img.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('.project-media img')].every(img => img.complete && img.naturalWidth > 0));
    }
    console.log('PASS anonymous production', path);
    await page.waitForTimeout(1000);
  }
  for (const path of ['/robots.txt', '/sitemap.xml', '/opengraph-image', '/projects/signal-studio-v3.png', '/projects/variantlab.png']) {
    const response = await context.request.get(base + path);
    assert.equal(response.status(), 200, path);
    if (path === '/sitemap.xml') { const xml = await response.text(); assert.match(xml, /work\/variantlab/); assert.doesNotMatch(xml, /localhost/); }
    console.log('PASS public asset', path);
  }
  const missing = await page.goto(base + '/work/does-not-exist');
  assert.equal(missing.status(), 404);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.deepEqual(errors, []);
  console.log('PASS published V3 identity, content, assets, contact, mobile and 404 without authentication');
} finally { await browser.close(); }
