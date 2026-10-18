"use client";

import Link from "next/link";
import { PaymentNote, ShippingNote, TaxNote } from "@/components/CommerceNotes";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { storeConfig } from "@/config/store";
import { getProductBySku } from "@/data/catalog";
import { trackPurchaseConversion } from "@/lib/ads";
import { isPurchasable, orderShippingEur } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";

/** Runs only after a payment provider returns a paid order id and total. */
export function confirmPaidOrder(order: {
  transactionId: string;
  valueEur: number;
  newCustomer?: boolean;
}) {
  trackPurchaseConversion(order);
}

export function CheckoutView() {
  const { lines, ready } = useCart();
  const [result, setResult] = useState("");
  const rows = lines
    .map((line) => {
      const product = getProductBySku(line.sku);
      if (!product) return null;
      return { line, product, amount: product.price * line.quantity };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);
  const subtotal = rows.reduce((sum, row) => sum + row.amount, 0);
  const shipping = orderShippingEur(subtotal);
  const canOrder = rows.length > 0 && rows.every(({ product }) => isPurchasable(product));

  if (!ready) return <p>Kasse wird geladen.</p>;

  if (rows.length === 0) {
    return (
      <>
        <p>Die Kasse ist leer.</p>
        <Link href="/shop">Zum Shop</Link>
      </>
    );
  }

  return (
    <>
      <ul className="check-list">
        {rows.map(({ line, product, amount }) => (
          <li key={line.sku} className="check-box">
            <div>
              <strong>{product.name}</strong>
              <p className="fine">
                {line.quantity} × {formatPrice(product.price)}
              </p>
            </div>
            <p>{formatPrice(amount)}</p>
          </li>
        ))}
      </ul>
      <div className="summary">
        <p>
          <strong>Zwischensumme der Katalogpreise: {formatPrice(subtotal)}</strong>
        </p>
        <p>
          <strong>
            Versand nach Deutschland: {shipping == null ? "offen" : formatPrice(shipping)}
          </strong>
        </p>
        <TaxNote />
        <ShippingNote goodsSubtotal={subtotal} />
        <PaymentNote />
        <p className="status-note">
          {storeConfig.payment.configured
            ? "Ein Anbieter ist markiert, aber dieser Ablauf nimmt noch keine Zahlung entgegen."
            : "Zahlung nicht konfiguriert. Es wird keine Bestellung und keine Zahlung ausgeführt."}
        </p>
        <button
          className="button button-dark"
          type="button"
          disabled={!canOrder}
          onClick={() => {
            setResult("Keine Zahlung ausgeführt. Ein Zahlungsablauf ist nicht angebunden.");
          }}
        >
          Bestellung nicht möglich
        </button>
        <p role="status">{result}</p>
      </div>
    </>
  );
}
