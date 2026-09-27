import type { Metadata } from "next";
import { LogoBadge } from "@/components/ui/Logo";
import { PopUpCartConcept } from "@/components/proposal/PopUpCartConcept";
import { ProposalActions } from "@/components/proposal/ProposalActions";
import { CONTACT, SITE, fmt } from "@/lib/site";
import { SIZES } from "@/lib/sizes";
import { SAUCES, EXTRA_SAUCES, NUTS } from "@/lib/toppings";

export const metadata: Metadata = {
  title: "Nömi — Commercial Proposal | Somabay",
  description: "Retail pop-up proposal prepared for the Somabay commercial team.",
  // Unlisted: keep it out of search results.
  robots: { index: false, follow: false, nocache: true },
};

const PREPARED = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function Section({
  eyebrow,
  title,
  children,
  breakBefore,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  breakBefore?: boolean;
}) {
  return (
    <section className={breakBefore ? "print-page-break mt-16" : "mt-14"}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-extrabold text-cinnamon md:text-4xl">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-cocoa/85 leading-relaxed">{children}</div>
    </section>
  );
}

export default function SomabayProposalPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      {/* ---------- cover ---------- */}
      <header className="print-avoid-break border-b border-cinnamon/15 pb-10">
        <div className="flex flex-wrap items-center gap-6">
          <div className="w-28 shrink-0">
            <LogoBadge />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Commercial Proposal
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-cinnamon md:text-5xl">
              Retail Pop-Up at Somabay
            </h1>
            <p className="mt-3 text-cocoa/75">
              Prepared for the <strong>Somabay Commercial Team</strong> · {PREPARED}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <ProposalActions />
        </div>
      </header>

      {/* ---------- the ask, up front ---------- */}
      <div className="print-avoid-break mt-10 rounded-3xl border border-cinnamon/15 bg-glaze p-7">
        <h2 className="font-display text-2xl font-bold text-cinnamon">
          The request, in one paragraph
        </h2>
        <p className="mt-3 text-cocoa/85 leading-relaxed">
          Nömi is an Egyptian cinnamon roll bakery. We would like to operate a
          small <strong>retail pop-up</strong> at Somabay to sell our rolls to
          guests and residents. All products are{" "}
          <strong>baked off-site</strong> at our own kitchen and{" "}
          <strong>packed on site</strong> at the cart when a customer orders.
          We are therefore asking for a{" "}
          <strong>display and retail spot only</strong> — we do not need a
          production kitchen, extraction, or any cooking facility on site.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { k: "What we need", v: "A display / retail pop-up spot" },
            { k: "What we don't need", v: "No production kitchen on site" },
            { k: "Production", v: "Baked off-site, packed at the cart" },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl bg-cream p-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/60">
                {x.k}
              </dt>
              <dd className="mt-1 font-semibold text-cinnamon">{x.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- about ---------- */}
      <Section eyebrow="About" title="Who we are">
        <p>
          Nömi is a small-batch cinnamon roll bakery. We make one thing and we
          make it properly: buttery dough, fluffy layers of cinnamon, and a glaze
          finished to order. Our rolls are sold in two formats — a full-size{" "}
          <strong>Classic</strong> roll and a shareable{" "}
          <strong>Bites</strong> box — with a short list of sauces and nut
          toppings customers choose themselves.
        </p>
        <p>
          We currently sell direct to customers through{" "}
          <a href="https://nomiroll.com" className="font-semibold text-cinnamon underline decoration-accent underline-offset-4">
            nomiroll.com
          </a>{" "}
          and Instagram, taking orders over WhatsApp for pickup and delivery.
        </p>
      </Section>

      {/* ---------- operating model ---------- */}
      <Section eyebrow="Operations" title="How the pop-up would run">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              t: "Baked at our kitchen",
              d: "Rolls are cooked and baked at our own home kitchen. Nothing is baked, fried, or cooked at the Somabay location.",
            },
            {
              t: "Displayed in the pop-up cart",
              d: "Rolls arrive baked and are displayed in the cart. Staff there handle display, packing, finishing, and service only — no cooking.",
            },
            {
              t: "Finished to order",
              d: "Rolls are kept in a covered display. Sauces and nut toppings are added when a customer orders, from sealed containers.",
            },
            {
              t: "Small footprint",
              d: "A compact foldable cart that can be closed and stored outside trading hours, or moved between locations if needed.",
            },
          ].map((x) => (
            <div key={x.t} className="print-avoid-break rounded-2xl border border-cinnamon/15 bg-glaze p-5">
              <h3 className="font-display text-xl font-bold text-cinnamon">{x.t}</h3>
              <p className="mt-2 text-sm text-cocoa/80">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="rounded-2xl border-l-4 border-accent bg-accent/5 p-4 text-sm">
          <strong>To be clear:</strong> this proposal is for a retail and
          display unit. We are not requesting a kitchen, cooking equipment,
          extraction, or food production space at Somabay.
        </p>
      </Section>

      {/* ---------- products ---------- */}
      <Section eyebrow="Range" title="What we would sell" breakBefore>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-cinnamon/20">
                <th className="py-3 font-semibold text-cinnamon">Item</th>
                <th className="py-3 font-semibold text-cinnamon">Description</th>
                <th className="py-3 text-right font-semibold text-cinnamon">
                  Retail price
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((s) => (
                <tr key={s.id} className="border-b border-cinnamon/10">
                  <td className="py-3 font-semibold">{s.name}</td>
                  <td className="py-3 text-cocoa/75">{s.description}</td>
                  <td className="py-3 text-right font-semibold tabular-nums">
                    {fmt(s.price)}
                  </td>
                </tr>
              ))}
              <tr className="border-b border-cinnamon/10">
                <td className="py-3 font-semibold">Sauces</td>
                <td className="py-3 text-cocoa/75">
                  {SAUCES.map((s) => s.name.replace(" (Classic Glaze)", "")).join(", ")}
                </td>
                <td className="py-3 text-right font-semibold tabular-nums">
                  {fmt(SAUCES[1]?.price ?? 0)}
                </td>
              </tr>
              <tr className="border-b border-cinnamon/10">
                <td className="py-3 font-semibold">Nut toppings</td>
                <td className="py-3 text-cocoa/75">
                  {NUTS.map((n) => n.name).join(", ")} — sold by the box
                </td>
                <td className="py-3 text-right font-semibold tabular-nums">
                  {fmt(NUTS[0]?.price ?? 0)}
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold">Extra sauce box</td>
                <td className="py-3 text-cocoa/75">
                  Sealed pots for takeaway boxes
                </td>
                <td className="py-3 text-right font-semibold tabular-nums">
                  {fmt(EXTRA_SAUCES[0]?.price ?? 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="print-avoid-break rounded-2xl border-l-4 border-accent bg-accent/5 p-4 text-sm">
          <strong>Pricing note:</strong> the figures above are our current
          retail prices in {SITE.currencyCode}. Final pricing for the Somabay
          location is <strong>open to discussion and may be adjusted
          according to the partnership terms</strong> we agree — including the
          commercial model, location, and season.
        </p>
      </Section>

      {/* ---------- cart concept ---------- */}
      <Section eyebrow="Unit" title="Foldable pop-up cart — design concept">
        <div className="print-avoid-break rounded-3xl border border-cinnamon/15 bg-glaze p-6">
          <PopUpCartConcept className="w-full" />
        </div>

        <div className="print-avoid-break rounded-2xl border-2 border-accent/40 bg-accent/5 p-5">
          <p className="text-sm font-bold uppercase tracking-wider text-accent">
            Design concept / visual reference only
          </p>
          <p className="mt-2 text-sm text-cocoa/85">
            The sketch above is an <strong>indicative design concept</strong>{" "}
            prepared for this proposal. It is <strong>not</strong> the actual
            Nömi cart, not a manufactured unit, and not a final design. It is
            included only to show the intended scale and character of the pop-up.
          </p>
          <p className="mt-2 text-sm text-cocoa/85">
            The <strong>final design, exact footprint, utility requirements,
            and all signage</strong> would be developed and agreed together with
            the Somabay team, in line with your standards and location
            guidelines. Dimensions shown are indicative only.
          </p>
        </div>
      </Section>

      {/* ---------- what we need ---------- */}
      <Section eyebrow="Requirements" title="What we would need from Somabay">
        <ul className="space-y-3">
          {[
            ["Location", "A compact retail spot in a footfall area — dimensions to be agreed."],
            ["Power", "A standard single-phase socket for lighting and the display unit."],
            ["Food handling", "Rolls are packed at the cart, so access to a handwashing point nearby would be needed. We supply gloves, sanitiser, and sealed packaging, and will work to Somabay's food-safety requirements."],
            ["Trading terms", "Rent or revenue-share model, plus trading hours and season — open to your preferred structure."],
            ["Signage approval", "Branding and signage to follow Somabay's guidelines and sign-off."],
            ["Access", "Delivery access for a daily stock drop, and storage for the folded unit outside trading hours."],
          ].map(([k, v]) => (
            <li key={k} className="print-avoid-break flex gap-4 rounded-2xl bg-glaze p-4">
              <span className="w-32 shrink-0 text-sm font-bold uppercase tracking-wider text-cinnamon">
                {k}
              </span>
              <span className="text-sm text-cocoa/85">{v}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- next steps ---------- */}
      <Section eyebrow="Next" title="Proposed next steps">
        <ol className="space-y-3">
          {[
            "A short call or meeting to confirm interest and the type of spot available.",
            "A tasting session — we bring the full range of rolls for your team to try, at a time and place that suits you.",
            "Somabay shares location options, trading terms, and design guidelines.",
            "We return a final cart design and footprint for approval.",
            "Agree commercial terms, trial period, and launch date.",
          ].map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cinnamon text-sm font-bold text-cream">
                {i + 1}
              </span>
              <span className="text-cocoa/85">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- contact ---------- */}
      <section className="print-avoid-break mt-16 rounded-3xl bg-cinnamon p-8 text-cream">
        <h2 className="font-display text-3xl font-extrabold">Let&apos;s talk</h2>
        <p className="mt-3 max-w-xl text-cream/85">
          We would welcome the chance to discuss a trial at Somabay and answer
          any questions on food safety, logistics, or the unit itself. We are
          happy to arrange a tasting for your team whenever it suits you.
        </p>
        <dl className="mt-6 grid gap-5 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-widest text-cream/60">Website</dt>
            <dd className="mt-1">
              <a href="https://nomiroll.com" className="font-semibold underline decoration-accent underline-offset-4">
                nomiroll.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-cream/60">Instagram</dt>
            <dd className="mt-1">
              <a href={CONTACT.instagram} className="font-semibold underline decoration-accent underline-offset-4">
                @nomi.roll
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-cream/60">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href={`https://wa.me/${CONTACT.whatsappNumber.replace(/[^\d]/g, "")}`}
                className="font-semibold underline decoration-accent underline-offset-4"
              >
                {CONTACT.whatsappNumber}
              </a>
            </dd>
          </div>
        </dl>
        <p className="mt-8 border-t border-cream/20 pt-4 text-xs text-cream/60">
          {SITE.name} · {SITE.tagline} · Prepared {PREPARED}. This document is a
          commercial proposal and not a binding offer.
        </p>
      </section>
    </article>
  );
}
