import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop",
  description: "Drei KARTIVO Surfboards: Wave Starter, Ocean Cruiser und Wave Pro.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Shop</p>
        <h1>Boards entdecken</h1>
        <p>
          Drei Surfboards, drei Katalogpreise. Der Steuerausweis und der Bestand sind noch nicht
          bestätigt.
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
