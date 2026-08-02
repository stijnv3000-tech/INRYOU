"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";

const left = [
  {
    title: "Magnesium",
    text: "75mg goed opneembaar magnesiumcitraat ter ondersteuning van een normale spier- en zenuwfunctie.",
  },
  {
    title: "Kalium",
    text: "120mg om je dagelijkse vochtbalans en zachte, echte hydratatie te helpen behouden.",
  },
];

const right = [
  {
    title: "Echte vruchten",
    text: "Geperst vruchtensap en natuurlijk aroma voor helderheid — nooit enkel concentraat.",
  },
  {
    title: "Steviablad",
    text: "Een vleugje natuurlijke zoetheid uit de steviaplant. Geen suikerpieken, geen nasmaak.",
  },
];

export function Minerals() {
  return (
    <section className="relative overflow-hidden bg-cream-deep">
      <div className="container-px mx-auto max-w-6xl py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow text-center">Wat erin zit</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-center text-4xl leading-[1.05] sm:text-5xl">
            Functioneel door ontwerp, niet door{" "}
            <span className="accent text-sage-deep">toeval.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-10 lg:text-right">
            {left.map((item, i) => (
              <Reveal key={item.title} delay={i}>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-2 text-pretty text-ink lg:ml-auto lg:max-w-xs">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex h-[360px] w-[200px] items-center justify-center lg:h-[460px]"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(224,124,58,0.22), transparent 70%)",
              }}
            />
            <Image
              src={asset("/images/can-ginger-citrus.png")}
              alt="Detail van een INRYOU blik"
              width={240}
              height={520}
              className="animate-float-slow relative h-full w-auto object-contain drop-shadow-[0_34px_40px_rgba(32,29,26,0.22)]"
            />
          </motion.div>

          <div className="flex flex-col gap-10">
            {right.map((item, i) => (
              <Reveal key={item.title} delay={i}>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-xs text-pretty text-ink">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
