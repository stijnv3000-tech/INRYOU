import { Reveal } from "@/components/ui/Reveal";

const rows = [
  { label: "Suiker", inryou: "Minder dan 2g per blik", soda: "Vaak 25g+ per blik" },
  { label: "Functionele mineralen", inryou: "Ja", soda: "Geen" },
  { label: "Kunstmatige kleurstoffen", inryou: "Geen", soda: "Vaak wel" },
  { label: "Smaak", inryou: "Natuurlijk & verfrissend", soda: "Zoet & overheersend" },
  { label: "Calorieën", inryou: "12–18 kcal", soda: "140+ kcal" },
  { label: "Gevoel achteraf", inryou: "Rustige energie", soda: "Suikercrash" },
];

export function Comparison() {
  return (
    <section className="bg-blush">
      <div className="container-px mx-auto max-w-5xl py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow text-center">Wij maken</p>
          <h2 className="mt-3 text-center text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Het <span className="accent text-cranberry">verschil.</span>
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-40px_rgba(56,22,26,0.4)] ring-1 ring-charcoal/10">
            {/* Header */}
            <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-charcoal/10 bg-charcoal">
              <div className="px-5 py-5 sm:px-7">&nbsp;</div>
              <div className="border-l border-cream/10 px-4 py-5 text-center sm:px-6">
                <span className="font-sans text-sm font-bold tracking-[0.08em] text-orange">
                  INRYOU
                </span>
              </div>
              <div className="border-l border-cream/10 px-4 py-5 text-center text-sm font-medium text-cream/55 sm:px-6">
                Klassieke frisdrank
              </div>
            </div>

            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.3fr_1fr_1fr] items-center ${
                  i % 2 ? "bg-cream-deep/60" : "bg-white"
                }`}
              >
                <div className="px-5 py-5 text-sm font-medium text-charcoal sm:px-7 sm:text-base">
                  {row.label}
                </div>
                <div className="flex items-center gap-2.5 border-l border-charcoal/10 bg-orange-soft/30 px-4 py-5 sm:px-6">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-orange ring-4 ring-orange/20" />
                  <span className="text-sm font-bold text-charcoal sm:text-base">
                    {row.inryou}
                  </span>
                </div>
                <div className="border-l border-charcoal/10 px-4 py-5 text-sm text-muted sm:px-6 sm:text-base">
                  {row.soda}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
