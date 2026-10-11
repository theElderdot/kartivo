import { Fact } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { pageMetadata } from "@/lib/metadata";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  title: "Kontakt",
  description: "Kontakt zu KARTIVO. Die Unternehmensdaten werden ergänzt, sobald sie feststehen.",
  path: "/kontakt",
});

export default function ContactPage() {
  const business = storeConfig.business;
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Kontakt</p>
        <h1>Schreib uns</h1>
        <p>
          Solange keine E-Mail hinterlegt ist, verlässt keine Nachricht diese Seite. Das Formular
          speichert keine Anfrage.
        </p>
      </header>
      <dl className="facts">
        <Fact label="Unternehmen" value={business.legalName} missing="Firmenname eintragen" />
        <Fact
          label="Anschrift"
          value={business.addressLines?.join(", ") ?? null}
          missing="Anschrift eintragen"
        />
        <Fact label="E-Mail" value={business.email} missing="E-Mail eintragen" />
        <Fact
          label="Telefon"
          value={
            business.phoneApplicable === false
              ? "Keine Telefonnummer vorgesehen"
              : business.phone
          }
          missing="Telefon klären"
        />
        <Fact
          label="Erreichbarkeit"
          value={business.customerServiceHours}
          missing="Servicezeiten eintragen"
        />
      </dl>
      <ContactForm />
    </div>
  );
}
