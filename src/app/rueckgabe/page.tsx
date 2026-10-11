import { LegalReviewNotice } from "@/components/LegalReviewNotice";
import { MissingValue } from "@/components/MissingValue";
import { storeConfig } from "@/config/store";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Rückgabe und Erstattung",
  description: "Rückgabe und Erstattung bei KARTIVO. Die konkreten Bedingungen stehen noch aus.",
  path: "/rueckgabe",
});

function Value({ value, missing }: { value: string | null; missing: string }) {
  return value && value.trim() ? <>{value}</> : <MissingValue>{missing}</MissingValue>;
}

export default function ReturnsPage() {
  const returns = storeConfig.returns;
  return (
    <div className="page-wrap prose">
      <p className="eyebrow">Service</p>
      <h1>Rückgabe und Erstattung</h1>
      {!returns.confirmed ? (
        <p className="status-note">
          Die Rückgaberegeln sind noch nicht bestätigt. Eine kostenlose Rücksendung wird nicht
          behauptet.
        </p>
      ) : null}
      <h2>Frist</h2>
      <p>
        <Value value={returns.period} missing="Rückgabefrist eintragen" />
      </p>
      <h2>Ablauf</h2>
      <p>
        <Value value={returns.procedure} missing="Ablauf der Rückgabe eintragen" />
      </p>
      <h2>Erstattung</h2>
      <p>
        Methode: <Value value={returns.refundMethod} missing="Erstattungsmethode eintragen" />
      </p>
      <p>
        Zeitpunkt: <Value value={returns.refundTiming} missing="Zeitpunkt der Erstattung eintragen" />
      </p>
      <h2>Kosten der Rücksendung</h2>
      <p>
        <Value value={returns.returnShippingCost} missing="Wer die Rücksendung zahlt, eintragen" />
      </p>
      <h2>Rücksendeadresse</h2>
      <p>
        <Value value={returns.returnAddress} missing="Rücksendeadresse eintragen" />
      </p>
      <h2>Kontakt</h2>
      <p>
        <Value value={returns.supportContact} missing="Kontakt für Rückfragen eintragen" />
      </p>
      <h2>Gesetzliche Rechte</h2>
      <p>
        Für Verbraucherinnen und Verbraucher in Deutschland und der EU können gesetzliche
        Widerrufs- und Gewährleistungsrechte gelten. Diese Vorlage schränkt sie nicht ein. Welche
        Ausnahmen zulässig sind, muss vor dem Launch geprüft werden.
      </p>
      <p>
        Das Musterformular steht auf der <a href="/widerruf">Widerrufsbelehrung</a>.
      </p>
      <LegalReviewNotice
        topics={[
          "§ 355 BGB und Artikel 246a EGBGB zum Widerruf",
          "Fristbeginn, Ausnahmen und Rücksendekosten nicht frei erfinden",
          "Erstattungsweg und -zeit an den tatsächlichen Zahlungsablauf koppeln",
        ]}
      />
    </div>
  );
}
