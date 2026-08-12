import type { Lesson } from "../types";

export const level3Lessons: Lesson[] = [
  {
    id: "l3-virement-de-bord",
    moduleId: "module-3-1",
    ordre: 1,
    titre: "Le virement de bord",
    dureeMinutes: 5,
    resume: "Changer d'amure en passant par le lit du vent.",
    conceptIds: ["c-virement"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Le virement de bord change d'amure en passant par le lit du vent : c'est la manœuvre qu'on répète pour remonter au vent en zigzag, allure après allure.",
      },
      {
        type: "etapes",
        titre: "Les étapes du virement",
        items: [
          "Préparation : vérifier que la route est dégagée, prévenir l'équipage.",
          "Annonce : « Paré à virer ? » — attendre la confirmation de l'équipier aux écoutes.",
          "Action : « Je vire ! », puis pousser doucement la barre sous le vent.",
          "Passage face au vent : le bateau traverse le lit du vent, les voiles faseyent brièvement.",
          "Changement d'écoute : choquer l'ancienne écoute du génois, border la nouvelle de l'autre côté.",
          "Stabilisation : reprendre un cap stable sur la nouvelle amure, régler finement les voiles.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Le mouvement de barre doit être progressif, pas brusque : un virement trop rapide peut faire perdre de la vitesse et « caler » le bateau dans le lit du vent.",
      },
      {
        type: "erreurs",
        items: [
          "Virer sans prévenir l'équipage : personne n'est prêt à changer l'écoute.",
          "Pousser la barre trop fort ou trop vite : le bateau perd sa vitesse et peut rester bloqué face au vent.",
          "Relâcher l'ancienne écoute trop tard : le génois se prend dans les haubans ou l'étai.",
        ],
      },
    ],
    questionInline: {
      enonce: "Avant de virer de bord, quelle est la première chose à faire ?",
      options: [
        "Pousser la barre le plus vite possible",
        "Prévenir l'équipage et annoncer la manœuvre",
        "Choquer toutes les écoutes",
        "Affaler le génois",
      ],
      reponseIndex: 1,
      explication: "Une manœuvre annoncée laisse le temps à l'équipage de se préparer avant que le bateau ne bouge.",
    },
  },
  {
    id: "l3-empannage",
    moduleId: "module-3-1",
    ordre: 2,
    titre: "L'empannage",
    dureeMinutes: 5,
    resume: "Changer d'amure en passant par le vent arrière — avec plus de vigilance.",
    conceptIds: ["c-empannage"],
    blocs: [
      {
        type: "texte",
        contenu:
          "L'empannage change d'amure en passant par le vent arrière. Contrairement au virement, la bôme peut traverser rapidement et violemment si la manœuvre est mal maîtrisée : elle demande plus de vigilance.",
      },
      {
        type: "etapes",
        titre: "Les étapes de l'empannage",
        items: [
          "Préparation : personne sur la trajectoire de la bôme, border la grand-voile vers l'axe pour limiter sa course.",
          "Annonce : « Paré à empanner ? » — attendre la confirmation.",
          "Action : « J'empanne ! », amener doucement le vent arrière puis au-delà.",
          "Passage de la bôme : elle traverse d'un bord à l'autre — rester baissé et à l'écart.",
          "Reprise : choquer progressivement la grand-voile de l'autre côté, régler le génois.",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Empanner sans border la grand-voile au préalable : la bôme prend toute sa course et frappe violemment.",
          "Rester debout ou la tête dans la trajectoire de la bôme.",
          "Empanner par vent fort sans avoir réduit la toile au préalable.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Par vent fort, il est souvent plus sûr de virer de bord (en passant par le lit du vent) que d'empanner, même si le trajet est plus long.",
      },
    ],
    questionInline: {
      enonce: "Pourquoi l'empannage demande-t-il plus de vigilance que le virement de bord ?",
      options: [
        "Il est plus lent à exécuter",
        "La bôme peut traverser rapidement et frapper quelqu'un",
        "Les voiles ne bougent pas pendant la manœuvre",
        "Il est interdit par vent fort",
      ],
      reponseIndex: 1,
      explication: "En passant par le vent arrière, la bôme peut traverser vite et fort si elle n'a pas été bordée au préalable.",
    },
  },
  {
    id: "l3-reduire-la-toile",
    moduleId: "module-3-1",
    ordre: 3,
    titre: "Réduire la toile : les ris",
    dureeMinutes: 5,
    resume: "Le geste technique pour naviguer plus léger quand le vent forcit.",
    conceptIds: ["c-prise-de-ris"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Quand le vent forcit, réduire la surface de voilure — prendre un ris — permet de garder un bateau plus stable et plus facile à barrer, plutôt que de naviguer avec trop de gîte.",
      },
      {
        type: "etapes",
        titre: "Prendre un ris dans la grand-voile (principe général)",
        items: [
          "Choquer l'écoute de grand-voile et border le hale-bas pour libérer la bôme.",
          "Descendre la drisse de grand-voile jusqu'au point de ris repéré.",
          "Accrocher le point d'amure du ris à l'avant, au niveau du mât.",
          "Border la ligne de ris pour ramener le point d'écoute du ris vers la bôme.",
          "Retendre la drisse, puis reborder l'écoute de grand-voile.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Le geste exact varie selon le système du bateau (ris pris à la main, ris automatique...) — la logique reste la même : moins de voile dehors, mât en bas.",
      },
      {
        type: "erreurs",
        items: [
          "Attendre trop longtemps pour prendre un ris : la manœuvre devient plus difficile quand le vent est déjà très fort.",
          "Oublier de choquer l'écoute avant de descendre la drisse : la voile reste sous tension et le ris est difficile à prendre.",
        ],
      },
    ],
    questionInline: {
      enonce: "À quel moment est-il préférable de prendre un ris ?",
      options: [
        "Seulement quand il devient déjà difficile de barrer",
        "Dès qu'on sent que le bateau gîte plus que ce qui est confortable",
        "Uniquement au port, jamais en mer",
        "Seulement si tout l'équipage vote pour",
      ],
      reponseIndex: 1,
      explication: "Il vaut mieux réduire la toile tôt, quand la manœuvre est encore facile, plutôt que d'attendre que les conditions se dégradent.",
    },
  },
  {
    id: "l3-communication-equipage",
    moduleId: "module-3-1",
    ordre: 4,
    titre: "La communication à bord",
    dureeMinutes: 3,
    resume: "Le vocabulaire partagé qui rend chaque manœuvre sûre.",
    conceptIds: ["c-communication-equipage"],
    blocs: [
      {
        type: "texte",
        contenu:
          "À bord, chaque manœuvre suit un cycle : annonce → confirmation → action. Ce vocabulaire partagé évite les gestes improvisés et les accidents.",
      },
      {
        type: "etapes",
        titre: "Le cycle d'une manœuvre annoncée",
        items: [
          "Le barreur annonce son intention : « Paré à virer ? » / « Paré à empanner ? »",
          "Chaque équipier concerné confirme qu'il est prêt : « Paré ! »",
          "Le barreur déclenche l'action : « Je vire ! » / « J'empanne ! »",
          "L'équipage exécute, sans attendre de nouvelle consigne.",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Le barreur agit avant d'avoir reçu la confirmation de l'équipage.",
          "Donner une consigne vague (« On tourne ? ») au lieu du vocabulaire standard.",
        ],
      },
      {
        type: "astuce",
        contenu: "En cas de doute ou d'imprévu, un équipier peut toujours dire « Attends ! » pour stopper la manœuvre avant l'action.",
      },
    ],
    questionInline: {
      enonce: "Le barreur annonce « Paré à virer ? ». Que doit faire l'équipier avant que le virement commence ?",
      options: [
        "Rien, le barreur vire directement",
        "Confirmer qu'il est prêt en répondant « Paré ! »",
        "Choquer immédiatement toutes les écoutes",
        "Quitter le cockpit",
      ],
      reponseIndex: 1,
      explication: "Le barreur attend la confirmation de chaque équipier concerné avant de déclencher la manœuvre.",
    },
  },
];
