const LAYERS = [
  { label: "Glaze",            color: "#FFF7E8", note: "Cream cheese, made to drip." },
  { label: "Outer dough",      color: "#C98A4B", note: "Buttery, golden, sub-1mm crackle." },
  { label: "Cinnamon swirl",   color: "#7A3E20", note: "Eleven turns. Brown sugar. Saigon cinnamon." },
  { label: "Inner dough",      color: "#F6D9A8", note: "Pillow-soft. The reason for the hug." },
  { label: "Core",             color: "#3B1F12", note: "A pocket of warm glaze. Earned at the end." },
];

export function RollCrossSection() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <svg viewBox="0 0 220 220" className="w-full max-w-md mx-auto">
        {LAYERS.map((l, i) => (
          <circle
            key={l.label}
            cx="110"
            cy="110"
            r={100 - i * 18}
            fill={l.color}
            stroke="#3B1F12"
            strokeOpacity={0.2}
          />
        ))}
      </svg>
      <ol className="space-y-4">
        {LAYERS.map((l, i) => (
          <li key={l.label} className="flex items-start gap-4">
            <span
              className="mt-1 h-6 w-6 rounded-full ring-2 ring-cocoa/20 shrink-0"
              style={{ background: l.color }}
            />
            <div>
              <p className="font-display text-xl font-bold text-cinnamon">
                {i + 1}. {l.label}
              </p>
              <p className="text-cocoa/70">{l.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
