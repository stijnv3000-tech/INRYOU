"use client";

import { useState, type FormEvent } from "react";
import { Check } from "@/components/ui/icons";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-cream-deep p-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-2xl">Bericht verzonden</h2>
        <p className="mt-2 max-w-sm text-pretty text-ink">
          Bedankt voor je bericht — we komen binnen één werkdag bij je terug.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-charcoal/15 bg-white px-4 py-3 text-charcoal outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20 placeholder:text-muted";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            Naam
          </label>
          <input required placeholder="Je naam" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            E-mail
          </label>
          <input
            required
            type="email"
            placeholder="jij@email.com"
            className={field}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">
          Onderwerp
        </label>
        <input placeholder="Waarmee kunnen we je helpen?" className={field} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">
          Bericht
        </label>
        <textarea
          required
          rows={5}
          placeholder="Vertel ons wat meer…"
          className={`${field} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-full bg-orange px-8 py-4 font-medium text-white transition hover:bg-orange-deep sm:w-auto"
      >
        Verstuur bericht
      </button>
    </form>
  );
}
