import { storeConfig } from "@/config/store";

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(storeConfig.locale, {
    style: "currency",
    currency: storeConfig.currency,
  }).format(amount);
}

export function feedPrice(amount: number): string {
  return `${amount.toFixed(2)} ${storeConfig.currency}`;
}

export function schemaPrice(amount: number): string {
  return amount.toFixed(2);
}
