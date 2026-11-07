import {
  formatTelegramMessage,
  isHoneypotFilled,
  validateContact,
} from "../../../shared/contact.js";

const TELEGRAM_TIMEOUT_MS = 8000;
const SEND_FAILED_ERROR =
  "Xabar yuborilmadi. Iltimos, keyinroq qayta urinib ko‘ring.";

const reply = (status, error = null) =>
  Response.json({ success: !error, data: null, error }, { status });

async function sendToTelegram(token, chatId, text) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Telegram API ${res.status}: ${detail.slice(0, 200)}`);
  }
}

/** @param {string | undefined} raw comma-separated chat ids */
const parseChatIds = (raw = "") =>
  raw.split(",").map((id) => id.trim()).filter(Boolean);

/**
 * Sends to every chat in parallel. Succeeds if at least one delivery lands,
 * so one blocked recipient does not lose the lead for the others.
 */
async function broadcast(token, chatIds, text) {
  const results = await Promise.allSettled(
    chatIds.map((chatId) => sendToTelegram(token, chatId, text)),
  );
  const failures = results.flatMap((r, i) =>
    r.status === "rejected" ? [{ chatId: chatIds[i], reason: r.reason }] : [],
  );
  failures.forEach(({ chatId, reason }) =>
    console.error(`contact: Telegram delivery to ${chatId} failed`, reason),
  );
  if (failures.length === chatIds.length) {
    throw new Error("Telegram delivery failed for every recipient");
  }
}

export default async (req) => {
  let body;
  try {
    body = await req.json();
  } catch {
    return reply(400, "Noto‘g‘ri so‘rov.");
  }

  if (isHoneypotFilled(body)) return reply(200);

  const result = validateContact(body);
  if (!result.ok) return reply(400, result.error);

  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const chatIds = parseChatIds(Netlify.env.get("TELEGRAM_CHAT_ID"));
  if (!token || chatIds.length === 0) {
    console.error("contact: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return reply(500, SEND_FAILED_ERROR);
  }

  try {
    await broadcast(token, chatIds, formatTelegramMessage(result.data));
    return reply(200);
  } catch (error) {
    console.error("contact: Telegram delivery failed", error);
    return reply(502, SEND_FAILED_ERROR);
  }
};

export const config = {
  path: "/api/contact",
  method: "POST",
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
