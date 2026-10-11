import Link from "next/link";
import { storeConfig } from "@/config/store";
import { orderShippingEur } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";

export function TaxNote() {
  const tax = storeConfig.tax;
  if (tax.confirmed && tax.pricesIncludeVat !== null && tax.vatRate !== null) {
    const rate = new Intl.NumberFormat(storeConfig.locale, {
      style: "percent",
      maximumFractionDigits: 2,
    }).format(tax.vatRate);
    return (
      <p className="fine">
        {tax.pricesIncludeVat ? `inkl. ${rate} MwSt.` : `zzgl. ${rate} MwSt.`}
      </p>
    );
  }
  return (
    <p className="fine">
      Katalogpreis in Euro. Der Steuerstatus ist noch nicht bestätigt, deshalb wird die
      Mehrwertsteuer hier weder als enthalten noch als ausgeschlossen ausgewiesen.
    </p>
  );
}

export function ShippingNote({ goodsSubtotal }: { goodsSubtotal?: number }) {
  const shipping = storeConfig.shipping;
  if (!shipping.confirmed) {
    return (
      <p className="fine">
        Versandkosten, Liefergebiet und Lieferzeit sind noch nicht hinterlegt. Sie werden
        angezeigt, bevor eine Bestellung möglich ist.{" "}
        <Link href="/versand">Versand und Lieferung</Link>
      </p>
    );
  }
  const cost = goodsSubtotal == null ? null : orderShippingEur(goodsSubtotal);
  return (
    <p className="fine">
      {cost != null ? <>Versand nach Deutschland: {formatPrice(cost)}. </> : null}
      {shipping.chargesSummary} Lieferzeit: {shipping.deliveryEstimate}{" "}
      <Link href="/versand">Versand und Lieferung</Link>
    </p>
  );
}

export function PaymentNote() {
  if (!storeConfig.payment.configured) {
    return (
      <p className="fine">
        Es ist kein Zahlungsanbieter angebunden. Zahlungsdaten werden auf dieser Website nicht
        erfasst, und es wird keine Bestellung ausgeführt.
      </p>
    );
  }
  return (
    <p className="fine">
      Zahlung über {storeConfig.payment.providerName}. Der zu zahlende Betrag einschließlich der
      ausgewiesenen Nebenkosten steht vor dem Absenden fest.
    </p>
  );
}
