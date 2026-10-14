// Données de démonstration — à ajuster avant mise en ligne.
export type Origin = {
  country: string;
  region: string;
  variety: "Arabica" | "Robusta";
  process: string;
  notes: string[];
  availability: "Disponible" | "Sur commande";
};

export const origins: Origin[] = [
  { country: "Brésil", region: "Sul de Minas", variety: "Arabica", process: "Nature", notes: ["Chocolat au lait", "Noisette", "Caramel"], availability: "Disponible" },
  { country: "Éthiopie", region: "Sidamo", variety: "Arabica", process: "Lavé", notes: ["Jasmin", "Agrumes", "Thé noir"], availability: "Sur commande" },
  { country: "Colombie", region: "Huila", variety: "Arabica", process: "Lavé", notes: ["Pomme rouge", "Panela", "Cacao"], availability: "Disponible" },
  { country: "Ouganda", region: "Masaka", variety: "Robusta", process: "Nature", notes: ["Cacao amer", "Épices", "Céréales grillées"], availability: "Disponible" },
  { country: "Vietnam", region: "Đắk Lắk", variety: "Robusta", process: "Nature", notes: ["Chocolat noir", "Malt", "Boisé"], availability: "Disponible" },
  { country: "Inde", region: "Karnataka", variety: "Robusta", process: "Lavé", notes: ["Épices douces", "Cacao", "Tabac blond"], availability: "Sur commande" },
];
