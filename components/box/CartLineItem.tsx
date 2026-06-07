"use client";

import { CartLine, lineSubtotal } from "@/lib/order";
import { toppingsCount, toppingsLabel } from "@/lib/toppings";
import { fmt } from "@/lib/site";
import { RollSwirl } from "@/components/shared/RollSwirl";

type Props = {
  line: CartLine;
  onIncQty: () => void;
  onDecQty: () => void;
  onRemove: () => void;
};

export function CartLineItem({ line, onIncQty, onDecQty, onRemove }: Props) {
  const visual = line.size.id === "large" ? 64 : line.size.id === "medium" ? 52 : 40;
  const label = toppingsLabel(line.toppings);

  return (
    <div className="rounded-2xl bg-glaze border border-cinnamon/10 p-4 flex items-center gap-4">
      <div className="shrink-0">
        <RollSwirl size={visual} animated={false} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-display text-lg font-bold text-cinnamon">{line.size.name}</h4>
          <p className="font-semibold tabular-nums">{fmt(lineSubtotal(line))}</p>
        </div>
        {toppingsCount(line.toppings) > 0 ? (
          <p className="text-xs text-cocoa/70 mt-0.5 truncate">+ {label}</p>
        ) : (
          <p className="text-xs text-cocoa/50 mt-0.5 italic">no toppings</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={onDecQty}
            className="h-7 w-7 rounded-full bg-cinnamon/10 text-cinnamon text-sm font-bold"
            aria-label="Decrease"
          >−</button>
          <span className="w-6 text-center text-sm font-bold tabular-nums">{line.qty}</span>
          <button
            type="button"
            onClick={onIncQty}
            className="h-7 w-7 rounded-full bg-cinnamon text-cream text-sm font-bold"
            aria-label="Increase"
          >+</button>
          <button
            type="button"
            onClick={onRemove}
            className="ml-auto text-xs text-cocoa/60 hover:text-red-600 underline-offset-2 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
