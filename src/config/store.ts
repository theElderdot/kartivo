/**
 * Merchant configuration. Leave unknown values as null.
 * Do not invent a legal name, address, VAT ID, shipping promise, or tax rate.
 *
 * The store stays in preview until `readyForLaunch` is set true AND
 * `launchBlockers()` in src/lib/commerce.ts returns an empty list.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kartivo.de"
).replace(/\/$/, "");

export const storeConfig = {
  brand: "KARTIVO",
  locale: "de-DE",
  language: "de",
  currency: "EUR" as const,

  /**
   * Manual launch switch. Product pages are indexable only when this is true.
   * Keep false while placeholders, concept photos, or an unfinished checkout remain.
   */
  readyForLaunch: false as boolean,

  /** Set true only after a qualified review of the German/EU consumer pages. */
  legalReviewCompleted: false as boolean,

  announcement: {
    /**
     * Sample offer. Stays hidden until this flag is true AND shipping is confirmed
     * with a matching free-shipping threshold. Do not enable on the strength of the sample sentence alone.
     */
    enabled: false as boolean,
    text: "Kostenloser Versand ab 100 €",
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
    confirmed: false as boolean,
    countries: null as string[] | null,
    chargesSummary: null as string | null,
    deliveryEstimate: null as string | null,
    origin: null as string | null,
    processingTime: null as string | null,
    trackingAvailable: null as boolean | null,
    freeShippingFromEur: null as number | null,
    /** Included in the Google feed only when confirmed. */
    feed: null as null | { country: string; service: string; priceEur: number },
  },

  returns: {
    confirmed: false as boolean,
    period: null as string | null,
    procedure: null as string | null,
    refundMethod: null as string | null,
    refundTiming: null as string | null,
    returnShippingCost: null as string | null,
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
