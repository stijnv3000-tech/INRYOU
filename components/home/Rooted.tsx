"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Heart, Check, Drop, Recycle, Globe, Sparkle } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

type Feature = {
  icon: typeof Heart;
  title: string;
  text: string;
  chip: string;
};

const left: Feature[] = [
  { icon: Heart, title: "Natuurlijk", text: "Echte ingrediënten", chip: "bg-sage-deep text-white" },
  { icon: Check, title: "Minder suiker", text: "Minder dan 2g per blik", chip: "bg-orange text-white" },
  { icon: Drop, title: "Functioneel", text: "Mineralenbalans", chip: "bg-cranberry text-white" },
];

const right: Feature[] = [
  { icon: Recycle, title: "Recycleerbaar", text: "Volledig recycleerbaar blik", chip: "bg-sage-deep text-white" },
  { icon: Globe, title: "Belgisch", text: "Lokaal gebrouwen", chip: "bg-charcoal text-cream" },
  { icon: Sparkle, title: "Geen onzin", text: "Niets kunstmatigs", chip: "bg-orange text-white" },
];

function Card({ f, align }: { f: Feature; align: "left" | "right" }) {
  return (
    <Reveal as="div">
      <div
        className={`flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-5 ring-1 ring-charcoal/10 ${
          align === "left" ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}
      >
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-[0_10px_20px_-8px_rgba(56,22,26,0.4)] ${f.chip}`}
        >
          <f.icon className="h-7 w-7" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="font-display text-xl leading-tight text-charcoal">
            {f.title}
          </p>
          <p className="text-sm text-muted">{f.text}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Rooted() {
  return (
    <section className="relative overflow-hidden bg-blush">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <Reveal>
          <h2 className="text-center text-4xl font-normal uppercase tracking-[0.04em] text-charcoal sm:text-5xl lg:text-6xl">
            <span>Geworteld in </span>
            <span className="accent mt-2 inline-block rounded-xl border-2 border-orange px-4 py-1 text-orange">
              betekenis
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          {/* Left column */}
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            {left.map((f) => (
              <Card key={f.title} f={f} align="left" />
            ))}
          </div>

          {/* Center can */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 mx-auto flex h-[300px] w-[190px] items-center justify-center lg:order-2 lg:h-[440px] lg:w-[260px]"
          >
            <div
              aria-hidden
              className="absolute bottom-[14%] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full lg:h-[300px] lg:w-[300px]"
              style={{
                background:
                  "radial-gradient(circle at 50% 60%, #eec27f 0%, #e07c3a 44%, #b23a4b 76%, rgba(178,58,75,0) 80%)",
                maskImage: "linear-gradient(to bottom, black 60%, transparent 60%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 60%, transparent 60%)",
                opacity: 0.55,
              }}
            />
            <Image
              src={asset("/images/can-cranberry.png")}
              alt="INRYOU Cranberry blik"
              width={260}
              height={560}
              className="animate-float-slow relative h-full w-auto object-contain drop-shadow-[0_30px_40px_rgba(56,22,26,0.28)]"
            />
          </motion.div>

          {/* Right column */}
          <div className="order-3 flex flex-col gap-4">
            {right.map((f) => (
              <Card key={f.title} f={f} align="right" />
            ))}
          </div>
        </div>

        <Reveal delay={1}>
          <p className="mt-14 text-center text-muted">
            Met intentie gemaakt — beter voor jou en de planeet.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
