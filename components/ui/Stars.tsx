import { Star } from "./icons";

export function Stars({
  rating = 5,
  className = "",
  size = 16,
}: {
  rating?: number;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-orange ${className}`}
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < Math.round(rating) ? "opacity-100" : "opacity-25"}
        />
      ))}
    </span>
  );
}
