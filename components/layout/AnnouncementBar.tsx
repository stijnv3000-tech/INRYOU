const messages = [
  "Gratis CO₂-neutrale levering vanaf €35",
  "Abonneer & bespaar 15% — pauzeer of annuleer wanneer je wil",
  "Minder dan 2g suiker · Functionele mineralen · Natuurlijk gezoet",
];

export function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-cream">
      <div className="container-px mx-auto flex h-9 max-w-7xl items-center justify-center overflow-hidden">
        <div className="flex items-center gap-2 text-center text-[0.72rem] font-medium tracking-[0.12em] uppercase">
          <span className="hidden items-center gap-6 sm:flex">
            {messages.map((m, i) => (
              <span key={m} className="flex items-center gap-6">
                {m}
                {i < messages.length - 1 && (
                  <span className="text-orange">·</span>
                )}
              </span>
            ))}
          </span>
          <span className="sm:hidden">{messages[0]}</span>
        </div>
      </div>
    </div>
  );
}
