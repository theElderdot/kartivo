import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MissingValue } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { returnPolicyJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Rückgabe und Erstattung",
  description:
    "14 Tage Widerruf in Deutschland. Rücksendung per Post auf Kosten der Kundin oder des Kunden, außer die Ware ist mangelhaft oder falsch geliefert. Erstattung innerhalb von 14 Tagen.",
  path: "/rueckgabe",
});

export default function ReturnsPage() {
  const returns = storeConfig.returns;
  return (
    <div className="page-wrap prose">
      <JsonLd data={returnPolicyJsonLd()} />
      <p className="eyebrow">Service</p>
      <h1>Rückgabe und Erstattung</h1>
      <p>
        Diese Regeln gelten für Verbraucherinnen und Verbraucher mit Lieferadresse in Deutschland.
        Sie entsprechen dem gesetzlichen Widerrufsrecht und sind die Angaben für Google Merchant
        Center.
      </p>
      <h2>Das Wichtigste</h2>
      <ul>
        <li>Land: Deutschland.</li>
        <li>Frist: 14 Tage ab dem Tag, an dem du die Ware erhalten hast.</li>
        <li>Zustand: neu oder so geprüft, wie es in einem Geschäft möglich wäre.</li>
        <li>Weg: Rücksendung per Post. Eine Abgabe im Laden oder an einer Station gibt es nicht.</li>
        <li>Kosten der Rücksendung: du. Bei mangelhafter oder falsch gelieferter Ware: wir.</li>
        <li>Rücksendeetikett: keines. Wiedereinlagerungsgebühr: keine.</li>
        <li>Umtausch gegen ein anderes Board: nicht angeboten.</li>
        <li>
          Erstattung: voller Warenpreis und die Standard-Versandkosten, innerhalb von 14 Tagen, auf
          dem ursprünglichen Zahlungsweg.
        </li>
      </ul>
      <h2>Frist</h2>
      <p>
        Du kannst den Vertrag innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen. Die Frist
        beginnt an dem Tag, an dem du oder eine von dir benannte Person die Ware in Besitz genommen
        hat. Fällt das Fristende auf einen Samstag, Sonntag oder gesetzlichen Feiertag, endet sie am
        nächsten Werktag.
      </p>
      <h2>Ablauf</h2>
      <p>
        Erkläre den Widerruf in einer eindeutigen Erklärung, zum Beispiel mit dem Muster auf der{" "}
        <Link href="/widerruf">Widerrufsbelehrung</Link>. Schicke die Ware danach innerhalb von 14
        Tagen nach dem Widerruf zurück. Die Frist ist gewahrt, wenn du die Sendung vor Fristende
        abgibst.
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
        Mehrkosten einer von dir gewählten teureren Versandart erstatten wir nicht. Die von dir
        gezahlten Kosten der Rücksendung erstatten wir nur, wenn die Ware mangelhaft oder falsch
        geliefert war.
      </p>
      <h2>Kein Umtausch</h2>
      <p>
        Ein Umtausch gegen ein anderes Board oder eine andere Ausführung ist nicht angeboten. Der
        Weg ist der Widerruf und die Erstattung.
      </p>
      <h2>Rücksendeadresse</h2>
      <p>
        {returns.returnAddress ?? (
          <MissingValue>
            Rücksendeadresse steht noch nicht fest und wird vor dem Verkauf im Impressum
            veröffentlicht
          </MissingValue>
        )}
      </p>
      <p>
        Schicke nichts ab, bevor die Adresse im Impressum steht. Kontakt bis dahin:{" "}
        {storeConfig.business.email ?? (
          <MissingValue>E-Mail im Impressum eintragen</MissingValue>
        )}
      </p>
      <h2>Gesetzliche Rechte</h2>
      <p>
        Gesetzliche Mängelrechte bleiben neben dem Widerruf bestehen. Diese Boards sind keine
        Einzelanfertigungen nach deinen Vorgaben. Ein Ausschluss des Widerrufs wird dafür nicht
        beansprucht.
      </p>
    </div>
  );
}
