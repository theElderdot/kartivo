import { pageMetadata } from "@/lib/metadata";
import { CartView } from "./CartView";

export const metadata = pageMetadata({
  title: "Warenkorb",
  description: "Dein KARTIVO Warenkorb. Preise kommen aus dem Produktkatalog.",
  path: "/warenkorb",
});

export default function CartPage() {
  return (
    <div className="page-wrap">
      <header className="page-intro">
        <p className="eyebrow">Warenkorb</p>
        <h1>Deine Auswahl</h1>
      </header>
      <CartView />
    </div>
  );
}
