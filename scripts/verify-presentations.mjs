import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from '@playwright/test';

const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:41900';
const engine = process.env.PORTFOLIO_BROWSER || 'chromium';
const browser = await ({ chromium, firefox, webkit })[engine].launch({ headless: true, ...(engine === 'chromium' ? { channel: 'chrome' } : {}) });
const slugs = ['relayops', 'signal-studio', 'opsweave', 'napoli', 'solecraft', 'folio', 'replaylab', 'variantlab'];
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  if (process.env.PORTFOLIO_NETWORK_DEBUG) page.on('requestfailed', request => console.log('NETWORK', request.url(), request.failure()));
  for (const prefix of ['', '/en']) {
    await page.goto(base + prefix + '/');
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('.section-heading > .section-eyebrow').count(), 0);
    // No gallery or full gallery assets on the landing page.
    assert.equal(await page.locator('.project-gallery').count(), 0);
    assert.equal(await page.locator('img[src*="presentation"]').count(), 0);
    for (const slug of slugs) {
      const card = page.locator(`.project-card:has(a[href="${prefix}/work/${slug}"])`);
      assert.equal(await card.locator('a a').count(), 0);
      await card.locator('.project-card__media-link').click();
      await page.waitForURL(`**${prefix}/work/${slug}`);
      await page.waitForLoadState('networkidle');
      const main = page.locator('.project-gallery__main');
      await main.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => [...document.querySelectorAll('.project-gallery img')].every(img => img.complete && img.naturalWidth > 0));
      const thumbnails = page.locator('.project-gallery__thumbnails button');
      const count = await thumbnails.count();
      assert.ok(count === 0 || (count >= 3 && count <= 5), `Gallery size ${slug}: ${count}`);
      for (let i = 0; i < count; i++) {
        await thumbnails.nth(i).click();
        assert.equal(await thumbnails.nth(i).getAttribute('aria-pressed'), 'true');
        await page.waitForFunction(() => document.querySelector('.project-gallery__main img')?.naturalWidth > 0);
      }
      await main.focus();
      await page.keyboard.press('Enter');
      await page.locator('dialog[open]').waitFor();
      assert.ok(await page.locator('dialog').evaluate(el => el.contains(document.activeElement)), 'Focus enters dialog');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      assert.ok(await page.locator('dialog').evaluate(el => el.contains(document.activeElement)), 'Focus trapped');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog[open]').count(), 0);
      assert.ok(await main.evaluate(el => el === document.activeElement), 'Focus returns');
      await page.reload();
      await page.locator('.project-gallery__main').waitFor();
      for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => document.documentElement.classList.toggle('dark', theme === 'dark'), theme);
        for (const width of [320,360,390,430,639,640,759,760,768,959,960,1024,1280,1440,1920,2560,3840,5120,7680]) {
          await page.setViewportSize({ width, height: 900 });
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          // Chromium can retain the old scroll extent for a paint after a 7680→320
          // resize even when every element already fits. Wait for the resize paint,
          // then assert the document and element geometry (no overflow masking).
          await page.waitForTimeout(100);
          const overflow = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth, x: scrollX, nodes: [...document.querySelectorAll('body *')].filter(n => n.getBoundingClientRect().right + scrollX > innerWidth + 1).slice(0, 8).map(n => [n.tagName, n.className, n.getBoundingClientRect().width, n.textContent.slice(0, 70)]) }));
          assert.ok(overflow.scroll <= overflow.width + 1, `${slug} ${prefix} ${theme} ${width}: ${JSON.stringify(overflow)}`);
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await main.click();
      assert.ok(await page.locator('dialog').evaluate(el => el.getBoundingClientRect().width <= innerWidth && el.scrollWidth <= el.clientWidth + 1));
      await page.getByRole('button', { name: prefix ? 'Close ×' : 'Закрыть ×', exact: true }).click();
      assert.ok(await main.evaluate(el => el === document.activeElement));
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.locator('.case-study__actions a[href$="#selected-work"]').click();
      await page.waitForURL(url => url.pathname.replace(/\/$/, '') === prefix && url.hash === '#selected-work');
      await page.waitForLoadState('networkidle');
      await page.goBack();
      await page.locator('.project-gallery').waitFor();
      await page.waitForLoadState('networkidle');
      await page.goForward();
      await page.locator('.project-card').first().waitFor();
      await page.waitForLoadState('networkidle');
      console.log('PASS gallery journey', engine, prefix || 'ru', slug);
    }
  }
  assert.deepEqual(errors, []);
  await context.close();
  // Image failure is isolated to a new context, never to a user's stored data.
  const failure = await browser.newContext();
  await failure.route('**/_next/image?*', route => route.abort());
  const fallback = await failure.newPage();
  await fallback.goto(base + '/work/signal-studio');
  await fallback.locator('.project-gallery__main .project-gallery__missing').waitFor();
  assert.ok(await fallback.locator('.case-study__actions a').count() >= 2);
  await failure.close();
  console.log('PASS presentation galleries, keyboard, themes, resizing, direct reload/history and image failure', engine);
} finally { await browser.close(); }
