import { MOMENTS } from "@/lib/moments";
import { MomentTile } from "./MomentTile";

export function MomentsWall({ limit }: { limit?: number }) {
  const items = limit ? MOMENTS.slice(0, limit) : MOMENTS;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map(m => <MomentTile key={m.id} moment={m} />)}
    </div>
  );
}
