import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe INRYOU je persoonsgegevens verzamelt, gebruikt en beschermt.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <ProsePage
      eyebrow="Juridisch"
      title="Privacybeleid"
      intro="Je vertrouwen is belangrijk voor ons. Dit beleid legt in klare taal uit welke gegevens we verzamelen en hoe we ze gebruiken. Dit is een sjabloon en moet vóór de lancering door een juridisch adviseur worden nagekeken."
      sections={[
        {
          heading: "Wat we verzamelen",
          paragraphs: [
            "Wanneer je een bestelling plaatst of je inschrijft voor onze nieuwsbrief, verzamelen we de gegevens die je opgeeft — zoals je naam, e-mailadres, leveringsadres en bestelgegevens — samen met basale, geanonimiseerde analytics over hoe onze site gebruikt wordt.",
          ],
        },
        {
          heading: "Hoe we het gebruiken",
          list: [
            "Om je bestellingen te verwerken en te leveren",
            "Om abonnementen en klantendienst te beheren",
            "Om updates en aanbiedingen te sturen, als je je hebt aangemeld",
            "Om onze website en producten te verbeteren",
          ],
        },
        {
          heading: "Je rechten",
          paragraphs: [
            "Je kan je persoonsgegevens inkijken, corrigeren of verwijderen, en je op elk moment uitschrijven voor marketing. Om een van deze rechten uit te oefenen, neem je contact op via hello@inryou.com.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "We gebruiken essentiële cookies om de webshop te laten werken en optionele analytics-cookies om het gebruik te begrijpen. Je kan niet-essentiële cookies beheren via de instellingen van je browser.",
          ],
        },
      ]}
      footnote="Laatst bijgewerkt: dit is voorbeeldinhoud voor demonstratiedoeleinden."
    />
  );
}
