import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/store";
import { products } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/shop",
    "/guide",
    "/ueber-uns",
    "/kontakt",
    "/versand",
    "/rueckgabe",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/widerruf",
    "/suche",
  ];

  return [
    ...paths.map((path) => ({ url: `${siteUrl}${path}` })),
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      images: [`${siteUrl}${product.image}`],
    })),
  ];
}
