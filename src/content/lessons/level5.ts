import type { Lesson } from "../types";

export const level5Lessons: Lesson[] = [
  {
    id: "l5-echelle-de-beaufort",
    moduleId: "module-5-1",
    ordre: 1,
    titre: "L'échelle de Beaufort",
    dureeMinutes: 4,
    resume: "Estimer la force du vent à partir de ce qu'on observe sur l'eau.",
    conceptIds: ["c-vent-force", "c-beaufort"],
    blocs: [
      {
        type: "texte",
        contenu:
          "L'échelle de Beaufort classe la force du vent de 0 (calme plat) à 12 (ouragan), à partir d'observations simples sur l'eau plutôt que d'un instrument.",
      },
      {
        type: "etapes",
        titre: "Quelques repères utiles en croisière",
        items: [
          "Force 1 à 3 (1 à 10 nœuds) : air léger à petite brise, mer presque plate, vaguelettes.",
          "Force 4 à 5 (11 à 21 nœuds) : jolie brise à bonne brise, moutons sur les vagues — conditions confortables pour débuter.",
          "Force 6 (22 à 27 nœuds) : vent frais, embruns — c'est souvent le moment de réduire la toile.",
          "Force 7 et plus (28 nœuds et plus) : grand frais et au-delà, mer formée — à éviter en début d'apprentissage.",
        ],
      },
      {
        type: "astuce",
        contenu: "Observer l'état de la mer (moutons, embruns) donne une bonne estimation de la force du vent, même sans anémomètre.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre nœuds et force de Beaufort : ce sont deux échelles différentes, reliées par une table de correspondance.",
          "Oublier que le vent apparent ressenti à bord n'est pas toujours le vent réel mesuré par la météo (voir Niveau 1).",
        ],
      },
    ],
    questionInline: {
      enonce: "Sur l'échelle de Beaufort, à partir de quelle force devient-il souvent temps de réduire la toile ?",
      options: ["Force 1", "Force 3", "Autour de force 6", "Seulement à partir de force 10"],
      reponseIndex: 2,
      explication: "À partir de force 6 environ (vent frais), il devient généralement pertinent de réduire la voilure.",
    },
  },
  {
    id: "l5-lire-le-ciel",
    moduleId: "module-5-1",
    ordre: 2,
    titre: "Lire le ciel",
    dureeMinutes: 4,
    resume: "Sans instrument, le ciel annonce déjà beaucoup.",
    conceptIds: ["c-lire-le-ciel"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Sans instrument, le ciel donne déjà de bonnes indications sur l'évolution du temps dans les heures qui viennent.",
      },
      {
        type: "etapes",
        titre: "Quelques signes à surveiller",
        items: [
          "Un ciel qui se charge de nuages bas et sombres à l'ouest annonce souvent une dégradation proche.",
          "Une baisse progressive de la visibilité peut précéder l'arrivée d'un front.",
          "Un vent qui forcit et tourne rapidement peut signaler l'approche d'un grain.",
          "Un halo autour du soleil ou de la lune annonce parfois un changement de temps dans les 24 heures.",
        ],
      },
      {
        type: "astuce",
        contenu: "En croisière, le ciel se lit surtout dans le sens du vent dominant : c'est souvent de là que vient le changement.",
      },
      {
        type: "erreurs",
        items: [
          "Se fier uniquement au ciel sans consulter un bulletin météo avant de partir.",
          "Ignorer un ciel qui se dégrade rapidement en pensant que « ça passera ».",
        ],
      },
    ],
    questionInline: {
      enonce: "Quel signe annonce le plus souvent un grain qui approche ?",
      options: ["Un ciel bleu et stable", "Un vent qui forcit et tourne rapidement", "Une mer parfaitement plate", "Un coucher de soleil rouge"],
      reponseIndex: 1,
      explication: "Un vent qui forcit et change rapidement de direction est un signe classique de l'approche d'un grain.",
    },
  },
  {
    id: "l5-preparer-une-sortie",
    moduleId: "module-5-1",
    ordre: 3,
    titre: "Préparer une sortie",
    dureeMinutes: 4,
    resume: "Le bulletin météo fait partie du matériel de sécurité.",
    conceptIds: ["c-bulletin-meteo"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Avant chaque sortie, consulter un bulletin météo marine (force et direction du vent prévues, état de la mer, évolution dans les heures à venir) fait partie de la préparation, au même titre que vérifier le matériel.",
      },
      {
        type: "etapes",
        titre: "Ce qu'on regarde dans un bulletin",
        items: [
          "La force et la direction du vent prévues, et leur évolution dans la journée.",
          "L'état de la mer (hauteur des vagues) annoncé.",
          "Les avis de coup de vent ou les alertes en cours.",
          "L'heure et le coefficient de marée, s'ils influencent la sortie prévue.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "En cas de doute sur des conditions annoncées comme fortes ou changeantes, reporter la sortie est toujours une option valable — ce n'est jamais un échec.",
      },
      {
        type: "erreurs",
        items: [
          "Partir en se fiant uniquement au temps qu'il fait au moment du départ, sans regarder l'évolution prévue.",
          "Ignorer un avis de coup de vent parce que le ciel semble calme au départ.",
        ],
      },
    ],
    questionInline: {
      enonce: "Le bulletin météo annonce un coup de vent en fin d'après-midi, alors que le temps est calme le matin. Que fais-tu ?",
      options: [
        "Tu pars quand même, il fait beau maintenant",
        "Tu tiens compte de la prévision pour organiser ou reporter la sortie",
        "Tu ignores les bulletins météo, ils se trompent souvent",
        "Tu attends d'être en mer pour voir",
      ],
      reponseIndex: 1,
      explication: "Le bulletin décrit l'évolution prévue sur la journée, pas seulement les conditions du moment : il faut en tenir compte avant de partir.",
    },
  },
];
