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
    title: "De stille prijs van dagelijkse frisdrank — en wat je beter drinkt",
    excerpt:
      "De meesten van ons proberen niet slecht te drinken. We hebben gewoon dorst, het is druk, en we grijpen naar wat het dichtst bij is. Zo grijp je naar iets beters.",
    category: "Welzijn",
    readingTime: "6 min lezen",
    date: "2026-06-18",
    displayDate: "18 juni 2026",
    author: "Dr. Mara Lindqvist",
    authorRole: "Voedingswetenschappelijk adviseur",
    theme: "cranberry",
    body: [
      {
        type: "p",
        text: "Een blikje klassieke frisdrank is ontworpen om onweerstaanbaar te zijn. Veel suiker, scherpe zuurgraad en agressieve koolzuur zijn afgestemd om je naar het volgende te laten grijpen. Niets daarvan is toeval — en niets daarvan heeft veel te maken met hoe je je eigenlijk wil voelen.",
      },
      {
        type: "p",
        text: "Een gewone frisdrank bevat gemiddeld tussen 35 en 40 gram suiker — zo'n negen theelepels. Drink er dagelijks eentje en dat is meer dan drie kilo suiker per maand, meestal zonder erbij na te denken.",
      },
      { type: "h2", text: "Het gaat zelden over wilskracht" },
      {
        type: "p",
        text: "We zien frisdrank vaak als een kwestie van discipline. In werkelijkheid is het een kwestie van ontwerp. Wanneer de handigste, meest belonende optie ook de minst vriendelijke is voor je lichaam, is het spel oneerlijk. De oplossing is niet minder drinken van iets waar je van geniet — het is de betere keuze even lekker en even makkelijk bereikbaar maken.",
      },
      {
        type: "quote",
        text: "Balans zou niet als een offer mogen voelen. Het doel was nooit minder — het was beter.",
      },
      { type: "h2", text: "Hoe 'beter' er echt uitziet" },
      {
        type: "p",
        text: "Een écht betere dagelijkse drank behoudt de dingen die je zo fijn vindt aan frisdrank — de lift, de bubbels, het ritueel — en haalt stilletjes de dingen weg die je niet wil. Dat betekent echt fruit in plaats van siroop, zachte bubbels in plaats van een suikerpiek, en een frisse afdronk die je verkwikt achterlaat in plaats van plakkerig.",
      },
      {
        type: "list",
        items: [
          "Minder dan 2g suiker, met zoetheid uit fruit en steviablad",
          "Functionele mineralen zoals magnesium en kalium voor dagelijkse balans",
          "Geen kunstmatige kleurstoffen, zoetstoffen of bewaarmiddelen",
          "Een smaak volwassen genoeg om elke dag te drinken",
        ],
      },
      {
        type: "p",
        text: "Dat is de opdracht die we onszelf stelden met INRYOU. Geen gezondheidsdrank die als een compromis voelt, maar een prachtige dagelijkse drank die toevallig ook goed voor je is. Natuurlijke balans, moeiteloos.",
      },
    ],
  },
  {
    slug: "what-functional-minerals-do",
    title: "Magnesium, kalium en jij: wat functionele mineralen echt doen",
    excerpt:
      "'Functioneel' wordt vaak te pas en te onpas gebruikt. Hier een uitleg in gewone taal over de mineralen in elk INRYOU-blikje — en waarom ze ertoe doen.",
    category: "Ingrediënten",
    readingTime: "5 min lezen",
    date: "2026-06-04",
    displayDate: "4 juni 2026",
    author: "Dr. Mara Lindqvist",
    authorRole: "Voedingswetenschappelijk adviseur",
    theme: "sage",
    body: [
      {
        type: "p",
        text: "Elektrolyten zijn mineralen die een kleine elektrische lading dragen wanneer ze in water oplossen. Je lichaam vertrouwt er voor bijna alles op wat met beweging of signalen te maken heeft — spiersamentrekking, zenuwimpulsen, en het vocht houden waar het hoort.",
      },
      { type: "h2", text: "Magnesium" },
      {
        type: "p",
        text: "Magnesium is betrokken bij meer dan 300 enzymreacties in het lichaam, van energieproductie tot spier- en zenuwfunctie. Velen van ons zitten er ongemerkt net iets te laag op. Elk INRYOU-blikje draagt 75mg bij in een goed opneembare citraatvorm.",
      },
      { type: "h2", text: "Kalium" },
      {
        type: "p",
        text: "Kalium werkt samen met natrium om de vochtbalans en een normale bloeddruk te behouden. Het is een van de redenen waarom een goed samengestelde bruisende drank echt hydraterend kan zijn in plaats van alleen maar nat.",
      },
      {
        type: "quote",
        text: "We voegen geen mineralen toe om een etiket indrukwekkend te laten lijken. We voegen ze toe in zinvolle, afgemeten doses — en we vertellen je precies hoeveel.",
      },
      { type: "h2", text: "Waarom dosis en vorm ertoe doen" },
      {
        type: "p",
        text: "Een snufje van een mineraal dat je lichaam niet goed kan opnemen is vooral versiering. Wij gebruiken citraatvormen voor een betere opneembaarheid en houden de doses eerlijk — genoeg om ertoe te doen, nooit zoveel dat de drank ophoudt naar een drank te smaken.",
      },
      {
        type: "list",
        items: [
          "Magnesiumcitraat — 75mg per blikje",
          "Kaliumcitraat — 120mg per blikje",
          "B-vitamines en L-theanine in geselecteerde smaken",
        ],
      },
    ],
  },
  {
    slug: "rethinking-the-afternoon-slump",
    title: "De namiddagdip anders bekeken, zonder naar cafeïne te grijpen",
    excerpt:
      "De dip om 15u is echt — maar de gebruikelijke oplossingen maken het vaak erger. Een rustigere aanpak om de hele dag stabiel te blijven.",
    category: "Welzijn",
    readingTime: "4 min lezen",
    date: "2026-05-21",
    displayDate: "21 mei 2026",
    author: "Sofie Vermeer",
    authorRole: "Oprichter, INRYOU",
    theme: "ginger",
    body: [
      {
        type: "p",
        text: "Tegen het midden van de namiddag zakt de energie bij de meesten van ons. De reflex is naar cafeïne en suiker te grijpen — een dubbele espresso, een frisdrank, een snack uit de la. Het werkt twintig minuten, en laat je daarna platter achter dan voorheen.",
      },
      { type: "h2", text: "De crash zit er ingebakken" },
      {
        type: "p",
        text: "Op een piek in je bloedsuiker volgt altijd een dip. Combineer dat met een cafeïneshot laat in de namiddag die tot in de avond blijft hangen en je slaap verstoort, en je hebt energie van morgen geleend om vandaag door te komen.",
      },
      {
        type: "quote",
        text: "Stabiel wint van piekerig. Het doel is geen grotere high — het zijn minder dieptepunten.",
      },
      { type: "h2", text: "Een zachtere reset" },
      {
        type: "p",
        text: "Hydratatie, mineralen en een beetje natuurlijke frisheid kunnen meer doen voor een kwakkelende namiddag dan nog een koffie. Onze Gember & Citrus is precies voor dit moment ontworpen — genoeg lift om je wakker te voelen, niets waar je later voor betaalt.",
      },
      {
        type: "list",
        items: [
          "Hydrateer eerst — lichte uitdroging voelt als vermoeidheid",
          "Kies na de middag voor mineralen in plaats van meer cafeïne",
          "Houd de suiker laag om de terugvaldip te vermijden",
          "Ga twee minuten naar buiten als het kan",
        ],
      },
    ],
  },
  {
    slug: "the-inryou-philosophy",
    title: "Natuurlijke balans, moeiteloos: de filosofie van INRYOU",
    excerpt:
      "Waarom wij geloven dat welzijn de makkelijke keuze zou moeten zijn — en hoe die overtuiging alles vormgeeft, van ons recept tot onze blikjes.",
    category: "Filosofie",
    readingTime: "5 min lezen",
    date: "2026-05-08",
    displayDate: "8 mei 2026",
    author: "Sofie Vermeer",
    authorRole: "Oprichter, INRYOU",
    theme: "neutral",
    body: [
      {
        type: "p",
        text: "INRYOU begon met een kleine frustratie: elke drank die goed voor ons was leek dat luid te verkondigen, en elke drank die lekker smaakte leek stilletjes tegen ons te werken. We wilden iets ertussenin — kalm, mooi en oprecht goed. Iets wat je graag in je hand hebt.",
      },
      { type: "h2", text: "Balans boven uitersten" },
      {
        type: "p",
        text: "De wellnesscultuur is dol op strenge regels. Schrap dit, vast dat, nooit meer. Wij denken niet dat het leven zo werkt, en we vinden ook niet dat het zo zou moeten. Balans is net houdbaar omdat het je niet vraagt alles op te geven. Het vraagt je om een beetje beter te kiezen, een beetje vaker.",
      },
      {
        type: "quote",
        text: "We zijn er niet om je te repareren. Je bent niet kapot. Wij maken de betere keuze gewoon een beetje makkelijker bereikbaar.",
      },
      { type: "h2", text: "Moeiteloos door ontwerp" },
      {
        type: "p",
        text: "Alles aan INRYOU is gebouwd om de drempel tussen jou en een goede beslissing te verlagen — een recept dat oprecht heerlijk smaakt, een blikje waarmee je je graag laat zien, en een abonnement dat betekent dat je nooit zonder valt. Wanneer de betere optie ook de makkelijkste is, houdt balans op een project te zijn en wordt het een gewoonte.",
      },
      {
        type: "p",
        text: "Dat is het hele idee. Geen revolutie — gewoon een rustige, dagelijkse upgrade. Natuurlijke balans, moeiteloos.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
