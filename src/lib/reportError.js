const OVERLAY_ID = "errbox";
const MAX_MESSAGE_LENGTH = 300;

// Dev only: stack errors in a corner box so WebGL/canvas failures are visible on devices.
function showOverlay(message) {
  let box = document.getElementById(OVERLAY_ID);
  if (!box) {
    box = document.createElement("div");
    box.id = OVERLAY_ID;
    box.style.cssText =
      "position:fixed;left:12px;bottom:12px;z-index:99;max-width:70vw;font:12px/1.4 monospace;color:#ffb4a8;background:rgba(40,8,4,.85);padding:8px 10px;border-radius:6px;white-space:pre-wrap";
    document.documentElement.appendChild(box);
  }
  box.textContent += (box.textContent ? "\n" : "") + message.slice(0, MAX_MESSAGE_LENGTH);
}

/** @param {unknown} error */
export function reportError(error) {
  console.error(error);
  if (!import.meta.env.DEV) return;
  try {
    const message = String((error && (error.message || error)) ?? "");
    showOverlay(message);
  } catch {
    // The overlay is best-effort; the console already has the error.
  }
}

export function installGlobalErrorReporting() {
  addEventListener("error", (e) => reportError(e.error || e.message));
  addEventListener("unhandledrejection", (e) => reportError(e.reason));
}
