const METHODS = [
  {
    name: "Microwave",
    time: "10 sec",
    steps: [
      "Place Nomi on a plate.",
      "Cover loosely with a damp paper towel.",
      "Microwave 10 seconds.",
      "Eat immediately. No exceptions.",
    ],
  },
  {
    name: "Oven",
    time: "5 min @ 300°F",
    steps: [
      "Preheat oven to 300°F (150°C).",
      "Wrap Nomi loosely in foil.",
      "Warm for 5 minutes.",
      "Drizzle extra glaze. Yes, more.",
    ],
  },
  {
    name: "Air Fryer",
    time: "3 min @ 300°F",
    steps: [
      "Set air fryer to 300°F (150°C).",
      "Add Nomi, no oil needed.",
      "Heat 3 minutes. Flip if you're brave.",
      "Crackliest outside, softest inside.",
    ],
  },
];

export function WarmUpSteps() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {METHODS.map((m) => (
        <article
          key={m.name}
          className="rounded-3xl bg-glaze border border-cinnamon/10 p-6"
        >
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">
            {m.time}
          </p>
          <h3 className="font-display text-3xl font-extrabold text-cinnamon mt-1">
            {m.name}
          </h3>
          <ol className="mt-4 space-y-3">
            {m.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 h-7 w-7 rounded-full bg-cinnamon text-cream text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-cocoa/80">{s}</span>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}
