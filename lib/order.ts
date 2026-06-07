import { CONTACT, SITE, fmt } from "@/lib/site";
import { Size } from "@/lib/sizes";
import { GlazeLevel } from "@/lib/glazes";
import { ToppingSelection, toppingsPrice, toppingsLabel, toppingsCount } from "@/lib/toppings";

export type Customer = {
  name: string;
  phone: string;
  address: string;
  notes?: string;
};

export type CartLine = {
  id: string;
  size: Size;
  toppings: ToppingSelection;
  qty: number;
};

export function lineUnitPrice(line: CartLine): number {
  return line.size.price + toppingsPrice(line.toppings);
}

export function lineSubtotal(line: CartLine): number {
  return lineUnitPrice(line) * line.qty;
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
  const lines = [
    `• ${line.qty}× ${line.size.name} — ${fmt(lineSubtotal(line))}`,
  ];
  if (toppingsCount(line.toppings) > 0) {
    if (line.toppings.sauces.length > 0) {
      lines.push(`   Sauce: ${line.toppings.sauces.map(s => s.name).join(", ")}`);
    }
    if (line.toppings.nuts.length > 0) {
      lines.push(`   Nuts: ${line.toppings.nuts.map(n => n.name).join(", ")}`);
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
    `Address: ${order.customer.address}`,
    order.customer.notes ? `Notes: ${order.customer.notes}` : null,
    ``,
    `_${CONTACT.deliveryNote}_`,
  ].filter(Boolean).join("\n");

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
      lines.push(`Sauce: ${order.toppings.sauces.map(s => s.name).join(", ")}`);
    }
    if (order.toppings.nuts.length > 0) {
      lines.push(`Nuts: ${order.toppings.nuts.map(n => n.name).join(", ")}`);
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
    lines.push(`Sauce: ${order.toppings.sauces.map(s => s.name).join(", ")}`);
  }
  if (order.toppings.nuts.length > 0) {
    lines.push(`Nuts: ${order.toppings.nuts.map(n => n.name).join(", ")}`);
  }
  lines.push(`Weekly: ${fmt(order.weeklyTotal)}`);
  return `${lines.join("\n")}\n${customer}`;
}

/** Build a wa.me URL with the message pre-filled. */
export function whatsappUrl(order: Order): string {
  const phone = CONTACT.whatsappNumber.replace(/[^\d]/g, "");
  const text  = encodeURIComponent(buildMessage(order));
  return `https://wa.me/${phone}?text=${text}`;
}

export type FieldErrors = Partial<Record<keyof Customer, string>>;

export function validateCustomer(c: Customer): FieldErrors {
  const errs: FieldErrors = {};
  if (c.name.trim().length < 2) {
    errs.name = "Please enter your name.";
  }
  const digits = c.phone.replace(/\D/g, "");
  if (digits.length < 6) {
    errs.phone = "Enter a valid phone number.";
  }
  if (c.address.trim().length < 5) {
    errs.address = "Please enter a delivery address.";
  }
  return errs;
}

export function isCustomerValid(c: Customer): boolean {
  return Object.keys(validateCustomer(c)).length === 0;
}

// silence unused — kept available for callers
export { toppingsLabel };
