import { pageMetadata } from "@/lib/metadata";
import { CheckoutView } from "./CheckoutView";

export const metadata = pageMetadata({
  title: "Kasse",
  description: "Kasse von KARTIVO. Ohne konfigurierte Zahlung wird keine Bestellung abgeschlossen.",
  path: "/kasse",
});

export default function CheckoutPage() {
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Kasse</p>
        <h1>Bestellung prüfen</h1>
        <p>Preis, Steuer und Versand müssen feststehen, bevor hier eine Bestellung möglich ist.</p>
      </header>
      <CheckoutView />
    </div>
  );
}
