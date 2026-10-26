# Project Task Queue (TODOS.md)

> **Auto-Pickup Contract**: Autonomous workers first check open PR review/CI feedback, then triage `INBOX.md`, then scan top-to-bottom for the highest-priority `[ ] PENDING` task whose `DependsOn` tasks are `DONE`.

## Queue

- [x] **TASK-001** | `DONE` | Priority: `P0` | DependsOn: `none`
  - **Title**: Build Sarah T (`@sarahmontrealm`) Exclusive Portfolio & $9.99 One-Time Whop Checkout ("Hybrid A + C" UX v4)
  - **Spec**: `docs/specs/2026-10-27-sarah-montreal-vip.md`
  - **Plan**: `docs/superpowers/plans/2026-10-27-sarah-montreal-vip.md`
  - **Files**: `sarah-montreal-vip/index.html`, `sarah-montreal-vip/styles.css`, `sarah-montreal-vip/app.js`, `tests/sarah-montreal-vip.test.mjs`, `tests/verify-sarah-vip-e2e.mjs`
  - **Acceptance**: Full Hybrid A + C landing page with $9.99 one-time Whop checkout drawer, interactive story preview lightbox, unlocked vault with 1-line folder filters, Telegram & ZIP delivery, and Instagram webview restore persistence.
  - **Verify**: `bun test && bun tests/verify-sarah-vip-e2e.mjs`
