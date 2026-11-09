import { PageFlip } from "page-flip/dist/js/page-flip.module.js";

const MOBILE_BREAKPOINT = 760;
const A_RATIO = 1.414;

/** Page size in px for the HTML flipbook, matched to the 3D book's final framing. */
export function computeLayout(vw, vh) {
  const mobile = vw < MOBILE_BREAKPOINT;
  let pw, ph;
  if (mobile) {
    pw = Math.min(vw * 0.88, (vh * 0.72) / A_RATIO);
    ph = pw * A_RATIO;
  } else {
    ph = Math.min(vh * 0.8, ((vw * 0.86) / 2) * A_RATIO);
    pw = ph / A_RATIO;
  }
  return { mobile, pw: Math.round(pw), ph: Math.round(ph) };
}

export function applyHolderSize(holder, { mobile, pw, ph }) {
  holder.style.width = (mobile ? pw : pw * 2) + "px";
  holder.style.height = ph + "px";
  holder.style.setProperty("--pw", pw + "px");
}

/**
 * Note: PageFlip.destroy() removes #book from the DOM, which React owns,
 * so the flipbook is never destroyed; it lives as long as the page.
 */
export function createFlipbook({ bookEl, countEl, prevBtn, nextBtn }, { mobile, pw, ph, reduce }) {
  const pages = [...bookEl.querySelectorAll(".page")];
  if (!mobile) pages.forEach((p, i) => p.classList.add(i % 2 ? "gr" : "gl"));
  const pf = new PageFlip(bookEl, {
    width: pw,
    height: ph,
    size: "fixed",
    showCover: false,
    usePortrait: mobile,
    maxShadowOpacity: 0.6,
    flippingTime: reduce ? 300 : 1000,
    mobileScrollSupport: true,
    showPageCorners: true,
    disableFlipByClick: true,
  });
  pf.loadFromHTML(pages);
  const total = pf.getPageCount();

  // Matnli sahifalarda (.page-body) vertikal skrol paytida sahifa o'girilib ketishini oldini olish
  bookEl.querySelectorAll(".page-body").forEach((body) => {
    let startX = 0;
    let startY = 0;
    let isVertical = false;
    let isHorizontal = false;

    body.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isVertical = false;
        isHorizontal = false;
        e.stopPropagation();
      },
      { passive: true }
    );

    body.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length !== 1) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - startX;
        const diffY = currentY - startY;

        if (!isVertical && !isHorizontal) {
          if (Math.abs(diffY) > 6 && Math.abs(diffY) >= Math.abs(diffX)) {
            isVertical = true;
          } else if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
            isHorizontal = true;
          }
        }

        e.stopPropagation();
      },
      { passive: true }
    );

    body.addEventListener(
      "touchend",
      (e) => {
        if (isHorizontal) {
          const endX = e.changedTouches[0].clientX;
          const diffX = endX - startX;
          if (diffX < -35) pf.flipNext();
          else if (diffX > 35) pf.flipPrev();
        }
        e.stopPropagation();
      },
      { passive: true }
    );

    body.addEventListener("mousedown", (e) => e.stopPropagation());
  });

  // Ko'rinib turgan sahifalar `.is-open` oladi: buklangan varaqlar shu payt ochiladi.
  function markOpen(i) {
    const first = mobile ? i : i - (i % 2);
    const last = mobile ? i : first + 1;
    pages.forEach((p, n) => p.classList.toggle("is-open", n >= first && n <= last));
  }

  function label(i) {
    if (mobile) return "Sahifa " + (i + 1);
    const a = i - (i % 2);
    return "Sahifa " + (a + 1) + "–" + Math.min(a + 2, total);
  }
  // The counter is updated directly so flips never trigger a React render of the book.
  function place(i) {
    countEl.textContent = label(i);
    markOpen(i);
  }
  pf.on("flip", (e) => place(e.data));
  place(0);
  nextBtn.onclick = () => pf.flipNext();
  prevBtn.onclick = () => pf.flipPrev();

  return { pf, place };
}
