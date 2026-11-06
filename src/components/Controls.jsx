// Click handlers and the counter text are wired by src/experience/flipbook.js.
export default function Controls() {
  return (
    <div className="ctl" id="ctl">
      <button id="prev" aria-label="Oldingi sahifa">
        ‹
      </button>
      <span id="count">Muqova</span>
      <button id="next" aria-label="Keyingi sahifa">
        ›
      </button>
    </div>
  );
}
