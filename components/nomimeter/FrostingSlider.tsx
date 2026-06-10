"use client";

import { clsx } from "@/lib/clsx";
import { GLAZE_LEVELS } from "@/lib/glazes";
import { fmt } from "@/lib/site";

type Props = { value: number; onChange: (v: number) => void };

export function FrostingSlider({ value, onChange }: Props) {
  return (
    <div className="mt-4">
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
        aria-label="Glaze level"
      />
      <div className="mt-3 grid grid-cols-3 text-xs">
        {GLAZE_LEVELS.map((g, i) => (
          <button
            key={g.id}
            onClick={() => onChange(i)}
            className={clsx(
              "text-left transition-opacity",
              i === value ? "opacity-100" : "opacity-50 hover:opacity-80",
            )}
          >
            <p className="font-bold text-cinnamon">{g.name}</p>
            <p className="text-cocoa/70">{g.description}</p>
            {g.surcharge > 0 && (
              <p className="text-accent font-semibold mt-1">
                +{fmt(g.surcharge)}/roll
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
