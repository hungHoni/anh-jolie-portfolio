# Design System — Sarah Montreal VIP (`@sarahmontrealm`)

## 1. Aesthetic Direction: "Hybrid A + C" (Velvet Impulse + Editorial Folder Trust)

- **Top Half (Option A — Velvet After-Hours Impulse)**:
  - Deep Obsidian background (`#0B090B`) framing Sarah's portrait hero (`assets/sarah-12.jpg` & `assets/sarah-1.jpg` avatar), live green availability badge (`● Online Now · Montreal`), and a 3-card interactive teaser strip (`👁 Free View`, `▶ 0:15 Clip`, `🔒 +85 Photos & 14 Videos`).
- **Bottom Half & Unlocked Vault (Option C — Warm Cream Editorial Receipt & Folder Checklist)**:
  - Warm Alabaster Cream (`#FAF7F2`) sheet with Espresso Ink (`#181512`) typography, a single-line trust green eyebrow (`✓ ONE-TIME PASS · NO SUBSCRIPTION` in `#166534`), a dark price badge (`$49` strikethrough → `$9.99 USD · 80% OFF`), and a single unified white Folder Checklist box (`border: 1px solid #E5E0D8`).

## 2. Color Tokens

| Token | Hex | Purpose |
| :--- | :--- | :--- |
| `--bg-obsidian` | `#0B090B` | Top hero & teaser framing background |
| `--bg-cream` | `#FAF7F2` | Bottom trust sheet, checkout drawer, and unlocked vault background |
| `--surface-card` | `#FFFFFF` | Unified folder checklist container & checkout input group |
| `--ink-primary` | `#181512` | Primary editorial text & dark contrast buttons |
| `--ink-muted` | `#57534E` | Secondary labels & discreet billing reassurance |
| `--accent-rose` | `#E11D48` / `#F43F5E` | Primary impulse CTA gradient & verified accents |
| `--trust-green` | `#166534` / `#10B981` | Live status indicator, one-time pass eyebrow, and unlocked badges |
| `--border-warm` | `#E5E0D8` | Hairline borders & dashed folder separators |

## 3. Typography

- **Display / Masthead**: `'Cormorant Garamond', Georgia, serif` (`600` / `700`)
- **UI & Body**: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif` (`500`, `600`, `700`, `800`)
- **Numeric / File Counts / Price**: `'JetBrains Mono', monospace` (`600`, `700`)

## 4. Mobile & Instagram In-App Browser Viewport Rules

1. **Above-the-Fold Guarantee (`100dvh`)**:
   - The landing view uses `min-height: 100dvh` with `clamp()` heights on the hero (`clamp(200px, 31dvh, 260px)`) and teaser strip (`clamp(112px, 17dvh, 140px)`) plus `padding-bottom: calc(14px + env(safe-area-inset-bottom))` so the bottom trust line (`🛡️ Whop · Receipt: "Sarah Montreal VIP"`) and `Restore Access` link are never clipped.
2. **Single-Line Elements**:
   - The green eyebrow (`✓ ONE-TIME PASS · NO SUBSCRIPTION`) and the Screen 3 folder filter pills (`All (99)`, `01. Bedroom (32)`, `02. Cheer (26)`, `03. Studio (41)`) enforce `white-space: nowrap`.
