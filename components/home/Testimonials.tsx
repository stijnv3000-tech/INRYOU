import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Stars } from "@/components/ui/Stars";
import { Quote } from "@/components/ui/icons";
import { reviews } from "@/lib/reviews";

const flavorStyle: Record<
  string,
  { card: string; avatar: string; pill: string }
> = {
  Cranberry: {
    card: "bg-cranberry-soft/50",
    avatar: "bg-cranberry text-white",
    pill: "bg-cranberry/10 text-cranberry-deep",
  },
  "Ginger & Citrus": {
    card: "bg-orange-soft/50",
    avatar: "bg-orange text-white",
    pill: "bg-orange/10 text-orange-deep",
  },
  "Kweepeer & Vanille": {
    card: "bg-sage-soft/50",
    avatar: "bg-sage-deep text-white",
    pill: "bg-sage-deep/10 text-sage-deep",
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const [featured, ...rest] = reviews;
  const fs = (f: string) => flavorStyle[f] ?? flavorStyle["Cranberry"];

  return (
    <section className="bg-cream-deep">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        {/* Header with aggregate */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">Geproefd. Geliefd.</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-3 max-w-xl text-balance text-4xl leading-[1.05] sm:text-5xl">
                Wat onze drinkers{" "}
                <span className="accent text-orange-deep">écht vinden.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2} as="div">
            <div className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 ring-1 ring-charcoal/5">
              <p className="font-display text-5xl leading-none text-charcoal">
                4,9
              </p>
              <div>
                <Stars rating={5} />
                <p className="mt-1 text-sm text-ink">
                  1.300+ beoordelingen
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Featured review */}
          <Reveal as="div" className="lg:col-span-3">
            <div
              className={`grid gap-6 overflow-hidden rounded-[1.75rem] p-8 ring-1 ring-charcoal/5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-10 ${fs(featured.flavor).card}`}
            >
              <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl ${fs(featured.flavor).avatar}`}
                >
                  {initials(featured.name)}
                </span>
                <div>
                  <p className="font-medium text-charcoal">{featured.name}</p>
                  <p className="text-sm text-muted">{featured.location}</p>
                </div>
              </div>
              <div>
                <Quote className="h-8 w-8 text-charcoal/15" />
                <p className="mt-2 font-display text-2xl leading-snug text-charcoal sm:text-3xl">
                  "{featured.body}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Stars rating={featured.rating} />
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${fs(featured.flavor).pill}`}
                  >
                    {featured.flavor}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Rest */}
          <Stagger className="contents">
            {rest.map((r) => (
              <Reveal key={r.name + r.title} as="div">
                <div className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-charcoal/5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-lg ${fs(r.flavor).avatar}`}
                    >
                      {initials(r.name)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {r.name}
                      </p>
                      <p className="text-xs text-muted">{r.location}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Stars rating={r.rating} size={14} />
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.65rem] font-medium ${fs(r.flavor).pill}`}
                    >
                      {r.flavor}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg leading-snug">{r.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
