import { grain, mk } from "./canvas.js";
import { reportError } from "../lib/reportError.js";

function paper(x, w, h, side, mobile) {
  x.fillStyle = "#f3efe9";
  x.fillRect(0, 0, w, h);
  grain(x, w, h, 9);
  if (!mobile) {
    const g =
      side === "r"
        ? x.createLinearGradient(0, 0, w * 0.14, 0)
        : x.createLinearGradient(w, 0, w * 0.86, 0);
    g.addColorStop(0, "rgba(18,16,25,.16)");
    g.addColorStop(1, "rgba(18,16,25,0)");
    x.fillStyle = g;
    x.fillRect(side === "r" ? 0 : w * 0.86, 0, w * 0.14, h);
  }
}

// Violet gradient used both as the HTML cover page background and the 3D endpaper.
function makeMarble() {
  const c = mk(400, 566),
    x = c.getContext("2d");
  const g = x.createLinearGradient(0, 0, 260, 566);
  g.addColorStop(0, "#24107a");
  g.addColorStop(0.55, "#6a3cf0");
  g.addColorStop(1, "#b9a2ff");
  x.fillStyle = g;
  x.fillRect(0, 0, 400, 566);
  grain(x, 400, 566, 6);
  return c;
}

function drawEndpaper(inC, marbleC, mobile) {
  const w = 1024,
    h = 1448,
    x = inC.getContext("2d");
  x.setTransform(-1, 0, 0, -1, w, h);
  x.fillStyle = "#6a3cf0";
  x.fillRect(0, 0, w, h);
  if (marbleC) x.drawImage(marbleC, 0, 0, w, h);
  if (!mobile) {
    const g = x.createLinearGradient(w, 0, w * 0.86, 0);
    g.addColorStop(0, "rgba(20,12,6,.3)");
    g.addColorStop(1, "rgba(20,12,6,0)");
    x.fillStyle = g;
    x.fillRect(w * 0.86, 0, w * 0.14, h);
  }
  x.setTransform(1, 0, 0, 1, 0, 0);
}

/**
 * Paints the textures that must match the HTML book once the 3D cover opens.
 * @param {{ inC: HTMLCanvasElement, inTex: object, pgC: HTMLCanvasElement, pgTex: object }} book
 * @param {{ mobile: boolean, marbleEl: HTMLElement | null }} options
 */
export function paintInnerPages({ inC, inTex, pgC, pgTex }, { mobile, marbleEl }) {
  try {
    paper(pgC.getContext("2d"), 1024, 1448, "r", mobile);
    pgTex.needsUpdate = true;
  } catch (e) {
    reportError(e);
  }

  let marbleC = null;
  try {
    marbleC = makeMarble();
  } catch (e) {
    reportError(e);
  }
  if (marbleC && marbleEl) {
    marbleEl.querySelector("svg").style.display = "none";
    marbleEl.style.background = `url(${marbleC.toDataURL()}) center/cover`;
  }

  try {
    drawEndpaper(inC, marbleC, mobile);
    inTex.needsUpdate = true;
  } catch (e) {
    reportError(e);
  }
}
