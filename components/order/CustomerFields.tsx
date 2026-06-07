"use client";

import { useState } from "react";
import { Customer, FieldErrors } from "@/lib/order";
import { clsx } from "@/lib/clsx";

type Props = {
  value: Customer;
  onChange: (v: Customer) => void;
  errors?: FieldErrors;
  /** Force-show every error message (e.g. after user clicks the disabled order button). */
  showAll?: boolean;
};

type FieldKey = "name" | "phone" | "address";

const LABELS: Record<FieldKey, string> = {
  name: "Name",
  phone: "Phone",
  address: "Delivery address",
};

const PLACEHOLDERS: Record<FieldKey, string> = {
  name: "Jane Doe",
  phone: "+1 555 123 4567",
  address: "Street, apt, city",
};

export function CustomerFields({ value, onChange, errors = {}, showAll }: Props) {
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false, phone: false, address: false,
  });

  const set = <K extends keyof Customer>(k: K, v: Customer[K]) =>
    onChange({ ...value, [k]: v });

  const markTouched = (k: FieldKey) =>
    setTouched(t => (t[k] ? t : { ...t, [k]: true }));

  const errorFor = (k: FieldKey) =>
    (showAll || touched[k]) && errors[k] ? errors[k] : null;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field
          k="name"
          value={value.name}
          onChange={v => set("name", v)}
          onBlur={() => markTouched("name")}
          error={errorFor("name")}
        />
        <Field
          k="phone"
          type="tel"
          value={value.phone}
          onChange={v => set("phone", v)}
          onBlur={() => markTouched("phone")}
          error={errorFor("phone")}
        />
      </div>
      <Field
        k="address"
        value={value.address}
        onChange={v => set("address", v)}
        onBlur={() => markTouched("address")}
        error={errorFor("address")}
      />
      <label className="block">
        <span className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
          Notes (optional)
        </span>
        <textarea
          rows={2}
          className="mt-1.5 w-full rounded-xl border border-cinnamon/20 bg-cream px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          value={value.notes ?? ""}
          onChange={e => set("notes", e.target.value)}
          placeholder="Buzz #3, leave at door, etc."
        />
      </label>
    </div>
  );
}

function Field({
  k, value, onChange, onBlur, error, type = "text",
}: {
  k: FieldKey;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error: string | null | undefined;
  type?: string;
}) {
  const invalid = Boolean(error);
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
        {LABELS[k]}
      </span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={PLACEHOLDERS[k]}
        aria-invalid={invalid || undefined}
        className={clsx(
          "mt-1.5 w-full rounded-xl border bg-cream px-4 py-2.5 text-sm focus:outline-none focus:ring-2",
          invalid
            ? "border-red-400 focus:ring-red-300"
            : "border-cinnamon/20 focus:ring-accent"
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
          <span aria-hidden>⚠</span> {error}
        </p>
      )}
    </label>
  );
}

export const emptyCustomer: Customer = { name: "", phone: "", address: "", notes: "" };
