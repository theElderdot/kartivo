import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { XMLValidator } from "fast-xml-parser";
import sharp from "sharp";
import { products } from "../src/data/catalog";
import { siteUrl, storeConfig } from "../src/config/store";
import { buildGoogleShoppingFeed } from "../src/lib/feed";
import { formatPrice } from "../src/lib/format";
import {
  canPublishAnnouncement,
  googleAvailability,
  launchBlockers,
  robotsPolicy,
} from "../src/lib/commerce";
import { addLine, cartCount } from "../src/lib/cart";

const failures: string[] = [];
function check(condition: boolean, message: string) {
  if (!condition) failures.push(message);
}

check(products.length === 3, "Catalog must contain exactly three products");
check(new Set(products.map((product) => product.id)).size === 3, "Product ids must be unique");
check(new Set(products.map((product) => product.slug)).size === 3, "Slugs must be unique");

const expected = [
  ["KART-WAVE-STARTER-001", "kartivo-wave-starter", 299],
  ["KART-OCEAN-CRUISER-001", "kartivo-ocean-cruiser", 449],
  ["KART-WAVE-PRO-001", "kartivo-wave-pro", 599],
] as const;

for (const [id, slug, price] of expected) {
  const product = products.find((item) => item.id === id);
  check(Boolean(product), `Missing ${id}`);
  if (!product) continue;
  check(product.slug === slug, `${id} slug`);
  check(product.price === price, `${id} price`);
  check(product.currency === "EUR", `${id} currency`);
  check(product.gtin === null, `${id} must not invent a GTIN`);
  check(product.stockQuantity === 5, `${id} stock must be the confirmed count`);
  check(googleAvailability(product) === "in_stock", `${id} feed availability follows confirmed stock`);
  check(formatPrice(product.price).includes(price.toFixed(2).replace(".", ",")), `${id} German price`);
  check(product.image.endsWith(".webp"), `${id} image path`);
}

check(robotsPolicy(true).index === true, "Production robots policy must allow indexing");
check(robotsPolicy(false).index === false, "Preview robots policy must noindex");
if (storeConfig.readyForLaunch) {
  check(launchBlockers().length === 0, `Launch is enabled with open items: ${launchBlockers().join("; ")}`);
}
if (storeConfig.announcement.enabled) {
  check(canPublishAnnouncement(), "Free-shipping announcement is enabled without a confirmed shipping rule");
}

const robotsSource = readFileSync(path.join(process.cwd(), "src/app/robots.ts"), "utf8");
check(!robotsSource.includes('disallow: ["/products"'), "robots.txt must not block products");
check(!robotsSource.includes("/images"), "robots.txt must not block images");
check(!robotsSource.includes("/feeds"), "robots.txt must not block the feed");

const layoutSource = readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf8");
check(layoutSource.includes("robotsPolicy"), "noindex must be conditional");
check(!layoutSource.includes('index: false, follow: false }'), "noindex must not be hardcoded");

const xml = buildGoogleShoppingFeed();
const parsed = XMLValidator.validate(xml);
check(parsed === true, `Feed XML is not valid: ${JSON.stringify(parsed)}`);
check(xml.includes('xmlns:g="http://base.google.com/ns/1.0"'), "Feed namespace");
check(!xml.includes("<g:gtin"), "Feed must not contain a GTIN");
check(xml.includes(">in_stock<"), "Feed must reflect confirmed stock as in_stock");
check(xml.includes("<g:google_product_category>3320</g:google_product_category>"), "Surfboard category");
check(!xml.includes("aggregateRating"), "Feed must not contain ratings");
check(!xml.includes("Kundenbewertung"), "Feed must not contain review language");

for (const product of products) {
  check(xml.includes(`<g:id>${product.id}</g:id>`), `Feed id ${product.id}`);
  check(xml.includes(`<g:price>${product.price.toFixed(2)} EUR</g:price>`), `Feed price ${product.id}`);
  check(
    xml.includes(`<g:link>${siteUrl}/products/${product.slug}</g:link>`),
    `Feed link ${product.id}`,
  );
  check(
    xml.includes(`<g:image_link>${siteUrl}${product.image}</g:image_link>`),
    `Feed image ${product.id}`,
  );
  check(xml.includes("<g:shipping>"), "Feed must include shipping");
  check(xml.includes("<g:country>DE</g:country>"), "Feed shipping country");
  check(xml.includes("<g:min_handling_time>1</g:min_handling_time>"), "Feed handling time");
  check(xml.includes("<g:max_transit_time>5</g:max_transit_time>"), "Feed transit time");
  check((xml.match(/<g:price>0\.00 EUR<\/g:price>/g) ?? []).length === 3, "These boards ship free");
  check(xml.includes(product.description.split(" ").slice(0, 4).join(" ")), `Feed description ${product.id}`);
}

async function validateImages() {
  const hashes = new Set<string>();
  for (const product of products) {
    const file = path.join(process.cwd(), "public", product.image);
    const bytes = readFileSync(file);
    const meta = await sharp(bytes).metadata();
    check((meta.width ?? 0) >= 1000 && (meta.height ?? 0) >= 1000, `${product.image} must stay at native resolution of at least 1000px`);
    check(meta.format === "webp", `${product.image} must be webp`);
    const text = bytes.toString("latin1");
    check(/trainedAlgorithmicMedia/i.test(text), `${product.image} must keep AI source metadata`);
    const hash = createHash("sha256").update(bytes).digest("hex");
    check(!hashes.has(hash), `${product.image} must be a distinct file`);
    hashes.add(hash);
  }
}

const cart = addLine([], "KART-WAVE-STARTER-001", 6, 5);
check(cartCount(cart) === 5, "Cart quantity cannot exceed confirmed stock");
check(cart[0]?.sku === "KART-WAVE-STARTER-001", "Cart stores the sku, not a copied price");

validateImages().then(() => {
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
  console.log(`Validated ${products.length} products, feed, images, and preview gates.`);
});
