import { CONTACT, SITE, fmt } from "@/lib/site";
import { Size } from "@/lib/sizes";
import { GlazeLevel } from "@/lib/glazes";

export type Customer = {
  name: string;
  phone: string;
  address: string;
  notes?: string;
};

export type BoxOrder = {
  kind: "box";
  items: Array<{ size: Size; qty: number }>;
  glaze: GlazeLevel;
  subtotal: number;
  glazeFee: number;
  total: number;
  customer: Customer;
};

export type GiftOrder = {
  kind: "gift";
  size: Size;
  recipient: string;
  note: string;
  customer: Customer;
};

export type SubOrder = {
  kind: "subscription";
  size: Size;
  qtyPerWeek: number;
  day: string;
  weeklyTotal: number;
  customer: Customer;
};

export type Order = BoxOrder | GiftOrder | SubOrder;

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
    const items = order.items
      .filter(i => i.qty > 0)
      .map(i => `• ${i.qty}× ${i.size.name} — ${fmt(i.size.price * i.qty)}`)
      .join("\n");
    const body = [
      header,
      ``,
      `*Box*`,
      items || "(empty)",
      ``,
      `Glaze: ${order.glaze.name}`,
      `Subtotal: ${fmt(order.subtotal)}`,
      `Glaze surcharge: ${fmt(order.glazeFee)}`,
      `*Total: ${fmt(order.total)}*`,
    ].join("\n");
    return `${body}\n${customer}`;
  }

  if (order.kind === "gift") {
    const body = [
      header,
      ``,
      `*Gift*`,
      `Size: ${order.size.name} (${fmt(order.size.price)})`,
      `For: ${order.recipient}`,
      `Note: ${order.note}`,
    ].join("\n");
    return `${body}\n${customer}`;
  }

  // subscription
  const body = [
    header,
    ``,
    `*Subscription — Weekly Roll Call*`,
    `${order.qtyPerWeek}× ${order.size.name} every ${order.day}`,
    `Weekly: ${fmt(order.weeklyTotal)}`,
  ].join("\n");
  return `${body}\n${customer}`;
}

/** Build a wa.me URL with the message pre-filled. */
export function whatsappUrl(order: Order): string {
  const phone = CONTACT.whatsappNumber.replace(/[^\d]/g, "");
  const text  = encodeURIComponent(buildMessage(order));
  return `https://wa.me/${phone}?text=${text}`;
}

/** True only when all required customer fields look reasonable. */
export function isCustomerValid(c: Customer): boolean {
  return (
    c.name.trim().length    > 1 &&
    c.phone.trim().length   > 5 &&
    c.address.trim().length > 4
  );
}
