import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/catalog";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`;
  return (
    <article className="product-card">
      <Link href={href} className="card-media" aria-label={product.imageAlt}>
        <Image src={product.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
      </Link>
      <div className="card-body">
        <p className="card-level">{product.skillLevel}</p>
        <h3>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p>{product.cardDescription}</p>
        <p className="card-price">{formatPrice(product.price)}</p>
        <p className="image-note">Konzeptfoto</p>
      </div>
    </article>
  );
}
