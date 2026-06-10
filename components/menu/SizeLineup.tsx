import { SIZES } from "@/lib/sizes";
import { SizeCard } from "./SizeCard";

export function SizeLineup() {
  return (
    <div className="mx-auto grid max-w-xl md:max-w-none md:grid-cols-3 gap-6">
      {SIZES.map((s) => (
        <SizeCard key={s.id} size={s} />
      ))}
    </div>
  );
}
