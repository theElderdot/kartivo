import { siteUrl, storeConfig } from "@/config/store";
import { feedProducts, productImages, type Product } from "@/data/catalog";
import { schemaAvailability, orderShippingEur } from "@/lib/commerce";
import { schemaPrice } from "@/lib/format";

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: storeConfig.brand,
    url: siteUrl,
    inLanguage: "de",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/suche?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: Product) {
  const shipping = storeConfig.shipping;
  const returns = storeConfig.returns;
  const shippingEur = orderShippingEur(product.price);
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: `${siteUrl}/products/${product.slug}`,
    priceCurrency: product.currency,
    price: schemaPrice(product.price),
    availability: schemaAvailability(product),
    itemCondition: "https://schema.org/NewCondition",
  };

  if (shipping.confirmed && shippingEur != null && shipping.countryCode) {
    offer.shippingDetails = {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: schemaPrice(shippingEur),
        currency: "EUR",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: shipping.countryCode,
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: shipping.handlingMinDays,
          maxValue: shipping.handlingMaxDays,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: shipping.transitMinDays,
          maxValue: shipping.transitMaxDays,
          unitCode: "DAY",
        },
      },
    };
  }

  if (returns.confirmed) {
    offer.hasMerchantReturnPolicy = {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "DE",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 14,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
      returnLabelSource: "https://schema.org/ReturnLabelCustomerResponsibility",
      refundType: "https://schema.org/FullRefund",
      merchantReturnLink: `${siteUrl}/rueckgabe`,
    };
  }

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: productImages(product).map((image) => `${siteUrl}${image.src}`),
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    color: product.color,
    url: `${siteUrl}/products/${product.slug}`,
    offers: offer,
  };

  if (product.apparelFeed) {
    data.size = product.apparelFeed.size;
    data.audience = {
      "@type": "PeopleAudience",
      suggestedGender: product.apparelFeed.gender,
      ...(product.apparelFeed.ageGroup === "adult" ? { suggestedMinAge: 18 } : {}),
    };
  }

  if (product.gtin) data.gtin = product.gtin;
  if (product.mpn) data.mpn = product.mpn;
  return data;
}

export function returnPolicyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MerchantReturnPolicy",
    name: "Rückgabe Deutschland",
    url: `${siteUrl}/rueckgabe`,
    applicableCountry: "DE",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
    returnLabelSource: "https://schema.org/ReturnLabelCustomerResponsibility",
    refundType: "https://schema.org/FullRefund",
    merchantReturnLink: `${siteUrl}/rueckgabe`,
  };
}

export function breadcrumbJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteUrl}/products/${product.slug}`,
      },
    ],
  };
}

export function itemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "KARTIVO Surfboards",
    itemListElement: feedProducts().map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/products/${product.slug}`,
      name: product.title,
    })),
  };
}
