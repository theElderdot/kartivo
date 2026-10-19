/**
 * Merchant configuration. Leave unknown values as null.
 * Do not invent a legal name, street address, VAT ID, or tax rate.
 * Shipping and returns below are the published Germany policy.
 *
 * The store stays in preview until `readyForLaunch` is set true AND
 * `launchBlockers()` in src/lib/commerce.ts returns an empty list.
 */

/** Merchant Center and Googlebot should fetch images on the canonical host (no apex redirect). */
export function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  if (!trimmed) return "https://www.kartivo.de";
  try {
    const url = new URL(trimmed);
    if (url.hostname === "kartivo.de") url.hostname = "www.kartivo.de";
    return url.origin;
  } catch {
    return trimmed;
  }
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kartivo.de",
);

export const storeConfig = {
  brand: "KARTIVO",
  locale: "de-DE",
  language: "de",
  currency: "EUR" as const,

  /**
   * Manual launch switch. Keep false while placeholders, concept photos,
   * or an unfinished checkout remain. This does not control indexing.
   */
  readyForLaunch: false as boolean,

  /**
   * Google Merchant Center rejects product landing pages that send noindex.
   * Cart and checkout stay disallowed in robots.txt.
   */
  indexPages: true as boolean,

  /** Set true only after a qualified review of the German/EU consumer pages. */
  legalReviewCompleted: false as boolean,

  /**
   * Google tag from the Ads account. The purchase event uses the label below and
   * runs only after a paid order, with that order's total and transaction id.
   */
  googleAdsTagId: "AW-18507455330",
  googleAdsPurchaseSendTo: "AW-18507455330/EqjDCPvB7J0dEOK2hflE",

  announcement: {
    /**
     * Published only when shipping is confirmed and every Germany order ships free.
     */
    enabled: true as boolean,
    text: "Kostenloser Versand",
  },

  business: {
    legalName: null as string | null,
    addressLines: null as string[] | null,
    email: null as string | null,
    phone: null as string | null,
    /** null = not yet decided. false = no public phone number. */
    phoneApplicable: null as boolean | null,
    registerCourt: null as string | null,
    registerNumber: null as string | null,
    registerApplicable: null as boolean | null,
    vatId: null as string | null,
    vatIdApplicable: null as boolean | null,
    contentResponsible: null as string | null,
    customerServiceHours: null as string | null,
  },

  shipping: {
    confirmed: true as boolean,
    countries: ["Deutschland"] as string[] | null,
    countryCode: "DE",
    /** Charge for one shipment inside Germany. Zero means every order ships free. */
    flatRateEur: 0,
    freeShippingFromEur: 0 as number | null,
    chargesSummary: "Kostenloser Versand für jede Bestellung nach Deutschland.",
    deliveryEstimate:
      "Voraussichtlich 3–8 Werktage: 1–3 Werktage Bearbeitung und danach 2–5 Werktage Transport.",
    origin: "Deutschland",
    processingTime:
      "1–3 Werktage, Montag bis Freitag. Bestellungen bis 14:00 Uhr (Europe/Berlin) beginnen am selben Werktag.",
    trackingAvailable: true as boolean | null,
    cutoff: "14:00",
    timezone: "Europe/Berlin",
    handlingMinDays: 1,
    handlingMaxDays: 3,
    transitMinDays: 2,
    transitMaxDays: 5,
    feedService: "Standard",
  },

  returns: {
    confirmed: true as boolean,
    period: "14 Tage ab dem Tag, an dem die Ware eingegangen ist",
    procedure:
      "Widerruf in Textform, danach frankierte Rücksendung per Post innerhalb von 14 Tagen. Kein Umtausch, keine Abgabe an einem Übergabeort, keine Wiedereinlagerungsgebühr.",
    refundMethod: "Erstattung auf dem ursprünglichen Zahlungsweg",
    refundTiming:
      "Innerhalb von 14 Tagen nach Zugang des Widerrufs. Die Erstattung kann zurückgehalten werden, bis die Ware wieder bei uns ist oder du einen Nachweis der Rücksendung geschickt hast.",
    returnShippingCost:
      "Du trägst die unmittelbaren Kosten der Rücksendung. Ist die Ware mangelhaft oder falsch geliefert, tragen wir die Rücksendekosten.",
    returnAddress: null as string | null,
    supportContact: null as string | null,
  },

  tax: {
    confirmed: false as boolean,
    /** null until the merchant confirms whether catalog prices include VAT. */
    pricesIncludeVat: null as boolean | null,
    /** Decimal rate, for example 0.19. Do not guess. */
    vatRate: null as number | null,
  },

  payment: {
    configured: false as boolean,
    providerName: null as string | null,
  },

  images: {
    /** Concept renders. Set true only after the files match the boards being sold. */
    representRealProducts: false as boolean,
    aiGenerated: true as boolean,
  },

  /**
   * Google product taxonomy, checked against
   * https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt
   * on 2026-10-11. Submit the ID only, not the ID and the path together.
   */
  googleProductCategory: {
    id: 3320,
    path: "Sporting Goods > Outdoor Recreation > Boating & Water Sports > Surfing > Surfboards",
  },
} as const;

export type StoreConfig = typeof storeConfig;
