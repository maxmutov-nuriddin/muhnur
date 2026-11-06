import { SERVICES, TOC, TOOLS, PROJECTS, getToc, getExperienceYearsText } from "../../content/catalog.js";
import { TextPage } from "./Page.jsx";

// Shundan ko'p bandda mundarija ikki ustunga o'tadi.
const DENSE_TOC_MIN = 7;

export function IntroPage() {
  const currentYear = new Date().getFullYear();
  const experienceWord = getExperienceYearsText().toLowerCase();

  return (
    <TextPage section="Muqaddima" aside={String(currentYear)} folio={2}>
      <h2>Har bir brendning o‘z ovozi bor</h2>
      <p>
        Men grafik dizaynerman. {experienceWord} yildan beri grafik dizayn, SMM dizayn,
        poligrafiya va print dizayn hamda reklama va marketing dizayni bo‘yicha
        brendlar, ishlab chiqaruvchilar va tadbirkorlar bilan ishlayman. Vazifam
        oddiy: brend nimani aytmoqchi ekanini tushunish va buni shakl, rang hamda
        harf orqali ko‘rsatish.
      </p>
      <p>
        Bu katalogda so‘nggi yillardagi eng sevimli loyihalarim jamlangan.
        Varaqlang, yoqqan ishingiz haqida yozing.
      </p>
      <p className="sign">Muhsina</p>
    </TextPage>
  );
}

export function TimelinePage() {
  return (
    <TextPage section="Tajriba" folio={3}>
      <h2>Dasturlar</h2>
      <ul className="tools-list">
        {TOOLS.map(({ name, desc }) => (
          <li key={name}>
            <b>{name}</b>
            <span>{desc}</span>
          </li>
        ))}
      </ul>
    </TextPage>
  );
}

export function TocPage() {
  const tocList = typeof getToc === "function" ? getToc() : TOC;
  return (
    <TextPage section="Mundarija" folio={4}>
      <h2>Ichida</h2>
      <ol className={tocList.length > DENSE_TOC_MIN ? "toc toc--dense" : "toc"}>
        {tocList.map(({ title, kind, page, small }) => (
          <li key={`${title}-${page}`} className={small ? "sm" : undefined}>
            <div>
              <b>{title}</b>
              {kind && <small>{kind}</small>}
            </div>
            <span>{page}</span>
          </li>
        ))}
      </ol>
    </TextPage>
  );
}

export function ServicesPage({ folio }) {
  const currentFolio = folio ?? (5 + PROJECTS.length * 2);
  return (
    <TextPage section="Xizmatlar" folio={currentFolio}>
      <h2>Nima qila olaman</h2>
      <ul className="svc">
        {SERVICES.map(({ title, time, text }) => (
          <li key={title}>
            <b>{title}</b>
            <em>{time}</em>
            <small>{text}</small>
          </li>
        ))}
      </ul>
    </TextPage>
  );
}
