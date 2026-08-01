import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { Quote } from "@/components/ui/icons";
import { reviews } from "@/lib/reviews";

export function Testimonials() {
  return (
    <section className="bg-cream-deep">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow">Geproefd. Geliefd.</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.05] sm:text-5xl">
              Wint mensen stilletjes{" "}
              <span className="italic text-orange-deep">voor zich.</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-5 flex items-center gap-3">
              <Stars rating={5} />
              <span className="text-sm text-ink">
                4,9 gemiddeld uit{" "}
                <span className="font-semibold text-charcoal">1.300+</span>{" "}
                geverifieerde beoordelingen
              </span>
            </div>
          </Reveal>
        </div>

        <Stagger className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {reviews.map((r) => (
            <Reveal
              key={r.name + r.title}
              as="div"
              className="break-inside-avoid rounded-3xl bg-cream p-7 ring-1 ring-charcoal/5"
            >
              <Quote className="h-7 w-7 text-orange-soft" />
              <div className="mt-3 flex items-center justify-between">
                <Stars rating={r.rating} size={14} />
                <span className="rounded-full bg-charcoal/5 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-muted">
                  {r.flavor}
                </span>
              </div>
              <h3 className="mt-4 text-lg leading-snug">{r.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-ink">
                {r.body}
              </p>
              <p className="mt-5 text-sm font-medium text-charcoal">
                {r.name}
                <span className="font-normal text-muted"> · {r.location}</span>
              </p>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
