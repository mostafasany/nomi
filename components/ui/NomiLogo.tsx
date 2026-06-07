export function NomiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.08" />
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M32 32 m -22 0 a 22 22 0 1 1 44 0 a 22 22 0 1 1 -44 0" opacity="0.9" />
        <path d="M32 32 m -15 0 a 15 15 0 1 1 30 0 a 15 15 0 1 1 -30 0" opacity="0.7" />
        <path d="M32 32 m -8 0 a 8 8 0 1 1 16 0 a 8 8 0 1 1 -16 0"  opacity="0.5" />
        <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
