import type { QuickCard } from "./types";

// Fiches du mode "Je suis à bord" : très peu de texte, lecture en quelques secondes.
// Les fiches de sécurité/priorité/VHF résument des règles officielles ou des bonnes
// pratiques ; elles sont volontairement simplifiées et ne remplacent ni une formation
// encadrée, ni les textes réglementaires complets (voir l'alerte de chaque fiche).

export const quickCards: QuickCard[] = [
  {
    id: "qc-virer-de-bord",
    categorie: "manoeuvres",
    titre: "Virer de bord",
    sections: [
      { titre: "Avant", items: ["Vérifier l'espace autour", "Prévenir l'équipage : « Paré à virer »", "Choquer légèrement l'écoute sous le vent"] },
      { titre: "Pendant", items: ["Barre progressivement mise sous le vent", "Le bateau passe face au vent", "Changer de bord, border la voile côté opposé"] },
    ],
    alerte: "Ne pas rester sous la bôme pendant le changement de bord.",
  },
  {
    id: "qc-empanner",
    categorie: "manoeuvres",
    titre: "Empanner",
    sections: [
      { titre: "Avant", items: ["Vérifier l'espace arrière", "Prévenir l'équipage : « Paré à empanner »", "Border la grand-voile au maximum avant le passage"] },
      { titre: "Pendant", items: ["Barre progressivement mise au vent", "Le vent passe d'un arrière à l'autre", "La bôme traverse rapidement : garder l'écoute en main"] },
    ],
    alerte: "Ne jamais rester dans la trajectoire de la bôme.",
  },
  {
    id: "qc-priorites-de-base",
    categorie: "priorites",
    titre: "Priorités entre voiliers (bases)",
    sections: [
      { titre: "Amures différentes", items: ["Le bateau bâbord amure s'écarte", "Le bateau tribord amure est prioritaire"] },
      { titre: "Même amure", items: ["Le bateau au vent s'écarte", "Le bateau sous le vent est prioritaire"] },
      { titre: "Voilier vs moteur", items: ["En général, le bateau à moteur s'écarte du voilier", "Exceptions : pêche, navire contraint par son tirant d'eau, etc."] },
    ],
    alerte: "Résumé simplifié du RIPAM. Ne remplace pas une formation encadrée ni les textes réglementaires complets.",
  },
  {
    id: "qc-vocabulaire-express",
    categorie: "vocabulaire",
    titre: "Vocabulaire express",
    sections: [
      { titre: "Bateau", items: ["Proue = avant", "Poupe = arrière", "Tribord = droite", "Bâbord = gauche"] },
      { titre: "Manœuvre", items: ["Border = tendre un cordage", "Choquer = relâcher un cordage", "Hisser = monter une voile", "Affaler = descendre une voile"] },
    ],
  },
  {
    id: "qc-checklist-securite",
    categorie: "checklists",
    titre: "Checklist avant de partir",
    sections: [
      { titre: "Équipement", items: ["Gilets à bord et accessibles", "VHF chargée, canal 16 vérifié", "Trousse de secours à bord", "Ancre et ligne de mouillage prêtes"] },
      { titre: "Avant le départ", items: ["Météo consultée", "Niveau de carburant vérifié", "Quelqu'un à terre informé de l'itinéraire"] },
    ],
  },
  {
    id: "qc-vhf-urgence",
    categorie: "vhf",
    titre: "VHF — Appel de détresse",
    sections: [
      { titre: "Mayday (danger grave et imminent)", items: ["Canal 16", "« MAYDAY MAYDAY MAYDAY »", "Nom du bateau, position, nature de la détresse, nombre de personnes à bord"] },
      { titre: "Pan-pan (urgence, sans danger immédiat)", items: ["Canal 16", "« PAN-PAN PAN-PAN PAN-PAN »", "Décrire la situation clairement"] },
    ],
    alerte: "Procédure officielle simplifiée. En cas de doute, contacter le CROSS ou les secours.",
  },
  {
    id: "qc-noeuds-rapides",
    categorie: "noeuds",
    titre: "Nœuds à connaître",
    sections: [
      { titre: "Amarrage", items: ["Nœud de chaise : boucle fixe qui ne se resserre pas", "Tour mort et deux demi-clés : sur un anneau ou une bitte"] },
      { titre: "Rapide", items: ["Nœud de taquet : sur un taquet, facile à larguer", "Nœud de huit : arrêt en bout de cordage"] },
    ],
  },
  {
    id: "qc-homme-a-la-mer",
    categorie: "securite",
    titre: "Homme à la mer",
    sections: [
      { titre: "Immédiatement", items: ["Crier « Homme à la mer »", "Désigner une personne qui ne quitte jamais la victime des yeux", "Lancer une bouée ou un objet flottant"] },
      { titre: "Manœuvre", items: ["Revenir vers la victime selon la méthode connue", "Approcher sous le vent, moteur au point mort à l'approche finale"] },
    ],
    alerte: "À entraîner en conditions calmes, avec un moniteur, avant d'en avoir réellement besoin.",
  },
];

export function getQuickCardsByCategorie(categorie: string): QuickCard[] {
  return quickCards.filter((c) => c.categorie === categorie);
}

export function searchQuickCards(query: string): QuickCard[] {
  const q = query.trim().toLowerCase();
  if (!q) return quickCards;
  return quickCards.filter(
    (c) =>
      c.titre.toLowerCase().includes(q) ||
      c.sections.some((s) => s.items.some((i) => i.toLowerCase().includes(q)))
  );
}
