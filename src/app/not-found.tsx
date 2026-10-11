import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap">
      <h1>Seite nicht gefunden</h1>
      <p>Diese Adresse gibt es bei KARTIVO nicht.</p>
      <Link className="button button-dark" href="/shop">
        Zu den Boards
      </Link>
    </div>
  );
}
