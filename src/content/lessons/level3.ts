import type { Lesson } from "../types";

export const level3Lessons: Lesson[] = [
  {
    id: "l3-virement-de-bord",
    moduleId: "module-3-1",
    ordre: 1,
    titre: "Le virement de bord",
    dureeMinutes: 7,
    resume: "Le geste complet, action par action — à répéter jusqu'au réflexe.",
    conceptIds: ["c-virement"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Le virement de bord change d'amure en passant par le lit du vent. Voici le geste décomposé action par action, comme si tu devais tout faire seule : barre et écoute. Sur un bateau avec équipage, ces gestes se répartissent entre plusieurs personnes ; seule à bord, tu les enchaînes toi-même — c'est justement pour ça qu'ils doivent devenir un réflexe, à force de répétition.",
      },
      {
        type: "etapes",
        titre: "Avant de tourner",
        items: [
          "Vérifie que la route est dégagée, devant et sur les côtés.",
          "Repère le nouveau cap visé, et identifie l'écoute de génois actuellement bordée : c'est elle qu'il va falloir choquer.",
          "Annonce, même seule à voix haute : « Paré à virer ? » puis « Je vire ! » — dire le geste avant de le faire aide à ne pas en sauter un.",
        ],
      },
      {
        type: "etapes",
        titre: "Pendant que le bateau tourne, geste par geste",
        items: [
          "Pousse doucement la barre sous le vent (ou tire la roue vers le vent) pour amener l'étrave face au vent, d'un mouvement progressif.",
          "Dès que le génois commence à faseyer, ouvre le taquet (ou coinceur) qui bloque son écoute bordée.",
          "Choque cette écoute à la main, en accompagnant le mouvement — jamais un lâcher brutal : elle doit rester sous contrôle tout du long.",
          "Dès que le génois passe de l'autre côté de l'étai, attrape aussitôt la nouvelle écoute, celle qui devient sous le vent.",
          "Borde cette nouvelle écoute à la main, le plus vite possible, avant que le génois ne prenne de la vitesse de l'autre côté.",
          "Fais 2 à 3 tours autour du winch dans le sens des aiguilles d'une montre, puis termine de border à la manivelle jusqu'au bon réglage.",
          "Bloque l'écoute dans son taquet.",
        ],
      },
      {
        type: "etapes",
        titre: "Stabilisation",
        items: [
          "Reprends un cap stable sur la nouvelle amure, à l'aide d'un repère ou du compas.",
          "Vérifie le réglage de la grand-voile, qui a suivi le mouvement plus automatiquement que le génois.",
          "Vérifie que rien n'est resté coincé (écoute, bout traînant) avant de relâcher ton attention.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Seule à bord, entraîne-toi à quai, moteur coupé : refais la séquence barre → taquet → choque → attrape → borde → winch plusieurs fois de suite, juste pour que l'enchaînement des gestes devienne automatique avant de le faire en navigation.",
      },
      {
        type: "erreurs",
        items: [
          "Choquer l'écoute d'un coup au lieu de l'accompagner : elle peut fouetter ou se prendre dans un winch.",
          "Oublier d'ouvrir le taquet avant de tirer sur l'écoute : rien ne bouge, ou on force sur un cordage bloqué.",
          "Attendre trop longtemps avant de border la nouvelle écoute : le génois prend de la vitesse et devient difficile à border.",
          "Pousser la barre trop fort ou trop vite : le bateau perd sa vitesse et peut rester bloqué face au vent.",
          "Virer sans annoncer, même seule : sauter l'annonce mentale fait plus facilement sauter une étape du geste.",
        ],
      },
    ],
    questionInline: {
      enonce: "Que dois-tu faire avant de pouvoir choquer l'écoute du génois ?",
      options: [
        "Rien, il suffit de tirer dessus",
        "Ouvrir le taquet (ou coinceur) qui la bloque",
        "Attendre que le bateau soit stabilisé sur la nouvelle amure",
        "Border l'écoute de grand-voile",
      ],
      reponseIndex: 1,
      explication: "L'écoute est bloquée dans son taquet tant qu'elle est bordée : il faut l'ouvrir avant de pouvoir la choquer.",
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
    dureeMinutes: 6,
    resume: "Le geste technique, point par point, pour naviguer plus léger quand le vent forcit.",
    conceptIds: ["c-prise-de-ris"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Quand le vent forcit, réduire la surface de voilure — prendre un ris — permet de garder un bateau plus stable et plus facile à barrer, plutôt que de naviguer avec trop de gîte. Voici le geste décomposé point par point sur la grand-voile, le cas le plus courant ; le principe (moins de voile dehors, mât en bas) est le même sur un génois à enrouleur, en tirant simplement sur l'écoute pendant qu'on choque la drisse.",
      },
      {
        type: "etapes",
        titre: "Avant de prendre le ris",
        items: [
          "Repère à l'avance quel ris tu vas prendre (1, 2 ou 3 selon la force du vent) : plus tôt tu anticipes, plus le choix est facile à faire calmement.",
          "Mets le bateau au près serré ou face au vent (à la voile ou au moteur), pour dépowerer la grand-voile avant de toucher à la drisse.",
          "Vérifie que le hale-bas est bordé, pour que la bôme ne remonte pas quand tu vas choquer l'écoute.",
          "Repère les bouts que tu vas manipuler dans le bon ordre : drisse de grand-voile, ligne (ou bosse) du ris, écoute de grand-voile.",
        ],
      },
      {
        type: "etapes",
        titre: "Le geste, point par point",
        items: [
          "Choque complètement l'écoute de grand-voile : la voile ne doit plus porter du tout, sinon la drisse reste plaquée par le vent et ne descend pas.",
          "Choque la drisse de grand-voile en l'accompagnant à la main — jamais un lâcher libre, la voile doit descendre sous contrôle.",
          "Descends jusqu'au repère du point de ris choisi (marque de couleur sur la drisse, ou nombre de tours de winch convenu à l'avance).",
          "Accroche le point d'amure du ris (l'œillet avant, côté mât) à son crochet ou sa têtière.",
          "Retends légèrement la drisse, juste assez pour bloquer ce point d'amure en place.",
          "Borde la ligne de ris pour ramener le point d'écoute du ris vers la bôme, jusqu'à ce que la bordure de la voile soit bien tendue le long de la bôme.",
          "Retends complètement la drisse de grand-voile au réglage normal.",
          "Reborde l'écoute de grand-voile au réglage adapté à l'allure du moment.",
        ],
      },
      {
        type: "etapes",
        titre: "Une fois le ris pris",
        items: [
          "Range l'excédent de voile qui pend sous la bôme avec les garcettes prévues, nouées lâche — jamais serrées comme des points de tension, elles ne retiennent pas la voile.",
          "Vérifie qu'aucun bout ne traîne à l'eau ou près d'un winch avant de reprendre de la vitesse.",
          "Reprends ton cap et observe le comportement du bateau (gîte, barre, vitesse) : s'il gîte encore trop, c'est le signal qu'il faut envisager le ris suivant.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Seule à bord, entraîne-toi à quai ou par petit temps à prendre un ris posément, sans pression : le jour où tu en as vraiment besoin, le vent forcit déjà et le bateau bouge — ce n'est pas le moment de découvrir le geste.",
      },
      {
        type: "astuce",
        contenu:
          "Le geste exact varie selon le système du bateau (ris pris à la main, ris automatique, bosses menées au cockpit...) — repère à l'avance comment fonctionne celui de ton bateau plutôt que de l'apprendre en pleine manœuvre.",
      },
      {
        type: "erreurs",
        items: [
          "Attendre trop longtemps pour prendre un ris : la manœuvre devient plus difficile et plus physique quand le vent est déjà très fort.",
          "Oublier de choquer l'écoute avant de descendre la drisse : la voile reste sous tension et le ris est difficile, voire impossible, à prendre.",
          "Serrer les garcettes de bôme comme si elles tenaient la voile : elles ne servent qu'à ranger le tissu, pas à reprendre l'effort — les serrer fort peut déchirer la voile.",
          "Oublier de reborder l'écoute une fois le ris pris : la grand-voile reste molle et perd toute son efficacité, même bien réduite.",
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
