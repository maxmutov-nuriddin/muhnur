import { DISP, SANS, grain, mk } from "./canvas.js";

// mode: "c" colour map, "m" metalness map, "r" roughness map.
function drawCover(drawLogo, x, w, h, mode, back) {
  const s = w * 0.00235;
  if (mode === "m") {
    x.fillStyle = "#000";
    x.fillRect(0, 0, w, h);
    return;
  }
  if (mode === "r") {
    x.fillStyle = back ? "#cfcfcf" : "#c4c4c4";
    x.fillRect(0, 0, w, h);
    if (!back) {
      x.fillStyle = "#000";
      drawLogo(x, w * 0.5, h * 0.37, s, "mask");
      const d = x.getImageData(0, 0, w, h),
        a = d.data;
      for (let i = 0; i < a.length; i += 4) {
        if (
          Math.abs(a[i] - 196) +
            Math.abs(a[i + 1] - 196) +
            Math.abs(a[i + 2] - 196) >
          30
        ) {
          a[i] = a[i + 1] = a[i + 2] = 60;
        }
      }
      x.putImageData(d, 0, 0);
    }
    return;
  }
  x.textBaseline = "alphabetic";
  x.textAlign = "left";
  if (back) {
    x.fillStyle = "#f1ede6";
    x.fillRect(0, 0, w, h);
    grain(x, w, h, 8);
    drawLogo(x, w * 0.5, h * 0.46, w * 0.0009, "light");
    x.fillStyle = "#121019";
    x.font = `600 ${w * 0.03}px ${DISP}`;
    x.textAlign = "center";
    x.fillText("Muhsina Boymatova", w * 0.5, h * 0.92);
    x.textAlign = "left";
    return;
  }
  x.fillStyle = "#0b0a0f";
  x.fillRect(0, 0, w, h);
  const gl = x.createRadialGradient(w * 0.15, h * 1.02, 0, w * 0.15, h * 1.02, w * 0.9);
  gl.addColorStop(0, "rgba(106,60,240,.35)");
  gl.addColorStop(1, "rgba(106,60,240,0)");
  x.fillStyle = gl;
  x.fillRect(0, 0, w, h);
  grain(x, w, h, 7);
  drawLogo(x, w * 0.5, h * 0.37, s, "grad");
  x.fillStyle = "#8d8a96";
  x.font = `500 ${w * 0.028}px ${SANS}`;
  x.fillText("Portfolio", w * 0.09, h * 0.07);
  x.textAlign = "right";
  x.fillText("2026", w * 0.91, h * 0.07);
  x.textAlign = "left";
  x.fillStyle = "#f1ede6";
  x.font = `600 ${w * 0.09}px ${DISP}`;
  try {
    x.letterSpacing = -w * 0.004 + "px";
  } catch (e) {}
  x.fillText("Muhsina", w * 0.09, h * 0.79);
  x.fillText("Boymatova", w * 0.09, h * 0.85);
  try {
    x.letterSpacing = "0px";
  } catch (e) {}
  x.fillStyle = "#8d8a96";
  x.font = `500 ${w * 0.028}px ${SANS}`;
  x.fillText("Grafik dizayn katalogi", w * 0.09, h * 0.92);
}

function coverSet(drawLogo, back) {
  const w = 1024,
    h = 1448,
    c = mk(w, h),
    m = mk(w, h),
    r = mk(w, h);
  drawCover(drawLogo, c.getContext("2d"), w, h, "c", back);
  drawCover(drawLogo, m.getContext("2d"), w, h, "m", back);
  drawCover(drawLogo, r.getContext("2d"), w, h, "r", back);
  return { c, m, r };
}

export function createCoverSets(drawLogo) {
  return { front: coverSet(drawLogo, false), back: coverSet(drawLogo, true) };
}
