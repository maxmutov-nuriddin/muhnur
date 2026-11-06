import { describe, expect, it } from "vitest";
import { scrollAction } from "./scrollFlip.js";

const desktop = { first: 0, count: 38, mobile: false };
const mobile = { first: 1, count: 38, mobile: true };

describe("scrollAction", () => {
  it("flips forward on scroll down inside the book", () => {
    expect(scrollAction({ ...desktop, index: 4, dir: 1 })).toBe("next");
  });

  it("flips back on scroll up inside the book", () => {
    expect(scrollAction({ ...desktop, index: 4, dir: -1 })).toBe("prev");
  });

  it("releases scroll up on the first spread so the book can close", () => {
    expect(scrollAction({ ...desktop, index: 0, dir: -1 })).toBe("release");
    expect(scrollAction({ ...mobile, index: 1, dir: -1 })).toBe("release");
  });

  it("releases scroll down on the last spread so the page continues", () => {
    expect(scrollAction({ ...desktop, index: 36, dir: 1 })).toBe("release");
    expect(scrollAction({ ...mobile, index: 37, dir: 1 })).toBe("release");
  });

  it("still flips forward from the mobile second-to-last page", () => {
    expect(scrollAction({ ...mobile, index: 36, dir: 1 })).toBe("next");
  });
});
