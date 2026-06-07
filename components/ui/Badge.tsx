import { clsx } from "@/lib/clsx";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx(
      "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
      "bg-cinnamon/10 text-cinnamon",
      className
    )}>
      {children}
    </span>
  );
}
