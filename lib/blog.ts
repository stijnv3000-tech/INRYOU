export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  displayDate: string;
  author: string;
  authorRole: string;
  theme: "cranberry" | "ginger" | "sage" | "neutral";
  /** Body is an ordered list of simple blocks for lightweight rendering. */
  body: Block[];
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export const posts: BlogPost[] = [
  {
    slug: "the-real-cost-of-soda",
    title: "The quiet cost of everyday soda — and what to drink instead",
    excerpt:
      "Most of us aren't trying to drink badly. We're just thirsty, busy, and reaching for what's nearest. Here's how to reach for better.",
    category: "Wellbeing",
    readingTime: "6 min read",
    date: "2026-06-18",
    displayDate: "18 June 2026",
    author: "Dr. Mara Lindqvist",
    authorRole: "Nutrition science advisor",
    theme: "cranberry",
    body: [
      {
        type: "p",
        text: "A can of traditional soda is engineered to be irresistible. High sugar, sharp acidity and aggressive carbonation are tuned to keep you reaching for the next one. None of that is an accident — and none of it has much to do with how you actually want to feel.",
      },
      {
        type: "p",
        text: "The average regular soft drink carries between 35 and 40 grams of sugar — roughly nine teaspoons. Drink one a day and that's over three kilograms of sugar a month, most of it consumed without a second thought.",
      },
      { type: "h2", text: "It's rarely about willpower" },
      {
        type: "p",
        text: "We tend to frame soda as a discipline problem. In reality it's a design problem. When the most convenient, most rewarding option is also the least kind to your body, the deck is stacked. The fix isn't to drink less of something you enjoy — it's to make the better option just as enjoyable and just as easy to reach.",
      },
      {
        type: "quote",
        text: "Balance shouldn't feel like sacrifice. The goal was never less — it was better.",
      },
      { type: "h2", text: "What 'better' actually looks like" },
      {
        type: "p",
        text: "A genuinely better everyday drink keeps the things you love about soda — the lift, the fizz, the ritual — and quietly removes the things you don't. That means real fruit instead of syrup, gentle carbonation instead of a sugar rush, and a clean finish that leaves you refreshed rather than sticky.",
      },
      {
        type: "list",
        items: [
          "Under 2g of sugar, with sweetness from fruit and stevia leaf",
          "Functional minerals like magnesium and potassium for everyday balance",
          "No artificial colours, sweeteners or preservatives",
          "A taste grown-up enough to drink every single day",
        ],
      },
      {
        type: "p",
        text: "That's the brief we set ourselves with INRYOU. Not a health drink that feels like a compromise, but a beautiful everyday beverage that happens to be good for you. Natural balance, made effortless.",
      },
    ],
  },
  {
    slug: "what-functional-minerals-do",
    title: "Magnesium, potassium and you: what functional minerals actually do",
    excerpt:
      "'Functional' gets thrown around a lot. Here's a plain-language look at the minerals in every INRYOU can — and why they matter.",
    category: "Ingredients",
    readingTime: "5 min read",
    date: "2026-06-04",
    displayDate: "4 June 2026",
    author: "Dr. Mara Lindqvist",
    authorRole: "Nutrition science advisor",
    theme: "sage",
    body: [
      {
        type: "p",
        text: "Electrolytes are minerals that carry a small electrical charge when dissolved in water. Your body relies on them for almost everything that involves movement or signalling — muscle contraction, nerve impulses, and keeping fluid where it belongs.",
      },
      { type: "h2", text: "Magnesium" },
      {
        type: "p",
        text: "Magnesium is involved in more than 300 enzyme reactions in the body, from energy production to muscle and nerve function. Many of us run slightly low without realising it. Each INRYOU can contributes 75mg in a highly absorbable citrate form.",
      },
      { type: "h2", text: "Potassium" },
      {
        type: "p",
        text: "Potassium works in partnership with sodium to maintain fluid balance and normal blood pressure. It's one of the reasons a well-formulated sparkling drink can be genuinely hydrating rather than just wet.",
      },
      {
        type: "quote",
        text: "We don't add minerals to make a label look impressive. We add them at meaningful, measured doses — and we tell you exactly how much.",
      },
      { type: "h2", text: "Why dose and form matter" },
      {
        type: "p",
        text: "A pinch of a mineral that your body can't absorb well is mostly decoration. We use citrate forms for better bioavailability and keep the doses honest — enough to matter, never so much that the drink stops tasting like a drink.",
      },
      {
        type: "list",
        items: [
          "Magnesium citrate — 75mg per can",
          "Potassium citrate — 120mg per can",
          "B-vitamins and L-theanine in selected flavours",
        ],
      },
    ],
  },
  {
    slug: "rethinking-the-afternoon-slump",
    title: "Rethinking the afternoon slump without reaching for caffeine",
    excerpt:
      "The 3pm dip is real — but the usual fixes often make it worse. A calmer approach to staying steady all day.",
    category: "Wellbeing",
    readingTime: "4 min read",
    date: "2026-05-21",
    displayDate: "21 May 2026",
    author: "Sofie Vermeer",
    authorRole: "Founder, INRYOU",
    theme: "ginger",
    body: [
      {
        type: "p",
        text: "By mid-afternoon, energy dips for most of us. The instinct is to reach for caffeine and sugar — a double espresso, a fizzy drink, a snack from the drawer. It works for twenty minutes, then leaves you flatter than before.",
      },
      { type: "h2", text: "The crash is built in" },
      {
        type: "p",
        text: "A spike in blood sugar is always followed by a dip. Pair that with a late-afternoon caffeine hit that lingers into the evening and disrupts your sleep, and you've borrowed energy from tomorrow to get through today.",
      },
      {
        type: "quote",
        text: "Steady beats spiky. The aim isn't a bigger high — it's fewer lows.",
      },
      { type: "h2", text: "A gentler reset" },
      {
        type: "p",
        text: "Hydration, minerals and a little natural brightness can do more for a flagging afternoon than another coffee. Our Ginger & Citrus was designed for exactly this moment — enough lift to feel awake, nothing that you'll pay for later.",
      },
      {
        type: "list",
        items: [
          "Hydrate first — mild dehydration reads as fatigue",
          "Choose minerals over more caffeine after midday",
          "Keep sugar low to avoid the rebound dip",
          "Step outside for two minutes if you can",
        ],
      },
    ],
  },
  {
    slug: "the-inryou-philosophy",
    title: "Natural balance, made effortless: the INRYOU philosophy",
    excerpt:
      "Why we believe wellbeing should be the easy choice — and how that belief shapes everything from our recipe to our cans.",
    category: "Philosophy",
    readingTime: "5 min read",
    date: "2026-05-08",
    displayDate: "8 May 2026",
    author: "Sofie Vermeer",
    authorRole: "Founder, INRYOU",
    theme: "neutral",
    body: [
      {
        type: "p",
        text: "INRYOU began with a small frustration: every drink that was good for us seemed to announce it loudly, and every drink that tasted good seemed to quietly work against us. We wanted something in between — calm, beautiful, and genuinely good. Something you'd be glad to have in your hand.",
      },
      { type: "h2", text: "Balance over extremes" },
      {
        type: "p",
        text: "Wellness culture loves a hard rule. Cut this, fast that, never again. We don't think life works like that, and we don't think it should. Balance is sustainable precisely because it doesn't ask you to give everything up. It asks you to choose a little better, a little more often.",
      },
      {
        type: "quote",
        text: "We're not here to fix you. You're not broken. We just make the better choice a little easier to reach.",
      },
      { type: "h2", text: "Effortless by design" },
      {
        type: "p",
        text: "Everything about INRYOU is built to lower the friction between you and a good decision — a recipe that genuinely tastes great, a can you're happy to be seen with, and a subscription that means you never run out. When the better option is also the easiest one, balance stops being a project and starts being a habit.",
      },
      {
        type: "p",
        text: "That's the whole idea. Not a revolution — just a quiet, daily upgrade. Natural balance, made effortless.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
