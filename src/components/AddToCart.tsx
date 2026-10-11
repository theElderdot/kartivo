"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { MAX_CART_QUANTITY } from "@/lib/cart";

export function AddToCart({
  sku,
  purchasable,
}: {
  sku: string;
  purchasable: boolean;
}) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <form
      className="buy-form"
      onSubmit={(event) => {
        event.preventDefault();
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
          max={MAX_CART_QUANTITY}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />
      </label>
      <button className="button" type="submit">
        In den Warenkorb
      </button>
      <p role="status" className="fine">
        {message}
      </p>
      {purchasable ? null : (
        <p className="fine">
          Eine Bestellung kann erst abgeschlossen werden, wenn Bestand, Versand, Steuer und
          Zahlung bestätigt sind.
        </p>
      )}
    </form>
  );
}
