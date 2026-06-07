"use client";

import { useState } from "react";
import { SIZES, SizeId, getSize } from "@/lib/sizes";
import { ToppingSelection, noToppings, toppingsPrice } from "@/lib/toppings";
import { fmt } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { ToppingPicker } from "@/components/order/ToppingPicker";
import { clsx } from "@/lib/clsx";

type Props = {
  onAdd: (sizeId: SizeId, toppings: ToppingSelection, qty: number) => void;
};

export function RollConfigurator({ onAdd }: Props) {
  const [sizeId, setSizeId]     = useState<SizeId>("medium");
  const [toppings, setToppings] = useState<ToppingSelection>(noToppings);
  const [qty, setQty]           = useState(1);

  const size = getSize(sizeId);
  const unit = size.price + toppingsPrice(toppings);
  const lineTotal = unit * qty;

  const handleAdd = () => {
    onAdd(sizeId, toppings, qty);
    setToppings(noToppings);
    setQty(1);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-2">Size</p>
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSizeId(s.id)}
              className={clsx(
                "rounded-2xl p-3 border-2 text-left transition-all",
                sizeId === s.id
                  ? "border-accent bg-accent/10"
                  : "border-cinnamon/10 hover:border-cinnamon/30"
              )}
            >
              <p className="font-display font-bold text-cinnamon">{s.name}</p>
              <p className="text-xs text-cocoa/70">{fmt(s.price)}</p>
            </button>
          ))}
        </div>
      </div>

      <ToppingPicker value={toppings} onChange={setToppings} />

      <div className="flex items-end justify-between gap-3 pt-1">
        <div>
          <p className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Quantity</p>
          <div className="mt-1.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="h-9 w-9 rounded-full bg-cinnamon/10 text-cinnamon font-bold"
              aria-label="Decrease quantity"
            >−</button>
            <span className="w-8 text-center font-bold text-lg tabular-nums">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(q => q + 1)}
              className="h-9 w-9 rounded-full bg-cinnamon text-cream font-bold"
              aria-label="Increase quantity"
            >+</button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-cocoa/60 uppercase tracking-widest">Line total</p>
          <p className="font-display text-2xl font-extrabold text-cinnamon tabular-nums">
            {fmt(lineTotal)}
          </p>
        </div>
      </div>

      <Button variant="accent" onClick={handleAdd} className="w-full">
        + Add to box
      </Button>
    </div>
  );
}
