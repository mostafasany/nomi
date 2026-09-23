"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "@/lib/clsx";
import { GALLERY } from "@/lib/site";

export function HeroCarousel() {
  const items = GALLERY.items;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  // Mirrors the current slide synchronously. React state lags a click behind,
  // so two quick taps on an arrow would otherwise target the same slide twice.
  const indexRef = useRef(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    indexRef.current = idx;
    setActive(idx);
  };

  const goTo = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el || items.length === 0) return;
      const next = ((index % items.length) + items.length) % items.length;
      const left = next * el.clientWidth;
      const from = el.scrollLeft;
      indexRef.current = next;

      el.scrollTo({ left, behavior: "smooth" });

      // Some engines silently drop a smooth scroll (throttled tabs, reduced
      // compositing). If nothing moved at all we land it directly, so the
      // arrows/dots are never a no-op. A real animation is left alone.
      window.setTimeout(() => {
        if (el.scrollLeft === from && from !== left) el.scrollLeft = left;
      }, 400);
    },
    [items.length],
  );

  // Keep the active dot honest: browsers restore scrollLeft on reload/back-nav,
  // and a resize (e.g. phone rotation) changes the slide width.
  useEffect(() => {
    const sync = () => {
      const el = trackRef.current;
      if (!el || el.clientWidth === 0) return;
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      indexRef.current = idx;
      setActive(idx);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    const seconds = GALLERY.autoplaySeconds;
    if (!seconds || paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => goTo(indexRef.current + 1), seconds * 1000);
    return () => window.clearInterval(id);
  }, [paused, goTo, items.length]);

  const multiple = items.length > 1;

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* ---- photo track ---- */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Nömi photos"
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={item.src + i}
            className="relative h-[62vh] min-h-[440px] max-h-[720px] w-full shrink-0 snap-center overflow-hidden bg-cocoa"
            aria-label={`${i + 1} of ${items.length}`}
          >
            {failed[item.src] ? (
              // Branded stand-in so a missing file never looks broken.
              <div className="h-full w-full bg-swirl bg-caramel" />
            ) : (
              <>
                {/* Blurred copy fills the frame, so portrait and landscape
                    photos both sit in a wide hero without being cropped. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={() => setFailed((f) => ({ ...f, [item.src]: true }))}
                  className="relative h-full w-full object-contain"
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* ---- scrim + headline, sitting over the photos ---- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cocoa/85 via-cocoa/55 to-cocoa/20" />
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Cinnamon Rolls · Classic &amp; Bites
            </p>
            <h1 className="mt-4 font-display text-6xl font-extrabold leading-[0.95] text-cream md:text-8xl">
              Roll
              <br />
              with it.
            </h1>
            <p className="mt-6 max-w-md text-lg text-cream/85">
              One Nomi at a time. Buttery dough, eleven turns of cinnamon, and a
              glaze that knows what it&apos;s doing.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <Link
                href="/build-a-box"
                className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-cinnamon transition-colors hover:bg-accent hover:text-cream"
              >
                Order now
              </Link>
              <Link
                href="/menu"
                className="rounded-full border border-cream/60 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
              >
                See the lineup
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---- controls ---- */}
      {multiple && (
        <>
          <ArrowButton side="left" onClick={() => goTo(indexRef.current - 1)} />
          <ArrowButton side="right" onClick={() => goTo(indexRef.current + 1)} />
          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active || undefined}
                className={clsx(
                  "h-2.5 rounded-full transition-all",
                  i === active ? "w-7 bg-cream" : "w-2.5 bg-cream/40 hover:bg-cream/70",
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function ArrowButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous slide" : "Next slide"}
      className={clsx(
        "absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full sm:flex",
        "bg-cream/85 text-xl font-bold text-cinnamon shadow-md backdrop-blur",
        "transition-colors hover:bg-cream focus:outline-none focus:ring-2 focus:ring-accent",
        side === "left" ? "left-4" : "right-4",
      )}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
