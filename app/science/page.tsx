import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Check, Close, ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "De wetenschap",
  description:
    "Hoe INRYOU werkt: functionele mineralen zoals magnesium en kalium, echt fruit, natuurlijke zoetheid uit steviablad en bijna geen suiker. De wetenschap achter een rustiger alternatief voor frisdrank.",
};

const minerals = [
  {
    name: "Magnesiumcitraat",
    dose: "75mg per blikje",
    text: "Betrokken bij meer dan 300 enzymreacties, van energieproductie tot spier- en zenuwfunctie. Wij kiezen voor de citraatvorm omdat je die beter opneemt.",
  },
  {
    name: "Kaliumcitraat",
    dose: "120mg per blikje",
    text: "Werkt samen met natrium om je vochtbalans en een normale bloeddruk te bewaren — mede daarom kan een goed samengestelde bruisdrank je echt hydrateren.",
  },
  {
    name: "B-vitamines & L-theanine",
    dose: "Afhankelijk van de smaak",
    text: "Bepaalde smaken bevatten B-vitamines voor je energiestofwisseling of L-theanine voor ontspannen focus — kalme energie zonder cafeïne of suiker.",
  },
];

const principles = [
  {
    title: "Eerlijk doseren",
    text: "Mineralen tellen pas mee in zinvolle, opneembare hoeveelheden. Wij vertellen je precies hoeveel er in elk blikje zit — geen loze beloftes.",
  },
  {
    title: "Natuurlijk zoeten",
    text: "De zoetheid komt van echt fruit en een vleugje steviablad. Geen geraffineerde suiker, geen aspartaam, geen sucralose.",
  },
  {
    title: "Kort houden",
    text: "Als een ingrediënt geen echt werk verzet — voor je lichaam of voor de smaak — komt het niet in het recept.",
  },
];

const compare = [
  { label: "Suiker", inryou: "Minder dan 2g", soda: "35–40g" },
  { label: "Zoetstof", inryou: "Steviablad", soda: "Suiker / HFCS" },
  { label: "Mineralen", inryou: "Mg + K", soda: "Geen" },
  { label: "Calorieën", inryou: "12–18 kcal", soda: "140+ kcal" },
  { label: "Additieven", inryou: "Geen", soda: "Kleurstoffen, enz." },
];

const faqs = [
  {
    q: "Zijn stevia en steviolglycosiden veilig?",
    a: "Ja. Steviolglycosiden worden gewonnen uit het blad van de steviaplant en zijn als zoetstof goedgekeurd in de hele EU en daarbuiten. Ze zorgen voor zuivere zoetheid zonder calorieën en zonder invloed op je bloedsuiker.",
  },
  {
    q: "Doen die mineralen echt iets?",
    a: "Onze doseringen zitten op een niveau dat zinvol bijdraagt aan je dagelijkse inname — 75mg magnesium en 120mg kalium per blikje — in goed opneembare citraatvormen. Ze ondersteunen een normale spier-, zenuw- en hydratatiefunctie als onderdeel van een evenwichtig voedingspatroon.",
  },
  {
    q: "Werkt INRYOU hydraterend?",
    a: "Ja. De basis is bruisend bronwater met toegevoegde elektrolyten die je lichaam helpen vocht vast te houden. Zo geniet je op een echt hydraterende manier van een fruitige, bruisende drank.",
  },
  {
    q: "Past het bij een suikerarme of keto-levensstijl?",
    a: "Met minder dan 2g suiker en 12–18 kcal per blikje past INRYOU moeiteloos in een suikerarm en caloriearm eetpatroon. Check zoals altijd het volledige etiket voor jouw specifieke behoeften.",
  },
];

export default function SciencePage() {
  return (
    <>
      <section className="container-px mx-auto max-w-3xl py-20 text-center lg:py-24">
        <Reveal>
          <p className="eyebrow">De wetenschap</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
            Functioneel, niet{" "}
            <span className="italic text-sage-deep">gebakken lucht.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink">
            Wij houden niet van wellness-theater. Hier lees je precies wat er in
            elk INRYOU-blikje zit, waarom het er zit en welke gedachte erachter
            steekt.
          </p>
        </Reveal>
      </section>

      {/* Minerals */}
      <section className="container-px mx-auto max-w-7xl pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          {minerals.map((m, i) => (
            <Reveal key={m.name} delay={i} as="div">
              <div className="flex h-full flex-col rounded-3xl bg-cream-deep p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-deep">
                  {m.dose}
                </span>
                <h3 className="mt-3 text-2xl">{m.name}</h3>
                <p className="mt-3 text-pretty text-ink">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="container-px mx-auto max-w-7xl py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow">Hoe we samenstellen</p>
          <h2 className="mt-3 max-w-xl text-balance text-4xl sm:text-5xl">
            Drie regels waar we niet van afwijken.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i} as="div">
              <span className="font-display text-5xl text-orange/30">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-xl">{p.title}</h3>
              <p className="mt-2 text-pretty text-ink">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compare */}
      <section className="bg-charcoal text-cream">
        <div className="container-px mx-auto max-w-4xl py-20 lg:py-24">
          <Reveal>
            <h2 className="text-balance text-4xl text-cream sm:text-5xl">
              De cijfers liegen niet.
            </h2>
            <p className="mt-4 text-cream/70">
              Een typische portie van 250ml, naast elkaar.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-cream/15">
              <div className="grid grid-cols-3 bg-cream/5 text-sm font-medium uppercase tracking-[0.12em]">
                <div className="px-5 py-4 text-cream/45 sm:px-7">Waarde</div>
                <div className="border-l border-cream/10 px-5 py-4 text-center text-cream sm:px-7">
                  INRYOU
                </div>
                <div className="border-l border-cream/10 px-5 py-4 text-center text-cream/45 sm:px-7">
                  Frisdrank
                </div>
              </div>
              {compare.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 items-center ${
                    i % 2 ? "bg-cream/[0.03]" : ""
                  }`}
                >
                  <div className="px-5 py-4 text-cream/80 sm:px-7">
                    {row.label}
                  </div>
                  <div className="flex items-center justify-center gap-2 border-l border-cream/10 px-5 py-4 sm:px-7">
                    <Check className="h-4 w-4 text-sage" />
                    <span className="font-medium text-cream">{row.inryou}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 border-l border-cream/10 px-5 py-4 text-cream/45 sm:px-7">
                    <Close className="h-4 w-4 text-cranberry" />
                    <span>{row.soda}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px mx-auto max-w-3xl py-16 lg:py-24">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl">De kleine lettertjes</h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-12 text-center">
            <ButtonLink href="/shop" size="lg">
              Proef het verschil
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
