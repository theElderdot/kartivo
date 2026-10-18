import { ProductCard } from "@/components/ProductCard";
import { AQUAVOLT_BOARDS, SURFBOARDS, TROPIC_WAVE, productsInCategory } from "@/data/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop",
  description:
    "KARTIVO Surfboards, AQUAVOLT Boards und TROPIC WAVE Strandartikel. Katalogpreise, Bestand noch nicht bestätigt.",
  path: "/shop",
});

export default function ShopPage() {
  const boards = productsInCategory(SURFBOARDS);
  const aquavoltBoards = productsInCategory(AQUAVOLT_BOARDS);
  const tropicWave = productsInCategory(TROPIC_WAVE);
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Shop</p>
        <h1>Boards ohne Motor</h1>
        <p>
          Vier KARTIVO Surfboards mit bestätigtem Bestand. Dazu das AQUAVOLT Drift Bodyboard für
          149 Euro und das AQUAVOLT Glide Skimboard für 119 Euro, beide ohne Motor und ohne Segel.
          Unten die TROPIC WAVE Strandartikel. Deren Bestand ist noch nicht bestätigt. Der
          Steuerausweis ist noch nicht bestätigt.
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
      <section className="category-block">
        <div className="section-head">
          <p className="eyebrow">TROPIC WAVE</p>
          <h2>Strand und Reise</h2>
          <p>
            Zwei Rucksäcke, ein Surfponcho und eine Rolltop-Tasche. Die Preise sind Katalogpreise.
            Bestand, Material, Maße und Wasserschutz sind nicht bestätigt.
          </p>
        </div>
        <div className="product-grid product-grid-two">
          {tropicWave.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
