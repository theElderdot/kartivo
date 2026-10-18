import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/store";

/**
 * Product pages, images, and the Merchant Center feed stay crawlable.
 * Cart and checkout are transactional and stay out of the crawl.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/warenkorb", "/kasse"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
