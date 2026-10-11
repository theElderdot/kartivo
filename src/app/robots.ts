import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/store";

/**
 * Product pages, images, and the Merchant Center feed stay crawlable.
 * Preview pages use noindex in the HTML instead of a robots.txt block,
 * so a crawler can see that they are not meant for the index.
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
