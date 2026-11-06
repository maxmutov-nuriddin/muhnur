import { TextPage } from "./Page.jsx";

const LIGHT_SWATCH_BORDER = "inset 0 0 0 1px #e1ddd5";

/**
 * @param {{ project: (typeof import("../../content/catalog.js").PROJECTS)[number], index: number, total: number, folio?: number }} props
 */
export default function ProjectPage({ project, index, total, folio }) {
  const {
    kind = "Brending",
    title = "Loyiha",
    client,
    year,
    task,
    text,
    deliverables = [],
    palette = [],
  } = project;

  const currentFolio = folio || project.folio || 6 + (index - 1) * 2;

  return (
    <TextPage section={`Loyiha ${index} / ${total}`} aside={kind} folio={currentFolio}>
      <h2>{title}</h2>
      <dl className="meta">
        {client && (
          <>
            <dt>Mijoz</dt>
            <dd>{client}</dd>
          </>
        )}
        {year && (
          <>
            <dt>Yil</dt>
            <dd>{year}</dd>
          </>
        )}
        {task && (
          <>
            <dt>Vazifa</dt>
            <dd>{task}</dd>
          </>
        )}
      </dl>
      {text && <p>{text}</p>}
      {deliverables.length > 0 && (
        <ul className="dl">
          {deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {palette.length > 0 && (
        <div className="pal">
          {palette.map(({ hex, light }) => (
            <div key={hex}>
              <i style={{ background: hex, boxShadow: light ? LIGHT_SWATCH_BORDER : undefined }}></i>
              <small>{hex}</small>
            </div>
          ))}
        </div>
      )}
    </TextPage>
  );
}
