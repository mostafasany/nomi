import { PageShell } from "@/components/layout/PageShell";
import { WarmUpSteps } from "@/components/warmup/WarmUpSteps";

export default function WarmUpPage() {
  return (
    <PageShell
      eyebrow="Warm-up Guide"
      title="Back to bakery-fresh in 60 seconds."
      subtitle="Three ways to revive a Nomi. Pick your weapon."
    >
      <WarmUpSteps />
      <div className="mt-12 rounded-3xl bg-cinnamon text-cream p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-swirl opacity-20" aria-hidden />
        <div className="relative">
          <p className="text-xs uppercase tracking-widest opacity-70">Freshness countdown</p>
          <p className="font-display text-3xl font-extrabold mt-2">
            Best within 48 hours.
          </p>
          <p className="mt-2 opacity-80 max-w-xl">
            We'll text you a reminder 36 hours after delivery so no Nomi is left behind.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
