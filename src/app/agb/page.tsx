import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { MissingValue } from "@/components/MissingValue";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AGB",
  description: "Allgemeine Geschäftsbedingungen von KARTIVO. Derzeit eine ungeprüfte Vorlage.",
  path: "/agb",
});

export default function TermsPage() {
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Rechtliches</p>
      <h1>Allgemeine Geschäftsbedingungen</h1>
      <p className="status-note">
        Diese Bedingungen sind nicht in Kraft. Über die Website kommt derzeit kein Kaufvertrag
        zustande.
      </p>
      <LegalReviewNotice
        topics={[
          "AGB-Kontrolle und Transparenz gegenüber Verbraucherinnen und Verbrauchern",
          "Fernabsatz, Preisangabe und Verknüpfung mit Widerruf, Versand und Zahlung",
          "Keine Klauseln zu Garantie, Eigentum oder Gerichtsstand ohne rechtliche Prüfung einsetzen",
        ]}
      />
      <h2>Geltungsbereich</h2>
      <p>
        <MissingValue>Für wen die Bedingungen gelten sollen, nach Prüfung eintragen</MissingValue>
      </p>
      <h2>Vertragsschluss</h2>
      <p>
        Der Warenkorb und die Kasse erzeugen keine Bestellung und keine Zahlung. Ein Text zum
        Vertragsschluss wird erst ergänzt, wenn ein echter Bestellablauf steht.
      </p>
      <h2>Preise</h2>
      <p>
        Sichtbar sind Katalogpreise in Euro. Der Mehrwertsteuerausweis ist noch nicht bestätigt.
      </p>
      <h2>Lieferung und Rückgabe</h2>
      <p>
        Es gelten die Seiten Versand und Lieferung sowie Rückgabe und Erstattung. Ein Kaufvertrag
        kommt über diese Website derzeit trotzdem nicht zustande, weil die Zahlung nicht
        angebunden ist.
      </p>
      <h2>Gewährleistung</h2>
      <p>
        Gesetzliche Mängelrechte bleiben unberührt. Eine zusätzliche Garantie wird nicht angeboten
        und hier nicht beschrieben.
      </p>
      <h2>Schlussbestimmungen</h2>
      <p>
        <MissingValue>Nach rechtlicher Prüfung formulieren</MissingValue>
      </p>
    </div>
  );
}
