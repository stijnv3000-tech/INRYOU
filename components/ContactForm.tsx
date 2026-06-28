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
        <h2 className="mt-5 text-2xl">Message sent</h2>
        <p className="mt-2 max-w-sm text-pretty text-ink">
          Thanks for reaching out — we'll be back in touch within one working
          day.
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
            Name
          </label>
          <input required placeholder="Your name" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="you@email.com"
            className={field}
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">
          Subject
        </label>
        <input placeholder="How can we help?" className={field} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell us a little more…"
          className={`${field} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-full bg-orange px-8 py-4 font-medium text-white transition hover:bg-orange-deep sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}
