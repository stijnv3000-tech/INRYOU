export type Theme = "cranberry" | "ginger" | "sage";

export interface Product {
  slug: string;
  name: string;
  flavorLine: string;
  tagline: string;
  shortDescription: string;
  description: string;
  price: number;
  comparePrice?: number;
  packSize: number;
  volume: string;
  calories: number;
  sugar: string;
  image: string;
  theme: Theme;
  /** hero accent + soft tints for cards/sections */
  accent: string;
  accentSoft: string;
  available: boolean;
  bestSeller?: boolean;
  tastingNotes: string[];
  benefits: { title: string; description: string }[];
  ingredients: string[];
  functionalMinerals: { name: string; detail: string }[];
  pairings: string;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    slug: "cranberry",
    name: "Cranberry",
    flavorLine: "Veenbes · Canneberge",
    tagline: "Tart, bright, quietly restorative.",
    shortDescription:
      "Crisp cranberry with a clean, dry finish. Lightly sparkling, never sweet.",
    description:
      "A composed, grown-up take on cranberry — tart fruit balanced by gentle minerality and the faintest whisper of sweetness. Each sip is bright and dry, the kind of refreshment that feels considered rather than loud. Functional electrolytes work quietly in the background to keep you in balance through the day.",
    price: 32,
    comparePrice: 38,
    packSize: 12,
    volume: "250 ml",
    calories: 15,
    sugar: "1.5g",
    image: "/images/can-cranberry.png",
    theme: "cranberry",
    accent: "var(--color-cranberry)",
    accentSoft: "var(--color-cranberry-soft)",
    available: true,
    bestSeller: true,
    tastingNotes: ["Tart cranberry", "Pink grapefruit", "Dry finish"],
    benefits: [
      {
        title: "Antioxidant-rich",
        description:
          "Real cranberry brings naturally occurring polyphenols — colour and character, not concentrate.",
      },
      {
        title: "Electrolyte balance",
        description:
          "A measured dose of magnesium and potassium to support everyday hydration.",
      },
      {
        title: "Low sugar, full flavour",
        description:
          "Just 1.5g of sugar per can. The brightness comes from the fruit, not syrup.",
      },
    ],
    ingredients: [
      "Sparkling spring water",
      "Cranberry juice (from concentrate, 6%)",
      "Natural cranberry & grapefruit flavour",
      "Magnesium citrate",
      "Potassium citrate",
      "Steviol glycosides (from stevia leaf)",
    ],
    functionalMinerals: [
      { name: "Magnesium", detail: "75mg · supports normal muscle function" },
      { name: "Potassium", detail: "120mg · supports electrolyte balance" },
      { name: "Vitamin B6", detail: "0.4mg · supports energy metabolism" },
    ],
    pairings: "Bright mornings, long lunches, the 4pm reset.",
    rating: 4.9,
    reviewCount: 412,
  },
  {
    slug: "ginger-citrus",
    name: "Ginger & Citrus",
    flavorLine: "Gember & Citrus · Gingembre & Agrumes",
    tagline: "Warm spice meets clean citrus.",
    shortDescription:
      "Fresh ginger with a lift of orange and lemon. Warming, lively, settling.",
    description:
      "A gentle heat from real ginger, lifted by clean citrus oils. It's enlivening without being sharp — a drink that wakes the palate and settles the stomach in the same breath. Light carbonation carries the aromatics; functional minerals keep the experience grounded and balanced.",
    price: 32,
    comparePrice: 38,
    packSize: 12,
    volume: "250 ml",
    calories: 18,
    sugar: "2g",
    image: "/images/can-ginger-citrus.png",
    theme: "ginger",
    accent: "var(--color-orange)",
    accentSoft: "var(--color-orange-soft)",
    available: true,
    bestSeller: true,
    tastingNotes: ["Fresh ginger", "Sweet orange", "Lemon zest"],
    benefits: [
      {
        title: "Settling by nature",
        description:
          "Real ginger root has been valued for digestive comfort for centuries.",
      },
      {
        title: "Bright, natural energy",
        description:
          "Citrus and B-vitamins for a clean lift without the crash of caffeine and sugar.",
      },
      {
        title: "Clean ingredients",
        description:
          "No artificial sweeteners, colours or preservatives. Ever.",
      },
    ],
    ingredients: [
      "Sparkling spring water",
      "Ginger extract (1.2%)",
      "Orange & lemon juice (from concentrate, 4%)",
      "Natural citrus flavour",
      "Magnesium citrate",
      "Potassium citrate",
      "Steviol glycosides (from stevia leaf)",
    ],
    functionalMinerals: [
      { name: "Magnesium", detail: "75mg · supports normal muscle function" },
      { name: "Potassium", detail: "120mg · supports electrolyte balance" },
      { name: "Vitamin B12", detail: "0.6μg · supports reduced fatigue" },
    ],
    pairings: "Slow mornings, post-workout, the mid-afternoon dip.",
    rating: 4.8,
    reviewCount: 357,
  },
  {
    slug: "quince-vanilla",
    name: "Quince & Vanilla",
    flavorLine: "Kwee & Vanille · Coing & Vanille",
    tagline: "Soft, floral, calmly indulgent.",
    shortDescription:
      "Delicate quince rounded with real vanilla. The calm one in the range.",
    description:
      "The most contemplative of the three — orchard quince, gently floral, softened by a thread of real vanilla. It drinks smooth and rounded, an evening sort of sparkling water for when you want something that feels like a treat but behaves like water. Minerals and adaptogenic calm, quietly composed.",
    price: 32,
    comparePrice: 38,
    packSize: 12,
    volume: "250 ml",
    calories: 16,
    sugar: "1.8g",
    image: "/images/can-cranberry.png",
    theme: "sage",
    accent: "var(--color-sage-deep)",
    accentSoft: "var(--color-sage-soft)",
    available: true,
    tastingNotes: ["Orchard quince", "Madagascar vanilla", "Soft florals"],
    benefits: [
      {
        title: "Calm in a can",
        description:
          "A touch of L-theanine for relaxed focus — unwind without slowing down.",
      },
      {
        title: "Naturally rounded",
        description:
          "Real vanilla brings warmth and body, so there's no need for sugar to soften it.",
      },
      {
        title: "Everyday minerals",
        description:
          "The same balanced electrolyte profile across the whole INRYOU range.",
      },
    ],
    ingredients: [
      "Sparkling spring water",
      "Quince juice (from concentrate, 5%)",
      "Natural vanilla & quince flavour",
      "L-theanine",
      "Magnesium citrate",
      "Potassium citrate",
      "Steviol glycosides (from stevia leaf)",
    ],
    functionalMinerals: [
      { name: "Magnesium", detail: "75mg · supports normal muscle function" },
      { name: "L-theanine", detail: "50mg · supports relaxed focus" },
      { name: "Potassium", detail: "120mg · supports electrolyte balance" },
    ],
    pairings: "Wind-down evenings, reading chairs, quiet weekends.",
    rating: 4.9,
    reviewCount: 268,
  },
];

export const bundle = {
  slug: "discovery-pack",
  name: "The Discovery Pack",
  tagline: "All three flavours, one effortless box.",
  description:
    "Can't choose? Start here. A curated mix of all three INRYOU flavours so you can find your balance — four of each, twelve in total.",
  price: 30,
  comparePrice: 36,
  packSize: 12,
  perFlavor: 4,
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function pricePerCan(price: number, packSize: number): string {
  return (price / packSize).toFixed(2);
}
