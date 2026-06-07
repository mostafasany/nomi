"use client";

import { TOPPING_GROUPS, ToppingSelection, Topping } from "@/lib/toppings";
import { fmt } from "@/lib/site";
import { clsx } from "@/lib/clsx";

type Props = {
  value: ToppingSelection;
  onChange: (v: ToppingSelection) => void;
  /** Compact = smaller font/padding for embedding inside small forms. */
  compact?: boolean;
};

export function ToppingPicker({ value, onChange, compact }: Props) {
  const toggle = (group: "sauces" | "nuts", t: Topping) => {
    const list = value[group];
    const has  = list.some(x => x.id === t.id);
    const next = has ? list.filter(x => x.id !== t.id) : [...list, t];
    onChange({ ...value, [group]: next });
  };

  return (
    <div className={clsx("space-y-3", compact && "space-y-2")}>
      {TOPPING_GROUPS.map(group => (
        <fieldset key={group.key}>
          <legend className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-1.5">
            {group.label} <span className="opacity-60 normal-case tracking-normal">— optional</span>
          </legend>
          <div className={clsx("grid gap-2", compact ? "grid-cols-2" : "sm:grid-cols-2")}>
            {group.options.map(opt => {
              const selected = value[group.key].some(x => x.id === opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggle(group.key, opt)}
                  aria-pressed={selected}
                  className={clsx(
                    "flex items-center justify-between gap-2 rounded-xl border-2 px-3 transition-all text-left",
                    compact ? "py-1.5" : "py-2.5",
                    selected
                      ? "border-accent bg-accent/10"
                      : "border-cinnamon/15 bg-cream hover:border-cinnamon/30"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {opt.emoji && <span aria-hidden>{opt.emoji}</span>}
                    <span className={clsx("font-semibold text-cinnamon", compact ? "text-sm" : "text-base")}>
                      {opt.name}
                    </span>
                  </span>
                  <span className={clsx("text-cocoa/60", compact ? "text-xs" : "text-sm")}>
                    +{fmt(opt.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
