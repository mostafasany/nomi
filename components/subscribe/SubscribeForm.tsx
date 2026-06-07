"use client";

import { useState } from "react";
import { SIZES, SizeId } from "@/lib/sizes";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function SubscribeForm() {
  const [size, setSize] = useState<SizeId>("medium");
  const [qty, setQty] = useState(2);
  const [day, setDay] = useState<typeof DAYS[number]>("Sat");

  const weekly = SIZES.find(s => s.id === size)!.price * qty;

  return (
    <Card>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Size</label>
          <div className="mt-2 space-y-2">
            {SIZES.map(s => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className={clsx(
                  "w-full text-left rounded-xl p-3 border-2 transition-all",
                  size === s.id ? "border-accent bg-accent/10" : "border-cinnamon/10 hover:border-cinnamon/30"
                )}
              >
                <p className="font-bold text-cinnamon">{s.name}</p>
                <p className="text-xs text-cocoa/70">${s.price.toFixed(2)}</p>
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

      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-cinnamon/10 pt-6">
        <div>
          <p className="text-sm text-cocoa/70">
            Every <strong>{day}</strong>. ${weekly.toFixed(2)} / week.
          </p>
          <p className="text-xs text-cocoa/50">Pause or cancel anytime.</p>
        </div>
        <Button variant="accent">Join the Roll Call</Button>
      </div>
    </Card>
  );
}
