import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Leaf, Drop, Heart, Sparkle } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Ons verhaal",
  description:
    "INRYOU ontstond uit een simpel geloof: welzijn zou de makkelijke keuze moeten zijn. Maak kennis met het merk achter natuurlijke balans, moeiteloos.",
};

const values = [
  {
    icon: Heart,
    title: "Balans boven extremen",
    text: "Wij geloven niet in verzaken of strenge regels. Duurzaam welzijn draait om een beetje beter kiezen, een beetje vaker.",
  },
  {
    icon: Leaf,
    title: "Altijd eerlijk",
    text: "Korte ingrediëntenlijsten, echte doseringen en etiketten die je echt kunt vertrouwen. Geen kleine lettertjes, geen marketingmineralen.",
  },
  {
    icon: Sparkle,
    title: "Schoonheid als standaard",
    text: "Iets waar je elke dag naar grijpt, moet een plezier zijn om vast te houden en te drinken. Design is hier geen luxe — het is de essentie.",
  },
  {
    icon: Drop,
    title: "Echt functioneel",
    text: "Elk blikje verdient zijn plaats: echt fruit, functionele mineralen en een recept dat lekker genoeg is om dagelijks te drinken.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cream to-cream-deep" />
          <div
            className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full opacity-50 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(224,124,58,0.28), transparent 65%)",
            }}
          />
        </div>
        <div className="container-px mx-auto max-w-3xl py-20 text-center lg:py-28">
          <Reveal>
            <p className="eyebrow">Ons verhaal</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
              Welzijn zou de{" "}
              <span className="accent text-orange-deep">makkelijke keuze moeten zijn.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink">
              INRYOU begon met een kleine, dagelijkse frustratie — en met het
              geloof dat de betere optie ook de mooiste, meest natuurlijke keuze
              zou moeten zijn om naar te grijpen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Narrative */}
      <section className="container-px mx-auto max-w-7xl py-12 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal as="div" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src={asset("/images/can-in-hand.jpg")}
              alt="Een blikje INRYOU Cranberry tegen de lucht gehouden"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="max-w-lg">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl">Het begon in de koelkast</h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="mt-6 space-y-4 text-pretty text-lg leading-relaxed text-ink">
                <p>
                  Elke drank die goed voor ons was, leek dat luidkeels te
                  verkondigen. En elke drank die écht lekker smaakte, leek stiekem
                  tegen ons te werken — te veel suiker, te veel additieven, met een
                  suikerdip die verderop op de loer lag.
                </p>
                <p>
                  Wij wilden iets ertussenin. Een drank met de pit en het ritueel
                  van een geweldige frisdrank, maar met het zuivere geweten van een
                  glas water. Kalm, mooi en echt goed voor je.
                </p>
                <p>
                  Dus maakten we hem zelf — met geperst echt fruit, functionele
                  mineralen in eerlijke doseringen en zacht gezoet met steviablad.
                  Het resultaat is INRYOU: natuurlijke balans, moeiteloos.
                </p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 border-l-2 border-orange pl-5">
                <p className="font-display text-xl italic text-charcoal">
                  "We zijn er niet om jou te repareren. Jij bent niet stuk. We
                  maken de betere keuze gewoon iets makkelijker binnen handbereik."
                </p>
                <p className="mt-3 text-sm text-muted">
                  Sofie Vermeer · Oprichter
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal text-cream">
        <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
          <Reveal>
            <p className="eyebrow text-orange">Waar we in geloven</p>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.05] text-cream sm:text-5xl">
              Vier principes, in elk blikje.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i} as="div" className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream/10 text-orange">
                  <v.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl text-cream">{v.title}</h3>
                  <p className="mt-2 text-pretty text-cream/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-3xl py-20 text-center lg:py-28">
        <Reveal>
          <h2 className="text-balance text-4xl leading-[1.05] sm:text-5xl">
            Vind jouw balans.
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto mt-5 max-w-md text-pretty text-lg text-ink">
            Drie smaken, één filosofie. Begin met wat jou het meest aanspreekt.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/shop" size="lg">
              Ontdek het assortiment
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
