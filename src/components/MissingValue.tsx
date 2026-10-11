export function MissingValue({ children }: { children: string }) {
  return <span className="placeholder">{children}</span>;
}

export function Fact({
  label,
  value,
  missing,
}: {
  label: string;
  value: string | null;
  missing: string;
}) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{value && value.trim() ? value : <MissingValue>{missing}</MissingValue>}</dd>
    </>
  );
}
