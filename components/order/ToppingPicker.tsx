"use client";

import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/site";
import {
  EXTRA_SAUCES,
  NUTS,
  SAUCES,
  Topping,
  ToppingSelection,
} from "@/lib/toppings";

type Props = {
  value: ToppingSelection;
  onChange: (v: ToppingSelection) => void;
  /** Compact = smaller font/padding for embedding inside small forms. */
  compact?: boolean;
  showAddons?: boolean;
};

export function ToppingPicker({
  value,
  onChange,
  compact,
  showAddons = true,
}: Props) {
  const extraSauces = value.extraSauces ?? [];

  const toggleSauce = (t: Topping) => {
    const has = value.sauces.some((x) => x.id === t.id);
    const next = has ? [] : [t];
    onChange({ ...value, sauces: next });
  };

  const setNutQty = (t: Topping, qty: number) => {
    const nextQty = Math.max(0, qty);
    const next = value.nuts
      .filter((x) => x.topping.id !== t.id)
      .concat(nextQty > 0 ? [{ topping: t, qty: nextQty }] : [])
      .sort(
        (a, b) =>
          NUTS.findIndex((n) => n.id === a.topping.id) -
          NUTS.findIndex((n) => n.id === b.topping.id),
      );
    onChange({ ...value, nuts: next });
  };

  const setExtraSauceQty = (t: Topping, qty: number) => {
    const nextQty = Math.max(0, qty);
    const next = extraSauces
      .filter((x) => x.topping.id !== t.id)
      .concat(nextQty > 0 ? [{ topping: t, qty: nextQty }] : [])
      .sort(
        (a, b) =>
          EXTRA_SAUCES.findIndex((s) => s.id === a.topping.id) -
          EXTRA_SAUCES.findIndex((s) => s.id === b.topping.id),
      );
    onChange({ ...value, extraSauces: next });
  };

  const renderQuantityGroup = ({
    label,
    help,
    options,
    selections,
    onQtyChange,
  }: {
    label: string;
    help: string;
    options: Topping[];
    selections: Array<{ topping: Topping; qty: number }>;
    onQtyChange: (topping: Topping, qty: number) => void;
  }) => (
    <fieldset>
      <legend className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-1.5">
        {label}{" "}
        <span className="opacity-60 normal-case tracking-normal">— {help}</span>
      </legend>
      <div
        className={clsx(
          "grid gap-2",
          compact ? "grid-cols-1" : "sm:grid-cols-2",
        )}
      >
        {options.map((opt) => {
          const selected = selections.find((x) => x.topping.id === opt.id);
          const qty = selected?.qty ?? 0;
          return (
            <div
              key={opt.id}
              className={clsx(
                "flex items-center justify-between gap-2 rounded-xl border-2 px-3 transition-all",
                compact ? "py-1.5" : "py-2.5",
                qty > 0
                  ? "border-accent bg-accent/10"
                  : "border-cinnamon/15 bg-cream",
              )}
            >
              <div className="min-w-0">
                <p
                  className={clsx(
                    "font-semibold text-cinnamon truncate",
                    compact ? "text-sm" : "text-base",
                  )}
                >
                  {opt.emoji && <span aria-hidden>{opt.emoji} </span>}
                  {opt.name}
                </p>
                <p
                  className={clsx(
                    "text-cocoa/60",
                    compact ? "text-xs" : "text-sm",
                  )}
                >
                  +{fmt(opt.price)} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onQtyChange(opt, qty - 1)}
                  className="h-7 w-7 rounded-full bg-cinnamon/10 text-cinnamon text-sm font-bold disabled:opacity-40"
                  disabled={qty === 0}
                  aria-label={`Decrease ${opt.name}`}
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-bold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => onQtyChange(opt, qty + 1)}
                  className="h-7 w-7 rounded-full bg-cinnamon text-cream text-sm font-bold"
                  aria-label={`Increase ${opt.name}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );

  return (
    <div className={clsx("space-y-3", compact && "space-y-2")}>
      <fieldset>
        <legend className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-1.5">
          Toppings{" "}
          <span className="opacity-60 normal-case tracking-normal">
            — choose one optional
          </span>
        </legend>
        <div
          className={clsx(
            "grid gap-2",
            compact ? "grid-cols-2" : "sm:grid-cols-2",
          )}
        >
          {SAUCES.map((opt) => {
            const selected = value.sauces.some((x) => x.id === opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleSauce(opt)}
                aria-pressed={selected}
                className={clsx(
                  "flex items-center justify-between gap-2 rounded-xl border-2 px-3 transition-all text-left",
                  compact ? "py-1.5" : "py-2.5",
                  selected
                    ? "border-accent bg-accent/10"
                    : "border-cinnamon/15 bg-cream hover:border-cinnamon/30",
                )}
              >
                <span className="flex items-center gap-2">
                  {opt.emoji && <span aria-hidden>{opt.emoji}</span>}
                  <span
                    className={clsx(
                      "font-semibold text-cinnamon",
                      compact ? "text-sm" : "text-base",
                    )}
                  >
                    {opt.name}
                  </span>
                </span>
                <span
                  className={clsx(
                    "text-cocoa/60",
                    compact ? "text-xs" : "text-sm",
                  )}
                >
                  +{fmt(opt.price)}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {showAddons &&
        renderQuantityGroup({
          label: "Nuts",
          help: "choose quantity",
          options: NUTS,
          selections: value.nuts,
          onQtyChange: setNutQty,
        })}

      {showAddons &&
        renderQuantityGroup({
          label: "Extra Sauces",
          help: "choose quantity",
          options: EXTRA_SAUCES,
          selections: extraSauces,
          onQtyChange: setExtraSauceQty,
        })}
    </div>
  );
}
