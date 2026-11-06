import { describe, expect, test } from "vitest";
import {
  CONTACT_LIMITS,
  formatTelegramMessage,
  isHoneypotFilled,
  validateContact,
} from "./contact.js";

describe("validateContact", () => {
  test("returns trimmed data for valid input", () => {
    const result = validateContact({
      name: "  Aziza  ",
      contact: " @aziza ",
      msg: " Logotip kerak ",
    });

    expect(result).toEqual({
      ok: true,
      data: { name: "Aziza", contact: "@aziza", msg: "Logotip kerak" },
    });
  });

  test("allows an empty message", () => {
    const result = validateContact({ name: "Aziza", contact: "+998901234567" });

    expect(result.ok).toBe(true);
    expect(result.data.msg).toBe("");
  });

  test("rejects missing name or contact with the form error text", () => {
    expect(validateContact({ name: " ", contact: "x" })).toEqual({
      ok: false,
      error: "Ism va telefon yoki Telegramni kiriting.",
    });
    expect(validateContact({ name: "Aziza", contact: "" }).ok).toBe(false);
  });

  test("rejects non-object and non-string input", () => {
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact("text").ok).toBe(false);
    expect(validateContact({ name: 42, contact: ["x"] }).ok).toBe(false);
  });

  test("rejects fields longer than the limits", () => {
    const longName = "a".repeat(CONTACT_LIMITS.name + 1);
    const longMsg = "a".repeat(CONTACT_LIMITS.msg + 1);

    expect(validateContact({ name: longName, contact: "x" }).ok).toBe(false);
    expect(
      validateContact({ name: "Aziza", contact: "x", msg: longMsg }).ok,
    ).toBe(false);
  });
});

describe("isHoneypotFilled", () => {
  test("detects a filled honeypot field", () => {
    expect(isHoneypotFilled({ website: "http://spam" })).toBe(true);
  });

  test("ignores empty or missing honeypot", () => {
    expect(isHoneypotFilled({ website: "" })).toBe(false);
    expect(isHoneypotFilled({})).toBe(false);
    expect(isHoneypotFilled(null)).toBe(false);
  });
});

describe("formatTelegramMessage", () => {
  test("lists every field and marks an empty message", () => {
    const text = formatTelegramMessage({
      name: "Aziza",
      contact: "@aziza",
      msg: "",
    });

    expect(text).toContain("Aziza");
    expect(text).toContain("@aziza");
    expect(text).toContain("—");
  });
});
