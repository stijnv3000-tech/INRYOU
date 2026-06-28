import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="container-px mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Lost the balance</p>
      <h1 className="mt-4 font-display text-7xl text-charcoal sm:text-8xl">404</h1>
      <p className="mt-4 max-w-sm text-pretty text-lg text-ink">
        This page seems to have drifted off. Let's get you back to something
        refreshing.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">
          Back home
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Shop the range
        </ButtonLink>
      </div>
    </section>
  );
}
