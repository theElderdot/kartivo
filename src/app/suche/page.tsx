import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/data/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Suche",
  description: "Suche in den KARTIVO Surfboards.",
  path: "/suche",
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchProducts(query);

  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Suche</p>
        <h1>{query ? `Ergebnisse für „${query}“` : "Alle Boards"}</h1>
        <form className="search-form" action="/suche" method="get" role="search">
          <label className="sr-only" htmlFor="suche-q">
            Suchbegriff
          </label>
          <input id="suche-q" name="q" type="search" defaultValue={query} />
          <button className="button button-dark" type="submit">
            Suchen
          </button>
        </form>
      </header>
      {results.length === 0 ? (
        <p>Kein Board passt zu dieser Suche.</p>
      ) : (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
