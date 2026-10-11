"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page-wrap">
      <h1>Die Seite konnte nicht geladen werden</h1>
      <button className="button button-dark" type="button" onClick={reset}>
        Erneut versuchen
      </button>
    </div>
  );
}
