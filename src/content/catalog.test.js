import { describe, expect, it } from "vitest";
import {
  formatMilestoneCount,
  getExperienceValue,
  getExperienceYearsText,
  STATS,
  PROJECTS,
  BRANDS,
  TOOLS,
  TOC,
  getToc,
  PAGE,
} from "./catalog.js";

describe("catalog stats calculations", () => {
  describe("formatMilestoneCount", () => {
    it("shows exact number up to 5", () => {
      expect(formatMilestoneCount(1)).toBe("1");
      expect(formatMilestoneCount(2)).toBe("2");
      expect(formatMilestoneCount(3)).toBe("3");
      expect(formatMilestoneCount(4)).toBe("4");
      expect(formatMilestoneCount(5)).toBe("5");
    });

    it("shows 5+ for values between 6 and 9", () => {
      expect(formatMilestoneCount(6)).toBe("5+");
      expect(formatMilestoneCount(7)).toBe("5+");
      expect(formatMilestoneCount(9)).toBe("5+");
    });

    it("shows 10+, 15+, etc for higher increments of 5", () => {
      expect(formatMilestoneCount(10)).toBe("10+");
      expect(formatMilestoneCount(14)).toBe("10+");
      expect(formatMilestoneCount(15)).toBe("15+");
      expect(formatMilestoneCount(23)).toBe("20+");
    });
  });

  describe("getExperienceValue", () => {
    it("returns '2+' for current date (late 2026)", () => {
      const now = new Date("2026-11-04T12:00:00Z");
      expect(getExperienceValue(now)).toBe("2+");
    });

    it("returns '3' in early 2027", () => {
      const early2027 = new Date("2027-02-15T12:00:00Z");
      expect(getExperienceValue(early2027)).toBe("3");
    });

    it("returns '3+' in late 2027", () => {
      const late2027 = new Date("2027-08-15T12:00:00Z");
      expect(getExperienceValue(late2027)).toBe("3+");
    });

    it("increments correctly in future years", () => {
      expect(getExperienceValue(new Date("2028-03-01T12:00:00Z"))).toBe("4");
      expect(getExperienceValue(new Date("2028-10-01T12:00:00Z"))).toBe("4+");
    });
  });

  describe("STATS", () => {
    it("matches current project and brand counts dynamically", () => {
      const expStat = STATS.find((s) => s.label === "yil tajriba");
      const projStat = STATS.find((s) => s.label === "loyiha");
      const brandStat = STATS.find((s) => s.label === "brend");

      expect(projStat?.value).toBe(formatMilestoneCount(PROJECTS.length));
      expect(brandStat?.value).toBe(formatMilestoneCount(BRANDS.length));
      expect(expStat?.value).toBe(getExperienceValue());
    });
  });

  describe("getExperienceYearsText", () => {
    it("returns 'Ikki' in 2026", () => {
      expect(getExperienceYearsText(new Date("2026-11-04"))).toBe("Ikki");
    });

    it("returns 'Uch' in 2027", () => {
      expect(getExperienceYearsText(new Date("2027-01-01"))).toBe("Uch");
    });

    it("returns 'To‘rt' in 2028", () => {
      expect(getExperienceYearsText(new Date("2028-05-01"))).toBe("To‘rt");
    });
  });

  describe("TOOLS", () => {
    it("contains Figma, Photoshop, Illustrator, Canva", () => {
      const names = TOOLS.map((t) => t.name);
      expect(names).toContain("Figma");
      expect(names).toContain("Photoshop");
      expect(names).toContain("Illustrator");
      expect(names).toContain("Canva");
    });
  });

  describe("TOC and PAGE dynamic calculations", () => {
    it("generates correct table of contents from projects", () => {
      const toc = getToc();
      expect(toc.length).toBe(PROJECTS.length + 1);

      // Har bir loyiha 5, 7, 9, 11 sahifalarida
      expect(toc[0].page).toBe(5);
      expect(toc[1].page).toBe(7);
      expect(toc[2].page).toBe(9);
      expect(toc[3].page).toBe(11);

      // Oxirgi sahifa (Xizmatlar va bog'lanish)
      const last = toc[toc.length - 1];
      expect(last.title).toBe("Xizmatlar va bog‘lanish");
      expect(last.page).toBe(5 + PROJECTS.length * 2);
    });

    it("supports TOC proxy array methods like .map and length", () => {
      expect(TOC.length).toBe(PROJECTS.length + 1);
      const pages = TOC.map((item) => item.page);
      expect(pages).toEqual(Array.from({ length: PROJECTS.length + 1 }, (_, i) => 5 + i * 2));
    });

    it("calculates PAGE.services and PAGE.contact dynamically", () => {
      expect(PAGE.works).toBe(4);
      expect(PAGE.services).toBe(4 + PROJECTS.length * 2);
      expect(PAGE.contact).toBe(5 + PROJECTS.length * 2);
    });
  });
});

