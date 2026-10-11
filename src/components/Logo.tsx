export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`.trim()}>
      <svg className="logo-mark" viewBox="0 0 64 40" aria-hidden="true">
        <path
          d="M2 22c8-12 16-12 24 0 6 9 12 9 20 0 5-7 9-8 16-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M2 32c8-9 16-9 24 0 6 6.5 12 6.5 20 0 5-5 9-6 16-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="logo-word">KARTIVO</span>
    </span>
  );
}
