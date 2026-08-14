import type { Lesson } from "../types";

export const level4MareeLessons: Lesson[] = [
  {
    id: "l4-marnage-coefficient",
    moduleId: "module-4-2",
    ordre: 1,
    titre: "Marnage et coefficient de marée",
    dureeMinutes: 5,
    resume: "En Bretagne, l'écart entre marée haute et marée basse peut être énorme — encore faut-il savoir le lire.",
    conceptIds: ["c-marnage-coefficient"],
    blocs: [
      {
        type: "texte",
        contenu:
          "En Bretagne, et plus encore dans le golfe normand-breton voisin (la baie du Mont-Saint-Michel notamment), l'écart entre marée haute et marée basse compte parmi les plus grands d'Europe. Savoir le lire n'est pas une curiosité : ça conditionne le mouillage, le passage d'un chenal, ou simplement la hauteur d'eau sous la quille.",
      },
      {
        type: "texte",
        contenu:
          "Le marnage est la différence de hauteur d'eau entre une pleine mer et la basse mer qui la suit (ou la précède). Il varie chaque jour : il est maximal en vive-eau (autour des pleines et nouvelles lunes) et minimal en morte-eau (autour des quartiers de lune).",
      },
      {
        type: "schema",
        illustration: "marnage-coefficient",
        legende: "Le marnage — l'écart entre pleine mer et basse mer — est bien plus grand en vive-eau qu'en morte-eau, pour un même endroit.",
      },
      {
        type: "texte",
        contenu:
          "Le coefficient de marée est un nombre publié chaque jour (dans l'annuaire des marées ou les applications officielles), sur une échelle de 20 à 120, qui indique l'amplitude de la marée du moment — indépendamment du marnage en mètres, qui lui dépend aussi du lieu.",
      },
      {
        type: "etapes",
        titre: "Ce que dit le coefficient",
        items: [
          "Un coefficient élevé (au-delà de 90-95 environ) signale une grande marée : fort marnage, courants soutenus, plus de marge en pleine mer mais aussi plus de risque d'échouage en basse mer.",
          "Un coefficient faible (en dessous de 45-50 environ) signale une marée de morte-eau : marnage réduit, courants plus faibles, mais aussi moins de hauteur d'eau disponible en pleine mer.",
          "Entre les deux, une marée « ordinaire » ne demande pas d'attention particulière au-delà des bases.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Pas besoin de calculer le coefficient : il est publié à l'avance, pour chaque jour, dans l'annuaire des marées ou une application officielle (SHOM). Le repérer avant de partir fait partie de la préparation d'une sortie, au même titre que le bulletin météo.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre marnage (une hauteur, en mètres, propre à un endroit précis) et coefficient (un nombre sans unité, sur une échelle nationale de 20 à 120) : ce sont deux informations différentes et complémentaires.",
          "Penser qu'une « grande marée » est en soi dangereuse : elle demande surtout d'anticiper le mouillage, l'échouage et les courants — pas d'éviter la sortie par principe.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Que mesure le marnage ?",
        options: [
          "La vitesse du courant de marée",
          "La différence de hauteur d'eau entre une pleine mer et la basse mer qui la suit",
          "Le nombre de jours entre deux grandes marées",
          "La profondeur maximale d'un port",
        ],
        reponseIndex: 1,
        explication: "Le marnage est l'écart de hauteur d'eau entre une pleine mer et la basse mer qui la suit (ou la précède).",
      },
      {
        enonce: "Sur quelle échelle est publié le coefficient de marée ?",
        options: ["De 0 à 12", "De 20 à 120", "De 1 à 100", "Il n'y a pas d'échelle standard"],
        reponseIndex: 1,
        explication: "Le coefficient de marée est publié chaque jour sur une échelle de 20 à 120.",
      },
      {
        enonce: "Un coefficient de marée élevé annonce en général...",
        options: [
          "Un marnage réduit et des courants faibles",
          "Un fort marnage et des courants plus soutenus",
          "Une absence totale de courant",
          "Rien de particulier pour la navigation",
        ],
        reponseIndex: 1,
        explication: "Un coefficient élevé signale une grande marée : fort marnage et courants plus soutenus.",
      },
    ],
  },
  {
    id: "l4-regle-douziemes",
    moduleId: "module-4-2",
    ordre: 2,
    titre: "Calculer la hauteur d'eau : la règle des douzièmes",
    dureeMinutes: 5,
    resume: "L'eau ne monte pas à vitesse constante — une méthode simple pour estimer sa hauteur à tout moment.",
    conceptIds: ["c-douziemes"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Savoir l'heure de la pleine mer et de la basse mer ne suffit pas toujours : il faut parfois estimer la hauteur d'eau à un instant précis entre les deux — pour savoir si un chenal reste franchissable dans deux heures, ou si un mouillage découvrira avant ton retour.",
      },
      {
        type: "texte",
        contenu:
          "L'eau ne monte (ou ne descend) pas à vitesse constante : elle bouge lentement juste après la basse mer ou la pleine mer, et vite au milieu de la marée. La règle des douzièmes approxime ce rythme heure par heure.",
      },
      {
        type: "schema",
        illustration: "regle-douziemes",
        legende: "La hauteur d'eau varie par 1, 2, 3, 3, 2 puis 1 douzième du marnage à chaque heure-marée : lent au début et à la fin, rapide au milieu.",
      },
      {
        type: "etapes",
        titre: "La méthode, étape par étape",
        items: [
          "Calcule le marnage : hauteur de la pleine mer moins hauteur de la basse mer.",
          "Divise le marnage par 12 pour obtenir un douzième.",
          "Calcule l'heure-marée : le temps entre la pleine mer et la basse mer (souvent proche de 6h), divisé par 6.",
          "Applique la règle 1, 2, 3, 3, 2, 1 douzièmes heure-marée par heure-marée, en partant de la basse mer si la mer monte (ou de la pleine mer si elle descend).",
        ],
      },
      {
        type: "texte",
        contenu:
          "Exemple : basse mer à 1,50 m à 08h00, pleine mer à 7,50 m à 14h00 (soit 6h d'intervalle, donc une heure-marée = 1h). Marnage = 6,00 m, donc un douzième = 0,50 m. La hauteur monte ainsi : 2,00 m à 09h (+1/12), 3,00 m à 10h (+2/12), 4,50 m à 11h (+3/12), 6,00 m à 12h (+3/12), 7,00 m à 13h (+2/12), puis 7,50 m à 14h (+1/12) — on retrouve bien la pleine mer annoncée.",
      },
      {
        type: "astuce",
        contenu:
          "Pas besoin de refaire tout le calcul pour savoir si le niveau bouge vite : retiens juste que ce sont les deux heures du milieu (3ᵉ et 4ᵉ heure-marée) qui changent le plus — utile pour juger si un passage de chenal ou un mouillage risque d'évoluer rapidement dans l'heure qui vient.",
      },
      {
        type: "erreurs",
        items: [
          "Supposer que l'eau monte ou descend à vitesse constante : cela fait sous-estimer la hauteur réelle au milieu de la marée, le moment où elle bouge le plus vite.",
          "Se tromper de point de départ : on part de la basse mer pour une marée montante, de la pleine mer pour une marée descendante — inverser les deux fausse tout le calcul.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Pendant quelle(s) heure(s)-marée la hauteur d'eau varie-t-elle le plus vite ?",
        options: ["La 1ère et la 6ᵉ", "La 3ᵉ et la 4ᵉ", "Uniquement la 1ère", "La vitesse est constante toute la marée"],
        reponseIndex: 1,
        explication: "La règle des douzièmes (1, 2, 3, 3, 2, 1) montre que le niveau bouge le plus vite au milieu de la marée, à la 3ᵉ et la 4ᵉ heure-marée.",
      },
      {
        enonce: "Le marnage est de 6,00 m. Combien vaut un douzième ?",
        options: ["1,00 m", "0,50 m", "6,00 m", "0,12 m"],
        reponseIndex: 1,
        explication: "Un douzième = marnage ÷ 12, soit 6,00 ÷ 12 = 0,50 m.",
      },
      {
        enonce: "Pour calculer la hauteur d'eau pendant une marée montante, à partir de quelle référence part-on ?",
        options: ["La pleine mer", "La basse mer", "Le zéro des cartes", "Le coefficient de marée"],
        reponseIndex: 1,
        explication: "Pour une marée montante, on part de la basse mer et on ajoute les douzièmes heure-marée par heure-marée.",
      },
    ],
  },
  {
    id: "l4-courants-de-maree",
    moduleId: "module-4-2",
    ordre: 3,
    titre: "Les courants de marée",
    dureeMinutes: 5,
    resume: "La marée ne fait pas que monter et descendre sur place : en Bretagne, elle pousse fort.",
    conceptIds: ["c-courant-maree"],
    blocs: [
      {
        type: "texte",
        contenu:
          "La marée ne fait pas que monter et descendre sur place : en se déplaçant, elle crée des courants. Près des caps et dans les passages resserrés — typiques du littoral breton — ces courants peuvent devenir plus forts que la vitesse d'un voilier.",
      },
      {
        type: "schema",
        illustration: "courant-maree",
        legende: "Le flot porte vers la côte, le jusant vers le large ; l'étale est le bref moment où le courant s'annule entre les deux.",
      },
      {
        type: "etapes",
        titre: "Trois mots à connaître",
        items: [
          "Le flot est le courant de la marée montante : il porte généralement vers la côte.",
          "Le jusant est le courant de la marée descendante : il porte généralement vers le large.",
          "L'étale est le bref moment, au changement de sens, où le courant s'annule presque entre le flot et le jusant.",
        ],
      },
      {
        type: "etapes",
        titre: "Quelques passages bretons réputés pour leurs courants",
        items: [
          "Le Chenal du Four : jusqu'à 4 à 6 nœuds selon le coefficient.",
          "Le Raz de Sein : jusqu'à 7 nœuds en vive-eau — à ne franchir qu'à l'étale et par beau temps.",
          "Le passage du Fromveur : 8 à 9 nœuds en vive-eau, avec un étale très court, de seulement 15 à 25 minutes.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Viser l'étale, plutôt que de lutter contre plusieurs nœuds de courant contraire, change tout le confort — et souvent la sécurité — d'un passage réputé. L'heure d'étale d'un passage se calcule à partir des heures de marée d'un port de référence proche (Brest, par exemple, pour la pointe bretonne).",
      },
      {
        type: "erreurs",
        items: [
          "Sous-estimer un courant de plusieurs nœuds en ne raisonnant qu'avec la vitesse du bateau : c'est exactement ce qui crée l'écart entre le cap pointé et la route réellement suivie (voir la leçon Cap et route).",
          "Se présenter à un passage réputé pour ses courants sans avoir calculé l'heure d'étale à l'avance : certains étales ne durent que quelques minutes.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Comment appelle-t-on le courant de la marée montante ?",
        options: ["Le jusant", "Le flot", "L'étale", "Le ressac"],
        reponseIndex: 1,
        explication: "Le flot est le courant de la marée montante, qui porte généralement vers la côte.",
      },
      {
        enonce: "Qu'est-ce que l'étale ?",
        options: [
          "Le moment de plus fort courant",
          "Le bref moment où le courant s'annule presque, au changement de sens",
          "Un synonyme de basse mer",
          "La vitesse moyenne du courant sur une journée",
        ],
        reponseIndex: 1,
        explication: "L'étale est le bref moment, au changement de sens du courant, où celui-ci s'annule presque entre le flot et le jusant.",
      },
      {
        enonce: "Pourquoi vise-t-on l'étale pour franchir un passage réputé comme le Raz de Sein ?",
        options: [
          "Parce que c'est le moment où le vent tombe toujours",
          "Pour éviter de lutter contre plusieurs nœuds de courant contraire",
          "Parce que la profondeur y est alors maximale",
          "Ce n'est pas utile, l'heure n'a pas d'importance",
        ],
        reponseIndex: 1,
        explication: "Passer à l'étale évite de lutter contre un courant qui peut dépasser 6 à 7 nœuds dans ces passages — bien plus confortable et plus sûr.",
      },
    ],
  },
];
