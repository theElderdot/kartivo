import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AddToCart } from "@/components/AddToCart";
import { PaymentNote, ShippingNote, TaxNote } from "@/components/CommerceNotes";
import { JsonLd } from "@/components/JsonLd";
import {
  AQUAVOLT_BOARDS,
  TROPIC_WAVE,
  imageCaption,
  products,
  productsInCategory,
  productCategory,
  productImages,
  unverifiedSpecTopics,
  getProductBySlug,
} from "@/data/catalog";
import {
  apparelSizeLabel,
  conceptFeedStockNote,
  isPurchasable,
  stockLabel,
} from "@/lib/commerce";
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
  const meta = pageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.image,
    imageAlt: product.imageAlt,
    absoluteTitle: true,
  });
  return meta;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const others = productsInCategory(productCategory(product)).filter((item) => item.sku !== product.sku);
  const images = productImages(product);
  const absentTopics = product.absentTopics ?? unverifiedSpecTopics;
  const category = productCategory(product);
  const aquavolt = category === AQUAVOLT_BOARDS;
  const tropicWave = category === TROPIC_WAVE;
  const concept = aquavolt || tropicWave;
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
              src={images[0].src}
              alt={images[0].alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          {images.length > 1 ? (
            <div className="gallery-thumbs">
              {images.slice(1).map((image) => (
                <div key={image.src} className="gallery-thumb">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 45vw, 20vw" />
                </div>
              ))}
            </div>
          ) : null}
          <figcaption className="image-note">{imageCaption}</figcaption>
        </figure>
        <div>
          <p className="eyebrow">{product.skillLevel}</p>
          <h1>{product.title}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          {aquavolt ? (
            <p className="status-note">
              Katalogpreis für ein Board ohne Motor und ohne Segel. Technische Daten und Lieferumfang
              sind nicht geprüft. {conceptFeedStockNote(product)} Eine Bestellung ist nicht möglich,
              weil die Zahlung nicht angebunden ist.
            </p>
          ) : null}
          {tropicWave ? (
            <p className="status-note">
              Katalogpreis. Material und ein Schutz vor Wasser sind nicht geprüft.{" "}
              {conceptFeedStockNote(product)} Eine Bestellung ist nicht möglich, weil die Zahlung
              nicht angebunden ist.
            </p>
          ) : null}
          <TaxNote />
          <p>{product.description}</p>
          <dl className="facts">
            <dt>Marke</dt>
            <dd>{product.brand}</dd>
            <dt>SKU</dt>
            <dd>{product.sku}</dd>
            <dt>Farbe</dt>
            <dd>{product.color}</dd>
            {product.lengthLabel ? (
              <>
                <dt>Länge</dt>
                <dd>{product.lengthLabel}</dd>
              </>
            ) : null}
            {apparelSizeLabel(product) ? (
              <>
                <dt>Größe</dt>
                <dd>{apparelSizeLabel(product)}</dd>
              </>
            ) : null}
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
            <Link href="/versand">Versand und Lieferung</Link>
            {" · "}
            <Link href="/rueckgabe">Rückgabe und Erstattung</Link>
          </p>
          <PaymentNote />
        </div>
      </div>

      <section>
        <h2>Lieferumfang</h2>
        <p>
          {aquavolt
            ? "Der Lieferumfang ist nicht bestätigt. Akku, Ladegerät und weiteres Zubehör werden nicht als enthalten angegeben."
            : tropicWave
              ? "Der Lieferumfang ist nicht bestätigt. Nicht gezeigte Teile sind nicht enthalten."
              : "Der Lieferumfang steht in den Katalogangaben. Nicht genannte Teile sind nicht enthalten."}
        </p>
      </section>

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
            {absentTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section>
        <h2>{concept ? "Weiteres aus dieser Kategorie" : "Die anderen Boards"}</h2>
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
