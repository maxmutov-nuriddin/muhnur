import { computeFoldGrid, foldStep, medianAspect } from "../../content/foldGrid.js";
import { openLightbox } from "../../lib/lightboxBus.js";

// Varaq joyi sahifada (fold.css bilan mos): eni 0.86, bo'yi 1.414 - 0.07 - 0.15.
const SHEET_AREA_ASPECT = 0.86 / 1.194;
// Butun varaq ochilishi shu vaqtdan oshmaydi.
const UNFOLD_TOTAL_MS = 1100;
const UNFOLD_STEP_MAX_MS = 150;

/**
 * Loyihaning barcha ishlari bitta buklangan varaqda. Sahifa ochilganda
 * (flipbook `.is-open` qo'yadi) panellar bukilish chiziqlari atrofida ochiladi.
 * @param {{ project: (typeof import("../../content/catalog.js").PROJECTS)[number] }} props
 */
export default function FoldSheet({ project }) {
  const { title, images, palette = [] } = project;
  const { cols, rows } = computeFoldGrid(images.length, medianAspect(images), SHEET_AREA_ASPECT);
  const lastStep = cols - 1 + rows - 1;
  const stepMs = lastStep > 0 ? Math.min(UNFOLD_STEP_MAX_MS, UNFOLD_TOTAL_MS / lastStep) : 0;
  const ground = palette[0] ?? { hex: "#121019" };

  return (
    <div className={`fold${ground.light ? " fold--light" : ""}`} style={{ "--fold-bg": ground.hex }}>
      <div
        className="fold-sheet"
        style={{ "--cols": cols, "--rows": rows, "--fold-step": `${Math.round(stepMs)}ms` }}
      >
        {images.map((image, i) => {
          const { axis, step } = foldStep(i, cols);
          return (
            <button
              key={image.src}
              type="button"
              className="fold-tile"
              data-fold={axis ?? undefined}
              style={{ "--step": step }}
              aria-label={`${title}: ${i + 1}-ish, kattalashtirish`}
              onClick={() => openLightbox({ title, images, index: i })}
            >
              <img src={image.thumb} alt="" width={image.w} height={image.h} loading="lazy" decoding="async" />
            </button>
          );
        })}
      </div>
      <p className="fold-cap">
        <span>{images.length} ta ish</span>
        <span>Kattalashtirish uchun bosing</span>
      </p>
    </div>
  );
}
