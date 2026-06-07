import Link from "next/link";
import { Size } from "@/lib/sizes";
import { clsx } from "@/lib/clsx";
import { RollSwirl } from "@/components/shared/RollSwirl";

type Props = { size: Size; featured?: boolean };

export function SizeCard({ size, featured }: Props) {
  return (
    <article
      className={clsx(
        "group relative rounded-3xl border border-cinnamon/10 bg-glaze p-8 transition-all",
        "hover:-translate-y-1 hover:shadow-xl ring-2 ring-transparent",
        featured && "ring-2",
        featured && size.ring
      )}
    >
      <div className="flex justify-center mb-6">
        <RollSwirl size={140 + (size.id === "large" ? 60 : size.id === "medium" ? 20 : 0)} animated={false} />
      </div>
      <p className="text-xs uppercase tracking-widest text-accent font-semibold">{size.tagline}</p>
      <h3 className="font-display text-4xl font-extrabold text-cinnamon mt-1">{size.name}</h3>
      <p className="mt-2 text-cocoa/70">{size.description}</p>
      <dl className="mt-6 grid grid-cols-3 gap-3 text-xs">
        <div>
          <dt className="text-cocoa/50">Diameter</dt>
          <dd className="font-semibold">{size.diameterCm} cm</dd>
        </div>
        <div>
          <dt className="text-cocoa/50">Weight</dt>
          <dd className="font-semibold">{size.weightG} g</dd>
        </div>
        <div>
          <dt className="text-cocoa/50">Price</dt>
          <dd className="font-semibold">${size.price.toFixed(2)}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs italic text-cocoa/60">{size.compareTo}</p>
      <Link
        href="/build-a-box"
        className="mt-6 inline-flex items-center text-sm font-semibold text-cinnamon group-hover:text-accent"
      >
        Add to box →
      </Link>
    </article>
  );
}
