import Script from "next/script";
import { storeConfig } from "@/config/store";

/** Sitewide Google tag so Merchant Center can see the Ads account. No purchase event. */
export function GoogleAdsTag() {
  const tagId = storeConfig.googleAdsTagId;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`} strategy="afterInteractive" />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${tagId}');`}
      </Script>
    </>
  );
}
