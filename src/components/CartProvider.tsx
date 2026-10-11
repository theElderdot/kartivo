"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductBySku } from "@/data/catalog";
import {
  CART_STORAGE_KEY,
  addLine,
  cartCount,
  clampQuantity,
  isCartLine,
  quantityCap,
  removeLine,
  setLineQuantity,
  type CartLine,
} from "@/lib/cart";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  ready: boolean;
  add: (sku: string, quantity: number) => void;
  setQuantity: (sku: string, quantity: number) => void;
  remove: (sku: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine).map((line) => ({
      sku: line.sku,
      quantity: clampQuantity(line.quantity, quantityCap(getProductBySku(line.sku)?.stockQuantity ?? null)),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readStoredCart());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      ready,
      add: (sku, quantity) =>
        setLines((current) =>
          addLine(current, sku, quantity, quantityCap(getProductBySku(sku)?.stockQuantity ?? null)),
        ),
      setQuantity: (sku, quantity) =>
        setLines((current) =>
          setLineQuantity(
            current,
            sku,
            quantity,
            quantityCap(getProductBySku(sku)?.stockQuantity ?? null),
          ),
        ),
      remove: (sku) => setLines((current) => removeLine(current, sku)),
    }),
    [lines, ready],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
