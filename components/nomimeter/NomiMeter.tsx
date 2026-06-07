type Props = { items: number; glazeIdx: number };

function getLabel(score: number): string {
  if (score < 5)  return "Polite snack";
  if (score < 15) return "Solidly happy";
  if (score < 30) return "Real comfort zone";
  if (score < 50) return "Possibly too much";
  return "Nomi Nirvana";
}

export function NomiMeter({ items, glazeIdx }: Props) {
  const score = items * (1 + glazeIdx * 0.6);
  const pct = Math.min(100, score * 2);

  return (
    <div className="mt-5">
      <div className="flex justify-between text-xs font-semibold mb-1.5">
        <span className="uppercase tracking-widest text-cocoa/60">Nomi-meter</span>
        <span className="text-accent">{getLabel(score)}</span>
      </div>
      <div className="h-2.5 rounded-full bg-cinnamon/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-caramel via-accent to-cinnamon transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
