import { PageShell } from "@/components/layout/PageShell";
import { MomentsWall } from "@/components/moments/MomentsWall";

export default function MomentsPage() {
  return (
    <PageShell
      eyebrow="#NomiMoment"
      title="Caught in the wild."
      subtitle="Tag #NomiMoment on Instagram and your roll might end up here."
    >
      <MomentsWall />
    </PageShell>
  );
}
