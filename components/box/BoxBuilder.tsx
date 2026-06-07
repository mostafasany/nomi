"use client";

import { useMemo, useState, useRef } from "react";
import { SizeId, getSize } from "@/lib/sizes";
import { GLAZE_LEVELS } from "@/lib/glazes";
import { CONTACT, fmt } from "@/lib/site";
import { BoxOrder, CartLine, lineSubtotal, validateCustomer } from "@/lib/order";
import { ToppingSelection } from "@/lib/toppings";
import { Card } from "@/components/ui/Card";
import { FrostingSlider } from "@/components/nomimeter/FrostingSlider";
import { NomiMeter } from "@/components/nomimeter/NomiMeter";
import { CustomerFields, emptyCustomer } from "@/components/order/CustomerFields";
import { WhatsAppButton } from "@/components/order/WhatsAppButton";
import { RollConfigurator } from "./RollConfigurator";
import { CartLineItem } from "./CartLineItem";

export function BoxBuilder() {
  const [lines, setLines]         = useState<CartLine[]>([]);
  const [glazeIdx, setGlazeIdx]   = useState(1);
  const [customer, setCustomer]   = useState(emptyCustomer);
  const [attempted, setAttempted] = useState(false);
  const idRef = useRef(0);

  const glaze = GLAZE_LEVELS[glazeIdx];

  const totalItems  = lines.reduce((s, l) => s + l.qty, 0);
  const totalWeight = useMemo(
    () => lines.reduce((s, l) => s + l.size.weightG * l.qty, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + lineSubtotal(l), 0),
    [lines]
  );
  const glazeFee = glaze.surcharge * totalItems;
  const total    = subtotal + glazeFee;

  const addLine = (sizeId: SizeId, toppings: ToppingSelection, qty: number) => {
    idRef.current += 1;
    const newLine: CartLine = {
      id: `line-${idRef.current}`,
      size: getSize(sizeId),
      toppings,
      qty,
    };
    setLines(ls => [...ls, newLine]);
  };

  const updateQty = (id: string, delta: number) =>
    setLines(ls => ls.flatMap(l => {
      if (l.id !== id) return [l];
      const q = l.qty + delta;
      return q <= 0 ? [] : [{ ...l, qty: q }];
    }));

  const removeLine = (id: string) =>
    setLines(ls => ls.filter(l => l.id !== id));

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
  const orderErrors: string[] = [
    ...(lines.length === 0 ? ["Add at least one roll to your box."] : []),
    ...Object.values(fieldErrors).filter((v): v is string => Boolean(v)),
  ];

  return (
    <div className="grid lg:grid-cols-[1fr,380px] gap-8">
      <div className="space-y-4">
        <Card>
          <h3 className="font-display text-2xl font-bold text-cinnamon">Customize a roll</h3>
          <p className="text-sm text-cocoa/70 mt-1">
            Pick a size, add sauce or nuts, set quantity, add to box.
          </p>
          <div className="mt-5">
            <RollConfigurator onAdd={addLine} />
          </div>
        </Card>

        <Card>
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-2xl font-bold text-cinnamon">Your box</h3>
            {totalItems > 0 && (
              <p className="text-sm text-cocoa/60">
                {totalItems} {totalItems === 1 ? "roll" : "rolls"} · {totalWeight}g
              </p>
            )}
          </div>
          {lines.length === 0 ? (
            <p className="text-sm text-cocoa/60 mt-3 italic">
              Empty for now. Build your first roll above.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {lines.map(l => (
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
        </Card>

        <Card>
          <h3 className="font-display text-2xl font-bold text-cinnamon">How much glaze?</h3>
          <FrostingSlider value={glazeIdx} onChange={setGlazeIdx} />
        </Card>

        <Card>
          <h3 className="font-display text-2xl font-bold text-cinnamon">Delivery details</h3>
          <p className="text-sm text-cocoa/70 mt-1">{CONTACT.deliveryNote}</p>
          <div className="mt-4">
            <CustomerFields
              value={customer}
              onChange={setCustomer}
              errors={fieldErrors}
              showAll={attempted}
            />
          </div>
        </Card>
      </div>

      <aside className="lg:sticky lg:top-24 h-fit">
        <Card>
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">Summary</p>
          <h3 className="font-display text-3xl font-extrabold text-cinnamon mt-1">
            {totalItems === 0 ? "Empty" : `${totalItems} ${totalItems === 1 ? "roll" : "rolls"}`}
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
              {lines.flatMap(l =>
                Array.from({ length: l.qty }).map((_, i) => (
                  <span
                    key={`${l.id}-${i}`}
                    className={`inline-block rounded-full ${l.size.color}`}
                    style={{
                      width:  l.size.id === "large" ? 32 : l.size.id === "medium" ? 20 : 12,
                      height: l.size.id === "large" ? 32 : l.size.id === "medium" ? 20 : 12,
                    }}
                  />
                ))
              )}
            </div>
          </div>

          <NomiMeter items={totalItems} glazeIdx={glazeIdx} />

          <dl className="mt-6 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-cocoa/70">Rolls + toppings</dt>
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
