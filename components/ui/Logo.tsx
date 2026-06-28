import Link from "next/link";

export function Logo({
  className = "",
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="INRYOU — home"
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span className="font-sans text-[1.45rem] font-semibold tracking-[0.06em] text-charcoal">
        INRYOU
      </span>
      {showTagline && (
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.32em] text-muted">
          natural balance
        </span>
      )}
    </Link>
  );
}
