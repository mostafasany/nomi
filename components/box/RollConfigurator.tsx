"use client";

import { ToppingPicker } from "@/components/order/ToppingPicker";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/site";
import {
  DEFAULT_SIZE_ID,
  SIZES,
  SizeId,
  getSize,
  minQtyForSize,
} from "@/lib/sizes";
import {
  EXTRA_SAUCES,
  NUTS,
  Topping,
  ToppingSelection,
  defaultToppings,
  saucesPrice,
} from "@/lib/toppings";
import { useState } from "react";

type Props = {
  onAdd: (sizeId: SizeId, toppings: ToppingSelection, qty: number) => void;
  onAddAddon: (kind: "nuts" | "extraSauces", topping: Topping) => void;
};

export function RollConfigurator({ onAdd, onAddAddon }: Props) {
  const [sizeId, setSizeId] = useState<SizeId>(DEFAULT_SIZE_ID);
  const [toppings, setToppings] = useState<ToppingSelection>(
    defaultToppings(DEFAULT_SIZE_ID),
  );
  const [qty, setQty] = useState(minQtyForSize(getSize(DEFAULT_SIZE_ID)));

  const size = getSize(sizeId);
  const minQty = minQtyForSize(size);
  const unit = size.price + saucesPrice(toppings);
  const lineTotal = unit * qty;

  const handleAdd = () => {
    onAdd(sizeId, toppings, qty);
    setToppings(defaultToppings(sizeId));
    setQty(minQtyForSize(getSize(sizeId)));
  };

  const handleSizeChange = (nextSizeId: SizeId) => {
    setSizeId(nextSizeId);
    setToppings(defaultToppings(nextSizeId));
    setQty(minQtyForSize(getSize(nextSizeId)));
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-2">
          Size
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSizeChange(s.id)}
              className={clsx(
                "rounded-2xl p-3 border-2 text-left transition-all",
                sizeId === s.id
                  ? "border-accent bg-accent/10"
                  : "border-cinnamon/10 hover:border-cinnamon/30",
              )}
            >
              <p className="font-display font-bold text-cinnamon">{s.name}</p>
              <p className="text-xs text-cocoa/70">{fmt(s.price)}</p>
            </button>
          ))}
        </div>
      </div>

      <ToppingPicker
        value={toppings}
        onChange={setToppings}
        showAddons={false}
      />

      <div className="flex items-end justify-between gap-3 pt-1">
        <div>
          <p className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
            Quantity {size.id === "bites" ? "(packs)" : "(pieces)"}
          </p>
          <div className="mt-1.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(minQty, q - 1))}
              className="h-9 w-9 rounded-full bg-cinnamon/10 text-cinnamon font-bold"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center font-bold text-lg tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="h-9 w-9 rounded-full bg-cinnamon text-cream font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-cocoa/60 uppercase tracking-widest">
            Line total
          </p>
          <p className="font-display text-2xl font-extrabold text-cinnamon tabular-nums">
            {fmt(lineTotal)}
          </p>
        </div>
      </div>

      <Button variant="accent" onClick={handleAdd} className="w-full">
        + Add roll to box
      </Button>

      <div className="border-t border-cinnamon/10 pt-4">
        <ExtrasPicker onAdd={onAddAddon} />
      </div>
    </div>
  );
}

type ExtraOption = {
  kind: "nuts" | "extraSauces";
  topping: Topping;
};

const EXTRA_OPTIONS: ExtraOption[] = [
  ...NUTS.map((topping) => ({ kind: "nuts" as const, topping })),
  ...EXTRA_SAUCES.map((topping) => ({
    kind: "extraSauces" as const,
    topping,
  })),
];

function ExtrasPicker({
  onAdd,
}: {
  onAdd: (kind: "nuts" | "extraSauces", topping: Topping) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-1.5">
        Extras (Optional)
        <span className="opacity-60 normal-case tracking-normal">
          {" "}
          — price per box
        </span>
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {EXTRA_OPTIONS.map(({ kind, topping }) => (
          <div
            key={`${kind}-${topping.id}`}
            className="flex items-center justify-between gap-2 rounded-xl border-2 border-cinnamon/15 bg-cream px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold text-cinnamon">
                {topping.emoji && <span aria-hidden>{topping.emoji} </span>}
                {topping.name}
              </p>
              <p className="text-sm text-cocoa/60">
                {fmt(topping.price)} / box
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAdd(kind, topping)}
              className="h-8 w-8 shrink-0 rounded-full bg-cinnamon text-cream text-sm font-bold"
              aria-label={`Add ${topping.name} extra box`}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
