import Link from "next/link";
import { storeConfig } from "@/config/store";

export function PreviewBanner() {
  if (storeConfig.readyForLaunch) return null;
  return (
    <p className="preview-banner">
      Vorschau, nicht live. Geschäftsangaben, Steuern und Zahlung sind noch offen.{" "}
      <Link href="/impressum#offene-angaben">Offene Punkte ansehen</Link>
    </p>
  );
}
