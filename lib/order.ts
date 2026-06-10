import { GlazeLevel } from "@/lib/glazes";
import { CONTACT, SITE, fmt } from "@/lib/site";
import { Size } from "@/lib/sizes";
import {
  Topping,
  ToppingSelection,
  addonsPrice,
  saucesPrice,
  toppingsCount,
  toppingsLabel,
  toppingsPrice,
} from "@/lib/toppings";

export type Customer = {
  name: string;
  phone: string;
  address: string;
  notes?: string;
};

export type RollCartLine = {
  id: string;
  type: "roll";
  size: Size;
  toppings: ToppingSelection;
  qty: number;
};

export type AddonCartLine = {
  id: string;
  type: "addon";
  addonKind: "nuts" | "extraSauces";
  topping: Topping;
  qty: number;
};

export type CartLine = RollCartLine | AddonCartLine;

export function isRollLine(line: CartLine): line is RollCartLine {
  return line.type === "roll";
}

export function isAddonLine(line: CartLine): line is AddonCartLine {
  return line.type === "addon";
}

export function lineUnitPrice(line: CartLine): number {
  if (isAddonLine(line)) return line.topping.price;
  return line.size.price + saucesPrice(line.toppings);
}

export function lineSubtotal(line: CartLine): number {
  if (isAddonLine(line)) return lineUnitPrice(line) * line.qty;
  return lineUnitPrice(line) * line.qty + addonsPrice(line.toppings);
}

function nutsLabel(toppings: ToppingSelection): string {
  return toppings.nuts.map((n) => `${n.qty}x ${n.topping.name}`).join(", ");
}

function extraSaucesLabel(toppings: ToppingSelection): string {
  return (toppings.extraSauces ?? [])
    .map((sauce) => `${sauce.qty}x ${sauce.topping.name}`)
    .join(", ");
}

export type BoxOrder = {
  kind: "box";
  lines: CartLine[];
  glaze: GlazeLevel;
  subtotal: number;
  glazeFee: number;
  total: number;
  customer: Customer;
};

export type GiftOrder = {
  kind: "gift";
  size: Size;
  toppings: ToppingSelection;
  recipient: string;
  note: string;
  customer: Customer;
};

export type SubOrder = {
  kind: "subscription";
  size: Size;
  toppings: ToppingSelection;
  qtyPerWeek: number;
  day: string;
  weeklyTotal: number;
  customer: Customer;
};

export type Order = BoxOrder | GiftOrder | SubOrder;

function formatLine(line: CartLine): string {
  if (isAddonLine(line)) {
    return `• ${line.qty}× Extras box: ${line.topping.name} — ${fmt(lineSubtotal(line))}`;
  }

  const lines = [
    `• ${line.qty}× ${line.size.name} — ${fmt(lineSubtotal(line))}`,
  ];
  if (toppingsCount(line.toppings) > 0) {
    if (line.toppings.sauces.length > 0) {
      lines.push(
        `   Sauce: ${line.toppings.sauces.map((s) => s.name).join(", ")}`,
      );
    }
    if (line.toppings.nuts.length > 0) {
      lines.push(`   Nuts: ${nutsLabel(line.toppings)}`);
    }
    if ((line.toppings.extraSauces ?? []).length > 0) {
      lines.push(`   Extra sauces: ${extraSaucesLabel(line.toppings)}`);
    }
  }
  return lines.join("\n");
}

/** Build a human-readable WhatsApp message for an order. */
export function buildMessage(order: Order): string {
  const header = `*New ${SITE.name} Order*`;
  const customer = [
    ``,
    `*Customer*`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    order.customer.address.trim() ? `Address: ${order.customer.address}` : null,
    order.customer.notes ? `Notes: ${order.customer.notes}` : null,
    ``,
    `_${CONTACT.deliveryNote}_`,
  ]
    .filter(Boolean)
    .join("\n");

  if (order.kind === "box") {
    const body = [
      header,
      ``,
      `*Box*`,
      order.lines.length > 0
        ? order.lines.map(formatLine).join("\n")
        : "(empty)",
      ``,
      `Glaze: ${order.glaze.name}`,
      `Subtotal: ${fmt(order.subtotal)}`,
      `Glaze surcharge: ${fmt(order.glazeFee)}`,
      `*Total: ${fmt(order.total)}*`,
    ].join("\n");
    return `${body}\n${customer}`;
  }

  if (order.kind === "gift") {
    const lines = [
      header,
      ``,
      `*Gift*`,
      `Size: ${order.size.name} (${fmt(order.size.price + toppingsPrice(order.toppings))})`,
    ];
    if (order.toppings.sauces.length > 0) {
      lines.push(
        `Sauce: ${order.toppings.sauces.map((s) => s.name).join(", ")}`,
      );
    }
    if (order.toppings.nuts.length > 0) {
      lines.push(`Nuts: ${nutsLabel(order.toppings)}`);
    }
    if ((order.toppings.extraSauces ?? []).length > 0) {
      lines.push(`Extra sauces: ${extraSaucesLabel(order.toppings)}`);
    }
    lines.push(`For: ${order.recipient}`);
    lines.push(`Note: ${order.note}`);
    return `${lines.join("\n")}\n${customer}`;
  }

  // subscription
  const lines = [
    header,
    ``,
    `*Subscription — Weekly Roll Call*`,
    `${order.qtyPerWeek}× ${order.size.name} every ${order.day}`,
  ];
  if (order.toppings.sauces.length > 0) {
    lines.push(`Sauce: ${order.toppings.sauces.map((s) => s.name).join(", ")}`);
  }
  if (order.toppings.nuts.length > 0) {
    lines.push(`Nuts: ${nutsLabel(order.toppings)}`);
  }
  if ((order.toppings.extraSauces ?? []).length > 0) {
    lines.push(`Extra sauces: ${extraSaucesLabel(order.toppings)}`);
  }
  lines.push(`Weekly: ${fmt(order.weeklyTotal)}`);
  return `${lines.join("\n")}\n${customer}`;
}

/** Build a wa.me URL with the message pre-filled. */
export function whatsappUrl(order: Order): string {
  const phone = CONTACT.whatsappNumber.replace(/[^\d]/g, "");
  const text = encodeURIComponent(buildMessage(order));
  return `https://wa.me/${phone}?text=${text}`;
}

export type FieldErrors = Partial<Record<keyof Customer, string>>;

export function validateCustomer(_c: Customer): FieldErrors {
  return {};
}

export function isCustomerValid(c: Customer): boolean {
  return Object.keys(validateCustomer(c)).length === 0;
}

// silence unused — kept available for callers
export { toppingsLabel };
