type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function PageShell({ eyebrow, title, subtitle, children }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-10">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-5xl md:text-6xl font-extrabold text-cinnamon">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-cocoa/70 max-w-2xl">{subtitle}</p>
        )}
      </header>
      {children}
    </section>
  );
}
