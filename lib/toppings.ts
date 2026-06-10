import config from "@/config/nomi.json";

export type Topping = {
  id: string;
  name: string;
  price: number;
  emoji?: string;
};

export type ToppingGroup = "sauces" | "nuts";

export const SAUCES: Topping[] = config.toppings.sauces;
export const EXTRA_SAUCES: Topping[] = config.extras.sauces;
export const NUTS: Topping[] = config.extras.nuts;

export const TOPPING_GROUPS: Array<{
  key: ToppingGroup;
  label: string;
  options: Topping[];
}> = [
  { key: "sauces", label: "Sauces", options: SAUCES },
  { key: "nuts", label: "Nuts", options: NUTS },
];

export type QuantitySelection = {
  topping: Topping;
  qty: number;
};

export type ToppingSelection = {
  sauces: Topping[];
  nuts: QuantitySelection[];
  extraSauces: QuantitySelection[];
};

export const noToppings: ToppingSelection = {
  sauces: [],
  nuts: [],
  extraSauces: [],
};

export function saucesPrice(t: ToppingSelection): number {
  return t.sauces.reduce((sum, x) => sum + x.price, 0);
}

export function nutsPrice(t: ToppingSelection): number {
  return t.nuts.reduce((sum, x) => sum + x.topping.price * x.qty, 0);
}

export function extraSaucesPrice(t: ToppingSelection): number {
  return (t.extraSauces ?? []).reduce(
    (sum, x) => sum + x.topping.price * x.qty,
    0,
  );
}

export function addonsPrice(t: ToppingSelection): number {
  return nutsPrice(t) + extraSaucesPrice(t);
}

export function toppingsPrice(t: ToppingSelection): number {
  return saucesPrice(t) + addonsPrice(t);
}

export function toppingsCount(t: ToppingSelection): number {
  return (
    t.sauces.length +
    t.nuts.reduce((sum, x) => sum + x.qty, 0) +
    (t.extraSauces ?? []).reduce((sum, x) => sum + x.qty, 0)
  );
}

/** Short human label, e.g. "Caramel + Pecan". Empty string if no toppings. */
export function toppingsLabel(t: ToppingSelection): string {
  const sauces = t.sauces.map((x) => x.name);
  const nuts = t.nuts.map((x) => `${x.qty}x ${x.topping.name}`);
  const extraSauces = (t.extraSauces ?? []).map(
    (x) => `${x.qty}x extra ${x.topping.name}`,
  );
  const all = [...sauces, ...nuts, ...extraSauces];
  return all.join(" + ");
}
