import { PageShell } from "@/components/layout/PageShell";
import { BoxBuilder } from "@/components/box/BoxBuilder";

export default function BuildABoxPage() {
  return (
    <PageShell
      eyebrow="Build a Box"
      title="Make it yours."
      subtitle="Mix sizes, pick your glaze, watch the box get heavier."
    >
      <BoxBuilder />
    </PageShell>
  );
}
