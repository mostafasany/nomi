import { PageShell } from "@/components/layout/PageShell";
import { SubscribeForm } from "@/components/subscribe/SubscribeForm";

export default function SubscribePage() {
  return (
    <PageShell
      eyebrow="Weekly Roll Call"
      title="Same rolls, same day, every week."
      subtitle="A subscription for people who don't want to think about it."
    >
      <SubscribeForm />
    </PageShell>
  );
}
