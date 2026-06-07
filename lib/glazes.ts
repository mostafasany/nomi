import config from "@/config/nomi.json";

export type GlazeLevel = {
  id: "light" | "standard" | "drown";
  name: string;
  surcharge: number;
  description: string;
};

export const GLAZE_LEVELS: GlazeLevel[] = config.glazes.levels as GlazeLevel[];

export const ROULETTE_GLAZES: string[] = config.glazes.rouletteOptions;
