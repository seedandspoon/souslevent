import type { Lesson } from "../types";

export const level2Lessons: Lesson[] = [
  {
    id: "l2-la-grand-voile",
    moduleId: "module-2-1",
    ordre: 1,
    titre: "La grand-voile en détail",
    dureeMinutes: 4,
    resume: "Trois bords, trois points, une voile.",
    conceptIds: ["c-grand-voile-parties"],
    blocs: [
      {
        type: "texte",
        contenu:
          "La grand-voile a trois bords : le guindant (le long du mât), la bordure (le long de la bôme) et la chute (le bord arrière, libre). Elle a trois angles : le point d'amure (en bas, côté mât), le point d'écoute (en bas, côté bôme) et le point de drisse (tout en haut).",
      },
      { type: "schema", illustration: "mainsail-parts", legende: "Guindant, bordure, chute et points de la grand-voile" },
      {
        type: "texte",
        contenu:
          "Des lattes rigides, glissées dans des fourreaux horizontaux, soutiennent la chute et l'empêchent de battre dans le vent.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre le guindant (côté mât) et la chute (bord arrière libre).",
          "Croire que les lattes servent à renforcer toute la voile : elles maintiennent surtout la forme de la chute.",
        ],
      },
    ],
    questionInline: {
      enonce: "Quel bord de la grand-voile longe le mât ?",
      options: ["La bordure", "La chute", "Le guindant", "Le point d'écoute"],
      reponseIndex: 2,
      explication: "Le guindant est le bord avant de la voile, fixé le long du mât.",
    },
  },
  {
    id: "l2-ecoutes-et-drisses",
    moduleId: "module-2-1",
    ordre: 2,
    titre: "Écoutes et drisses",
    dureeMinutes: 4,
    resume: "Deux cordages, deux fonctions bien distinctes.",
    conceptIds: ["c-ecoute", "c-drisse"],
    blocs: [
      {
        type: "texte",
        contenu:
          "La drisse sert à hisser une voile : elle la fait monter le long du mât ou de l'étai. L'écoute sert à régler l'angle de la voile par rapport au vent, une fois qu'elle est hissée : on la borde (tire) ou on la choque (relâche).",
      },
      { type: "schema", illustration: "sheet-halyard", legende: "La drisse hisse, l'écoute règle" },
      {
        type: "erreurs",
        items: [
          "Confondre écoute (réglage) et drisse (hissage) : ce sont deux cordages différents, avec deux rôles différents.",
          "Dire « tire la corde » à bord : chaque cordage a un nom précis, essentiel pour donner une consigne claire et rapide.",
        ],
      },
    ],
    questionInline: {
      enonce: "Tu veux hisser la grand-voile avant de partir. Quel cordage utilises-tu ?",
      options: ["L'écoute de grand-voile", "La drisse de grand-voile", "La drisse de génois", "Le hale-bas"],
      reponseIndex: 1,
      explication: "Hisser une voile se fait toujours avec sa drisse.",
    },
  },
  {
    id: "l2-le-winch",
    moduleId: "module-2-1",
    ordre: 3,
    titre: "Le winch",
    dureeMinutes: 3,
    resume: "Un treuil qui démultiplie ta force — et un point de vigilance.",
    conceptIds: ["c-winch"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Le winch est un treuil manuel qui démultiplie la force nécessaire pour border un cordage sous tension (écoute, drisse). On enroule le cordage autour du tambour dans le sens des aiguilles d'une montre, puis on actionne une manivelle si besoin.",
      },
      { type: "schema", illustration: "winch-diagram", legende: "Enrouler dans le sens des aiguilles d'une montre" },
      {
        type: "astuce",
        contenu: "Garde toujours une main sur le cordage pour reprendre le mou pendant que l'autre tourne la manivelle.",
      },
      {
        type: "erreurs",
        items: [
          "Approcher les doigts du winch pendant qu'il est sous tension : risque réel de coincement.",
          "Enrouler le cordage dans le mauvais sens, ce qui le fait déraper au lieu de le bloquer.",
        ],
      },
    ],
    questionInline: {
      enonce: "Dans quel sens enroule-t-on un cordage autour d'un winch ?",
      options: [
        "Dans le sens des aiguilles d'une montre",
        "Dans le sens inverse des aiguilles d'une montre",
        "Cela dépend du bateau",
        "Peu importe, le winch bloque dans les deux sens",
      ],
      reponseIndex: 0,
      explication: "Les winchs sont conçus pour bloquer le cordage lorsqu'il est enroulé dans le sens des aiguilles d'une montre.",
    },
  },
  {
    id: "l2-barre-et-safran",
    moduleId: "module-2-1",
    ordre: 4,
    titre: "La barre et le safran",
    dureeMinutes: 4,
    resume: "Ce qui dirige vraiment le bateau — et un sens à ne pas confondre.",
    conceptIds: ["c-barre", "c-safran"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Le safran est la surface immergée à l'arrière du bateau qui, orientée, dévie l'écoulement de l'eau et fait tourner le bateau. La barre est la commande qui actionne le safran : une barre franche (levier) ou une roue.",
      },
      { type: "schema", illustration: "tiller-wheel", legende: "Barre franche : sens inversé — Roue : sens direct" },
      {
        type: "texte",
        contenu:
          "Avec une barre franche, pousser le manche vers bâbord fait tourner le bateau vers tribord (sens inversé). Avec une roue, tourner vers tribord fait tourner le bateau vers tribord (sens direct). Cette différence surprend souvent les débutants.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre le sens de la barre franche (inversé) avec celui de la roue (direct).",
          "Faire un mouvement de barre trop brutal : le bateau répond avec un léger différé, pas instantanément.",
        ],
      },
    ],
    questionInline: {
      enonce: "Tu barres avec une barre franche. Tu la pousses vers bâbord. De quel côté le bateau tourne-t-il ?",
      options: ["Vers bâbord", "Vers tribord", "Il ne tourne pas", "Cela dépend du vent"],
      reponseIndex: 1,
      explication: "Avec une barre franche, le mouvement est inversé : pousser vers bâbord fait tourner le bateau vers tribord.",
    },
  },
];
