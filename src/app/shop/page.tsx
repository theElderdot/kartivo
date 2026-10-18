import { ProductCard } from "@/components/ProductCard";
import { AQUAVOLT_BOARDS, SURFBOARDS, productsInCategory } from "@/data/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop",
  description:
    "KARTIVO Surfboards plus AQUAVOLT Drift Bodyboard und AQUAVOLT Glide Skimboard. Beide ohne Motor und ohne Segel.",
  path: "/shop",
});

export default function ShopPage() {
  const boards = productsInCategory(SURFBOARDS);
  const aquavoltBoards = productsInCategory(AQUAVOLT_BOARDS);
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Shop</p>
        <h1>Boards ohne Motor</h1>
        <p>
          Vier KARTIVO Surfboards mit bestätigtem Bestand. Dazu das AQUAVOLT Drift Bodyboard für
          149 Euro und das AQUAVOLT Glide Skimboard für 119 Euro. Beide ohne Motor und ohne Segel.
          Ihr Bestand ist noch nicht bestätigt. Der Steuerausweis ist noch nicht bestätigt.
        </p>
      </header>
      <section>
        <div className="section-head">
          <p className="eyebrow">KARTIVO</p>
          <h2>Surfboards</h2>
        </div>
        <div className="product-grid">
          {boards.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>
      <section className="category-block">
        <div className="section-head">
          <p className="eyebrow">AQUAVOLT</p>
          <h2>Bodyboard und Skimboard</h2>
          <p>
            Kein Motor, kein Akku und kein Segel. Maße, Material und Lieferumfang sind nicht
            geprüft.
          </p>
        </div>
        <div className="product-grid product-grid-two">
          {aquavoltBoards.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
