/**
 * Single product catalog. Pages, cart prices, JSON-LD, and the Google feed
 * all read this file. Prices are sample catalog prices from the merchant brief.
 *
 * stockQuantity is the merchant's confirmed count for each board.
 * Leave gtin null unless a genuine GTIN has been issued.
 * Leave mpn null until the manufacturer part number is confirmed.
 * Set detailsConfirmed only after the row values match the physical board.
 */

export type CatalogSpec = {
  label: string;
  value: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export const SURFBOARDS = "Surfboards";
export const AQUAVOLT_BOARDS = "AQUAVOLT Boards";

export type Product = {
  /** Stable Google Merchant Center offer id. */
  id: string;
  sku: string;
  slug: string;
  /** Short name used on cards. */
  name: string;
  /** German title used on the product page, in metadata, and in the feed. */
  title: string;
  description: string;
  cardDescription: string;
  highlights: readonly string[];
  /** Decimal euros. */
  price: number;
  currency: "EUR";
  condition: "new";
  brand: string;
  productType: string;
  feedProductType: string;
  /** Google taxonomy ID. Omit to use the surfboard category in the store config. */
  googleProductCategoryId?: number;
  lengthLabel: string | null;
  /** Full color description shown on the page. */
  color: string;
  /** Primary color submitted to Google. */
  feedColor: string;
  skillLevel: string;
  /** Shop grouping. Boards stay in Surfboards when this is omitted. */
  category?: string;
  /**
   * False keeps an unverified concept out of the Google feed and the sitemap.
   * Boards stay listed because their stock was confirmed.
   */
  publishToFeed?: boolean;
  image: string;
  imageAlt: string;
  gallery?: readonly ProductImage[];
  /** Topics this product must not invent. Falls back to the board list. */
  absentTopics?: readonly string[];
  specs: readonly CatalogSpec[];
  /**
   * null = the merchant has not confirmed a quantity.
   * A number is a real count. Zero means confirmed empty, not a guess.
   */
  stockQuantity: number | null;
  /** Set true only after specs have been checked against the board being sold. */
  detailsConfirmed: boolean;
  gtin: string | null;
  mpn: string | null;
};

const sharedUnconfirmed = false;

export const products: readonly Product[] = [
  {
    id: "KART-WAVE-STARTER-001",
    sku: "KART-WAVE-STARTER-001",
    slug: "kartivo-wave-starter",
    name: "KARTIVO Wave Starter",
    title: "KARTIVO Wave Starter Surfboard 8'0 Zoll Türkis für Anfänger",
    description:
      "Entdecke das Surfen mit dem KARTIVO Wave Starter. Dieses Soft-Top-Surfboard wurde für Einsteiger entwickelt, die mehr Stabilität und ein angenehmes Fahrgefühl suchen. Das 8'0-Zoll-Board bietet eine großzügige Standfläche und unterstützt dich beim Lernen und beim Fangen deiner ersten Wellen. Das türkisfarbene Design bringt frischen Ocean-Style an den Strand. Ideal für entspannte Surf-Sessions und deinen Einstieg in die Welt des Surfens.",
    cardDescription:
      "Soft-Top-Surfboard für Einsteiger mit großzügiger Standfläche und türkisfarbenem Design.",
    highlights: [
      "Soft-Top-Design",
      "Großzügige Standfläche",
      "Einsteigerorientiertes Design",
      "Türkisfarbenes Finish",
    ],
    price: 299,
    currency: "EUR",
    condition: "new",
    brand: "KARTIVO",
    productType: "Soft-Top-Longboard",
    feedProductType: "Surfboards > Soft-Top-Longboard",
    lengthLabel: "8'0\" / 244 cm",
    color: "Türkis",
    feedColor: "Türkis",
    skillLevel: "Anfänger",
    image: "/images/products/kartivo-wave-starter.webp",
    imageAlt:
      "Türkises KARTIVO Wave Starter Soft-Top-Surfboard, vollständig auf dem Sand liegend",
    specs: [
      { label: "Marke", value: "KARTIVO" },
      { label: "SKU", value: "KART-WAVE-STARTER-001" },
      { label: "Zustand", value: "Neu" },
      { label: "Produkttyp", value: "Soft-Top-Longboard" },
      { label: "Länge", value: "8'0\" / 244 cm" },
      { label: "Farbe", value: "Türkis" },
      { label: "Niveau", value: "Anfänger" },
    ],
    stockQuantity: 5,
    detailsConfirmed: sharedUnconfirmed,
    gtin: null,
    mpn: null,
  },
  {
    id: "KART-OCEAN-CRUISER-001",
    sku: "KART-OCEAN-CRUISER-001",
    slug: "kartivo-ocean-cruiser",
    name: "KARTIVO Ocean Cruiser",
    title: "KARTIVO Ocean Cruiser Funboard 7'0 Zoll Creme Allround Surfboard",
    description:
      "Mit dem KARTIVO Ocean Cruiser entdeckst du vielseitige Möglichkeiten auf dem Wasser. Das 7'0-Zoll-Funboard verbindet ein ausgewogenes Design mit einem sportlichen Look. Es richtet sich an Surfer, die ihre Fähigkeiten weiterentwickeln und ein vielseitiges Board für unterschiedliche Sessions suchen. Die cremefarbene Oberfläche mit dezenten dunkelblauen Details verleiht dem Board einen zeitlosen Premium-Look.",
    cardDescription:
      "Vielseitiges Funboard für Surfer, die ihre Fähigkeiten weiterentwickeln möchten.",
    highlights: [
      "Vielseitiges Funboard-Design",
      "Für fortschreitende Surfer",
      "Cremefarbenes Finish",
      "Dezente dunkelblaue Details",
    ],
    price: 449,
    currency: "EUR",
    condition: "new",
    brand: "KARTIVO",
    productType: "Funboard",
    feedProductType: "Surfboards > Funboard",
    lengthLabel: "7'0\" / 213 cm",
    color: "Creme mit dunkelblauen Details",
    feedColor: "Creme",
    skillLevel: "Einsteiger bis leicht fortgeschritten",
    image: "/images/products/kartivo-ocean-cruiser.webp",
    imageAlt:
      "Cremefarbenes KARTIVO Ocean Cruiser Funboard mit dunkelblauen Details, vollständig auf dem Sand liegend",
    specs: [
      { label: "Marke", value: "KARTIVO" },
      { label: "SKU", value: "KART-OCEAN-CRUISER-001" },
      { label: "Zustand", value: "Neu" },
      { label: "Produkttyp", value: "Funboard" },
      { label: "Länge", value: "7'0\" / 213 cm" },
      { label: "Farbe", value: "Creme mit dunkelblauen Details" },
      { label: "Niveau", value: "Einsteiger bis leicht fortgeschritten" },
    ],
    stockQuantity: 5,
    detailsConfirmed: sharedUnconfirmed,
    gtin: null,
    mpn: null,
  },
  {
    id: "KART-WAVE-PRO-001",
    sku: "KART-WAVE-PRO-001",
    slug: "kartivo-wave-pro",
    name: "KARTIVO Wave Pro",
    title: "KARTIVO Wave Pro Shortboard 6'2 Zoll Weiß Performance Surfboard",
    description:
      "Das KARTIVO Wave Pro richtet sich an erfahrene Surfer, die ein sportliches und reaktionsfreudiges Board suchen. Das 6'2-Zoll-Shortboard besitzt eine dynamische Silhouette und ein klares, leistungsorientiertes Design. Die perlweiße Oberfläche mit dunkelblauen Details unterstreicht seinen modernen Charakter. Entwickelt als Performance-Konzept für ambitionierte Surf-Sessions und präzise Manöver.",
    cardDescription:
      "Kurzes Shortboard für erfahrene Surfer mit perlweißem Finish und dunkelblauen Details.",
    highlights: [
      "Sportliches Shortboard-Design",
      "Für fortgeschrittene Surfer",
      "Perlweißes Finish",
      "Dunkelblaue Designelemente",
    ],
    price: 599,
    currency: "EUR",
    condition: "new",
    brand: "KARTIVO",
    productType: "Performance-Shortboard",
    feedProductType: "Surfboards > Performance-Shortboard",
    lengthLabel: "6'2\" / 188 cm",
    color: "Perlweiß mit dunkelblauen Details",
    feedColor: "Weiß",
    skillLevel: "Fortgeschritten bis erfahren",
    image: "/images/products/kartivo-wave-pro.webp",
    imageAlt:
      "Perlweißes KARTIVO Wave Pro Shortboard mit dunkelblauen Kanten, vollständig auf dem Sand liegend",
    specs: [
      { label: "Marke", value: "KARTIVO" },
      { label: "SKU", value: "KART-WAVE-PRO-001" },
      { label: "Zustand", value: "Neu" },
      { label: "Produkttyp", value: "Performance-Shortboard" },
      { label: "Länge", value: "6'2\" / 188 cm" },
      { label: "Farbe", value: "Perlweiß mit dunkelblauen Details" },
      { label: "Niveau", value: "Fortgeschritten bis erfahren" },
    ],
    stockQuantity: 5,
    detailsConfirmed: sharedUnconfirmed,
    gtin: null,
    mpn: null,
  },
  {
    id: "KART-VOLT-ELECTRIC-001",
    sku: "KART-VOLT-ELECTRIC-001",
    slug: "kartivo-volt-electric",
    name: "KARTIVO Volt",
    title: "KARTIVO Volt Elektrosurfboard 5'8 Zoll Graphit motorisiert",
    description:
      "Das KARTIVO Volt ist ein motorisiertes Surfboard zum Stehen auf flachem Wasser. Das 5'8-Zoll-Board hat ein graphitfarbenes Deck und eine geschlossene Motorverkleidung am Heck. Es ist kein Wellen-Shortboard. Länge, Farbe und Produkttyp sind die Katalogangaben zu diesem Entwurf.",
    cardDescription:
      "Motorisiertes Surfboard zum Stehen, mit graphitfarbenem Deck und Motorverkleidung am Heck.",
    highlights: [
      "Motorisiertes Surfboard",
      "Zum Stehen auf flachem Wasser",
      "Graphitfarbenes Deck",
      "Motorverkleidung am Heck",
    ],
    price: 600,
    currency: "EUR",
    condition: "new",
    brand: "KARTIVO",
    productType: "Elektrosurfboard",
    feedProductType: "Surfboards > Elektrosurfboard",
    lengthLabel: "5'8\" / 173 cm",
    color: "Graphit",
    feedColor: "Graphit",
    skillLevel: "Fahrer mit Stand-Erfahrung",
    image: "/images/products/kartivo-volt-electric.webp",
    imageAlt:
      "Graphitfarbenes KARTIVO Volt Elektrosurfboard mit Motorverkleidung am Heck, vollständig auf dem Sand liegend",
    specs: [
      { label: "Marke", value: "KARTIVO" },
      { label: "SKU", value: "KART-VOLT-ELECTRIC-001" },
      { label: "Zustand", value: "Neu" },
      { label: "Produkttyp", value: "Elektrosurfboard" },
      { label: "Länge", value: "5'8\" / 173 cm" },
      { label: "Farbe", value: "Graphit" },
      { label: "Niveau", value: "Fahrer mit Stand-Erfahrung" },
    ],
    stockQuantity: 5,
    detailsConfirmed: sharedUnconfirmed,
    gtin: null,
    mpn: null,
  },
  {
    id: "AQV-DRIFT-BODY-001",
    sku: "AQV-DRIFT-BODY-001",
    slug: "aquavolt-drift-bodyboard",
    name: "AQUAVOLT Drift",
    title: "AQUAVOLT Drift Bodyboard Weiß",
    description:
      "Das AQUAVOLT Drift ist ein Bodyboard für Wellen, auf dem du liegst und selbst paddelst. Es hat keinen Motor, keinen Akku und kein Segel. Die weiße Fläche mit hellblauem Rand ist ein Konzept für Freizeit im Wasser. Maße, Material und Lieferumfang sind nicht geprüft und werden nicht angegeben.",
    cardDescription: "Weißes Bodyboard mit hellblauem Rand. Kein Motor und kein Segel.",
    highlights: ["Bodyboard zum Liegen", "Kein Motor", "Kein Segel", "Weiß mit hellblauem Rand"],
    price: 149,
    currency: "EUR",
    condition: "new",
    brand: "AQUAVOLT",
    productType: "Bodyboard",
    feedProductType: "Surfing > Bodyboards",
    googleProductCategoryId: 6287,
    lengthLabel: null,
    color: "Weiß mit hellblauem Rand",
    feedColor: "Weiß",
    skillLevel: "Freizeit",
    category: AQUAVOLT_BOARDS,
    image: "/images/products/aquavolt-drift-bodyboard.webp",
    imageAlt: "Weißes AQUAVOLT Drift Bodyboard mit hellblauem Rand im flachen Wasser",
    absentTopics: ["Maße und Gewicht", "Material", "Lieferumfang", "Zertifizierungen", "GTIN und MPN"],
    specs: [
      { label: "Marke", value: "AQUAVOLT" },
      { label: "SKU", value: "AQV-DRIFT-BODY-001" },
      { label: "Kategorie", value: "Bodyboard" },
      { label: "Antrieb", value: "Keiner. Kein Motor und kein Segel." },
      { label: "Farbe", value: "Weiß mit hellblauem Rand, Konzeptfarbe" },
    ],
    stockQuantity: null,
    detailsConfirmed: sharedUnconfirmed,
    gtin: null,
    mpn: null,
  },
  {
    id: "AQV-GLIDE-SKIM-001",
    sku: "AQV-GLIDE-SKIM-001",
    slug: "aquavolt-glide-skimboard",
    name: "AQUAVOLT Glide",
    title: "AQUAVOLT Glide Skimboard Sand",
    description:
      "Das AQUAVOLT Glide ist ein Skimboard für den flachen Auslauf am Strand. Du trägst es selbst und gleitest über das dünne Wasser. Es hat keinen Motor, keinen Akku und kein Segel. Maße, Material und Lieferumfang sind nicht geprüft und werden nicht angegeben.",
    cardDescription: "Sandfarbenes Skimboard mit marineblauem Rand. Kein Motor und kein Segel.",
    highlights: ["Skimboard für flaches Wasser", "Kein Motor", "Kein Segel", "Sandfarben mit marineblauem Rand"],
    price: 119,
    currency: "EUR",
    condition: "new",
    brand: "AQUAVOLT",
    productType: "Skimboard",
    feedProductType: "Surfing > Skimboards",
    googleProductCategoryId: 6286,
    lengthLabel: null,
    color: "Sand mit marineblauem Rand",
    feedColor: "Sand",
    skillLevel: "Freizeit",
    category: AQUAVOLT_BOARDS,
    image: "/images/products/aquavolt-glide-skimboard.webp",
    imageAlt: "Sandfarbenes AQUAVOLT Glide Skimboard mit marineblauem Rand am Strand",
    absentTopics: ["Maße und Gewicht", "Material", "Lieferumfang", "Zertifizierungen", "GTIN und MPN"],
    specs: [
      { label: "Marke", value: "AQUAVOLT" },
      { label: "SKU", value: "AQV-GLIDE-SKIM-001" },
      { label: "Kategorie", value: "Skimboard" },
      { label: "Antrieb", value: "Keiner. Kein Motor und kein Segel." },
      { label: "Farbe", value: "Sand mit marineblauem Rand, Konzeptfarbe" },
    ],
    stockQuantity: null,
    detailsConfirmed: sharedUnconfirmed,
    gtin: null,
    mpn: null,
  },
];

/** Intentionally absent. Do not fill these in without checking the real board. */
export const unverifiedSpecTopics = [
  "Material und Aufbau",
  "Volumen, Breite und Dicke",
  "Gewicht",
  "Fin-System und mitgelieferte Finnen",
  "Hersteller, Produktionsort und Garantie",
  "Messergebnisse, Tests und Zertifizierungen",
  "GTIN",
  "Motorleistung, Akku und Reichweite",
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return products.find((product) => product.sku === sku);
}

export function productCategory(product: Product): string {
  return product.category ?? SURFBOARDS;
}

/** Confirmed surfboard offers. Unverified concepts stay on the site and out of the feed. */
export function feedProducts(): Product[] {
  return products.filter((product) => product.publishToFeed !== false);
}

export function productsInCategory(category: string): Product[] {
  return products.filter((product) => productCategory(product) === category);
}

export function productImages(product: Product): ProductImage[] {
  return [{ src: product.image, alt: product.imageAlt }, ...(product.gallery ?? [])];
}

export function searchProducts(query: string): Product[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [...products];
  return products.filter((product) => {
    const haystack = [
      product.name,
      product.title,
      product.description,
      product.color,
      product.skillLevel,
      product.sku,
      product.productType,
      productCategory(product),
      product.brand,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export const imageCaption = storeImageCaption();

function storeImageCaption(): string {
  return "Konzeptfoto, KI-generiert. Es zeigt den gestalterischen Entwurf und kein geprüftes Foto eines ausgelieferten Produkts. Vor dem Verkauf durch eine Aufnahme der realen Ware ersetzen, falls die Herstellung abweicht.";
}
