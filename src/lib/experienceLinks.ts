// Liens croisés (pilote) entre le contenu existant et les nouvelles expériences
// interactives — permet de comparer les deux approches sans dupliquer le contenu.

export const LESSON_EXPERIENCE_LINKS: Record<string, { href: string; label: string }> = {
  "l1-les-allures": { href: "/experiences/allures", label: "Essayer en interactif" },
  "l-regler-les-voiles": { href: "/experiences/reglage-voile", label: "Essayer en interactif" },
  "l3-virement-de-bord": { href: "/experiences/virement", label: "Essayer en interactif" },
  "l3-empannage": { href: "/experiences/empannage", label: "Essayer en interactif" },
};

export const KNOT_EXPERIENCE_LINKS: Record<string, { href: string; label: string }> = {
  "noeud-de-chaise": { href: "/experiences/noeud-chaise", label: "Voir la démonstration animée" },
};
