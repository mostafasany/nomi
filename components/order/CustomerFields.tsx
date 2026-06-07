"use client";

import { Customer } from "@/lib/order";

type Props = {
  value: Customer;
  onChange: (v: Customer) => void;
};

const baseInput =
  "mt-1.5 w-full rounded-xl border border-cinnamon/20 bg-cream px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent";

export function CustomerFields({ value, onChange }: Props) {
  const set = <K extends keyof Customer>(k: K, v: Customer[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Name</span>
          <input
            className={baseInput}
            value={value.name}
            onChange={e => set("name", e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Phone</span>
          <input
            type="tel"
            className={baseInput}
            value={value.phone}
            onChange={e => set("phone", e.target.value)}
            placeholder="+1 555 123 4567"
            required
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Delivery address</span>
        <input
          className={baseInput}
          value={value.address}
          onChange={e => set("address", e.target.value)}
          placeholder="Street, apt, city"
          required
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">Notes (optional)</span>
        <textarea
          rows={2}
          className={baseInput + " resize-none"}
          value={value.notes ?? ""}
          onChange={e => set("notes", e.target.value)}
          placeholder="Buzz #3, leave at door, etc."
        />
      </label>
    </div>
  );
}

export const emptyCustomer: Customer = { name: "", phone: "", address: "", notes: "" };
