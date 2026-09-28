import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:32800';
for (let attempt = 0; attempt < 30; attempt += 1) {
  try { if ((await fetch(base)).ok) break; } catch { /* Server may still be starting. */ }
  if (attempt === 29) throw new Error(`Portfolio server did not become ready: ${base}`);
  await new Promise(resolve => setTimeout(resolve, 500));
}
const engine = process.env.PORTFOLIO_BROWSER || 'chromium';
const browsers = { chromium, firefox, webkit };
const browser = await browsers[engine].launch({ headless: true, ...(engine === 'chromium' ? { channel: process.env.PORTFOLIO_PLAYWRIGHT_CHANNEL || 'chrome' } : {}) });
const slugs = ['relayops', 'signal-studio', 'opsweave', 'napoli', 'solecraft', 'folio', 'replaylab', 'variantlab'];
const links = {
  relayops: ['https://relayops-godaylor.onrender.com', 'https://github.com/godaylor/relayops'],
  'signal-studio': ['https://signal-studio-smoky.vercel.app/demo', 'https://github.com/godaylor/signal-studio'],
  opsweave: ['https://opsweave.onrender.com', 'https://github.com/godaylor/opsweave'],
  napoli: ['https://napoli-pizza-tau.vercel.app', 'https://github.com/godaylor/napoli-pizza'],
  solecraft: ['https://solecraft-two.vercel.app', 'https://github.com/godaylor/solecraft'],
  folio: ['https://folio-crypto-godaylor.maxeemzhuparov.chatgpt.site', 'https://github.com/godaylor/crypto-portfolio'],
  replaylab: ['https://github.com/godaylor/replaylab'],
  variantlab: ['https://variantlab-creative-ops-demo.maxeemzhuparov.chatgpt.site/variantlab/', 'https://github.com/godaylor/variantlab'],
};
const errors = [];
const forbidden = /Жупаров|Жупарова|Максим|Maksim|Zhuparov|maxeemzhuparov@mail\.ru|Честное происхождение|Production-подход/;
await mkdir('docs/screenshots', { recursive: true });

