import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { XMLValidator } from "fast-xml-parser";
import sharp from "sharp";
import { feedProducts, productImages, products } from "../src/data/catalog";
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

check(products.length === 10, "Catalog must contain ten products");
check(feedProducts().length === 10, "All ten products belong in the Google feed");
check(new Set(products.map((product) => product.id)).size === products.length, "Product ids must be unique");
check(new Set(products.map((product) => product.slug)).size === products.length, "Slugs must be unique");

const expected = [
  ["KART-WAVE-STARTER-001", "kartivo-wave-starter", 299, 5, "in_stock"],
  ["KART-OCEAN-CRUISER-001", "kartivo-ocean-cruiser", 449, 5, "in_stock"],
  ["KART-WAVE-PRO-001", "kartivo-wave-pro", 599, 5, "in_stock"],
  ["KART-VOLT-ELECTRIC-001", "kartivo-volt-electric", 600, 5, "in_stock"],
] as const;

for (const [id, slug, price, stock, availability] of expected) {
  const product = products.find((item) => item.id === id);
  check(Boolean(product), `Missing ${id}`);
  if (!product) continue;
  check(product.slug === slug, `${id} slug`);
  check(product.price === price, `${id} price`);
  check(product.currency === "EUR", `${id} currency`);
  check(product.gtin === null, `${id} must not invent a GTIN`);
  check(product.stockQuantity === stock, `${id} stock must match the confirmed count`);
  check(googleAvailability(product) === availability, `${id} feed availability follows confirmed stock`);
  const germanPrice = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  check(formatPrice(product.price).includes(germanPrice), `${id} German price`);
  check(product.image.endsWith(".webp"), `${id} image path`);
}

check(robotsPolicy(true).index === true, "Production robots policy must allow indexing");
check(robotsPolicy(false).index === false, "Preview robots policy must noindex");
check(storeConfig.indexPages === true, "Landing pages must be indexable for Merchant Center");
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

const offered = feedProducts();

for (const [id, slug, price, categoryId] of [
  ["AQV-DRIFT-BODY-001", "aquavolt-drift-bodyboard", 149, 6287],
  ["AQV-GLIDE-SKIM-001", "aquavolt-glide-skimboard", 119, 6286],
] as const) {
  const product = products.find((item) => item.id === id);
  check(Boolean(product), `Missing ${id}`);
  if (!product) continue;
  check(product.slug === slug, `${id} slug`);
  check(product.price === price, `${id} price`);
  check(product.currency === "EUR", `${id} currency`);
  check(product.brand === "AQUAVOLT", `${id} brand`);
  check(product.gtin === null && product.mpn === null, `${id} must not invent an identifier`);
  check(product.stockQuantity === null, `${id} stock must stay unconfirmed`);
  check(product.detailsConfirmed === false, `${id} specs must stay unconfirmed`);
  check(product.publishToFeed !== false, `${id} must be in the feed`);
  check(product.googleProductCategoryId === categoryId, `${id} category`);
  check(googleAvailability(product) === "out_of_stock", `${id} stays out of stock until a count is confirmed`);
  check((product.gallery ?? []).length === 0, `${id} uses one image`);
  check(!/scooter|motor|wasserscooter/i.test(product.title), `${id} title must not describe a powered vehicle`);
}

const xml = buildGoogleShoppingFeed();
const parsed = XMLValidator.validate(xml);
check(parsed === true, `Feed XML is not valid: ${JSON.stringify(parsed)}`);
check(xml.includes('xmlns:g="http://base.google.com/ns/1.0"'), "Feed namespace");
check(!xml.includes("<g:gtin"), "Feed must not contain a GTIN");
check(xml.includes(">in_stock<"), "Feed must reflect confirmed stock as in_stock");
check(xml.includes("<g:google_product_category>3320</g:google_product_category>"), "Surfboard category");
check(!xml.includes("aggregateRating"), "Feed must not contain ratings");
check(!xml.includes("Kundenbewertung"), "Feed must not contain review language");
check(xml.includes("<g:id>AQV-DRIFT-BODY-001</g:id>"), "Feed must include the bodyboard");
check(xml.includes("<g:id>AQV-GLIDE-SKIM-001</g:id>"), "Feed must include the skimboard");
check(!xml.includes("AQV-WAVE-"), "Old water scooters must leave the feed");
check(!xml.includes(">1130<"), "Feed must not use the personal-watercraft vehicle category");
check(xml.includes("<g:price>149.00 EUR</g:price>"), "Bodyboard feed price");
check(xml.includes("<g:price>119.00 EUR</g:price>"), "Skimboard feed price");
check(xml.includes("<g:google_product_category>6287</g:google_product_category>"), "Bodyboard category");
check(xml.includes("<g:google_product_category>6286</g:google_product_category>"), "Skimboard category");
check((xml.match(/<g:availability>out_of_stock<\/g:availability>/g) ?? []).length === 6, "Unconfirmed products stay out of stock");
check(xml.includes("<g:id>TW-EXPLORER-PACK-001</g:id>"), "Feed includes the Explorer backpack");
check(xml.includes("<g:id>TW-NOMAD-PACK-001</g:id>"), "Feed includes the Nomad backpack");
check(xml.includes("<g:id>TW-COASTLINE-PONCHO-001</g:id>"), "Feed includes the poncho");
check(xml.includes("<g:id>TW-SUNSET-BAG-001</g:id>"), "Feed includes the beach bag");
check(xml.includes("<g:price>69.90 EUR</g:price>"), "Explorer price");
check(xml.includes("<g:price>79.90 EUR</g:price>"), "Nomad price");
check(xml.includes("<g:price>39.90 EUR</g:price>"), "Poncho price");
check(xml.includes("<g:price>34.90 EUR</g:price>"), "Beach bag price");
check(xml.includes("<g:google_product_category>100</g:google_product_category>"), "Backpack category");
check(!/waterproof|wasserdicht/i.test(xml), "Feed must not claim waterproof");
check((xml.match(/<g:availability>in_stock<\/g:availability>/g) ?? []).length === 4, "The four surfboards stay in stock");

for (const product of offered) {
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
  check(
    (xml.match(/<g:price>0\.00 EUR<\/g:price>/g) ?? []).length === offered.length,
    "These boards ship free",
  );
  check(xml.includes(product.description.split(" ").slice(0, 4).join(" ")), `Feed description ${product.id}`);
}

async function validateImages() {
  const hashes = new Set<string>();
  for (const product of products) {
    for (const image of productImages(product)) {
      const file = path.join(process.cwd(), "public", image.src);
    const bytes = readFileSync(file);
    const meta = await sharp(bytes).metadata();
      const longSide = Math.max(meta.width ?? 0, meta.height ?? 0);
      const shortSide = Math.min(meta.width ?? 0, meta.height ?? 0);
      check(longSide >= 1000 && shortSide >= 500, `${image.src} must keep a native long side of at least 1000px`);
      check(meta.format === "webp", `${image.src} must be webp`);
      const text = bytes.toString("latin1");
      check(/trainedAlgorithmicMedia/i.test(text), `${image.src} must keep AI source metadata`);
      const hash = createHash("sha256").update(bytes).digest("hex");
      check(!hashes.has(hash), `${image.src} must be a distinct file`);
      hashes.add(hash);
    }
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
