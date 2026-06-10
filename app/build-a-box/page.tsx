import { BoxBuilder } from "@/components/box/BoxBuilder";
import { PageShell } from "@/components/layout/PageShell";

export default function BuildABoxPage() {
  return (
    <PageShell
      eyebrow="Build a Box"
      title="Make it yours."
      subtitle="Pick your toppings, choose your glaze, watch the box get heavier."
    >
      <BoxBuilder />
    </PageShell>
  );
}
