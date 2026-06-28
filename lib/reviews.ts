export interface Review {
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  flavor: string;
}

export const reviews: Review[] = [
  {
    name: "Eline V.",
    location: "Antwerp",
    rating: 5,
    title: "Finally something I actually want to drink",
    body: "I quit soda twice and failed twice. INRYOU is the first thing that genuinely scratches the itch — fizzy, bright, not sweet. The Cranberry is permanently in my fridge now.",
    flavor: "Cranberry",
  },
  {
    name: "Thomas R.",
    location: "Rotterdam",
    rating: 5,
    title: "My 3pm coffee replacement",
    body: "Ginger & Citrus gives me a clean little lift in the afternoon without the caffeine jitters or the crash after. Tastes premium and the can looks beautiful on my desk.",
    flavor: "Ginger & Citrus",
  },
  {
    name: "Sofia M.",
    location: "Ghent",
    rating: 5,
    title: "Calm in a can is not an exaggeration",
    body: "The Quince & Vanilla is my evening ritual now instead of a glass of wine. Soft, grown-up, genuinely relaxing. I've converted my whole book club.",
    flavor: "Quince & Vanilla",
  },
  {
    name: "Daan K.",
    location: "Amsterdam",
    rating: 5,
    title: "Tastes like a treat, behaves like water",
    body: "I was sceptical that something this low in sugar could taste this good. It really does. The subscription means I never run out, which is dangerous in the best way.",
    flavor: "Cranberry",
  },
  {
    name: "Camille D.",
    location: "Brussels",
    rating: 4,
    title: "Beautiful brand, lovely drink",
    body: "Bought it first because the can is gorgeous, kept buying it because it tastes clean and makes me feel good. Would love even more flavours.",
    flavor: "Ginger & Citrus",
  },
  {
    name: "Lukas B.",
    location: "Utrecht",
    rating: 5,
    title: "The whole office is hooked",
    body: "We swapped the fridge full of soft drinks for INRYOU and nobody has complained — quite the opposite. The minerals actually seem to help with the afternoon slump.",
    flavor: "Quince & Vanilla",
  },
];
