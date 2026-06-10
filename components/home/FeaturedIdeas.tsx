import { Card } from "@/components/ui/Card";
import Link from "next/link";

const IDEAS = [
  {
    href: "/build-a-box",
    title: "Build a Box",
    blurb: "Stack Classics in. Watch it get heavy.",
  },
  {
    href: "/roll-roulette",
    title: "Roll Roulette",
    blurb: "Spin for a surprise glaze of the week.",
  },
  {
    href: "/anatomy",
    title: "Anatomy of a Nomi",
    blurb: "Layers, swirls, and 11 turns of why.",
  },
  {
    href: "/gift",
    title: "Gift a Nomi",
    blurb: "Send a roll with a custom note.",
  },
  {
    href: "/subscribe",
    title: "Weekly Roll Call",
    blurb: "Same rolls. Same day. Every week.",
  },
  {
    href: "/warm-up",
    title: "Warm-up Guide",
    blurb: "Bring it back to bakery-fresh in 60s.",
  },
];

export function FeaturedIdeas() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="font-display text-4xl md:text-5xl font-extrabold text-cinnamon">
        More than a menu.
      </h2>
      <p className="mt-3 text-cocoa/70 max-w-xl">
        Things to do, taste, send, and share.
      </p>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {IDEAS.map((i) => (
          <Link key={i.href} href={i.href} className="group">
            <Card className="h-full hover:-translate-y-1 transition-transform">
              <h3 className="font-display text-2xl font-bold text-cinnamon group-hover:text-accent transition-colors">
                {i.title}
              </h3>
              <p className="mt-2 text-cocoa/70">{i.blurb}</p>
              <p className="mt-4 text-sm font-semibold text-accent">
                Explore →
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
