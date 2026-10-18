"use client";

import { storeConfig } from "@/config/store";

type Gtag = (
  command: "event",
  name: "conversion",
  params: {
    send_to: string;
    value: number;
    currency: "EUR";
    transaction_id: string;
    new_customer?: boolean;
  },
) => void;

/** Sends the Achat conversion after a payment provider confirms the order. */
export function trackPurchaseConversion(order: {
  transactionId: string;
  valueEur: number;
  newCustomer?: boolean;
}) {
  const transactionId = order.transactionId.trim();
  if (!transactionId || !(order.valueEur > 0)) return;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (!gtag) return;
  gtag("event", "conversion", {
    send_to: storeConfig.googleAdsPurchaseSendTo,
    value: order.valueEur,
    currency: "EUR",
    transaction_id: transactionId,
    ...(order.newCustomer === undefined ? {} : { new_customer: order.newCustomer }),
  });
}
