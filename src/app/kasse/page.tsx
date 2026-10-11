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
        <p>
          Der Versand nach Deutschland steht auf der Bestellung. Steuer und Zahlung sind noch
          nicht bestätigt, deshalb wird hier keine Bestellung ausgeführt.
        </p>
      </header>
      <CheckoutView />
    </div>
  );
}
