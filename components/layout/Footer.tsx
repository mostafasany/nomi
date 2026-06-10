import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-cinnamon/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="font-display text-2xl font-extrabold">NömiRoll</p>
          <p className="text-xs uppercase tracking-widest text-cocoa/60 mt-1">Bakery &amp; Cinnamon Rolls</p>
          <p className="text-sm text-cocoa/70 mt-3">Roll with it.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-cocoa/60">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/menu" className="hover:text-accent">Menu</Link></li>
            <li><Link href="/anatomy" className="hover:text-accent">Anatomy</Link></li>
            <li><Link href="/diary" className="hover:text-accent">Diary</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-cocoa/60">Order</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/build-a-box" className="hover:text-accent">Build a Box</Link></li>
            <li><Link href="/gift" className="hover:text-accent">Gift a Nomi</Link></li>
            <li><Link href="/subscribe" className="hover:text-accent">Weekly Roll Call</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-cocoa/60">Follow</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/moments" className="hover:text-accent">#NomiMoment</Link></li>
            <li><a href="#" className="hover:text-accent">Instagram</a></li>
            <li><a href="#" className="hover:text-accent">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cinnamon/10 py-6 text-center text-xs text-cocoa/60">
        © {new Date().getFullYear()} NömiRoll. Baked with butter and obsession.
      </div>
    </footer>
  );
}
