import Link from "next/link";
import { Logo } from "@/components/Logo";
import { storeConfig } from "@/config/store";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Logo />
          <p>Surfboards für unterschiedliche Wege aufs Wasser.</p>
          {!storeConfig.readyForLaunch ? (
            <p>Vorschau. Noch nicht zum Verkauf freigegeben.</p>
          ) : null}
        </div>
        <nav aria-label="Rechtliches und Service">
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/versand">Versand und Lieferung</Link>
          <Link href="/rueckgabe">Rückgabe und Erstattung</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutzerklärung</Link>
          <Link href="/agb">AGB</Link>
          <Link href="/widerruf">Widerrufsbelehrung</Link>
        </nav>
        <nav aria-label="Shop">
          <Link href="/shop">Shop</Link>
          <Link href="/guide">Surfboard Guide</Link>
          <Link href="/ueber-uns">Über uns</Link>
        </nav>
      </div>
      <p className="footer-note">© {new Date().getFullYear()} KARTIVO. Katalogpreise in Euro.</p>
    </footer>
  );
}
