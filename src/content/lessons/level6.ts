import type { Lesson } from "../types";

export const level6Lessons: Lesson[] = [
  {
    id: "l6-equipement-de-securite",
    moduleId: "module-6-1",
    ordre: 1,
    titre: "L'équipement de sécurité",
    dureeMinutes: 4,
    resume: "À repérer avant de partir, pas à découvrir en urgence.",
    conceptIds: ["c-equipement-securite"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Un voilier habitable embarque un minimum de matériel de sécurité, dont l'usage doit être connu avant de partir, pas découvert en urgence.",
      },
      {
        type: "etapes",
        titre: "Le matériel à repérer avant de partir",
        items: [
          "Les gilets de sauvetage : où ils sont rangés, comment les enfiler.",
          "Le harnais et sa longe, utilisés par mauvais temps ou de nuit pour rester attaché au bateau.",
          "L'extincteur et le robinet de gaz.",
          "La trousse de secours et les moyens d'alerte (VHF, fusées, téléphone étanche).",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Sur un bateau que tu ne connais pas, demande systématiquement au skipper où se trouve chaque équipement de sécurité avant de larguer les amarres.",
      },
      {
        type: "erreurs",
        items: [
          "Attendre d'en avoir besoin pour chercher où est rangé un gilet.",
          "Penser que le port du gilet est optionnel dès que la météo semble calme : les consignes du bord priment.",
        ],
      },
      {
        type: "texte",
        contenu:
          "Les obligations d'équipement et de port du gilet varient selon la réglementation en vigueur et les conditions. Ce chapitre donne des repères généraux ; suis toujours les consignes du skipper et la réglementation applicable.",
      },
    ],
    questionInline: {
      enonce: "Tu montes pour la première fois sur un voilier que tu ne connais pas. Quel est le bon réflexe avant de partir ?",
      options: [
        "Attendre d'être en mer pour repérer le matériel de sécurité",
        "Demander au skipper où se trouve l'équipement de sécurité et comment il s'utilise",
        "Ne rien demander, c'est au skipper de s'en occuper seul",
        "Vérifier uniquement la météo",
      ],
      reponseIndex: 1,
      explication: "Repérer le matériel de sécurité avant de partir, pas en cas d'urgence, fait partie des bons réflexes d'équipier.",
    },
  },
  {
    id: "l6-vent-qui-forcit",
    moduleId: "module-6-1",
    ordre: 2,
    titre: "Le vent qui forcit",
    dureeMinutes: 4,
    resume: "La décision à prendre, pas le geste technique.",
    conceptIds: ["c-reduire-toile", "c-vent-force"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Le vent forcit parfois progressivement pendant une sortie. Ce chapitre porte sur la décision à prendre, pas sur le geste technique (vu au Niveau 3 — Manœuvrer).",
      },
      {
        type: "etapes",
        titre: "Les signes qui doivent alerter",
        items: [
          "Le bateau gîte de plus en plus, et devient difficile à contrôler à la barre.",
          "Les rafales se rapprochent en intensité du vent moyen.",
          "L'équipage doit se tenir de plus en plus fermement pour rester stable.",
        ],
      },
      { type: "schema", illustration: "heel-angle", legende: "Une gîte croissante est souvent le premier signal d'un vent qui forcit" },
      {
        type: "erreurs",
        items: [
          "Attendre que la situation devienne inconfortable pour agir : mieux vaut réduire la toile tôt.",
          "Continuer à naviguer avec un équipage qui n'est plus à l'aise, par excès de confiance.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "En cas de doute, il vaut mieux réduire la toile « un cran trop tôt » que trop tard : on peut toujours renvoyer de la toile si le vent faiblit.",
      },
    ],
    questionInline: {
      enonce: "Tu navigues au près. Le vent forcit rapidement et le bateau gîte de plus en plus. Que fais-tu ?",
      options: ["Tu attends de voir si ça se calme", "Tu prends un ris pour réduire la toile", "Tu empannes pour aller plus vite", "Tu affales toutes les voiles immédiatement"],
      reponseIndex: 1,
      explication: "Réduire la toile (prendre un ris) garde le bateau plus stable et contrôlable, sans perdre toute propulsion.",
    },
  },
  {
    id: "l6-homme-a-la-mer",
    moduleId: "module-6-1",
    ordre: 3,
    titre: "Homme à la mer",
    dureeMinutes: 5,
    resume: "Une urgence qui demande une réaction immédiate et coordonnée.",
    conceptIds: ["c-homme-a-la-mer"],
    blocs: [
      {
        type: "texte",
        contenu: "Une chute par-dessus bord est une urgence qui demande une réaction immédiate et coordonnée de tout l'équipage.",
      },
      {
        type: "etapes",
        titre: "La procédure immédiate",
        items: [
          "Crier « Homme à la mer ! » pour alerter tout l'équipage.",
          "Désigner un équipier qui garde les yeux fixés en permanence sur la personne à l'eau, sans jamais la quitter du regard.",
          "Lancer la bouée ou tout objet flottant à proximité de la personne.",
          "Déclencher le point de repère GPS « homme à la mer » si le bateau en est équipé.",
          "Manœuvrer pour revenir vers la personne, moteur ou voiles selon la situation, en abordant lentement, contre le vent.",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Quitter des yeux la personne à l'eau, même quelques secondes, pour manœuvrer : elle peut devenir très difficile à repérer.",
          "Sauter à l'eau pour porter secours sans gilet ni longe : cela crée un second homme à la mer.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "En pratique encadrée, cette manœuvre se répète à vide (avec une bouée ou un coussin) jusqu'à devenir un réflexe pour tout l'équipage.",
      },
      {
        type: "texte",
        contenu:
          "Cette fiche donne les grands principes. La manœuvre précise de retour vers la personne (sous voile ou au moteur) se pratique et s'affine en formation encadrée.",
      },
    ],
    questionInline: {
      enonce: "Une personne tombe à l'eau. Quelle est la toute première chose à faire ?",
      options: [
        "Foncer immédiatement vers le moteur",
        "Crier « Homme à la mer ! » et désigner quelqu'un pour ne jamais la quitter des yeux",
        "Attendre qu'elle nage vers le bateau",
        "Affaler toutes les voiles avant tout",
      ],
      reponseIndex: 1,
      explication: "Alerter l'équipage et ne jamais quitter la personne des yeux est le tout premier réflexe, avant même de manœuvrer.",
    },
  },
  {
    id: "l6-alerte-vhf",
    moduleId: "module-6-1",
    ordre: 4,
    titre: "Alerter par VHF",
    dureeMinutes: 4,
    resume: "Mayday, Pan-pan, Sécurité : trois niveaux, trois usages.",
    conceptIds: ["c-alerte-vhf"],
    blocs: [
      {
        type: "texte",
        contenu:
          "La VHF permet de communiquer entre bateaux et avec les secours. Le canal 16 est le canal international de veille et de détresse.",
      },
      {
        type: "etapes",
        titre: "Les niveaux d'alerte",
        items: [
          "Mayday : danger grave et imminent pour la vie ou le bateau (voie d'eau, incendie, homme à la mer non retrouvé).",
          "Pan-pan : situation urgente mais sans danger immédiat pour la vie (panne moteur au large, avarie sérieuse).",
          "Sécurité : information importante pour la navigation (par exemple un danger signalé aux autres bateaux).",
        ],
      },
      {
        type: "etapes",
        titre: "Structure d'un appel Mayday",
        items: [
          "« Mayday, Mayday, Mayday »",
          "Nom du bateau, répété.",
          "Position (coordonnées ou repère connu).",
          "Nature de la détresse et assistance demandée.",
          "Nombre de personnes à bord.",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Utiliser Mayday pour une situation qui relève en réalité d'un Pan-pan : ces niveaux d'alerte ont un sens précis pour les secours.",
          "Ne pas connaître le canal 16 avant d'en avoir besoin.",
        ],
      },
      {
        type: "texte",
        contenu:
          "Cette fiche donne les repères essentiels. La procédure complète et l'usage de la VHF se pratiquent en formation encadrée ; en cas de doute réel en mer, il vaut toujours mieux alerter que d'hésiter.",
      },
    ],
    questionInline: {
      enonce:
        "Le moteur tombe en panne alors que le bateau dérive doucement vers des rochers, sans urgence vitale immédiate. Quel type d'appel radio est le plus adapté ?",
      options: ["Mayday", "Pan-pan", "Sécurité", "Aucun appel n'est nécessaire"],
      reponseIndex: 1,
      explication: "Il n'y a pas de danger immédiat pour la vie : c'est une situation urgente qui relève d'un Pan-pan plutôt que d'un Mayday.",
    },
  },
];
