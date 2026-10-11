import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/catalog";
import { itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "KARTIVO | Finde dein perfektes Surfboard",
  description:
    "Drei Boards. Dein nächstes Abenteuer. Entdecke Surfboards für unterschiedliche Levels und finde deinen Style auf dem Wasser.",
  path: "/",
  absoluteTitle: true,
});

const faqs = [
  {
    q: "Kann ich hier schon ein Board kaufen?",
    a: "Nein. Bestand und Zahlungsabwicklung sind noch nicht bestätigt. Der Warenkorb merkt sich eine Auswahl im Browser, erzeugt aber keine Bestellung.",
  },
  {
    q: "Sind die Preise verbindlich inklusive Mehrwertsteuer?",
    a: "Die gezeigten Beträge sind Katalogpreise in Euro. Ob sie die Mehrwertsteuer enthalten, ist noch nicht festgelegt und wird deshalb nicht behauptet.",
  },
  {
    q: "Was kostet der Versand, und wie lange dauert er?",
    a: "Liefergebiet, Versandkosten und Lieferzeit sind noch nicht hinterlegt. Der Beispielsatz zum kostenlosen Versand ab 100 € ist nicht freigeschaltet.",
  },
  {
    q: "Wie läuft eine Rückgabe?",
    a: "Frist, Ablauf, Erstattung und Rücksendekosten stehen noch nicht fest. Gesetzliche Verbraucherrechte werden dadurch nicht ausgeschlossen. Details folgen auf der Seite Rückgabe und Erstattung.",
  },
  {
    q: "Sind die Produktfotos die Boards, die geliefert werden?",
    a: "Nein. Es sind KI-generierte Konzeptfotos. Sie müssen vor dem Verkauf durch Aufnahmen der realen Boards ersetzt werden, falls die Herstellung abweicht.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={itemListJsonLd()} />
      <section className="hero">
        <Image
          className="hero-media"
          src="/images/hero.webp"
          alt="Surfer auf einer Welle im offenen Meer"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">KARTIVO</p>
          <h1>Finde dein perfektes Surfboard.</h1>
          <p>
            Drei Boards. Dein nächstes Abenteuer. Entdecke Surfboards für unterschiedliche Levels
            und finde deinen Style auf dem Wasser.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/shop">
              Boards entdecken
            </Link>
            <Link className="button button-secondary" href="/guide">
              Finde dein Board
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="boards">
        <div className="section-head">
          <p className="eyebrow">Drei Boards</p>
          <h2>Die Kollektion</h2>
          <p>
            Die angegebenen Preise sind Katalogpreise in Euro. Der Mehrwertsteuerausweis ist noch
            nicht bestätigt.
          </p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="story">
          <div>
            <p className="eyebrow">KARTIVO</p>
            <h2>Mehr als ein Board. Ein Lebensgefühl.</h2>
            <p>
              Das Meer verändert das Tempo. Es verlangt Aufmerksamkeit, Geduld und die Bereitschaft,
              wieder aufzustehen. KARTIVO steht für dieses Gefühl: rausgehen, die Bedingungen lesen
              und ein Board wählen, das zum eigenen Moment passt.
            </p>
            <p>
              Manche suchen Stabilität für die ersten Wellen. Andere wollen ein vielseitiges Board
              für den nächsten Schritt. Wieder andere brauchen eine kurze, klare Linie. Drei
              Entwürfe, ein gemeinsamer Ausgangspunkt: Neugier auf das, was hinter der nächsten
              Welle liegt.
            </p>
            <Link className="button button-dark" href="/ueber-uns">
              Über KARTIVO
            </Link>
          </div>
          <div className="story-panel" role="img" aria-label="Welle im offenen Meer" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Kontakt, Lieferung und Service</h2>
          <p>Nur das, was derzeit wirklich feststeht.</p>
        </div>
        <div className="trust-grid">
          <article className="trust-card">
            <h3>Kontakt</h3>
            <p>Name, Anschrift und E-Mail des Unternehmens sind noch nicht hinterlegt.</p>
            <Link href="/kontakt">Kontaktseite</Link>
          </article>
          <article className="trust-card">
            <h3>Lieferung</h3>
            <p>Versandkosten, Liefergebiet und Lieferzeit werden vor einer Bestellung genannt. Sie sind noch offen.</p>
            <Link href="/versand">Versand und Lieferung</Link>
          </article>
          <article className="trust-card">
            <h3>Rückgabe</h3>
            <p>Frist, Ablauf und Kosten der Rücksendung sind noch nicht festgelegt. Eine kostenlose Rücksendung wird nicht versprochen.</p>
            <Link href="/rueckgabe">Rückgabe und Erstattung</Link>
          </article>
          <article className="trust-card">
            <h3>Zahlung</h3>
            <p>Es werden keine Zahlungsdaten erfasst. Ein Zahlungsanbieter ist nicht angebunden, deshalb endet die Kasse ohne Bestellung.</p>
            <Link href="/kasse">Zur Kasse</Link>
          </article>
          <article className="trust-card">
            <h3>Fragen</h3>
            <p>Kurze Antworten zu Bestand, Preisen, Versand und den Konzeptfotos.</p>
            <a href="#fragen">Zu den Fragen</a>
          </article>
          <article className="trust-card">
            <h3>Impressum</h3>
            <p>Pflichtangaben stehen als Platzhalter, bis die echten Unternehmensdaten eingetragen sind.</p>
            <Link href="/impressum">Impressum</Link>
          </article>
        </div>
        <div className="faq" id="fragen">
          <h2>Häufige Fragen</h2>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
