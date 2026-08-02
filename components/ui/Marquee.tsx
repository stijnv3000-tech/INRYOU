const items = [
  "Magnesium & kalium in elk blik",
  "Minder dan 2g suiker",
  "Echt fruit, geen concentraatsmaak",
  "Geen kunstmatige zoetstoffen",
  "Rustige energie, geen suikercrash",
  "Belgisch gebrouwen",
  "4,9/5 uit 1.300+ beoordelingen",
  "CO₂-neutraal geleverd",
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
