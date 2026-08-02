import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Check, Close, ArrowRight } from "@/components/ui/icons";

const rows = [
  { label: "Suiker", inryou: "Minder dan 2g", soda: "25g+ per blik" },
  { label: "Functionele mineralen", inryou: "Magnesium & kalium", soda: "Geen" },
  { label: "Gezoet met", inryou: "Steviablad & echt fruit", soda: "Suiker & siroop" },
  { label: "Kunstmatige kleurstoffen", inryou: "Geen", soda: "Vaak wel" },
  { label: "Gevoel achteraf", inryou: "Rustige energie", soda: "Suikercrash" },
];

export function Comparison() {
  return (
    <section className="bg-blush">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Narrative — the leidraad */}
          <div>
            <Reveal>
              <p className="eyebrow">Wij maken het verschil</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 text-balance text-4xl leading-[1.05] sm:text-5xl">
                Waarom INRYOU je dagelijkse{" "}
                <span className="accent text-cranberry">keuze</span> wordt.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="measure mt-5 text-pretty text-lg text-ink">
                Alles wat je lekker vindt aan frisdrank — de fizz, het ritueel,
                de smaak — zonder de suiker en de crash. Zie het verschil in één
                oogopslag.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-charcoal/10">
                  <p className="font-display text-4xl text-cranberry">94%</p>
                  <p className="mt-1 text-sm text-ink">
                    minder suiker dan klassieke frisdrank
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-charcoal/10">
                  <p className="font-display text-4xl text-orange-deep">2</p>
                  <p className="mt-1 text-sm text-ink">
                    functionele mineralen in elk blik
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="mt-8">
                <ButtonLink href="/shop">
                  Proef het verschil
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Decision card — INRYOU visibly wins */}
          <Reveal delay={1} as="div">
            <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_70px_-45px_rgba(56,22,26,0.5)] ring-1 ring-charcoal/10">
              {/* Column headers */}
              <div className="grid grid-cols-[1.2fr_1fr_1fr]">
                <div className="px-5 py-5 sm:px-7" />
                <div className="relative border-l border-charcoal/10 bg-orange-soft/40 px-3 py-5 text-center sm:px-5">
                  <span className="absolute -top-0 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange px-3 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white sm:block">
                    Onze keuze
                  </span>
                  <span className="font-sans text-sm font-bold tracking-[0.06em] text-charcoal">
                    INRYOU
                  </span>
                </div>
                <div className="border-l border-charcoal/10 px-3 py-5 text-center text-sm font-medium text-muted sm:px-5">
                  Frisdrank
                </div>
              </div>

              {rows.map((row, idx) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.2fr_1fr_1fr] items-stretch border-t border-charcoal/10 ${
                    idx % 2 ? "bg-cream-deep/50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center px-5 py-4 text-sm font-medium text-charcoal sm:px-7">
                    {row.label}
                  </div>
                  <div className="flex items-center gap-2 border-l border-charcoal/10 bg-orange-soft/40 px-3 py-4 sm:px-5">
                    <Check className="h-4 w-4 shrink-0 text-sage-deep" />
                    <span className="text-sm font-bold text-charcoal">
                      {row.inryou}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-charcoal/10 px-3 py-4 sm:px-5">
                    <Close className="h-3.5 w-3.5 shrink-0 text-cranberry/60" />
                    <span className="text-sm text-muted">{row.soda}</span>
                  </div>
                </div>
              ))}

              {/* Verdict */}
              <div className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-charcoal/10 bg-charcoal text-cream">
                <div className="px-5 py-4 text-sm font-medium sm:px-7">
                  De slimmere keuze
                </div>
                <div className="flex items-center justify-center border-l border-cream/10 bg-orange px-3 py-4 text-center text-sm font-bold text-white sm:px-5">
                  INRYOU
                </div>
                <div className="flex items-center justify-center border-l border-cream/10 px-3 py-4 text-center text-sm text-cream/40 sm:px-5">
                  —
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
