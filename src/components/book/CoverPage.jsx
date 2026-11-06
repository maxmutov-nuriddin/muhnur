// The SVG marble is a no-JS fallback; src/experience/innerPages.js swaps in a canvas gradient.
export default function CoverPage() {
  return (
    <div className="page">
      <div className="marble art">
        <svg viewBox="0 0 400 566" preserveAspectRatio="xMidYMid slice">
          <filter id="mrb" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".006 .018" numOctaves="5" seed="11" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="2.6" intercept="-.8" />
              <feFuncG type="linear" slope="2.6" intercept="-.8" />
              <feFuncB type="linear" slope="2.6" intercept="-.8" />
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncR type="table" tableValues=".05 .07 .09 .11 .13 .8 .13 .1 .08 .06 .05" />
              <feFuncG type="table" tableValues=".13 .17 .2 .23 .26 .64 .26 .21 .18 .15 .13" />
              <feFuncB type="table" tableValues=".11 .14 .16 .19 .21 .36 .21 .17 .15 .13 .11" />
            </feComponentTransfer>
          </filter>
          <rect width="400" height="566" filter="url(#mrb)" />
        </svg>
        <svg className="exl-logo" viewBox="68 118 310 192" aria-hidden="true">
          <use href="#mlogo" />
        </svg>
        <div className="exl">
          <small>Ishlar katalogi</small>
          <b>
            Muhsina
            <br />
            Boymatova
          </b>
        </div>
      </div>
    </div>
  );
}
