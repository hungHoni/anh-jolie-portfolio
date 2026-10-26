import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const appDir = path.join(repoRoot, 'sarah-montreal-vip');
const htmlPath = path.join(appDir, 'index.html');
const cssPath = path.join(appDir, 'styles.css');

test('Task 1.1: Hybrid A + C HTML structure contains all required Screen 1, Screen 2, and Screen 3 landmarks', () => {
  assert.ok(fs.existsSync(htmlPath), 'sarah-montreal-vip/index.html must exist');
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Screen 1: Hybrid A + C Landing View
  assert.match(html, /id="landing-view"/, 'Must have #landing-view container');
  assert.match(html, /Online Now · Montreal/, 'Must show live Montreal status pill');
  assert.match(html, /Sarah T/, 'Must show creator name Sarah T');

  // 3 Bento Teaser Cards (Upgrade #2: Distinct Eye / Play / Lock badges)
  assert.match(html, /data-teaser="free-photo"/, 'Must have free photo teaser card');
  assert.match(html, /Free View/, 'Must label free photo card with Free View');
  assert.match(html, /data-teaser="free-clip"/, 'Must have 0:15 clip teaser card');
  assert.match(html, /0:15 Clip/, 'Must label clip card with 0:15 Clip');
  assert.match(html, /data-teaser="locked-vault"/, 'Must have locked vault teaser card');
  assert.match(html, /\+85 Photos/, 'Must show +85 Photos on locked card');
  assert.match(html, /14 Videos/, 'Must show 14 Videos on locked card');

  // Bottom Cream Editorial Card: Single $9.99 USD Tier + Unified 3-Folder Checklist
  assert.match(html, /One-Time Pass · No Subscription/, 'Must include 1-line green eyebrow');
  assert.match(html, /\$49/, 'Must include $49 anchor price');
  assert.match(html, /\$9\.99/, 'Must include single $9.99 price');
  assert.match(html, /01\. Bedroom Morning Set/, 'Must list Folder 01');
  assert.match(html, /28 Pics \+ 4 Vids/, 'Must list Folder 01 count (28 Pics + 4 Vids)');
  assert.match(html, /02\. Dallas Cheer Edition/, 'Must list Folder 02');
  assert.match(html, /22 Pics \+ 4 Vids/, 'Must list Folder 02 count (22 Pics + 4 Vids)');
  assert.match(html, /03\. Studio &amp; Mirror Archive|03\. Studio & Mirror Archive/, 'Must list Folder 03');
  assert.match(html, /35 Pics \+ 6 Vids/, 'Must list Folder 03 count (35 Pics + 6 Vids)');

  // Primary CTA + Discreet Billing + Restore Access (Upgrade #4)
  assert.match(html, /id="open-checkout-btn"/, 'Must have primary #open-checkout-btn');
  assert.match(html, /Unlock All 3 Folders/, 'Must show Unlock All 3 Folders CTA copy');
  assert.match(html, /Sarah Montreal VIP/, 'Must display discreet receipt name "Sarah Montreal VIP"');
  assert.match(html, /id="restore-access-btn"/, 'Must have #restore-access-btn on Screen 1 footer');

  // Upgrade #1: Interactive Story Lightbox
  assert.match(html, /id="story-lightbox"/, 'Must have #story-lightbox modal');
  assert.match(html, /id="story-unlock-btn"/, 'Must have sticky in-modal $9.99 unlock button inside story lightbox');

  // Screen 2: Whop $9.99 USD Checkout Drawer (Upgrade #3: Explicit × close button)
  assert.match(html, /id="checkout-sheet"/, 'Must have #checkout-sheet drawer');
  assert.match(html, /id="close-checkout-btn"/, 'Must have explicit #close-checkout-btn');
  assert.match(html, /USD Total/, 'Must explicitly display USD Total in checkout summary');
  assert.match(html, /id="apple-pay-btn"/, 'Must have #apple-pay-btn');
  assert.match(html, /id="cashapp-pay-btn"/, 'Must have #cashapp-pay-btn');
  assert.match(html, /id="checkout-email"/, 'Must have #checkout-email input');
  assert.match(html, /id="checkout-form"/, 'Must have #checkout-form');
  assert.match(html, /id="checkout-error"/, 'Must have #checkout-error validation message element');

  // Screen 3: Unlocked Vault View (Upgrade #4 & #5)
  assert.match(html, /id="vault-view"/, 'Must have #vault-view container');
  assert.match(html, /id="copy-vault-link-btn"/, 'Must have #copy-vault-link-btn in green banner');
  assert.match(html, /id="telegram-join-btn"/, 'Must have #telegram-join-btn');
  assert.match(html, /id="download-zip-btn"/, 'Must have #download-zip-btn');
  assert.match(html, /id="vault-filter-bar"/, 'Must have #vault-filter-bar');
  assert.match(html, /id="vault-grid"/, 'Must have #vault-grid');
  assert.match(html, /id="media-viewer-modal"/, 'Must have #media-viewer-modal');
  assert.match(html, /id="restore-modal"/, 'Must have #restore-modal');
});

test('Task 1.2: Hybrid A + C CSS enforces 100dvh mobile fit, single-line eyebrow, and non-wrapping filter pills', () => {
  assert.ok(fs.existsSync(cssPath), 'sarah-montreal-vip/styles.css must exist');
  const css = fs.readFileSync(cssPath, 'utf8');

  assert.match(css, /100dvh/, 'Must use 100dvh for Instagram in-app browser viewport fit');
  assert.match(css, /safe-area-inset-bottom/, 'Must account for iOS safe-area-inset-bottom');
  assert.match(css, /\.eyebrow-pass[\s\S]*?white-space:\s*nowrap/, 'Must enforce single-line nowrap on .eyebrow-pass');
  assert.match(css, /\.vault-filter-bar[\s\S]*?white-space:\s*nowrap/, 'Must enforce single-line nowrap on .vault-filter-bar');
});
