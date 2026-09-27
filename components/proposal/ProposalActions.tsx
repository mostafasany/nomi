"use client";

export function ProposalActions() {
  return (
    <div className="no-print flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full bg-cinnamon px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-accent"
      >
        Export as PDF
      </button>
      <a
        href="/"
        className="rounded-full border border-cinnamon/30 px-6 py-3 text-sm font-semibold text-cinnamon transition-colors hover:bg-cinnamon/5"
      >
        Visit nomiroll.com
      </a>
    </div>
  );
}
