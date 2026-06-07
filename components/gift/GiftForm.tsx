"use client";

import { useState } from "react";
import { SIZES, SizeId } from "@/lib/sizes";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

export function GiftForm() {
  const [size, setSize] = useState<SizeId>("medium");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");

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
              onClick={() => setSize(s.id)}
              className={clsx(
                "rounded-2xl p-3 border-2 text-left transition-all",
                size === s.id
                  ? "border-accent bg-accent/10"
                  : "border-cinnamon/10 hover:border-cinnamon/30"
              )}
            >
              <p className="font-display font-bold text-cinnamon">{s.name}</p>
              <p className="text-xs text-cocoa/70">${s.price.toFixed(2)}</p>
            </button>
          ))}
        </div>

        <label className="block mt-6 text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
          To
        </label>
        <input
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="Their name"
          className="mt-2 w-full rounded-xl border border-cinnamon/20 bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <label className="block mt-6 text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
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

        <Button variant="accent" className="w-full mt-4">Send the Nomi</Button>
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
            One {SIZES.find(s => s.id === size)!.name} on the way.
          </p>
        </div>
      </Card>
    </div>
  );
}
