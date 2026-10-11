import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Über uns",
  description: "KARTIVO gestaltet Surfboards für unterschiedliche Wege aufs Wasser.",
  path: "/ueber-uns",
});

export default function AboutPage() {
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Über uns</p>
      <h1>Mehr als ein Board. Ein Lebensgefühl.</h1>
      <p>
        KARTIVO ist eine Surfboard-Marke für Menschen, die das Meer nicht nur anschauen wollen.
        Der Entwurf ist ruhig, klar und auf das Wasser ausgerichtet: drei Boards, drei
        unterschiedliche Einstiege.
      </p>
      <p>
        Der Wave Starter ist als Soft-Top für die ersten Wellen gedacht. Der Ocean Cruiser ist ein
        Funboard für den Schritt danach. Das Wave Pro ist ein kurzes Board für Surfer, die schon
        eigene Linien fahren. Mehr als diese Katalogangaben behaupten wir hier nicht.
      </p>
      <p>
        Firmensitz, Herstellung und Unternehmensgeschichte werden an dieser Stelle ergänzt, sobald
        sie feststehen. Bis dahin bleibt die Seite eine Vorstellung der Produkte, nicht ein Bericht
        über einen Betrieb.
      </p>
      <LegalReviewNotice
        topics={[
          "Unternehmensdarstellung erst mit geprüften Angaben zu Inhaber und Sitz veröffentlichen",
          "Keine Umwelt-, Herkunfts- oder Partnerschaftsaussagen ohne Beleg",
        ]}
      />
    </div>
  );
}
