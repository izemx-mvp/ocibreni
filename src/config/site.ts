// Toutes les informations de l'entreprise — à vérifier avant mise en ligne.
export const site = {
  name: "OCIBRENI",
  tagline: "Torréfacteur marque blanche à Casablanca",
  shortPitch:
    "Importation, torréfaction et conditionnement dans notre usine de Tit Mellil, pour votre marque de café.",
  address: "Km 17, route nationale n° 9, 20640 Tit Mellil", // à confirmer
  city: "Tit Mellil, Casablanca",
  phone: "+212 6 01 60 32 54", // à confirmer
  phoneHref: "tel:+212601603254",
  whatsapp: "212601603254", // à confirmer
  email: "contact@ocibreni.ma", // à confirmer
  mapQuery: "Tit Mellil, Casablanca, Maroc",
} as const;

export const whatsappLink = (text = "Bonjour OCIBRENI, je souhaite des informations.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { to: "/", label: "Accueil" },
  { to: "/marque-blanche", label: "Marque blanche" },
  { to: "/cafe-torrefie-vrac", label: "Café en vrac" },
  { to: "/cafe-vert", label: "Café vert" },
  { to: "/notre-usine", label: "Notre usine" },
  { to: "/contact", label: "Contact" },
] as const;
