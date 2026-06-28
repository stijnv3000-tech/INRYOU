import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export interface ProseSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export function ProsePage({
  eyebrow,
  title,
  intro,
  sections,
  footnote,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  sections?: ProseSection[];
  footnote?: string;
  children?: ReactNode;
}) {
  return (
    <div className="container-px mx-auto max-w-3xl py-16 lg:py-24">
      <Reveal>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 text-pretty text-xl leading-relaxed text-charcoal-soft">
            {intro}
          </p>
        )}
      </Reveal>

      {sections && (
        <div className="mt-12 space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.heading ?? i} as="div">
              {section.heading && (
                <h2 className="text-2xl">{section.heading}</h2>
              )}
              {section.paragraphs?.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-ink">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-ink">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      <span className="text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      )}

      {children}

      {footnote && <p className="mt-12 text-sm text-muted">{footnote}</p>}
    </div>
  );
}
