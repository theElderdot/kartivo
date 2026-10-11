export type CartLine = {
  sku: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "kartivo.cart.v1";
export const MAX_CART_QUANTITY = 10;

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.min(MAX_CART_QUANTITY, Math.floor(quantity)));
}

export function addLine(lines: readonly CartLine[], sku: string, quantity: number): CartLine[] {
  const nextQuantity = clampQuantity(quantity);
  const existing = lines.find((line) => line.sku === sku);
  if (!existing) return [...lines, { sku, quantity: nextQuantity }];
  return lines.map((line) =>
    line.sku === sku
      ? { ...line, quantity: Math.min(MAX_CART_QUANTITY, line.quantity + nextQuantity) }
      : line,
  );
}

export function setLineQuantity(lines: readonly CartLine[], sku: string, quantity: number): CartLine[] {
  return lines.map((line) =>
    line.sku === sku ? { ...line, quantity: clampQuantity(quantity) } : line,
  );
}

export function removeLine(lines: readonly CartLine[], sku: string): CartLine[] {
  return lines.filter((line) => line.sku !== sku);
}

export function cartCount(lines: readonly CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as { sku?: unknown; quantity?: unknown };
  return typeof line.sku === "string" && line.sku.length > 0 && typeof line.quantity === "number";
}
