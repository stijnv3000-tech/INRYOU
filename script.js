/* ============================================================================
   INRYOU — single-page application
   natural balance, made effortless.

   Sections in this file:
     1.  Config & product data
     2.  i18n translation dictionary (NL / FR / EN)  — single source of UI copy
     3.  State (language + cart) with localStorage persistence
     4.  Small helpers (t, money, escape, sun-motif generator)
     5.  Cart logic (add / update / remove / subtotal / badge)
     6.  Cart UI (slide-in drawer + #/cart view body)
     7.  View templates (Home, Shop, Product, Story, Balance, FAQ, Contact, Cart)
     8.  Router (hash-based, works from file://)
     9.  i18n application + language switching
     10. Init & event wiring

   Everything that prints text reads from `translations` so the whole UI is
   trilingual. Prices/nutrition that we cannot know are bracketed placeholders.
   ============================================================================ */

'use strict';

/* ----------------------------------------------------------------------------
   1. CONFIG & PRODUCT DATA
   Text (names, blurbs) lives in the translation dictionary, keyed per language.
   Here we keep only the non-text, structural data per product.
   ---------------------------------------------------------------------------- */

// [price per can] / [price per pack] — PLACEHOLDER pricing. The cart needs real
// numbers to compute a live subtotal; swap these for production prices later.
const PRICE_CAN = 2.5;     // € per single can  — [price per can]
const PRICE_PACK = 27.0;   // € per 12-pack     — [price per pack]
const PACK_SIZE = 12;
const CAN_ML = 250;        // can size in ml (printed on the can)

const PRODUCTS = {
  cranberry: {
    id: 'cranberry',
    accent: '#C8503F',          // coral red
    accentName: 'cranberry',
    image: 'images/can-cranberry.png',
    price: PRICE_CAN,
    benefit: 'focus',           // -> translated label
  },
  'ginger-citrus': {
    id: 'ginger-citrus',
    accent: '#E89A3C',          // warm orange
    accentName: 'ginger',
    image: 'images/can-ginger-citrus.png',
    price: PRICE_CAN,
    benefit: 'boost',
  },
  vanille: {
    id: 'vanille',
    accent: '#9CAE8C',          // soft sage
    accentName: 'vanille',
    image: 'images/can-vanille.png', // not yet shot -> graceful placeholder
    price: PRICE_CAN,
    benefit: 'calm',
    comingSoon: true,
  },
};

const PRODUCT_ORDER = ['cranberry', 'ginger-citrus', 'vanille'];

/* ----------------------------------------------------------------------------
   2. i18n DICTIONARY — every UI string, in NL (default), FR, EN.
   ---------------------------------------------------------------------------- */

