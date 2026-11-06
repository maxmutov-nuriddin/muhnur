// Shared by the contact form (browser) and netlify/functions/contact (server).

export const CONTACT_LIMITS = Object.freeze({ name: 100, contact: 100, msg: 2000 });

export const REQUIRED_FIELDS_ERROR = "Ism va telefon yoki Telegramni kiriting.";
const TOO_LONG_ERROR = "Matn juda uzun. Iltimos, qisqartiring.";

const HONEYPOT_FIELD = "website";

const asTrimmedString = (value) => (typeof value === "string" ? value.trim() : "");

/**
 * @param {unknown} input
 * @returns {{ ok: true, data: { name: string, contact: string, msg: string } } | { ok: false, error: string }}
 */
export function validateContact(input) {
  const source = input && typeof input === "object" ? input : {};
  const data = {
    name: asTrimmedString(source.name),
    contact: asTrimmedString(source.contact),
    msg: asTrimmedString(source.msg),
  };

  if (!data.name || !data.contact) {
    return { ok: false, error: REQUIRED_FIELDS_ERROR };
  }
  const tooLong = Object.keys(CONTACT_LIMITS).some(
    (key) => data[key].length > CONTACT_LIMITS[key],
  );
  if (tooLong) {
    return { ok: false, error: TOO_LONG_ERROR };
  }
  return { ok: true, data };
}

/**
 * Bots fill every input, people never see this one.
 * @param {unknown} input
 * @returns {boolean}
 */
export function isHoneypotFilled(input) {
  return Boolean(input && typeof input === "object" && asTrimmedString(input[HONEYPOT_FIELD]));
}

/**
 * Plain text on purpose: sent without parse_mode, so user input cannot inject markup.
 * @param {{ name: string, contact: string, msg: string }} data
 * @returns {string}
 */
export function formatTelegramMessage({ name, contact, msg }) {
  return [
    "Saytdan yangi xabar",
    "",
    `Ism: ${name}`,
    `Aloqa: ${contact}`,
    `Xabar: ${msg || "—"}`,
  ].join("\n");
}
