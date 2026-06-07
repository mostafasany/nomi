"use client";

import { useState } from "react";
import { SIZES, SizeId, getSize } from "@/lib/sizes";
import { fmt, SUBSCRIPTION } from "@/lib/site";
import { SubOrder, validateCustomer } from "@/lib/order";
import { ToppingSelection, noToppings, toppingsPrice } from "@/lib/toppings";
import { Card } from "@/components/ui/Card";
import { clsx } from "@/lib/clsx";
import { CustomerFields, emptyCustomer } from "@/components/order/CustomerFields";
import { WhatsAppButton } from "@/components/order/WhatsAppButton";
import { ToppingPicker } from "@/components/order/ToppingPicker";

const DAYS = SUBSCRIPTION.days;

export function SubscribeForm() {
  const [sizeId, setSizeId]       = useState<SizeId>("medium");
  const [toppings, setToppings]   = useState<ToppingSelection>(noToppings);
  const [qty, setQty]             = useState(2);
  const [day, setDay]             = useState<string>("Sat");
  const [customer, setCustomer]   = useState(emptyCustomer);
  const [attempted, setAttempted] = useState(false);

  const size = getSize(sizeId);
  const unit = size.price + toppingsPrice(toppings);
  const weekly = unit * qty;

  const order: SubOrder = {
    kind: "subscription",
    size,
    toppings,
    qtyPerWeek: qty,
    day,
    weeklyTotal: weekly,
    customer,
  };

  const fieldErrors = validateCustomer(customer);
  const orderErrors: string[] = Object.values(fieldErrors).filter(
    (v): v is string => Boolean(v)
  );

  return (
    <Card>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Size</label>
          <div className="mt-2 space-y-2">
            {SIZES.map(s => (
              <button
                key={s.id}
                onClick={() => setSizeId(s.id)}
                className={clsx(
                  "w-full text-left rounded-xl p-3 border-2 transition-all",
                  sizeId === s.id ? "border-accent bg-accent/10" : "border-cinnamon/10 hover:border-cinnamon/30"
                )}
              >
                <p className="font-bold text-cinnamon">{s.name}</p>
                <p className="text-xs text-cocoa/70">{fmt(s.price)}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Quantity / week</label>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              className="h-10 w-10 rounded-full bg-cinnamon/10 text-cinnamon font-bold"
            >−</button>
            <span className="w-12 text-center font-bold text-2xl tabular-nums">{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              className="h-10 w-10 rounded-full bg-cinnamon text-cream font-bold"
            >+</button>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Delivery day</label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {DAYS.map(d => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={clsx(
                  "rounded-xl py-2 text-sm font-semibold transition-all",
                  d === day ? "bg-accent text-cream" : "bg-cinnamon/5 text-cocoa hover:bg-cinnamon/10"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ToppingPicker value={toppings} onChange={setToppings} compact />
      </div>

      <hr className="my-6 border-cinnamon/10" />

      <p className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-3">
        Your details (for delivery)
      </p>
      <CustomerFields
        value={customer}
        onChange={setCustomer}
        errors={fieldErrors}
        showAll={attempted}
      />

      <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-t border-cinnamon/10 pt-6">
        <div className="md:pt-2">
          <p className="text-sm text-cocoa/70">
            Every <strong>{day}</strong>. {fmt(weekly)} / week.
          </p>
          <p className="text-xs text-cocoa/50">Pause or cancel anytime.</p>
        </div>
        <div className="md:w-96">
          <WhatsAppButton
            order={order}
            errors={orderErrors}
            onAttempt={() => setAttempted(true)}
            label="Join the Roll Call via WhatsApp"
          />
        </div>
      </div>
    </Card>
  );
}
