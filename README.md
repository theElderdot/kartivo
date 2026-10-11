# KARTIVO

German storefront for KARTIVO surfboards. Product pages, the cart, structured data, and the Google Merchant Center feed all read `src/data/catalog.ts`. Business facts that are still unknown live in `src/config/store.ts` and stay empty instead of being invented.

The site is a preview. Checkout does not take payment, stock is unconfirmed, and pages are marked `noindex` until `readyForLaunch` is set. `robots.txt` still allows crawling of products, images, and `/feeds/google-shopping.xml`.

## Before launch

1. Replace the concept photos if the manufactured boards differ, then set `images.representRealProducts`.
2. Enter the legal name, address, email, and the register or VAT decisions in `store.ts`.
3. Confirm shipping, returns, tax, and a real stock quantity for each SKU.
4. Connect a payment provider. The checkout button does not complete an order.
5. Have Impressum, privacy, terms, and withdrawal text reviewed for German and EU consumer law.
6. Set `legalReviewCompleted` and `readyForLaunch` only after `npm run validate` no longer lists those gaps as open in the imprint.
7. Submit `https://kartivo.de/feeds/google-shopping.xml` in Merchant Center.

Do not enable the announcement bar until the shipping policy really includes free shipping from 100 €.

## Scripts

```bash
npm run dev
npm run validate
npm run build
```
