import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Duurzaamheid",
  description:
    "Hoe INRYOU zijn voetafdruk licht houdt — recycleerbaar aluminium, CO₂-neutrale levering, verantwoorde herkomst en eerlijke vooruitgang.",
};

export default function SustainabilityPage() {
  return (
    <ProsePage
      eyebrow="Duurzaamheid"
      title="Licht voor de planeet, met opzet."
      intro="Balans betekent verder denken dan wat er in het blikje zit. We proberen bij elke stap licht te wegen — en eerlijk te zijn over waar we nog beter kunnen."
      sections={[
        {
          heading: "Eindeloos recycleerbaar aluminium",
          paragraphs: [
            "Onze blikjes zijn gemaakt van aluminium, een van de best recycleerbare materialen ter wereld. Ongeveer 75% van al het ooit geproduceerde aluminium is vandaag nog in gebruik, en een blikje kan in amper 60 dagen gerecycleerd en terug in het rek staan.",
          ],
        },
        {
          heading: "CO₂-neutrale levering",
          paragraphs: [
            "Elke bestelling wordt CO₂-neutraal verzonden. We meten de uitstoot van onze logistiek en compenseren die via geverifieerde klimaatprojecten, terwijl we blijven werken om ze bij de bron te verminderen.",
          ],
        },
        {
          heading: "Verantwoorde ingrediënten",
          paragraphs: [
            "We halen echt fruit en natuurlijke ingrediënten bij leveranciers die onze standaarden delen, en werken zonder kunstmatige kleurstoffen, zoetstoffen of bewaarmiddelen — beter voor jou, en zachter voor de systemen die ons voedsel voortbrengen.",
          ],
        },
        {
          heading: "Eerlijk over de weg ernaartoe",
          list: [
            "Minimale, recycleerbare secundaire verpakking",
            "Productiepartners die steeds meer op hernieuwbare energie draaien",
            "Een engagement om onze vooruitgang te publiceren, ook waar we tekortschieten",
          ],
        },
      ]}
      footnote="Duurzaamheid is een richting, geen bestemming. We maken liever gestage, eerlijke vooruitgang dan ze te overdrijven."
    />
  );
}
