// Données de démonstration — à ajuster avant mise en ligne.
export type Product = {
  name: string;
  profile: string;
  roast: "Claire" | "Moyenne" | "Foncée";
  origin: string;
  format: string;
};

export const products: Product[] = [
  { name: "Mélange Maison", profile: "Équilibré, notes de chocolat au lait et de noisette", roast: "Moyenne", origin: "Assemblage Brésil · Colombie", format: "Grains ou moulu · sacs de 1 kg et 5 kg" },
  { name: "Mélange Intense", profile: "Corsé, crème épaisse, finale cacao amer", roast: "Foncée", origin: "Assemblage Brésil · Ouganda", format: "Grains ou moulu · sacs de 1 kg et 5 kg" },
  { name: "Mélange Doux", profile: "Léger et rond, notes de caramel et de fruits secs", roast: "Claire", origin: "Assemblage Brésil · Éthiopie", format: "Grains ou moulu · sacs de 1 kg" },
  { name: "Pure origine Colombie", profile: "Fruité et sucré, pomme rouge et panela", roast: "Moyenne", origin: "Colombie", format: "Grains ou moulu · sacs de 1 kg" },
  { name: "Pure origine Brésil", profile: "Rond, peu acide, chocolat et caramel", roast: "Foncée", origin: "Brésil", format: "Grains ou moulu · sacs de 1 kg et 5 kg" },
];
