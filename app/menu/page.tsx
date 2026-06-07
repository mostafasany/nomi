import { PageShell } from "@/components/layout/PageShell";
import { SizeLineup } from "@/components/menu/SizeLineup";

export default function MenuPage() {
  return (
    <PageShell
      eyebrow="The Lineup"
      title="Three sizes. Pick your fight."
      subtitle="Same dough. Same eleven turns. Different commitment levels."
    >
      <SizeLineup />
    </PageShell>
  );
}
