import { Hero } from "@/components/home/Hero";
import { SizePicker } from "@/components/home/SizePicker";
import { FeaturedIdeas } from "@/components/home/FeaturedIdeas";
import { MomentsWall } from "@/components/moments/MomentsWall";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SizePicker />
      <FeaturedIdeas />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold">#NomiMoment</p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-cinnamon mt-2">
              Caught in the wild.
            </h2>
          </div>
          <a href="/moments" className="text-sm font-semibold text-cinnamon hover:text-accent">
            See all →
          </a>
        </div>
        <MomentsWall limit={6} />
      </section>
    </>
  );
}
