import { PAGE, STATS } from "../content/catalog.js";

/** @param {{ onGo: (page: number) => void }} props */
export default function Hero({ onGo }) {
  const openContact = (e) => {
    e.preventDefault();
    onGo(PAGE.contact);
  };

  return (
    <div className="hero" id="hero">
      <p className="kicker">
        <i></i>Grafik dizayner, Toshkent
      </p>
      <h1>
        Muhsina<span>Boymatova</span>
      </h1>
      <p className="lede">
        Grafik dizayn, SMM dizayn, poligrafiya va print dizayn hamda reklama va
        marketing dizayni bo‘yicha zamonaviy vizual til yarataman. Logotipdan to‘liq
        firma uslubi va qo‘shimcha xizmatlargacha: barcha ishlarim shu stoldagi
        katalogda.
      </p>
      <ul className="stats">
        {STATS.map(({ value, label }) => (
          <li key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="cta" onClick={() => onGo(PAGE.works)}>
          Katalogni ochish
        </button>
        <a className="ghost tg" href="#contact" onClick={openContact}>
          Telegram orqali yozish
        </a>
      </div>
    </div>
  );
}
