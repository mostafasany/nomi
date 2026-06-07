"use client";

import { useState } from "react";
import { SIZES, SizeId, getSize } from "@/lib/sizes";
import { fmt } from "@/lib/site";
import { GiftOrder, validateCustomer } from "@/lib/order";
import { ToppingSelection, noToppings, toppingsPrice, toppingsLabel, toppingsCount } from "@/lib/toppings";
import { Card } from "@/components/ui/Card";
import { clsx } from "@/lib/clsx";
import { CustomerFields, emptyCustomer } from "@/components/order/CustomerFields";
import { WhatsAppButton } from "@/components/order/WhatsAppButton";
import { ToppingPicker } from "@/components/order/ToppingPicker";

export function GiftForm() {
  const [sizeId, setSizeId]       = useState<SizeId>("medium");
  const [toppings, setToppings]   = useState<ToppingSelection>(noToppings);
  const [recipient, setRecipient] = useState("");
  const [note, setNote]           = useState("");
  const [customer, setCustomer]   = useState(emptyCustomer);
  const [attempted, setAttempted] = useState(false);

  const size = getSize(sizeId);
  const giftPrice = size.price + toppingsPrice(toppings);

  const order: GiftOrder = {
    kind: "gift",
    size,
    toppings,
    recipient,
    note,
    customer,
  };

  const fieldErrors = validateCustomer(customer);
  const orderErrors: string[] = [
    ...(!recipient.trim() ? ["Add the recipient's name."] : []),
    ...(!note.trim()      ? ["Add a note for them."]      : []),
    ...Object.values(fieldErrors).filter((v): v is string => Boolean(v)),
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <label className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
          Pick a Nomi
        </label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {SIZES.map(s => (
            <button
              key={s.id}
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

        <div className="mt-5">
          <ToppingPicker value={toppings} onChange={setToppings} compact />
        </div>

        <p className="mt-3 text-right text-sm text-cocoa/70">
          Gift price: <span className="font-bold text-cinnamon">{fmt(giftPrice)}</span>
        </p>

        <label className="block mt-5 text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
          To
        </label>
        <input
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="Their name"
          className="mt-2 w-full rounded-xl border border-cinnamon/20 bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <label className="block mt-5 text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
          Your note
        </label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={4}
          maxLength={240}
          placeholder="Say something warm."
          className="mt-2 w-full rounded-xl border border-cinnamon/20 bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
        <p className="mt-1 text-xs text-cocoa/50 text-right">{note.length}/240</p>

        <hr className="my-5 border-cinnamon/10" />

        <p className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold mb-3">
          Your details (for delivery)
        </p>
        <CustomerFields
          value={customer}
          onChange={setCustomer}
          errors={fieldErrors}
          showAll={attempted}
        />

        <div className="mt-5">
          <WhatsAppButton
            order={order}
            errors={orderErrors}
            onAttempt={() => setAttempted(true)}
            label="Send the Nomi via WhatsApp"
          />
        </div>
      </Card>

      <Card className="bg-cinnamon text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-swirl opacity-20" aria-hidden />
        <div className="relative">
          <p className="text-xs uppercase tracking-widest opacity-70">Preview</p>
          <p className="font-display text-3xl font-extrabold mt-2">
            For {recipient || "someone good"} —
          </p>
          <p className="mt-4 leading-relaxed whitespace-pre-line">
            {note || "Your note will appear here. Keep it sweet."}
          </p>
          <p className="mt-6 italic opacity-80">
            One {size.name}
            {toppingsCount(toppings) > 0 && ` (+ ${toppingsLabel(toppings)})`} on the way.
          </p>
        </div>
      </Card>
    </div>
  );
}
