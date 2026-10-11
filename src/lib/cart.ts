export type CartLine = {
  sku: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "kartivo.cart.v1";
export const MAX_CART_QUANTITY = 10;

/** Highest quantity one cart line may hold. Confirmed stock wins over the cart ceiling. */
export function quantityCap(stockQuantity: number | null): number {
  if (stockQuantity == null) return MAX_CART_QUANTITY;
  return Math.max(1, Math.min(MAX_CART_QUANTITY, Math.floor(stockQuantity)));
}

export function clampQuantity(quantity: number, cap = MAX_CART_QUANTITY): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.min(Math.max(1, cap), Math.floor(quantity)));
}

export function addLine(
  lines: readonly CartLine[],
  sku: string,
  quantity: number,
  cap = MAX_CART_QUANTITY,
): CartLine[] {
  const nextQuantity = clampQuantity(quantity, cap);
  const existing = lines.find((line) => line.sku === sku);
  if (!existing) return [...lines, { sku, quantity: nextQuantity }];
  return lines.map((line) =>
    line.sku === sku
      ? { ...line, quantity: clampQuantity(line.quantity + nextQuantity, cap) }
      : line,
  );
}

export function setLineQuantity(
  lines: readonly CartLine[],
  sku: string,
  quantity: number,
  cap = MAX_CART_QUANTITY,
): CartLine[] {
  return lines.map((line) =>
    line.sku === sku ? { ...line, quantity: clampQuantity(quantity, cap) } : line,
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
