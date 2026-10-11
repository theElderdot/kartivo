import Link from "next/link";
import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { MissingValue } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Rückgabe und Erstattung",
  description:
    "14 Tage Widerruf bei KARTIVO. Die Rücksendekosten trägt die Kundin oder der Kunde, außer die Ware ist mangelhaft oder falsch geliefert.",
  path: "/rueckgabe",
});

export default function ReturnsPage() {
  const returns = storeConfig.returns;
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Service</p>
      <h1>Rückgabe und Erstattung</h1>
      <p>
        Für Verbraucherinnen und Verbraucher in Deutschland gilt das gesetzliche Widerrufsrecht.
        Eine kostenlose Rücksendung ist nicht angeboten.
      </p>
      <h2>Frist</h2>
      <p>
        Du kannst den Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen. Die Frist
        beginnt an dem Tag, an dem du die Ware erhalten hast. Fällt das Fristende auf einen
        Samstag, Sonntag oder Feiertag, verschiebt sich das Ende auf den nächsten Werktag.
      </p>
      <h2>Ablauf</h2>
      <p>
        Erkläre den Widerruf in einer eindeutigen Erklärung, zum Beispiel über das Muster auf der{" "}
        <Link href="/widerruf">Widerrufsbelehrung</Link>. Schicke die Ware danach innerhalb von 14
        Tagen nach dem Widerruf zurück. Die Frist ist gewahrt, wenn du die Ware vor Fristende
        absendest.
      </p>
      <p>
        Du darfst die Ware so prüfen, wie es in einem Geschäft möglich wäre. Eine darüber
        hinausgehende Nutzung kann einen Wertersatz auslösen, soweit das Gesetz das erlaubt.
      </p>
      <h2>Kosten der Rücksendung</h2>
      <p>{returns.returnShippingCost}</p>
      <p>
        Sende die Ware frankiert. Unfreie Sendungen können wir ablehnen. Es gibt kein
        Rücksendeetikett und keine Wiedereinlagerungsgebühr.
      </p>
      <h2>Erstattung</h2>
      <p>
        {returns.refundMethod}. {returns.refundTiming} Erstattet werden der gezahlte Warenpreis und
        die Standard-Versandkosten der Hinsendung, wenn die ganze Bestellung widerrufen wird.
        Mehrkosten einer von dir gewählten teureren Versandart erstatten wir nicht.
      </p>
      <h2>Rücksendeadresse</h2>
      <p>
        {returns.returnAddress ?? (
          <MissingValue>Rücksendeadresse eintragen, bevor Retouren angenommen werden</MissingValue>
        )}
      </p>
      <p>
        Schicke nichts ab, bevor die Adresse im Impressum steht. Kontakt für die Rückfrage:{" "}
        {storeConfig.business.email ?? (
          <MissingValue>E-Mail im Impressum eintragen</MissingValue>
        )}
      </p>
      <h2>Gesetzliche Rechte</h2>
      <p>
        Gesetzliche Mängelrechte bleiben neben dem Widerruf bestehen. Diese Boards sind keine
        Einzelanfertigungen. Ein Ausschluss des Widerrufs wird dafür nicht beansprucht.
      </p>
      <LegalReviewNotice
        topics={[
          "§ 355 BGB und Artikel 246a EGBGB: Frist, Belehrung und Musterformular",
          "§ 357 BGB: Rücksendekosten nur, wenn sie vor Vertragsschluss genannt werden",
          "Google Merchant Center: 14 Tage, Rücksendekosten beim Kunden, keine kostenlose Retoure",
        ]}
      />
    </div>
  );
}
