import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { GoogleAdsTag } from "@/components/GoogleAdsTag";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { PreviewBanner } from "@/components/PreviewBanner";
import { siteUrl, storeConfig } from "@/config/store";
import { robotsPolicy } from "@/lib/commerce";
import { websiteJsonLd } from "@/lib/jsonld";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const indexing = robotsPolicy(storeConfig.indexPages);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KARTIVO | Surfboards",
    template: "%s | KARTIVO",
  },
  description:
    "Vier Boards. Dein nächstes Abenteuer. Entdecke Surfboards für unterschiedliche Levels und finde deinen Style auf dem Wasser.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "KARTIVO",
    images: [{ url: "/images/hero.webp", alt: "Surfer auf einer Welle im offenen Meer" }],
  },
  robots: indexing,
};

export const viewport: Viewport = {
  themeColor: "#06232e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${outfit.variable} ${fraunces.variable}`}>
      <body>
        <GoogleAdsTag />
        <JsonLd data={websiteJsonLd()} />
        <CartProvider>
          <a className="skip-link" href="#inhalt">
            Zum Inhalt
          </a>
          <PreviewBanner />
          <AnnouncementBar />
          <Header />
          <main id="inhalt">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
