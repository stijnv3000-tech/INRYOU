import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4h2l1.5 12.5a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.5-1.2L20 8H6" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Plus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Leaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-5 16-9 16Z" />
      <path d="M11 20c0-5 2-9 7-12" />
    </svg>
  );
}

export function Drop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
    </svg>
  );
}

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    </svg>
  );
}

export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.5-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5c-2.2 4.5-9.2 9-9.2 9Z" />
    </svg>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Truck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

export function Recycle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17H4l2.5-4.3M12 4l2 3.5M17 7l3 5-3.5 1M9 20h6l-2.2-3.8" />
    </svg>
  );
}

export function Star(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.95 6.05 6.55.95-4.75 4.6 1.12 6.55L12 18.6l-5.87 3.1 1.12-6.55-4.75-4.6 6.55-.95L12 2.5Z" />
    </svg>
  );
}

export function Quote(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9.5 6C6.5 7 5 9.5 5 13v5h5v-5H7.5c0-2 .8-3.4 2.7-4L9.5 6Zm9 0c-3 1-4.5 3.5-4.5 7v5h5v-5h-2.5c0-2 .8-3.4 2.7-4L18.5 6Z" />
    </svg>
  );
}
