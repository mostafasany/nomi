"use client";

import { NomiMeter } from "@/components/nomimeter/NomiMeter";
import { CustomerFields, emptyCustomer } from "@/components/order/CustomerFields";
import { WhatsAppButton } from "@/components/order/WhatsAppButton";
import { Card } from "@/components/ui/Card";
import { GLAZE_LEVELS } from "@/lib/glazes";
import {
  BoxOrder,
  CartLine,
  isAddonLine,
  isRollLine,
  lineSubtotal,
  validateCustomer,
} from "@/lib/order";
import { CONTACT, fmt, ORDER_CFG } from "@/lib/site";
import { getSize, minQtyForSize, SizeId } from "@/lib/sizes";
import { noToppings, Topping, ToppingSelection } from "@/lib/toppings";
import { useMemo, useRef, useState } from "react";
import { CartLineItem } from "./CartLineItem";
import { RollConfigurator } from "./RollConfigurator";

export function BoxBuilder() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [glazeIdx, setGlazeIdx] = useState(1);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [attempted, setAttempted] = useState(false);
  const idRef = useRef(0);

  const glaze = GLAZE_LEVELS[glazeIdx];

  const totalItems = lines.reduce((s, l) => s + l.qty, 0);
  const totalRolls = lines.reduce((s, l) => (isRollLine(l) ? s + l.qty : s), 0);
  const totalWeight = useMemo(
    () =>
      lines.reduce(
        (s, l) => (isRollLine(l) ? s + l.size.weightG * l.qty : s),
        0,
      ),
    [lines],
  );
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + lineSubtotal(l), 0),
    [lines],
  );
  const glazeFee = glaze.surcharge * totalRolls;
  const total = subtotal + glazeFee;

  const addLine = (sizeId: SizeId, toppings: ToppingSelection, qty: number) => {
    idRef.current += 1;
    const newLine: CartLine = {
      id: `line-${idRef.current}`,
      type: "roll",
      size: getSize(sizeId),
      toppings,
      qty,
    };
    setLines((ls) => [...ls, newLine]);
  };

  const addAddonLine = (kind: "nuts" | "extraSauces", topping: Topping) => {
    setLines((ls) => {
      const existing = ls.find(
        (line) =>
          isAddonLine(line) &&
          line.addonKind === kind &&
          line.topping.id === topping.id,
      );

      if (existing) {
        return ls.map((line) =>
          line.id === existing.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      idRef.current += 1;
      return [
        ...ls,
        {
          id: `line-${idRef.current}`,
          type: "addon",
          addonKind: kind,
          topping,
          toppings: noToppings,
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (id: string, delta: number) =>
    setLines((ls) =>
      ls.flatMap((l) => {
        if (l.id !== id) return [l];
        const q = l.qty + delta;
        if (isAddonLine(l)) return q < 1 ? [] : [{ ...l, qty: q }];
        return q < minQtyForSize(l.size) ? [l] : [{ ...l, qty: q }];
      }),
    );

  const removeLine = (id: string) =>
    setLines((ls) => ls.filter((l) => l.id !== id));

  const clearBox = () => setLines([]);

  const order: BoxOrder = {
    kind: "box",
    lines,
    glaze,
    subtotal,
    glazeFee,
    total,
    customer,
  };

  const fieldErrors = validateCustomer(customer);
  const qtyErrors = lines.flatMap((line) =>
    isRollLine(line) && line.qty < minQtyForSize(line.size)
      ? [`Minimum for ${line.size.name} is ${minQtyForSize(line.size)}.`]
      : [],
  );
  const orderErrors: string[] = [
    ...(lines.length === 0 ? ["Add at least one roll to your box."] : []),
    ...qtyErrors,
    ...Object.values(fieldErrors).filter((v): v is string => Boolean(v)),
  ];

  return (
    <div className="grid lg:grid-cols-[1fr,380px] gap-8">
      <div className="space-y-4">
        <Card>
          <h3 className="font-display text-2xl font-bold text-cinnamon">
            Customize a roll
          </h3>
          <p className="text-sm text-cocoa/70 mt-1">
            Classic starts at {ORDER_CFG.minRolls} pieces. Bites are ordered by
            the pack.
          </p>
          <div className="mt-5">
            <RollConfigurator onAdd={addLine} onAddAddon={addAddonLine} />
          </div>
        </Card>

        {lines.length > 0 && (
          <Card>
            <h3 className="font-display text-2xl font-bold text-cinnamon">
              Pickup &amp; details
            </h3>
            <p className="text-sm text-cocoa/70 mt-1">
              Choose when you&apos;ll pick up. {CONTACT.deliveryNote}
            </p>
            <div className="mt-4">
              <CustomerFields
                value={customer}
                onChange={setCustomer}
                errors={fieldErrors}
                showAll={attempted}
              />
            </div>
          </Card>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 h-fit">
        <Card>
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">
            Summary
          </p>
          <h3 className="font-display text-3xl font-extrabold text-cinnamon mt-1">
            {totalItems === 0
              ? "Empty"
              : `${totalItems} ${totalItems === 1 ? "item" : "items"}`}
          </h3>

          <div
            className="mt-4 rounded-2xl border-2 border-dashed border-cinnamon/30 p-5 transition-transform"
            style={{
              transform: `translateY(${Math.min(totalWeight / 80, 8)}px)`,
            }}
          >
            <p className="text-sm text-cocoa/70">
              {totalWeight === 0
                ? "Drop some Nomi in here."
                : `Getting heavier… ${totalWeight}g`}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {lines.filter(isRollLine).flatMap((l) =>
                Array.from({ length: l.qty }).map((_, i) => (
                  <span
                    key={`${l.id}-${i}`}
                    className={`inline-block rounded-full ${l.size.color}`}
                    style={{
                      width: Math.max(
                        12,
                        Math.min(32, l.size.diameterCm * 2.25),
                      ),
                      height: Math.max(
                        12,
                        Math.min(32, l.size.diameterCm * 2.25),
                      ),
                    }}
                  />
                )),
              )}
            </div>
          </div>

          <NomiMeter items={totalRolls} glazeIdx={glazeIdx} />

          <div className="mt-6 border-t border-cinnamon/10 pt-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-display text-xl font-bold text-cinnamon">
                  Your box
                </h4>
                {totalItems > 0 && (
                  <p className="text-sm text-cocoa/60">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                    {totalWeight > 0 ? ` · ${totalWeight}g` : ""}
                  </p>
                )}
              </div>
              {lines.length > 0 && (
                <button
                  type="button"
                  onClick={clearBox}
                  className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
                >
                  Clear box
                </button>
              )}
            </div>
            {lines.length === 0 ? (
              <p className="text-sm text-cocoa/60 mt-3 italic">
                Empty for now. Build your first roll above.
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {lines.map((l) => (
                  <CartLineItem
                    key={l.id}
                    line={l}
                    onIncQty={() => updateQty(l.id, +1)}
                    onDecQty={() => updateQty(l.id, -1)}
                    onRemove={() => removeLine(l.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <dl className="mt-6 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-cocoa/70">Box subtotal</dt>
              <dd>{fmt(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-cocoa/70">Glaze ({glaze.name})</dt>
              <dd>{fmt(glazeFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-cinnamon/10 pt-2 mt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>{fmt(total)}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <WhatsAppButton
              order={order}
              errors={orderErrors}
              onAttempt={() => setAttempted(true)}
            />
            {orderErrors.length === 0 && (
              <p className="mt-2 text-[11px] text-cocoa/60 text-center">
                Opens WhatsApp with your order pre-filled. Tap send.
              </p>
            )}
          </div>
        </Card>
      </aside>
    </div>
  );
}
