/**
 * Text page with running head and folio.
 * @param {{ section: string, aside?: string, folio: number, children: import("react").ReactNode }} props
 */
export function TextPage({ section, aside = "", folio, children }) {
  return (
    <div className="page">
      <div className="pin">
        <p className="runhead">
          <span>{section}</span>
          <span>{aside}</span>
        </p>
        {children}
        <span className="folio">{folio}</span>
      </div>
    </div>
  );
}

/**
 * Full-bleed illustration page; children are the SVG contents (400×566 viewBox).
 * @param {{ children: import("react").ReactNode }} props
 */
export function ArtPage({ children }) {
  return (
    <div className="page">
      <div className="art">
        <svg viewBox="0 0 400 566" preserveAspectRatio="xMidYMid slice">
          {children}
        </svg>
      </div>
    </div>
  );
}
