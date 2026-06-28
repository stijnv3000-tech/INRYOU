import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange/60 focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-white shadow-[0_8px_24px_-12px_rgba(224,124,58,0.7)] hover:bg-orange-deep hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(224,124,58,0.8)]",
  dark: "bg-charcoal text-cream hover:bg-charcoal-soft hover:-translate-y-0.5",
  outline:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream",
  ghost: "text-charcoal hover:bg-charcoal/5",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
