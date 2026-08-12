import type { Concept } from "./types";

export const concepts: Concept[] = [
  // Niveau 1 — Les parties du bateau
  { id: "c-proue", titre: "La proue", skillTag: "navigation", glossaryTermId: "g-proue" },
  { id: "c-poupe", titre: "La poupe", skillTag: "navigation", glossaryTermId: "g-poupe" },
  { id: "c-coque", titre: "La coque", skillTag: "navigation", glossaryTermId: "g-coque" },
  { id: "c-pont", titre: "Le pont", skillTag: "navigation", glossaryTermId: "g-pont" },
  { id: "c-mat", titre: "Le mât", skillTag: "navigation", glossaryTermId: "g-mat" },
  { id: "c-bome", titre: "La bôme", skillTag: "navigation", glossaryTermId: "g-bome" },
  { id: "c-cockpit", titre: "Le cockpit", skillTag: "navigation", glossaryTermId: "g-cockpit" },

  // Niveau 1 — Vocabulaire essentiel
  { id: "c-gite", titre: "La gîte", skillTag: "navigation", glossaryTermId: "g-gite" },
  { id: "c-cap", titre: "Le cap", skillTag: "navigation", glossaryTermId: "g-cap" },
  { id: "c-equipage", titre: "L'équipage", skillTag: "navigation", glossaryTermId: "g-equipage" },
  { id: "c-mouiller", titre: "Mouiller", skillTag: "navigation", glossaryTermId: "g-mouiller" },

  // Niveau 1 — Le vent
  { id: "c-vent-reel", titre: "Le vent réel", skillTag: "vent", glossaryTermId: "g-vent-reel" },
  { id: "c-vent-apparent", titre: "Le vent apparent", skillTag: "vent", glossaryTermId: "g-vent-apparent" },
  { id: "c-lit-du-vent", titre: "Le lit du vent", skillTag: "vent" },
  { id: "c-vent-force", titre: "La force du vent", skillTag: "vent" },

  // Niveau 1 — Tribord / bâbord
  { id: "c-tribord", titre: "Tribord", skillTag: "navigation", glossaryTermId: "g-tribord" },
  { id: "c-babord", titre: "Bâbord", skillTag: "navigation", glossaryTermId: "g-babord" },

  // Niveau 1 — Avant / arrière
  { id: "c-avant", titre: "L'avant", skillTag: "navigation" },
  { id: "c-arriere", titre: "L'arrière", skillTag: "navigation" },
  { id: "c-travers-mot", titre: "Le travers", skillTag: "navigation", glossaryTermId: "g-travers" },

  // Niveau 1 — Amure
  { id: "c-amure-tribord", titre: "Tribord amure", skillTag: "vent", glossaryTermId: "g-amure" },
  { id: "c-amure-babord", titre: "Bâbord amure", skillTag: "vent" },

  // Niveau 1 — Les allures
  { id: "c-allure-pres", titre: "Le près", skillTag: "vent", glossaryTermId: "g-pres" },
  { id: "c-allure-bon-plein", titre: "Le bon plein", skillTag: "vent" },
  { id: "c-allure-travers", titre: "Le travers (allure)", skillTag: "vent" },
  { id: "c-allure-largue", titre: "Le largue", skillTag: "vent", glossaryTermId: "g-largue" },
  { id: "c-allure-grand-largue", titre: "Le grand largue", skillTag: "vent" },
  { id: "c-allure-vent-arriere", titre: "Le vent arrière", skillTag: "vent", glossaryTermId: "g-vent-arriere" },

  // Niveau 1 — Les voiles
  { id: "c-grand-voile-notion", titre: "La grand-voile", skillTag: "manoeuvres", glossaryTermId: "g-grand-voile" },
  { id: "c-foc-notion", titre: "Le génois / foc", skillTag: "manoeuvres", glossaryTermId: "g-foc" },
  { id: "c-spi-notion", titre: "Le spinnaker", skillTag: "manoeuvres", glossaryTermId: "g-spi" },

  // Niveau 2 — Grand-voile
  { id: "c-grand-voile-parties", titre: "Les parties de la grand-voile", skillTag: "manoeuvres" },

  // Niveau 2 — Écoutes et drisses
  { id: "c-ecoute", titre: "L'écoute", skillTag: "manoeuvres", glossaryTermId: "g-ecoute" },
  { id: "c-drisse", titre: "La drisse", skillTag: "manoeuvres", glossaryTermId: "g-drisse" },

  // Niveau 2 — Winch
  { id: "c-winch", titre: "Le winch", skillTag: "manoeuvres", glossaryTermId: "g-winch" },

  // Niveau 2 — Barre et safran
  { id: "c-barre", titre: "La barre", skillTag: "manoeuvres", glossaryTermId: "g-barre" },
  { id: "c-safran", titre: "Le safran", skillTag: "manoeuvres", glossaryTermId: "g-safran" },

  // Niveau 3 — Manœuvrer
  { id: "c-virement", titre: "Le virement de bord", skillTag: "manoeuvres", glossaryTermId: "g-virement" },
  { id: "c-empannage", titre: "L'empannage", skillTag: "manoeuvres", glossaryTermId: "g-empannage" },
  { id: "c-prise-de-ris", titre: "Prendre un ris", skillTag: "manoeuvres", glossaryTermId: "g-ris" },
  { id: "c-communication-equipage", titre: "La communication à bord", skillTag: "manoeuvres" },

  // Niveau 4 — Naviguer
  { id: "c-carte-marine", titre: "Lire une carte marine", skillTag: "navigation", glossaryTermId: "g-carte-marine" },
  { id: "c-derive-navigation", titre: "La dérive (cap et route)", skillTag: "navigation", glossaryTermId: "g-derive" },
  { id: "c-balisage-laterale", titre: "Le balisage latéral", skillTag: "navigation", glossaryTermId: "g-balisage-laterale" },
  { id: "c-maree-courant", titre: "Marée et courant", skillTag: "navigation", glossaryTermId: "g-maree-courant" },

  // Niveau 5 — Météo
  { id: "c-beaufort", titre: "L'échelle de Beaufort", skillTag: "meteo", glossaryTermId: "g-beaufort" },
  { id: "c-lire-le-ciel", titre: "Lire le ciel", skillTag: "meteo" },
  { id: "c-bulletin-meteo", titre: "Le bulletin météo", skillTag: "meteo" },

  // Niveau 6 — Sécurité
  { id: "c-equipement-securite", titre: "L'équipement de sécurité", skillTag: "securite", glossaryTermId: "g-gilet" },
  { id: "c-homme-a-la-mer", titre: "Homme à la mer", skillTag: "securite", glossaryTermId: "g-homme-a-la-mer" },
  { id: "c-alerte-vhf", titre: "Alerter par VHF", skillTag: "securite", glossaryTermId: "g-vhf" },

  // Niveau 7 — Règles de navigation
  { id: "c-priorite-voilier-moteur", titre: "Priorité voilier / bateau à moteur", skillTag: "navigation" },
  { id: "c-feux-navigation", titre: "Les feux de navigation", skillTag: "navigation", glossaryTermId: "g-feux-navigation" },

  // Utilisés dès le Niveau 1 par certains quiz, approfondis plus tard
  // (c-priorite-amures : Niveau 7 ; c-reduire-toile : Niveau 6)
  { id: "c-priorite-amures", titre: "Priorité entre deux voiliers", skillTag: "navigation" },
  { id: "c-reduire-toile", titre: "Réduire la toile par vent fort", skillTag: "securite" },
];

export function getConcept(id: string): Concept | undefined {
  return concepts.find((c) => c.id === id);
}
