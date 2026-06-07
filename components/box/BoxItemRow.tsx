"use client";

import { Size } from "@/lib/sizes";
import { RollSwirl } from "@/components/shared/RollSwirl";

type Props = {
  size: Size;
  count: number;
  onInc: () => void;
  onDec: () => void;
};

export function BoxItemRow({ size, count, onInc, onDec }: Props) {
  const visual = size.id === "large" ? 80 : size.id === "medium" ? 64 : 48;

  return (
    <div className="rounded-2xl bg-glaze border border-cinnamon/10 p-5 flex items-center gap-5">
      <div className="shrink-0">
        <RollSwirl size={visual} animated={false} />
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-widest text-accent font-semibold">{size.tagline}</p>
        <h3 className="font-display text-2xl font-bold text-cinnamon">{size.name}</h3>
        <p className="text-sm text-cocoa/70">${size.price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDec}
          disabled={count === 0}
          className="h-9 w-9 rounded-full bg-cinnamon/10 text-cinnamon font-bold disabled:opacity-30"
          aria-label={`Remove one ${size.name}`}
        >
          −
        </button>
        <span className="w-8 text-center font-bold text-lg tabular-nums">{count}</span>
        <button
          onClick={onInc}
          className="h-9 w-9 rounded-full bg-cinnamon text-cream font-bold hover:bg-accent transition-colors"
          aria-label={`Add one ${size.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
