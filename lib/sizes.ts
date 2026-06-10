import config from "@/config/nomi.json";

export type SizeId = string;

export type Size = {
  id: SizeId;
  name: string;
  tagline: string;
  description: string;
  price: number;
  minQty?: number;
  diameterCm: number;
  weightG: number;
  compareTo: string;
  color: string;
  ring: string;
  emoji: string;
};

export const SIZES: Size[] = config.sizes as Size[];
export const DEFAULT_SIZE = SIZES[0];
export const DEFAULT_SIZE_ID = DEFAULT_SIZE.id;

export const getSize = (id: SizeId) =>
  SIZES.find((s) => s.id === id) ?? DEFAULT_SIZE;

export const minQtyForSize = (size: Size) =>
  size.minQty ?? config.order.minRolls;
