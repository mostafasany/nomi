"use client";

import { RollSwirl } from "@/components/shared/RollSwirl";
import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/site";
import { DEFAULT_SIZE_ID, SIZES, SizeId } from "@/lib/sizes";
import Link from "next/link";
import { useState } from "react";

export function SizePicker() {
  const [active, setActive] = useState<SizeId>(DEFAULT_SIZE_ID);
  const size = SIZES.find((s) => s.id === active)!;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
        Pick your Nomi
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-extrabold text-cinnamon mt-2">
        Classic or bites. Same obsession.
      </h2>

      <div className="mt-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="flex items-end justify-center gap-6">
          {SIZES.map((s) => {
            const scale = Math.max(90, Math.min(190, s.diameterCm * 14));
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={clsx(
                  "relative transition-all duration-300 cursor-pointer",
                  isActive ? "scale-110" : "opacity-60 hover:opacity-100",
                )}
                aria-label={`Pick ${s.name}`}
              >
                <RollSwirl size={scale} animated={isActive} />
                <span
                  className={clsx(
                    "block text-center mt-3 font-display text-xl font-bold",
                    isActive ? "text-cinnamon" : "text-cocoa/60",
                  )}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">
            {size.tagline}
          </p>
          <h3 className="font-display text-5xl font-extrabold text-cinnamon mt-1">
            {size.name}
          </h3>
          <p className="mt-3 text-cocoa/75 text-lg">{size.description}</p>
          <p className="mt-2 italic text-cocoa/60">{size.compareTo}</p>
          <p className="mt-6 text-2xl font-bold">{fmt(size.price)} / piece</p>
          <Link
            href="/build-a-box"
            className="mt-6 inline-flex items-center rounded-full bg-cinnamon text-cream px-6 py-3 font-semibold hover:bg-accent transition-colors"
          >
            Order {size.name} →
          </Link>
        </div>
      </div>
    </section>
  );
}
