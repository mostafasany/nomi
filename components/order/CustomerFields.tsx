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

type FieldKey = "pickupDate" | "pickupTime";

const LABELS: Record<FieldKey, string> = {
  pickupDate: "Pickup date",
  pickupTime: "Pickup time",
};

const PLACEHOLDERS: Record<FieldKey, string> = {
  pickupDate: "",
  pickupTime: "",
};

/** Earliest selectable pickup date (today, local time) as yyyy-mm-dd. */
function todayISO(): string {
  const now = new Date();
  const tz = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

export function CustomerFields({ value, onChange, errors = {}, showAll }: Props) {
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    pickupDate: false, pickupTime: false,
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
          k="pickupDate"
          type="date"
          min={todayISO()}
          value={value.pickupDate}
          onChange={v => set("pickupDate", v)}
          onBlur={() => markTouched("pickupDate")}
          error={errorFor("pickupDate")}
        />
        <Field
          k="pickupTime"
          type="time"
          value={value.pickupTime}
          onChange={v => set("pickupTime", v)}
          onBlur={() => markTouched("pickupTime")}
          error={errorFor("pickupTime")}
        />
      </div>
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
  k, value, onChange, onBlur, error, type = "text", min,
}: {
  k: FieldKey;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error: string | null | undefined;
  type?: string;
  min?: string;
}) {
  const invalid = Boolean(error);
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-cocoa/60 font-semibold">
        {LABELS[k]}
      </span>
      <input
        type={type}
        min={min}
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

export const emptyCustomer: Customer = {
  pickupDate: "",
  pickupTime: "",
  notes: "",
};
