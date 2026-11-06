import { reportError } from "../lib/reportError.js";

function drawLogoVec(x, cx, cy, s, mode) {
  x.save();
  x.translate(cx, cy);
  x.scale(s, s);
  x.translate(-222.5, -215);
  x.lineWidth = 77;
  const lg = (x0, y0, x1, y1, st) => {
    const g = x.createLinearGradient(x0, y0, x1, y1);
    st.forEach(([o, c]) => g.addColorStop(o, c));
    return g;
  };
  let c1, c2, c3;
  if (mode === "mask") {
    c1 = c2 = c3 = "#ffffff";
  } else if (mode === "light") {
    c1 = "#121019";
    c2 = lg(230, 120, 250, 305, [
      [0, "#121019"],
      [0.45, "#4a1fd1"],
      [1, "#9b6dff"],
    ]);
    c3 = lg(300, 200, 372, 305, [
      [0, "#3d1ad0"],
      [1, "#8f62ff"],
    ]);
  } else {
    c1 = lg(73, 305, 200, 125, [
      [0, "#24107a"],
      [1, "#6b3cf0"],
    ]);
    c2 = lg(180, 290, 372, 125, [
      [0, "#5a2be0"],
      [0.55, "#8f6bff"],
      [1, "#d8ccff"],
    ]);
    c3 = lg(293, 200, 372, 305, [
      [0, "#a07cff"],
      [1, "#6a36ef"],
    ]);
  }
  const a1 = () => {
    x.lineCap = "round";
    x.beginPath();
    x.moveTo(111.5, 266.5);
    x.lineTo(111.5, 221);
    x.arc(164.5, 221, 53, Math.PI, 0);
    x.lineTo(217.5, 266.5);
    x.stroke();
  };
  const p3 = () => {
    x.lineCap = "round";
    x.beginPath();
    x.moveTo(333.5, 226);
    x.lineTo(333.5, 266.5);
    x.stroke();
  };
  const a2 = () => {
    x.lineCap = "round";
    x.beginPath();
    x.moveTo(217.5, 266.5);
    x.lineTo(217.5, 221);
    x.stroke();
    x.lineCap = "butt";
    x.beginPath();
    x.arc(275.5, 221, 58, Math.PI, 0);
    x.stroke();
  };
  x.strokeStyle = c1;
  a1();
  x.strokeStyle = c3;
  p3();
  if (mode !== "mask") {
    x.save();
    x.shadowColor = "rgba(0,0,0,.55)";
    x.shadowBlur = 26 * s;
    x.shadowOffsetX = -8 * s;
    x.shadowOffsetY = 10 * s;
    x.strokeStyle = c2;
    a2();
    x.restore();
  }
  x.strokeStyle = c2;
  a2();
  x.restore();
}

/**
 * Loads the raster logo; falls back to the vector drawing if it fails to decode.
 * @param {string} src
 * @returns {Promise<(x: CanvasRenderingContext2D, cx: number, cy: number, s: number, mode: string) => void>}
 */
export async function loadLogo(src) {
  const logoImg = new Image();
  logoImg.src = src;
  try {
    await logoImg.decode();
  } catch (e) {
    reportError(e);
  }
  return function drawLogo(x, cx, cy, s, mode) {
    if (!logoImg.naturalWidth) return drawLogoVec(x, cx, cy, s, mode);
    const dw = 300 * s,
      dh = (dw * logoImg.naturalHeight) / logoImg.naturalWidth;
    x.drawImage(logoImg, cx - dw / 2, cy - dh / 2, dw, dh);
  };
}
