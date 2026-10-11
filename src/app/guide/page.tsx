import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Surfboard Guide",
  description:
    "Welches KARTIVO Board passt zu deinem Level: Wave Starter, Ocean Cruiser oder Wave Pro.",
  path: "/guide",
});

const paths = [
  {
    level: "Anfänger",
    name: "Wave Starter",
    href: "/products/kartivo-wave-starter",
    text: "Ein 8'0-Zoll-Soft-Top mit großzügiger Standfläche, gedacht für den Einstieg und die ersten Wellen.",
  },
  {
    level: "Einsteiger bis leicht fortgeschritten",
    name: "Ocean Cruiser",
    href: "/products/kartivo-ocean-cruiser",
    text: "Ein 7'0-Zoll-Funboard für Sessions, in denen du ein vielseitigeres Board suchst als ein reines Einsteigerboard.",
  },
  {
    level: "Fortgeschritten bis erfahren",
    name: "Wave Pro",
    href: "/products/kartivo-wave-pro",
    text: "Ein 6'2-Zoll-Shortboard mit schmalerer Silhouette für Surfer, die ein kurzes, sportliches Board fahren.",
  },
];

export default function GuidePage() {
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Guide</p>
        <h1>Finde dein Board</h1>
        <p>
          Die Zuordnung folgt nur den Angaben in diesem Katalog: Länge, Boardtyp und angesprochenes
          Level. Sie ist keine Vermessung und kein Testergebnis.
        </p>
      </header>
      <div className="guide-grid">
        {paths.map((path) => (
          <article key={path.href} className="guide-card">
            <p className="card-level">{path.level}</p>
            <h2>{path.name}</h2>
            <p>{path.text}</p>
            <Link href={path.href}>Board ansehen</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
