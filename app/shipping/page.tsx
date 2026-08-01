import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Verzending & retour",
  description:
    "Verzending en retour bij INRYOU: gratis levering vanaf €35, CO₂-neutrale verzending en een 30 dagen tevredenheidsgarantie.",
};

export default function ShippingPage() {
  return (
    <ProsePage
      eyebrow="Help"
      title="Verzending & retour"
      intro="Je balans bij je krijgen zou net zo moeiteloos moeten zijn als ze drinken. Zo werken levering en retour."
      sections={[
        {
          heading: "Levering",
          list: [
            "Vast leveringstarief van €3,95 in continentaal Europa",
            "Gratis levering vanaf €35",
            "Gratis levering bij elke abonnementsbestelling",
            "De meeste bestellingen komen binnen 2–4 werkdagen aan",
            "Alle verzendingen zijn CO₂-neutraal",
          ],
        },
        {
          heading: "Je bestelling volgen",
          paragraphs: [
            "Zodra je blikjes bij ons vertrekken, ontvang je een e-mail met track & trace zodat je je bestelling tot aan de deur kan volgen.",
          ],
        },
        {
          heading: "30 dagen tevredenheidsgarantie",
          paragraphs: [
            "Ben je niet tevreden met je INRYOU, laat het ons dan binnen 30 dagen weten en we lossen het op — een vervanging of een volledige terugbetaling, wat je maar verkiest. Je hoeft de blikjes niet terug te sturen.",
          ],
        },
        {
          heading: "Hulp nodig?",
          paragraphs: [
            "Mail naar hello@inryou.com en een echte medewerker antwoordt binnen één werkdag.",
          ],
        },
      ]}
    />
  );
}
