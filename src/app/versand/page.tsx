import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { storeConfig } from "@/config/store";
import { formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Versand und Lieferung",
  description:
    "Kostenloser Versand von KARTIVO innerhalb Deutschlands. Lieferung in der Regel in 3–8 Werktagen.",
  path: "/versand",
});

export default function ShippingPage() {
  const shipping = storeConfig.shipping;

  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Service</p>
      <h1>Versand und Lieferung</h1>
      <p>
        Diese Regeln gelten für Bestellungen auf kartivo.de. Sie sind die Angaben, die auch im
        Produktfeed für Google Merchant Center stehen.
      </p>
      <h2>Liefergebiet</h2>
      <p>
        Wir versenden an Adressen in Deutschland. Ein Versand ins Ausland, an Packstationen oder
        an Orte ohne reguläre Straßenzustellung ist nicht angeboten.
      </p>
      <h2>Versandkosten</h2>
      <p>
        Jede Bestellung nach Deutschland kostet {formatPrice(0)} Versand. Es gibt keinen
        Mindestwarenwert und keine Versandpauschale.
      </p>
      <p>
        Das gilt für eine Sendung. Ein Surfboard ist Langgut und wird nicht als kleines
        Standardpaket verschickt.
      </p>
      <h2>Bearbeitung</h2>
      <p>
        Werktage sind Montag bis Freitag, ohne gesetzliche Feiertage am Versandort in Deutschland.
        Bestellungen, die an einem Werktag bis {shipping.cutoff} Uhr ({shipping.timezone}) eingehen,
        werden an diesem Tag in die Bearbeitung genommen. Spätere Bestellungen und Bestellungen am
        Samstag oder Sonntag beginnen am nächsten Werktag.
      </p>
      <p>
        Die Bearbeitung dauert {shipping.handlingMinDays}–{shipping.handlingMaxDays} Werktage, bis
        die Sendung dem Versanddienstleister übergeben wird.
      </p>
      <h2>Transport</h2>
      <p>
        Der Transport innerhalb Deutschlands dauert danach {shipping.transitMinDays}–
        {shipping.transitMaxDays} Werktage. Die voraussichtliche Gesamtzeit ist die Summe daraus,
        in der Regel 3–8 Werktage nach dem Beginn der Bearbeitung.
      </p>
      <h2>Versandort</h2>
      <p>Versand aus {shipping.origin}. Eine Straße des Lagers ist noch nicht veröffentlicht.</p>
      <h2>Sendungsverfolgung</h2>
      <p>
        Wenn der Versanddienstleister eine Sendungsnummer vergibt, teilen wir sie mit. Es gibt
        keinen eigenen Kurier.
      </p>
      <LegalReviewNotice
        topics={[
          "Preisangabenverordnung: die Versandkosten stehen vor einer Bestellung auf der Produktseite, im Warenkorb und an der Kasse",
          "Fernabsatz: Liefergebiet und Fristen müssen zum tatsächlichen Versandablauf passen",
          "Google Merchant Center: dieselben Zeiten und Kosten im Versanddienst hinterlegen",
        ]}
      />
    </div>
  );
}
