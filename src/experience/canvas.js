export const DISP = "Syne, Manrope, sans-serif";
export const SANS = 'Manrope, "Segoe UI", sans-serif';

export const mk = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
};

// Writes into the canvas pixel buffer in place: that is the point of the helper.
export function grain(ctx, w, h, amt) {
  const d = ctx.getImageData(0, 0, w, h),
    a = d.data;
  for (let i = 0; i < a.length; i += 4) {
    const n = (Math.random() - 0.5) * amt;
    a[i] += n;
    a[i + 1] += n;
    a[i + 2] += n;
  }
  ctx.putImageData(d, 0, 0);
}
