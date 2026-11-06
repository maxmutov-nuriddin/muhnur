/**
 * Loyiha uchun universal san'at/rasm sahifasi (400×566 SVG).
 * Agar alohida SVG chizilmagan bo'lsa, loyiha ma'lumotlari (nomi, turi, rangi yoki rasmi)
 * asosida avtomatik professional dizayn yaratadi.
 *
 * @param {{ project: import("../../../content/catalog.js").PROJECTS[number] }} props
 */
export default function DynamicArt({ project }) {
  if (!project) return null;

  const { title = "Loyiha", client = "", kind = "Brending", palette = [], image } = project;

  const bg = palette[0]?.hex || "#121019";
  const accent = palette[1]?.hex || "#6A3CF0";
  const light = palette[2]?.hex || "#F3EFE9";
  const muted = palette[3]?.hex || "#9A98A3";

  if (image) {
    return (
      <>
        <rect width="400" height="566" fill={bg} />
        <image
          href={image}
          x="20"
          y="24"
          width="360"
          height="490"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#img-clip)"
        />
        <clipPath id="img-clip">
          <rect x="20" y="24" width="360" height="490" rx="10" />
        </clipPath>
        <text
          x="28"
          y="540"
          fontFamily="Manrope, sans-serif"
          fontSize="9"
          fill={muted}
        >
          {kind}
        </text>
      </>
    );
  }

  // Bosh harflar (monogramma)
  const monogram = title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || "")
    .join("")
    .toUpperCase();

  return (
    <>
      <rect width="400" height="566" fill={bg} />
      <circle
        cx="200"
        cy="236"
        r="110"
        fill="none"
        stroke={light}
        strokeOpacity=".18"
        strokeWidth="1.2"
      />
      <circle cx="200" cy="236" r="66" fill={accent} />
      <text
        x="200"
        y="252"
        textAnchor="middle"
        fontFamily="Syne, Manrope, sans-serif"
        fontWeight="700"
        fontSize="44"
        letterSpacing="-1"
        fill={light}
      >
        {monogram}
      </text>
      <text
        x="200"
        y="412"
        textAnchor="middle"
        fontFamily="Syne, Manrope, sans-serif"
        fontWeight="600"
        fontSize={title.length > 20 ? "26" : "34"}
        letterSpacing="-1"
        fill={light}
      >
        {title}
      </text>
      <text
        x="200"
        y="442"
        textAnchor="middle"
        fontFamily="Manrope, sans-serif"
        fontSize="11"
        letterSpacing="2"
        fill={muted}
      >
        {client || kind}
      </text>
      <text
        x="28"
        y="540"
        fontFamily="Manrope, sans-serif"
        fontSize="9"
        fill={muted}
      >
        {kind}
      </text>
    </>
  );
}

