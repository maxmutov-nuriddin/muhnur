import { describe, expect, test } from "vitest";
import { escapeHtml, renderServicePage, renderSitemap, SITE_URL } from "./render.mjs";

const page = {
  slug: "logotip-dizayni",
  title: "Logotip dizayni buyurtma qilish",
  description: "Logotip zakaz qilish <Toshkent> & tez",
  h1: "Logotip dizayni",
  intro: ["Birinchi paragraf."],
  includes: ["Logotip", "Grid"],
  projectIds: ["alloplay", "missing-id"],
  faq: [{ q: "Qancha vaqt?", a: "1–3 hafta." }],
  ru: "Заказать логотип в Ташкенте.",
};

const projects = [
  {
    id: "alloplay",
    title: "AlloPlay",
    task: "Logotip",
    images: [{ thumb: "/works/alloplay/01-t.webp", w: 1600, h: 1055 }],
  },
];

const pages = [page, { slug: "smm-dizayn", h1: "SMM dizayn" }];

const extractJsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    ([, json]) => JSON.parse(json),
  );

describe("escapeHtml", () => {
  test("escapes markup-significant characters", () => {
    expect(escapeHtml(`<a href="x">&'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;",
    );
  });
});

describe("renderServicePage", () => {
  const html = renderServicePage(page, { projects, pages });

  test("sets escaped title, description and canonical url", () => {
    expect(html).toContain("<title>Logotip dizayni buyurtma qilish</title>");
    expect(html).toContain("Logotip zakaz qilish &lt;Toshkent&gt; &amp; tez");
    expect(html).toContain(
      `<link rel="canonical" href="${SITE_URL}/xizmatlar/logotip-dizayni/" />`,
    );
  });

  test("renders a single h1 and the faq", () => {
    expect(html.match(/<h1>/g)).toHaveLength(1);
    expect(html).toContain("Qancha vaqt?");
  });

  test("shows only projects that exist, with sized lazy images", () => {
    expect(html).toContain('src="/works/alloplay/01-t.webp"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('width="1600" height="1055"');
    expect(html).not.toContain("missing-id");
  });

  test("links to other service pages but not to itself", () => {
    expect(html).toContain('href="/xizmatlar/smm-dizayn/"');
    expect(html).not.toContain('href="/xizmatlar/logotip-dizayni/"');
  });

  test("embeds valid Service, FAQPage and BreadcrumbList JSON-LD", () => {
    const types = extractJsonLd(html).flatMap((d) => d["@graph"].map((n) => n["@type"]));
    expect(types).toEqual(["Service", "FAQPage", "BreadcrumbList"]);
  });

  test("throws when a required field is missing", () => {
    expect(() => renderServicePage({ ...page, h1: "" }, { projects, pages })).toThrow(/h1/);
  });
});

describe("renderSitemap", () => {
  test("lists the home page and every service page with lastmod", () => {
    const xml = renderSitemap(pages, "2026-11-07");
    expect(xml).toContain(`<loc>${SITE_URL}/</loc>`);
    expect(xml).toContain(`<loc>${SITE_URL}/xizmatlar/smm-dizayn/</loc>`);
    expect(xml.match(/<url>/g)).toHaveLength(3);
    expect(xml).toContain("<lastmod>2026-11-07</lastmod>");
  });
});
