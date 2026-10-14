// Données de démonstration — à ajuster avant mise en ligne.
export type FaqItem = { q: string; a: string };

export const homeFaq: FaqItem[] = [
  {
    q: "Quel est le minimum de commande ?",
    a: "Pour une première production en marque blanche, nous démarrons à partir de 50 kg de café torréfié. Pour le café en vrac, les commandes commencent à 10 kg.",
  },
  {
    q: "Quel emballage dois-je fournir ?",
    a: "Vos sachets imprimés, avec valve de dégazage, au format de votre choix (250 g, 500 g ou 1 kg). Nous vous orientons vers des fournisseurs d’emballage si vous n’en avez pas encore.",
  },
  {
    q: "Quels sont les délais de production ?",
    a: "Comptez 7 à 10 jours ouvrés entre la validation de la commande et la livraison, une fois votre formule et vos emballages réceptionnés.",
  },
  {
    q: "Ma formule reste-t-elle confidentielle ?",
    a: "Oui. Votre formule est enregistrée à votre nom, elle n’est ni partagée ni revendue à un autre client, et nous pouvons signer un accord de confidentialité.",
  },
  {
    q: "Livrez-vous hors de Casablanca ?",
    a: "Oui, nous livrons partout au Maroc par transporteur. Les grandes villes (Rabat, Marrakech, Tanger, Fès, Agadir) sont desservies en 24 à 72 heures.",
  },
];

export const marqueBlancheFaq: FaqItem[] = [
  {
    q: "Faut-il avoir son propre local ou sa propre torréfactrice ?",
    a: "Non. Nous torréfions et conditionnons dans notre usine de Tit Mellil. Vous recevez un café prêt à vendre, sans investir dans du matériel.",
  },
  {
    q: "Que dois-je fournir pour lancer ma marque ?",
    a: "Votre emballage imprimé et votre cahier des charges de goût. Nous nous occupons du café vert, de la torréfaction et du conditionnement.",
  },
  {
    q: "Comment est défini le goût de mon café ?",
    a: "Lors d’une séance de dégustation, nous vous faisons goûter plusieurs profils. Nous ajustons ensuite le mélange et la torréfaction jusqu’à votre validation.",
  },
  {
    q: "Mon mélange sera-t-il toujours identique ?",
    a: "Oui. Votre formule (origines, proportions, courbe de torréfaction) est enregistrée et contrôlée par dégustation à chaque production.",
  },
  {
    q: "Proposez-vous du café en grains et du café moulu ?",
    a: "Les deux. Nous moulons à la finesse adaptée à l’usage de vos clients : espresso, filtre ou cafetière italienne.",
  },
];
