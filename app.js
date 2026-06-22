/* =============================================================================
   INRYOU — app.js
   Single shared script for every page. Responsibilities:
     1. i18n          — trilingual dictionary (NL default / FR / EN) + renderer
     2. Layout        — inject the identical header, footer and cart drawer
     3. Catalogue     — single source of truth for products, accents & prices
     4. Cart          — add / qty / remove, live subtotal, badge, localStorage
     5. Interactions  — quantity steppers, accordion, scroll-reveal, form stubs
   No build step, no framework. Linked by every HTML page.
   ============================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------------
     0. Constants & tiny helpers
     ------------------------------------------------------------------------- */
  var STORE = {
    lang: "inryou.lang",
    cart: "inryou.cart"
  };
  var SUPPORTED_LANGS = ["nl", "fr", "en"];
  var DEFAULT_LANG = "nl";

  // Premium-motion module state
  var lenis = null;
  var pointer = { x: 0, y: 0 };
  var sunControllers = [];

  // PLACEHOLDER PRICES ----------------------------------------------------------
  // Real pricing is unknown, so these are obvious placeholders kept in ONE place.
  // The cart maths are fully functional; swap these numbers for real prices and
  // everything (cards, product pages, drawer, cart page) updates automatically.
  var PRICE_PER_CAN = 2.75;   // € — [price per can] placeholder
  var PRICE_PER_PACK = 29.95; // € — [price per pack of 12] placeholder

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) { Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); }); }
    if (html != null) { node.innerHTML = html; }
    return node;
  }

  /* ---------------------------------------------------------------------------
     1. Product catalogue (single source of truth)
        Copy (name/subtitle/blurbs/ingredients) lives in the i18n dictionary,
        keyed by product id, so it stays trilingual.
     ------------------------------------------------------------------------- */
  var PRODUCTS = [
    {
      id: "cranberry",
      accent: "#C8503F",
      accentSoft: "#F3DAD3",
      image: "assets/can-cranberry.png",
      page: "product-cranberry.html",
      price: PRICE_PER_CAN
    },
    {
      id: "ginger-citrus",
      accent: "#E89A3C",
      accentSoft: "#F7E3C8",
      image: "assets/can-ginger-citrus.png",
      page: "product-ginger-citrus.html",
      price: PRICE_PER_CAN
    },
    {
      id: "vanille",
      accent: "#9DAE8C",
      accentSoft: "#E2E7DA",
      image: "assets/can-vanille.png", // not yet supplied → graceful placeholder
      page: "product-vanille.html",
      price: PRICE_PER_CAN
    }
  ];
  function getProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].id === id) { return PRODUCTS[i]; } }
    return null;
  }

  /* ---------------------------------------------------------------------------
     2. i18n dictionary — real, on-brand copy in NL / FR / EN
        Flat keys. Use {n} tokens for interpolation. Lookup falls back to NL,
        then to the raw key so nothing ever renders blank.
     ------------------------------------------------------------------------- */
  var I18N = {
    nl: {
      "meta.langName": "Nederlands",
      "skip": "Naar inhoud",
      "brand.tagline": "natural balance, made effortless",

      "nav.shop": "Shop",
      "nav.story": "Ons verhaal",
      "nav.balance": "Natural Balance",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.menu": "Menu",

      "header.cart": "Winkelmand",
      "header.lang": "Taal kiezen",

      "btn.add": "In winkelmand",
      "btn.added": "Toegevoegd ✓",
      "btn.shop": "Shop",
      "btn.view": "Bekijk smaak",
      "btn.discover": "Ontdek meer",

      "qty.label": "Aantal",
      "qty.decrease": "Eén minder",
      "qty.increase": "Eén meer",
      "price.can": "per blikje",
      "common.remove": "Verwijderen",

      "drawer.title": "Jouw winkelmand",
      "drawer.empty": "Je winkelmand is rustig en leeg.",
      "drawer.emptyCta": "Ontdek de smaken",
      "drawer.subtotal": "Subtotaal",
      "drawer.note": "Verzendkosten worden bij het afrekenen berekend.",
      "drawer.checkout": "Naar betalen",
      "drawer.viewCart": "Volledige winkelmand bekijken",

      "footer.ctaHeading": "Drink je balans.",
      "footer.ctaText": "Drie natuurlijke smaken, functioneel in balans. Vind die van jou.",
      "footer.ctaButton": "Shop INRYOU",
      "footer.newsletter": "Blijf in balans",
      "footer.newsletterText": "Nieuwe smaken, zachte aanbiedingen en rustige updates. Geen ruis.",
      "footer.emailPlaceholder": "Jouw e-mailadres",
      "footer.subscribe": "Inschrijven",
      "footer.subscribed": "Welkom — check je inbox ✓",
      "footer.colShop": "Shop",
      "footer.colBrand": "Merk",
      "footer.colHelp": "Hulp",
      "footer.rights": "© 2026 INRYOU. Alle rechten voorbehouden.",
      "footer.privacy": "Privacy",
      "footer.terms": "Voorwaarden",
      "footer.cookies": "Cookies",
      "footer.madeIn": "Met zorg gemaakt in België.",

      /* Home */
      "home.heroKicker": "Sprankelend · functioneel · natuurlijk",
      "home.heroTitle": "Natuurlijke balans, |moeiteloos.",
      "home.heroText": "INRYOU is een sprankelende drank met functionele ingrediënten — een rustigere keuze dan frisdrank, zonder toegevoegde suikers. Gewoon natuurlijke energie, in evenwicht.",
      "home.heroCta": "Shop de smaken",
      "home.heroLink": "Ontdek Natural Balance",
      "home.scroll": "Scroll",

      "home.flavorsKicker": "Drie smaken",
      "home.flavorsTitle": "Kies jouw |evenwicht.",
      "home.flavorsText": "Elke smaak heeft zijn eigen kleur en karakter — telkens licht, droog en verfrissend.",

      "home.whyKicker": "Waarom INRYOU",
      "home.whyTitle": "Een rustiger soort |verfrissing.",
      "home.whyText": "We hebben alles weggelaten wat niet nodig is, en toegevoegd wat wél telt.",
      "home.why1Title": "Geen toegevoegde suikers",
      "home.why1Text": "Alle smaak, zonder de suikerpiek. [suikergehalte] per blikje.",
      "home.why2Title": "Functioneel in balans",
      "home.why2Text": "Magnesium, inositol en L-theanine voor rustige focus.",
      "home.why3Title": "Natuurlijk & eerlijk",
      "home.why3Text": "Echte ingrediënten, helder label. Niets om te verbergen.",

      "home.balanceKicker": "Natural Balance",
      "home.balanceTitle": "Functioneel, |niet luidruchtig.",
      "home.balanceText": "Drie functionele ingrediënten werken samen voor heldere, rustige energie — zonder de crash. Geen beloftes in hoofdletters, gewoon een drank die met je meedeint.",
      "home.balanceCta": "Hoe het werkt",

      "home.storyKicker": "Ons verhaal",
      "home.storyTitle": "Gemaakt om het |moeiteloos te maken.",
      "home.storyText": "INRYOU ontstond uit een simpele wens: een dagelijkse drank die goed smaakt én goed doet, zonder de ruis. Geboren in België, gemaakt voor de momenten ertussenin.",
      "home.storyCta": "Lees ons verhaal",

      "home.testiKicker": "Geproefd. Geliefd.",
      "home.testiTitle": "Wat mensen |zeggen.",

      "home.newsletterTitle": "Blijf in balans.",
      "home.newsletterText": "Schrijf je in voor nieuwe smaken en rustige updates. Geen ruis, beloofd.",

      /* Shop */
      "shop.kicker": "De collectie",
      "shop.title": "Shop |INRYOU.",
      "shop.text": "Drie sprankelende smaken, elk functioneel in balans. Per blikje van 250 ml.",
      "shop.pack": "Ook per pak van 12 — [prijs per pak].",

      /* Product page */
      "product.functionalTitle": "Functionele balans",
      "product.detailsTitle": "Goed om te weten",
      "product.relatedTitle": "Misschien ook lekker",
      "product.sizeLabel": "Inhoud",
      "product.sizeValue": "250 ml",
      "product.sugarLabel": "Suikers",
      "product.sugarValue": "[suikergehalte]",
      "product.kcalLabel": "Calorieën",
      "product.kcalValue": "[calorieën]",
      "product.caffeineLabel": "Cafeïne",
      "product.caffeineValue": "[cafeïnegehalte]",
      "product.ingredientsTitle": "Ingrediënten",
      "product.servingNote": "Voedingswaarden en exacte hoeveelheden: [voedingswaarde-info].",

      /* Story */
      "story.kicker": "Ons verhaal",
      "story.title": "Balans hoort |moeiteloos te zijn.",
      "story.lead": "INRYOU begon met een ongemakkelijk gevoel in het frisdrankschap: te veel suiker, te veel lawaai, te veel beloftes. We wilden iets rustigers.",
      "story.p1": "We zochten een dagelijkse drank die fris en functioneel is, zonder de suikerpiek of de overdaad aan claims. Iets dat past bij een drukke ochtend én een trage zondag — een drank die met je meebeweegt in plaats van je op te jagen.",
      "story.h2a": "Geboren in België",
      "story.p2": "Vanuit België brachten we sprankelend water, echte fruit- en kruidensmaken en drie functionele ingrediënten samen. Geen toegevoegde suikers, geen lange lijst onuitspreekbare namen — alleen wat ergens voor dient.",
      "story.h2b": "Gemaakt om het moeiteloos te maken",
      "story.p3": "Onze naam zegt het al: het zit ‘in jou’. Balans is niets wat je moet najagen; het is iets wat je een handje helpt. Eén blikje tegelijk, kalm en zonder moeite.",
      "story.quote": "“Geen luide energie. Gewoon evenwicht dat je doorvoelt.”",
      "story.cta": "Ontdek de smaken",

      /* Balance */
      "balance.kicker": "Natural Balance",
      "balance.title": "Functionele |ingrediënten.",
      "balance.lead": "Drie ingrediënten, met een duidelijke reden. Samen geven ze rustige, heldere energie — geen suikerpiek, geen crash.",
      "balance.magTitle": "Magnesium",
      "balance.magText": "Draagt bij tot een normale werking van het zenuwstelsel en het verminderen van vermoeidheid. [mg magnesium] per blikje.",
      "balance.inoTitle": "Inositol",
      "balance.inoText": "Een natuurlijk voorkomende verbinding, vaak gelinkt aan kalmte en mentaal evenwicht. [mg inositol] per blikje.",
      "balance.theaTitle": "L-theanine",
      "balance.theaText": "Een aminozuur uit theeblad, gewaardeerd om rustige, alerte focus. [mg L-theanine] per blikje.",
      "balance.amountsNote": "Exacte hoeveelheden en gezondheidsclaims: [te bevestigen]. Een gevarieerde, evenwichtige voeding en een gezonde levensstijl blijven belangrijk.",
      "balance.compareKicker": "De vergelijking",
      "balance.compareTitle": "INRYOU vs. |gewone frisdrank.",
      "balance.compareText": "Hetzelfde sprankelende gevoel, een rustigere samenstelling.",
      "balance.colFeature": "Kenmerk",
      "balance.colInryou": "INRYOU",
      "balance.colSoda": "Gewone frisdrank",
      "balance.rowSugar": "Toegevoegde suikers",
      "balance.rowSugarIn": "Geen",
      "balance.rowSugarSoda": "Vaak hoog",
      "balance.rowFunc": "Functionele ingrediënten",
      "balance.rowFuncIn": "Magnesium · inositol · L-theanine",
      "balance.rowFuncSoda": "Doorgaans geen",
      "balance.rowSweet": "Kunstmatige zoetstoffen",
      "balance.rowSweetIn": "Geen",
      "balance.rowSweetSoda": "Vaak",
      "balance.rowTaste": "Smaakprofiel",
      "balance.rowTasteIn": "Licht, droog, natuurlijk",
      "balance.rowTasteSoda": "Zoet, vol",
      "balance.rowKcal": "Calorieën",
      "balance.rowKcalIn": "[calorieën]",
      "balance.rowKcalSoda": "Doorgaans hoog",
      "balance.cta": "Shop de smaken",

      /* FAQ */
      "faq.kicker": "FAQ",
      "faq.title": "Veelgestelde |vragen.",
      "faq.text": "Vind je je antwoord niet? We helpen je graag verder.",
      "faq.q1": "Zit er suiker in INRYOU?",
      "faq.a1": "Nee, er zijn geen suikers toegevoegd. Je krijgt volle smaak zonder de suikerpiek. Het exacte suikergehalte van nature is [suikergehalte] per blikje.",
      "faq.q2": "Bevat INRYOU cafeïne?",
      "faq.a2": "Het cafeïnegehalte hangt af van de smaak: [cafeïnegehalte]. De rustige focus komt vooral van L-theanine, niet van een cafeïnestoot.",
      "faq.q3": "Welke functionele ingrediënten gebruiken jullie?",
      "faq.a3": "Elk blikje bevat magnesium, inositol en L-theanine. Meer lees je op de pagina Natural Balance; exacte hoeveelheden zijn [te bevestigen].",
      "faq.q4": "Zijn de ingrediënten natuurlijk?",
      "faq.a4": "Ja. We werken met echte fruit- en kruidensmaken en houden het label kort en helder — geen kunstmatige zoetstoffen.",
      "faq.q5": "Hoeveel calorieën zitten er in een blikje?",
      "faq.a5": "Een blikje van 250 ml bevat [calorieën]. De volledige voedingswaarde vind je binnenkort op elke productpagina.",
      "faq.q6": "Hoe en wanneer wordt mijn bestelling geleverd?",
      "faq.a6": "We verzenden in heel [verzendregio]. Tarieven en levertijden — [verzendinfo] — zie je bij het afrekenen.",
      "faq.q7": "Wat is jullie retourbeleid?",
      "faq.a7": "Niet helemaal je smaak? Neem contact op binnen [retourtermijn] en we zoeken samen een oplossing. Volledige voorwaarden: [retourbeleid].",
      "faq.q8": "Is INRYOU geschikt voor iedereen?",
      "faq.a8": "INRYOU is een verfrissing voor elke dag, geen vervanging voor een evenwichtige voeding. Twijfel je door zwangerschap, medicatie of gevoeligheden? Vraag het je arts.",

      /* Contact */
      "contact.kicker": "Contact",
      "contact.title": "Even |hallo zeggen.",
      "contact.lead": "Vraag, samenwerking of gewoon een groet — we lezen elk bericht.",
      "contact.formName": "Naam",
      "contact.formEmail": "E-mail",
      "contact.formSubject": "Onderwerp",
      "contact.formMessage": "Bericht",
      "contact.send": "Verstuur bericht",
      "contact.success": "Bedankt — we komen snel bij je terug ✓",
      "contact.reachTitle": "Rechtstreeks",
      "contact.emailLabel": "E-mail",
      "contact.socialTitle": "Volg ons",
      "contact.hoursTitle": "We antwoorden",
      "contact.hours": "Doorgaans binnen 1–2 werkdagen.",

      /* Cart page */
      "cart.title": "Jouw |winkelmand.",
      "cart.empty": "Je winkelmand is rustig en leeg.",
      "cart.emptyText": "Tijd om je evenwicht te kiezen.",
      "cart.emptyCta": "Shop de smaken",
      "cart.colItem": "Product",
      "cart.colPrice": "Prijs",
      "cart.colQty": "Aantal",
      "cart.colTotal": "Totaal",
      "cart.subtotal": "Subtotaal",
      "cart.shipping": "Verzending",
      "cart.shippingValue": "Berekend bij afrekenen",
      "cart.total": "Totaal",
      "cart.checkout": "Naar betalen",
      "cart.continue": "Verder winkelen",
      "cart.secure": "Veilig afrekenen — betaling volgt binnenkort."
    },

    fr: {
      "meta.langName": "Français",
      "skip": "Aller au contenu",
      "brand.tagline": "natural balance, made effortless",

      "nav.shop": "Boutique",
      "nav.story": "Notre histoire",
      "nav.balance": "Natural Balance",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.menu": "Menu",

      "header.cart": "Panier",
      "header.lang": "Choisir la langue",

      "btn.add": "Ajouter au panier",
      "btn.added": "Ajouté ✓",
      "btn.shop": "Boutique",
      "btn.view": "Voir la saveur",
      "btn.discover": "En savoir plus",

      "qty.label": "Quantité",
      "qty.decrease": "Un de moins",
      "qty.increase": "Un de plus",
      "price.can": "la canette",
      "common.remove": "Retirer",

      "drawer.title": "Votre panier",
      "drawer.empty": "Votre panier est calme et vide.",
      "drawer.emptyCta": "Découvrir les saveurs",
      "drawer.subtotal": "Sous-total",
      "drawer.note": "Les frais de livraison sont calculés au paiement.",
      "drawer.checkout": "Procéder au paiement",
      "drawer.viewCart": "Voir le panier complet",

      "footer.ctaHeading": "Buvez votre équilibre.",
      "footer.ctaText": "Trois saveurs naturelles, fonctionnelles et équilibrées. Trouvez la vôtre.",
      "footer.ctaButton": "Boutique INRYOU",
      "footer.newsletter": "Restez en équilibre",
      "footer.newsletterText": "Nouvelles saveurs, offres douces et nouvelles tranquilles. Aucun bruit.",
      "footer.emailPlaceholder": "Votre adresse e-mail",
      "footer.subscribe": "S’inscrire",
      "footer.subscribed": "Bienvenue — vérifiez vos e-mails ✓",
      "footer.colShop": "Boutique",
      "footer.colBrand": "Marque",
      "footer.colHelp": "Aide",
      "footer.rights": "© 2026 INRYOU. Tous droits réservés.",
      "footer.privacy": "Confidentialité",
      "footer.terms": "Conditions",
      "footer.cookies": "Cookies",
      "footer.madeIn": "Conçu avec soin en Belgique.",

      "home.heroKicker": "Pétillant · fonctionnel · naturel",
      "home.heroTitle": "L’équilibre naturel, |sans effort.",
      "home.heroText": "INRYOU est une boisson pétillante aux ingrédients fonctionnels — un choix plus apaisé que le soda, sans sucres ajoutés. Juste une énergie naturelle, en équilibre.",
      "home.heroCta": "Voir les saveurs",
      "home.heroLink": "Découvrir Natural Balance",
      "home.scroll": "Défiler",

      "home.flavorsKicker": "Trois saveurs",
      "home.flavorsTitle": "Choisissez votre |équilibre.",
      "home.flavorsText": "Chaque saveur a sa couleur et son caractère — toujours légère, sèche et rafraîchissante.",

      "home.whyKicker": "Pourquoi INRYOU",
      "home.whyTitle": "Une fraîcheur |plus apaisée.",
      "home.whyText": "Nous avons retiré le superflu et gardé l’essentiel.",
      "home.why1Title": "Sans sucres ajoutés",
      "home.why1Text": "Toute la saveur, sans le pic de sucre. [teneur en sucre] par canette.",
      "home.why2Title": "Équilibre fonctionnel",
      "home.why2Text": "Magnésium, inositol et L-théanine pour une concentration apaisée.",
      "home.why3Title": "Naturel & honnête",
      "home.why3Text": "De vrais ingrédients, une étiquette claire. Rien à cacher.",

      "home.balanceKicker": "Natural Balance",
      "home.balanceTitle": "Fonctionnel, |pas bruyant.",
      "home.balanceText": "Trois ingrédients fonctionnels travaillent ensemble pour une énergie claire et apaisée — sans la chute. Pas de promesses en majuscules, juste une boisson qui suit votre rythme.",
      "home.balanceCta": "Comment ça marche",

      "home.storyKicker": "Notre histoire",
      "home.storyTitle": "Pensé pour vous |simplifier l’équilibre.",
      "home.storyText": "INRYOU est né d’une envie simple : une boisson du quotidien qui a bon goût et fait du bien, sans le bruit. Née en Belgique, faite pour les moments entre deux.",
      "home.storyCta": "Lire notre histoire",

      "home.testiKicker": "Goûté. Adopté.",
      "home.testiTitle": "Ce qu’on en |dit.",

      "home.newsletterTitle": "Restez en équilibre.",
      "home.newsletterText": "Inscrivez-vous pour les nouvelles saveurs et des nouvelles tranquilles. Aucun bruit, promis.",

      "shop.kicker": "La collection",
      "shop.title": "Boutique |INRYOU.",
      "shop.text": "Trois saveurs pétillantes, chacune équilibrée et fonctionnelle. Canette de 250 ml.",
      "shop.pack": "Aussi par pack de 12 — [prix par pack].",

      "product.functionalTitle": "Équilibre fonctionnel",
      "product.detailsTitle": "Bon à savoir",
      "product.relatedTitle": "Vous aimerez peut-être",
      "product.sizeLabel": "Contenance",
      "product.sizeValue": "250 ml",
      "product.sugarLabel": "Sucres",
      "product.sugarValue": "[teneur en sucre]",
      "product.kcalLabel": "Calories",
      "product.kcalValue": "[calories]",
      "product.caffeineLabel": "Caféine",
      "product.caffeineValue": "[teneur en caféine]",
      "product.ingredientsTitle": "Ingrédients",
      "product.servingNote": "Valeurs nutritionnelles et quantités exactes : [infos nutritionnelles].",

      "story.kicker": "Notre histoire",
      "story.title": "L’équilibre devrait être |sans effort.",
      "story.lead": "INRYOU est né d’un malaise dans le rayon des sodas : trop de sucre, trop de bruit, trop de promesses. Nous voulions plus apaisé.",
      "story.p1": "Nous cherchions une boisson du quotidien, fraîche et fonctionnelle, sans le pic de sucre ni le déluge d’allégations. Quelque chose pour un matin pressé comme pour un dimanche lent — une boisson qui suit votre rythme au lieu de l’accélérer.",
      "story.h2a": "Née en Belgique",
      "story.p2": "Depuis la Belgique, nous avons réuni de l’eau pétillante, de vraies saveurs de fruits et de plantes, et trois ingrédients fonctionnels. Aucun sucre ajouté, pas de longue liste imprononçable — seulement l’utile.",
      "story.h2b": "Pensé pour simplifier",
      "story.p3": "Notre nom le dit : c’est « en vous ». L’équilibre n’est pas une course ; c’est quelque chose que l’on accompagne. Une canette à la fois, calmement et sans effort.",
      "story.quote": "« Pas d’énergie bruyante. Juste un équilibre que l’on ressent. »",
      "story.cta": "Découvrir les saveurs",

      "balance.kicker": "Natural Balance",
      "balance.title": "Ingrédients |fonctionnels.",
      "balance.lead": "Trois ingrédients, chacun avec une raison claire. Ensemble, ils offrent une énergie apaisée et nette — sans pic de sucre, sans chute.",
      "balance.magTitle": "Magnésium",
      "balance.magText": "Contribue au fonctionnement normal du système nerveux et à réduire la fatigue. [mg de magnésium] par canette.",
      "balance.inoTitle": "Inositol",
      "balance.inoText": "Un composé naturel, souvent associé au calme et à l’équilibre mental. [mg d’inositol] par canette.",
      "balance.theaTitle": "L-théanine",
      "balance.theaText": "Un acide aminé issu du thé, apprécié pour une concentration calme et alerte. [mg de L-théanine] par canette.",
      "balance.amountsNote": "Quantités exactes et allégations de santé : [à confirmer]. Une alimentation variée et équilibrée et un mode de vie sain restent essentiels.",
      "balance.compareKicker": "La comparaison",
      "balance.compareTitle": "INRYOU vs. |soda classique.",
      "balance.compareText": "La même sensation pétillante, une composition plus apaisée.",
      "balance.colFeature": "Critère",
      "balance.colInryou": "INRYOU",
      "balance.colSoda": "Soda classique",
      "balance.rowSugar": "Sucres ajoutés",
      "balance.rowSugarIn": "Aucun",
      "balance.rowSugarSoda": "Souvent élevés",
      "balance.rowFunc": "Ingrédients fonctionnels",
      "balance.rowFuncIn": "Magnésium · inositol · L-théanine",
      "balance.rowFuncSoda": "Généralement aucun",
      "balance.rowSweet": "Édulcorants artificiels",
      "balance.rowSweetIn": "Aucun",
      "balance.rowSweetSoda": "Souvent",
      "balance.rowTaste": "Profil de goût",
      "balance.rowTasteIn": "Léger, sec, naturel",
      "balance.rowTasteSoda": "Sucré, intense",
      "balance.rowKcal": "Calories",
      "balance.rowKcalIn": "[calories]",
      "balance.rowKcalSoda": "Généralement élevées",
      "balance.cta": "Voir les saveurs",

      "faq.kicker": "FAQ",
      "faq.title": "Questions |fréquentes.",
      "faq.text": "Vous ne trouvez pas votre réponse ? Nous sommes là pour aider.",
      "faq.q1": "INRYOU contient-il du sucre ?",
      "faq.a1": "Non, aucun sucre ajouté. Toute la saveur, sans le pic de sucre. La teneur naturelle est de [teneur en sucre] par canette.",
      "faq.q2": "INRYOU contient-il de la caféine ?",
      "faq.a2": "La teneur dépend de la saveur : [teneur en caféine]. La concentration apaisée vient surtout de la L-théanine, pas d’un coup de caféine.",
      "faq.q3": "Quels ingrédients fonctionnels utilisez-vous ?",
      "faq.a3": "Chaque canette contient du magnésium, de l’inositol et de la L-théanine. Plus de détails sur la page Natural Balance ; quantités exactes [à confirmer].",
      "faq.q4": "Les ingrédients sont-ils naturels ?",
      "faq.a4": "Oui. De vraies saveurs de fruits et de plantes, une étiquette courte et claire — sans édulcorants artificiels.",
      "faq.q5": "Combien de calories dans une canette ?",
      "faq.a5": "Une canette de 250 ml contient [calories]. Les valeurs complètes arrivent bientôt sur chaque page produit.",
      "faq.q6": "Comment et quand ma commande est-elle livrée ?",
      "faq.a6": "Nous livrons dans toute la [zone de livraison]. Tarifs et délais — [infos de livraison] — au moment du paiement.",
      "faq.q7": "Quelle est votre politique de retour ?",
      "faq.a7": "Pas tout à fait votre goût ? Contactez-nous sous [délai de retour] et nous trouverons une solution. Conditions complètes : [politique de retour].",
      "faq.q8": "INRYOU convient-il à tout le monde ?",
      "faq.a8": "INRYOU est un rafraîchissement du quotidien, pas un substitut à une alimentation équilibrée. En cas de grossesse, de traitement ou de sensibilités, demandez conseil à votre médecin.",

      "contact.kicker": "Contact",
      "contact.title": "Dites-nous |bonjour.",
      "contact.lead": "Une question, un partenariat ou simplement un coucou — nous lisons tout.",
      "contact.formName": "Nom",
      "contact.formEmail": "E-mail",
      "contact.formSubject": "Sujet",
      "contact.formMessage": "Message",
      "contact.send": "Envoyer le message",
      "contact.success": "Merci — nous revenons vers vous très vite ✓",
      "contact.reachTitle": "Directement",
      "contact.emailLabel": "E-mail",
      "contact.socialTitle": "Suivez-nous",
      "contact.hoursTitle": "Nous répondons",
      "contact.hours": "En général sous 1 à 2 jours ouvrés.",

      "cart.title": "Votre |panier.",
      "cart.empty": "Votre panier est calme et vide.",
      "cart.emptyText": "Il est temps de choisir votre équilibre.",
      "cart.emptyCta": "Voir les saveurs",
      "cart.colItem": "Produit",
      "cart.colPrice": "Prix",
      "cart.colQty": "Quantité",
      "cart.colTotal": "Total",
      "cart.subtotal": "Sous-total",
      "cart.shipping": "Livraison",
      "cart.shippingValue": "Calculée au paiement",
      "cart.total": "Total",
      "cart.checkout": "Procéder au paiement",
      "cart.continue": "Continuer mes achats",
      "cart.secure": "Paiement sécurisé — bientôt disponible."
    },

    en: {
      "meta.langName": "English",
      "skip": "Skip to content",
      "brand.tagline": "natural balance, made effortless",

      "nav.shop": "Shop",
      "nav.story": "Our story",
      "nav.balance": "Natural Balance",
      "nav.faq": "FAQ",
      "nav.contact": "Contact",
      "nav.menu": "Menu",

      "header.cart": "Cart",
      "header.lang": "Choose language",

      "btn.add": "Add to cart",
      "btn.added": "Added ✓",
      "btn.shop": "Shop",
      "btn.view": "View flavour",
      "btn.discover": "Discover more",

      "qty.label": "Quantity",
      "qty.decrease": "One less",
      "qty.increase": "One more",
      "price.can": "per can",
      "common.remove": "Remove",

      "drawer.title": "Your cart",
      "drawer.empty": "Your cart is calm and empty.",
      "drawer.emptyCta": "Discover the flavours",
      "drawer.subtotal": "Subtotal",
      "drawer.note": "Shipping is calculated at checkout.",
      "drawer.checkout": "Proceed to payment",
      "drawer.viewCart": "View full cart",

      "footer.ctaHeading": "Drink your balance.",
      "footer.ctaText": "Three natural flavours, functionally balanced. Find yours.",
      "footer.ctaButton": "Shop INRYOU",
      "footer.newsletter": "Stay in balance",
      "footer.newsletterText": "New flavours, gentle offers and quiet updates. No noise.",
      "footer.emailPlaceholder": "Your email address",
      "footer.subscribe": "Subscribe",
      "footer.subscribed": "Welcome — check your inbox ✓",
      "footer.colShop": "Shop",
      "footer.colBrand": "Brand",
      "footer.colHelp": "Help",
      "footer.rights": "© 2026 INRYOU. All rights reserved.",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
      "footer.cookies": "Cookies",
      "footer.madeIn": "Made with care in Belgium.",

      "home.heroKicker": "Sparkling · functional · natural",
      "home.heroTitle": "Natural balance, |made effortless.",
      "home.heroText": "INRYOU is a sparkling drink with functional ingredients — a calmer choice than soda, with no added sugars. Just natural energy, in balance.",
      "home.heroCta": "Shop the flavours",
      "home.heroLink": "Discover Natural Balance",
      "home.scroll": "Scroll",

      "home.flavorsKicker": "Three flavours",
      "home.flavorsTitle": "Choose your |balance.",
      "home.flavorsText": "Each flavour has its own colour and character — always light, dry and refreshing.",

      "home.whyKicker": "Why INRYOU",
      "home.whyTitle": "A calmer kind of |refreshment.",
      "home.whyText": "We left out everything you don’t need, and added what actually counts.",
      "home.why1Title": "No added sugars",
      "home.why1Text": "All the flavour, none of the sugar spike. [sugar content] per can.",
      "home.why2Title": "Functionally balanced",
      "home.why2Text": "Magnesium, inositol and L-theanine for calm focus.",
      "home.why3Title": "Natural & honest",
      "home.why3Text": "Real ingredients, a clear label. Nothing to hide.",

      "home.balanceKicker": "Natural Balance",
      "home.balanceTitle": "Functional, |not loud.",
      "home.balanceText": "Three functional ingredients work together for clear, calm energy — without the crash. No promises in capital letters, just a drink that moves at your pace.",
      "home.balanceCta": "How it works",

      "home.storyKicker": "Our story",
      "home.storyTitle": "Made to keep balance |effortless.",
      "home.storyText": "INRYOU started with a simple wish: an everyday drink that tastes good and does good, without the noise. Born in Belgium, made for the moments in between.",
      "home.storyCta": "Read our story",

      "home.testiKicker": "Tasted. Loved.",
      "home.testiTitle": "What people |say.",

      "home.newsletterTitle": "Stay in balance.",
      "home.newsletterText": "Sign up for new flavours and quiet updates. No noise, promise.",

      "shop.kicker": "The collection",
      "shop.title": "Shop |INRYOU.",
      "shop.text": "Three sparkling flavours, each functionally balanced. 250 ml per can.",
      "shop.pack": "Also by the pack of 12 — [price per pack].",

      "product.functionalTitle": "Functional balance",
      "product.detailsTitle": "Good to know",
      "product.relatedTitle": "You might also like",
      "product.sizeLabel": "Size",
      "product.sizeValue": "250 ml",
      "product.sugarLabel": "Sugars",
      "product.sugarValue": "[sugar content]",
      "product.kcalLabel": "Calories",
      "product.kcalValue": "[calories]",
      "product.caffeineLabel": "Caffeine",
      "product.caffeineValue": "[caffeine content]",
      "product.ingredientsTitle": "Ingredients",
      "product.servingNote": "Nutritional values and exact amounts: [nutrition info].",

      "story.kicker": "Our story",
      "story.title": "Balance should be |effortless.",
      "story.lead": "INRYOU began with an uneasy feeling in the soda aisle: too much sugar, too much noise, too many promises. We wanted something calmer.",
      "story.p1": "We were after an everyday drink that’s fresh and functional, without the sugar spike or the flood of claims. Something that fits a busy morning and a slow Sunday alike — a drink that moves with you instead of speeding you up.",
      "story.h2a": "Born in Belgium",
      "story.p2": "From Belgium, we brought together sparkling water, real fruit and botanical flavours, and three functional ingredients. No added sugars, no long list of unpronounceable names — only what serves a purpose.",
      "story.h2b": "Made to keep it effortless",
      "story.p3": "Our name says it: it’s ‘in you’. Balance isn’t something to chase; it’s something to support. One can at a time, calmly and without effort.",
      "story.quote": "“No loud energy. Just balance you can feel.”",
      "story.cta": "Discover the flavours",

      "balance.kicker": "Natural Balance",
      "balance.title": "Functional |ingredients.",
      "balance.lead": "Three ingredients, each with a clear reason. Together they give calm, clear energy — no sugar spike, no crash.",
      "balance.magTitle": "Magnesium",
      "balance.magText": "Contributes to the normal function of the nervous system and to reducing tiredness. [mg magnesium] per can.",
      "balance.inoTitle": "Inositol",
      "balance.inoText": "A naturally occurring compound, often linked to calm and mental balance. [mg inositol] per can.",
      "balance.theaTitle": "L-theanine",
      "balance.theaText": "An amino acid from tea leaves, valued for calm, alert focus. [mg L-theanine] per can.",
      "balance.amountsNote": "Exact amounts and health claims: [to be confirmed]. A varied, balanced diet and a healthy lifestyle still matter.",
      "balance.compareKicker": "The comparison",
      "balance.compareTitle": "INRYOU vs. |ordinary soda.",
      "balance.compareText": "The same sparkling feeling, a calmer make-up.",
      "balance.colFeature": "Feature",
      "balance.colInryou": "INRYOU",
      "balance.colSoda": "Ordinary soda",
      "balance.rowSugar": "Added sugars",
      "balance.rowSugarIn": "None",
      "balance.rowSugarSoda": "Often high",
      "balance.rowFunc": "Functional ingredients",
      "balance.rowFuncIn": "Magnesium · inositol · L-theanine",
      "balance.rowFuncSoda": "Usually none",
      "balance.rowSweet": "Artificial sweeteners",
      "balance.rowSweetIn": "None",
      "balance.rowSweetSoda": "Often",
      "balance.rowTaste": "Taste profile",
      "balance.rowTasteIn": "Light, dry, natural",
      "balance.rowTasteSoda": "Sweet, heavy",
      "balance.rowKcal": "Calories",
      "balance.rowKcalIn": "[calories]",
      "balance.rowKcalSoda": "Usually high",
      "balance.cta": "Shop the flavours",

      "faq.kicker": "FAQ",
      "faq.title": "Frequently asked |questions.",
      "faq.text": "Can’t find your answer? We’re happy to help.",
      "faq.q1": "Does INRYOU contain sugar?",
      "faq.a1": "No, there are no added sugars. You get full flavour without the sugar spike. The natural sugar content is [sugar content] per can.",
      "faq.q2": "Does INRYOU contain caffeine?",
      "faq.a2": "Caffeine depends on the flavour: [caffeine content]. The calm focus comes mostly from L-theanine, not a caffeine hit.",
      "faq.q3": "Which functional ingredients do you use?",
      "faq.a3": "Every can contains magnesium, inositol and L-theanine. Read more on the Natural Balance page; exact amounts are [to be confirmed].",
      "faq.q4": "Are the ingredients natural?",
      "faq.a4": "Yes. We use real fruit and botanical flavours and keep the label short and clear — no artificial sweeteners.",
      "faq.q5": "How many calories are in a can?",
      "faq.a5": "A 250 ml can contains [calories]. Full nutritional values are coming soon to every product page.",
      "faq.q6": "How and when is my order delivered?",
      "faq.a6": "We ship across [shipping region]. Rates and delivery times — [shipping info] — appear at checkout.",
      "faq.q7": "What’s your return policy?",
      "faq.a7": "Not quite your taste? Get in touch within [return window] and we’ll find a solution. Full terms: [return policy].",
      "faq.q8": "Is INRYOU suitable for everyone?",
      "faq.a8": "INRYOU is an everyday refreshment, not a replacement for a balanced diet. If you’re pregnant, on medication or have sensitivities, check with your doctor.",

      "contact.kicker": "Contact",
      "contact.title": "Say |hello.",
      "contact.lead": "A question, a partnership, or just a hello — we read every message.",
      "contact.formName": "Name",
      "contact.formEmail": "Email",
      "contact.formSubject": "Subject",
      "contact.formMessage": "Message",
      "contact.send": "Send message",
      "contact.success": "Thanks — we’ll get back to you soon ✓",
      "contact.reachTitle": "Directly",
      "contact.emailLabel": "Email",
      "contact.socialTitle": "Follow us",
      "contact.hoursTitle": "We reply",
      "contact.hours": "Usually within 1–2 business days.",

      "cart.title": "Your |cart.",
      "cart.empty": "Your cart is calm and empty.",
      "cart.emptyText": "Time to choose your balance.",
      "cart.emptyCta": "Shop the flavours",
      "cart.colItem": "Product",
      "cart.colPrice": "Price",
      "cart.colQty": "Quantity",
      "cart.colTotal": "Total",
      "cart.subtotal": "Subtotal",
      "cart.shipping": "Shipping",
      "cart.shippingValue": "Calculated at checkout",
      "cart.total": "Total",
      "cart.checkout": "Proceed to payment",
      "cart.continue": "Continue shopping",
      "cart.secure": "Secure checkout — payment coming soon."
    }
  };

  /* Per-product copy, also trilingual. Kept separate for readability. */
  var PRODUCT_COPY = {
    nl: {
      "cranberry.name": "Cranberry",
      "cranberry.local": "Veenbes · Canneberge",
      "cranberry.tagline": "Helder, fris en licht tannisch.",
      "cranberry.short": "Knapperige veenbes met een droge, verfrissende afdronk.",
      "cranberry.long": "Rijpe veenbes ontmoet sprankelend water voor een heldere, lichtzure slok die droog en verfrissend afdronkt. Geen suikerzoetheid — alleen echte fruitsmaak, in balans gebracht met magnesium, inositol en L-theanine.",
      "ginger-citrus.name": "Ginger & Citrus",
      "ginger-citrus.local": "Gember & Citrus · Gingembre & Agrumes",
      "ginger-citrus.tagline": "Warme gember, heldere citrus.",
      "ginger-citrus.short": "Pittige gember en frisse citrus voor een wakkere, warme twist.",
      "ginger-citrus.long": "Een warme gloed van gember tilt heldere citrus op tot iets verkwikkends en levendigs. Pittig maar nooit scherp, met dezelfde functionele balans van magnesium, inositol en L-theanine in elke slok.",
      "vanille.name": "Kweepeer & Vanille",
      "vanille.local": "Quince & Vanilla · Coing & Vanille",
      "vanille.tagline": "Zacht, rond en subtiel zoet van nature.",
      "vanille.short": "Geurige kweepeer en zachte vanille — kalm en rond.",
      "vanille.long": "Geurige kweepeer ontmoet een vleugje vanille voor de zachtste smaak in het assortiment — rond, sereen en subtiel van nature zoet. Dezelfde functionele balans, in een rustigere toon."
    },
    fr: {
      "cranberry.name": "Canneberge",
      "cranberry.local": "Cranberry · Veenbes",
      "cranberry.tagline": "Net, frais et légèrement tannique.",
      "cranberry.short": "Canneberge croquante à la finale sèche et rafraîchissante.",
      "cranberry.long": "La canneberge mûre rencontre l’eau pétillante pour une gorgée nette et légèrement acidulée, à la finale sèche et rafraîchissante. Aucune douceur sucrée — juste un vrai goût de fruit, équilibré par le magnésium, l’inositol et la L-théanine.",
      "ginger-citrus.name": "Gingembre & Agrumes",
      "ginger-citrus.local": "Ginger & Citrus · Gember & Citrus",
      "ginger-citrus.tagline": "Gingembre chaud, agrumes nets.",
      "ginger-citrus.short": "Gingembre relevé et agrumes frais pour une touche réveillante.",
      "ginger-citrus.long": "Une chaleur de gingembre rehausse des agrumes nets vers quelque chose de revigorant et vivant. Relevé sans jamais être piquant, avec le même équilibre fonctionnel de magnésium, d’inositol et de L-théanine à chaque gorgée.",
      "vanille.name": "Coing & Vanille",
      "vanille.local": "Quince & Vanilla · Kweepeer & Vanille",
      "vanille.tagline": "Doux, rond et subtilement sucré par nature.",
      "vanille.short": "Coing parfumé et vanille douce — calme et rond.",
      "vanille.long": "Le coing parfumé rencontre un soupçon de vanille pour la saveur la plus douce de la gamme — ronde, sereine et subtilement sucrée par nature. Le même équilibre fonctionnel, dans une tonalité plus apaisée."
    },
    en: {
      "cranberry.name": "Cranberry",
      "cranberry.local": "Veenbes · Canneberge",
      "cranberry.tagline": "Crisp, fresh and lightly tart.",
      "cranberry.short": "Crisp cranberry with a dry, refreshing finish.",
      "cranberry.long": "Ripe cranberry meets sparkling water for a crisp, lightly tart sip that finishes dry and refreshing. No sugary sweetness — just real fruit flavour, balanced with magnesium, inositol and L-theanine.",
      "ginger-citrus.name": "Ginger & Citrus",
      "ginger-citrus.local": "Gember & Citrus · Gingembre & Agrumes",
      "ginger-citrus.tagline": "Warm ginger, bright citrus.",
      "ginger-citrus.short": "Zingy ginger and fresh citrus for a warm, waking twist.",
      "ginger-citrus.long": "A warm glow of ginger lifts bright citrus into something invigorating and alive. Zingy but never sharp, with the same functional balance of magnesium, inositol and L-theanine in every sip.",
      "vanille.name": "Quince & Vanilla",
      "vanille.local": "Kweepeer & Vanille · Coing & Vanille",
      "vanille.tagline": "Soft, round and subtly, naturally sweet.",
      "vanille.short": "Fragrant quince and soft vanilla — calm and round.",
      "vanille.long": "Fragrant quince meets a whisper of vanilla for the softest flavour in the range — round, serene and subtly, naturally sweet. The same functional balance, in a calmer key."
    }
  };

  /* Testimonials — placeholder quotes, realistic Belgian names. */
  var TESTIMONIALS = {
    nl: [
      { quote: "Eindelijk een blikje dat fris smaakt zonder suikerbom. Cranberry is mijn vaste keuze geworden.", name: "Lotte D.", place: "Gent", stars: 5 },
      { quote: "Die rustige focus is echt. Ik drink het ’s middags in plaats van koffie.", name: "Naïm B.", place: "Antwerpen", stars: 5 },
      { quote: "Ginger & Citrus heeft precies genoeg pit. Smaakt duur, op de goede manier.", name: "Camille V.", place: "Brussel", stars: 5 },
      { quote: "Eindelijk een merk dat niet schreeuwt. Mooi, eerlijk en gewoon lekker.", name: "Joris M.", place: "Leuven", stars: 4 }
    ],
    fr: [
      { quote: "Enfin une canette fraîche sans bombe de sucre. La canneberge est devenue mon choix par défaut.", name: "Lotte D.", place: "Gand", stars: 5 },
      { quote: "Cette concentration apaisée est bien réelle. Je la bois l’après-midi à la place du café.", name: "Naïm B.", place: "Anvers", stars: 5 },
      { quote: "Gingembre & Agrumes a juste ce qu’il faut de peps. Ça a un goût raffiné, dans le bon sens.", name: "Camille V.", place: "Bruxelles", stars: 5 },
      { quote: "Enfin une marque qui ne crie pas. Belle, honnête et tout simplement bonne.", name: "Joris M.", place: "Louvain", stars: 4 }
    ],
    en: [
      { quote: "Finally a can that tastes fresh without the sugar bomb. Cranberry has become my default.", name: "Lotte D.", place: "Ghent", stars: 5 },
      { quote: "That calm focus is real. I drink it in the afternoon instead of coffee.", name: "Naïm B.", place: "Antwerp", stars: 5 },
      { quote: "Ginger & Citrus has just enough kick. Tastes premium, in the best way.", name: "Camille V.", place: "Brussels", stars: 5 },
      { quote: "At last, a brand that doesn’t shout. Beautiful, honest and simply tasty.", name: "Joris M.", place: "Leuven", stars: 4 }
    ]
  };

  /* ---------------------------------------------------------------------------
     3. Language state + translation lookup
     ------------------------------------------------------------------------- */
  function getLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORE.lang); } catch (e) {}
    return SUPPORTED_LANGS.indexOf(saved) > -1 ? saved : DEFAULT_LANG;
  }
  function setLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) { return; }
    try { localStorage.setItem(STORE.lang, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    applyI18n();
    renderDynamic();      // re-render JS-built sections (cards, drawer, cart)
    syncLangButtons();
  }
  // t() — translate a key in the current language, with graceful fallback.
  function t(key) {
    var lang = getLang();
    var dicts = [I18N[lang], PRODUCT_COPY[lang], I18N.nl, PRODUCT_COPY.nl];
    for (var i = 0; i < dicts.length; i++) {
      if (dicts[i] && Object.prototype.hasOwnProperty.call(dicts[i], key)) { return dicts[i][key]; }
    }
    return key;
  }

  /* Apply translations to any element carrying a data-i18n* attribute.
     - data-i18n           → textContent
     - data-i18n-html      → innerHTML (used for headings with a |highlight| split)
     - data-i18n-attr="placeholder:key, aria-label:key" → attributes
     Headings: a "|" in the value splits into normal + <em class="hl"> emphasis. */
  function emphasize(text) {
    var parts = String(text).split("|");
    if (parts.length === 1) { return escapeHtml(parts[0]); }
    return escapeHtml(parts[0]) + '<em class="hl">' + escapeHtml(parts.slice(1).join("|")) + "</em>";
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function applyI18n(root) {
    root = root || document;
    $all("[data-i18n]", root).forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    $all("[data-i18n-html]", root).forEach(function (node) {
      node.innerHTML = emphasize(t(node.getAttribute("data-i18n-html")));
    });
    $all("[data-i18n-attr]", root).forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length === 2) { node.setAttribute(bits[0].trim(), t(bits[1].trim())); }
      });
    });
  }

  /* ---------------------------------------------------------------------------
     4. Reusable markup helpers
     ------------------------------------------------------------------------- */
  // The signature sun-and-grain motif. Pure CSS draws the disc + dissolving
  // grain; we only pass the flavour accent. aria-hidden — it's decorative.
  function sun(accent, extraClass) {
    return '<span class="sun ' + (extraClass || "") + '" style="--accent:' + accent + '" aria-hidden="true"></span>';
  }

  // Inline brand wordmark (kept as text so it scales crisply + stays accessible).
  function wordmark() {
    return '<span class="wordmark">INRYOU<span class="wordmark__smile" aria-hidden="true"></span></span>';
  }

  function formatPrice(amount) {
    var lang = getLang();
    var locale = lang === "fr" ? "fr-BE" : (lang === "en" ? "en-IE" : "nl-BE");
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(amount);
    } catch (e) {
      return "€ " + amount.toFixed(2);
    }
  }

  // A quantity stepper (−  n  +). data-qty marks the group; the value lives on
  // the input so add-to-cart buttons can read the nearest one.
  function stepper(value) {
    value = value || 1;
    return '' +
      '<div class="stepper" data-qty>' +
        '<button type="button" class="stepper__btn" data-step="-1" data-i18n-attr="aria-label:qty.decrease">−</button>' +
        '<input class="stepper__input" type="text" inputmode="numeric" value="' + value + '" data-qty-input ' +
               'data-i18n-attr="aria-label:qty.label" />' +
        '<button type="button" class="stepper__btn" data-step="1" data-i18n-attr="aria-label:qty.increase">+</button>' +
      '</div>';
  }

  // Five-star rating (filled vs empty), decorative + a screen-reader label.
  function stars(n) {
    var out = '<span class="stars" role="img" aria-label="' + n + '/5">';
    for (var i = 1; i <= 5; i++) {
      out += '<span class="star ' + (i <= n ? "is-on" : "") + '" aria-hidden="true">★</span>';
    }
    return out + "</span>";
  }

  /* ---------------------------------------------------------------------------
     5. Header / footer / drawer injection (identical on every page)
     ------------------------------------------------------------------------- */
  var NAV_LINKS = [
    { href: "shop.html", key: "nav.shop" },
    { href: "balance.html", key: "nav.balance" },
    { href: "story.html", key: "nav.story" },
    { href: "faq.html", key: "nav.faq" },
    { href: "contact.html", key: "nav.contact" }
  ];

  function langSwitchMarkup(context) {
    var btns = SUPPORTED_LANGS.map(function (l) {
      return '<button type="button" class="lang-switch__btn" data-lang="' + l + '">' + l.toUpperCase() + "</button>";
    }).join("");
    return '<div class="lang-switch" role="group" data-i18n-attr="aria-label:header.lang" data-lang-switch="' +
      context + '">' + btns + "</div>";
  }

  function cartIcon() {
    return '' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/>' +
      '<circle cx="9.5" cy="20" r="1.3"/><circle cx="17.5" cy="20" r="1.3"/></svg>';
  }

  function buildHeader() {
    var current = document.body.getAttribute("data-page") || "";
    var navHtml = NAV_LINKS.map(function (link) {
      var active = link.href === current ? ' aria-current="page"' : "";
      return '<a class="nav__link" href="' + link.href + '"' + active + ' data-i18n="' + link.key + '"></a>';
    }).join("");

    var header = el("header", { "class": "site-header", "data-header": "" });
    header.innerHTML = '' +
      '<a class="skip-link" href="#main" data-i18n="skip"></a>' +
      '<div class="site-header__bar">' +
        '<div class="container site-header__inner">' +
          '<a class="brand" href="index.html" aria-label="INRYOU">' + wordmark() + "</a>" +
          '<nav class="nav" aria-label="Primary" data-nav>' + navHtml + "</nav>" +
          '<div class="site-header__actions">' +
            langSwitchMarkup("header") +
            '<button type="button" class="icon-btn cart-btn" data-open-cart data-i18n-attr="aria-label:header.cart">' +
              cartIcon() +
              '<span class="cart-count" data-cart-count aria-hidden="true">0</span>' +
            "</button>" +
            '<button type="button" class="icon-btn nav-toggle" data-nav-toggle aria-expanded="false" ' +
              'data-i18n-attr="aria-label:nav.menu">' +
              '<span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span></span>' +
            "</button>" +
          "</div>" +
        "</div>" +
      "</div>";
    return header;
  }

  function socialLinks() {
    // Decorative placeholder social links (href="#" until accounts exist).
    var ig = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
    var ti = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 4c.6 2.5 2.2 4.1 4.7 4.4v3.1c-1.7.1-3.3-.4-4.7-1.3v5.9a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.2a2.5 2.5 0 1 0 1.8 2.4V4z"/></svg>';
    var ln = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"/></svg>';
    return '' +
      '<a class="social" href="#" aria-label="Instagram">' + ig + "</a>" +
      '<a class="social" href="#" aria-label="TikTok">' + ti + "</a>" +
      '<a class="social" href="#" aria-label="LinkedIn">' + ln + "</a>";
  }

  function buildFooter() {
    var footer = el("footer", { "class": "site-footer", "data-footer": "" });
    var marqueeWords = ["Natural balance", "Made effortless", "No added sugar", "Sparkling", "Functional", "Made in Belgium"];
    var marqueeItems = "";
    for (var mi = 0; mi < 2; mi++) {
      marqueeWords.forEach(function (w) { marqueeItems += '<span class="marquee__item">' + w + "</span>"; });
    }
    footer.innerHTML = '' +
      '<div class="marquee" aria-hidden="true"><div class="marquee__track">' + marqueeItems + "</div></div>" +
      '<div class="footer-cta" data-theme="dark">' +
        '<div class="container footer-cta__inner">' +
          sun("#E89A3C", "sun--footer") +
          '<h2 class="footer-cta__heading" data-i18n="footer.ctaHeading"></h2>' +
          '<p class="footer-cta__text" data-i18n="footer.ctaText"></p>' +
          '<a class="btn btn--dark" href="shop.html" data-i18n="footer.ctaButton"></a>' +
        "</div>" +
      "</div>" +
      '<div class="site-footer__main">' +
        '<div class="container footer-grid">' +
          '<div class="footer-brand">' +
            '<a class="brand brand--footer" href="index.html" aria-label="INRYOU">' + wordmark() + "</a>" +
            '<p class="footer-brand__tag" data-i18n="brand.tagline"></p>' +
            '<form class="footer-news" data-newsletter novalidate>' +
              '<label class="footer-news__label" data-i18n="footer.newsletter"></label>' +
              '<div class="footer-news__row">' +
                '<input type="email" required class="footer-news__input" ' +
                  'data-i18n-attr="placeholder:footer.emailPlaceholder, aria-label:footer.emailPlaceholder" />' +
                '<button type="submit" class="btn btn--small" data-i18n="footer.subscribe"></button>' +
              "</div>" +
              '<p class="footer-news__msg" data-news-msg role="status" aria-live="polite"></p>' +
            "</form>" +
          "</div>" +
          '<nav class="footer-col" aria-label="Shop">' +
            '<h3 class="footer-col__title" data-i18n="footer.colShop"></h3>' +
            '<a href="product-cranberry.html" data-i18n="cranberry.name"></a>' +
            '<a href="product-ginger-citrus.html" data-i18n="ginger-citrus.name"></a>' +
            '<a href="product-vanille.html" data-i18n="vanille.name"></a>' +
            '<a href="shop.html" data-i18n="nav.shop"></a>' +
          "</nav>" +
          '<nav class="footer-col" aria-label="Brand">' +
            '<h3 class="footer-col__title" data-i18n="footer.colBrand"></h3>' +
            '<a href="story.html" data-i18n="nav.story"></a>' +
            '<a href="balance.html" data-i18n="nav.balance"></a>' +
            '<a href="faq.html" data-i18n="nav.faq"></a>' +
          "</nav>" +
          '<nav class="footer-col" aria-label="Help">' +
            '<h3 class="footer-col__title" data-i18n="footer.colHelp"></h3>' +
            '<a href="contact.html" data-i18n="nav.contact"></a>' +
            '<a href="faq.html" data-i18n="nav.faq"></a>' +
            '<a href="cart.html" data-i18n="header.cart"></a>' +
          "</nav>" +
        "</div>" +
        '<div class="container footer-bottom">' +
          '<div class="footer-social">' + socialLinks() + "</div>" +
          '<p class="footer-made" data-i18n="footer.madeIn"></p>' +
          langSwitchMarkup("footer") +
          '<div class="footer-legal">' +
            '<a href="#" data-i18n="footer.privacy"></a>' +
            '<a href="#" data-i18n="footer.terms"></a>' +
            '<a href="#" data-i18n="footer.cookies"></a>' +
          "</div>" +
          '<p class="footer-rights" data-i18n="footer.rights"></p>' +
        "</div>" +
      "</div>";
    return footer;
  }

  function buildDrawer() {
    var wrap = el("div", { "data-drawer-root": "" });
    wrap.innerHTML = '' +
      '<div class="drawer-overlay" data-drawer-overlay hidden></div>' +
      '<aside class="drawer" data-drawer role="dialog" aria-modal="true" aria-hidden="true" ' +
        'data-i18n-attr="aria-label:drawer.title" tabindex="-1">' +
        '<div class="drawer__head">' +
          '<h2 class="drawer__title" data-i18n="drawer.title"></h2>' +
          '<button type="button" class="icon-btn drawer__close" data-close-cart aria-label="✕">' +
            '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          "</button>" +
        "</div>" +
        '<div class="drawer__body" data-drawer-body></div>' +
        '<div class="drawer__foot" data-drawer-foot></div>' +
      "</aside>";
    return wrap;
  }

  /* ---------------------------------------------------------------------------
     6. Cart model (localStorage-backed)
     ------------------------------------------------------------------------- */
  function readCart() {
    try {
      var raw = localStorage.getItem(STORE.cart);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter(function (i) { return getProduct(i.id); }) : [];
    } catch (e) { return []; }
  }
  function writeCart(cart) {
    try { localStorage.setItem(STORE.cart, JSON.stringify(cart)); } catch (e) {}
    renderCartCount();
    renderDrawerContents();
    renderCartPage();
  }
  function cartCount() {
    return readCart().reduce(function (sum, i) { return sum + i.qty; }, 0);
  }
  function cartSubtotal() {
    return readCart().reduce(function (sum, i) {
      var p = getProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }
  function addToCart(id, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    if (!getProduct(id)) { return; }
    var cart = readCart();
    var line = null;
    cart.forEach(function (i) { if (i.id === id) { line = i; } });
    if (line) { line.qty += qty; } else { cart.push({ id: id, qty: qty }); }
    writeCart(cart);
  }
  function setQty(id, qty) {
    qty = parseInt(qty, 10) || 0;
    var cart = readCart();
    if (qty <= 0) {
      cart = cart.filter(function (i) { return i.id !== id; });
    } else {
      cart.forEach(function (i) { if (i.id === id) { i.qty = qty; } });
    }
    writeCart(cart);
  }
  function removeFromCart(id) { setQty(id, 0); }

  /* ---------------------------------------------------------------------------
     7. Cart rendering — badge, drawer, dedicated cart page
     ------------------------------------------------------------------------- */
  function renderCartCount() {
    var n = cartCount();
    $all("[data-cart-count]").forEach(function (node) {
      node.textContent = n;
      node.parentNode.classList.toggle("has-items", n > 0);
    });
  }

  // Shared line-item markup used by both drawer and cart page (compact vs full).
  function lineItemMarkup(item, full) {
    var p = getProduct(item.id);
    var name = t(item.id + ".name");
    var lineTotal = formatPrice(p.price * item.qty);
    var media = productMedia(p, "cart-line__media");
    var qtyCtrl = '' +
      '<div class="cart-qty" data-cart-line="' + p.id + '">' +
        '<button type="button" class="cart-qty__btn" data-cart-step="-1" data-i18n-attr="aria-label:qty.decrease">−</button>' +
        '<span class="cart-qty__val">' + item.qty + "</span>" +
        '<button type="button" class="cart-qty__btn" data-cart-step="1" data-i18n-attr="aria-label:qty.increase">+</button>' +
      "</div>";
    var remove = '<button type="button" class="cart-remove" data-cart-remove="' + p.id + '" data-i18n="common.remove"></button>';

    if (full) {
      return '<li class="cart-row" data-cart-row="' + p.id + '">' +
        '<div class="cart-row__product">' + media +
          '<div><a class="cart-row__name" href="' + p.page + '">' + escapeHtml(name) + "</a>" +
          '<span class="cart-row__unit">' + formatPrice(p.price) + ' <span data-i18n="price.can"></span></span>' +
          remove + "</div></div>" +
        '<div class="cart-row__price">' + formatPrice(p.price) + "</div>" +
        '<div class="cart-row__qty">' + qtyCtrl + "</div>" +
        '<div class="cart-row__total">' + lineTotal + "</div>" +
      "</li>";
    }
    return '<li class="cart-line" data-cart-row="' + p.id + '">' + media +
      '<div class="cart-line__info">' +
        '<a class="cart-line__name" href="' + p.page + '">' + escapeHtml(name) + "</a>" +
        '<span class="cart-line__price">' + lineTotal + "</span>" +
        '<div class="cart-line__controls">' + qtyCtrl + remove + "</div>" +
      "</div></li>";
  }

  function renderDrawerContents() {
    var body = $("[data-drawer-body]");
    var foot = $("[data-drawer-foot]");
    if (!body || !foot) { return; }
    var cart = readCart();
    if (!cart.length) {
      body.innerHTML = '<div class="drawer-empty">' + sun("#9DAE8C", "sun--mini") +
        '<p data-i18n="drawer.empty"></p>' +
        '<a class="btn btn--ghost" href="shop.html" data-close-cart data-i18n="drawer.emptyCta"></a></div>';
      foot.innerHTML = "";
    } else {
      body.innerHTML = '<ul class="cart-lines">' + cart.map(function (i) { return lineItemMarkup(i, false); }).join("") + "</ul>";
      foot.innerHTML = '' +
        '<div class="drawer__subtotal"><span data-i18n="drawer.subtotal"></span><strong>' + formatPrice(cartSubtotal()) + "</strong></div>" +
        '<p class="drawer__note" data-i18n="drawer.note"></p>' +
        // CHECKOUT STUB: wire a payment provider (Snipcart / Stripe / Shopify) here.
        '<button type="button" class="btn btn--block" data-checkout data-i18n="drawer.checkout"></button>' +
        '<a class="link-quiet" href="cart.html" data-i18n="drawer.viewCart"></a>';
    }
    applyI18n(body); applyI18n(foot);
  }

  function renderCartPage() {
    var mount = $("[data-cart-page]");
    if (!mount) { return; }
    var cart = readCart();
    if (!cart.length) {
      mount.innerHTML = '<div class="cart-empty">' + sun("#C8503F", "sun--mini") +
        '<h2 data-i18n="cart.empty"></h2><p data-i18n="cart.emptyText"></p>' +
        '<a class="btn" href="shop.html" data-i18n="cart.emptyCta"></a></div>';
      applyI18n(mount);
      return;
    }
    mount.innerHTML = '' +
      '<div class="cart-layout">' +
        '<div class="cart-main">' +
          '<div class="cart-head" aria-hidden="true">' +
            '<span data-i18n="cart.colItem"></span><span data-i18n="cart.colPrice"></span>' +
            '<span data-i18n="cart.colQty"></span><span data-i18n="cart.colTotal"></span>' +
          "</div>" +
          '<ul class="cart-rows">' + cart.map(function (i) { return lineItemMarkup(i, true); }).join("") + "</ul>" +
          '<a class="link-quiet cart-continue" href="shop.html" data-i18n="cart.continue"></a>' +
        "</div>" +
        '<aside class="cart-summary">' +
          '<div class="cart-summary__row"><span data-i18n="cart.subtotal"></span><span>' + formatPrice(cartSubtotal()) + "</span></div>" +
          '<div class="cart-summary__row cart-summary__row--muted"><span data-i18n="cart.shipping"></span><span data-i18n="cart.shippingValue"></span></div>' +
          '<div class="cart-summary__row cart-summary__total"><span data-i18n="cart.total"></span><strong>' + formatPrice(cartSubtotal()) + "</strong></div>" +
          // CHECKOUT STUB: this button is intentionally non-functional. Wire a
          // payment provider (Snipcart / Stripe / Shopify) to data-checkout.
          '<button type="button" class="btn btn--block" data-checkout data-i18n="cart.checkout"></button>' +
          '<p class="cart-summary__note" data-i18n="cart.secure"></p>' +
        "</aside>" +
      "</div>";
    applyI18n(mount);
  }

  /* ---------------------------------------------------------------------------
     8. Drawer open/close (with light focus management)
     ------------------------------------------------------------------------- */
  var lastFocused = null;
  function openDrawer() {
    var drawer = $("[data-drawer]"), overlay = $("[data-drawer-overlay]");
    if (!drawer) { return; }
    lastFocused = document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(function () {
      document.body.classList.add("drawer-open");
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      var closeBtn = $(".drawer__close", drawer);
      if (closeBtn) { closeBtn.focus(); }
    });
  }
  function closeDrawer() {
    var drawer = $("[data-drawer]"), overlay = $("[data-drawer-overlay]");
    if (!drawer) { return; }
    document.body.classList.remove("drawer-open");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    window.setTimeout(function () { overlay.hidden = true; }, 300);
    if (lastFocused && lastFocused.focus) { lastFocused.focus(); }
  }
  function trapTab(e) {
    var drawer = $("[data-drawer]");
    if (!drawer || !drawer.classList.contains("is-open") || e.key !== "Tab") { return; }
    var f = $all('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', drawer)
      .filter(function (n) { return n.offsetParent !== null; });
    if (!f.length) { return; }
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------------------------------------------------------------------
     9. JS-built page sections: shop grid, product detail, related, testimonials
     ------------------------------------------------------------------------- */
  // Graceful image: if the file is missing/broken, swap to a tinted placeholder
  // showing the wordmark — never a broken-image icon.
  function productMedia(p, cls) {
    var alt = "INRYOU " + t(p.id + ".name");
    return '<div class="' + (cls || "product-media") + '" style="--accent:' + p.accent + ';--accent-soft:' + p.accentSoft + '">' +
      sun(p.accent, "sun--card") +
      '<img class="can" src="' + p.image + '" alt="' + escapeHtml(alt) + '" loading="lazy" ' +
        'onerror="this.classList.add(\'is-missing\');this.removeAttribute(\'src\');" />' +
      '<span class="product-media__placeholder" aria-hidden="true">' + wordmark() + "</span>" +
    "</div>";
  }

  function productCard(p) {
    return '<article class="product-card reveal" style="--accent:' + p.accent + ';--accent-soft:' + p.accentSoft + '">' +
      '<a class="product-card__media-link" href="' + p.page + '" aria-label="' + escapeHtml(t(p.id + ".name")) + '">' +
        productMedia(p, "product-card__media") + "</a>" +
      '<div class="product-card__body">' +
        '<div class="product-card__head">' +
          '<h3 class="product-card__name"><a href="' + p.page + '">' + escapeHtml(t(p.id + ".name")) + "</a></h3>" +
          '<span class="product-card__price">' + formatPrice(p.price) + "</span>" +
        "</div>" +
        '<p class="product-card__desc">' + escapeHtml(t(p.id + ".short")) + "</p>" +
        '<div class="product-card__actions">' + stepper(1) +
          '<button type="button" class="btn btn--block add-to-cart" data-product="' + p.id + '" data-i18n="btn.add"></button>' +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function renderShopGrid() {
    var grid = $("[data-shop-grid]");
    if (!grid) { return; }
    grid.innerHTML = PRODUCTS.map(productCard).join("");
    applyI18n(grid);
  }

  // Compact teaser cards for the homepage flavour row.
  function renderFlavorTeasers() {
    var row = $("[data-flavor-teasers]");
    if (!row) { return; }
    row.innerHTML = PRODUCTS.map(function (p) {
      return '<a class="flavor-teaser reveal" href="' + p.page + '" style="--accent:' + p.accent + ';--accent-soft:' + p.accentSoft + '">' +
        productMedia(p, "flavor-teaser__media") +
        '<div class="flavor-teaser__body">' +
          '<h3 class="flavor-teaser__name">' + escapeHtml(t(p.id + ".name")) + "</h3>" +
          '<p class="flavor-teaser__tag">' + escapeHtml(t(p.id + ".tagline")) + "</p>" +
          '<span class="flavor-teaser__cta" data-i18n="btn.view"></span>' +
        "</div></a>";
    }).join("");
    applyI18n(row);
  }

  function renderProductDetail() {
    // Iterates every [data-product-detail] mount — works for one-per-page
    // (multi-page site) and for all-at-once (single-file preview SPA).
    $all("[data-product-detail]").forEach(function (mount) {
    var p = getProduct(mount.getAttribute("data-product-detail"));
    if (!p) { return; }
    document.documentElement.style.setProperty("--page-accent", p.accent);

    mount.innerHTML = '' +
      '<div class="pdp">' +
        '<div class="pdp__media reveal">' + productMedia(p, "pdp__figure") + "</div>" +
        '<div class="pdp__info reveal">' +
          '<p class="kicker" style="color:' + p.accent + '">' + escapeHtml(t(p.id + ".local")) + "</p>" +
          '<h1 class="pdp__title">' + escapeHtml(t(p.id + ".name")) + "</h1>" +
          '<p class="pdp__tagline">' + escapeHtml(t(p.id + ".tagline")) + "</p>" +
          '<p class="pdp__price">' + formatPrice(p.price) + ' <span class="pdp__per" data-i18n="price.can"></span></p>' +
          '<p class="pdp__desc">' + escapeHtml(t(p.id + ".long")) + "</p>" +
          '<div class="pdp__buy">' + stepper(1) +
            '<button type="button" class="btn btn--block add-to-cart" data-product="' + p.id + '" data-i18n="btn.add"></button>' +
          "</div>" +
          '<dl class="pdp__specs">' +
            spec("product.sizeLabel", "product.sizeValue") +
            spec("product.sugarLabel", "product.sugarValue") +
            spec("product.kcalLabel", "product.kcalValue") +
            spec("product.caffeineLabel", "product.caffeineValue") +
          "</dl>" +
          '<p class="pdp__note" data-i18n="product.servingNote"></p>' +
        "</div>" +
      "</div>" +
      // Functional balance band (shared three-ingredient story).
      '<section class="pdp-func reveal">' +
        '<h2 class="pdp-func__title" data-i18n="product.functionalTitle"></h2>' +
        '<div class="pdp-func__grid">' +
          func("balance.magTitle") + func("balance.inoTitle") + func("balance.theaTitle") +
        "</div>" +
        '<a class="link-quiet" href="balance.html" data-i18n="home.balanceCta"></a>' +
      "</section>" +
      // You might also like
      '<section class="related reveal">' +
        '<h2 class="related__title" data-i18n="product.relatedTitle"></h2>' +
        '<div class="related__grid">' +
          PRODUCTS.filter(function (x) { return x.id !== p.id; }).map(productCard).join("") +
        "</div>" +
      "</section>";

    applyI18n(mount);

    function spec(labelKey, valueKey) {
      return '<div class="spec"><dt data-i18n="' + labelKey + '"></dt><dd data-i18n="' + valueKey + '"></dd></div>';
    }
    function func(titleKey) {
      return '<div class="pdp-func__item">' + sun(p.accent, "sun--mini") +
        '<h3 data-i18n="' + titleKey + '"></h3></div>';
    }
    });
  }

  function renderTestimonials() {
    var row = $("[data-testimonials]");
    if (!row) { return; }
    var list = TESTIMONIALS[getLang()] || TESTIMONIALS.nl;
    row.innerHTML = list.map(function (tm) {
      return '<figure class="testimonial reveal">' + stars(tm.stars) +
        '<blockquote class="testimonial__quote">' + escapeHtml(tm.quote) + "</blockquote>" +
        '<figcaption class="testimonial__who"><span class="testimonial__name">' + escapeHtml(tm.name) +
          '</span><span class="testimonial__place">' + escapeHtml(tm.place) + "</span></figcaption>" +
      "</figure>";
    }).join("");
  }

  // Horizontal product showcase (home) — full-bleed panels, pinned + scrubbed.
  function renderShowcase() {
    var track = $("[data-showcase-track]");
    if (!track) { return; }
    track.innerHTML = PRODUCTS.map(function (p, i) {
      var n = ("0" + (i + 1));
      return '<div class="showcase__panel" style="--accent:' + p.accent + ';--accent-soft:' + p.accentSoft + '">' +
        '<div class="showcase__bg" aria-hidden="true"><span class="sun" style="--accent:' + p.accent + ';width:120%;height:120%"></span></div>' +
        '<div class="showcase__content">' +
          '<span class="showcase__index">' + n + ' / 03</span>' +
          '<h2 class="showcase__name">' + escapeHtml(t(p.id + ".name")) + "</h2>" +
          '<p class="showcase__tag">' + escapeHtml(t(p.id + ".long")) + "</p>" +
          '<a class="btn btn--ghost showcase__cta magnetic" href="' + p.page + '" data-i18n="btn.view"></a>' +
        "</div>" +
        '<div class="showcase__media">' +
          '<img class="showcase__can" src="' + p.image + '" alt="INRYOU ' + escapeHtml(t(p.id + ".name")) +
            '" onerror="this.classList.add(\'is-missing\')" />' +
          '<span class="showcase__ph" aria-hidden="true">' + wordmark() + "</span>" +
        "</div>" +
      "</div>";
    }).join("");
    var dots = $("[data-showcase-dots]");
    if (dots) {
      dots.innerHTML = PRODUCTS.map(function (p, i) {
        return '<span class="showcase__dot ' + (i === 0 ? "is-on" : "") + '"></span>';
      }).join("");
    }
    applyI18n(track);
  }

  // Re-render everything that is built from JS (called on load + language change).
  function renderDynamic() {
    renderShopGrid();
    renderFlavorTeasers();
    renderShowcase();
    renderProductDetail();
    renderTestimonials();
    renderDrawerContents();
    renderCartPage();
    renderCartCount();
    if (window.__inryouAfterRender) { window.__inryouAfterRender(); }
  }

  /* ---------------------------------------------------------------------------
     10. Interactions: language buttons, steppers, accordion, reveal, forms
     ------------------------------------------------------------------------- */
  function syncLangButtons() {
    var lang = getLang();
    $all("[data-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  // Flash "Added ✓" on an add-to-cart button.
  function flashAdded(btn) {
    if (btn.dataset.flashing) { return; }
    btn.dataset.flashing = "1";
    btn.classList.add("is-added");
    btn.textContent = t("btn.added");
    window.setTimeout(function () {
      btn.classList.remove("is-added");
      btn.textContent = t("btn.add");
      delete btn.dataset.flashing;
    }, 1400);
  }

  function bindGlobalClicks() {
    document.addEventListener("click", function (e) {
      var target = e.target;

      // Language switch
      var langBtn = target.closest("[data-lang]");
      if (langBtn) { setLang(langBtn.getAttribute("data-lang")); return; }

      // Open / close cart drawer
      if (target.closest("[data-open-cart]")) { openDrawer(); return; }
      if (target.closest("[data-close-cart]")) { closeDrawer(); return; }
      if (target.closest("[data-drawer-overlay]")) { closeDrawer(); return; }

      // Quantity stepper (± on a product page / card)
      var step = target.closest("[data-step]");
      if (step) {
        var group = step.closest("[data-qty]");
        var input = group ? $("[data-qty-input]", group) : null;
        if (input) {
          var v = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(step.getAttribute("data-step"), 10));
          input.value = v;
        }
        return;
      }

      // Add to cart
      var add = target.closest(".add-to-cart");
      if (add) {
        var group2 = add.closest(".product-card__actions, .pdp__buy");
        var qInput = group2 ? $("[data-qty-input]", group2) : null;
        var qty = qInput ? parseInt(qInput.value, 10) : 1;
        addToCart(add.getAttribute("data-product"), qty);
        flashAdded(add);
        openDrawer();
        if (qInput) { qInput.value = 1; }
        return;
      }

      // Cart line +/- and remove (drawer + cart page share these hooks)
      var cstep = target.closest("[data-cart-step]");
      if (cstep) {
        var lineEl = cstep.closest("[data-cart-line], [data-cart-row]");
        var id = lineEl.getAttribute("data-cart-line") || lineEl.getAttribute("data-cart-row");
        var item = readCart().filter(function (i) { return i.id === id; })[0];
        if (item) { setQty(id, item.qty + parseInt(cstep.getAttribute("data-cart-step"), 10)); }
        return;
      }
      var rem = target.closest("[data-cart-remove]");
      if (rem) { removeFromCart(rem.getAttribute("data-cart-remove")); return; }

      // CHECKOUT STUB — intentionally non-functional. A real payment provider
      // (Snipcart / Stripe / Shopify Checkout) gets wired in here later.
      var checkout = target.closest("[data-checkout]");
      if (checkout) {
        e.preventDefault();
        checkout.classList.add("is-pending");
        var original = checkout.textContent;
        checkout.textContent = "—";
        window.setTimeout(function () {
          checkout.classList.remove("is-pending");
          checkout.textContent = original;
        }, 900);
        // window.location = '/checkout';  // ← TODO: real checkout
        return;
      }

      // Mobile nav toggle
      var navToggle = target.closest("[data-nav-toggle]");
      if (navToggle) {
        var header = $("[data-header]");
        var open = header.classList.toggle("nav-open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
        return;
      }
      // Close mobile nav when a link is tapped
      if (target.closest(".nav__link")) {
        var h = $("[data-header]");
        if (h) { h.classList.remove("nav-open"); }
      }

      // Accordion (FAQ)
      var accBtn = target.closest("[data-accordion-trigger]");
      if (accBtn) {
        var item2 = accBtn.closest(".accordion__item");
        var panel = $(".accordion__panel", item2);
        var isOpen = accBtn.getAttribute("aria-expanded") === "true";
        accBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");
        if (isOpen) { panel.style.maxHeight = null; item2.classList.remove("is-open"); }
        else { item2.classList.add("is-open"); panel.style.maxHeight = panel.scrollHeight + "px"; }
        return;
      }
    });

    // Esc closes the drawer; Tab is trapped while open.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDrawer(); }
      trapTab(e);
    });

    // Keep manually-typed stepper values clean.
    document.addEventListener("input", function (e) {
      if (e.target.matches("[data-qty-input]")) {
        var clean = e.target.value.replace(/[^\d]/g, "");
        e.target.value = clean === "" ? "" : Math.max(1, parseInt(clean, 10));
      }
    });
  }

  // Front-end-only form stubs (newsletter + contact). No data leaves the page.
  function bindForms() {
    document.addEventListener("submit", function (e) {
      var news = e.target.closest("[data-newsletter]");
      if (news) {
        e.preventDefault();
        var msg = $("[data-news-msg]", news);
        if (msg) { msg.textContent = t("footer.subscribed"); msg.classList.add("is-on"); }
        news.reset();
        return;
      }
      var contact = e.target.closest("[data-contact-form]");
      if (contact) {
        e.preventDefault();
        var cmsg = $("[data-contact-msg]", contact);
        if (cmsg) { cmsg.textContent = t("contact.success"); cmsg.classList.add("is-on"); }
        contact.reset();
        return;
      }
    });
  }

  // Subtle scroll-reveal. Respects prefers-reduced-motion.
  function initReveal() {
    var els = $all(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (n) { io.observe(n); });
    // Re-scan after dynamic content renders.
    window.__inryouObserveReveal = function () {
      $all(".reveal:not(.is-visible)").forEach(function (n) { io.observe(n); });
    };
  }

  /* ---------------------------------------------------------------------------
     10b. PREMIUM MOTION LAYER — GSAP + ScrollTrigger + Lenis (CDN, lazy-loaded)
        Living canvas sun, custom cursor, magnetic buttons, kinetic type,
        horizontal pinned showcase, scroll-pinned storytelling, parallax,
        smart header. All optional: degrades to the static site if libs fail
        or prefers-reduced-motion is set.
     ------------------------------------------------------------------------- */
  var GSAP_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
  var ST_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js";
  var LENIS_CDN = "https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js";

  function prefersReduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script");
      s.src = src; s.async = false; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  function loadLibs() {
    return loadScript(GSAP_CDN)
      .then(function () { return loadScript(ST_CDN); })
      .then(function () { return loadScript(LENIS_CDN).catch(function () {}); }); // Lenis optional
  }

  /* ---- Living canvas sun --------------------------------------------------
     Glowing accent disc + baked, dissolving grain that drifts and reacts to
     the pointer. Pauses when offscreen. Static single frame if reduced. */
  function hexToRgb(hex) {
    hex = (hex || "#C8503F").trim().replace("#", "");
    if (hex.length === 3) { hex = hex.split("").map(function (c) { return c + c; }).join(""); }
    var n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function buildCanvasSun(container) {
    var canvas = document.createElement("canvas");
    container.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, grain = null, raf = null, t = 0, tx = 0, ty = 0, visible = true;
    var reduce = prefersReduced();
    var biasX = container.classList.contains("hero__canvas") ? 0.62 : 0.5;
    var col = hexToRgb(getComputedStyle(container).getPropertyValue("--accent") || "#C8503F");

    function bake() {
      var g = document.createElement("canvas"); g.width = W; g.height = H;
      var gx = g.getContext("2d"); var img = gx.createImageData(W, H); var d = img.data;
      for (var y = 0; y < H; y++) {
        var fy = y / H;
        var dens = Math.max(0, Math.min(1, (fy - 0.42) / 0.18)) * Math.max(0, 1 - (fy - 0.52) / 0.46);
        for (var x = 0; x < W; x++) {
          var i = (y * W + x) * 4;
          var on = Math.random() < dens * 0.55;
          d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2];
          d[i + 3] = on ? Math.random() * 255 * Math.min(1, dens * 1.5) : 0;
        }
      }
      gx.putImageData(img, 0, 0); grain = g;
    }
    function resize() {
      var r = container.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bake();
    }
    function frame() {
      t += 0.016;
      tx += ((reduce ? 0 : pointer.x) - tx) * 0.05;
      ty += ((reduce ? 0 : pointer.y) - ty) * 0.05;
      ctx.clearRect(0, 0, W, H);
      var cx = W * biasX + tx * 20, cy = H * 0.46 + ty * 10;
      var pulse = reduce ? 0 : Math.sin(t * 0.7) * 0.035;
      var rad = Math.min(W, H) * (biasX === 0.5 ? 0.46 : 0.5) * (1 + pulse);
      var grd = ctx.createRadialGradient(cx, cy - rad * 0.12, rad * 0.08, cx, cy, rad);
      grd.addColorStop(0, "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",0.92)");
      grd.addColorStop(0.5, "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",0.7)");
      grd.addColorStop(1, "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",0)");
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
      if (grain) {
        ctx.globalAlpha = 0.85;
        ctx.drawImage(grain, tx * 12, (reduce ? 0 : Math.sin(t * 0.5) * 5) + ty * 8, W, H);
        ctx.globalAlpha = 1;
      }
      if (!reduce && visible) { raf = requestAnimationFrame(frame); } else { raf = null; }
    }
    function play() { if (!raf && !reduce) { raf = requestAnimationFrame(frame); } }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    resize();
    frame();
    // Pause when offscreen.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        visible = e[0].isIntersecting;
        if (visible) { play(); } else { stop(); }
      }, { threshold: 0 }).observe(container);
    }
    var ctrl = {
      resize: resize, play: play, stop: stop,
      setAccent: function (hex) { col = hexToRgb(hex); bake(); if (reduce) { frame(); } }
    };
    container.__sunCtrl = ctrl;
    return ctrl;
  }
  function mountCanvasSuns() {
    $all("[data-sun-canvas]").forEach(function (elm) {
      if (elm.__sunCtrl) { return; }
      sunControllers.push(buildCanvasSun(elm));
    });
    var to;
    window.addEventListener("resize", function () {
      clearTimeout(to);
      to = setTimeout(function () { sunControllers.forEach(function (c) { c.resize(); }); }, 200);
    });
  }

  /* ---- Smooth scroll (Lenis) ---- */
  function initLenis() {
    if (!window.Lenis) { return; }
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    window.gsap.ticker.lagSmoothing(0);
  }

  /* ---- Custom cursor ---- */
  function setupCursor() {
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) { return; }
    document.documentElement.classList.add("has-cursor");
    var ring = el("div", { "class": "cursor", "aria-hidden": "true" });
    var dot = el("div", { "class": "cursor__dot", "aria-hidden": "true" });
    document.body.appendChild(ring); document.body.appendChild(dot);
    var g = window.gsap;
    g.set([ring, dot], { xPercent: -50, yPercent: -50 });
    var rx = g.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    var ry = g.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    var dx = g.quickTo(dot, "x", { duration: 0.08 });
    var dy = g.quickTo(dot, "y", { duration: 0.08 });
    window.addEventListener("mousemove", function (e) {
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    }, { passive: true });
    var hot = "a, button, input, textarea, .magnetic, [data-magnetic], .accordion__trigger, .stepper, .lang-switch";
    document.addEventListener("mouseover", function (e) { if (e.target.closest(hot)) { ring.classList.add("is-hover"); } });
    document.addEventListener("mouseout", function (e) { if (e.target.closest(hot)) { ring.classList.remove("is-hover"); } });
    document.addEventListener("mousedown", function () { ring.classList.add("is-down"); });
    document.addEventListener("mouseup", function () { ring.classList.remove("is-down"); });
    document.documentElement.addEventListener("mouseleave", function () { ring.classList.add("is-hidden"); });
    document.documentElement.addEventListener("mouseenter", function () { ring.classList.remove("is-hidden"); });
  }

  /* ---- Magnetic buttons (idempotent) ---- */
  function magnetize(elm) {
    if (elm.dataset.mag) { return; }
    elm.dataset.mag = "1";
    var g = window.gsap;
    var xTo = g.quickTo(elm, "x", { duration: 0.5, ease: "power3" });
    var yTo = g.quickTo(elm, "y", { duration: 0.5, ease: "power3" });
    var strength = elm.classList.contains("icon-btn") ? 0.35 : 0.45;
    elm.addEventListener("mousemove", function (e) {
      var r = elm.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    elm.addEventListener("mouseleave", function () { xTo(0); yTo(0); });
  }
  function scanMagnetic() {
    if (!window.gsap || prefersReduced()) { return; }
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) { return; }
    $all(".btn, .icon-btn, [data-magnetic]").forEach(magnetize);
  }

  /* ---- Kinetic hero headline (word-mask reveal) ---- */
  function splitKinetic(elm) {
    var nodes = Array.prototype.slice.call(elm.childNodes);
    elm.innerHTML = "";
    var inners = [];
    nodes.forEach(function (node) {
      var cls = node.nodeType === 1 ? node.className : "";
      var text = node.textContent;
      text.split(/(\s+)/).forEach(function (part) {
        if (part === "") { return; }
        if (/^\s+$/.test(part)) { elm.appendChild(document.createTextNode(" ")); return; }
        var w = el("span", { "class": "kinetic-word" });
        var inner = el("span"); inner.textContent = part;
        if (cls) { inner.className = cls; }
        w.appendChild(inner); elm.appendChild(w); inners.push(inner);
      });
    });
    return inners;
  }
  function setupKineticHero() {
    if (!window.gsap || prefersReduced()) { return; }
    var title = $("[data-kinetic]");
    if (!title) { return; }
    var inners = splitKinetic(title);
    window.gsap.fromTo(inners, { yPercent: 115 }, {
      yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.07, delay: 0.15
    });
  }

  /* ---- Header: shrink, hide-on-scroll-down, theme over dark sections ---- */
  function setupHeaderScroll() {
    var header = $("[data-header]");
    if (!header) { return; }
    var lastY = 0;
    function onScroll(y) {
      header.classList.toggle("is-scrolled", y > 20);
      var blocked = document.body.classList.contains("drawer-open") || header.classList.contains("nav-open");
      header.classList.toggle("is-hidden", y > lastY && y > 260 && !blocked);
      lastY = y;
    }
    if (lenis) { lenis.on("scroll", function (e) { onScroll(e.scroll); }); }
    else { window.addEventListener("scroll", function () { onScroll(window.scrollY); }, { passive: true }); }

    var darkSet = new Set();
    $all('[data-theme="dark"]').forEach(function (sec) {
      window.ScrollTrigger.create({
        trigger: sec, start: "top 58px", end: "bottom 58px",
        onToggle: function (self) {
          if (self.isActive) { darkSet.add(sec); } else { darkSet.delete(sec); }
          header.classList.toggle("is-on-dark", darkSet.size > 0);
        }
      });
    });
  }

  /* ---- Parallax ---- */
  function setupParallax() {
    if (!window.gsap || prefersReduced()) { return; }
    $all("[data-parallax-speed]").forEach(function (elm) {
      var speed = parseFloat(elm.getAttribute("data-parallax-speed")) || -10;
      window.gsap.to(elm, {
        yPercent: speed, ease: "none",
        scrollTrigger: { trigger: elm, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }

  /* ---- Horizontal pinned product showcase ---- */
  function setupShowcase() {
    if (!window.gsap || prefersReduced()) { return; }
    var sec = $("[data-showcase]");
    if (!sec) { return; }
    var track = $(".showcase__track", sec);
    var panels = $all(".showcase__panel", sec);
    var dots = $all(".showcase__dot", sec);
    if (panels.length < 2) { return; }
    function dist() { return track.scrollWidth - window.innerWidth; }
    window.gsap.to(track, {
      x: function () { return -dist(); }, ease: "none",
      scrollTrigger: {
        trigger: sec, start: "top top", end: function () { return "+=" + dist(); },
        scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: function (self) {
          var idx = Math.round(self.progress * (panels.length - 1));
          dots.forEach(function (d, i) { d.classList.toggle("is-on", i === idx); });
        }
      }
    });
  }

  /* ---- Scroll-pinned ingredients storytelling ---- */
  function setupBalanceStory() {
    if (!window.gsap) { return; }
    var sec = $("[data-balance-story]");
    if (!sec) { return; }
    var steps = $all(".balance-step", sec);
    var visual = $("[data-sun-canvas]", sec);
    var accents = ["#9DAE8C", "#E89A3C", "#C8503F"];
    steps.forEach(function (step, i) {
      window.ScrollTrigger.create({
        trigger: step, start: "top 60%", end: "bottom 60%",
        onToggle: function (self) {
          if (!self.isActive) { return; }
          steps.forEach(function (s) { s.classList.remove("is-active"); });
          step.classList.add("is-active");
          if (visual && visual.__sunCtrl) { visual.__sunCtrl.setAccent(accents[i] || accents[0]); }
        }
      });
    });
  }

  /* ---- Intro loader (once per session) ---- */
  function playIntro() {
    if (prefersReduced() || !window.gsap) { return; }
    var seen = false;
    try { seen = sessionStorage.getItem("inryou.intro") === "1"; } catch (e) {}
    if (seen) { return; }
    try { sessionStorage.setItem("inryou.intro", "1"); } catch (e) {}
    var intro = el("div", { "class": "intro", "aria-hidden": "true" });
    intro.innerHTML = '<div class="intro__mark"><span>INRYOU</span></div><div class="intro__bar"><i></i></div>';
    document.body.appendChild(intro);
    document.body.style.overflow = "hidden";
    var g = window.gsap;
    g.timeline()
      .to(intro.querySelector(".intro__mark span"), { y: 0, duration: 0.8, ease: "expo.out" })
      .fromTo(intro.querySelector(".intro__bar i"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.3")
      .to(intro, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "+=0.05")
      .add(function () { intro.remove(); document.body.style.overflow = ""; if (window.ScrollTrigger) { window.ScrollTrigger.refresh(); } });
  }

  function initPremium() {
    var reduce = prefersReduced();
    document.documentElement.classList.toggle("reduce-motion", reduce);
    if (!$(".film-grain")) { document.body.appendChild(el("div", { "class": "film-grain", "aria-hidden": "true" })); }
    mountCanvasSuns();                 // works (static) even when reduced
    if (reduce) { return; }

    window.addEventListener("mousemove", function (e) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    loadLibs().then(function () {
      if (!window.gsap || !window.ScrollTrigger) { return; }
      document.documentElement.classList.add("has-motion");
      window.gsap.registerPlugin(window.ScrollTrigger);
      initLenis();
      playIntro();
      setupCursor();
      setupHeaderScroll();
      setupParallax();
      setupKineticHero();
      setupShowcase();
      setupBalanceStory();
      scanMagnetic();
      // Re-apply per-render enhancements (after language switch etc.)
      window.__inryouAfterRender = function () {
        setupKineticHero();
        scanMagnetic();
        if (window.ScrollTrigger) { window.ScrollTrigger.refresh(); }
      };
      window.addEventListener("load", function () { window.ScrollTrigger.refresh(); });
      window.ScrollTrigger.refresh();
    }).catch(function () { /* offline: static site remains fully functional */ });
  }

  /* ---------------------------------------------------------------------------
     11. Boot
     ------------------------------------------------------------------------- */
  function init() {
    document.documentElement.setAttribute("lang", getLang());

    // Inject layout chrome.
    document.body.insertBefore(buildHeader(), document.body.firstChild);
    document.body.appendChild(buildFooter());
    document.body.appendChild(buildDrawer());

    // Translate static markup, then build & translate dynamic markup.
    applyI18n();
    renderDynamic();
    syncLangButtons();

    bindGlobalClicks();
    bindForms();
    initReveal();
    if (window.__inryouObserveReveal) { window.__inryouObserveReveal(); }

    // Mark body ready (enables CSS entrance transitions).
    document.body.classList.add("is-ready");

    // Premium motion layer (lazy-loads GSAP/Lenis; no-ops if reduced/offline).
    initPremium();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
