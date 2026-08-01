export type Theme = "cranberry" | "ginger" | "sage";

export interface Product {
  slug: string;
  name: string;
  flavorLine: string;
  /** Short badge shown on the shop card: Focus / Boost / Calm */
  badge: string;
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
    badge: "Focus",
    tagline: "Lichtzuur, helder, rustig verkwikkend.",
    shortDescription:
      "Fris, lichtzuur en verkwikkend. Cranberry met een functionele kern voor heldere focus.",
    description:
      "Een verfijnde, volwassen kijk op cranberry — lichtzure vruchten in balans met zachte mineraliteit en amper zoetheid. Elke slok is helder en droog: verfrissing die doordacht aanvoelt in plaats van luid. Functionele elektrolyten werken rustig op de achtergrond om je de hele dag in balans te houden.",
    price: 30,
    comparePrice: 36,
    packSize: 12,
    volume: "250 ml",
    calories: 15,
    sugar: "1,5g",
    image: "/images/can-cranberry.png",
    theme: "cranberry",
    accent: "var(--color-cranberry)",
    accentSoft: "var(--color-cranberry-soft)",
    available: true,
    bestSeller: true,
    tastingNotes: ["Lichtzuur", "Verfrissend", "Helder"],
    benefits: [
      {
        title: "Rijk aan antioxidanten",
        description:
          "Echte cranberry brengt van nature aanwezige polyfenolen — kleur en karakter, geen concentraat.",
      },
      {
        title: "Elektrolytenbalans",
        description:
          "Een afgemeten dosis magnesium en kalium ter ondersteuning van je dagelijkse hydratatie.",
      },
      {
        title: "Weinig suiker, volle smaak",
        description:
          "Slechts 1,5g suiker per blik. De helderheid komt van het fruit, niet van siroop.",
      },
    ],
    ingredients: [
      "Bruisend bronwater",
      "Cranberrysap (uit concentraat, 6%)",
      "Natuurlijk cranberry- & grapefruitaroma",
      "Magnesiumcitraat",
      "Kaliumcitraat",
      "Steviolglycosiden (uit steviablad)",
    ],
    functionalMinerals: [
      { name: "Magnesium", detail: "75mg · ondersteunt normale spierfunctie" },
      { name: "Kalium", detail: "120mg · ondersteunt de elektrolytenbalans" },
      { name: "Vitamine B6", detail: "0,4mg · ondersteunt het energiemetabolisme" },
    ],
    pairings: "Heldere ochtenden, lange lunches, de reset om 16u.",
    rating: 4.9,
    reviewCount: 412,
  },
  {
    slug: "ginger-citrus",
    name: "Ginger & Citrus",
    flavorLine: "Gember & Citrus · Gingembre & Agrumes",
    badge: "Boost",
    tagline: "Warme kruidigheid ontmoet heldere citrus.",
    shortDescription:
      "Pittige gember ontmoet heldere citrus. Een warme, levendige boost zonder de crash.",
    description:
      "Een zachte pit van echte gember, opgetild door heldere citrusoliën. Verkwikkend zonder scherp te zijn — een drank die je smaakpapillen wekt en tegelijk je maag tot rust brengt. Lichte koolzuur draagt de aroma's; functionele mineralen houden de ervaring geaard en in balans.",
    price: 30,
    comparePrice: 36,
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
    tastingNotes: ["Pittig", "Citrus", "Levendig"],
    benefits: [
      {
        title: "Van nature verzachtend",
        description:
          "Echte gemberwortel wordt al eeuwen gewaardeerd om zijn zachte werking op de spijsvertering.",
      },
      {
        title: "Heldere, natuurlijke energie",
        description:
          "Citrus en B-vitamines voor een schone lift zonder de crash van cafeïne en suiker.",
      },
      {
        title: "Zuivere ingrediënten",
        description:
          "Geen kunstmatige zoetstoffen, kleurstoffen of bewaarmiddelen. Nooit.",
      },
    ],
    ingredients: [
      "Bruisend bronwater",
      "Gemberextract (1,2%)",
      "Sinaasappel- & citroensap (uit concentraat, 4%)",
      "Natuurlijk citrusaroma",
      "Magnesiumcitraat",
      "Kaliumcitraat",
      "Steviolglycosiden (uit steviablad)",
    ],
    functionalMinerals: [
      { name: "Magnesium", detail: "75mg · ondersteunt normale spierfunctie" },
      { name: "Kalium", detail: "120mg · ondersteunt de elektrolytenbalans" },
      { name: "Vitamine B12", detail: "0,6µg · draagt bij tot minder vermoeidheid" },
    ],
    pairings: "Trage ochtenden, na het sporten, de inzinking in de namiddag.",
    rating: 4.8,
    reviewCount: 357,
  },
  {
    slug: "quince-vanilla",
    name: "Kweepeer & Vanille",
    flavorLine: "Kwee & Vanille · Coing & Vanille",
    badge: "Calm",
    tagline: "Zacht, bloemig, rustig verwennend.",
    shortDescription:
      "Zachte kweepeer en romige vanille. Onze rustigste smaak — binnenkort.",
    description:
      "De meest ingetogen van de drie — boomgaardkwee, subtiel bloemig, verzacht door een draadje echte vanille. Rond en zacht, een bruisend water voor het moment waarop je iets wil dat als een traktatie voelt maar als water drinkt. Mineralen en adaptogene rust, stilletjes samengesteld.",
    price: 30,
    comparePrice: 36,
    packSize: 12,
    volume: "250 ml",
    calories: 16,
    sugar: "1,8g",
    image: "",
    theme: "sage",
    accent: "var(--color-sage-deep)",
    accentSoft: "var(--color-sage-soft)",
    available: false,
    tastingNotes: ["Zacht", "Romig", "Rond"],
    benefits: [
      {
        title: "Rust in een blik",
        description:
          "Een vleugje L-theanine voor ontspannen focus — kom tot rust zonder te vertragen.",
      },
      {
        title: "Van nature rond",
        description:
          "Echte vanille brengt warmte en body, zodat suiker overbodig is om af te ronden.",
      },
      {
        title: "Dagelijkse mineralen",
        description:
          "Hetzelfde uitgebalanceerde elektrolytenprofiel als de rest van het INRYOU-assortiment.",
      },
    ],
    ingredients: [
      "Bruisend bronwater",
      "Kweepeersap (uit concentraat, 5%)",
      "Natuurlijk vanille- & kweearoma",
      "L-theanine",
      "Magnesiumcitraat",
      "Kaliumcitraat",
      "Steviolglycosiden (uit steviablad)",
    ],
    functionalMinerals: [
      { name: "Magnesium", detail: "75mg · ondersteunt normale spierfunctie" },
      { name: "L-theanine", detail: "50mg · ondersteunt ontspannen focus" },
      { name: "Kalium", detail: "120mg · ondersteunt de elektrolytenbalans" },
    ],
    pairings: "Rustige avonden, de leesstoel, kalme weekends.",
    rating: 4.9,
    reviewCount: 268,
  },
];

export const bundle = {
  slug: "proefpakket",
  name: "Het Proefpakket",
  tagline: "Beide smaken, één moeiteloze doos.",
  description:
    "Kan je niet kiezen? Begin hier. Een mix van onze twee beschikbare smaken zodat je jouw balans vindt — zes van elk, twaalf in totaal.",
  price: 30,
  comparePrice: 36,
  packSize: 12,
  perFlavor: 6,
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function pricePerCan(price: number, packSize: number): string {
  return (price / packSize).toFixed(2).replace(".", ",");
}