async function assertLayout(page, label) {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  // Let Chromium paint the new scroll extent after an extreme viewport change.
  // See the matching 7680→320 guard in verify-presentations.mjs.
  await page.waitForTimeout(100);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Horizontal overflow: ${label}`);
  const clipped = await page.locator('h1, h2, .site-header__inner, .contact-action, .project-card, .case-study__actions').evaluateAll(nodes => nodes.filter(node => {
    const r = node.getBoundingClientRect();
    return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
  }).map(node => node.textContent.slice(0, 100)));
  assert.deepEqual(clipped, [], `Clipped controls: ${label}`);
  // A regression guard against splitting an ordinary word across lines.
  const brokenWords = await page.locator('h1').evaluate(el => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const broken = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      for (const match of node.textContent.matchAll(/[\p{L}]+/gu)) {
        const range = document.createRange();
        range.setStart(node, match.index); range.setEnd(node, match.index + match[0].length);
        if (new Set([...range.getClientRects()].map(r => Math.round(r.top))).size > 1) broken.push(match[0]);
      }
    }
    return broken;
  });
  assert.deepEqual(brokenWords, [], `Words broken across lines: ${label}`);
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  if (engine === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  if (process.env.PORTFOLIO_NETWORK_DEBUG) page.on('requestfailed', request => console.log('NETWORK', request.url(), request.failure()));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const prefix of ['', '/en']) {
    for (const path of ['', ...slugs.map(slug => '/work/' + slug), '/blog']) {
      const response = await page.goto(base + prefix + (path || '/'));
      assert.equal(response.status(), 200, prefix + path);
      await page.locator('h1').waitFor();
      await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('html').getAttribute('lang'), prefix ? 'en' : 'ru');
      assert.equal(await page.locator('main#main-content').count(), 1);
      assert.equal(await page.locator('h1').count(), 1);
      assert.doesNotMatch(await page.locator('body').innerText(), forbidden);
      assert.doesNotMatch(await page.title(), forbidden);
      const metadata = await page.locator('meta[content]').evaluateAll(nodes => nodes.map(n => n.content).join('\n'));
      assert.doesNotMatch(metadata, forbidden);
      const ids = await page.locator('[id]').evaluateAll(nodes => nodes.map(n => n.id));
      assert.equal(ids.length, new Set(ids).size, 'duplicate ids');
      for (const href of await page.locator('a[href]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')))) {
        assert.ok(!/localhost|127\.0\.0\.1|^#$/.test(href), href);
      }
      if (!path) {
        assert.equal(await page.locator('.project-card').count(), 8);
        assert.equal(await page.locator('.project-card img').count(), 8);
        assert.equal(await page.locator('.about-card, .hero__system').count(), 0);
        assert.equal(await page.locator('.featured-projects .project-card').count(), 7);
        assert.equal(await page.locator('.project-notes .project-card').count(), 1);
        assert.ok((await page.locator('.project-notes').innerText()).includes('LifeOS Social'));
        for (const [slug, hrefs] of Object.entries(links)) {
          const card = page.locator(`.project-card:has(a[href="${prefix}/work/${slug}"])`);
          for (const href of hrefs) assert.equal(await card.locator(`a[href="${href}"]`).count(), 1, href);
        }
        const person = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
        assert.equal(person.name, 'Maxeem');
        assert.equal(person.telephone, undefined);
        assert.equal(await page.locator('a[href="mailto:maxeemit@mail.ru"]').count(), 1);
      } else if (path.startsWith('/work/')) {
        assert.equal(await page.locator('.project-gallery').count(), 1);
        assert.ok(await page.locator('.project-gallery__main img').count());
        const count = await page.locator('.case-study__section ol li').count();
        assert.ok(count >= 2 && count <= 4);
        assert.equal(await page.locator('.case-study__technical .case-study__section').first().locator('li').count(), path === '/work/variantlab' ? 4 : 2);
        assert.equal(await page.locator('.case-study__next').count(), 0);
      }
      for (const width of [320, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await assertLayout(page, `${engine} ${width} ${prefix}${path}`);
      }
    }
  }
  console.log('PASS routes, identity/metadata, project actions, links, 320/1440 layouts');
  const widths = [320, 360, 390, 430, 639, 640, 759, 760, 761, 768, 820, 959, 960, 961, 1024, 1280, 1440, 1920, 2560, 3840, 5120, 7680];
  for (const prefix of ['', '/en']) {
    await page.goto(base + prefix + '/');
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => { localStorage.setItem('theme', theme); document.documentElement.classList.toggle('dark', theme === 'dark'); }, theme);
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await assertLayout(page, `${width} ${prefix} ${theme}`);
        if (width >= 1024) assert.ok(await page.locator('.hero__actions').evaluate(el => el.getBoundingClientRect().bottom < 768), 'Laptop hero actions below fold');
      }
    }
  }
  console.log('PASS both locales/themes at 22 widths, 320–7680 CSS px (emulation)');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base);
  await page.evaluate(() => document.documentElement.style.fontSize = '200%');
  await assertLayout(page, '200% text size');
  await page.evaluate(() => document.documentElement.style.fontSize = '');
  // Effective CSS viewports for 1280px browser at 200% and 400% zoom.
  for (const width of [640, 320]) { await page.setViewportSize({ width, height: 900 }); await assertLayout(page, `zoom-equivalent ${width}`); }
  await page.setViewportSize({ width: 1280, height: 768 });
  await page.goto(base);
  await page.keyboard.press('Tab');
  if (engine === 'webkit') {
    // This WebKit build tabs through form controls by default. Verify its actual
    // keyboard path, then check skip-link focus/activation independently.
    assert.equal(await page.locator(':focus').getAttribute('aria-label'), 'Сменить тему');
    const prior = await page.locator('html').getAttribute('class');
    await page.keyboard.press('Enter');
    await page.waitForFunction(prior => document.documentElement.className !== prior, prior);
    await page.locator('.skip-link').focus();
  }
  assert.equal(await page.locator(':focus').innerText(), 'Перейти к содержимому');
  assert.notEqual(await page.locator(':focus').evaluate(el => getComputedStyle(el).outlineStyle), 'none');
  await page.keyboard.press('Enter');
  for (const anchor of ['about', 'selected-work', 'stack', 'contact']) {
    await page.locator(`.site-nav:visible a[href="/#${anchor}"]`).click();
    await page.waitForTimeout(100);
    const targetTop = await page.locator(`#${anchor}`).evaluate(el => el.getBoundingClientRect().top);
    const headerBottom = await page.locator('.site-header').evaluate(el => el.getBoundingClientRect().bottom);
    assert.ok(targetTop >= headerBottom - 1, `Header overlaps ${anchor}`);
  }
  await page.goto(base + '/work/solecraft');
  await page.getByRole('link', { name: 'Switch to English' }).click();
  await page.waitForURL('**/en/work/solecraft');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.goBack();
  await page.waitForURL(base + '/work/solecraft');
  await page.goForward();
  await page.waitForURL(base + '/en/work/solecraft');
  await page.getByRole('link', { name: 'Back to selected work' }).click();
  await page.waitForURL(/\/en\/?#selected-work$/);
  await page.waitForLoadState('networkidle');
  await page.goto(base + '/#contact');
  await page.getByRole('button', { name: 'Скопировать почту' }).click();
  if (engine === 'chromium') {
    await page.getByText('Адрес сохранён в буфере обмена.').waitFor();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'maxeemit@mail.ru');
  }
  const before = await page.locator('html').getAttribute('class');
  await page.getByRole('button', { name: 'Сменить тему' }).click();
  assert.notEqual(await page.locator('html').getAttribute('class'), before);
  await page.reload();
  assert.notEqual(await page.locator('html').getAttribute('class'), before);
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(), 0, 'no mandatory tour/dialog');
  console.log('PASS anchors, keyboard, language, history, reload, theme, contacts');
  const denied = await browser.newContext();
  await denied.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) } }));
  const fallback = await denied.newPage();
  await fallback.goto(base + '/#contact');
  await fallback.getByRole('button', { name: 'Скопировать почту' }).click();
  const input = fallback.getByRole('textbox', { name: 'Адрес почты для копирования' });
  await input.waitFor(); await input.focus();
  assert.equal(await input.inputValue(), 'maxeemit@mail.ru');
  assert.equal(await input.evaluate(el => el.selectionEnd - el.selectionStart), 'maxeemit@mail.ru'.length);
  await denied.close();
  console.log('PASS denied clipboard fallback: selectable email');
  const brokenImageContext = await browser.newContext({ reducedMotion: 'reduce' });
  await brokenImageContext.route('**/_next/image?**', route => route.abort());
  const brokenImagePage = await brokenImageContext.newPage();
  await brokenImagePage.goto(base);
  await brokenImagePage.locator('.project-card').first().scrollIntoViewIfNeeded();
  await brokenImagePage.getByRole('img', { name: 'RelayOps: скриншот не загрузился' }).waitFor();
  assert.equal(await brokenImagePage.getByRole('link', { name: 'RelayOps: Код', exact: true }).count(), 1);
  await brokenImageContext.close();
  console.log('PASS unavailable screenshot keeps description and actions accessible');
  for (const prefix of ['', '/en']) {
    const response = await page.goto(base + prefix + '/work/does-not-exist');
    assert.equal(response.status(), 404);
    assert.match(await page.locator('h1').innerText(), prefix ? /Page not found/ : /Страница не найдена/);
    await page.waitForLoadState('networkidle');
  }
  for (const path of ['/robots.txt', '/sitemap.xml', '/opengraph-image', '/icon.svg']) {
    const response = await page.request.get(base + path);
    assert.equal(response.status(), 200, path);
  }
  if (engine === 'chromium') {
    for (const [width, prefix, theme, name] of [[1280, '', 'light', 'desktop'], [390, '', 'light', 'mobile'], [1280, '/en', 'dark', 'english-dark']]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + prefix + '/');
      await page.evaluate(theme => { localStorage.setItem('theme', theme); document.documentElement.classList.toggle('dark', theme === 'dark'); }, theme);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `docs/screenshots/portfolio-presentation-${name}.png` });
    }
    await page.goto(base + '/work/signal-studio');
    await page.screenshot({ path: 'docs/screenshots/portfolio-presentation-project.png', fullPage: true });
  }
  assert.deepEqual(errors.filter(error => !error.includes('404')), []);
  console.log(`PASS ${engine}: V3 browser verification; no unexpected runtime errors`);
} finally { await browser.close(); }
