// Jazz poster illustration (inside ArtPage's 400×566 svg).
export default function JazzArt() {
  return (
    <>
      <defs>
        <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="3.1" fill="#121019" />
        </pattern>
        <radialGradient id="fade" cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".12" />
        </radialGradient>
        <mask id="hm">
          <circle cx="250" cy="210" r="150" fill="url(#fade)" />
        </mask>
      </defs>
      <rect width="400" height="566" fill="#6a3cf0" />
      <rect width="400" height="566" fill="url(#dots)" mask="url(#hm)" />
      <circle cx="96" cy="118" r="34" fill="#f3efe9" />
      <text
        x="28"
        y="40"
        fontFamily="Manrope, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#121019"
      >
        12 dekabr, 19:00
      </text>
      <text
        x="28"
        y="56"
        fontFamily="Manrope, sans-serif"
        fontSize="11"
        fill="#121019"
      >
        Ilhom teatri
      </text>
      <text
        x="26"
        y="418"
        fontFamily="Syne, Manrope, sans-serif"
        fontWeight="600"
        fontSize="40"
        letterSpacing="-1.5"
        fill="#f3efe9"
      >
        Toshkent
      </text>
      <text
        x="16"
        y="540"
        fontFamily="Syne, Manrope, sans-serif"
        fontSize="150"
        fontWeight="700"
        letterSpacing="-9"
        fill="#121019"
      >
        Jazz
      </text>
      <line
        x1="28"
        y1="436"
        x2="372"
        y2="436"
        stroke="#121019"
        strokeWidth="1.2"
      />
    </>
  );
}
