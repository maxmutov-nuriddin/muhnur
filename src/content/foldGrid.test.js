import { describe, expect, it } from "vitest";
import { computeFoldGrid, foldStep, medianAspect } from "./foldGrid.js";

const PAGE_AREA_ASPECT = 0.86 / 1.214;

describe("computeFoldGrid", () => {
  it("returns a single panel for one image", () => {
    expect(computeFoldGrid(1, 1.5, PAGE_AREA_ASPECT)).toEqual({ cols: 1, rows: 1 });
  });

  it("stacks wide slides in one column when there are few", () => {
    const { cols, rows } = computeFoldGrid(2, 16 / 9, PAGE_AREA_ASPECT);
    expect(cols).toBe(1);
    expect(rows).toBe(2);
  });

  it("puts tall stories side by side", () => {
    const { cols } = computeFoldGrid(4, 9 / 16, PAGE_AREA_ASPECT);
    expect(cols).toBeGreaterThanOrEqual(2);
  });

  it("always has room for every image without empty rows", () => {
    for (const n of [3, 11, 17, 26]) {
      const { cols, rows } = computeFoldGrid(n, 16 / 9, PAGE_AREA_ASPECT);
      expect(cols * rows).toBeGreaterThanOrEqual(n);
      expect(cols * (rows - 1)).toBeLessThan(n);
    }
  });

  it("throws on an empty list", () => {
    expect(() => computeFoldGrid(0, 1, 1)).toThrow();
  });
});

describe("foldStep", () => {
  it("keeps the first panel fixed and unfolds the first row left to right", () => {
    expect(foldStep(0, 3)).toEqual({ axis: null, step: 0 });
    expect(foldStep(1, 3)).toEqual({ axis: "x", step: 1 });
    expect(foldStep(2, 3)).toEqual({ axis: "x", step: 2 });
  });

  it("unfolds lower rows downward after the first row", () => {
    expect(foldStep(3, 3)).toEqual({ axis: "y", step: 3 });
    expect(foldStep(7, 3)).toEqual({ axis: "y", step: 4 });
  });
});

describe("medianAspect", () => {
  it("returns the median width/height ratio", () => {
    const images = [
      { w: 100, h: 100 },
      { w: 160, h: 90 },
      { w: 300, h: 100 },
    ];
    expect(medianAspect(images)).toBeCloseTo(16 / 9);
  });

  it("falls back to 1 for no images", () => {
    expect(medianAspect([])).toBe(1);
  });
});
