export interface Retailer {
  name: string;
  type: string;
  address: string;
  postcode: string;
  city: string;
}

export const retailers: Retailer[] = [
  { name: "Bio-Planet Antwerpen", type: "Biowinkel", address: "Nationalestraat 112", postcode: "2000", city: "Antwerpen" },
  { name: "Delhaize Meir", type: "Supermarkt", address: "Meir 78", postcode: "2000", city: "Antwerpen" },
  { name: "Frais & Fin", type: "Speciaalzaak", address: "Kloosterstraat 41", postcode: "2000", city: "Antwerpen" },
  { name: "Origin Coffee Bar", type: "Horeca", address: "Volkstraat 19", postcode: "2000", city: "Antwerpen" },

  { name: "Bio-Planet Gent", type: "Biowinkel", address: "Brabantdam 55", postcode: "9000", city: "Gent" },
  { name: "Carrefour Market Zuid", type: "Supermarkt", address: "Woodrow Wilsonplein 4", postcode: "9000", city: "Gent" },
  { name: "Mokabon", type: "Horeca", address: "Donkersteeg 35", postcode: "9000", city: "Gent" },

  { name: "Färm Sablon", type: "Biowinkel", address: "Rue de Rollebeek 18", postcode: "1000", city: "Brussel" },
  { name: "Delhaize Flagey", type: "Supermarkt", address: "Place Eugène Flagey 12", postcode: "1050", city: "Brussel" },
  { name: "OR Espresso Bar", type: "Horeca", address: "Auguste Ortsstraat 9", postcode: "1000", city: "Brussel" },

  { name: "Bio-Planet Leuven", type: "Biowinkel", address: "Diestsestraat 130", postcode: "3000", city: "Leuven" },
  { name: "Cru Leuven", type: "Speciaalzaak", address: "Bondgenotenlaan 76", postcode: "3000", city: "Leuven" },

  { name: "Delhaize Steenstraat", type: "Supermarkt", address: "Steenstraat 55", postcode: "8000", city: "Brugge" },
  { name: "Li-O Concept Store", type: "Speciaalzaak", address: "Langestraat 12", postcode: "8000", city: "Brugge" },

  { name: "Bio-Planet Hasselt", type: "Biowinkel", address: "Kuringersteenweg 40", postcode: "3500", city: "Hasselt" },
  { name: "Carrefour Market Mechelen", type: "Supermarkt", address: "Bruul 44", postcode: "2800", city: "Mechelen" },
  { name: "Broei Kortrijk", type: "Horeca", address: "Handboogstraat 9", postcode: "8500", city: "Kortrijk" },
  { name: "Delhaize Oostende", type: "Supermarkt", address: "Kapellestraat 84", postcode: "8400", city: "Oostende" },
];

export const retailerCount = retailers.length;
export const cityCount = new Set(retailers.map((r) => r.city)).size;
