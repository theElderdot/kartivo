export function LegalReviewNotice({ topics }: { topics: readonly string[] }) {
  return (
    <aside className="review-notice">
      <p>
        <strong>Vor der Veröffentlichung prüfen lassen.</strong> Diese Seite ist eine Vorlage mit
        Platzhaltern, keine Rechtsberatung und kein fertiger Rechtstext.
      </p>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </aside>
  );
}
