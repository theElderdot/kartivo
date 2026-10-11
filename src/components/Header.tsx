"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/guide", label: "Surfboard Guide" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header ${open ? "is-open" : ""}`}>
      <div className="header-bar">
        <Link href="/" className="logo-link" aria-label="KARTIVO Startseite">
          <Logo />
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Schließen" : "Menü"}
        </button>
        <nav id="hauptnavigation" className="nav" aria-label="Hauptnavigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <form className="search-form" action="/suche" method="get" role="search">
            <label className="sr-only" htmlFor="kopf-suche">
              Suche
            </label>
            <input id="kopf-suche" name="q" type="search" placeholder="Boards suchen" />
          </form>
          <Link className="cart-link" href="/warenkorb" aria-label={`Warenkorb, ${count} Artikel`}>
            <span aria-hidden="true">Warenkorb</span>
            <span className="cart-count" aria-hidden="true">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
