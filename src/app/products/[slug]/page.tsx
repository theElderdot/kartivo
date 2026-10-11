import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AddToCart } from "@/components/AddToCart";
import { PaymentNote, ShippingNote, TaxNote } from "@/components/CommerceNotes";
import { JsonLd } from "@/components/JsonLd";
import { imageCaption, products, unverifiedSpecTopics, getProductBySlug } from "@/data/catalog";
import { isPurchasable, stockLabel } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Seite nicht gefunden" };
  return pageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.image,
    imageAlt: product.imageAlt,
    absoluteTitle: true,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const others = products.filter((item) => item.sku !== product.sku);
  const specStatus = product.detailsConfirmed
    ? "Vom Händler bestätigt"
    : "Noch nicht an der Ware geprüft";

  return (
    <div className="page-wrap">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumbJsonLd(product)} />
      <p className="fine">
        <Link href="/">Start</Link> / <Link href="/shop">Shop</Link> / {product.name}
      </p>
      <div className="product-layout">
        <figure className="gallery" aria-label="Produktbilder">
          <div className="gallery-frame">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <figcaption className="image-note">{imageCaption}</figcaption>
        </figure>
        <div>
          <p className="eyebrow">{product.skillLevel}</p>
          <h1>{product.title}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <TaxNote />
          <p>{product.description}</p>
          <dl className="facts">
            <dt>Marke</dt>
            <dd>{product.brand}</dd>
            <dt>SKU</dt>
            <dd>{product.sku}</dd>
            <dt>Farbe</dt>
            <dd>{product.color}</dd>
            <dt>Länge</dt>
            <dd>{product.lengthLabel}</dd>
            <dt>Zustand</dt>
            <dd>Neu</dd>
            <dt>Bestand</dt>
            <dd>{stockLabel(product)}</dd>
          </dl>
          <ul>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <AddToCart sku={product.sku} purchasable={isPurchasable(product)} />
          <ShippingNote goodsSubtotal={product.price} />
          <p className="fine">
            <Link href="/rueckgabe">Rückgabe und Erstattung</Link>
          </p>
          <PaymentNote />
        </div>
      </div>

      <section>
        <h2>Angaben aus dem Katalog</h2>
        <p className="fine">Status: {specStatus}</p>
        <table className="spec-table">
          <thead>
            <tr>
              <th scope="col">Angabe</th>
              <th scope="col">Wert</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {product.specs.map((spec) => (
              <tr key={spec.label}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
                <td>{specStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <aside className="status-note">
          <p>
            Diese Werte stammen aus dem Produktkonzept. Sie sind keine geprüften Messwerte.
            Nicht angegeben und deshalb hier nicht erfunden:
          </p>
          <ul>
            {unverifiedSpecTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section>
        <h2>Die anderen Boards</h2>
        <div className="guide-grid">
          {others.map((item) => (
            <article key={item.sku} className="guide-card">
              <h3>
                <Link href={`/products/${item.slug}`}>{item.name}</Link>
              </h3>
              <p>{formatPrice(item.price)}</p>
              <p>{item.cardDescription}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