const translations = {
  /* =================== DUTCH (default) =================== */
  nl: {
    // nav / chrome
    nav_home: 'Home', nav_shop: 'Shop', nav_story: 'Ons verhaal',
    nav_balance: 'Natural Balance', nav_faq: 'FAQ', nav_contact: 'Contact',
    cta_shop: 'Shop het assortiment', cta_discover: 'Ontdek onze smaken',
    add_to_cart: 'In mandje', adding: 'Toegevoegd ✓', sold_out: 'Binnenkort',
    from: 'vanaf', per_can: 'per blikje', per_pack: 'per pack van ' + PACK_SIZE,

    // home — hero
    hero_kicker: 'Belgische functionele sparkling',
    hero_title_1: 'Natural balance,', hero_title_2: 'made effortless.',
    hero_sub: 'Bruisende, natuurlijke dranken met functionele mineralen — een rustige, eerlijke upgrade van frisdrank. Minder suiker, meer balans. Helemaal jij.',
    hero_badge_1: 'Natuurlijk', hero_badge_2: 'Minder suiker', hero_badge_3: '0 onzin',

    // home — trust row
    trust_1: 'Natuurlijke ingrediënten', trust_1_sub: 'Niets kunstmatigs, niets te veel.',
    trust_2: 'Functionele mineralen', trust_2_sub: 'Magnesium, inositol & L-theanine.',
    trust_3: 'Minder suiker', trust_3_sub: '[suikergehalte] per blikje van ' + CAN_ML + ' ml.',
    trust_4: 'Trots Belgisch', trust_4_sub: 'Bedacht en gebrouwen in België.',

    // home — featured
    feat_kicker: 'In de kijker',
    feat_title: 'Cranberry,', feat_title_em: 'pure focus.',
    feat_text: 'Helder rood, helder hoofd. Onze cranberry combineert een frisse, lichtzure smaak met functionele mineralen voor een rustige, heldere energie — zonder de crash.',
    feat_point_1: 'Verfrissend lichtzuur', feat_point_2: 'Functionele boost', feat_point_3: 'Zonder kunstmatige zoetstoffen',
    feat_tab_focus: 'Focus', feat_tab_boost: 'Boost', feat_tab_calm: 'Calm',

    // home — minerals
    min_kicker: 'Wat zit erin',
    min_title: 'Healthy mineral', min_title_em: 'balance.',
    min_sub: 'Drie functionele ingrediënten, zorgvuldig gedoseerd. Geen toverdrank — gewoon een eerlijke dagelijkse drank die met je meewerkt.',
    min_1_name: 'Magnesium', min_1_amt: '[mg magnesium]', min_1_desc: 'Draagt bij aan een normale werking van het zenuwstelsel en minder vermoeidheid.',
    min_2_name: 'Inositol', min_2_amt: '[mg inositol]', min_2_desc: 'Een natuurlijk voorkomende verbinding, geliefd om zijn rol in mentale rust.',
    min_3_name: 'L-theanine', min_3_amt: '[mg L-theanine]', min_3_desc: 'Van groene thee — bekend om kalme, heldere focus zonder schokken.',
    min_foot: 'Exacte doseringen en claims volgen zodra de finale recepturen en certificeringen [certificeringen] vastliggen.',

    // home — compare
    cmp_kicker: 'Wij maken',
    cmp_title: 'het', cmp_title_em: 'verschil.',
    cmp_col_us: 'INRYOU', cmp_col_them: 'Klassieke frisdrank',
    cmp_row_1: 'Suiker', cmp_us_1: '[suikergehalte]', cmp_them_1: 'Vaak 25g+ per blik',
    cmp_row_2: 'Functionele mineralen', cmp_us_2: 'Ja', cmp_them_2: 'Geen',
    cmp_row_3: 'Kunstmatige kleurstoffen', cmp_us_3: 'Geen', cmp_them_3: 'Vaak wel',
    cmp_row_4: 'Smaak', cmp_us_4: 'Natuurlijk & verfrissend', cmp_them_4: 'Zoet & overheersend',
    cmp_row_5: 'Gevoel achteraf', cmp_us_5: 'Rustige energie', cmp_them_5: 'Suikercrash',

    // home — shop teaser
    shop_kicker: 'Shop',
    shop_title: 'Kies je', shop_title_em: 'balans.',
    shop_sub: 'Twee smaken om van te houden, eentje op komst. Elk in zijn eigen kleur en stemming.',

    // home — lifestyle
    life_kicker: 'Een nieuwe generatie',
    life_title: 'Empowering the new', life_title_em: 'generation.',
    life_sub: 'Overal waar het leven je brengt — studie, werk, sport, rust. INRYOU past zich aan jouw ritme aan, niet andersom.',
    life_tag_1: 'Studeren', life_tag_2: 'Bewegen', life_tag_3: 'Pauzeren', life_tag_4: 'Creëren',

    // home — testimonials
    tst_kicker: 'Geproefd. Geliefd.',
    tst_title: 'Wat mensen', tst_title_em: 'zeggen.',
    tst_1: 'Eindelijk een bruisdrank die niet loeizoet is. De cranberry is mijn vaste namiddagdrank geworden.',
    tst_1_by: 'Lotte — Gent',
    tst_2: 'Ginger & citrus in de ochtend in plaats van een tweede koffie. Rustige energie, geen jitters.',
    tst_2_by: 'Sam — Antwerpen',
    tst_3: 'Smaakt clean, ziet er prachtig uit, en ik voel me er gewoon goed bij. Precies wat ik zocht.',
    tst_3_by: 'Yasmine — Brussel',

    // newsletter (home)
    news_title: 'Nooit meer een', news_title_em: 'drop missen.',
    news_sub: 'Schrijf je in voor nieuwe smaken, releases en de occasionele balans-tip.',
    news_ph: 'jij@email.com', news_btn: 'Inschrijven', news_done: 'Welkom — je bent erbij. ☀',

    // shop view
    shop_view_title: 'Het assortiment', shop_view_sub: 'Functionele sparkling, in jouw kleur.',
    shop_badge_focus: 'Focus', shop_badge_boost: 'Boost', shop_badge_calm: 'Calm',

    // product view
    prod_back: '← Terug naar shop',
    prod_qty: 'Aantal', prod_format: 'Formaat',
    prod_fmt_can: 'Los blikje', prod_fmt_pack: 'Pack van ' + PACK_SIZE,
    prod_detail_ingredients: 'Ingrediënten', prod_detail_nutrition: 'Voedingswaarde', prod_detail_how: 'Hoe te drinken',
    prod_ingredients_body: 'Bruisend water, natuurlijk vruchtenextract, functionele mineralen (magnesium, inositol, L-theanine), natuurlijk aroma. Volledige ingrediëntenlijst [ingrediënten] op het blikje.',
    prod_nutrition_body: 'Per blikje van ' + CAN_ML + ' ml: [calorieën] kcal · suiker [suikergehalte] · magnesium [mg magnesium] · inositol [mg inositol] · L-theanine [mg L-theanine].',
    prod_how_body: 'Best goed gekoeld. Schud niet, schenk rustig en laat de bubbels het werk doen — ’s ochtends voor focus, in de namiddag voor een rustige reset.',
    prod_related: 'Ook lekker',
    prod_soon_note: 'Deze smaak komt binnenkort. Laat je e-mail achter en je weet het als eerste.',
    notify_me: 'Hou me op de hoogte', notify_done: 'Top — we laten van ons horen. ☀',

    // product copy
    prod_cranberry_name: 'Cranberry',
    prod_cranberry_tagline: 'Helder rood, helder hoofd.',
    prod_cranberry_blurb: 'Fris, lichtzuur en verkwikkend. Cranberry met een functionele kern voor heldere focus.',
    prod_cranberry_desc: 'Een verfrissend lichtzure cranberry met net genoeg bite. Niet zoet om het zoet, maar gebalanceerd en clean — met magnesium, inositol en L-theanine voor een rustige, heldere energie doorheen je dag.',
    prod_cranberry_taste: 'Lichtzuur · verfrissend · helder',

    prod_ginger_name: 'Ginger & Citrus',
    prod_ginger_tagline: 'Een zachte, warme boost.',
    prod_ginger_blurb: 'Pittige gember ontmoet heldere citrus. Een warme, levendige boost zonder de crash.',
    prod_ginger_desc: 'Levendige gember met een heldere citruslift. Net genoeg pit om je wakker te maken, gebalanceerd en verfrissend — met functionele mineralen voor energie die blijft, zonder jitters.',
    prod_ginger_taste: 'Pittig · citrus · levendig',

    prod_vanille_name: 'Kweepeer & Vanille',
    prod_vanille_tagline: 'Rond, warm, rustgevend.',
    prod_vanille_blurb: 'Zachte kweepeer en romige vanille. Onze rustigste smaak — binnenkort.',
    prod_vanille_desc: 'Zachte kweepeer ontmoet warme vanille in onze meest kalmerende smaak. Rond en geruststellend, gemaakt voor het zachte einde van de dag. Binnenkort beschikbaar.',
    prod_vanille_taste: 'Zacht · romig · rond',

    benefit_focus: 'Focus', benefit_boost: 'Boost', benefit_calm: 'Calm',

    // story view
    story_kicker: 'Ons verhaal',
    story_title: 'Geboren uit', story_title_em: 'balans.',
    story_lead: 'INRYOU begon met een simpele frustratie: waarom moet je kiezen tussen iets dat lekker smaakt en iets dat goed voor je voelt?',
    story_p1: 'We zijn een jong Belgisch merk dat gelooft dat een dagelijkse drank eerlijk kan zijn én plezier kan geven. Geen loeizoete frisdrank, geen klinische “gezondheidsdrank” — gewoon natuurlijke, bruisende dranken met een functionele kern, gemaakt voor het echte leven.',
    story_p2: 'Onze naam zegt het al: in. r. you. Alles wat je nodig hebt, is al in jou — wij geven het gewoon een klein, rustig zetje. Vandaar het zonnetje met de glimlach: kalme energie, elke dag opnieuw.',
    story_val_1: 'Natuurlijk eerst', story_val_1_d: 'Echte ingrediënten, transparant gedoseerd. Geen onzin.',
    story_val_2: 'Rustige energie', story_val_2_d: 'Functioneel, maar nooit overdreven. Balans boven hype.',
    story_val_3: 'Belgisch vakmanschap', story_val_3_d: 'Lokaal bedacht en gebrouwen, met zorg voor detail.',
    story_val_4: 'Voor iedereen', story_val_4_d: 'Een drank die past in elk moment van je dag.',
    story_quote: '“Alles wat je nodig hebt, is al in jou.”',

    // balance view
    balance_kicker: 'Natural Balance',
    balance_title: 'Functioneel,', balance_title_em: 'eerlijk gedoseerd.',
    balance_lead: 'Drie ingrediënten doen het werk. Geen lange lijst van beloftes — gewoon een doordachte combinatie die je dag ondersteunt.',
    balance_how_title: 'Hoe het werkt',
    balance_how_1_t: 'Kies je moment', balance_how_1_d: 'Focus in de ochtend, boost rond de middag, calm tegen de avond.',
    balance_how_2_t: 'Drink gekoeld', balance_how_2_d: 'Best koud, rustig geschonken. Laat de bubbels en mineralen hun werk doen.',
    balance_how_3_t: 'Voel de balans', balance_how_3_d: 'Rustige, heldere energie — zonder suikerpiek en zonder crash.',
    balance_claim_note: 'We doen bewust geen overdreven beloftes. Exacte hoeveelheden, voedingswaarden en eventuele gezondheidsclaims [certificeringen] communiceren we pas wanneer de finale recepturen vastliggen.',

    // faq view
    faq_kicker: 'FAQ', faq_title: 'Goed om te', faq_title_em: 'weten.',
    faq_q1: 'Wat maakt INRYOU functioneel?',
    faq_a1: 'Elk blikje bevat een doordachte combinatie van magnesium, inositol en L-theanine. We communiceren de exacte hoeveelheden [mg magnesium / inositol / L-theanine] zodra de finale recepturen vastliggen.',
    faq_q2: 'Hoeveel suiker zit erin?',
    faq_a2: 'Bewust weinig. Het exacte suikergehalte [suikergehalte] en de calorieën [calorieën] per blikje van ' + CAN_ML + ' ml vermelden we duidelijk op het blikje en hier zodra alles definitief is.',
    faq_q3: 'Is het natuurlijk?',
    faq_a3: 'Ja — we werken met natuurlijke ingrediënten en aroma’s, zonder kunstmatige kleurstoffen. De volledige ingrediëntenlijst [ingrediënten] staat op elk blikje.',
    faq_q4: 'Waar wordt INRYOU gemaakt?',
    faq_a4: 'INRYOU is een Belgisch merk, lokaal bedacht en gebrouwen met zorg voor detail.',
    faq_q5: 'Wat kost het en hoe bestel ik?',
    faq_a5: 'Je bestelt per los blikje of per pack van ' + PACK_SIZE + '. De definitieve prijzen [prijs per blikje] / [prijs per pack] verschijnen hier; je kan nu al alles in je mandje leggen en het bestelproces uittesten.',
    faq_q6: 'Leveren jullie in heel België en Europa?',
    faq_a6: 'Dat is het plan. Leveringszones en verzendkosten communiceren we bij de officiële lancering.',

    // contact view
    contact_kicker: 'Contact', contact_title: 'Zeg', contact_title_em: 'hallo.',
    contact_lead: 'Vraag, samenwerking of gewoon een goed woord? We horen het graag.',
    contact_name: 'Naam', contact_email: 'E-mail', contact_subject: 'Onderwerp', contact_message: 'Bericht',
    contact_send: 'Verstuur bericht', contact_done: 'Bedankt — je bericht is verstuurd (demo). We komen er snel op terug. ☀',
    contact_or: 'Of mail ons rechtstreeks', contact_email_addr: 'hallo@inryou.be',
    contact_follow: 'Volg ons',

    // cart (drawer + view)
    cart_title: 'Jouw mandje', cart_empty: 'Je mandje is nog leeg.',
    cart_empty_cta: 'Ontdek de smaken', cart_subtotal: 'Subtotaal',
    cart_shipping_note: 'Verzendkosten worden berekend bij het afrekenen.',
    cart_checkout: 'Afrekenen', cart_view_full: 'Bekijk mandje', cart_continue: 'Verder shoppen',
    cart_remove: 'Verwijderen', cart_added: 'toegevoegd aan je mandje',
    cart_view_title: 'Jouw mandje', cart_item: 'Artikel', cart_qty: 'Aantal', cart_price: 'Prijs', cart_total: 'Totaal',
    checkout_stub: 'Betalen is nog niet actief in deze demo. Hier wordt later een betaalprovider gekoppeld.',

    // footer
    footer_cta_kicker: 'Klaar voor je balans?',
    footer_cta_title: 'Drink Your', footer_cta_em: 'Balance.', footer_cta_btn: 'Shop het assortiment',
    footer_tagline: 'natural balance, made effortless.',
    footer_col_shop: 'Shop', footer_col_brand: 'Merk', footer_all_flavors: 'Alle smaken',
    footer_news_title: 'Blijf in balans', footer_news_sub: 'Nieuwe smaken, drops en rituelen. Geen spam.',
    footer_news_ph: 'jij@email.com', footer_news_btn: 'Inschrijven', footer_news_done: 'Welkom — je bent erbij. ☀',
    legal_privacy: 'Privacy', legal_terms: 'Voorwaarden', legal_cookies: 'Cookies',
  },

  /* =================== FRENCH =================== */
  fr: {
    nav_home: 'Accueil', nav_shop: 'Boutique', nav_story: 'Notre histoire',
    nav_balance: 'Natural Balance', nav_faq: 'FAQ', nav_contact: 'Contact',
    cta_shop: 'Voir la gamme', cta_discover: 'Découvrir les saveurs',
    add_to_cart: 'Ajouter', adding: 'Ajouté ✓', sold_out: 'Bientôt',
    from: 'à partir de', per_can: 'la canette', per_pack: 'le pack de ' + PACK_SIZE,

    hero_kicker: 'Sparkling fonctionnelle belge',
    hero_title_1: 'Natural balance,', hero_title_2: 'made effortless.',
    hero_sub: 'Des boissons pétillantes et naturelles aux minéraux fonctionnels — une alternative calme et honnête aux sodas. Moins de sucre, plus d’équilibre. Entièrement vous.',
    hero_badge_1: 'Naturel', hero_badge_2: 'Moins de sucre', hero_badge_3: '0 superflu',

    trust_1: 'Ingrédients naturels', trust_1_sub: 'Rien d’artificiel, rien de trop.',
    trust_2: 'Minéraux fonctionnels', trust_2_sub: 'Magnésium, inositol & L-théanine.',
    trust_3: 'Moins de sucre', trust_3_sub: '[teneur en sucre] par canette de ' + CAN_ML + ' ml.',
    trust_4: 'Fièrement belge', trust_4_sub: 'Imaginé et brassé en Belgique.',

    feat_kicker: 'À la une',
    feat_title: 'Cranberry,', feat_title_em: 'focus pur.',
    feat_text: 'Rouge clair, esprit clair. Notre cranberry marie une saveur fraîche et légèrement acidulée à des minéraux fonctionnels pour une énergie calme et nette — sans la chute.',
    feat_point_1: 'Fraîcheur légèrement acidulée', feat_point_2: 'Boost fonctionnel', feat_point_3: 'Sans édulcorants artificiels',
    feat_tab_focus: 'Focus', feat_tab_boost: 'Boost', feat_tab_calm: 'Calm',

    min_kicker: 'Ce qu’il y a dedans',
    min_title: 'Healthy mineral', min_title_em: 'balance.',
    min_sub: 'Trois ingrédients fonctionnels, soigneusement dosés. Pas de potion magique — juste une boisson honnête qui travaille avec vous.',
    min_1_name: 'Magnésium', min_1_amt: '[mg magnésium]', min_1_desc: 'Contribue à un fonctionnement normal du système nerveux et à réduire la fatigue.',
    min_2_name: 'Inositol', min_2_amt: '[mg inositol]', min_2_desc: 'Un composé naturel, apprécié pour son rôle dans le calme mental.',
    min_3_name: 'L-théanine', min_3_amt: '[mg L-théanine]', min_3_desc: 'Issue du thé vert — connue pour une concentration calme et nette, sans à-coups.',
    min_foot: 'Les dosages exacts et les allégations suivront dès que les recettes finales et les certifications [certifications] seront fixées.',

    cmp_kicker: 'Nous faisons',
    cmp_title: 'la', cmp_title_em: 'différence.',
    cmp_col_us: 'INRYOU', cmp_col_them: 'Soda classique',
    cmp_row_1: 'Sucre', cmp_us_1: '[teneur en sucre]', cmp_them_1: 'Souvent 25g+ par canette',
    cmp_row_2: 'Minéraux fonctionnels', cmp_us_2: 'Oui', cmp_them_2: 'Aucun',
    cmp_row_3: 'Colorants artificiels', cmp_us_3: 'Aucun', cmp_them_3: 'Souvent',
    cmp_row_4: 'Goût', cmp_us_4: 'Naturel & rafraîchissant', cmp_them_4: 'Sucré & envahissant',
    cmp_row_5: 'Sensation après', cmp_us_5: 'Énergie calme', cmp_them_5: 'Chute de sucre',

    shop_kicker: 'Boutique',
    shop_title: 'Choisissez votre', shop_title_em: 'équilibre.',
    shop_sub: 'Deux saveurs à adorer, une troisième en route. Chacune avec sa couleur et son humeur.',

    life_kicker: 'Une nouvelle génération',
    life_title: 'Empowering the new', life_title_em: 'generation.',
    life_sub: 'Partout où la vie vous mène — études, travail, sport, repos. INRYOU s’adapte à votre rythme, pas l’inverse.',
    life_tag_1: 'Étudier', life_tag_2: 'Bouger', life_tag_3: 'Faire une pause', life_tag_4: 'Créer',

    tst_kicker: 'Goûté. Adopté.',
    tst_title: 'Ce que les gens', tst_title_em: 'en disent.',
    tst_1: 'Enfin une boisson pétillante pas trop sucrée. La cranberry est devenue mon rituel de l’après-midi.',
    tst_1_by: 'Lotte — Gand',
    tst_2: 'Ginger & citrus le matin à la place d’un deuxième café. Énergie calme, sans nervosité.',
    tst_2_by: 'Sam — Anvers',
    tst_3: 'Goût clean, design superbe, et je me sens simplement bien. Exactement ce que je cherchais.',
    tst_3_by: 'Yasmine — Bruxelles',

    news_title: 'Ne manquez plus', news_title_em: 'aucun drop.',
    news_sub: 'Inscrivez-vous pour les nouvelles saveurs, les sorties et un conseil équilibre de temps en temps.',
    news_ph: 'vous@email.com', news_btn: 'S’inscrire', news_done: 'Bienvenue — vous êtes des nôtres. ☀',

    shop_view_title: 'La gamme', shop_view_sub: 'Sparkling fonctionnelle, dans votre couleur.',
    shop_badge_focus: 'Focus', shop_badge_boost: 'Boost', shop_badge_calm: 'Calm',

    prod_back: '← Retour à la boutique',
    prod_qty: 'Quantité', prod_format: 'Format',
    prod_fmt_can: 'Canette seule', prod_fmt_pack: 'Pack de ' + PACK_SIZE,
    prod_detail_ingredients: 'Ingrédients', prod_detail_nutrition: 'Valeurs nutritionnelles', prod_detail_how: 'Comment la boire',
    prod_ingredients_body: 'Eau pétillante, extrait naturel de fruits, minéraux fonctionnels (magnésium, inositol, L-théanine), arôme naturel. Liste complète des ingrédients [ingrédients] sur la canette.',
    prod_nutrition_body: 'Par canette de ' + CAN_ML + ' ml : [calories] kcal · sucre [teneur en sucre] · magnésium [mg magnésium] · inositol [mg inositol] · L-théanine [mg L-théanine].',
    prod_how_body: 'De préférence bien fraîche. Ne pas secouer, versez doucement et laissez les bulles faire le travail — le matin pour le focus, l’après-midi pour un reset tout en douceur.',
    prod_related: 'Aussi délicieux',
    prod_soon_note: 'Cette saveur arrive bientôt. Laissez votre e-mail et soyez prévenu·e en premier.',
    notify_me: 'Tenez-moi au courant', notify_done: 'Parfait — on vous fait signe. ☀',

    prod_cranberry_name: 'Cranberry',
    prod_cranberry_tagline: 'Rouge clair, esprit clair.',
    prod_cranberry_blurb: 'Fraîche, légèrement acidulée et vivifiante. Cranberry au cœur fonctionnel pour un focus net.',
    prod_cranberry_desc: 'Une cranberry rafraîchissante et légèrement acidulée, avec juste ce qu’il faut de mordant. Pas sucrée pour le sucre, mais équilibrée et clean — avec magnésium, inositol et L-théanine pour une énergie calme et nette tout au long de la journée.',
    prod_cranberry_taste: 'Acidulée · rafraîchissante · nette',

    prod_ginger_name: 'Ginger & Citrus',
    prod_ginger_tagline: 'Un boost doux et chaleureux.',
    prod_ginger_blurb: 'Le gingembre épicé rencontre l’agrume net. Un boost vif et chaleureux, sans la chute.',
    prod_ginger_desc: 'Un gingembre vif relevé d’un éclat d’agrumes. Juste assez de piquant pour vous réveiller, équilibré et rafraîchissant — avec des minéraux fonctionnels pour une énergie qui dure, sans nervosité.',
    prod_ginger_taste: 'Épicé · agrumes · vif',

    prod_vanille_name: 'Coing & Vanille',
    prod_vanille_tagline: 'Rond, chaud, apaisant.',
    prod_vanille_blurb: 'Coing tendre et vanille crémeuse. Notre saveur la plus douce — bientôt.',
    prod_vanille_desc: 'Le coing tendre rencontre la vanille chaleureuse dans notre saveur la plus apaisante. Ronde et rassurante, pensée pour la douceur de la fin de journée. Bientôt disponible.',
    prod_vanille_taste: 'Douce · crémeuse · ronde',

    benefit_focus: 'Focus', benefit_boost: 'Boost', benefit_calm: 'Calm',

    story_kicker: 'Notre histoire',
    story_title: 'Née de', story_title_em: 'l’équilibre.',
    story_lead: 'INRYOU est née d’une frustration toute simple : pourquoi devrait-on choisir entre une boisson qui a bon goût et une qui fait du bien ?',
    story_p1: 'Nous sommes une jeune marque belge convaincue qu’une boisson du quotidien peut être honnête et faire plaisir. Pas un soda ultra-sucré, pas une « boisson santé » clinique — juste des boissons naturelles et pétillantes au cœur fonctionnel, faites pour la vraie vie.',
    story_p2: 'Notre nom dit tout : in. r. you. Tout ce dont vous avez besoin est déjà en vous — nous donnons simplement un petit coup de pouce tranquille. D’où le petit soleil souriant : une énergie calme, jour après jour.',
    story_val_1: 'Le naturel d’abord', story_val_1_d: 'De vrais ingrédients, dosés en toute transparence. Pas de superflu.',
    story_val_2: 'Énergie calme', story_val_2_d: 'Fonctionnel, jamais excessif. L’équilibre avant le hype.',
    story_val_3: 'Savoir-faire belge', story_val_3_d: 'Imaginé et brassé localement, avec le souci du détail.',
    story_val_4: 'Pour tout le monde', story_val_4_d: 'Une boisson qui trouve sa place à chaque moment de la journée.',
    story_quote: '« Tout ce dont vous avez besoin est déjà en vous. »',

    balance_kicker: 'Natural Balance',
    balance_title: 'Fonctionnel,', balance_title_em: 'honnêtement dosé.',
    balance_lead: 'Trois ingrédients font le travail. Pas une longue liste de promesses — juste une combinaison réfléchie qui soutient votre journée.',
    balance_how_title: 'Comment ça marche',
    balance_how_1_t: 'Choisissez votre moment', balance_how_1_d: 'Focus le matin, boost vers midi, calm vers le soir.',
    balance_how_2_t: 'Buvez frais', balance_how_2_d: 'De préférence froide, versée doucement. Laissez les bulles et les minéraux agir.',
    balance_how_3_t: 'Sentez l’équilibre', balance_how_3_d: 'Une énergie calme et nette — sans pic de sucre ni chute.',
    balance_claim_note: 'Nous évitons sciemment les promesses exagérées. Les quantités exactes, valeurs nutritionnelles et éventuelles allégations santé [certifications] seront communiquées une fois les recettes finales fixées.',

    faq_kicker: 'FAQ', faq_title: 'Bon à', faq_title_em: 'savoir.',
    faq_q1: 'Qu’est-ce qui rend INRYOU fonctionnelle ?',
    faq_a1: 'Chaque canette contient une combinaison réfléchie de magnésium, d’inositol et de L-théanine. Nous communiquerons les quantités exactes [mg magnésium / inositol / L-théanine] dès que les recettes finales seront fixées.',
    faq_q2: 'Combien de sucre contient-elle ?',
    faq_a2: 'Volontairement peu. La teneur exacte en sucre [teneur en sucre] et les calories [calories] par canette de ' + CAN_ML + ' ml seront clairement indiquées sur la canette et ici une fois tout finalisé.',
    faq_q3: 'Est-ce naturel ?',
    faq_a3: 'Oui — nous utilisons des ingrédients et arômes naturels, sans colorants artificiels. La liste complète des ingrédients [ingrédients] figure sur chaque canette.',
    faq_q4: 'Où INRYOU est-elle fabriquée ?',
    faq_a4: 'INRYOU est une marque belge, imaginée et brassée localement avec le souci du détail.',
    faq_q5: 'Quel est le prix et comment commander ?',
    faq_a5: 'Vous commandez à la canette ou par pack de ' + PACK_SIZE + '. Les prix définitifs [prix par canette] / [prix par pack] apparaîtront ici ; vous pouvez déjà tout ajouter au panier et tester le parcours de commande.',
    faq_q6: 'Livrez-vous partout en Belgique et en Europe ?',
    faq_a6: 'C’est le plan. Les zones de livraison et frais de port seront communiqués au lancement officiel.',

    contact_kicker: 'Contact', contact_title: 'Dites', contact_title_em: 'bonjour.',
    contact_lead: 'Une question, une collaboration ou simplement un mot gentil ? On vous lit avec plaisir.',
    contact_name: 'Nom', contact_email: 'E-mail', contact_subject: 'Sujet', contact_message: 'Message',
    contact_send: 'Envoyer le message', contact_done: 'Merci — votre message est envoyé (démo). On revient vite vers vous. ☀',
    contact_or: 'Ou écrivez-nous directement', contact_email_addr: 'hallo@inryou.be',
    contact_follow: 'Suivez-nous',

    cart_title: 'Votre panier', cart_empty: 'Votre panier est encore vide.',
    cart_empty_cta: 'Découvrir les saveurs', cart_subtotal: 'Sous-total',
    cart_shipping_note: 'Les frais de livraison sont calculés au paiement.',
    cart_checkout: 'Paiement', cart_view_full: 'Voir le panier', cart_continue: 'Continuer mes achats',
    cart_remove: 'Retirer', cart_added: 'ajouté à votre panier',
    cart_view_title: 'Votre panier', cart_item: 'Article', cart_qty: 'Quantité', cart_price: 'Prix', cart_total: 'Total',
    checkout_stub: 'Le paiement n’est pas encore actif dans cette démo. Un prestataire de paiement sera branché ici plus tard.',

    footer_cta_kicker: 'Prêt·e pour votre équilibre ?',
    footer_cta_title: 'Drink Your', footer_cta_em: 'Balance.', footer_cta_btn: 'Voir la gamme',
    footer_tagline: 'natural balance, made effortless.',
    footer_col_shop: 'Boutique', footer_col_brand: 'Marque', footer_all_flavors: 'Toutes les saveurs',
    footer_news_title: 'Restez en équilibre', footer_news_sub: 'Nouvelles saveurs, drops et rituels. Pas de spam.',
    footer_news_ph: 'vous@email.com', footer_news_btn: 'S’inscrire', footer_news_done: 'Bienvenue — vous êtes des nôtres. ☀',
    legal_privacy: 'Confidentialité', legal_terms: 'Conditions', legal_cookies: 'Cookies',
  },

  /* =================== ENGLISH =================== */
  en: {
    nav_home: 'Home', nav_shop: 'Shop', nav_story: 'Our story',
    nav_balance: 'Natural Balance', nav_faq: 'FAQ', nav_contact: 'Contact',
    cta_shop: 'Shop the range', cta_discover: 'Discover the flavors',
    add_to_cart: 'Add to cart', adding: 'Added ✓', sold_out: 'Soon',
    from: 'from', per_can: 'per can', per_pack: 'per pack of ' + PACK_SIZE,

    hero_kicker: 'Belgian functional sparkling',
    hero_title_1: 'Natural balance,', hero_title_2: 'made effortless.',
    hero_sub: 'Sparkling, natural drinks with functional minerals — a calm, honest upgrade from soda. Less sugar, more balance. Entirely you.',
    hero_badge_1: 'Natural', hero_badge_2: 'Less sugar', hero_badge_3: '0 nonsense',

    trust_1: 'Natural ingredients', trust_1_sub: 'Nothing artificial, nothing too much.',
    trust_2: 'Functional minerals', trust_2_sub: 'Magnesium, inositol & L-theanine.',
    trust_3: 'Less sugar', trust_3_sub: '[sugar content] per ' + CAN_ML + ' ml can.',
    trust_4: 'Proudly Belgian', trust_4_sub: 'Imagined and brewed in Belgium.',

    feat_kicker: 'In the spotlight',
    feat_title: 'Cranberry,', feat_title_em: 'pure focus.',
    feat_text: 'Bright red, clear head. Our cranberry blends a fresh, lightly tart taste with functional minerals for calm, clear energy — without the crash.',
    feat_point_1: 'Refreshingly tart', feat_point_2: 'Functional boost', feat_point_3: 'No artificial sweeteners',
    feat_tab_focus: 'Focus', feat_tab_boost: 'Boost', feat_tab_calm: 'Calm',

    min_kicker: 'What’s inside',
    min_title: 'Healthy mineral', min_title_em: 'balance.',
    min_sub: 'Three functional ingredients, carefully dosed. No magic potion — just an honest everyday drink that works with you.',
    min_1_name: 'Magnesium', min_1_amt: '[mg magnesium]', min_1_desc: 'Supports normal nervous-system function and helps reduce tiredness.',
    min_2_name: 'Inositol', min_2_amt: '[mg inositol]', min_2_desc: 'A naturally occurring compound, loved for its role in mental calm.',
    min_3_name: 'L-theanine', min_3_amt: '[mg L-theanine]', min_3_desc: 'From green tea — known for calm, clear focus without the jitters.',
    min_foot: 'Exact dosages and claims will follow once the final recipes and certifications [certifications] are locked in.',

    cmp_kicker: 'We make',
    cmp_title: 'the', cmp_title_em: 'difference.',
    cmp_col_us: 'INRYOU', cmp_col_them: 'Classic soda',
    cmp_row_1: 'Sugar', cmp_us_1: '[sugar content]', cmp_them_1: 'Often 25g+ per can',
    cmp_row_2: 'Functional minerals', cmp_us_2: 'Yes', cmp_them_2: 'None',
    cmp_row_3: 'Artificial colors', cmp_us_3: 'None', cmp_them_3: 'Often',
    cmp_row_4: 'Taste', cmp_us_4: 'Natural & refreshing', cmp_them_4: 'Sweet & overpowering',
    cmp_row_5: 'How you feel after', cmp_us_5: 'Calm energy', cmp_them_5: 'Sugar crash',

    shop_kicker: 'Shop',
    shop_title: 'Choose your', shop_title_em: 'balance.',
    shop_sub: 'Two flavors to love, one on the way. Each in its own color and mood.',

    life_kicker: 'A new generation',
    life_title: 'Empowering the new', life_title_em: 'generation.',
    life_sub: 'Wherever life takes you — study, work, sport, rest. INRYOU adapts to your rhythm, not the other way around.',
    life_tag_1: 'Study', life_tag_2: 'Move', life_tag_3: 'Pause', life_tag_4: 'Create',

    tst_kicker: 'Tasted. Loved.',
    tst_title: 'What people', tst_title_em: 'say.',
    tst_1: 'Finally a sparkling drink that isn’t cloyingly sweet. The cranberry has become my afternoon ritual.',
    tst_1_by: 'Lotte — Ghent',
    tst_2: 'Ginger & citrus in the morning instead of a second coffee. Calm energy, no jitters.',
    tst_2_by: 'Sam — Antwerp',
    tst_3: 'Tastes clean, looks beautiful, and I just feel good about it. Exactly what I was after.',
    tst_3_by: 'Yasmine — Brussels',

    news_title: 'Never miss a', news_title_em: 'drop.',
    news_sub: 'Sign up for new flavors, releases and the occasional balance tip.',
    news_ph: 'you@email.com', news_btn: 'Sign up', news_done: 'Welcome — you’re in. ☀',

    shop_view_title: 'The range', shop_view_sub: 'Functional sparkling, in your color.',
    shop_badge_focus: 'Focus', shop_badge_boost: 'Boost', shop_badge_calm: 'Calm',

    prod_back: '← Back to shop',
    prod_qty: 'Quantity', prod_format: 'Format',
    prod_fmt_can: 'Single can', prod_fmt_pack: 'Pack of ' + PACK_SIZE,
    prod_detail_ingredients: 'Ingredients', prod_detail_nutrition: 'Nutrition', prod_detail_how: 'How to drink',
    prod_ingredients_body: 'Sparkling water, natural fruit extract, functional minerals (magnesium, inositol, L-theanine), natural flavor. Full ingredient list [ingredients] on the can.',
    prod_nutrition_body: 'Per ' + CAN_ML + ' ml can: [calories] kcal · sugar [sugar content] · magnesium [mg magnesium] · inositol [mg inositol] · L-theanine [mg L-theanine].',
    prod_how_body: 'Best well chilled. Don’t shake, pour gently and let the bubbles do the work — mornings for focus, afternoons for a calm reset.',
    prod_related: 'Also lovely',
    prod_soon_note: 'This flavor is coming soon. Leave your email and be the first to know.',
    notify_me: 'Notify me', notify_done: 'Great — we’ll be in touch. ☀',

    prod_cranberry_name: 'Cranberry',
    prod_cranberry_tagline: 'Bright red, clear head.',
    prod_cranberry_blurb: 'Fresh, lightly tart and reviving. Cranberry with a functional core for clear focus.',
    prod_cranberry_desc: 'A refreshingly tart cranberry with just enough bite. Not sweet for sweetness’ sake, but balanced and clean — with magnesium, inositol and L-theanine for calm, clear energy throughout your day.',
    prod_cranberry_taste: 'Tart · refreshing · clear',

    prod_ginger_name: 'Ginger & Citrus',
    prod_ginger_tagline: 'A gentle, warm boost.',
    prod_ginger_blurb: 'Spicy ginger meets bright citrus. A warm, lively boost without the crash.',
    prod_ginger_desc: 'Lively ginger with a bright citrus lift. Just enough spice to wake you up, balanced and refreshing — with functional minerals for energy that lasts, without the jitters.',
    prod_ginger_taste: 'Spicy · citrus · lively',

    prod_vanille_name: 'Quince & Vanilla',
    prod_vanille_tagline: 'Round, warm, soothing.',
    prod_vanille_blurb: 'Soft quince and creamy vanilla. Our calmest flavor — coming soon.',
    prod_vanille_desc: 'Soft quince meets warm vanilla in our most soothing flavor. Round and reassuring, made for the gentle end of the day. Coming soon.',
    prod_vanille_taste: 'Soft · creamy · round',

    benefit_focus: 'Focus', benefit_boost: 'Boost', benefit_calm: 'Calm',

    story_kicker: 'Our story',
    story_title: 'Born from', story_title_em: 'balance.',
    story_lead: 'INRYOU started with a simple frustration: why should you have to choose between something that tastes good and something that feels good?',
    story_p1: 'We’re a young Belgian brand that believes an everyday drink can be honest and a pleasure. Not a cloying soda, not a clinical “health drink” — just natural, sparkling drinks with a functional core, made for real life.',
    story_p2: 'Our name says it all: in. r. you. Everything you need is already in you — we just give it a small, quiet nudge. Hence the little smiling sun: calm energy, day after day.',
    story_val_1: 'Natural first', story_val_1_d: 'Real ingredients, transparently dosed. No nonsense.',
    story_val_2: 'Calm energy', story_val_2_d: 'Functional, but never over the top. Balance over hype.',
    story_val_3: 'Belgian craft', story_val_3_d: 'Locally imagined and brewed, with care for detail.',
    story_val_4: 'For everyone', story_val_4_d: 'A drink that fits every moment of your day.',
    story_quote: '“Everything you need is already in you.”',

    balance_kicker: 'Natural Balance',
    balance_title: 'Functional,', balance_title_em: 'honestly dosed.',
    balance_lead: 'Three ingredients do the work. Not a long list of promises — just a thoughtful combination that supports your day.',
    balance_how_title: 'How it works',
    balance_how_1_t: 'Pick your moment', balance_how_1_d: 'Focus in the morning, boost around midday, calm towards evening.',
    balance_how_2_t: 'Drink chilled', balance_how_2_d: 'Best cold, gently poured. Let the bubbles and minerals do their thing.',
    balance_how_3_t: 'Feel the balance', balance_how_3_d: 'Calm, clear energy — without the sugar spike and without the crash.',
    balance_claim_note: 'We deliberately avoid overblown promises. Exact amounts, nutrition and any health claims [certifications] will be shared once the final recipes are locked in.',

    faq_kicker: 'FAQ', faq_title: 'Good to', faq_title_em: 'know.',
    faq_q1: 'What makes INRYOU functional?',
    faq_a1: 'Every can contains a thoughtful combination of magnesium, inositol and L-theanine. We’ll share the exact amounts [mg magnesium / inositol / L-theanine] once the final recipes are locked in.',
    faq_q2: 'How much sugar is in it?',
    faq_a2: 'Deliberately little. The exact sugar content [sugar content] and calories [calories] per ' + CAN_ML + ' ml can will be clearly stated on the can and here once everything is final.',
    faq_q3: 'Is it natural?',
    faq_a3: 'Yes — we work with natural ingredients and flavors, without artificial colors. The full ingredient list [ingredients] is on every can.',
    faq_q4: 'Where is INRYOU made?',
    faq_a4: 'INRYOU is a Belgian brand, locally imagined and brewed with care for detail.',
    faq_q5: 'What does it cost and how do I order?',
    faq_a5: 'You order by single can or by pack of ' + PACK_SIZE + '. Final prices [price per can] / [price per pack] will appear here; you can already add everything to your cart and test the ordering flow.',
    faq_q6: 'Do you deliver across Belgium and Europe?',
    faq_a6: 'That’s the plan. Delivery zones and shipping costs will be shared at the official launch.',

    contact_kicker: 'Contact', contact_title: 'Say', contact_title_em: 'hello.',
    contact_lead: 'A question, a collaboration or just a kind word? We’d love to hear from you.',
    contact_name: 'Name', contact_email: 'Email', contact_subject: 'Subject', contact_message: 'Message',
    contact_send: 'Send message', contact_done: 'Thanks — your message has been sent (demo). We’ll get back to you soon. ☀',
    contact_or: 'Or email us directly', contact_email_addr: 'hallo@inryou.be',
    contact_follow: 'Follow us',

    cart_title: 'Your cart', cart_empty: 'Your cart is still empty.',
    cart_empty_cta: 'Discover the flavors', cart_subtotal: 'Subtotal',
    cart_shipping_note: 'Shipping is calculated at checkout.',
    cart_checkout: 'Proceed to payment', cart_view_full: 'View cart', cart_continue: 'Continue shopping',
    cart_remove: 'Remove', cart_added: 'added to your cart',
    cart_view_title: 'Your cart', cart_item: 'Item', cart_qty: 'Qty', cart_price: 'Price', cart_total: 'Total',
    checkout_stub: 'Payment isn’t active in this demo yet. A payment provider will be wired in here later.',

    footer_cta_kicker: 'Ready for your balance?',
    footer_cta_title: 'Drink Your', footer_cta_em: 'Balance.', footer_cta_btn: 'Shop the range',
    footer_tagline: 'natural balance, made effortless.',
    footer_col_shop: 'Shop', footer_col_brand: 'Brand', footer_all_flavors: 'All flavors',
    footer_news_title: 'Stay in balance', footer_news_sub: 'New flavors, drops and rituals. No spam.',
    footer_news_ph: 'you@email.com', footer_news_btn: 'Sign up', footer_news_done: 'Welcome — you’re in. ☀',
    legal_privacy: 'Privacy', legal_terms: 'Terms', legal_cookies: 'Cookies',
  },
};

