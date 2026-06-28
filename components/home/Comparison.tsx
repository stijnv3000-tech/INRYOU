import { Reveal } from "@/components/ui/Reveal";
import { Check, Close } from "@/components/ui/icons";

const rows = [
  { label: "Sugar per serving", inryou: "Under 2g", soda: "35–40g" },
  { label: "Sweetened with", inryou: "Stevia leaf & real fruit", soda: "Refined sugar / syrup" },
  { label: "Functional minerals", inryou: "Magnesium & potassium", soda: "None" },
  { label: "Artificial additives", inryou: "None", soda: "Colours, preservatives" },
  { label: "The after-feeling", inryou: "Clean, balanced", soda: "Sugar crash" },
  { label: "Calories", inryou: "12–18 kcal", soda: "140+ kcal" },
];

export function Comparison() {
  return (
    <section className="bg-charcoal text-cream">
      <div className="container-px mx-auto max-w-6xl py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow text-orange">The difference</p>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.05] text-cream sm:text-5xl">
            We make the difference{" "}
            <span className="italic text-orange">you can taste.</span>
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-lg text-cream/70">
            Side by side with a traditional soft drink, the choice gets a lot
            simpler.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-12 overflow-hidden rounded-3xl ring-1 ring-cream/15">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-cream/5">
              <div className="px-5 py-5 text-sm font-medium uppercase tracking-[0.14em] text-cream/45 sm:px-8">
                &nbsp;
              </div>
              <div className="border-l border-cream/10 px-4 py-5 text-center sm:px-6">
                <span className="font-sans text-base font-semibold tracking-[0.06em] text-cream">
                  INRYOU
                </span>
              </div>
              <div className="border-l border-cream/10 px-4 py-5 text-center text-sm font-medium uppercase tracking-[0.12em] text-cream/45 sm:px-6">
                Regular soda
              </div>
            </div>

            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.4fr_1fr_1fr] items-center ${
                  i % 2 === 0 ? "bg-transparent" : "bg-cream/[0.03]"
                }`}
              >
                <div className="px-5 py-5 text-sm text-cream/80 sm:px-8 sm:text-base">
                  {row.label}
                </div>
                <div className="flex items-center justify-center gap-2 border-l border-cream/10 px-4 py-5 text-center sm:px-6">
                  <Check className="h-4 w-4 shrink-0 text-sage" />
                  <span className="text-sm font-medium text-cream sm:text-base">
                    {row.inryou}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 border-l border-cream/10 px-4 py-5 text-center text-cream/45 sm:px-6">
                  <Close className="h-4 w-4 shrink-0 text-cranberry" />
                  <span className="text-sm sm:text-base">{row.soda}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
