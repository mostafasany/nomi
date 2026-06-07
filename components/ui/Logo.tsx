import { clsx } from "@/lib/clsx";

const CARAMEL = "#C99565";
const CREAM   = "#F2E8D5";

type Props = { size?: number; className?: string };

/** Tiny circular mark — used in navbars, favicons, anywhere the wordmark is too small to read. */
export function LogoMark({ size = 40, className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-label="Nömi's"
    >
      <circle cx="32" cy="32" r="32" fill={CARAMEL} />
      <g stroke={CREAM} strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M 32 32 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0" />
        <path d="M 32 32 m -10 0 a 10 10 0 1 1 18 4" />
        <path d="M 32 32 m -16 -2 a 16 16 0 1 1 26 12" opacity="0.6" />
      </g>
      <circle cx="32" cy="32" r="1.5" fill={CREAM} />
    </svg>
  );
}

/** Full circular logo badge with wordmark, divider, tagline, and dot row. */
export function LogoBadge({ size = 320, className }: Props) {
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={className}
      aria-label="Nömi's — Bakery & Cinnamon Rolls"
    >
      <circle cx="160" cy="160" r="160" fill={CARAMEL} />

      {/* swirl mark, top */}
      <g
        transform="translate(160, 100)"
        stroke={CREAM}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M -5 0 a 5 5 0 1 1 10 0 a 5 5 0 1 1 -10 0" />
        <path d="M -11 -1 a 11 11 0 1 1 19 5" />
        <circle r="1.6" fill={CREAM} stroke="none" />
      </g>

      {/* wordmark */}
      <text
        x="160"
        y="190"
        textAnchor="middle"
        fontFamily='"Fraunces", ui-serif, Georgia, serif'
        fontWeight={800}
        fontSize="64"
        letterSpacing="-1"
        fill={CREAM}
      >
        N&#xD6;MI&#x2019;S
      </text>

      {/* divider */}
      <line x1="90" y1="215" x2="230" y2="215" stroke={CREAM} strokeWidth="0.8" opacity="0.85" />

      {/* tagline */}
      <text
        x="160"
        y="235"
        textAnchor="middle"
        fontFamily='"Fraunces", ui-serif, Georgia, serif'
        fontSize="11"
        letterSpacing="3"
        fill={CREAM}
      >
        BAKERY &amp; CINNAMON ROLLS
      </text>

      {/* dot row */}
      <g fill={CREAM}>
        {[-24, -12, 0, 12, 24].map(dx => (
          <circle key={dx} cx={160 + dx} cy={258} r="2" />
        ))}
      </g>
    </svg>
  );
}
