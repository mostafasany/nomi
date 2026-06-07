import { clsx } from "@/lib/clsx";

type Props = {
  size?: number;
  animated?: boolean;
  className?: string;
};

export function RollSwirl({ size = 220, animated = true, className }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={clsx(animated && "animate-unroll", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id="rs-dough" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F6D9A8" />
          <stop offset="100%" stopColor="#C98A4B" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#rs-dough)" />
      {Array.from({ length: 11 }).map((_, i) => {
        const r = 90 - i * 8;
        return (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="#7A3E20"
            strokeOpacity={0.55}
            strokeWidth={i % 2 === 0 ? 2 : 1}
          />
        );
      })}
      <circle cx="100" cy="100" r="5" fill="#7A3E20" />
    </svg>
  );
}
