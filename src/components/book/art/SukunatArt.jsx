// Sukunat book covers illustration (inside ArtPage's 400×566 svg).
export default function SukunatArt() {
  return (
    <>
      <defs>
        <filter id="ds" x="-20%" y="-20%" width="160%" height="160%">
          <feDropShadow
            dx="10"
            dy="14"
            stdDeviation="10"
            floodColor="#121019"
            floodOpacity=".3"
          />
        </filter>
      </defs>
      <rect width="400" height="566" fill="#c9cbd1" />
      <rect y="430" width="400" height="136" fill="#b9bcc4" />
      <g filter="url(#ds)">
        <g transform="translate(40 168) rotate(-4)">
          <rect width="120" height="178" fill="#f3efe9" />
          <text
            x="12"
            y="34"
            fontFamily="Syne, Manrope, sans-serif"
            fontWeight="600"
            fontSize="20"
            letterSpacing="-1"
            fill="#121019"
          >
            Sukunat
          </text>
          <text
            x="12"
            y="166"
            fontFamily="Manrope, sans-serif"
            fontSize="7"
            fill="#6c707b"
          >
            I kitob
          </text>
          <circle cx="98" cy="150" r="10" fill="#6a3cf0" />
        </g>
        <g transform="translate(250 176) rotate(5)">
          <rect width="120" height="178" fill="#6a3cf0" />
          <text
            x="12"
            y="34"
            fontFamily="Syne, Manrope, sans-serif"
            fontWeight="600"
            fontSize="20"
            letterSpacing="-1"
            fill="#f3efe9"
          >
            Sukunat
          </text>
          <text
            x="12"
            y="166"
            fontFamily="Manrope, sans-serif"
            fontSize="7"
            fill="#e6defa"
          >
            III kitob
          </text>
          <circle cx="98" cy="150" r="10" fill="#121019" />
        </g>
        <g transform="translate(130 150)">
          <rect width="140" height="208" fill="#121019" />
          <text
            x="14"
            y="40"
            fontFamily="Syne, Manrope, sans-serif"
            fontWeight="600"
            fontSize="25"
            letterSpacing="-1"
            fill="#f3efe9"
          >
            Sukunat
          </text>
          <text
            x="14"
            y="190"
            fontFamily="Manrope, sans-serif"
            fontSize="8"
            fill="#9a98a3"
          >
            II kitob
          </text>
          <circle cx="114" cy="178" r="12" fill="#6a3cf0" />
        </g>
      </g>
      <text
        x="28"
        y="540"
        fontFamily="Manrope, sans-serif"
        fontSize="9"
        fill="#5f636d"
      >
        Uch jildlik turkum
      </text>
    </>
  );
}
