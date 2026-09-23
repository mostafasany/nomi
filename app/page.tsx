import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SizePicker } from "@/components/home/SizePicker";
import { FeaturedIdeas } from "@/components/home/FeaturedIdeas";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <SizePicker />
      <FeaturedIdeas />
    </>
  );
}
