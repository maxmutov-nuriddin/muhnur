#!/usr/bin/env node
/**
 * ISHLAR/ papkasidagi ishlarni saytga tayyorlaydi.
 *
 * Har bir papka yoki PDF = bitta loyiha. Rasmlar va PDF sahifalari
 * public/works/<id>/ ichiga webp bo'lib yoziladi (katta + kichik nusxa),
 * o'lchamlar esa src/content/works.generated.js ga yoziladi.
 *
 * Talab: pdftoppm (poppler) va sharp. Ishga tushirish: npm run works
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, extname, join, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const SRC_DIR = join(ROOT, "ISHLAR");
const OUT_DIR = join(ROOT, "public", "works");
const MANIFEST = join(ROOT, "src", "content", "works.generated.js");

const FULL_MAX = 1600;
const THUMB_MAX = 520;
const PDF_RENDER_WIDTH = 1600;
const WEBP_QUALITY = 78;
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// Papka/PDF nomi -> loyiha id. Yangi ish qo'shilsa shu yerga yozing.
const SOURCES = {
  "AlloPlay logo.pdf": "alloplay",
  "Muhnur branding org.pdf": "muhnur",
  "georush1.pdf": "georush",
  "stayl.uz brandbook.pdf": "stayl",
  "kompaniy fortisweb": "fortisweb",
  markaz: "markaz",
  tish: "tish",
  krasovka: "krasovka",
  napitka: "napitka",
  baner: "baner",
  beydjik: "beydjik",
  book1: "kitob",
  "burger ": "burger",
  travel: "travel",
  vizitka: "vizitka",
  vizitka2: "vizitka2",
};

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

function listFolderImages(dir) {
  const seen = new Set();
  return readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()))
    .sort(naturalSort)
    .map((f) => join(dir, f))
    .filter((file) => {
      // "Artboard 2 (1).png" kabi aynan bir xil nusxalarni tashlab ketamiz.
      const hash = createHash("md5").update(readFileSync(file)).digest("hex");
      if (seen.has(hash)) return false;
      seen.add(hash);
      return true;
    });
}

function renderPdfPages(pdf, tmp) {
  execFileSync("pdftoppm", ["-png", "-scale-to-x", String(PDF_RENDER_WIDTH), "-scale-to-y", "-1", pdf, join(tmp, "p")]);
  return readdirSync(tmp)
    .filter((f) => f.startsWith("p"))
    .sort(naturalSort)
    .map((f) => join(tmp, f));
}

async function writeVariants(input, outDir, index) {
  const name = String(index + 1).padStart(2, "0");
  const base = sharp(input).rotate();
  const full = await base
    .clone()
    .resize(FULL_MAX, FULL_MAX, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(join(outDir, `${name}.webp`));
  await base
    .clone()
    .resize(THUMB_MAX, THUMB_MAX, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(join(outDir, `${name}-t.webp`));
  const dir = basename(outDir);
  return { src: `/works/${dir}/${name}.webp`, thumb: `/works/${dir}/${name}-t.webp`, w: full.width, h: full.height };
}

async function buildProject(sourceName, id) {
  const sourcePath = join(SRC_DIR, sourceName);
  const outDir = join(OUT_DIR, id);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const isPdf = statSync(sourcePath).isFile() && extname(sourceName).toLowerCase() === ".pdf";
  const tmp = isPdf ? mkdtempSync(join(tmpdir(), "works-")) : null;
  try {
    const inputs = isPdf ? renderPdfPages(sourcePath, tmp) : listFolderImages(sourcePath);
    if (inputs.length === 0) throw new Error(`Rasm topilmadi: ${sourceName}`);
    const images = [];
    for (const [i, file] of inputs.entries()) images.push(await writeVariants(file, outDir, i));
    return images;
  } finally {
    if (tmp) rmSync(tmp, { recursive: true, force: true });
  }
}

async function main() {
  const manifest = {};
  for (const [sourceName, id] of Object.entries(SOURCES)) {
    manifest[id] = await buildProject(sourceName, id);
    console.log(`${id}: ${manifest[id].length} ta rasm`);
  }
  const body = `// Avtomatik yaratilgan: npm run works. Qo'lda o'zgartirmang.\nexport const WORK_IMAGES = ${JSON.stringify(manifest, null, 2)};\n`;
  writeFileSync(MANIFEST, body);
}

main().catch((err) => {
  console.error("Ishlarni tayyorlashda xato:", err);
  process.exit(1);
});
