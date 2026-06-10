"use client";

import { RollSwirl } from "@/components/shared/RollSwirl";
import { CartLine, isAddonLine, lineSubtotal } from "@/lib/order";
import { fmt } from "@/lib/site";
import { toppingsCount, toppingsLabel } from "@/lib/toppings";

type Props = {
  line: CartLine;
  onIncQty: () => void;
  onDecQty: () => void;
  onRemove: () => void;
};

export function CartLineItem({ line, onIncQty, onDecQty, onRemove }: Props) {
  if (isAddonLine(line)) {
    return (
      <div className="rounded-2xl bg-glaze border border-cinnamon/10 p-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xl">
          {line.topping.emoji ?? "+"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="font-display text-lg font-bold text-cinnamon">
              {line.topping.name}
            </h4>
            <p className="font-semibold tabular-nums">
              {fmt(lineSubtotal(line))}
            </p>
          </div>
          <p className="text-xs text-cocoa/70 mt-0.5">
            Extras box · {fmt(line.topping.price)} / box
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onDecQty}
              className="h-7 w-7 rounded-full bg-cinnamon/10 text-cinnamon text-sm font-bold"
              aria-label={`Decrease ${line.topping.name}`}
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-bold tabular-nums">
              {line.qty}
            </span>
            <button
              type="button"
              onClick={onIncQty}
              className="h-7 w-7 rounded-full bg-cinnamon text-cream text-sm font-bold"
              aria-label={`Increase ${line.topping.name}`}
            >
              +
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="ml-auto rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
              aria-label={`Delete ${line.topping.name} from box`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  const visual = Math.max(40, Math.min(64, line.size.diameterCm * 6));
  const label = toppingsLabel(line.toppings);

  return (
    <div className="rounded-2xl bg-glaze border border-cinnamon/10 p-4 flex items-center gap-4">
      <div className="shrink-0">
        <RollSwirl size={visual} animated={false} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className="font-display text-lg font-bold text-cinnamon">
            {line.size.name}
          </h4>
          <p className="font-semibold tabular-nums">
            {fmt(lineSubtotal(line))}
          </p>
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
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-bold tabular-nums">
            {line.qty}
          </span>
          <button
            type="button"
            onClick={onIncQty}
            className="h-7 w-7 rounded-full bg-cinnamon text-cream text-sm font-bold"
            aria-label="Increase"
          >
            +
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="ml-auto rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
            aria-label={`Delete ${line.size.name} from box`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
