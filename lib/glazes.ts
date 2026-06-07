export type GlazeLevel = {
  id: "light" | "standard" | "drown";
  name: string;
  surcharge: number;
  description: string;
};

export const GLAZE_LEVELS: GlazeLevel[] = [
  { id: "light",    name: "Light",       surcharge: 0,    description: "A polite drizzle." },
  { id: "standard", name: "Standard",    surcharge: 0,    description: "How we make it. Trust us." },
  { id: "drown",    name: "Nomi Drown",  surcharge: 1.5,  description: "Bring a fork. And a bib." },
];

export const ROULETTE_GLAZES = [
  "Maple Brown Butter",
  "Cream Cheese Classic",
  "Espresso Glaze",
  "Salted Caramel",
  "Vanilla Bean",
  "Pistachio Rose",
  "Dark Chocolate Drip",
  "Lemon Glaze",
];
