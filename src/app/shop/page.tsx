import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop",
  description:
    "Vier KARTIVO Boards: Wave Starter, Ocean Cruiser, Wave Pro und Volt.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Shop</p>
        <h1>Boards entdecken</h1>
        <p>
          Vier Boards, vier Katalogpreise. Der Bestand steht auf der Produktseite. Der
          Steuerausweis ist noch nicht bestätigt.
        </p>
      </header>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </div>
  );
}
