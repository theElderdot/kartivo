import { siteUrl, storeConfig } from "@/config/store";
import { products, type Product } from "@/data/catalog";
import { googleAvailability } from "@/lib/commerce";
import { feedPrice } from "@/lib/format";
import { escapeXml } from "@/lib/xml";

function productItem(product: Product): string {
  const lines = [
    "    <item>",
    `      <g:id>${escapeXml(product.id)}</g:id>`,
    `      <g:title>${escapeXml(product.title)}</g:title>`,
    `      <g:description>${escapeXml(product.description)}</g:description>`,
    `      <g:link>${escapeXml(`${siteUrl}/products/${product.slug}`)}</g:link>`,
    `      <g:image_link>${escapeXml(`${siteUrl}${product.image}`)}</g:image_link>`,
    `      <g:availability>${googleAvailability(product)}</g:availability>`,
    `      <g:price>${feedPrice(product.price)}</g:price>`,
    `      <g:condition>${product.condition}</g:condition>`,
    `      <g:brand>${escapeXml(product.brand)}</g:brand>`,
    `      <g:google_product_category>${storeConfig.googleProductCategory.id}</g:google_product_category>`,
    `      <g:product_type>${escapeXml(product.feedProductType)}</g:product_type>`,
    `      <g:color>${escapeXml(product.feedColor)}</g:color>`,
    `      <g:size>${escapeXml(product.lengthLabel)}</g:size>`,
  ];

  if (product.mpn) lines.push(`      <g:mpn>${escapeXml(product.mpn)}</g:mpn>`);
  if (product.gtin) lines.push(`      <g:gtin>${escapeXml(product.gtin)}</g:gtin>`);
  if (!product.mpn && !product.gtin) {
    lines.push("      <g:identifier_exists>no</g:identifier_exists>");
  }

  for (const highlight of product.highlights) {
    lines.push(`      <g:product_highlight>${escapeXml(highlight)}</g:product_highlight>`);
  }

  const details: Array<[string, string]> = [
    ["Produkttyp", product.productType],
    ["Länge", product.lengthLabel],
    ["Farbe", product.color],
    ["Niveau", product.skillLevel],
  ];
  for (const [name, value] of details) {
    lines.push("      <g:product_detail>");
    lines.push("        <g:section_name>Produkt</g:section_name>");
    lines.push(`        <g:attribute_name>${escapeXml(name)}</g:attribute_name>`);
    lines.push(`        <g:attribute_value>${escapeXml(value)}</g:attribute_value>`);
    lines.push("      </g:product_detail>");
  }

  const shipping = storeConfig.shipping;
  if (shipping.confirmed && shipping.feed) {
    lines.push("      <g:shipping>");
    lines.push(`        <g:country>${escapeXml(shipping.feed.country)}</g:country>`);
    lines.push(`        <g:service>${escapeXml(shipping.feed.service)}</g:service>`);
    lines.push(`        <g:price>${feedPrice(shipping.feed.priceEur)}</g:price>`);
    lines.push("      </g:shipping>");
  }

  lines.push("    </item>");
  return lines.join("\n");
}

/** RSS 2.0 feed with the Google Merchant Center namespace. No customer data. */
export function buildGoogleShoppingFeed(): string {
  const items = products.map(productItem).join("\n");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">',
    "  <channel>",
    "    <title>KARTIVO</title>",
    `    <link>${escapeXml(siteUrl)}</link>`,
    "    <description>KARTIVO Surfboards</description>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
