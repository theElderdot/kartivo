import { storeConfig } from "@/config/store";
import { products, type Product } from "@/data/catalog";

export type GoogleAvailability = "in_stock" | "out_of_stock" | "preorder" | "backorder";

/**
 * Feed and structured-data availability from confirmed inventory only.
 * Checkout stays gated in isPurchasable(); do not tie Merchant Center stock to payment setup.
 */
export function googleAvailability(product: Product): GoogleAvailability {
  if (product.stockQuantity === null) return "out_of_stock";
  if (product.stockQuantity > 0) return "in_stock";
  return "out_of_stock";
}

export function schemaAvailability(product: Product): string {
  switch (googleAvailability(product)) {
    case "in_stock":
      return "https://schema.org/InStock";
    case "preorder":
      return "https://schema.org/PreOrder";
    case "backorder":
      return "https://schema.org/BackOrder";
    default:
      return "https://schema.org/OutOfStock";
  }
}

/** German label for apparel size shown on product pages (feed keeps Google values). */
export function apparelSizeLabel(product: Product): string | null {
  if (!product.apparelFeed) return null;
  if (product.apparelFeed.size === "One size") return "Einheitsgröße";
  return product.apparelFeed.size;
}

export function conceptFeedStockNote(product: Product): string {
  if (product.stockQuantity === null) {
    return "Der Bestand ist noch nicht bestätigt, deshalb steht im Feed nicht vorrätig.";
  }
  return `${product.stockQuantity} Stück sind im Feed als vorrätig hinterlegt.`;
}

export function stockLabel(product: Product): string {
  if (product.stockQuantity === null) {
    return "Bestand noch nicht bestätigt. Derzeit nicht als verfügbar gekennzeichnet.";
  }
  if (product.stockQuantity > 0 && storeConfig.payment.configured) {
    return `${product.stockQuantity} auf Lager`;
  }
  if (product.stockQuantity > 0) {
    return `${product.stockQuantity} auf Lager. Eine Bestellung ist noch nicht möglich, weil die Zahlung nicht angebunden ist.`;
  }
  return "Derzeit nicht auf Lager";
}

export function canAddToCart(product: Product): boolean {
  return product.stockQuantity !== null && product.stockQuantity > 0;
}

export function isPurchasable(product: Product): boolean {
  return (
    storeConfig.readyForLaunch &&
    storeConfig.payment.configured &&
    storeConfig.shipping.confirmed &&
    storeConfig.tax.confirmed &&
    storeConfig.legalReviewCompleted &&
    storeConfig.images.representRealProducts &&
    product.detailsConfirmed &&
    product.stockQuantity !== null &&
    product.stockQuantity > 0
  );
}

export function canPublishAnnouncement(): boolean {
  return (
    storeConfig.announcement.enabled &&
    storeConfig.shipping.confirmed &&
    storeConfig.shipping.flatRateEur === 0
  );
}

/** Shipping charge for one order. Null while the shipping policy is unconfirmed. */
export function orderShippingEur(goodsSubtotal: number): number | null {
  const shipping = storeConfig.shipping;
  if (!shipping.confirmed || shipping.flatRateEur == null) return null;
  if (
    shipping.freeShippingFromEur != null &&
    goodsSubtotal >= shipping.freeShippingFromEur
  ) {
    return 0;
  }
  return shipping.flatRateEur;
}

export function robotsPolicy(readyForLaunch: boolean): {
  index: boolean;
  follow: boolean;
} {
  if (readyForLaunch) return { index: true, follow: true };
  return { index: false, follow: false };
}

function missing(label: string, value: string | null): string | null {
  return value && value.trim() ? null : label;
}

