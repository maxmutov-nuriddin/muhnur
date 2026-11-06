import { describe, expect, test, vi } from "vitest";
import { sendContact } from "./contactApi.js";

const data = { name: "Aziza", contact: "@aziza", msg: "" };

describe("sendContact", () => {
  test("posts JSON to the endpoint and returns success", async () => {
    const fetchImpl = vi.fn(async () =>
      Response.json({ success: true, data: null, error: null }),
    );

    const result = await sendContact(data, { endpoint: "/x", fetchImpl });

    expect(result).toEqual({ success: true, error: null });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("/x");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual(data);
  });

  test("returns the server error message on failure", async () => {
    const fetchImpl = vi.fn(async () =>
      Response.json(
        { success: false, data: null, error: "Server xatosi" },
        { status: 400 },
      ),
    );

    const result = await sendContact(data, { endpoint: "/x", fetchImpl });

    expect(result).toEqual({ success: false, error: "Server xatosi" });
  });

  test("returns a generic error when the response is not JSON", async () => {
    const fetchImpl = vi.fn(async () => new Response("oops", { status: 502 }));

    const result = await sendContact(data, { endpoint: "/x", fetchImpl });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/yuborilmadi/);
  });

  test("returns a generic error when the network fails", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError("Failed to fetch");
    });

    const result = await sendContact(data, { endpoint: "/x", fetchImpl });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/yuborilmadi/);
  });
});
