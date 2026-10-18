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
export const MINI_WATER_SCOOTERS = "Mini Water Scooters";

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
    id: "AQV-WAVE-MINI-001",
    sku: "AQV-WAVE-MINI-001",
    slug: "aquavolt-wave-mini",
    name: "AQUAVOLT Wave Mini",
    title: "AQUAVOLT Wave Mini kompakter Wasserscooter Weiß",
    description:
      "Der AQUAVOLT Wave Mini ist ein kompaktes Konzept für einen persönlichen Wasserscooter. Die Form ist auf Tragbarkeit, Lagerung und Transport ausgelegt und für Freizeit auf erlaubten Gewässern gedacht. Geschwindigkeit, Akku, Wasserdichtigkeit, Maße und der Lieferumfang sind nicht geprüft und werden deshalb nicht angegeben.",
    cardDescription:
      "Kompaktes Wasserscooter-Konzept in Weiß und Eisblau, gedacht für Freizeit auf erlaubten Gewässern.",
    highlights: [
      "Kompaktes, tragbares Konzept",
      "Griff an der Oberseite",
      "Stromlinienförmige Außenform",
      "Für Freizeit auf erlaubten Gewässern",
    ],
    price: 499,
    currency: "EUR",
    condition: "new",
    brand: "AQUAVOLT",
    productType: "Mini Water Scooter",
    feedProductType: "Mini Water Scooters",
    lengthLabel: null,
    color: "Weiß und Eisblau",
    feedColor: "Weiß",
    skillLevel: "Freizeit",
    category: MINI_WATER_SCOOTERS,
    publishToFeed: false,
    image: "/images/products/aquavolt-wave-mini.webp",
    imageAlt:
      "Konzeptfoto des weißen AQUAVOLT Wave Mini Wasserscooters mit Griff, auf klarem blauem Wasser",
    gallery: [
      {
        src: "/images/products/aquavolt-wave-mini-detail.webp",
        alt: "Nahansicht des weißen AQUAVOLT Wave Mini mit Griff und Schriftzug auf blauem Wasser",
      },
      {
        src: "/images/products/aquavolt-wave-mini-lake.webp",
        alt: "Konzeptfoto des AQUAVOLT Wave Mini am Ufer eines ruhigen Sees",
      },
    ],
    absentTopics: [
      "Maße, Gewicht und Tragkraft",
      "Geschwindigkeit und Reichweite",
      "Akku, Ladezeit und Motorleistung",
      "Wasserdichtigkeit und Zertifizierungen",
      "Lieferumfang",
      "Herstelleradresse und Garantie",
      "GTIN und MPN",
    ],
    specs: [
      { label: "Marke", value: "AQUAVOLT" },
      { label: "SKU", value: "AQV-WAVE-MINI-001" },
      { label: "Kategorie", value: "Mini Water Scooter" },
      { label: "Einsatz", value: "Freizeit auf erlaubten Gewässern" },
      { label: "Form", value: "Kompakter Entwurf mit Griff" },
      { label: "Farbe", value: "Weiß und Eisblau, Konzeptfarbe" },
    ],
    stockQuantity: null,
    detailsConfirmed: sharedUnconfirmed,
    gtin: null,
    mpn: null,
  },
  {
    id: "AQV-WAVE-PRO-001",
    sku: "AQV-WAVE-PRO-001",
    slug: "aquavolt-wave-pro",
    name: "AQUAVOLT Wave Pro",
    title: "AQUAVOLT Wave Pro kompakter Wasserscooter Graphit",
    description:
      "Der AQUAVOLT Wave Pro ist ein kompakteres Premium-Konzept für persönliche Wassermobilität. Die dunkle Form mit türkisem Streifen ist als tragbare Alternative zu größeren Wassermotorrädern gedacht, nur für Freizeit auf erlaubten Gewässern. Geschwindigkeit, Akku, Wasserdichtigkeit, Maße und der Lieferumfang sind nicht geprüft und werden nicht angegeben.",
    cardDescription:
      "Dunkles Wasserscooter-Konzept mit türkisem Streifen, gedacht als tragbare Freizeitform.",
    highlights: [
      "Kompakter Körper für den Transport",
      "Steuergriff auf der Oberseite",
      "Graphitfarbenes Konzept mit türkisem Streifen",
      "Nur für erlaubte Gewässer",
    ],
    price: 799,
    currency: "EUR",
    condition: "new",
    brand: "AQUAVOLT",
    productType: "Mini Water Scooter",
    feedProductType: "Mini Water Scooters",
    lengthLabel: null,
    color: "Graphit mit türkisem Streifen",
    feedColor: "Graphit",
    skillLevel: "Freizeit",
    category: MINI_WATER_SCOOTERS,
    publishToFeed: false,
    image: "/images/products/aquavolt-wave-pro.webp",
    imageAlt:
      "Konzeptfoto des graphitfarbenen AQUAVOLT Wave Pro Wasserscooters mit türkisem Streifen auf türkisem Wasser",
    gallery: [
      {
        src: "/images/products/aquavolt-wave-pro-detail.webp",
        alt: "Nahansicht des graphitfarbenen AQUAVOLT Wave Pro mit Steuergriff auf türkisem Wasser",
      },
      {
        src: "/images/products/aquavolt-wave-pro-beach.webp",
        alt: "Konzeptfoto des AQUAVOLT Wave Pro am Rand eines leeren Strandes",
      },
    ],
    absentTopics: [
      "Maße, Gewicht und Tragkraft",
      "Geschwindigkeit und Reichweite",
      "Akku, Ladezeit und Motorleistung",
      "Wasserdichtigkeit und Zertifizierungen",
      "Lieferumfang",
      "Herstelleradresse und Garantie",
      "GTIN und MPN",
    ],
    specs: [
      { label: "Marke", value: "AQUAVOLT" },
      { label: "SKU", value: "AQV-WAVE-PRO-001" },
      { label: "Kategorie", value: "Mini Water Scooter" },
      { label: "Einsatz", value: "Freizeit auf erlaubten Gewässern" },
      { label: "Form", value: "Kompakter Entwurf mit Steuergriff" },
      { label: "Farbe", value: "Graphit mit türkisem Streifen, Konzeptfarbe" },
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
