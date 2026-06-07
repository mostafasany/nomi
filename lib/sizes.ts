import config from "@/config/nomi.json";

export type SizeId = "bites" | "medium" | "large";

export type Size = {
  id: SizeId;
  name: string;
  tagline: string;
  description: string;
  price: number;
  diameterCm: number;
  weightG: number;
  compareTo: string;
  color: string;
  ring: string;
  emoji: string;
};

export const SIZES: Size[] = config.sizes as Size[];

export const getSize = (id: SizeId) => SIZES.find(s => s.id === id)!;
