import { PageShell } from "@/components/layout/PageShell";
import { RouletteWheel } from "@/components/roulette/RouletteWheel";

export default function RoulettePage() {
  return (
    <PageShell
      eyebrow="Roll Roulette"
      title="Spin for the glaze of the week."
      subtitle="Whatever lands, we bake. Free with any Classic box."
    >
      <RouletteWheel />
    </PageShell>
  );
}
