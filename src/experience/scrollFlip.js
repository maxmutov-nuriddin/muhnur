/**
 * Kitob ochiq paytda scroll sahifalarni varaqlaydi: pastga — keyingi,
 * tepaga — oldingi. Birinchi sahifada tepaga scroll kitobni yopishga,
 * oxirgi sahifada pastga scroll esa sahifaning davomiga o'tkaziladi.
 */

// Trackpad juda ko'p mayda hodisa beradi: shuncha piksel yig'ilgach varaqlanadi.
const WHEEL_THRESHOLD_PX = 40;
const SWIPE_MIN_PX = 40;
// Varaqlash animatsiyasining shu qismi o'tgach keyingi scroll qabul qilinadi.
const LOCK_FRACTION = 0.8;

/**
 * @param {{ index: number, first: number, count: number, mobile: boolean, dir: 1 | -1 }} state
 * @returns {"next" | "prev" | "release"}
 */
export function scrollAction({ index, first, count, mobile, dir }) {
  if (dir < 0) return index <= first ? "release" : "prev";
  const lastIndex = mobile ? count - 1 : count - 2;
  return index >= lastIndex ? "release" : "next";
}

/**
 * @param {{
 *   pf: { flipNext: () => void, flipPrev: () => void, getCurrentPageIndex: () => number, getPageCount: () => number },
 *   mobile: boolean,
 *   first: number,
 *   flipMs: number,
 *   isOpen: () => boolean,
 *   signal: AbortSignal,
 * }} options
 */
export function installScrollFlip({ pf, mobile, first, flipMs, isOpen, signal }) {
  let lockedUntil = 0,
    wheelAcc = 0,
    touchY = null,
    touchX = 0;

  const actionFor = (dir) =>
    scrollAction({ index: pf.getCurrentPageIndex(), first, count: pf.getPageCount(), mobile, dir });

  // Ko'rish oynasi yoki matn maydoni ichidagi scroll kitobga tegmaydi.
  const ignored = (target) => !isOpen() || document.querySelector(".lb") || target.closest?.("textarea");

  function turn(action) {
    const now = performance.now();
    if (now < lockedUntil) return;
    lockedUntil = now + flipMs * LOCK_FRACTION;
    if (action === "next") pf.flipNext();
    else pf.flipPrev();
  }

  function handleWheel(e) {
    if (ignored(e.target) || e.deltaY === 0) return;
    const dir = e.deltaY > 0 ? 1 : -1;
    const action = actionFor(dir);
    if (action === "release") {
      wheelAcc = 0;
      return;
    }
    e.preventDefault();
    if (Math.sign(wheelAcc) !== dir) wheelAcc = 0;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) < WHEEL_THRESHOLD_PX) return;
    wheelAcc = 0;
    turn(action);
  }

  function handleTouchStart(e) {
    touchY = e.touches.length === 1 && !ignored(e.target) ? e.touches[0].clientY : null;
    touchX = e.touches[0]?.clientX ?? 0;
  }

  function handleTouchMove(e) {
    if (touchY == null) return;
    const dy = touchY - e.touches[0].clientY;
    const dx = touchX - e.touches[0].clientX;
    if (Math.abs(dy) <= Math.abs(dx)) return;
    if (actionFor(dy > 0 ? 1 : -1) !== "release") e.preventDefault();
  }

  function handleTouchEnd(e) {
    if (touchY == null) return;
    const dy = touchY - e.changedTouches[0].clientY;
    const dx = touchX - e.changedTouches[0].clientX;
    touchY = null;
    if (Math.abs(dy) < SWIPE_MIN_PX || Math.abs(dy) <= Math.abs(dx)) return;
    const action = actionFor(dy > 0 ? 1 : -1);
    if (action !== "release") turn(action);
  }

  addEventListener("wheel", handleWheel, { passive: false, signal });
  addEventListener("touchstart", handleTouchStart, { passive: true, signal });
  addEventListener("touchmove", handleTouchMove, { passive: false, signal });
  addEventListener("touchend", handleTouchEnd, { passive: true, signal });
}
