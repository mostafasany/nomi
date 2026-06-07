import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Props = {
  href?: string;
  variant?: "primary" | "ghost" | "accent";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

const styles = {
  primary: "bg-cinnamon text-cream hover:bg-accent",
  accent:  "bg-accent text-cream hover:bg-cinnamon",
  ghost:   "bg-transparent text-cinnamon border border-cinnamon/30 hover:bg-cinnamon/5",
};

export function Button({ href, variant = "primary", children, onClick, className, type = "button" }: Props) {
  const cls = clsx(
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
    styles[variant],
    className
  );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
