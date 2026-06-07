"use client";

import { useState } from "react";
import { ROULETTE_GLAZES } from "@/lib/glazes";
import { Button } from "@/components/ui/Button";

export function RouletteWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const n = ROULETTE_GLAZES.length;
  const slice = 360 / n;

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const winnerIdx = Math.floor((rotation / slice) * 0 + n * 0.99 * ((rotation + 1) % 1 + 0.5)) % n;
    // pick a pseudo-random winner without Math.random (use timestamp via performance)
    const idx = Math.floor(performance.now() * 1000) % n;
    const target = 360 * 6 + (n - idx) * slice;
    setRotation(r => r + target);
    setTimeout(() => {
      setResult(ROULETTE_GLAZES[idx]);
      setSpinning(false);
    }, 4000);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[340px] h-[340px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10
                        w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px]
                        border-l-transparent border-r-transparent border-b-accent" />
        <div
          className="w-full h-full rounded-full border-4 border-cinnamon overflow-hidden relative shadow-xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4s cubic-bezier(0.18, 0.89, 0.32, 1.27)",
          }}
        >
          {ROULETTE_GLAZES.map((label, i) => {
            const angle = i * slice;
            const bg = i % 2 === 0 ? "#FBF4E8" : "#F6D9A8";
            return (
              <div
                key={label}
                className="absolute inset-0 flex items-start justify-center pt-4"
                style={{
                  transform: `rotate(${angle + slice / 2}deg)`,
                  clipPath: `polygon(50% 50%, ${50 - 50 * Math.tan((slice / 2) * Math.PI / 180)}% 0, ${50 + 50 * Math.tan((slice / 2) * Math.PI / 180)}% 0)`,
                  background: bg,
                }}
              >
                <span className="text-[11px] font-bold text-cinnamon px-2 text-center max-w-[80px] leading-tight">
                  {label}
                </span>
              </div>
            );
          })}
          <div className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-cinnamon text-cream flex items-center justify-center font-display font-bold">
            Nomi
          </div>
        </div>
      </div>

      <Button onClick={spin} variant="accent" className="mt-8">
        {spinning ? "Spinning…" : "Spin the wheel"}
      </Button>

      {result && (
        <p className="mt-6 font-display text-2xl text-cinnamon">
          This week&apos;s surprise: <span className="text-accent">{result}</span>
        </p>
      )}
    </div>
  );
}
