# Sarah Montreal VIP ($9.99 One-Time Hybrid A + C) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-ready Sarah T (`@sarahmontrealm`) exclusive portfolio and `$9.99 USD` one-time Whop package checkout & auto-delivery web application (`sarah-montreal-vip/`) implementing the audited "Hybrid A + C" v4 UX.

**Architecture:** Self-contained, zero-dependency vanilla HTML5/CSS3/ES2022 application in `sarah-montreal-vip/` (`index.html`, `styles.css`, `app.js`) with exported state/controller helpers so all logic is testable both in Node (`node --test`) and in a real headless Chromium browser via Playwright.

**Tech Stack:** HTML5, CSS3 (`100dvh` responsive layout, CSS custom properties), Vanilla ES Modules (`app.js`), Whop Embedded Checkout (`elements.js` + interactive checkout drawer), Node.js native test runner (`node:test`) + Playwright.

**Spec:** `docs/specs/2026-10-27-sarah-montreal-vip.md`

## Global Constraints

- Price MUST be a single one-time tier: **`$9.99`** (`$9.99 USD`, strikethrough anchor `$49`, `80% OFF`, zero recurring subscription).
- Statement descriptor copy MUST read **`"Sarah Montreal VIP"`**.
- Package folder counts MUST sum accurately to **85 Photos + 14 Videos (99 Total)**:
  - `01. Bedroom Morning Set`: `28 Pics + 4 Vids` (`32`)
  - `02. Dallas Cheer Edition`: `22 Pics + 4 Vids` (`26`)
  - `03. Studio & Mirror Archive`: `35 Pics + 6 Vids` (`41`)
- All 5 Subagent UX Review upgrades MUST be present and verified:
  1. Interactive 4-slide Story Preview Lightbox (`#story-lightbox`) with in-modal `$9.99` unlock CTA.
  2. Single-line green eyebrow (`✓ One-Time Pass · No Subscription`) and unclipped bottom footer with `#restore-access-btn`.
  3. Checkout drawer (`#checkout-sheet`) with explicit top-right `✕` close button (`#close-checkout-btn`), backdrop close, and `$9.99 USD` label.
  4. Post-purchase persistence (`localStorage` key `sarah_vip_access_v1` + `?vault=unlocked` query param) + `#copy-vault-link-btn` (`🔗 Copy Link`) + email restore flow.
  5. Unlocked Vault (`#vault-view`) with 1-line non-wrapping folder filter pills (`All (99)`, `01. Bedroom (32)`, `02. Cheer (26)`, `03. Studio (41)`) and distinct Video (`▶`) vs. Photo Gallery (`🖼️ Open XX Photos`) viewer modals.
- Existing repository test suite (`node --test tests/*.test.mjs`) MUST remain 100% green.

## Review Focus

1. **Empty or invalid email on checkout submission**: Submitting card checkout with an empty or malformed email (`""` or `"notanemail"`) must display a clear inline validation message (`#checkout-error`) and NOT unlock the vault until a valid email is entered (or Express ` Pay` / `$ Cash App Pay` is clicked, which auto-fills a verified wallet receipt).
2. **Closing checkout or story lightbox via Escape key or backdrop click**: Pressing `Escape` or clicking the backdrop overlay must cleanly close `#story-lightbox`, `#checkout-sheet`, `#restore-modal`, or `#media-viewer-modal` without leaving body scroll locked.
3. **Page reload after purchase (`?vault=unlocked` or `localStorage`)**: Reloading the page after unlocking must automatically boot directly into `#vault-view` so an Instagram in-app browser user never loses their paid access.
4. **Restore Access with valid email vs. empty input**: Clicking `Restore Access` and entering a valid email restores `#vault-view` and saves to `localStorage`; submitting an empty email shows a helpful error message.
5. **Filtering vault items by folder**: Clicking `01. Bedroom (32)`, `02. Cheer (26)`, `03. Studio (41)`, or `All (99)` must update the active pill state (`aria-selected="true"`) and filter the rendered `#vault-grid` cards to only matching folder items.

---

### Task 1: Core Hybrid A + C Landing Page, Responsive `100dvh` CSS & DOM Structure

