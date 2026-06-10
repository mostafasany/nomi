import { PageShell } from "@/components/layout/PageShell";
import { SizeLineup } from "@/components/menu/SizeLineup";

export default function MenuPage() {
  return (
    <PageShell
      eyebrow="The Lineup"
      title="Classic rolls and bite boxes."
      subtitle="Same dough. Same eleven turns. Pick your toppings."
    >
      <SizeLineup />
    </PageShell>
  );
}
