const messages = [
  "Abonneer & bespaar 15%",
  "Gratis verzending vanaf €35",
];

export function AnnouncementBar() {
  // Repeat enough times to fill a seamless scrolling track
  const track = Array.from({ length: 6 }).flatMap(() => messages);

  return (
    <div className="overflow-hidden bg-charcoal text-cream">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1}
          >
            {track.map((m, i) => (
              <li
                key={`${dup}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap px-8 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em]"
              >
                {m}
                <span className="text-orange">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
