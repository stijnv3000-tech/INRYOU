import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De voorwaarden voor het gebruik van de INRYOU-website en -webshop.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Juridisch"
      title="Algemene voorwaarden"
      intro="Deze voorwaarden gelden voor je gebruik van de INRYOU-website en de aankoop van onze producten. Dit is een sjabloon en moet vóór de lancering door een juridisch adviseur worden nagekeken."
      sections={[
        {
          heading: "Bestellingen",
          paragraphs: [
            "Alle bestellingen zijn onderworpen aan aanvaarding en beschikbaarheid. Prijzen worden weergegeven in euro en zijn inclusief toepasselijke belastingen, tenzij anders vermeld.",
          ],
        },
        {
          heading: "Abonnementen",
          paragraphs: [
            "Abonnementsbestellingen worden automatisch verlengd volgens het door jou gekozen interval tot ze gepauzeerd of opgezegd worden. Je kan je abonnement op elk moment beheren, pauzeren of opzeggen via je account.",
          ],
        },
        {
          heading: "Retour & terugbetaling",
          paragraphs: [
            "Onze 30 dagen tevredenheidsgarantie geldt zoals beschreven op onze pagina Verzending & retour. Je wettelijke consumentenrechten blijven onverminderd van kracht.",
          ],
        },
        {
          heading: "Aansprakelijkheid",
          paragraphs: [
            "INRYOU is een voedingsmiddel en geen geneesmiddel. Voedings- en functionele beweringen worden ter informatie verstrekt en zijn niet bedoeld om een aandoening vast te stellen, te behandelen of te voorkomen. Lees steeds het etiket.",
          ],
        },
      ]}
      footnote="Laatst bijgewerkt: dit is voorbeeldinhoud voor demonstratiedoeleinden."
    />
  );
}
