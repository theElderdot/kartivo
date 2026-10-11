import type { Metadata } from "next";
import { siteUrl } from "@/config/store";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/hero.webp",
  imageAlt = "Surfer auf einer Welle im offenen Meer",
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "KARTIVO",
      locale: "de_DE",
      type: "website",
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
