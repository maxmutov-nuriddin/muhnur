/**
 * Buklangan varaq to'ri: loyihaning barcha rasmlari sahifaga sig'ishi uchun
 * ustun/qator sonini tanlaydi va har bir panel qaysi bukilish chizig'i
 * atrofida, nechanchi bo'lib ochilishini aniqlaydi.
 */

/** Panellar orasidagi bukilish chizig'i, maydon kengligiga nisbatan. */
export const FOLD_GAP = 0.012;

/**
 * Rasmlar eng katta ko'rinadigan to'rni tanlaydi (rasm kesilmaydi, cho'zilmaydi).
 * @param {number} count rasmlar soni
 * @param {number} itemAspect rasmning eni/bo'yi nisbati
 * @param {number} areaAspect joy eni/bo'yi nisbati
 * @param {number} [gap]
 * @returns {{ cols: number, rows: number }}
 */
export function computeFoldGrid(count, itemAspect, areaAspect, gap = FOLD_GAP) {
  if (!Number.isInteger(count) || count < 1) throw new Error("computeFoldGrid: count must be >= 1");
  const areaH = 1 / areaAspect;
  let best = { cols: 1, rows: count, score: -1 };
  for (let cols = 1; cols <= count; cols++) {
    const rows = Math.ceil(count / cols);
    const cellW = (1 - gap * (cols - 1)) / cols;
    const cellH = (areaH - gap * (rows - 1)) / rows;
    if (cellW <= 0 || cellH <= 0) continue;
    const w = Math.min(cellW, cellH * itemAspect);
    // Teng bo'lsa kamroq bo'sh katakli to'r yutadi.
    const score = w * w - (cols * rows - count) * 1e-9;
    if (score > best.score) best = { cols, rows, score };
  }
  return { cols: best.cols, rows: best.rows };
}

/**
 * Panel qanday ochiladi: birinchi qator chapdan o'ngga ("x"), qolgan
 * qatorlar yuqoridan pastga ("y"). Birinchi panel joyida turadi.
 * @param {number} index
 * @param {number} cols
 * @returns {{ axis: "x" | "y" | null, step: number }}
 */
export function foldStep(index, cols) {
  const col = index % cols;
  const row = Math.floor(index / cols);
  if (row === 0) return { axis: col === 0 ? null : "x", step: col };
  return { axis: "y", step: cols - 1 + row };
}

/**
 * @param {ReadonlyArray<{ w: number, h: number }>} images
 * @returns {number}
 */
export function medianAspect(images) {
  if (images.length === 0) return 1;
  const ratios = images.map(({ w, h }) => w / h).sort((a, b) => a - b);
  return ratios[Math.floor(ratios.length / 2)];
}
