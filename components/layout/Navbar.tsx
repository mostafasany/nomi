import { LogoMark } from "@/components/ui/Logo";
import Link from "next/link";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/build-a-box", label: "Build a Box" },
  // { href: "/roll-roulette", label: "Roll Roulette" },
  // { href: "/anatomy",       label: "Anatomy" },
  // { href: "/diary",         label: "Diary" },
  // { href: "/gift",          label: "Gift" },
  // { href: "/subscribe",     label: "Subscribe" },
  // { href: "/moments",       label: "Moments" },
  // { href: "/warm-up",       label: "Warm-up" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur border-b border-cinnamon/10">
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <LogoMark
            size={36}
            className="group-hover:rotate-45 transition-transform duration-500"
          />
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Nömi
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-cocoa/80 hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/build-a-box"
          className="rounded-full bg-cinnamon text-cream px-4 py-2 text-sm font-semibold hover:bg-accent transition-colors"
        >
          Order
        </Link>
      </nav>
    </header>
  );
}
