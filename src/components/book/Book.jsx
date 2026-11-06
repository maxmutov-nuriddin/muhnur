import { memo } from "react";
import { PROJECTS } from "../../content/catalog.js";
import CoverPage from "./CoverPage.jsx";
import { IntroPage, ServicesPage, TimelinePage, TocPage } from "./InfoPages.jsx";
import ProjectPage from "./ProjectPage.jsx";
import ContactPage from "./ContactPage.jsx";
import FoldSheet from "./FoldSheet.jsx";

/**
 * page-flip moves these .page nodes into its own wrapper after mount,
 * so the page list must never change: memo + no props keeps React off it.
 */
function Book() {
  const totalProjects = PROJECTS.length;
  const servicesFolio = 5 + totalProjects * 2;
  const contactFolio = servicesFolio + 1;

  return (
    <div id="book">
      <CoverPage />
      <IntroPage />
      <TimelinePage />
      <TocPage />
      {PROJECTS.flatMap((project, i) => {
        const projectKey = project.id || `project-${i}`;
        const projectFolio = 6 + i * 2;

        return [
          <div className="page page--fold" key={`${projectKey}-art`}>
            <FoldSheet project={project} />
          </div>,
          <ProjectPage
            key={projectKey}
            project={project}
            index={i + 1}
            total={totalProjects}
            folio={projectFolio}
          />,
        ];
      })}
      <ServicesPage folio={servicesFolio} />
      <ContactPage folio={contactFolio} />
    </div>
  );
}

export default memo(Book);
