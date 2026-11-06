const DEFAULT_ENDPOINT = import.meta.env?.VITE_CONTACT_ENDPOINT || "/api/contact";
const SEND_FAILED_ERROR =
  "Xabar yuborilmadi. Iltimos, keyinroq qayta urinib ko‘ring.";

/**
 * @param {{ name: string, contact: string, msg: string }} data
 * @param {{ endpoint?: string, fetchImpl?: typeof fetch }} [options]
 * @returns {Promise<{ success: boolean, error: string | null }>}
 */
export async function sendContact(
  data,
  { endpoint = DEFAULT_ENDPOINT, fetchImpl = fetch } = {},
) {
  try {
    const res = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => null);
    if (res.ok && body?.success) return { success: true, error: null };
    return { success: false, error: body?.error || SEND_FAILED_ERROR };
  } catch (error) {
    console.error("contact form: request failed", error);
    return { success: false, error: SEND_FAILED_ERROR };
  }
}
