import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { AQUAVOLT_BOARDS, SURFBOARDS, productsInCategory } from "@/data/catalog";
import { itemListJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "KARTIVO | Finde dein perfektes Surfboard",
  description:
    "Vier Boards. Dein nächstes Abenteuer. Entdecke Surfboards für unterschiedliche Levels und finde deinen Style auf dem Wasser.",
  path: "/",
  absoluteTitle: true,
});

const faqs = [
  {
    q: "Kann ich hier schon ein Board kaufen?",
    a: "Nein. Der Bestand steht auf der Produktseite. Die Zahlung ist noch nicht angebunden. Der Warenkorb merkt sich eine Auswahl im Browser und erzeugt keine Bestellung.",
  },
  {
    q: "Sind die Preise verbindlich inklusive Mehrwertsteuer?",
    a: "Die gezeigten Beträge sind Katalogpreise in Euro. Ob sie die Mehrwertsteuer enthalten, ist noch nicht festgelegt und wird deshalb nicht behauptet.",
  },
  {
    q: "Was kostet der Versand, und wie lange dauert er?",
    a: "Jede Bestellung nach Deutschland wird kostenlos versendet. Die Bearbeitung dauert 1–3 Werktage, der Transport danach 2–5 Werktage.",
  },
  {
    q: "Wie läuft eine Rückgabe?",
    a: "Du hast 14 Tage Widerruf ab dem Erhalt der Ware. Die Rücksendung geht per Post und die Kosten trägst du, außer die Ware ist mangelhaft oder falsch geliefert. Die Erstattung erfolgt innerhalb von 14 Tagen auf dem ursprünglichen Zahlungsweg. Ein Umtausch ist nicht angeboten.",
  },
  {
    q: "Sind die Produktfotos die Boards, die geliefert werden?",
    a: "Nein. Es sind KI-generierte Konzeptfotos. Sie müssen vor dem Verkauf durch Aufnahmen der realen Boards ersetzt werden, falls die Herstellung abweicht.",
  },
  {
    q: "Was ist aus den Wasserscootern geworden?",
    a: "Die beiden motorisierten Scooter sind ersetzt. Im Shop sind jetzt das AQUAVOLT Drift Bodyboard für 149 Euro und das AQUAVOLT Glide Skimboard für 119 Euro. Beide haben keinen Motor und kein Segel. Der Bestand ist noch nicht bestätigt.",
  },
];

export default function HomePage() {
  const boards = productsInCategory(SURFBOARDS);
  const aquavoltBoards = productsInCategory(AQUAVOLT_BOARDS);
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
            Vier Boards. Dein nächstes Abenteuer. Entdecke Surfboards für unterschiedliche Levels
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
          <p className="eyebrow">Vier Boards</p>
          <h2>Die Kollektion</h2>
          <p>
            Die angegebenen Preise sind Katalogpreise in Euro. Der Mehrwertsteuerausweis ist noch
            nicht bestätigt.
          </p>
        </div>
        <div className="product-grid">
          {boards.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>

      <section className="section" id="aquavolt">
        <div className="section-head">
          <p className="eyebrow">AQUAVOLT</p>
          <h2>Bodyboard und Skimboard</h2>
          <p>
            Zwei Boards ohne Motor und ohne Segel. Drift kostet 149 Euro, Glide 119 Euro. Der
            Bestand ist noch nicht bestätigt. Technische Daten sind nicht geprüft, und eine
            Bestellung ist noch nicht möglich.
          </p>
        </div>
        <div className="product-grid product-grid-two">
          {aquavoltBoards.map((product) => (
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
              für den nächsten Schritt. Wieder andere brauchen eine kurze, klare Linie. Das Volt
              ist ein motorisiertes Board für flaches Wasser. Vier Entwürfe, ein gemeinsamer
              Ausgangspunkt: Neugier auf das, was hinter der nächsten Welle liegt.
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
            <p>Kostenlos für jede Bestellung nach Deutschland. Bearbeitung 1–3 Werktage, Transport danach 2–5 Werktage.</p>
            <Link href="/versand">Versand und Lieferung</Link>
          </article>
          <article className="trust-card">
            <h3>Rückgabe</h3>
            <p>14 Tage Widerruf ab Erhalt, Rücksendung per Post auf deine Kosten. Erstattung innerhalb von 14 Tagen. Kein Umtausch.</p>
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
