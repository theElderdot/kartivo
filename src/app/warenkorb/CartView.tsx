"use client";

import Image from "next/image";
import Link from "next/link";
import { PaymentNote, ShippingNote, TaxNote } from "@/components/CommerceNotes";
import { useCart } from "@/components/CartProvider";
import { getProductBySku } from "@/data/catalog";
import { orderShippingEur } from "@/lib/commerce";
import { quantityCap } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { lines, ready, setQuantity, remove } = useCart();
  const rows = lines
    .map((line) => {
      const product = getProductBySku(line.sku);
      if (!product) return null;
      return { line, product, amount: product.price * line.quantity };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  const subtotal = rows.reduce((sum, row) => sum + row.amount, 0);
  const shipping = orderShippingEur(subtotal);

  if (!ready) {
    return <p>Warenkorb wird geladen.</p>;
  }

  if (rows.length === 0) {
    return (
      <>
        <p>Dein Warenkorb ist leer.</p>
        <Link className="button button-dark" href="/shop">
          Boards entdecken
        </Link>
      </>
    );
  }

  return (
    <>
      <ul className="cart-list">
        {rows.map(({ line, product, amount }) => (
          <li key={line.sku} className="cart-line">
            <div className="cart-thumb">
              <Image src={product.image} alt="" fill sizes="96px" />
            </div>
            <div>
              <h2>
                <Link href={`/products/${product.slug}`}>{product.name}</Link>
              </h2>
              <p>{formatPrice(product.price)}</p>
              <p className="fine">Zeilensumme: {formatPrice(amount)}</p>
            </div>
            <div className="line-actions">
              <label className="sr-only" htmlFor={`qty-${line.sku}`}>
                Menge für {product.name}
              </label>
              <input
                id={`qty-${line.sku}`}
                className="line-qty"
                type="number"
                min={1}
                max={quantityCap(product.stockQuantity)}
                value={line.quantity}
                onChange={(event) => setQuantity(line.sku, Number(event.target.value))}
              />
              <button className="text-button" type="button" onClick={() => remove(line.sku)}>
                Entfernen
              </button>
            </div>
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
        <p className="fine">
          Versand ist für diese Bestellung ausgewiesen. Die Mehrwertsteuer ist noch nicht
          gesondert bestätigt, und es wird keine Zahlung ausgeführt.
        </p>
        <PaymentNote />
        <Link className="button button-dark" href="/kasse">
          Zur Kasse
        </Link>
      </div>
    </>
  );
}
