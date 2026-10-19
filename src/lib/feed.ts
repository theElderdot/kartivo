import { siteUrl, storeConfig } from "@/config/store";
import { feedProducts, productImages, type Product } from "@/data/catalog";
import { googleAvailability, orderShippingEur } from "@/lib/commerce";
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
  ];

  for (const image of productImages(product).slice(1)) {
    lines.push(`      <g:additional_image_link>${escapeXml(`${siteUrl}${image.src}`)}</g:additional_image_link>`);
  }

  lines.push(
    `      <g:availability>${googleAvailability(product)}</g:availability>`,
    `      <g:price>${feedPrice(product.price)}</g:price>`,
    `      <g:condition>${product.condition}</g:condition>`,
    `      <g:brand>${escapeXml(product.brand)}</g:brand>`,
    `      <g:google_product_category>${product.googleProductCategoryId ?? storeConfig.googleProductCategory.id}</g:google_product_category>`,
    `      <g:product_type>${escapeXml(product.feedProductType)}</g:product_type>`,
    `      <g:color>${escapeXml(product.feedColor)}</g:color>`,
  );

  if (product.apparelFeed) {
    lines.push(`      <g:age_group>${product.apparelFeed.ageGroup}</g:age_group>`);
    lines.push(`      <g:gender>${product.apparelFeed.gender}</g:gender>`);
    lines.push(`      <g:size>${escapeXml(product.apparelFeed.size)}</g:size>`);
  } else if (product.lengthLabel) {
    lines.push(`      <g:size>${escapeXml(product.lengthLabel)}</g:size>`);
  }

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
    ["Farbe", product.color],
    ["Niveau", product.skillLevel],
  ];
  if (product.lengthLabel) details.splice(1, 0, ["Länge", product.lengthLabel]);
  for (const [name, value] of details) {
    lines.push("      <g:product_detail>");
    lines.push("        <g:section_name>Produkt</g:section_name>");
    lines.push(`        <g:attribute_name>${escapeXml(name)}</g:attribute_name>`);
    lines.push(`        <g:attribute_value>${escapeXml(value)}</g:attribute_value>`);
    lines.push("      </g:product_detail>");
  }

  const shipping = storeConfig.shipping;
  if (shipping.confirmed && shipping.countryCode) {
    const shippingEur = orderShippingEur(product.price);
    if (shippingEur != null) {
      lines.push("      <g:shipping>");
      lines.push(`        <g:country>${escapeXml(shipping.countryCode)}</g:country>`);
      lines.push(`        <g:service>${escapeXml(shipping.feedService)}</g:service>`);
      lines.push(`        <g:price>${feedPrice(shippingEur)}</g:price>`);
      lines.push(`        <g:min_handling_time>${shipping.handlingMinDays}</g:min_handling_time>`);
      lines.push(`        <g:max_handling_time>${shipping.handlingMaxDays}</g:max_handling_time>`);
      lines.push(`        <g:min_transit_time>${shipping.transitMinDays}</g:min_transit_time>`);
      lines.push(`        <g:max_transit_time>${shipping.transitMaxDays}</g:max_transit_time>`);
      lines.push("      </g:shipping>");
    }
  }

  lines.push("    </item>");
  return lines.join("\n");
}

/** RSS 2.0 feed with the Google Merchant Center namespace. No customer data. */
export function buildGoogleShoppingFeed(): string {
  const items = feedProducts().map(productItem).join("\n");
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
