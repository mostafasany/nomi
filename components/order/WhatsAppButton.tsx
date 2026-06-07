"use client";

import { MouseEvent } from "react";
import { Order, whatsappUrl } from "@/lib/order";
import { clsx } from "@/lib/clsx";

type Props = {
  order: Order;
  /** Reasons the order can't be sent. Empty array = ready. */
  errors: string[];
  /** Called when user clicks the disabled button. Use to mark fields as touched. */
  onAttempt?: () => void;
  label?: string;
  className?: string;
};

export function WhatsAppButton({
  order, errors, onAttempt, label = "Send order via WhatsApp", className,
}: Props) {
  const ready = errors.length === 0;
  const href = ready ? whatsappUrl(order) : "#";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ready) {
      e.preventDefault();
      onAttempt?.();
    }
  };

  return (
    <div>
      {!ready && errors.length > 0 && (
        <div
          className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          <p className="font-semibold flex items-center gap-1.5">
            <span aria-hidden>⚠</span> Before you can order:
          </p>
          <ul className="mt-1.5 space-y-0.5 list-disc list-inside marker:text-red-400">
            {errors.map(e => <li key={e}>{e}</li>)}
          </ul>
        </div>
      )}

      <a
        href={href}
        target={ready ? "_blank" : undefined}
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-disabled={!ready || undefined}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors w-full",
          ready
            ? "bg-[#25D366] text-white hover:bg-[#1FB955]"
            : "bg-cinnamon/20 text-cocoa/40 cursor-not-allowed",
          className
        )}
      >
        <WhatsAppIcon /> {label}
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11.7 11.7 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.3zM12 21.6a9.7 9.7 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.6 9.6 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 7 2.9a9.7 9.7 0 0 1 2.9 7c0 5.4-4.5 9.8-9.9 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.6 0-.3-.1-1.2-.4-2.4-1.5a8.9 8.9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1.1 1.1-1.1 2.6 1.1 3 1.3 3.2c.1.2 2.2 3.4 5.4 4.8.7.3 1.3.5 1.8.6.7.2 1.4.2 2 .1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.2-.2-.2-.5-.3z" />
    </svg>
  );
}
