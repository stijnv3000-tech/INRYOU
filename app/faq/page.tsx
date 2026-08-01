import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Alles wat je moet weten over INRYOU — ingrediënten, voeding, abonnementen, levering en retour.",
};

const groups = [
  {
    title: "Product & ingrediënten",
    items: [
      {
        q: "Wat is INRYOU precies?",
        a: "INRYOU is een premium functionele bruisdrank — licht bruisend bronwater met echt fruit, functionele mineralen zoals magnesium en kalium, en zo goed als geen suiker. Zie het als een rustiger, zuiverder alternatief voor frisdrank.",
      },
      {
        q: "Hoeveel suiker en hoeveel calorieën?",
        a: "Minder dan 2 g suiker en ongeveer 12–18 kcal per blikje van 250 ml, afhankelijk van de smaak. De zoetheid komt van echt fruit en een vleugje steviablad — nooit van geraffineerde suiker of kunstmatige zoetstoffen.",
      },
      {
        q: "Is het geschikt voor veganisten?",
        a: "Ja. Alle smaken van INRYOU zijn 100% plantaardig en bevatten geen ingrediënten van dierlijke oorsprong.",
      },
      {
        q: "Bevat het cafeïne?",
        a: "Nee. INRYOU is bewust cafeïnevrij. De zachte boost komt van hydratatie, mineralen en natuurlijke frisheid — niet van stimulerende middelen.",
      },
    ],
  },
  {
    title: "Abonnementen",
    items: [
      {
        q: "Hoe werkt Abonneer & bespaar?",
        a: "Kies een abonnement bij eender welk product om 15% te besparen en gratis levering te krijgen bij elke bestelling, elke vier weken verstuurd. Je kan op elk moment pauzeren, overslaan, smaken wisselen of opzeggen via je account — geen verplichtingen, geen ongemakkelijke telefoontjes.",
      },
      {
        q: "Kan ik mijn smaken bij elke levering aanpassen?",
        a: "Absoluut. Je abonnement is volledig flexibel — wissel smaken of aantallen voor elke levering wanneer je maar wil.",
      },
    ],
  },
  {
    title: "Levering & retour",
    items: [
      {
        q: "Hoeveel kost de levering?",
        a: "Levering kost een vast bedrag van €3,95, en is gratis bij alle bestellingen boven €35 en bij elke abonnementsbestelling. We verzenden CO₂-neutraal.",
      },
      {
        q: "Hoe snel komt mijn bestelling aan?",
        a: "De meeste bestellingen worden binnen 2–4 werkdagen geleverd. Je ontvangt een track & trace zodra je blikjes bij ons vertrekken.",
      },
      {
        q: "Wat is jullie retourbeleid?",
        a: "We bieden een 30 dagen tevredenheidsgarantie. Ben je niet tevreden, neem dan contact op en we lossen het op — terugbetaling of vervanging, jij kiest.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-3xl py-16 text-center lg:py-20">
        <Reveal>
          <p className="eyebrow">Helpcentrum</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
            Vragen, beantwoord.
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-ink">
            Vind je niet wat je zoekt? We helpen je graag verder.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-3xl pb-16">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={gi} as="div" className="mb-12">
            <h2 className="mb-4 text-2xl">{group.title}</h2>
            <Accordion items={group.items} defaultOpen={-1} />
          </Reveal>
        ))}
      </section>

      <section className="container-px mx-auto max-w-7xl pb-20 lg:pb-28">
        <div className="rounded-[2rem] bg-cream-deep px-8 py-14 text-center">
          <h2 className="text-3xl sm:text-4xl">Nog nieuwsgierig?</h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-ink">
            Ons team is echt, menselijk en snel met antwoorden. Stuur ons gerust een bericht.
          </p>
          <div className="mt-7 flex justify-center">
            <ButtonLink href="/contact">
              Contacteer ons
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
