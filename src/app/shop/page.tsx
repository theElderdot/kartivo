import { ProductCard } from "@/components/ProductCard";
import { MINI_WATER_SCOOTERS, SURFBOARDS, productsInCategory } from "@/data/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop",
  description:
    "KARTIVO Surfboards und die AQUAVOLT Mini Water Scooters. Die Scooter sind Produktkonzepte und noch nicht im Verkauf.",
  path: "/shop",
});

export default function ShopPage() {
  const boards = productsInCategory(SURFBOARDS);
  const scooters = productsInCategory(MINI_WATER_SCOOTERS);
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Shop</p>
        <h1>Boards und Mini Water Scooters</h1>
        <p>
          Vier KARTIVO Boards mit bestätigtem Bestand. Darunter zwei AQUAVOLT Konzepte. Der
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
          <h2>Mini Water Scooters</h2>
          <p>
            Kompakte Entwürfe für Freizeit auf erlaubten Gewässern. Leicht zu transportieren und
            zu lagern, mit einer klaren, modernen Form. Geschwindigkeit, Akku, Zertifizierung und
            Lieferumfang sind nicht geprüft und werden nicht behauptet.
          </p>
        </div>
        <div className="product-grid product-grid-two">
          {scooters.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
