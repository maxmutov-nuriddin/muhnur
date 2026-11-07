#!/usr/bin/env node
/**
 * Writes the static SEO service pages and sitemap into public/ so Vite
 * copies them to dist/. Runs automatically before `npm run dev` and `npm run build`.
 * Output is generated: edit src/content/seoPages.js instead.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { PROJECTS } from "../src/content/catalog.js";
import { SEO_PAGES } from "../src/content/seoPages.js";
import { renderServicePage, renderSitemap, SERVICE_BASE } from "./seo/render.mjs";

const PUBLIC_DIR = resolve(import.meta.dirname, "..", "public");
const SERVICE_DIR = join(PUBLIC_DIR, SERVICE_BASE);

function main() {
  rmSync(SERVICE_DIR, { recursive: true, force: true });
  for (const page of SEO_PAGES) {
    const dir = join(SERVICE_DIR, page.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), renderServicePage(page, { projects: PROJECTS, pages: SEO_PAGES }));
  }
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), renderSitemap(SEO_PAGES, today));
  console.info(`SEO: ${SEO_PAGES.length} ta xizmat sahifasi va sitemap.xml yozildi.`);
}

try {
  main();
} catch (error) {
  console.error("SEO sahifalarni yaratib bo'lmadi:", error);
  process.exit(1);
}
