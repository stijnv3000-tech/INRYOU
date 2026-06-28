"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "./icons";

export function NewsletterForm({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  const dark = variant === "dark";

  if (done) {
    return (
      <p
        className={`flex items-center gap-2 text-sm font-medium ${
          dark ? "text-sage-soft" : "text-sage-deep"
        }`}
      >
        <Check className="h-4 w-4" />
        You're in. Check your inbox for your code.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center gap-2 rounded-full p-1.5 ${
        dark
          ? "bg-cream/10 ring-1 ring-cream/15"
          : "bg-white ring-1 ring-charcoal/10"
      }`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className={`min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-current/50 ${
          dark ? "text-cream placeholder:text-cream/40" : "text-charcoal"
        }`}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-white transition hover:bg-orange-deep"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </form>
  );
}
