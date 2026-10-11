import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { MissingValue } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description:
    "Datenschutzhinweise zu KARTIVO, beschränkt auf das, was diese Website derzeit technisch tut.",
  path: "/datenschutz",
});

export default function PrivacyPage() {
  const business = storeConfig.business;
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Rechtliches</p>
      <h1>Datenschutzerklärung</h1>
      <LegalReviewNotice
        topics={[
          "DSGVO: Verantwortlicher, Rechtsgrundlagen, Speicherdauer, Empfänger und Betroffenenrechte",
          "TDDDG, soweit später nicht notwendige Cookies oder ähnliche Speicherungen hinzukommen",
          "Auftragsverarbeitung mit Hoster und Zahlungsanbieter ergänzen, sobald sie feststehen",
        ]}
      />
      <h2>Verantwortlicher</h2>
      <p>
        {business.legalName ?? <MissingValue>Firmenname eintragen</MissingValue>}
        {", "}
        {business.addressLines?.join(", ") ?? <MissingValue>Anschrift eintragen</MissingValue>}
        {", "}
        {business.email ?? <MissingValue>E-Mail eintragen</MissingValue>}
      </p>
      <h2>Was diese Website derzeit speichert</h2>
      <p>
        Der Warenkorb liegt lokal im Browser unter dem Schlüssel „kartivo.cart.v1“. Dabei werden
        Artikelnummer und Menge gespeichert, kein Name und keine Zahlungsdaten. Es gibt kein
        Kundenkonto.
      </p>
      <p>
        Das Kontaktformular sendet keine Nachricht an einen Server. Es erscheint nur ein Hinweis
        auf der Seite.
      </p>
      <p>
        Diese Anwendung bindet keine Analyse- oder Werbedienste ein. Server-Protokolle des
        Hostings sind hier nicht beschrieben, weil der Hoster noch nicht feststeht:{" "}
        <MissingValue>Hosting-Anbieter eintragen</MissingValue>.
      </p>
      <h2>Zahlungsdaten</h2>
      <p>
        Es wird keine Zahlung entgegengenommen. Kartendaten oder andere Zahlungsdaten werden nicht
        abgefragt.
      </p>
      <h2>Rechte</h2>
      <p>
        Soweit personenbezogene Daten verarbeitet werden, können Auskunft, Berichtigung, Löschung,
        Einschränkung, Datenübertragbarkeit und Widerspruch in Betracht kommen, außerdem eine
        Beschwerde bei einer Aufsichtsbehörde. Der konkrete Ablauf ist nachzutragen, sobald der
        Verantwortliche feststeht.
      </p>
    </div>
  );
}
