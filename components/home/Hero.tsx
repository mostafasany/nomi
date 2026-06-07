import { Button } from "@/components/ui/Button";
import { LogoBadge } from "@/components/ui/Logo";
import { SteamEffect } from "@/components/shared/SteamEffect";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-swirl opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
            Cinnamon Rolls · Three Sizes
          </p>
          <h1 className="mt-4 font-display text-6xl md:text-8xl font-extrabold leading-[0.95] text-cinnamon">
            Roll<br />with it.
          </h1>
          <p className="mt-6 text-lg text-cocoa/75 max-w-md">
            One Nomi at a time. Buttery dough, eleven turns of cinnamon,
            and a glaze that knows what it&apos;s doing.
          </p>
          <div className="mt-8 flex gap-3">
            <Button href="/menu" variant="primary">See the lineup</Button>
            <Button href="/build-a-box" variant="ghost">Build a box</Button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[400px] mx-auto px-6 md:px-0">
            <SteamEffect />
            <LogoBadge className="drop-shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