**Files:**
- Create: `sarah-montreal-vip/index.html`
- Create: `sarah-montreal-vip/styles.css`
- Create: `tests/sarah-montreal-vip.test.mjs`

**Interfaces:**
- Produces DOM landmarks in `sarah-montreal-vip/index.html`:
  - `#landing-view` (Screen 1 container)
  - Teaser cards: `[data-teaser="free-photo"]` (`👁 Free View`), `[data-teaser="free-clip"]` (`▶ 0:15 Clip`), `[data-teaser="locked-vault"]` (`🔒 +85 Photos & 14 Videos`)
  - Folder checklist `#folder-checklist` with the 3 folders (`01. Bedroom Morning Set`, `02. Dallas Cheer Edition`, `03. Studio & Mirror Archive`)
  - Primary CTA button `#open-checkout-btn` (`✨ Unlock All 3 Folders` · ` Pay · $9.99 →`)
  - Footer with `"Sarah Montreal VIP"` and `#restore-access-btn` (`Restore Access`)
  - `#story-lightbox` (Story preview modal container)
  - `#checkout-sheet` (Screen 2 Whop `$9.99 USD` checkout drawer with `#close-checkout-btn`, `#apple-pay-btn`, `#cashapp-pay-btn`, `#checkout-email`, `#checkout-form`, `#checkout-error`, `#whop-embed-container`)
  - `#restore-modal` (Restore access modal with `#restore-email-input`, `#restore-submit-btn`, `#restore-error`, `#close-restore-btn`)
  - `#vault-view` (Screen 3 unlocked vault container with `#copy-vault-link-btn`, `#telegram-join-btn`, `#download-zip-btn`, `#vault-filter-bar`, `#vault-grid`, `#media-viewer-modal`)

- [ ] **Step 1: Write the failing structural & CSS layout tests in `tests/sarah-montreal-vip.test.mjs`**
  - Verify `sarah-montreal-vip/index.html` and `sarah-montreal-vip/styles.css` exist and contain all required Hybrid A + C v4 landmarks, `$9.99` single-tier pricing, 3-folder checklist counts (`28 Pics + 4 Vids`, `22 Pics + 4 Vids`, `35 Pics + 6 Vids`), `"Sarah Montreal VIP"` discreet receipt copy, single-line `white-space: nowrap` rules on `.eyebrow-pass` and `.vault-filter-bar`, and all modal/drawer containers.

- [ ] **Step 2: Run test to verify it fails**
  - Run: `node --test tests/sarah-montreal-vip.test.mjs`
  - Expected: FAIL (`ENOENT` or missing file/landmarks).

- [ ] **Step 3: Implement `sarah-montreal-vip/index.html` and `sarah-montreal-vip/styles.css`**
  - Build the complete semantic HTML and responsive `100dvh` Hybrid A + C stylesheet matching `DESIGN.md` and `ux-hybrid-ac-v4-board.jpg`.

- [ ] **Step 4: Run test to verify it passes**
  - Run: `node --test tests/sarah-montreal-vip.test.mjs`
  - Expected: PASS.

- [ ] **Step 5: Commit**
  - `git add sarah-montreal-vip/index.html sarah-montreal-vip/styles.css tests/sarah-montreal-vip.test.mjs && git commit -m "feat(sarah-vip): add Hybrid A+C v4 HTML structure and responsive 100dvh styles"`

---

### Task 2: Interactive Story Lightbox, Whop `$9.99 USD` Checkout Drawer, Vault Filtering & Persistence (`app.js`)

**Files:**
- Create: `sarah-montreal-vip/app.js`
- Modify: `tests/sarah-montreal-vip.test.mjs`

