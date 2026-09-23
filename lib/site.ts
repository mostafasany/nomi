import config from "@/config/nomi.json";

export const SITE         = config.brand;
export const CONTACT      = config.contact;
export const ORDER_CFG    = config.order;
export const DELIVERY     = config.delivery;
export const GALLERY      = config.gallery;
export const SUBSCRIPTION = config.subscription;

export const fmt = (n: number) =>
  `${SITE.currency}${Number.isInteger(n) ? n : n.toFixed(2)}`;