export function launchBlockers(): string[] {
  const business = storeConfig.business;
  const shipping = storeConfig.shipping;
  const returns = storeConfig.returns;
  const tax = storeConfig.tax;
  const blockers = [
    missing("Rechtlicher Unternehmensname", business.legalName),
    missing(
      "Ladungsfähige Anschrift",
      business.addressLines?.join(", ") ?? null,
    ),
    missing("Kontakt-E-Mail", business.email),
    business.phoneApplicable === null
      ? "Entscheidung, ob eine Telefonnummer veröffentlicht wird"
      : business.phoneApplicable
        ? missing("Telefonnummer", business.phone)
        : null,
    business.registerApplicable === null
      ? "Entscheidung zu Registergericht und Registernummer"
      : business.registerApplicable
        ? missing("Registergericht", business.registerCourt) ??
          missing("Registernummer", business.registerNumber)
        : null,
    business.vatIdApplicable === null
      ? "Entscheidung zur Umsatzsteuer-Identifikationsnummer"
      : business.vatIdApplicable
        ? missing("Umsatzsteuer-Identifikationsnummer", business.vatId)
        : null,
    missing("Verantwortliche Person für redaktionelle Inhalte", business.contentResponsible),
    missing("Erreichbarkeit des Kundenservice", business.customerServiceHours),
    shipping.confirmed ? null : "Bestätigte Versandregeln",
    shipping.confirmed ? missing("Liefergebiet", shipping.countries?.join(", ") ?? null) : null,
    shipping.confirmed ? missing("Versandkosten", shipping.chargesSummary) : null,
    shipping.confirmed ? missing("Lieferzeit", shipping.deliveryEstimate) : null,
    shipping.confirmed ? missing("Versandort", shipping.origin) : null,
    shipping.confirmed ? missing("Bearbeitungszeit", shipping.processingTime) : null,
    shipping.confirmed && shipping.trackingAvailable === null
      ? "Angabe, ob eine Sendungsverfolgung angeboten wird"
      : null,
    shipping.confirmed && !shipping.countryCode
      ? "Ländercode für den Google-Feed"
      : null,
    returns.confirmed ? null : "Bestätigte Rückgabe- und Erstattungsregeln",
    returns.confirmed ? missing("Rückgabefrist", returns.period) : null,
    returns.confirmed ? missing("Rückgabeablauf", returns.procedure) : null,
    returns.confirmed ? missing("Erstattungsmethode", returns.refundMethod) : null,
    returns.confirmed ? missing("Zeitpunkt der Erstattung", returns.refundTiming) : null,
    returns.confirmed ? missing("Kosten der Rücksendung", returns.returnShippingCost) : null,
    returns.confirmed ? missing("Rücksendeadresse", returns.returnAddress) : null,
    returns.confirmed ? missing("Kontakt für Rückfragen", returns.supportContact) : null,
    tax.confirmed ? null : "Bestätigter Steuerstatus",
    tax.confirmed && tax.pricesIncludeVat === null
      ? "Angabe, ob die Katalogpreise die Mehrwertsteuer enthalten"
      : null,
    tax.confirmed && tax.vatRate === null ? "Bestätigter Mehrwertsteuersatz" : null,
    storeConfig.payment.configured ? null : "Konfigurierter Zahlungsanbieter",
    storeConfig.payment.configured
      ? missing("Name des Zahlungsanbieters", storeConfig.payment.providerName)
      : null,
    storeConfig.images.representRealProducts
      ? null
      : "Produktfotos, die den tatsächlich angebotenen Boards entsprechen",
    storeConfig.legalReviewCompleted
      ? null
      : "Rechtliche Prüfung von Impressum, Datenschutz, AGB, Widerruf, Preisangabe und Verbraucherrecht",
    ...products.flatMap((product) => {
      const items: Array<string | null> = [];
      if (product.stockQuantity === null) {
        items.push(`Bestätigter Bestand für ${product.name}`);
      }
      if (!product.detailsConfirmed) {
        items.push(`Prüfung der Produktangaben für ${product.name} an der realen Ware`);
      }
      return items;
    }),
  ];

  return blockers.filter((item): item is string => Boolean(item));
}
