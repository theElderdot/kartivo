import { siteUrl, storeConfig } from "@/config/store";
import { products, type Product } from "@/data/catalog";
import { schemaAvailability } from "@/lib/commerce";
import { schemaPrice } from "@/lib/format";

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: storeConfig.brand,
    url: siteUrl,
    inLanguage: "de",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/suche?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: Product) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [`${siteUrl}${product.image}`],
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    color: product.color,
    url: `${siteUrl}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${product.slug}`,
      priceCurrency: product.currency,
      price: schemaPrice(product.price),
      availability: schemaAvailability(product),
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  if (product.gtin) data.gtin = product.gtin;
  if (product.mpn) data.mpn = product.mpn;
  return data;
}

export function breadcrumbJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteUrl}/products/${product.slug}`,
      },
    ],
  };
}

export function itemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "KARTIVO Surfboards",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/products/${product.slug}`,
      name: product.title,
    })),
  };
}
