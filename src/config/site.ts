// Toutes les informations de l'entreprise — à vérifier avant mise en ligne.
export const site = {
  name: "OCIBRENI",
  tagline: "Torréfacteur marque blanche à Casablanca",
  shortPitch:
    "Importation, torréfaction et conditionnement dans notre usine de Tit Mellil, pour votre marque de café.",
  address: "Km 17, route nationale n° 9, 20640 Tit Mellil", // TODO: à confirmer
  city: "Tit Mellil, Casablanca",
  phone: "+212 6 01 60 32 54", // TODO: à confirmer
  phoneHref: "tel:+212601603254", // TODO: à confirmer
  whatsapp: "212601603254", // TODO: à confirmer
  email: "contact@ocibreni.ma", // TODO: à confirmer
  hours: "Lun–ven 8 h 30 – 18 h · Sam 9 h – 13 h", // TODO: à confirmer
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

/** Valeurs acceptées par /contact?type=… */
export const contactTypes = ["degustation", "marque-blanche", "vrac", "vert", "autre"] as const;
export type ContactType = (typeof contactTypes)[number];
