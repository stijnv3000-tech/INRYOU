/**
 * Organic wave divider that sits at the top or bottom edge of a section.
 * `fill` should be a CSS color equal to the neighbouring section's background,
 * so that colour appears to flow into this section with a soft wave.
 */
export function Wave({
  position,
  fill,
  className = "",
}: {
  position: "top" | "bottom";
  fill: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 leading-[0] ${
        position === "top" ? "top-0" : "bottom-0"
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className={`h-[42px] w-full md:h-[64px] ${
          position === "bottom" ? "rotate-180" : ""
        }`}
      >
        <path
          d="M0,0 L1440,0 L1440,34 C1200,70 960,10 720,26 C480,42 240,72 0,38 Z"
          style={{ fill }}
        />
      </svg>
    </div>
  );
}
