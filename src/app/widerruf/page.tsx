import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { MissingValue } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Widerrufsbelehrung",
  description: "Widerrufsvorlage für KARTIVO. Unternehmerangaben sind noch Platzhalter.",
  path: "/widerruf",
});

export default function WithdrawalPage() {
  const business = storeConfig.business;
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Rechtliches</p>
      <h1>Widerrufsbelehrung</h1>
      <p className="status-note">
        Diese Belehrung ist erst verwendbar, wenn die Unternehmerangaben eingesetzt und rechtlich
        geprüft sind. Ein Widerruf kann über diese Website derzeit nicht ausgeübt werden, weil kein
        Kaufvertrag zustande kommt.
      </p>
      <LegalReviewNotice
        topics={[
          "Artikel 246a § 1 EGBGB und das gesetzliche Muster für die Widerrufsbelehrung",
          "Frist, Beginn der Frist und zulässige Ausnahmen am konkreten Sortiment prüfen",
          "Rücksendekosten nur nennen, wenn die Angabe zutrifft",
        ]}
      />
      <h2>Widerrufsrecht</h2>
      <p>
        <MissingValue>
          Belehrungstext nach gesetzlichem Muster und Prüfung einsetzen. Keine erfundene Frist.
        </MissingValue>
      </p>
      <h2>Folgen des Widerrufs</h2>
      <p>
        <MissingValue>Erstattung, Rücksendung und Wertersatz nach Prüfung eintragen</MissingValue>
      </p>
      <h2>Muster-Widerrufsformular</h2>
      <p>
        Wenn du den Vertrag widerrufen willst, fülle dieses Formular aus und sende es zurück. Das
        Formular ist die übliche Struktur. Die Empfängerangaben fehlen noch.
      </p>
      <p>
        An: {business.legalName ?? <MissingValue>Name des Unternehmers</MissingValue>},{" "}
        {business.addressLines?.join(", ") ?? <MissingValue>Anschrift</MissingValue>},{" "}
        {business.email ?? <MissingValue>E-Mail</MissingValue>}
      </p>
      <ul>
        <li>Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden Waren.</li>
        <li>Bestellt am / erhalten am: …</li>
        <li>Name der Verbraucherin oder des Verbrauchers: …</li>
        <li>Anschrift: …</li>
        <li>Datum: …</li>
        <li>Unterschrift, nur bei Mitteilung auf Papier.</li>
      </ul>
    </div>
  );
}
