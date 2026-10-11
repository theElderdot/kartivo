/**
 * Single product catalog. Pages, cart prices, JSON-LD, and the Google feed
 * all read this file. Prices are sample catalog prices from the merchant brief.
 *
 * Leave stockQuantity null until a real count is known.
 * Leave gtin null unless a genuine GTIN has been issued.
 * Leave mpn null until the manufacturer part number is confirmed.
 * Set detailsConfirmed only after the row values match the physical board.
 */

export type CatalogSpec = {
  label: string;
  value: string;
};

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
  brand: "KARTIVO";
  productType: string;
  feedProductType: string;
  lengthLabel: string;
  /** Full color description shown on the page. */
  color: string;
  /** Primary color submitted to Google. */
  feedColor: string;
  skillLevel: string;
  image: string;
  imageAlt: string;
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
    stockQuantity: null,
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
    stockQuantity: null,
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
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductBySku(sku: string): Product | undefined {
  return products.find((product) => product.sku === sku);
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
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export const imageCaption = storeImageCaption();

function storeImageCaption(): string {
  return "Konzeptfoto, KI-generiert. Es zeigt den gestalterischen Entwurf und kein geprüftes Foto eines ausgelieferten Boards. Vor dem Verkauf durch eine Aufnahme des realen Produkts ersetzen, falls die Herstellung abweicht.";
}
