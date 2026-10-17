import { describe, test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const html = readFileSync(join(import.meta.dir, "..", "index.html"), "utf8");

describe("Anh Jolie Portfolio (index.html)", () => {
  test("does not contain Buy Me a Coffee section", () => {
    expect(html.toLowerCase()).not.toContain("buy me a coffee");
    expect(html.toLowerCase()).not.toContain("grab me coffee");
  });

  test("includes Anh Jolie profile photo in Hero Polaroid, About card, and Modal header", () => {
    const avatarUrl = "https://pps.services.adobe.com/api/profile/750D1D81658C55D60A495EF0@AdobeID/image/1b6f3408-648a-427c-b1b6-2637dbc64928/276";
    const occurrences = html.split(avatarUrl).length - 1;
    expect(occurrences).toBeGreaterThanOrEqual(3);
    expect(html).toContain('id="heroPolaroid"');
    expect(html).toContain('class="about-polaroid-card"');
    expect(html).toContain('class="modal-artist-chip"');
  });

  test("includes redesigned Editorial Lookbook & Studio Popup Modal without black letterbox", () => {
    expect(html).toContain('id="projectModalBackdrop"');
    expect(html).toContain('class="modal-ambient-bg"');
    expect(html).toContain('class="modal-print-frame"');
    expect(html).toContain('class="contact-frame');
    expect(html).toContain('id="nextProjectBtn"');
    expect(html).toContain('id="retouchToggleBtn"');
  });

  test("uses in-page popup triggers (data-open-project) instead of external Behance links on project and moodboard cards", () => {
    expect(html).toContain('data-open-project="resort-2026"');
    expect(html).toContain('data-open-project="beauty-karina-chipu"');
    expect(html).toContain('data-open-project="paulas-choice"');
    expect(html).toContain('data-open-project="editorial-bloom"');
    expect(html).toContain('data-open-project="mb-tham-khao"');
    expect(html).toContain('data-open-project="mb-post-social"');
    expect(html).toContain('data-open-project="mb-design-brand"');
    expect(html).toContain('data-open-project="mb-portfolio-typo"');
    expect(html).not.toContain('target="_blank"');
  });

  test("includes mobile responsive breakpoint (<= 809.98px) modeled after jackiehu.design", () => {
    expect(html).toContain("@media (max-width: 809.98px)");
  });

  test("supports swipe-down / pull-down gesture and locks background scroll on iOS Safari", () => {
    expect(html).toContain('id="modalDragHandle"');
    expect(html).toContain('class="modal-drag-pill"');
    expect(html).toContain('id="modalBody"');
    expect(html).toContain("setupModalPullDownToClose");
    expect(html).toContain("lockBodyScroll");
    expect(html).toContain("unlockBodyScroll");
  });
});
