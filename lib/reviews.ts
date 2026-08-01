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
    location: "Antwerpen",
    rating: 5,
    title: "Eindelijk iets dat ik écht graag drink",
    body: "Ik ben twee keer gestopt met frisdrank en twee keer mislukt. INRYOU is het eerste dat de behoefte echt wegneemt — bruisend, helder, niet zoet. De Cranberry staat nu permanent in mijn koelkast.",
    flavor: "Cranberry",
  },
  {
    name: "Thomas R.",
    location: "Gent",
    rating: 5,
    title: "Mijn vervanger voor de koffie van 15u",
    body: "Ginger & Citrus geeft me een schone lift in de namiddag zonder de zenuwachtigheid van cafeïne of de crash erna. Smaakt premium en het blik staat mooi op mijn bureau.",
    flavor: "Ginger & Citrus",
  },
  {
    name: "Sofie M.",
    location: "Leuven",
    rating: 5,
    title: "Rust in een blik is geen overdrijving",
    body: "De Kweepeer & Vanille wordt mijn avondritueel in plaats van een glas wijn. Zacht, volwassen, echt ontspannend. Ik heb mijn hele leesclub bekeerd.",
    flavor: "Kweepeer & Vanille",
  },
  {
    name: "Daan K.",
    location: "Brussel",
    rating: 5,
    title: "Smaakt als een traktatie, gedraagt zich als water",
    body: "Ik was sceptisch dat iets met zo weinig suiker zo lekker kon zijn. Toch wel. Door het abonnement kom ik nooit zonder te zitten — gevaarlijk in de beste zin.",
    flavor: "Cranberry",
  },
  {
    name: "Camille D.",
    location: "Brugge",
    rating: 4,
    title: "Prachtig merk, heerlijke drank",
    body: "Eerst gekocht omdat het blik zo mooi is, blijven kopen omdat het zuiver smaakt en me goed doet voelen. Zou graag nog meer smaken zien.",
    flavor: "Ginger & Citrus",
  },
  {
    name: "Lukas B.",
    location: "Mechelen",
    rating: 5,
    title: "Het hele kantoor is verkocht",
    body: "We hebben de koelkast vol frisdrank vervangen door INRYOU en niemand heeft geklaagd — integendeel. De mineralen lijken echt te helpen tegen de namiddagdip.",
    flavor: "Ginger & Citrus",
  },
];
