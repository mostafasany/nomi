import { PageShell } from "@/components/layout/PageShell";
import { GiftForm } from "@/components/gift/GiftForm";

export default function GiftPage() {
  return (
    <PageShell
      eyebrow="Gift a Nomi"
      title="Send a roll. With words."
      subtitle="Pick a size, add a note, we hand-deliver the joy."
    >
      <GiftForm />
    </PageShell>
  );
}
