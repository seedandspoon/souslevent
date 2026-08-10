import type { Knot } from "./types";

export const knots: Knot[] = [
  {
    id: "noeud-de-huit",
    nom: "Nœud de huit",
    nomAnglais: "figure-eight knot",
    usage: "Nœud d'arrêt en bout d'écoute : empêche le cordage de filer hors d'une poulie ou d'un coinceur.",
    difficulte: 1,
    illustration: "knot-figure-eight",
    etapes: [
      "Former une boucle avec le courant (le bout libre du cordage).",
      "Passer le courant derrière le dormant (la partie fixe du cordage).",
      "Repasser le courant dans la boucle formée à l'étape 1.",
      "Serrer en tirant sur les deux brins.",
    ],
    erreurs: [
      "Le confondre avec un simple nœud d'arrêt, qui glisse plus facilement sous tension.",
      "Le serrer trop loin du bout du cordage : il peut alors sortir du coinceur.",
    ],
  },
  {
    id: "noeud-de-chaise",
    nom: "Nœud de chaise",
    nomAnglais: "bowline",
    usage: "Forme une boucle fixe qui ne se resserre pas : amarrage, remorquage, ou pour s'attacher en sécurité.",
    difficulte: 2,
    illustration: "knot-bowline",
    etapes: [
      "Former une petite boucle sur le dormant.",
      "Faire passer le courant à travers cette boucle, par en dessous.",
      "Passer le courant autour du dormant.",
      "Repasser le courant dans la boucle initiale, en sens inverse.",
      "Serrer en tenant la boucle finale et en tirant sur le dormant.",
    ],
    erreurs: [
      "Le confondre avec un nœud coulant : le nœud de chaise ne doit jamais se resserrer sur lui-même.",
      "Laisser un bout trop court après le nœud : il risque de se défaire sous vibration.",
    ],
  },
  {
    id: "demi-cle",
    nom: "Demi-clé",
    nomAnglais: "half hitch",
    usage: "Nœud simple, rarement utilisé seul : sert de base à des nœuds plus fiables comme le tour mort et deux demi-clés.",
    difficulte: 1,
    illustration: "knot-half-hitch",
    etapes: [
      "Passer le cordage autour du support (bosse, taquet, anneau).",
      "Repasser le courant sous le dormant.",
      "Serrer.",
    ],
    erreurs: [
      "L'utiliser seule pour amarrer un bateau : une demi-clé isolée n'est pas fiable.",
      "La confondre avec un tour mort, qui est une simple boucle sans croisement.",
    ],
  },
  {
    id: "tour-mort-deux-demi-cles",
    nom: "Tour mort et deux demi-clés",
    nomAnglais: "round turn and two half hitches",
    usage: "Amarrer un cordage à un anneau, une bitte ou un point fixe. Tient bien sous tension tout en restant facile à défaire.",
    difficulte: 2,
    illustration: "knot-round-turn",
    etapes: [
      "Faire un tour complet (tour mort) autour du point fixe.",
      "Faire une première demi-clé autour du dormant.",
      "Faire une seconde demi-clé, dans le même sens, juste après la première.",
      "Serrer les deux demi-clés contre le tour mort.",
    ],
    erreurs: [
      "Oublier le tour mort : c'est lui qui absorbe la tension avant les demi-clés.",
      "Faire les deux demi-clés dans des sens opposés : le nœud devient instable.",
    ],
  },
  {
    id: "noeud-de-taquet",
    nom: "Nœud de taquet",
    nomAnglais: "cleat hitch",
    usage: "Fixer une écoute ou une amarre sur un taquet. Rapide à faire et à larguer, même sous tension.",
    difficulte: 1,
    illustration: "knot-cleat",
    etapes: [
      "Faire un tour complet autour de la base du taquet.",
      "Croiser le cordage en huit par-dessus les cornes du taquet.",
      "Terminer par une demi-clé retournée, coincée sous elle-même, pour verrouiller.",
    ],
    erreurs: [
      "Faire trop de tours en huit : cela complique un largage rapide en urgence.",
      "Oublier la demi-clé de verrouillage finale : le nœud peut se défaire sous à-coups.",
    ],
  },
];

export function getKnot(id: string): Knot | undefined {
  return knots.find((k) => k.id === id);
}
