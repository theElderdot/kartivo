"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { getProductBySku } from "@/data/catalog";
import { canAddToCart } from "@/lib/commerce";
import { quantityCap } from "@/lib/cart";

export function AddToCart({
  sku,
  purchasable,
}: {
  sku: string;
  purchasable: boolean;
}) {
  const { add } = useCart();
  const product = getProductBySku(sku);
  const stocked = product ? canAddToCart(product) : false;
  const maxQuantity = quantityCap(product?.stockQuantity ?? null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <form
      className="buy-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!stocked) {
          setMessage("Kein bestätigter Bestand. Der Artikel bleibt außerhalb des Warenkorbs.");
          return;
        }
        add(sku, quantity);
        setMessage("In den Warenkorb gelegt.");
      }}
    >
      <label htmlFor={`menge-${sku}`}>
        Menge
        <input
          id={`menge-${sku}`}
          type="number"
          min={1}
          max={stocked ? maxQuantity : 1}
          value={quantity}
          disabled={!stocked}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </label>
      <button className="button" type="submit" disabled={!stocked}>
        In den Warenkorb
      </button>
      <p role="status" className="fine">
        {message}
      </p>
      {stocked ? null : (
        <p className="fine">
          Bestand ist nicht bestätigt. Dieses Konzept wird nicht in den Warenkorb gelegt und nicht
          verkauft.
        </p>
      )}
      {stocked && !purchasable ? (
        <p className="fine">
          Eine Bestellung kann erst abgeschlossen werden, wenn Steuer und Zahlung bestätigt
          sind. Versand und Bestand sind bereits hinterlegt.
        </p>
      ) : null}
    </form>
  );
}