/* ----------------------------------------------------------------------------
   3. STATE — language + cart, persisted in localStorage
   ---------------------------------------------------------------------------- */

const LS_LANG = 'inryou_lang';
const LS_CART = 'inryou_cart';

let lang = loadLang();
let cart = loadCart();

function loadLang() {
  try {
    const saved = localStorage.getItem(LS_LANG);
    if (saved && translations[saved]) return saved;
  } catch (e) {}
  return 'nl'; // Dutch default
}

function loadCart() {
  try {
    const raw = localStorage.getItem(LS_CART);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveLang() {
  try { localStorage.setItem(LS_LANG, lang); } catch (e) {}
}
function saveCart() {
  try { localStorage.setItem(LS_CART, JSON.stringify(cart)); } catch (e) {}
}

/* ----------------------------------------------------------------------------
   4. HELPERS
   ---------------------------------------------------------------------------- */

const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

// translate a key for the current language (falls back to NL, then the key)
function t(key) {
  const dict = translations[lang] || translations.nl;
  return (key in dict) ? dict[key] : (translations.nl[key] !== undefined ? translations.nl[key] : key);
}

// escape user-facing dynamic text inserted via innerHTML
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// European money format: € 2,50
function money(n) {
  return '€ ' + Number(n).toFixed(2).replace('.', ',');
}

// product display name from the i18n dict
function productName(id) {
  const keys = { cranberry: 'prod_cranberry_name', 'ginger-citrus': 'prod_ginger_name', vanille: 'prod_vanille_name' };
  return t(keys[id]);
}
function productKeyPrefix(id) {
  return { cranberry: 'prod_cranberry', 'ginger-citrus': 'prod_ginger', vanille: 'prod_vanille' }[id];
}

// ---- The signature SUN-AND-GRAIN motif --------------------------------------
// A half-circle (rising sun) with a soft radial gradient that DISSOLVES into
// accent-colored speckles at its lower edge, mirroring the INRYOU logo.
// Returns an <svg> string; unique ids prevent collisions across instances.
let _sunUid = 0;
function sunSvg(accent) {
  const uid = 'sun' + (_sunUid++);
  const light = lighten(accent, 0.45);
  return `
  <svg class="sun-svg" viewBox="0 0 600 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <radialGradient id="g-${uid}" cx="50%" cy="58%" r="62%">
        <stop offset="0%" stop-color="${light}"/>
        <stop offset="60%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="${accent}"/>
      </radialGradient>
      <linearGradient id="fs-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="52%" stop-color="#fff"/>
        <stop offset="84%" stop-color="#000"/>
      </linearGradient>
      <mask id="ms-${uid}"><rect x="0" y="0" width="600" height="420" fill="url(#fs-${uid})"/></mask>
      <linearGradient id="fg-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="46%" stop-color="#000"/>
        <stop offset="68%" stop-color="#fff"/>
        <stop offset="100%" stop-color="#000"/>
      </linearGradient>
      <mask id="mg-${uid}"><rect x="0" y="0" width="600" height="420" fill="url(#fg-${uid})"/></mask>
    </defs>
    <!-- solid disc, fading toward the horizon -->
    <circle cx="300" cy="250" r="172" fill="url(#g-${uid})" mask="url(#ms-${uid})"/>
    <!-- accent speckles in the dissolve band -->
    <g mask="url(#mg-${uid})">
      <rect x="70" y="80" width="460" height="340" fill="${accent}" filter="url(#grain-dots)"/>
    </g>
  </svg>`;
}

// lighten a hex color toward white by amount (0..1)
function lighten(hex, amt) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const m = (v) => Math.round(v + (255 - v) * amt);
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}

// a sun-motif block (div wrapper around the svg) sized via CSS
function sunBlock(accent, cls) {
  return `<div class="sun ${cls || ''}" style="--accent:${accent}">${sunSvg(accent)}</div>`;
}

// product image with graceful accent placeholder fallback
function productImg(id, cls) {
  const p = PRODUCTS[id];
  const name = esc(productName(id));
  // onerror swaps to a styled placeholder block in the accent color
  return `<img class="${cls || ''}" src="${p.image}" alt="${name} — INRYOU ${CAN_ML} ml"
    style="--accent:${p.accent}"
    onerror="this.onerror=null;this.classList.add('img-missing');this.removeAttribute('src');this.alt='${name}';">`;
}

/* ----------------------------------------------------------------------------
   5. CART LOGIC
   cart = [{ id, format: 'can'|'pack', qty }]
   ---------------------------------------------------------------------------- */

function unitPrice(item) {
  return item.format === 'pack' ? PRICE_PACK : PRICE_CAN;
}

function cartCount() {
  return cart.reduce((sum, it) => sum + it.qty, 0);
}

function cartSubtotal() {
  return cart.reduce((sum, it) => sum + unitPrice(it) * it.qty, 0);
}

function addToCart(id, format, qty) {
  format = format === 'pack' ? 'pack' : 'can';
  qty = Math.max(1, parseInt(qty, 10) || 1);
  const existing = cart.find((it) => it.id === id && it.format === format);
  if (existing) existing.qty += qty;
  else cart.push({ id, format, qty });
  saveCart();
  refreshCartUI();
  showToast(`${productName(id)} ${t('cart_added')}`);
  pulseBadge();
}

function setQty(id, format, qty) {
  const item = cart.find((it) => it.id === id && it.format === format);
  if (!item) return;
  item.qty = parseInt(qty, 10) || 1;
  if (item.qty < 1) removeItem(id, format);
  saveCart();
  refreshCartUI();
}

function removeItem(id, format) {
  cart = cart.filter((it) => !(it.id === id && it.format === format));
  saveCart();
  refreshCartUI();
}

/* ----------------------------------------------------------------------------
   6. CART UI — badge, drawer, and the in-page #/cart view body
   ---------------------------------------------------------------------------- */

function refreshCartUI() {
  // badge
  const badge = $('#cartBadge');
  const count = cartCount();
  if (badge) {
    badge.textContent = count;
    badge.dataset.count = count;
    badge.classList.toggle('is-visible', count > 0);
  }
  renderDrawer();
  // if currently on the cart view, re-render it
  if (currentRoute().path === '/cart') renderRoute();
}

function cartLineLabel(item) {
  const fmt = item.format === 'pack' ? t('prod_fmt_pack') : t('prod_fmt_can');
  return `${productName(item.id)} · ${fmt}`;
}

function renderDrawer() {
  const body = $('#drawerBody');
  const foot = $('#drawerFoot');
  if (!body || !foot) return;

  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty">
        <div class="cart-empty-sun">${sunSvg('#C8503F')}</div>
        <p>${esc(t('cart_empty'))}</p>
        <a href="#/shop" class="btn btn--primary" data-close-drawer>${esc(t('cart_empty_cta'))}</a>
      </div>`;
    foot.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map((it) => {
    const p = PRODUCTS[it.id];
    return `<div class="drawer-item">
        <div class="drawer-item-img" style="--accent:${p.accent}">${productImg(it.id, 'di-img')}</div>
        <div class="drawer-item-main">
          <p class="drawer-item-name">${esc(cartLineLabel(it))}</p>
          <p class="drawer-item-price">${money(unitPrice(it))}</p>
          <div class="qty">
            <button type="button" class="qty-btn" data-qty-dec data-id="${it.id}" data-format="${it.format}" aria-label="−">−</button>
            <span class="qty-val">${it.qty}</span>
            <button type="button" class="qty-btn" data-qty-inc data-id="${it.id}" data-format="${it.format}" aria-label="+">+</button>
          </div>
        </div>
        <div class="drawer-item-side">
          <span class="drawer-item-total">${money(unitPrice(it) * it.qty)}</span>
          <button type="button" class="link-remove" data-remove data-id="${it.id}" data-format="${it.format}">${esc(t('cart_remove'))}</button>
        </div>
      </div>`;
  }).join('');

  foot.innerHTML = `
    <div class="drawer-subtotal">
      <span>${esc(t('cart_subtotal'))}</span>
      <strong>${money(cartSubtotal())}</strong>
    </div>
    <p class="drawer-note">${esc(t('cart_shipping_note'))}</p>
    <button type="button" class="btn btn--primary btn--block" data-checkout>${esc(t('cart_checkout'))}</button>
    <a href="#/cart" class="btn btn--ghost btn--block" data-close-drawer>${esc(t('cart_view_full'))}</a>`;
}

function openDrawer() {
  $('#cartDrawer').classList.add('is-open');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  $('#drawerOverlay').hidden = false;
  requestAnimationFrame(() => $('#drawerOverlay').classList.add('is-open'));
  document.body.classList.add('no-scroll');
}
function closeDrawer() {
  $('#cartDrawer').classList.remove('is-open');
  $('#cartDrawer').setAttribute('aria-hidden', 'true');
  $('#drawerOverlay').classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  setTimeout(() => { $('#drawerOverlay').hidden = true; }, 300);
}

function pulseBadge() {
  const badge = $('#cartBadge');
  if (!badge) return;
  badge.classList.remove('pulse');
  void badge.offsetWidth; // reflow to restart animation
  badge.classList.add('pulse');
}

let toastTimer;
function showToast(msg) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 2200);
}

// STUB: checkout. A payment provider (Snipcart / Stripe / Shopify) gets wired
// in here later. We intentionally do NOT fake a real payment flow.
function handleCheckout() {
  // === PAYMENT PROVIDER INTEGRATION POINT =================================
  // e.g. Stripe Checkout session, Snipcart, or Shopify cart redirect.
  // For now we just inform the user this is a demo.
  // =======================================================================
  showToast(t('checkout_stub'));
}

/* ----------------------------------------------------------------------------
   7. VIEW TEMPLATES — each returns an HTML string for #view
   ---------------------------------------------------------------------------- */

// reusable: a product card (shop grid + home teaser)
function productCard(id) {
  const p = PRODUCTS[id];
  const pre = productKeyPrefix(id);
  const badge = t('benefit_' + p.benefit);
  const soon = p.comingSoon;
  return `<article class="prod-card reveal" style="--accent:${p.accent}">
      <a class="prod-card-link" href="#/product/${id}" aria-label="${esc(productName(id))}">
        <div class="prod-card-media">
          ${sunBlock(p.accent, 'sun--card')}
          ${productImg(id, 'prod-card-img')}
          <span class="prod-card-badge">${esc(badge)}</span>
          ${soon ? `<span class="prod-card-soon">${esc(t('sold_out'))}</span>` : ''}
        </div>
      </a>
      <div class="prod-card-body">
        <h3>${esc(productName(id))}</h3>
        <p class="prod-card-taste">${esc(t(pre + '_taste'))}</p>
        <p class="prod-card-blurb">${esc(t(pre + '_blurb'))}</p>
        <div class="prod-card-foot">
          <span class="prod-card-price">${t('from')} ${money(p.price)}</span>
          ${soon
            ? `<a href="#/product/${id}" class="btn btn--ghost btn--sm">${esc(t('sold_out'))}</a>`
            : `<button type="button" class="btn btn--primary btn--sm" data-add="${id}">${esc(t('add_to_cart'))}</button>`}
        </div>
      </div>
    </article>`;
}

function viewHome() {
  const cards = PRODUCT_ORDER.map(productCard).join('');
  return `
  <!-- HERO -->
  <section class="hero" style="--accent:${PRODUCTS.cranberry.accent}">
    <div class="hero-bg">${sunBlock(PRODUCTS.cranberry.accent, 'sun--hero')}</div>
    <div class="container hero-inner">
      <div class="hero-copy">
        <p class="kicker reveal">${esc(t('hero_kicker'))}</p>
        <h1 class="hero-title reveal">
          <span>${esc(t('hero_title_1'))}</span>
          <em>${esc(t('hero_title_2'))}</em>
        </h1>
        <p class="hero-sub reveal">${esc(t('hero_sub'))}</p>
        <div class="hero-cta reveal">
          <a href="#/shop" class="btn btn--primary">${esc(t('cta_shop'))}</a>
          <a href="#/balance" class="btn btn--ghost">${esc(t('cta_discover'))}</a>
        </div>
        <ul class="hero-badges reveal">
          <li>${esc(t('hero_badge_1'))}</li>
          <li>${esc(t('hero_badge_2'))}</li>
          <li>${esc(t('hero_badge_3'))}</li>
        </ul>
      </div>
      <div class="hero-visual reveal">
        <img src="images/can-in-hand.jpg" alt="${esc(t('prod_cranberry_name'))} INRYOU in de hand"
          class="hero-hand" onerror="this.style.display='none'">
        <img src="images/can-cranberry.png" alt="" class="hero-can hero-can--1" style="--accent:${PRODUCTS.cranberry.accent}" onerror="this.classList.add('img-missing');this.removeAttribute('src')">
      </div>
    </div>
  </section>

  <!-- TRUST ROW -->
  <section class="trust container">
    ${[1, 2, 3, 4].map((i) => `
      <div class="trust-item reveal">
        <span class="trust-icon">${trustIcon(i)}</span>
        <div><h3>${esc(t('trust_' + i))}</h3><p>${esc(t('trust_' + i + '_sub'))}</p></div>
      </div>`).join('')}
  </section>

  <!-- FEATURED -->
  <section class="feature" style="--accent:${PRODUCTS.cranberry.accent}">
    <div class="container feature-inner">
      <div class="feature-visual reveal">
        ${sunBlock(PRODUCTS.cranberry.accent, 'sun--feature')}
        ${productImg('cranberry', 'feature-can')}
      </div>
      <div class="feature-copy">
        <p class="kicker reveal">${esc(t('feat_kicker'))}</p>
        <h2 class="reveal">${esc(t('feat_title'))} <em>${esc(t('feat_title_em'))}</em></h2>
        <p class="feature-text reveal">${esc(t('feat_text'))}</p>
        <ul class="feature-points reveal">
          <li>${esc(t('feat_point_1'))}</li>
          <li>${esc(t('feat_point_2'))}</li>
          <li>${esc(t('feat_point_3'))}</li>
        </ul>
        <div class="feature-cta reveal">
          <button type="button" class="btn btn--primary" data-add="cranberry">${esc(t('add_to_cart'))}</button>
          <a href="#/product/cranberry" class="btn btn--ghost">${esc(t('prod_cranberry_name'))} →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- MINERALS -->
  <section class="minerals container">
    <div class="section-head reveal">
      <p class="kicker">${esc(t('min_kicker'))}</p>
      <h2>${esc(t('min_title'))} <em>${esc(t('min_title_em'))}</em></h2>
      <p class="section-sub">${esc(t('min_sub'))}</p>
    </div>
    <div class="mineral-grid">
      ${[1, 2, 3].map((i) => `
        <div class="mineral-card reveal">
          <span class="mineral-amt">${esc(t('min_' + i + '_amt'))}</span>
          <h3>${esc(t('min_' + i + '_name'))}</h3>
          <p>${esc(t('min_' + i + '_desc'))}</p>
        </div>`).join('')}
    </div>
    <p class="fineprint reveal">${esc(t('min_foot'))}</p>
  </section>

  <!-- COMPARE (dark) -->
  <section class="compare">
    <div class="container">
      <div class="section-head section-head--light reveal">
        <p class="kicker">${esc(t('cmp_kicker'))}</p>
        <h2>${esc(t('cmp_title'))} <em>${esc(t('cmp_title_em'))}</em></h2>
      </div>
      <div class="compare-table reveal">
        <div class="compare-row compare-row--head">
          <span></span>
          <span class="compare-us">${esc(t('cmp_col_us'))}</span>
          <span class="compare-them">${esc(t('cmp_col_them'))}</span>
        </div>
        ${[1, 2, 3, 4, 5].map((i) => `
          <div class="compare-row">
            <span class="compare-label">${esc(t('cmp_row_' + i))}</span>
            <span class="compare-us"><span class="dot dot--yes"></span>${esc(t('cmp_us_' + i))}</span>
            <span class="compare-them">${esc(t('cmp_them_' + i))}</span>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- SHOP TEASER -->
  <section class="shop-teaser container">
    <div class="section-head reveal">
      <p class="kicker">${esc(t('shop_kicker'))}</p>
      <h2>${esc(t('shop_title'))} <em>${esc(t('shop_title_em'))}</em></h2>
      <p class="section-sub">${esc(t('shop_sub'))}</p>
    </div>
    <div class="prod-grid">${cards}</div>
  </section>

  <!-- LIFESTYLE -->
  <section class="lifestyle container">
    <div class="section-head reveal">
      <p class="kicker">${esc(t('life_kicker'))}</p>
      <h2>${esc(t('life_title'))} <em>${esc(t('life_title_em'))}</em></h2>
      <p class="section-sub">${esc(t('life_sub'))}</p>
    </div>
    <div class="lifestyle-grid">
      ${['life_tag_1', 'life_tag_2', 'life_tag_3', 'life_tag_4'].map((k, idx) => `
        <div class="lifestyle-card reveal" style="--accent:${[PRODUCTS.cranberry.accent, PRODUCTS['ginger-citrus'].accent, PRODUCTS.vanille.accent, PRODUCTS.cranberry.accent][idx]}">
          ${sunBlock([PRODUCTS.cranberry.accent, PRODUCTS['ginger-citrus'].accent, PRODUCTS.vanille.accent, PRODUCTS.cranberry.accent][idx], 'sun--tile')}
          <span class="lifestyle-tag">${esc(t(k))}</span>
        </div>`).join('')}
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="tst container">
    <div class="section-head reveal">
      <p class="kicker">${esc(t('tst_kicker'))}</p>
      <h2>${esc(t('tst_title'))} <em>${esc(t('tst_title_em'))}</em></h2>
    </div>
    <div class="tst-grid">
      ${[1, 2, 3].map((i) => `
        <figure class="tst-card reveal">
          <div class="stars" aria-label="5/5">★★★★★</div>
          <blockquote>${esc(t('tst_' + i))}</blockquote>
          <figcaption>${esc(t('tst_' + i + '_by'))}</figcaption>
        </figure>`).join('')}
    </div>
  </section>

  <!-- NEWSLETTER (dark) -->
  <section class="news">
    <div class="container news-inner reveal">
      <div class="news-copy">
        <h2>${esc(t('news_title'))} <em>${esc(t('news_title_em'))}</em></h2>
        <p>${esc(t('news_sub'))}</p>
      </div>
      <form class="news-form news-form--lg" data-news>
        <input type="email" required placeholder="${esc(t('news_ph'))}" aria-label="Email">
        <button type="submit" class="btn btn--primary">${esc(t('news_btn'))}</button>
        <span class="news-ok" hidden>${esc(t('news_done'))}</span>
      </form>
    </div>
  </section>`;
}

function trustIcon(i) {
  const icons = {
    1: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 21c5-3 8-6.5 8-11a4 4 0 0 0-8-1 4 4 0 0 0-8 1c0 4.5 3 8 8 11Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 8c0 4-3 6-3 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    2: '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 4v8l5 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    3: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    4: '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 12h16M12 4c2.5 2.5 2.5 13 0 16M12 4c-2.5 2.5-2.5 13 0 16" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
  };
  return icons[i] || '';
}

function viewShop() {
  const cards = PRODUCT_ORDER.map(productCard).join('');
  return `
  <section class="page-head" style="--accent:${PRODUCTS.cranberry.accent}">
    <div class="page-head-bg">${sunBlock(PRODUCTS.cranberry.accent, 'sun--page')}</div>
    <div class="container">
      <p class="kicker reveal">${esc(t('shop_kicker'))}</p>
      <h1 class="reveal">${esc(t('shop_view_title'))}</h1>
      <p class="page-lead reveal">${esc(t('shop_view_sub'))}</p>
    </div>
  </section>
  <section class="container shop-page">
    <div class="prod-grid">${cards}</div>
  </section>`;
}

function viewProduct(id) {
  const p = PRODUCTS[id];
  if (!p) return viewNotFound();
  const pre = productKeyPrefix(id);
  const related = PRODUCT_ORDER.filter((x) => x !== id);
  const soon = p.comingSoon;

  const buyBlock = soon
    ? `<div class="soon-block">
        <p class="soon-note">${esc(t('prod_soon_note'))}</p>
        <form class="news-form" data-notify>
          <input type="email" required placeholder="${esc(t('news_ph'))}" aria-label="Email">
          <button type="submit" class="btn btn--primary">${esc(t('notify_me'))}</button>
          <span class="news-ok" hidden>${esc(t('notify_done'))}</span>
        </form>
      </div>`
    : `<div class="buy">
        <div class="buy-row">
          <label class="buy-field">
            <span>${esc(t('prod_format'))}</span>
            <select data-format-select>
              <option value="can">${esc(t('prod_fmt_can'))} — ${money(PRICE_CAN)}</option>
              <option value="pack">${esc(t('prod_fmt_pack'))} — ${money(PRICE_PACK)}</option>
            </select>
          </label>
          <div class="buy-field">
            <span>${esc(t('prod_qty'))}</span>
            <div class="qty qty--lg">
              <button type="button" class="qty-btn" data-pdp-dec aria-label="−">−</button>
              <span class="qty-val" data-pdp-qty>1</span>
              <button type="button" class="qty-btn" data-pdp-inc aria-label="+">+</button>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn--primary btn--block btn--lg" data-pdp-add="${id}">${esc(t('add_to_cart'))}</button>
      </div>`;

  return `
  <section class="pdp" style="--accent:${p.accent}">
    <div class="container">
      <a href="#/shop" class="pdp-back reveal">${esc(t('prod_back'))}</a>
      <div class="pdp-grid">
        <div class="pdp-visual reveal">
          ${sunBlock(p.accent, 'sun--pdp')}
          ${productImg(id, 'pdp-img')}
        </div>
        <div class="pdp-info">
          <span class="pdp-benefit reveal">${esc(t('benefit_' + p.benefit))}</span>
          <h1 class="reveal">${esc(productName(id))}</h1>
          <p class="pdp-tagline reveal">${esc(t(pre + '_tagline'))}</p>
          <p class="pdp-taste reveal">${esc(t(pre + '_taste'))} · ${CAN_ML} ml</p>
          <p class="pdp-price reveal">${t('from')} <strong>${money(p.price)}</strong> <span>${esc(t('per_can'))}</span></p>
          <p class="pdp-desc reveal">${esc(t(pre + '_desc'))}</p>
          <div class="reveal">${buyBlock}</div>
          <div class="pdp-details reveal">
            ${accordion(t('prod_detail_ingredients'), t('prod_ingredients_body'))}
            ${accordion(t('prod_detail_nutrition'), t('prod_nutrition_body'))}
            ${accordion(t('prod_detail_how'), t('prod_how_body'))}
          </div>
        </div>
      </div>

      <div class="pdp-related">
        <h2 class="reveal">${esc(t('prod_related'))}</h2>
        <div class="prod-grid prod-grid--2">${related.map(productCard).join('')}</div>
      </div>
    </div>
  </section>`;
}

// reusable accordion item (details/summary — works without JS)
function accordion(title, body) {
  return `<details class="acc">
      <summary>${esc(title)}<span class="acc-mark" aria-hidden="true">+</span></summary>
      <div class="acc-body"><p>${esc(body)}</p></div>
    </details>`;
}

function viewStory() {
  return `
  <section class="page-head" style="--accent:${PRODUCTS['ginger-citrus'].accent}">
    <div class="page-head-bg">${sunBlock(PRODUCTS['ginger-citrus'].accent, 'sun--page')}</div>
    <div class="container">
      <p class="kicker reveal">${esc(t('story_kicker'))}</p>
      <h1 class="reveal">${esc(t('story_title'))} <em>${esc(t('story_title_em'))}</em></h1>
      <p class="page-lead reveal">${esc(t('story_lead'))}</p>
    </div>
  </section>

  <section class="container story-body">
    <div class="story-prose">
      <p class="reveal">${esc(t('story_p1'))}</p>
      <p class="reveal">${esc(t('story_p2'))}</p>
    </div>
    <figure class="story-quote reveal">
      ${sunBlock(PRODUCTS.cranberry.accent, 'sun--quote')}
      <blockquote>${esc(t('story_quote'))}</blockquote>
    </figure>
  </section>

  <section class="container values">
    <div class="values-grid">
      ${[1, 2, 3, 4].map((i) => `
        <div class="value-card reveal">
          <span class="value-num">0${i}</span>
          <h3>${esc(t('story_val_' + i))}</h3>
          <p>${esc(t('story_val_' + i + '_d'))}</p>
        </div>`).join('')}
    </div>
  </section>`;
}

function viewBalance() {
  return `
  <section class="page-head" style="--accent:${PRODUCTS.cranberry.accent}">
    <div class="page-head-bg">${sunBlock(PRODUCTS.cranberry.accent, 'sun--page')}</div>
    <div class="container">
      <p class="kicker reveal">${esc(t('balance_kicker'))}</p>
      <h1 class="reveal">${esc(t('balance_title'))} <em>${esc(t('balance_title_em'))}</em></h1>
      <p class="page-lead reveal">${esc(t('balance_lead'))}</p>
    </div>
  </section>

  <section class="container minerals">
    <div class="mineral-grid">
      ${[1, 2, 3].map((i) => `
        <div class="mineral-card reveal">
          <span class="mineral-amt">${esc(t('min_' + i + '_amt'))}</span>
          <h3>${esc(t('min_' + i + '_name'))}</h3>
          <p>${esc(t('min_' + i + '_desc'))}</p>
        </div>`).join('')}
    </div>
  </section>

  <section class="how">
    <div class="container">
      <div class="section-head section-head--light reveal">
        <h2>${esc(t('balance_how_title'))}</h2>
      </div>
      <div class="how-grid">
        ${[1, 2, 3].map((i) => `
          <div class="how-step reveal">
            <span class="how-num">${i}</span>
            <h3>${esc(t('balance_how_' + i + '_t'))}</h3>
            <p>${esc(t('balance_how_' + i + '_d'))}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="container">
    <p class="fineprint fineprint--center reveal">${esc(t('balance_claim_note'))}</p>
    <div class="balance-cta reveal">
      <a href="#/shop" class="btn btn--primary">${esc(t('cta_shop'))}</a>
    </div>
  </section>`;
}

function viewFaq() {
  const items = [1, 2, 3, 4, 5, 6].map((i) =>
    accordion(t('faq_q' + i), t('faq_a' + i))
  ).join('');
  return `
  <section class="page-head" style="--accent:${PRODUCTS.vanille.accent}">
    <div class="page-head-bg">${sunBlock(PRODUCTS.vanille.accent, 'sun--page')}</div>
    <div class="container">
      <p class="kicker reveal">${esc(t('faq_kicker'))}</p>
      <h1 class="reveal">${esc(t('faq_title'))} <em>${esc(t('faq_title_em'))}</em></h1>
    </div>
  </section>
  <section class="container faq">
    <div class="faq-list reveal">${items}</div>
  </section>`;
}

function viewContact() {
  return `
  <section class="page-head" style="--accent:${PRODUCTS['ginger-citrus'].accent}">
    <div class="page-head-bg">${sunBlock(PRODUCTS['ginger-citrus'].accent, 'sun--page')}</div>
    <div class="container">
      <p class="kicker reveal">${esc(t('contact_kicker'))}</p>
      <h1 class="reveal">${esc(t('contact_title'))} <em>${esc(t('contact_title_em'))}</em></h1>
      <p class="page-lead reveal">${esc(t('contact_lead'))}</p>
    </div>
  </section>

  <section class="container contact">
    <form class="contact-form reveal" data-contact>
      <div class="field-row">
        <label class="field"><span>${esc(t('contact_name'))}</span><input type="text" required></label>
        <label class="field"><span>${esc(t('contact_email'))}</span><input type="email" required></label>
      </div>
      <label class="field"><span>${esc(t('contact_subject'))}</span><input type="text"></label>
      <label class="field"><span>${esc(t('contact_message'))}</span><textarea rows="5" required></textarea></label>
      <button type="submit" class="btn btn--primary">${esc(t('contact_send'))}</button>
      <p class="contact-ok" hidden>${esc(t('contact_done'))}</p>
    </form>
    <aside class="contact-aside reveal">
      ${sunBlock(PRODUCTS['ginger-citrus'].accent, 'sun--quote')}
      <div class="contact-aside-inner">
        <h3>${esc(t('contact_or'))}</h3>
        <a class="contact-mail" href="mailto:${esc(t('contact_email_addr'))}">${esc(t('contact_email_addr'))}</a>
        <h3 class="contact-follow">${esc(t('contact_follow'))}</h3>
        <div class="footer-social">
          <a href="#/" aria-label="Instagram"><svg viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg></a>
          <a href="#/" aria-label="TikTok"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M14 4c.5 2.6 2.2 4.2 4.7 4.4v2.7c-1.6 0-3.1-.5-4.4-1.4v5.6a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.1v2.8a2.6 2.6 0 1 0 1.8 2.5V4H14Z" fill="currentColor"/></svg></a>
        </div>
      </div>
    </aside>
  </section>`;
}

function viewCart() {
  if (cart.length === 0) {
    return `
    <section class="container cart-view">
      <h1 class="reveal">${esc(t('cart_view_title'))}</h1>
      <div class="cart-empty cart-empty--page">
        <div class="cart-empty-sun">${sunSvg('#C8503F')}</div>
        <p>${esc(t('cart_empty'))}</p>
        <a href="#/shop" class="btn btn--primary">${esc(t('cart_empty_cta'))}</a>
      </div>
    </section>`;
  }

  const rows = cart.map((it) => {
    const p = PRODUCTS[it.id];
    return `<div class="cart-line">
        <div class="cart-line-prod">
          <div class="cart-line-img" style="--accent:${p.accent}">${productImg(it.id, 'cl-img')}</div>
          <div>
            <p class="cart-line-name">${esc(productName(it.id))}</p>
            <p class="cart-line-fmt">${esc(it.format === 'pack' ? t('prod_fmt_pack') : t('prod_fmt_can'))}</p>
            <button type="button" class="link-remove" data-remove data-id="${it.id}" data-format="${it.format}">${esc(t('cart_remove'))}</button>
          </div>
        </div>
        <div class="cart-line-qty">
          <div class="qty">
            <button type="button" class="qty-btn" data-qty-dec data-id="${it.id}" data-format="${it.format}" aria-label="−">−</button>
            <span class="qty-val">${it.qty}</span>
            <button type="button" class="qty-btn" data-qty-inc data-id="${it.id}" data-format="${it.format}" aria-label="+">+</button>
          </div>
        </div>
        <div class="cart-line-price">${money(unitPrice(it))}</div>
        <div class="cart-line-total">${money(unitPrice(it) * it.qty)}</div>
      </div>`;
  }).join('');

  return `
  <section class="container cart-view">
    <h1 class="reveal">${esc(t('cart_view_title'))}</h1>
    <div class="cart-table reveal">
      <div class="cart-line cart-line--head">
        <span>${esc(t('cart_item'))}</span>
        <span>${esc(t('cart_qty'))}</span>
        <span>${esc(t('cart_price'))}</span>
        <span>${esc(t('cart_total'))}</span>
      </div>
      ${rows}
    </div>
    <div class="cart-summary reveal">
      <a href="#/shop" class="btn btn--ghost">${esc(t('cart_continue'))}</a>
      <div class="cart-summary-box">
        <div class="cart-summary-row">
          <span>${esc(t('cart_subtotal'))}</span>
          <strong>${money(cartSubtotal())}</strong>
        </div>
        <p class="drawer-note">${esc(t('cart_shipping_note'))}</p>
        <button type="button" class="btn btn--primary btn--block btn--lg" data-checkout>${esc(t('cart_checkout'))}</button>
      </div>
    </div>
  </section>`;
}

function viewNotFound() {
  return `<section class="container cart-view">
      <h1>404</h1>
      <p class="page-lead">— <a href="#/">Home</a></p>
    </section>`;
}

/* ----------------------------------------------------------------------------
   8. ROUTER — hash based, works from file://
   Routes: #/  #/shop  #/product/:id  #/story  #/balance  #/faq  #/contact  #/cart
   ---------------------------------------------------------------------------- */

function currentRoute() {
  let hash = window.location.hash.replace(/^#/, '');
  if (!hash || hash === '/') return { path: '/', parts: [] };
  // normalize: strip leading slash, split
  const clean = hash.replace(/^\//, '');
  const parts = clean.split('/').filter(Boolean);
  return { path: '/' + parts.join('/'), parts };
}

function renderRoute() {
  const route = currentRoute();
  const view = $('#view');
  const parts = route.parts;
  let html = '';
  let activeNav = '/';

  if (parts.length === 0) { html = viewHome(); activeNav = '/'; }
  else if (parts[0] === 'shop') { html = viewShop(); activeNav = '/shop'; }
  else if (parts[0] === 'product') { html = viewProduct(parts[1]); activeNav = '/shop'; }
  else if (parts[0] === 'story') { html = viewStory(); activeNav = '/story'; }
  else if (parts[0] === 'balance') { html = viewBalance(); activeNav = '/balance'; }
  else if (parts[0] === 'faq') { html = viewFaq(); activeNav = '/faq'; }
  else if (parts[0] === 'contact') { html = viewContact(); activeNav = '/contact'; }
  else if (parts[0] === 'cart') { html = viewCart(); activeNav = ''; }
  else { html = viewNotFound(); }

  view.innerHTML = html;

  // active nav highlight
  $$('#mainNav a').forEach((a) => {
    a.classList.toggle('is-active', a.getAttribute('data-route') === activeNav);
  });

  // scroll resets to top on navigation
  window.scrollTo(0, 0);

  // wire up dynamic content + reveal animations
  observeReveals();
}

/* ----------------------------------------------------------------------------
   9. i18n APPLICATION
   ---------------------------------------------------------------------------- */

function applyStaticI18n() {
  // text nodes
  $$('[data-i18n]').forEach((elx) => {
    elx.textContent = t(elx.getAttribute('data-i18n'));
  });
  // placeholders
  $$('[data-i18n-ph]').forEach((elx) => {
    elx.setAttribute('placeholder', t(elx.getAttribute('data-i18n-ph')));
  });
  // <html lang>
  document.documentElement.setAttribute('lang', lang);
  // active state on language buttons
  $$('.lang-switch button').forEach((b) => {
    b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
  });
}

function setLang(next) {
  if (!translations[next] || next === lang) return;
  lang = next;
  saveLang();
  applyStaticI18n();
  renderRoute();      // re-render the active view in the new language
  refreshCartUI();    // drawer + badge labels
}

/* ----------------------------------------------------------------------------
   reveal-on-scroll animation
   ---------------------------------------------------------------------------- */
let revealObserver;
function observeReveals() {
  const els = $$('.reveal:not(.is-in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('is-in'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }
  els.forEach((e, i) => {
    e.style.setProperty('--reveal-delay', (i % 6) * 60 + 'ms');
    revealObserver.observe(e);
  });
}

/* ----------------------------------------------------------------------------
   10. INIT & EVENT WIRING
   ---------------------------------------------------------------------------- */

function init() {
  $('#year').textContent = new Date().getFullYear();

  applyStaticI18n();
  renderRoute();
  refreshCartUI();

  // routing
  window.addEventListener('hashchange', renderRoute);

  // language switchers (header + footer) via delegation
  document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('[data-lang]');
    if (langBtn) { setLang(langBtn.getAttribute('data-lang')); return; }
  });

  // cart drawer open/close
  $('#cartBtn').addEventListener('click', openDrawer);
  $('#drawerClose').addEventListener('click', closeDrawer);
  $('#drawerOverlay').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  // mobile menu
  const menuToggle = $('#menuToggle');
  menuToggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close mobile menu when a nav link is tapped
  $('#mainNav').addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      document.body.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // header shadow on scroll
  window.addEventListener('scroll', () => {
    $('#siteHeader').classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive: true });

  // ---- delegated clicks for cart actions across all views ----
  document.addEventListener('click', (e) => {
    // add to cart (cards, feature) — default single can
    const add = e.target.closest('[data-add]');
    if (add) { addToCart(add.getAttribute('data-add'), 'can', 1); openDrawer(); return; }

    // PDP add to cart (respects format + qty)
    const pdpAdd = e.target.closest('[data-pdp-add]');
    if (pdpAdd) {
      const id = pdpAdd.getAttribute('data-pdp-add');
      const fmt = $('[data-format-select]') ? $('[data-format-select]').value : 'can';
      const qty = parseInt($('[data-pdp-qty]').textContent, 10) || 1;
      addToCart(id, fmt, qty);
      openDrawer();
      return;
    }

    // PDP quantity steppers
    if (e.target.closest('[data-pdp-inc]') || e.target.closest('[data-pdp-dec]')) {
      const span = $('[data-pdp-qty]');
      let v = parseInt(span.textContent, 10) || 1;
      v += e.target.closest('[data-pdp-inc]') ? 1 : -1;
      span.textContent = Math.max(1, v);
      return;
    }

    // cart line quantity steppers (drawer + cart view)
    const inc = e.target.closest('[data-qty-inc]');
    const dec = e.target.closest('[data-qty-dec]');
    if (inc || dec) {
      const btn = inc || dec;
      const id = btn.getAttribute('data-id');
      const fmt = btn.getAttribute('data-format');
      const item = cart.find((it) => it.id === id && it.format === fmt);
      if (item) setQty(id, fmt, item.qty + (inc ? 1 : -1));
      return;
    }

    // remove line
    const rm = e.target.closest('[data-remove]');
    if (rm) { removeItem(rm.getAttribute('data-id'), rm.getAttribute('data-format')); return; }

    // checkout (stub)
    if (e.target.closest('[data-checkout]')) { handleCheckout(); return; }

    // close drawer on internal nav within it
    if (e.target.closest('[data-close-drawer]')) { closeDrawer(); return; }
  });

  // ---- delegated form submits (newsletter / notify / contact) ----
  document.addEventListener('submit', (e) => {
    const form = e.target;

    if (form.matches('[data-news], #footerNews')) {
      e.preventDefault();
      const ok = $('.news-ok', form);
      if (ok) { ok.hidden = false; }
      const note = $('#footerNewsNote');
      if (form.id === 'footerNews' && note) note.hidden = false;
      form.reset();
      showToast(t('news_done'));
      return;
    }
    if (form.matches('[data-notify]')) {
      e.preventDefault();
      const ok = $('.news-ok', form);
      if (ok) ok.hidden = false;
      form.reset();
      showToast(t('notify_done'));
      return;
    }
    if (form.matches('[data-contact]')) {
      e.preventDefault();
      const ok = $('.contact-ok', form);
      if (ok) ok.hidden = false;
      form.reset();
      return;
    }
  });

  // subtle parallax on the hero sun
  window.addEventListener('scroll', () => {
    const sun = $('.sun--hero .sun-svg');
    if (sun) sun.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', init);
