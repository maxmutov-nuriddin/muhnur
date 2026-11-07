/**
 * Pure HTML/XML renderers for the static SEO service pages.
 * No file system access here, so everything is unit-testable.
 */

export const SITE_URL = "https://muhnur.uz";
export const SERVICE_BASE = "/xizmatlar";
const SITE_NAME = "Muhnur";
const PERSON = "Muhsina Boymatova";
const REQUIRED_FIELDS = ["slug", "title", "description", "h1"];
const MAX_PROJECT_CARDS = 6;

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** @param {unknown} value */
export const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);

export const servicePath = (slug) => `${SERVICE_BASE}/${slug}/`;

const jsonLd = (graph) =>
  `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c")}</script>`;

function assertPage(page) {
  const missing = REQUIRED_FIELDS.filter((key) => !page?.[key]);
  if (missing.length) {
    throw new Error(`SEO sahifa "${page?.slug ?? "?"}" uchun maydon yo'q: ${missing.join(", ")}`);
  }
}

function structuredData(page, url) {
  return jsonLd([
    {
      "@type": "Service",
      name: page.h1,
      description: page.description,
      url,
      areaServed: "UZ",
      provider: { "@type": "Person", name: PERSON, url: `${SITE_URL}/` },
    },
    {
      "@type": "FAQPage",
      mainEntity: (page.faq ?? []).map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    },
  ]);
}

function head(page, url) {
  const t = escapeHtml(page.title);
  const d = escapeHtml(page.description);
  return `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${t}</title>
<meta name="description" content="${d}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<link rel="canonical" href="${url}" />
<meta name="theme-color" content="#0c0a12" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:locale" content="uz_UZ" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:image" content="${SITE_URL}/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=Manrope:wght@400;600&display=swap" rel="stylesheet" />
<style>${STYLES}</style>
${structuredData(page, url)}`;
}

const list = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

function projectCards(ids, projects) {
  const byId = new Map(projects.map((p) => [p.id, p]));
  const cards = ids
    .map((id) => byId.get(id))
    .filter((p) => p?.images?.length)
    .slice(0, MAX_PROJECT_CARDS)
    .map(({ title, task, images: [img] }) => `<figure>
<img src="${escapeHtml(img.thumb)}" alt="${escapeHtml(`${title} — ${task}`)}" width="${img.w}" height="${img.h}" loading="lazy" decoding="async" />
<figcaption><b>${escapeHtml(title)}</b><span>${escapeHtml(task)}</span></figcaption>
</figure>`);
  return cards.length ? `<section><h2>Ishlardan namunalar</h2><div class="grid">${cards.join("")}</div></section>` : "";
}

function faqSection(faq = []) {
  if (!faq.length) return "";
  const items = faq
    .map(({ q, a }) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`)
    .join("");
  return `<section><h2>Ko‘p so‘raladigan savollar</h2>${items}</section>`;
}

function relatedLinks(current, pages) {
  const links = pages
    .filter((p) => p.slug !== current.slug)
    .map((p) => `<li><a href="${servicePath(p.slug)}">${escapeHtml(p.h1)}</a></li>`)
    .join("");
  return `<nav aria-label="Boshqa xizmatlar"><h2>Boshqa xizmatlar</h2><ul class="links">${links}</ul></nav>`;
}

/**
 * @param {object} page service page data from src/content/seoPages.js
 * @param {{ projects: object[], pages: object[] }} ctx
 * @returns {string} complete HTML document
 */
export function renderServicePage(page, { projects, pages }) {
  assertPage(page);
  const url = `${SITE_URL}${servicePath(page.slug)}`;
  const intro = (page.intro ?? []).map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  const includes = page.includes?.length
    ? `<section><h2>Nimalar kiradi</h2><ul class="ticks">${list(page.includes)}</ul></section>`
    : "";
  const ru = page.ru ? `<section lang="ru"><h2>На русском</h2><p>${escapeHtml(page.ru)}</p></section>` : "";

  return `<!doctype html>
<html lang="uz">
<head>
${head(page, url)}
</head>
<body>
<header class="top"><a class="brand" href="/">${SITE_NAME}</a><a class="cta" href="/#contact">Buyurtma berish</a></header>
<main>
<nav class="crumbs" aria-label="Breadcrumb"><a href="/">${SITE_NAME}</a> / <span>${escapeHtml(page.h1)}</span></nav>
<h1>${escapeHtml(page.h1)}</h1>
${intro}
<p><a class="cta" href="/#contact">Loyihani muhokama qilish</a> <a class="ghost" href="/">Portfolioni ko‘rish</a></p>
${includes}
${projectCards(page.projectIds ?? [], projects)}
${faqSection(page.faq)}
${ru}
${relatedLinks(page, pages)}
</main>
<footer><span>© 2026 ${PERSON} · ${SITE_NAME}</span><a href="/">muhnur.uz</a></footer>
</body>
</html>
`;
}

/**
 * @param {{ slug: string }[]} pages
 * @param {string} lastmod YYYY-MM-DD
 */
export function renderSitemap(pages, lastmod) {
  const entry = (path, priority) =>
    `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  const urls = [entry("/", "1.0"), ...pages.map((p) => entry(servicePath(p.slug), "0.8"))];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

const STYLES = `
:root{--bg:#0c0a12;--panel:#15121f;--ink:#efeaf7;--ink-2:#b9b0cc;--line:#2a2438;--accent:#8f6bff}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 Manrope,system-ui,sans-serif}
a{color:var(--ink)}
.top,footer{display:flex;justify-content:space-between;align-items:center;gap:16px;max-width:960px;margin:0 auto;padding:18px 16px}
.brand{font:700 20px Syne,system-ui,sans-serif;text-decoration:none}
main{max-width:960px;margin:0 auto;padding:8px 16px 48px}
h1{font:700 clamp(32px,6vw,56px)/1.05 Syne,system-ui,sans-serif;margin:12px 0 20px}
h2{font:600 24px/1.2 Syne,system-ui,sans-serif;margin:48px 0 16px}
p{color:var(--ink-2);max-width:68ch}
.crumbs{font-size:13px;color:var(--ink-2)}
.cta,.ghost{display:inline-block;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600}
.cta{background:var(--accent);color:#fff}
.ghost{border:1px solid var(--line);margin-left:8px}
.ticks{padding-left:20px;color:var(--ink-2)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
figure{margin:0;background:var(--panel);border:1px solid var(--line);border-radius:14px;overflow:hidden}
figure img{display:block;width:100%;height:auto}
figcaption{padding:12px 14px;display:grid;gap:2px;font-size:14px}
figcaption span{color:var(--ink-2)}
details{border-bottom:1px solid var(--line);padding:12px 0}
summary{cursor:pointer;font-weight:600}
.links{display:flex;flex-wrap:wrap;gap:10px;list-style:none;padding:0}
.links a{display:inline-block;padding:8px 14px;border:1px solid var(--line);border-radius:999px;text-decoration:none;font-size:14px}
footer{color:var(--ink-2);font-size:13px;border-top:1px solid var(--line)}
`;
