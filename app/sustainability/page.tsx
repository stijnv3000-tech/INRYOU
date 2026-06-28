import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "How INRYOU keeps its footprint light — recyclable aluminium, carbon-neutral delivery, responsible sourcing and honest progress.",
};

export default function SustainabilityPage() {
  return (
    <ProsePage
      eyebrow="Sustainability"
      title="Light on the planet, by design."
      intro="Balance means thinking about more than what's in the can. We try to tread lightly at every step — and to be honest about where we're still improving."
      sections={[
        {
          heading: "Endlessly recyclable aluminium",
          paragraphs: [
            "Our cans are made from aluminium, one of the most recyclable materials on earth. Around 75% of all aluminium ever produced is still in use today, and a can can be recycled and back on a shelf in as little as 60 days.",
          ],
        },
        {
          heading: "Carbon-neutral delivery",
          paragraphs: [
            "Every order ships carbon-neutral. We measure the emissions of our logistics and offset them through verified climate projects, while continually working to reduce them at source.",
          ],
        },
        {
          heading: "Responsible ingredients",
          paragraphs: [
            "We source real fruit and natural ingredients from suppliers who share our standards, and formulate without artificial colours, sweeteners or preservatives — better for you, and gentler on the systems that grow our food.",
          ],
        },
        {
          heading: "Honest about the journey",
          list: [
            "Minimal, recyclable secondary packaging",
            "Production partners powered by increasing shares of renewable energy",
            "A commitment to publish our progress, including where we fall short",
          ],
        },
      ]}
      footnote="Sustainability is a direction, not a destination. We'd rather make steady, honest progress than overstate it."
    />
  );
}
