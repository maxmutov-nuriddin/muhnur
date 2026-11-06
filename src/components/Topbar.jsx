import logoUrl from "../assets/logo.webp";
import { PAGE } from "../content/catalog.js";

const NAV = [
  { label: "Ishlar", page: PAGE.works },
  { label: "Xizmatlar", page: PAGE.services },
  { label: "Bog‘lanish", page: PAGE.contact },
];

/** @param {{ onGo: (page: number) => void }} props */
export default function Topbar({ onGo }) {
  return (
    <header className="topbar" id="topbar">
      <div className="brand">
        <img className="logo" src={logoUrl} alt="" width="600" height="372" />
        Muhsina Boymatova
      </div>
      <nav className="nav" aria-label="Bo‘limlar">
        {NAV.map(({ label, page }) => (
          <button key={label} onClick={() => onGo(page)}>
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
