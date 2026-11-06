import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import handler, { config } from "./contact.mjs";

const ENV = { TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "123" };

const post = (body) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const validBody = { name: "Aziza", contact: "@aziza", msg: "Salom" };

describe("contact function", () => {
  let env;
  let fetchMock;

  beforeEach(() => {
    env = { ...ENV };
    vi.stubGlobal("Netlify", { env: { get: (key) => env[key] } });
    fetchMock = vi.fn(async () => Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("is routed to /api/contact, POST only, rate limited", () => {
    expect(config.path).toBe("/api/contact");
    expect(config.method).toBe("POST");
    expect(config.rateLimit.windowLimit).toBeGreaterThan(0);
  });

  test("sends a valid message to Telegram as plain text", async () => {
    const res = await handler(post(validBody));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, data: null, error: null });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.telegram.org/bottest-token/sendMessage");
    const payload = JSON.parse(init.body);
    expect(payload.chat_id).toBe("123");
    expect(payload.text).toContain("Aziza");
    expect(payload.parse_mode).toBeUndefined();
  });

  test("returns 400 for invalid JSON", async () => {
    const res = await handler(post("{not json"));

    expect(res.status).toBe(400);
    expect((await res.json()).success).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("returns 400 with the validation error for missing fields", async () => {
    const res = await handler(post({ name: "", contact: "" }));

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe(
      "Ism va telefon yoki Telegramni kiriting.",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("silently accepts honeypot spam without calling Telegram", async () => {
    const res = await handler(post({ ...validBody, website: "spam" }));

    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("returns 500 when env vars are missing", async () => {
    env = {};

    const res = await handler(post(validBody));

    expect(res.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  test("returns 502 when Telegram rejects the message", async () => {
    fetchMock.mockResolvedValueOnce(
      Response.json({ ok: false, description: "chat not found" }, { status: 400 }),
    );

    const res = await handler(post(validBody));

    expect(res.status).toBe(502);
    expect((await res.json()).success).toBe(false);
  });

  test("returns 502 when the Telegram request throws", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    const res = await handler(post(validBody));

    expect(res.status).toBe(502);
  });
});
