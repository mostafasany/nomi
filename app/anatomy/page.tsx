import { PageShell } from "@/components/layout/PageShell";
import { RollCrossSection } from "@/components/anatomy/RollCrossSection";

export default function AnatomyPage() {
  return (
    <PageShell
      eyebrow="Anatomy of a Nomi"
      title="What's inside the spiral."
      subtitle="Five layers, eleven turns, and one small obsession."
    >
      <RollCrossSection />
    </PageShell>
  );
}
