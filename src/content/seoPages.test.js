import { describe, expect, test } from "vitest";
import { SEO_PAGES } from "./seoPages.js";
import { PROJECTS } from "./catalog.js";

const TITLE_MAX = 70;
const DESCRIPTION_MAX = 160;
const projectIds = new Set(PROJECTS.map((p) => p.id));

describe("SEO_PAGES", () => {
  test("has unique url-safe slugs", () => {
    const slugs = SEO_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  test.each(SEO_PAGES.map((p) => [p.slug, p]))("%s fits search snippet limits", (_, page) => {
    expect(page.title.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(page.description.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(page.h1).toBeTruthy();
  });

  test.each(SEO_PAGES.map((p) => [p.slug, p]))("%s brands itself as Muhnur", (_, page) => {
    expect(page.title).toContain("Muhnur");
  });

  test.each(SEO_PAGES.map((p) => [p.slug, p]))("%s references only real projects", (_, page) => {
    page.projectIds.forEach((id) => expect(projectIds.has(id)).toBe(true));
  });

  test.each(SEO_PAGES.map((p) => [p.slug, p]))("%s has intro text and faq", (_, page) => {
    expect(page.intro.length).toBeGreaterThan(0);
    expect(page.faq.length).toBeGreaterThan(0);
  });
});
