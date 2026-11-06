// Kitob sahifalari React'dan qayta chizilmasligi kerak (page-flip ularni ko'chiradi),
// shuning uchun ko'rish oynasi oddiy DOM hodisasi orqali ochiladi.
export const LIGHTBOX_EVENT = "work:open";

/**
 * @typedef {{ src: string, thumb: string, w: number, h: number }} WorkImage
 * @param {{ title: string, images: ReadonlyArray<WorkImage>, index: number }} detail
 */
export function openLightbox(detail) {
  window.dispatchEvent(new CustomEvent(LIGHTBOX_EVENT, { detail }));
}
