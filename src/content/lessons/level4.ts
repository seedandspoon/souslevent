import type { Lesson } from "../types";

export const level4Lessons: Lesson[] = [
  {
    id: "l4-lire-une-carte",
    moduleId: "module-4-1",
    ordre: 1,
    titre: "Lire une carte marine",
    dureeMinutes: 5,
    resume: "L'information la plus importante est souvent sous l'eau.",
    conceptIds: ["c-carte-marine"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Une carte marine représente les profondeurs, la côte, les dangers et les aides à la navigation. Contrairement à une carte routière, l'information la plus importante est souvent sous l'eau.",
      },
      {
        type: "texte",
        contenu:
          "Les profondeurs (sondes) sont indiquées en mètres, rapportées à un niveau de référence bas (le zéro des cartes) : la profondeur réelle est presque toujours plus grande, jamais plus petite dans des conditions normales. Les zones de danger (roches, hauts-fonds) sont signalées par des symboles et souvent une teinte différente.",
      },
      {
        type: "etapes",
        titre: "Se repérer sur une carte",
        items: [
          "Identifier l'échelle et l'orientation (le nord est en haut).",
          "Repérer les amers : points fixes reconnaissables (phare, clocher, pointe) utiles pour se situer à vue.",
          "Repérer les dangers signalés près de la route prévue.",
          "Repérer les aides à la navigation (bouées, phares) qui balisent le chenal.",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Confondre la sonde indiquée sur la carte avec la profondeur du jour : il faut aussi tenir compte de la marée.",
          "Ignorer une zone teintée différemment en pensant qu'elle est simplement moins nette sur la carte : c'est souvent un danger.",
        ],
      },
    ],
    questionInline: {
      enonce: "Sur une carte marine, à quoi correspond la profondeur indiquée par une sonde ?",
      options: [
        "La profondeur maximale possible, jamais atteinte",
        "Une profondeur de référence, à laquelle s'ajoute généralement la hauteur de marée",
        "La profondeur exacte à tout moment de la journée",
        "La distance jusqu'au prochain port",
      ],
      reponseIndex: 1,
      explication: "La sonde est rapportée à un niveau bas de référence ; la profondeur réelle dépend en plus de la hauteur de marée du moment.",
    },
  },
  {
    id: "l4-cap-et-route",
    moduleId: "module-4-1",
    ordre: 2,
    titre: "Cap et route",
    dureeMinutes: 4,
    resume: "Pointer quelque part ne veut pas dire y arriver.",
    conceptIds: ["c-cap", "c-derive-navigation"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Le cap est la direction que pointe le bateau ; la route est le trajet réellement suivi sur l'eau. Vent et courant peuvent faire dériver le bateau : cap et route ne sont alors plus les mêmes.",
      },
      {
        type: "texte",
        contenu:
          "La dérive est l'écart entre le cap suivi et la route réelle, causé par le vent et le courant qui poussent le bateau de côté. Pour suivre une route précise, il faut parfois corriger en pointant le cap légèrement en amont de la direction voulue.",
      },
      {
        type: "astuce",
        contenu:
          "Sur l'eau, comparer régulièrement un amer visé au début de la route avec sa position actuelle permet de repérer une dérive avant qu'elle ne s'accumule.",
      },
      {
        type: "erreurs",
        items: [
          "Croire qu'on arrive toujours là où pointe la proue : sans correction de dérive, le bateau finit à côté de sa destination.",
          "Ignorer le courant en pensant qu'il ne compte que pour les gros navires.",
        ],
      },
    ],
    questionInline: {
      enonce: "Le bateau pointe plein nord (cap 000°), mais un courant le pousse vers l'est. Que peut-on observer ?",
      options: [
        "Le cap et la route restent identiques",
        "La route réelle dévie vers l'est, différente du cap suivi",
        "Le bateau recule",
        "Le vent apparent devient nul",
      ],
      reponseIndex: 1,
      explication: "Le courant pousse le bateau de côté : la route réelle (la trajectoire sur l'eau) s'écarte du cap pointé.",
    },
  },
  {
    id: "l4-balisage",
    moduleId: "module-4-1",
    ordre: 3,
    titre: "Le balisage",
    dureeMinutes: 5,
    resume: "Les couleurs qui indiquent les limites d'un chenal.",
    conceptIds: ["c-balisage-laterale"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Le balisage latéral signale les limites d'un chenal. En France, comme dans la plupart des eaux européennes (système IALA région A), la couleur indique de quel côté laisser la marque quand on remonte vers le port ou la terre, en venant du large.",
      },
      {
        type: "etapes",
        titre: "Le balisage latéral, en revenant vers le port",
        items: [
          "Les marques rouges (souvent cylindriques) se laissent à bâbord.",
          "Les marques vertes (souvent coniques) se laissent à tribord.",
          "En sortant vers le large, la logique s'inverse simplement.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Moyen mnémotechnique : « à l'entrée, rouge à gauche » reprend la même logique que les feux de navigation vus au Niveau 1 (bâbord = rouge).",
      },
      {
        type: "erreurs",
        items: [
          "Appliquer la règle sans vérifier le sens conventionnel (entrée ou sortie) indiqué sur la carte : certains chenaux le précisent séparément.",
          "Confondre le balisage latéral avec le balisage cardinal, qui signale un danger isolé plutôt qu'un chenal.",
        ],
      },
      {
        type: "texte",
        contenu:
          "Ce chapitre simplifie le balisage pour une première sortie encadrée. Le balisage complet (cardinal, dangers isolés, eaux saines, marques spéciales) est plus riche et mérite une formation dédiée.",
      },
    ],
    questionInline: {
      enonce: "Tu remontes un chenal vers le port. Une marque rouge cylindrique apparaît sur ta route. De quel côté la laisses-tu ?",
      options: ["À tribord", "À bâbord", "Peu importe le côté", "Il faut faire le tour par le large"],
      reponseIndex: 1,
      explication: "En revenant vers le port (système IALA région A), les marques rouges se laissent à bâbord.",
    },
  },
  {
    id: "l4-mouillage",
    moduleId: "module-4-1",
    ordre: 4,
    titre: "Le mouillage",
    dureeMinutes: 4,
    resume: "Immobiliser le bateau, en tenant compte de la marée.",
    conceptIds: ["c-mouiller", "c-maree-courant"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Mouiller consiste à immobiliser le bateau en jetant l'ancre. Un bon mouillage dépend du fond, de la profondeur, et de la place laissée pour évoluer avec la marée et le vent.",
      },
      {
        type: "etapes",
        titre: "Les bases d'un mouillage",
        items: [
          "Choisir une zone abritée, à l'écart des chenaux et des autres bateaux.",
          "Vérifier la nature du fond (sable, vase) sur la carte : certains fonds tiennent mal l'ancre.",
          "Filer une longueur de chaîne suffisante (généralement 3 à 5 fois la profondeur, plus en cas de vent fort).",
          "Vérifier que le bateau ne dérape pas, en observant des repères à terre.",
        ],
      },
      {
        type: "texte",
        contenu:
          "La marée fait varier la profondeur et le courant peut faire tourner le bateau autour de son ancre. Il faut anticiper la hauteur d'eau à marée basse pour ne pas s'échouer, et la longueur de chaîne nécessaire à marée haute.",
      },
      {
        type: "erreurs",
        items: [
          "Mouiller avec trop peu de chaîne : l'ancre risque de déraper.",
          "Mouiller sans vérifier la hauteur de marée prévue : le bateau peut se retrouver à sec, ou manquer de chaîne à marée haute.",
        ],
      },
    ],
    questionInline: {
      enonce: "Pourquoi file-t-on une longueur de chaîne bien plus grande que la profondeur de l'eau ?",
      options: [
        "Pour décorer le mouillage",
        "Pour que l'ancre tire à l'horizontale sur le fond plutôt que d'être arrachée vers le haut",
        "Ce n'est pas vraiment nécessaire",
        "Pour économiser la chaîne restante",
      ],
      reponseIndex: 1,
      explication: "Une chaîne tendue presque à l'horizontale permet à l'ancre de mordre le fond ; trop verticale, elle risque de se déraper.",
    },
  },
];
