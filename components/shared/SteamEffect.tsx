export function SteamEffect() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center gap-3" aria-hidden>
      {[0, 0.4, 0.8].map((delay, i) => (
        <span
          key={i}
          className="block h-8 w-2 rounded-full bg-white/70 blur-md animate-steam"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
