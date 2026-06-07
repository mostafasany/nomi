import { SIZES } from "@/lib/sizes";
import { SizeCard } from "./SizeCard";

export function SizeLineup() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {SIZES.map(s => (
        <SizeCard key={s.id} size={s} />
      ))}
    </div>
  );
}