**Interfaces:**
- Consumes: DOM landmarks from `sarah-montreal-vip/index.html`
- Produces in `sarah-montreal-vip/app.js`:
  - `WHOP_CONFIG` (`{ planId: 'plan_sarah_vip_999', priceUsd: 9.99, merchantName: 'Sarah Montreal VIP', telegramInviteUrl: 'https://t.me/+SarahMontrealVIPVault', masterZipUrl: '#download-master-zip' }`)
  - `VAULT_FOLDERS` (3 folder metadata objects totaling 85 photos & 14 videos)
  - `VAULT_ITEMS` (unlocked media items across `bedroom`, `cheer`, and `studio` with both `type: 'video'` and `type: 'gallery'` items)
  - `STORY_SLIDES` (4 preview slides for the Story Lightbox)
  - `validateEmail(email)` -> `boolean`
  - `filterVaultItems(folderId)` -> array of matching `VAULT_ITEMS`
  - `createVaultReceipt(email, method)` -> `{ unlocked: true, email, method, receiptId, unlockedAt, magicUrl }`
  - `initSarahVipApp(doc, win)` -> controller API for DOM events (opening/closing Story Lightbox, advancing slides, opening/closing Whop Checkout Drawer, validating email & completing `$9.99` order via Apple Pay / CashApp / Card, booting/persisting `#vault-view` via `localStorage` & URL `?vault=unlocked`, copying magic link, restoring access, filtering folders, and opening video/photo gallery viewer modal).

- [ ] **Step 1: Write failing unit & behavioral tests in `tests/sarah-montreal-vip.test.mjs`**
  - Test `validateEmail`, `filterVaultItems('all' | 'bedroom' | 'cheer' | 'studio')`, `VAULT_FOLDERS` sum (`85` pics, `14` vids, `99` total), `createVaultReceipt`, and full DOM controller interactions.

- [ ] **Step 2: Run test to verify it fails**
  - Run: `node --test tests/sarah-montreal-vip.test.mjs`
  - Expected: FAIL (`ERR_MODULE_NOT_FOUND` for `app.js`).

- [ ] **Step 3: Implement `sarah-montreal-vip/app.js`**
  - Implement all exported data structures, pure functions, and the `initSarahVipApp` interactive DOM controller.

- [ ] **Step 4: Run test to verify it passes**
  - Run: `node --test tests/*.test.mjs`
  - Expected: PASS (all unit tests in repo pass).

- [ ] **Step 5: Commit**
  - `git add sarah-montreal-vip/app.js tests/sarah-montreal-vip.test.mjs && git commit -m "feat(sarah-vip): implement story lightbox, Whop $9.99 checkout drawer, and vault controller"`

---

### Task 3: End-to-End Playwright Browser Verification & Visual QA Across All 3 Screens

**Files:**
- Create: `tests/verify-sarah-vip-e2e.mjs`
- Modify: `tests/sarah-montreal-vip.test.mjs`

**Interfaces:**
- Consumes: `sarah-montreal-vip/index.html`, `sarah-montreal-vip/styles.css`, `sarah-montreal-vip/app.js`
- Produces: Automated Playwright e2e verification script (`tests/verify-sarah-vip-e2e.mjs`) + rendered live QA evidence screenshots verifying:
  1. Screen 1 (`390×844` iPhone & `400×780` Instagram IAB viewports): 0 clipped text, single-line green eyebrow, 3 teaser cards, unified 3-folder checklist, `$9.99` CTA, and unclipped footer.
  2. Tapping `👁 Free View` opens `#story-lightbox`, navigates slides, and clicking the in-modal `$9.99` unlock bar transitions directly into `#checkout-sheet`.
  3. Screen 2 (`#checkout-sheet`): Explicit `✕` close button works; invalid email shows `#checkout-error`; completing `$9.99` checkout unlocks `#vault-view` and persists to `localStorage` + `?vault=unlocked`.
  4. Screen 3 (`#vault-view`): Single-line filter pills (`All (99)`, `01. Bedroom (32)`, `02. Cheer (26)`, `03. Studio (41)`), `🔗 Copy Link` updates button text to `✓ Link Copied!`, folder filtering updates the grid, clicking a video or photo gallery card opens `#media-viewer-modal`, and reloading the page keeps the vault unlocked.

- [ ] **Step 1: Write `tests/verify-sarah-vip-e2e.mjs` and run against the live app**
- [ ] **Step 2: Fix any visual or behavioral regressions uncovered by Playwright**
- [ ] **Step 3: Run full test suite (`node --test tests/*.test.mjs` and `bun tests/verify-sarah-vip-e2e.mjs`) and commit**
