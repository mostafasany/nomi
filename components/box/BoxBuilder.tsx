"use client";

import { useMemo, useState } from "react";
import { SIZES, SizeId } from "@/lib/sizes";
import { GLAZE_LEVELS } from "@/lib/glazes";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FrostingSlider } from "@/components/nomimeter/FrostingSlider";
import { NomiMeter } from "@/components/nomimeter/NomiMeter";
import { BoxItemRow } from "./BoxItemRow";

type Counts = Record<SizeId, number>;

const INITIAL: Counts = { bites: 0, medium: 0, large: 0 };

export function BoxBuilder() {
  const [counts, setCounts]   = useState<Counts>(INITIAL);
  const [glazeIdx, setGlazeIdx] = useState(1);
  const glaze = GLAZE_LEVELS[glazeIdx];

  const totalItems  = counts.bites + counts.medium + counts.large;
  const totalWeight = useMemo(
    () => SIZES.reduce((sum, s) => sum + s.weightG * counts[s.id], 0),
    [counts]
  );
  const subtotal = useMemo(
    () => SIZES.reduce((sum, s) => sum + s.price * counts[s.id], 0),
    [counts]
  );
  const total = subtotal + glaze.surcharge * totalItems;

  const setCount = (id: SizeId, n: number) =>
    setCounts(c => ({ ...c, [id]: Math.max(0, n) }));

  return (
    <div className="grid lg:grid-cols-[1fr,380px] gap-8">
      <div className="space-y-4">
        {SIZES.map(s => (
          <BoxItemRow
            key={s.id}
            size={s}
            count={counts[s.id]}
            onInc={() => setCount(s.id, counts[s.id] + 1)}
            onDec={() => setCount(s.id, counts[s.id] - 1)}
          />
        ))}

        <Card>
          <h3 className="font-display text-2xl font-bold text-cinnamon">How much glaze?</h3>
          <FrostingSlider value={glazeIdx} onChange={setGlazeIdx} />
        </Card>
      </div>

      <aside className="lg:sticky lg:top-24 h-fit">
        <Card>
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">Your box</p>
          <h3 className="font-display text-3xl font-extrabold text-cinnamon mt-1">
            {totalItems === 0 ? "Empty" : `${totalItems} rolls`}
          </h3>

          <div
            className="mt-4 rounded-2xl border-2 border-dashed border-cinnamon/30 p-5 transition-transform"
            style={{ transform: `translateY(${Math.min(totalWeight / 80, 8)}px)` }}
          >
            <p className="text-sm text-cocoa/70">
              {totalWeight === 0
                ? "Drop some Nomi in here."
                : `Getting heavier… ${totalWeight}g`}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {SIZES.flatMap(s =>
                Array.from({ length: counts[s.id] }).map((_, i) => (
                  <span
                    key={`${s.id}-${i}`}
                    className={`inline-block rounded-full ${s.color}`}
                    style={{
                      width: s.id === "large" ? 32 : s.id === "medium" ? 20 : 12,
                      height: s.id === "large" ? 32 : s.id === "medium" ? 20 : 12,
                    }}
                  />
                ))
              )}
            </div>
          </div>

          <NomiMeter items={totalItems} glazeIdx={glazeIdx} />

          <dl className="mt-6 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-cocoa/70">Rolls</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cocoa/70">Glaze ({glaze.name})</dt>
              <dd>${(glaze.surcharge * totalItems).toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-cinnamon/10 pt-2 mt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          <Button variant="accent" className="w-full mt-5">
            Checkout
          </Button>
        </Card>
      </aside>
    </div>
  );
}
