export type SizeId = "bites" | "medium" | "large";

export type Size = {
  id: SizeId;
  name: string;          // "Bites"
  tagline: string;       // "The Snack Attack"
  description: string;
  price: number;         // single-unit price, USD
  diameterCm: number;
  weightG: number;
  compareTo: string;     // "Roughly a golf ball"
  color: string;         // tailwind class, e.g. "bg-accent"
  ring: string;          // tailwind class, e.g. "ring-accent"
  emoji: string;
};

export const SIZES: Size[] = [
  {
    id: "bites",
    name: "Bites",
    tagline: "The Snack Attack",
    description: "Pop-able, shareable, dangerous in groups of 6+.",
    price: 2.5,
    diameterCm: 4,
    weightG: 35,
    compareTo: "Roughly a golf ball.",
    color: "bg-accent",
    ring: "ring-accent",
    emoji: "·",
  },
  {
    id: "medium",
    name: "Medium",
    tagline: "The Classic",
    description: "The solo indulgence. One roll, one happy human.",
    price: 5.5,
    diameterCm: 9,
    weightG: 110,
    compareTo: "Roughly a tennis ball.",
    color: "bg-caramel",
    ring: "ring-caramel",
    emoji: "○",
  },
  {
    id: "large",
    name: "Large",
    tagline: "The Showstopper",
    description: "Centerpiece energy. Built for sharing or… not.",
    price: 9.5,
    diameterCm: 14,
    weightG: 240,
    compareTo: "Roughly a softball.",
    color: "bg-cinnamon",
    ring: "ring-cinnamon",
    emoji: "◎",
  },
];

export const getSize = (id: SizeId) => SIZES.find(s => s.id === id)!;
