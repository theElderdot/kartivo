import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { MissingValue } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Versand und Lieferung",
  description: "Versandbedingungen von KARTIVO. Kosten und Lieferzeiten stehen noch nicht fest.",
  path: "/versand",
});

function Value({ value, missing }: { value: string | null; missing: string }) {
  return value && value.trim() ? <>{value}</> : <MissingValue>{missing}</MissingValue>;
}

export default function ShippingPage() {
  const shipping = storeConfig.shipping;
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Service</p>
      <h1>Versand und Lieferung</h1>
      <p>
        Eine Bestellung wird erst möglich, wenn die folgenden Punkte bestätigt und vor dem
        Abschluss sichtbar sind.
      </p>
      {!shipping.confirmed ? (
        <p className="status-note">Die Versandregeln sind noch nicht bestätigt.</p>
      ) : null}
      <h2>Liefergebiet</h2>
      <p>
        <Value value={shipping.countries?.join(", ") ?? null} missing="Länder eintragen" />
      </p>
      <h2>Versandkosten</h2>
      <p>
        <Value value={shipping.chargesSummary} missing="Konkrete Versandkosten eintragen" />
      </p>
      <h2>Lieferzeit</h2>
      <p>
        <Value value={shipping.deliveryEstimate} missing="Lieferzeit eintragen" />
      </p>
      <h2>Versandort</h2>
      <p>
        <Value value={shipping.origin} missing="Versandort eintragen" />
      </p>
      <h2>Bearbeitungszeit</h2>
      <p>
        <Value value={shipping.processingTime} missing="Bearbeitungszeit eintragen" />
      </p>
      <h2>Sendungsverfolgung</h2>
      <p>
        {shipping.trackingAvailable === null ? (
          <MissingValue>Angabe zur Sendungsverfolgung fehlt</MissingValue>
        ) : shipping.trackingAvailable ? (
          "Eine Sendungsverfolgung ist vorgesehen."
        ) : (
          "Eine Sendungsverfolgung ist nicht vorgesehen."
        )}
      </p>
      <h2>Kostenloser Versand</h2>
      <p>
        {shipping.freeShippingFromEur != null && shipping.confirmed
          ? `Kostenloser Versand ab ${shipping.freeShippingFromEur.toFixed(2)} EUR, sofern das in den bestätigten Regeln steht.`
          : "Es gilt derzeit kein kostenloser Versand. Der Beispielsatz „Kostenloser Versand ab 100 €“ ist nicht freigeschaltet."}
      </p>
      <LegalReviewNotice
        topics={[
          "Preisangabenverordnung: Versandkosten vor der Bestellung ausweisen",
          "Fernabsatz: Lieferbeschränkungen und Fristen verständlich nennen",
          "Keine Lieferzusage veröffentlichen, die der Betrieb nicht hält",
        ]}
      />
    </div>
  );
}
