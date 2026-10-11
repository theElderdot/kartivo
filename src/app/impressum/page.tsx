import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { Fact } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { launchBlockers } from "@/lib/commerce";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum von KARTIVO. Pflichtangaben werden ergänzt, sobald sie feststehen.",
  path: "/impressum",
});

export default function ImpressumPage() {
  const business = storeConfig.business;
  const blockers = launchBlockers();
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Rechtliches</p>
      <h1>Impressum</h1>
      <LegalReviewNotice
        topics={[
          "Angaben nach § 5 DDG, soweit für dieses Angebot erforderlich",
          "Register, Umsatzsteuer-Identifikationsnummer und vertretungsberechtigte Person nur eintragen, wenn sie zutreffen",
          "Verantwortlichkeitsangabe für journalistisch-redaktionelle Inhalte nur falls einschlägig",
        ]}
      />
      <h2>Anbieter</h2>
      <dl className="facts">
        <Fact label="Name" value={business.legalName} missing="Rechtlichen Namen eintragen" />
        <Fact
          label="Anschrift"
          value={business.addressLines?.join(", ") ?? null}
          missing="Ladungsfähige Anschrift eintragen"
        />
        <Fact label="E-Mail" value={business.email} missing="E-Mail eintragen" />
        <Fact
          label="Telefon"
          value={business.phoneApplicable === false ? "Nicht vorgesehen" : business.phone}
          missing="Klären, ob eine Telefonnummer genannt wird"
        />
        <Fact
          label="Registergericht"
          value={
            business.registerApplicable === false ? "Nicht vorgesehen" : business.registerCourt
          }
          missing="Registerpflicht klären"
        />
        <Fact
          label="Registernummer"
          value={
            business.registerApplicable === false ? "Nicht vorgesehen" : business.registerNumber
          }
          missing="Registernummer klären"
        />
        <Fact
          label="USt-IdNr."
          value={business.vatIdApplicable === false ? "Nicht vorgesehen" : business.vatId}
          missing="Umsatzsteuer-Identifikationsnummer klären"
        />
        <Fact
          label="Inhaltlich verantwortlich"
          value={business.contentResponsible}
          missing="Nur eintragen, wenn eine Verantwortliche Person zu nennen ist"
        />
      </dl>
      <section id="offene-angaben">
        <h2>Offene Angaben vor dem Launch</h2>
        <p>Diese Website ist nicht zum Verkauf freigegeben, solange Punkte offen sind.</p>
        <ul>
          {blockers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
