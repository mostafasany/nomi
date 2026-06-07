import config from "@/config/nomi.json";

export type Topping = {
  id: string;
  name: string;
  price: number;
  emoji?: string;
};

export type ToppingGroup = "sauces" | "nuts";

export const SAUCES: Topping[] = config.toppings.sauces;
export const NUTS:   Topping[] = config.toppings.nuts;

export const TOPPING_GROUPS: Array<{ key: ToppingGroup; label: string; options: Topping[] }> = [
  { key: "sauces", label: "Sauces", options: SAUCES },
  { key: "nuts",   label: "Nuts",   options: NUTS   },
];

export type ToppingSelection = {
  sauces: Topping[];
  nuts:   Topping[];
};

export const noToppings: ToppingSelection = { sauces: [], nuts: [] };

export function toppingsPrice(t: ToppingSelection): number {
  return [...t.sauces, ...t.nuts].reduce((sum, x) => sum + x.price, 0);
}

export function toppingsCount(t: ToppingSelection): number {
  return t.sauces.length + t.nuts.length;
}

/** Short human label, e.g. "Caramel + Pecan". Empty string if no toppings. */
export function toppingsLabel(t: ToppingSelection): string {
  const all = [...t.sauces, ...t.nuts].map(x => x.name);
  return all.join(" + ");
}
