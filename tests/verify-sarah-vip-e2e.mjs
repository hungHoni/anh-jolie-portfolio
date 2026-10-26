import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/Users/q/.claude/skills/gstack/node_modules/playwright/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..', 'sarah-montreal-vip');
const artifactDir = '/Users/q/.gemini/antigravity/brain/d04d3c2f-6650-423b-af23-813a36070cc5';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
};

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const reqUrl = new URL(req.url, 'http://127.0.0.1');
      const cleanPath = reqUrl.pathname === '/' ? '/index.html' : reqUrl.pathname;
      const filePath = path.join(appDir, cleanPath);
      if (!filePath.startsWith(appDir) || !fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

const { server, baseUrl } = await startStaticServer();
const browser = await chromium.launch();

try {
  const page = await browser.newPage({
    viewport: { width: 400, height: 780 },
    deviceScaleFactor: 2,
  });

  // Intercept external Whop CDN script in offline test environment so networkidle is instant
  await page.route('https://cdn.whop.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '/* mocked whop sdk */' })
  );

  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  // 1. Verify Screen 1 Above-the-Fold & Unclipped Footer (Upgrade #2)
  const screen1Metrics = await page.evaluate(() => {
    const eyebrow = document.querySelector('.eyebrow-pass').getBoundingClientRect();
    const footer = document.querySelector('.trust-restore-footer').getBoundingClientRect();
    return {
      eyebrowHeight: Math.round(eyebrow.height),
      footerBottom: Math.round(footer.bottom),
      viewportHeight: window.innerHeight,
    };
  });

  console.log('Screen 1 metrics:', screen1Metrics);
  assert.ok(screen1Metrics.eyebrowHeight <= 22, `Eyebrow should be 1 line (got ${screen1Metrics.eyebrowHeight}px)`);
  assert.ok(
    screen1Metrics.footerBottom <= screen1Metrics.viewportHeight,
    `Footer must not be clipped below viewport (${screen1Metrics.footerBottom} <= ${screen1Metrics.viewportHeight})`
  );

  await page.screenshot({
    path: path.join(artifactDir, 'qa-live-screen1-landing.jpg'),
    type: 'jpeg',
    quality: 92,
  });

  // 2. Verify Interactive Story Lightbox on Teaser Tap + Sticky $9.99 CTA (Upgrade #1)
  await page.click('[data-teaser="free-photo"]');
  const storyOpen = await page.evaluate(() => !document.getElementById('story-lightbox').hidden);
  assert.equal(storyOpen, true, 'Story lightbox must open on Free View tap');

  await page.click('#story-next-btn');
  const slide2Caption = await page.textContent('#story-slide-caption');
  assert.match(slide2Caption, /0:15 Dallas Cheer Clip/, 'Next slide button must advance to slide 2');

  await page.screenshot({
    path: path.join(artifactDir, 'qa-live-story-lightbox.jpg'),
    type: 'jpeg',
    quality: 92,
  });

  // Click sticky in-modal $9.99 unlock button -> should transition to Screen 2 Checkout Drawer
  await page.click('#story-unlock-btn');
  const checkoutVisibleFromStory = await page.evaluate(
    () => document.getElementById('story-lightbox').hidden && !document.getElementById('checkout-sheet').hidden
  );
  assert.equal(checkoutVisibleFromStory, true, 'Clicking story unlock CTA must open checkout sheet');

  await page.screenshot({
    path: path.join(artifactDir, 'qa-live-screen2-checkout.jpg'),
    type: 'jpeg',
    quality: 92,
  });

  // 3. Verify Explicit Close (✕) Button on Screen 2 (Upgrade #3)
  await page.click('#close-checkout-btn');
  const checkoutClosed = await page.evaluate(() => document.getElementById('checkout-sheet').hidden);
  assert.equal(checkoutClosed, true, 'Explicit close button must close checkout sheet');

  // Re-open checkout via primary CTA
  await page.click('#open-checkout-btn');

  // 4. Verify Invalid Email Validation before Unlock
  await page.fill('#checkout-email', 'invalid-email');
  await page.click('#submit-checkout-btn');
  const errorShown = await page.evaluate(() => !document.getElementById('checkout-error').hidden);
  assert.equal(errorShown, true, 'Submitting invalid email must show inline error');

  // 5. Complete $9.99 Purchase with Valid Email -> Unlock Screen 3
  await page.fill('#checkout-email', 'vipfan@gmail.com');
  await page.click('#submit-checkout-btn');

  const vaultUnlocked = await page.evaluate(
    () => document.getElementById('landing-view').hidden && !document.getElementById('vault-view').hidden
  );
  assert.equal(vaultUnlocked, true, 'Valid checkout must transition to unlocked #vault-view');

  // 6. Verify Single-Line Non-Wrapping Filter Pills & Copy Link on Screen 3 (Upgrade #4 & #5)
  const pillMetrics = await page.evaluate(() => {
    const pills = Array.from(document.querySelectorAll('#vault-filter-bar .filter-pill'));
    return pills.map((p) => {
      const r = p.getBoundingClientRect();
      return { text: p.textContent.trim(), top: Math.round(r.top), height: Math.round(r.height) };
    });
  });
  console.log('Screen 3 filter pill metrics:', pillMetrics);
  const firstTop = pillMetrics[0].top;
  assert.ok(
    pillMetrics.every((p) => Math.abs(p.top - firstTop) <= 2 && p.height <= 32),
    'All 4 folder filter pills must sit on a single non-wrapping line'
  );

  await page.click('#copy-vault-link-btn');
  const copiedText = await page.textContent('#copy-vault-link-btn');
  assert.equal(copiedText.trim(), '✓ Link Copied!', 'Copy link button must confirm copy');

  await page.screenshot({
    path: path.join(artifactDir, 'qa-live-screen3-vault.jpg'),
    type: 'jpeg',
    quality: 92,
  });

  // 7. Verify Folder Filtering & Media Viewer Modal
  await page.click('#vault-filter-bar [data-folder="bedroom"]');
  const bedroomCount = await page.locator('#vault-grid .vault-media-card').count();
  assert.equal(bedroomCount, 1, 'Filtering by bedroom must show only bedroom items');

  await page.click('#vault-filter-bar [data-folder="all"]');
  const allCount = await page.locator('#vault-grid .vault-media-card').count();
  assert.equal(allCount, 4, 'Filtering by all must show all 4 vault cards');

  await page.click('#vault-grid .vault-media-card:first-child');
  const mediaModalOpen = await page.evaluate(() => !document.getElementById('media-viewer-modal').hidden);
  assert.equal(mediaModalOpen, true, 'Clicking a vault card must open #media-viewer-modal');

  await page.keyboard.press('Escape');
  const mediaModalClosed = await page.evaluate(() => document.getElementById('media-viewer-modal').hidden);
  assert.equal(mediaModalClosed, true, 'Pressing Escape must close #media-viewer-modal');

  // 8. Verify Page Reload Persistence (Instagram Webview Survival)
  await page.reload({ waitUntil: 'networkidle' });
  const stillUnlockedAfterReload = await page.evaluate(() => !document.getElementById('vault-view').hidden);
  assert.equal(stillUnlockedAfterReload, true, 'Reloading after purchase must keep #vault-view unlocked');

  console.log('ALL PLAYWRIGHT E2E VERIFICATION CHECKS PASSED!');
} finally {
  await browser.close();
  server.close();
}
