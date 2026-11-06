// Shared SVG gradients and the logo mark, referenced via <use href="#mlogo" />.
export default function LogoDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="lg1" gradientUnits="userSpaceOnUse" x1="73" y1="305" x2="200" y2="125">
          <stop offset="0" stopColor="#24107a" />
          <stop offset="1" stopColor="#6b3cf0" />
        </linearGradient>
        <linearGradient id="lg2" gradientUnits="userSpaceOnUse" x1="180" y1="290" x2="372" y2="125">
          <stop offset="0" stopColor="#5a2be0" />
          <stop offset=".55" stopColor="#8f6bff" />
          <stop offset="1" stopColor="#d8ccff" />
        </linearGradient>
        <linearGradient id="lg3" gradientUnits="userSpaceOnUse" x1="293" y1="200" x2="372" y2="305">
          <stop offset="0" stopColor="#a07cff" />
          <stop offset="1" stopColor="#6a36ef" />
        </linearGradient>
        <g id="mlogo" fill="none" strokeWidth="77">
          <path d="M111.5 266.5V221a53 53 0 0 1 106 0v45.5" stroke="url(#lg1)" strokeLinecap="round" />
          <path d="M333.5 226v40.5" stroke="url(#lg3)" strokeLinecap="round" />
          <path d="M217.5 266.5V221" stroke="url(#lg2)" strokeLinecap="round" />
          <path d="M217.5 221a58 58 0 0 1 116 0" stroke="url(#lg2)" />
        </g>
      </defs>
    </svg>
  );
}
