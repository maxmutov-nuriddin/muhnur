// Lavanda packaging illustration (inside ArtPage's 400×566 svg).
export default function LavandaArt() {
  return (
    <>
      <defs>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stopColor="#3f2c80" />
          <stop offset=".4" stopColor="#8b72e0" />
          <stop offset=".62" stopColor="#9f8aea" />
          <stop offset="1" stopColor="#3a2876" />
        </linearGradient>
        <linearGradient id="cap" x1="0" x2="1">
          <stop offset="0" stopColor="#0f1527" />
          <stop offset=".45" stopColor="#2c3655" />
          <stop offset="1" stopColor="#0f1527" />
        </linearGradient>
        <linearGradient id="gbot" x1="0" x2="1">
          <stop offset="0" stopColor="#6f737d" />
          <stop offset=".45" stopColor="#b5b8c0" />
          <stop offset="1" stopColor="#666a74" />
        </linearGradient>
        <filter id="soft">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="400" height="566" fill="#ebe6da" />
      <rect y="420" width="400" height="146" fill="#e0dacc" />
      <ellipse
        cx="200"
        cy="452"
        rx="150"
        ry="14"
        fill="#121019"
        opacity=".22"
        filter="url(#soft)"
      />
      <g transform="translate(232 238)">
        <rect x="0" y="40" width="86" height="176" rx="10" fill="url(#gbot)" />
        <rect x="28" y="0" width="30" height="44" rx="4" fill="url(#cap)" />
        <rect x="0" y="118" width="86" height="54" fill="#f3efe9" />
        <text
          x="43"
          y="150"
          textAnchor="middle"
          fontFamily="Syne, Manrope, sans-serif"
          fontWeight="600"
          fontSize="13"
          fill="#121019"
        >
          serum
        </text>
      </g>
      <g transform="translate(86 132)">
        <rect
          x="0"
          y="66"
          width="132"
          height="254"
          rx="16"
          fill="url(#glass)"
        />
        <rect
          x="14"
          y="78"
          width="9"
          height="226"
          rx="4.5"
          fill="#fff"
          opacity=".28"
        />
        <rect x="34" y="20" width="64" height="52" rx="6" fill="url(#cap)" />
        <rect x="0" y="176" width="132" height="92" fill="#f3efe9" />
        <circle cx="22" cy="196" r="5" fill="#6a3cf0" />
        <text
          x="16"
          y="236"
          fontFamily="Syne, Manrope, sans-serif"
          fontWeight="600"
          fontSize="24"
          letterSpacing="-1"
          fill="#121019"
        >
          lavanda
        </text>
        <text
          x="16"
          y="254"
          fontFamily="Manrope, sans-serif"
          fontSize="8"
          fill="#6c707b"
        >
          Tana moyi, 200 ml
        </text>
      </g>
      <text
        x="28"
        y="540"
        fontFamily="Manrope, sans-serif"
        fontSize="9"
        fill="#8c8f98"
      >
        Shisha va yorliq tizimi
      </text>
    </>
  );
}
