import Link from "next/link";
import { storeConfig } from "@/config/store";

export function PreviewBanner() {
  if (storeConfig.readyForLaunch) return null;
  return (
    <p className="preview-banner">
      Vorschau, nicht live. Geschäftsangaben, Versand, Steuern, Bestand und Zahlung sind noch
      offen.{" "}
      <Link href="/impressum#offene-angaben">Offene Punkte ansehen</Link>
    </p>
  );
}
