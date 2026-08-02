const items = [
  "Minder dan 2g suiker",
  "Functionele mineralen",
  "Echte vruchten",
  "Geen kunstmatige zoetstoffen",
  "Natuurlijk gezoet",
  "12–18 kcal per blik",
  "CO₂-neutrale levering",
  "Recycleerbaar aluminium",
];

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-charcoal/10 bg-cream-deep py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex items-center gap-10 pr-10"
            aria-hidden={dup === 1}
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 text-sm font-medium tracking-wide text-ink"
              >
                {item}
                <span className="text-orange">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
