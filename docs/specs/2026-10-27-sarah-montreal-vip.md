# Product & Architecture Specification: Sarah Montreal VIP (`@sarahmontrealm`)

**Date:** 2026-10-27  
**Target Directory:** `sarah-montreal-vip/`  
**Approved UX Baseline:** Refined "Hybrid A + C" v4 (Score: 9.6 / 10 after Subagent Pre-Development UX Review)

---

## 1. Product Wedge & Core Offer

- **Creator Persona:** Sarah T (`@sarahmontrealm` — `21 ✨ · Swedish-American 🇸🇪🇺🇸 · Official Archive`).
- **Single Impulse Offer:** **$9.99 USD One-Time Payment** (`$49` strikethrough anchor · `80% OFF` · `✓ One-Time Pass · No Subscription`).
- **Package Contents (99 Media Items across 3 Organized Folders):**
  - `01. Bedroom Morning Set` — `28 Pics + 4 Vids` (`32` items)
  - `02. Dallas Cheer Edition` — `22 Pics + 4 Vids` (`26` items)
  - `03. Studio & Mirror Archive` — `35 Pics + 6 Vids` (`41` items)
- **Payment & Discreet Billing:**
  - Powered by **Whop Embedded Checkout** (`https://cdn.whop.com/elements/amber/elements.js`) with configurable `WHOP_CONFIG.planId` (`plan_sarah_vip_999`) + interactive native-grade Apple Pay / Cash App Pay / Card / Crypto checkout sheet that works both with a live Whop `planId` and in instant interactive checkout mode.
  - Statement descriptor: **`"Sarah Montreal VIP"`** (100% creator privacy for Vietnam operator).
- **Auto-Delivery Channels:**
  1. **Private Telegram Archive Auto-Invite** (`✈️ Join Telegram Vault`)
  2. **Master Archive & Per-Folder ZIP Downloads** (`📥 Download ZIP (4.2G)`)
  3. **In-Browser Unlocked Vault Gallery** with single-line folder filter pills (`All (99)`, `01. Bedroom (32)`, `02. Cheer (26)`, `03. Studio (41)`).

---

## 2. ASCII Architecture & User State Machine

```
[Instagram Bio Link]
        │
        ▼
┌──────────────────────────────────────────────────────────┐
│ SCREEN 1: Hybrid A + C Landing View (#landing-view)      │
│  ├─ Top Dark Hero + "Online Now · Montreal"              │
│  ├─ 3-Card Bento Teasers:                                │
│  │    ├─ [Card 1: 👁 Free View] ──┐                      │
│  │    ├─ [Card 2: ▶ 0:15 Clip] ──┼─► [Story Lightbox]    │
│  │    └─ [Card 3: 🔒 +85 Pics] ──┼─► (4 slides + sticky  │
│  │                               │    $9.99 Unlock CTA)  │
│  └─ Bottom Cream Editorial Sheet:                        │
│       ├─ Unified 3-Folder Checklist + 4.9/5 Proof        │
│       ├─ CTA: "✨ Unlock All 3 Folders ·  Pay $9.99 →"  │
│       └─ Footer: Discreet Receipt + "Restore Access"     │
└───────────────────────┬──────────────────────────────────┘
                        │ Tap Any $9.99 Unlock Button
                        ▼
┌──────────────────────────────────────────────────────────┐
│ SCREEN 2: Whop $9.99 USD Checkout Drawer (#checkout-sheet│
│  ├─ Top Bar: "⚡ Instant Whop Checkout" + Explicit [✕]    │
│  ├─ Summary: "Sarah Montreal VIP Pass" · "$9.99 USD"     │
│  ├─ Express Wallets: [ Pay] [$ Cash App Pay]            │
│  ├─ Grouped Input Box: Email + Card / Optional Whop Embed│
│  └─ Submit: "🔒 Complete 1-Time Order · $9.99 USD →"     │
└───────────────────────┬──────────────────────────────────┘
                        │ Payment Succeeds / Receipt Issued
                        ▼
┌──────────────────────────────────────────────────────────┐
│ SCREEN 3: Unlocked Vault View (#vault-view)              │
│  ├─ Persist receipt + email in localStorage & URL ?vault │
│  ├─ Green Banner: "Unlocked! All 3 Folders Ready"        │
│  │    └─ [🔗 Copy Link] (Instagram Webview Survival)     │
│  ├─ Delivery Row: [✈️ Join Telegram Vault] [📥 ZIP 4.2G] │
│  ├─ 1-Line Filter Pills: All(99)|Bedroom(32)|Cheer(26)...│
│  └─ Unlocked Media Grid (Video Player & Photo Viewer)    │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Mandatory UX Audit Requirements (All 5 Subagent Upgrades)

1. **Upgrade #1 — Interactive Story Lightbox on Teaser Tap (`#story-lightbox`)**:
   - Tapping Card 1 (`👁 Free View`) or Card 2 (`▶ 0:15 Clip`) opens a 4-slide Story Preview Modal (with progress bars, prev/next tap zones, explicit `✕` close button, and a sticky bottom bar: `"✨ Unlock All 85 Photos + 14 Videos · $9.99 →"` that opens the Screen 2 Checkout Drawer directly).
   - Tapping Card 3 (`🔒 +85 Photos & 14 Videos`) opens the Screen 2 Checkout Drawer directly.
2. **Upgrade #2 — Responsive `100dvh` Fit & Unclipped Footer**:
   - Single-line `✓ One-Time Pass · No Subscription` eyebrow (`white-space: nowrap`).
   - Bottom footer (`🛡️ Whop · Receipt: "Sarah Montreal VIP"` + `Restore Access` button) is never clipped across `390×844`, `400×780`, or `375×667` viewports.
3. **Upgrade #3 — Explicit `✕` Close Button & `$9.99 USD` Currency on Screen 2**:
   - Checkout drawer includes `#close-checkout-btn` (`aria-label="Close checkout"`), backdrop dismissal, `Escape` key dismissal, and explicit `$9.99` + `USD Total` labeling.
4. **Upgrade #4 — Instagram Webview Survival Kit (`🔗 Copy Link` + `Restore Access`)**:
   - Unlocking saves `{ unlocked: true, email, receiptId, unlockedAt }` to `localStorage` (`sarah_vip_access_v1`) and updates URL query (`?vault=unlocked`).
   - Screen 3 includes `#copy-vault-link-btn` (`🔗 Copy Link`) which copies the permanent unlock URL and shows `"✓ Link Copied!"`.
   - Screen 1 includes `#restore-access-btn` (`Restore Access`), which opens a quick restore prompt (or immediately restores if a token exists in `localStorage` or user enters their purchase email).
5. **Upgrade #5 — Single-Line Filter Pills & Distinct Video vs. Photo Gallery Cards on Screen 3**:
   - Folder filter bar (`#vault-filter-bar`) uses `white-space: nowrap; overflow-x: auto;` with 4 pills: `all` (`All (99)`), `bedroom` (`01. Bedroom (32)`), `cheer` (`02. Cheer (26)`), `studio` (`03. Studio (41)`).
   - Video items render `4K VIDEO` / `HD VIDEO` badges + `▶` play button; Photo Gallery sets render `PHOTO GALLERY` badge + `🖼️ Open XX Photos` pill and open an interactive multi-photo gallery viewer when clicked.
