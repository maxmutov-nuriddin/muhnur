import { useCallback, useEffect, useRef } from "react";
import { initExperience } from "./experience/index.js";
import { reportError } from "./lib/reportError.js";
import LogoDefs from "./components/LogoDefs.jsx";
import Topbar from "./components/Topbar.jsx";
import Hero from "./components/Hero.jsx";
import MiniFoot from "./components/MiniFoot.jsx";
import Controls from "./components/Controls.jsx";
import Book from "./components/book/Book.jsx";
import Lightbox from "./components/Lightbox.jsx";

/**
 * The page renders once. After mount, scroll/flip effects are driven
 * imperatively by src/experience (Three.js + page-flip). App keeps no state,
 * so React never re-renders the DOM that page-flip has rearranged.
 */
export default function App() {
  const introRef = useRef(null);
  const experienceRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    initExperience(introRef.current, controller.signal)
      .then((experience) => {
        if (controller.signal.aborted) experience?.destroy();
        else experienceRef.current = experience;
      })
      .catch(reportError);
    return () => {
      controller.abort();
      experienceRef.current?.destroy();
      experienceRef.current = null;
    };
  }, []);

  const goTo = useCallback((page) => experienceRef.current?.goTo(page), []);

  return (
    <>
      <LogoDefs />
      <section id="intro" ref={introRef}>
        <div className="stage" id="stage">
          <canvas id="gl" aria-hidden="true"></canvas>
          <div className="vignette"></div>
          <div className="scrim" id="scrim"></div>
          <Topbar onGo={goTo} />
          <Hero onGo={goTo} />
          <div className="scrollcue" id="cue">
            Pastga aylantiring<i></i>
          </div>
          <MiniFoot />
          <div className="cam" id="cam">
            <div className="shift" id="shift">
              <div className="holder" id="holder">
                <Book />
              </div>
            </div>
          </div>
          <Controls />
        </div>
      </section>
      <Lightbox />
    </>
  );
}
