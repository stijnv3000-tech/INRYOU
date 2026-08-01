import { Reveal } from "@/components/ui/Reveal";
import { Wave } from "@/components/ui/Wave";

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
    <section className="relative overflow-hidden bg-wine text-cream">
      <Wave position="top" fill="var(--color-cream)" />

      <div className="container-px mx-auto max-w-5xl py-24 lg:py-32">
        <Reveal>
          <p className="eyebrow text-center text-orange">Wij maken</p>
          <h2 className="mt-3 text-center text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
            Het <span className="italic">verschil.</span>
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-cream/12">
            {/* Header */}
            <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-cream/[0.04]">
              <div className="px-5 py-5 sm:px-7">&nbsp;</div>
              <div className="border-l border-cream/10 px-4 py-5 sm:px-6">
                <span className="font-sans text-sm font-semibold tracking-[0.08em] text-orange">
                  INRYOU
                </span>
              </div>
              <div className="border-l border-cream/10 px-4 py-5 text-sm text-cream/45 sm:px-6">
                Klassieke frisdrank
              </div>
            </div>

            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.3fr_1fr_1fr] items-center border-t border-cream/10 ${
                  i % 2 ? "bg-cream/[0.02]" : ""
                }`}
              >
                <div className="px-5 py-5 text-sm font-medium text-cream sm:px-7 sm:text-base">
                  {row.label}
                </div>
                <div className="flex items-center gap-2.5 border-l border-cream/10 px-4 py-5 sm:px-6">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-orange ring-4 ring-orange/15" />
                  <span className="text-sm font-medium text-cream sm:text-base">
                    {row.inryou}
                  </span>
                </div>
                <div className="border-l border-cream/10 px-4 py-5 text-sm text-cream/45 sm:px-6 sm:text-base">
                  {row.soda}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Wave position="bottom" fill="var(--color-cream-deep)" />
    </section>
  );
}
