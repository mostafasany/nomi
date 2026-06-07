import { Moment } from "@/lib/moments";
import { clsx } from "@/lib/clsx";

export function MomentTile({ moment }: { moment: Moment }) {
  return (
    <figure className={clsx(
      "rounded-2xl aspect-square flex flex-col justify-between p-5 transition-transform hover:scale-[1.02]",
      moment.bg
    )}>
      <span className="text-5xl" aria-hidden>{moment.emoji}</span>
      <figcaption>
        <p className="font-semibold text-cocoa">{moment.handle}</p>
        <p className="text-sm text-cocoa/70">{moment.caption}</p>
      </figcaption>
    </figure>
  );
}
