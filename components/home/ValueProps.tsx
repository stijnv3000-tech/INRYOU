import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Leaf, Drop, Sparkle, Heart } from "@/components/ui/icons";

const props = [
  {
    icon: Leaf,
    title: "Real fruit, nothing fake",
    text: "Pressed fruit and natural flavour — never artificial colours, sweeteners or preservatives.",
  },
  {
    icon: Drop,
    title: "Functional minerals",
    text: "A measured dose of magnesium and potassium in every can, for everyday balance.",
  },
  {
    icon: Sparkle,
    title: "Almost no sugar",
    text: "Under 2g of sugar and around 15 kcal. Sweetened gently with stevia leaf.",
  },
  {
    icon: Heart,
    title: "Made to feel good",
    text: "Light carbonation, a clean finish, and a calm lift that lasts — no crash.",
  },
];

export function ValueProps() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Why INRYOU</p>
          <h2 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
            Everything you want.{" "}
            <span className="italic text-cranberry">Nothing you don't.</span>
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg text-ink">
            We started with a simple question: why should the drink that's good
            for you feel like a compromise? INRYOU is the answer — refreshment
            that's genuinely refined and genuinely good.
          </p>
        </Reveal>

        <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {props.map((p) => (
            <Reveal key={p.title} as="div" className="flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-soft text-orange-deep">
                <p.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl">{p.title}</h3>
              <p className="mt-2 text-pretty text-ink">{p.text}</p>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
