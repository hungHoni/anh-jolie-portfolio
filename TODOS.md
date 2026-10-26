# Project Task Queue (TODOS.md)

> **Auto-Pickup Contract**: Autonomous workers first check open PR review/CI feedback, then triage `INBOX.md`, then scan top-to-bottom for the highest-priority `[ ] PENDING` task whose `DependsOn` tasks are `DONE`.

## Queue

- [x] **TASK-001** | `IN_PROGRESS (session: d04d3c2f, started: 2026-10-27T00:39:00+07:00)` | Priority: `P0` | DependsOn: `none`
  - **Title**: Build Sarah T (`@sarahmontrealm`) Exclusive Portfolio & $9.99 One-Time Whop Checkout ("Hybrid A + C" UX v4)
  - **Spec**: `docs/specs/2026-10-27-sarah-montreal-vip.md`
  - **Plan**: `docs/superpowers/plans/2026-10-27-sarah-montreal-vip.md`
  - **Files**: `sarah-montreal-vip/index.html`, `sarah-montreal-vip/styles.css`, `sarah-montreal-vip/app.js`, `tests/sarah-montreal-vip.test.mjs`
  - **Acceptance**: Full Hybrid A + C landing page with $9.99 one-time Whop checkout drawer, interactive story preview lightbox, unlocked vault with 1-line folder filters, Telegram & ZIP delivery, and Instagram webview restore persistence.
  - **Verify**: `node --test tests/sarah-montreal-vip.test.mjs`
