import type { Lesson } from "../types";

export const level7Lessons: Lesson[] = [
  {
    id: "l7-priorite-entre-voiliers",
    moduleId: "module-7-1",
    ordre: 1,
    titre: "Priorité entre deux voiliers",
    dureeMinutes: 4,
    resume: "L'amure décide qui doit s'écarter.",
    conceptIds: ["c-priorite-amures", "c-amure-tribord", "c-amure-babord"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Quand deux voiliers naviguent à voile et que leurs routes se croisent, une règle de priorité simple s'applique en premier : celle de l'amure.",
      },
      { type: "schema", illustration: "tack-diagram", legende: "Le bateau tribord amure (vent venant de tribord) est prioritaire" },
      {
        type: "etapes",
        titre: "La règle de base entre deux voiliers",
        items: [
          "Le bateau tribord amure (vent venant de tribord) est prioritaire.",
          "Le bateau bâbord amure doit s'écarter suffisamment tôt pour que la manœuvre soit claire.",
          "Si les deux bateaux portent la même amure, celui qui est sous le vent est prioritaire.",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Attendre le dernier moment pour s'écarter : la manœuvre doit être visible et anticipée.",
          "Croire que la priorité dispense de toute vigilance : le bateau prioritaire doit aussi surveiller et être prêt à réagir.",
        ],
      },
      {
        type: "texte",
        contenu:
          "Cette règle est une version simplifiée du RIPAM (règle 12). D'autres règles s'appliquent selon les situations (dépassement, navire à moteur...) et une formation encadrée reste nécessaire pour naviguer en autonomie.",
      },
    ],
    questionsInline: [
      {
        enonce: "Deux voiliers voient leurs routes se croiser. Toi, tu es tribord amure (le vent vient de ton côté tribord). Que fais-tu ?",
        options: ["Tu t'écartes systématiquement", "Tu es prioritaire, mais tu restes vigilant", "Le plus rapide a toujours priorité", "Il n'existe aucune règle entre voiliers"],
        reponseIndex: 1,
        explication: "Tribord amure, tu es prioritaire — mais la priorité n'enlève rien à la vigilance.",
      },
      {
        enonce: "Deux voiliers portent la même amure. Lequel est prioritaire ?",
        options: ["Celui au vent", "Celui sous le vent", "Le plus rapide", "Aucun n'est prioritaire"],
        reponseIndex: 1,
        explication: "Si les deux bateaux portent la même amure, celui qui est sous le vent est prioritaire.",
      },
      {
        enonce: "Le bateau non prioritaire doit-il s'écarter au dernier moment ou tôt ?",
        options: ["Au dernier moment, pour laisser le temps d'évaluer la situation", "Suffisamment tôt pour que la manœuvre soit claire", "Cela n'a pas d'importance", "Seulement si l'autre bateau le demande par VHF"],
        reponseIndex: 1,
        explication: "Le bateau non prioritaire doit s'écarter suffisamment tôt pour que la manœuvre soit claire, jamais au dernier moment.",
      },
    ],
  },
  {
    id: "l7-voilier-et-moteur",
    moduleId: "module-7-1",
    ordre: 2,
    titre: "Voilier et bateau à moteur",
    dureeMinutes: 3,
    resume: "Une priorité qui dépend de ce que fait vraiment le voilier.",
    conceptIds: ["c-priorite-voilier-moteur"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Un voilier qui navigue à la voile (sans moteur engagé) est en général prioritaire sur un bateau à moteur, mais cette règle connaît d'importantes exceptions.",
      },
      {
        type: "etapes",
        titre: "Ce qu'il faut retenir",
        items: [
          "Un voilier à la voile est en général prioritaire sur un bateau à moteur pur.",
          "Dès qu'un voilier utilise son moteur (même voiles hissées), il est considéré comme un bateau à moteur et perd cette priorité.",
          "Les gros navires contraints par leur tirant d'eau ou leur manœuvrabilité (cargo dans un chenal étroit, par exemple) doivent être évités même s'ils sont « en tort » en théorie.",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Croire qu'un voilier moteur engagé garde la priorité d'un voilier à la voile.",
          "Ignorer un grand navire dans un chenal en se fiant uniquement à la règle voile/moteur, sans tenir compte de sa capacité réelle à manœuvrer.",
        ],
      },
      {
        type: "texte",
        contenu:
          "Ce chapitre simplifie des règles qui comptent de nombreuses exceptions (chenaux étroits, dispositifs de séparation de trafic...). Elles se travaillent en détail lors d'une formation encadrée.",
      },
    ],
    questionsInline: [
      {
        enonce: "Un voilier navigue moteur allumé et embrayé, voiles hissées. Comment est-il considéré vis-à-vis des règles de priorité ?",
        options: [
          "Comme un voilier à la voile, toujours prioritaire",
          "Comme un bateau à moteur, sans la priorité d'un voilier à la voile",
          "Comme un navire contraint par son tirant d'eau",
          "Il n'existe pas de règle dans ce cas",
        ],
        reponseIndex: 1,
        explication: "Dès que le moteur est engagé pour la propulsion, le voilier est traité comme un bateau à moteur.",
      },
      {
        enonce: "Un voilier navigue uniquement à la voile, moteur coupé, face à un bateau à moteur pur. Qui est en général prioritaire ?",
        options: ["Le bateau à moteur", "Le voilier à la voile", "Le plus gros bateau", "Aucun n'est prioritaire"],
        reponseIndex: 1,
        explication: "Un voilier à la voile est en général prioritaire sur un bateau à moteur pur.",
      },
      {
        enonce: "Un cargo est contraint par son tirant d'eau dans un chenal étroit. Que dois-tu faire même s'il est « en tort » en théorie ?",
        options: ["Lui imposer ta priorité coûte que coûte", "L'éviter, car il ne peut pas manœuvrer librement", "L'ignorer, la règle voile/moteur suffit toujours", "Couper sa route pour aller plus vite"],
        reponseIndex: 1,
        explication: "Les gros navires contraints par leur tirant d'eau ou leur manœuvrabilité doivent être évités même s'ils sont « en tort » en théorie.",
      },
    ],
  },
  {
    id: "l7-feux-de-navigation",
    moduleId: "module-7-1",
    ordre: 3,
    titre: "Les feux de navigation",
    dureeMinutes: 3,
    resume: "Savoir de nuit dans quelle direction va un bateau.",
    conceptIds: ["c-feux-navigation", "c-tribord", "c-babord"],
    blocs: [
      {
        type: "texte",
        contenu:
          "De nuit, les feux de navigation permettent de savoir de loin dans quelle direction va un bateau, et donc d'anticiper une priorité.",
      },
      {
        type: "schema",
        illustration: "feux-navigation",
        legende: "Chaque feu n'est visible que dans son secteur : vert à tribord, rouge à bâbord, blanc à la poupe — les trois se complètent sur 360°.",
      },
      {
        type: "etapes",
        titre: "Les feux principaux à connaître",
        items: [
          "Feu vert à tribord, feu rouge à bâbord : visibles seulement du côté correspondant.",
          "Feu blanc de poupe, visible à l'arrière.",
          "Feu blanc de tête de mât, visible de face et sur les côtés (souvent absent sur un petit voilier à la voile).",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Si tu vois le feu rouge d'un autre bateau, c'est son côté bâbord qui te fait face — une bonne raison de rester attentif si tu n'es pas prioritaire.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre les couleurs des feux : vert à tribord, rouge à bâbord, sans exception.",
          "Penser que voir un seul feu de couleur donne toute l'information : il faut aussi observer si le bateau se rapproche et sous quel angle.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "De nuit, tu aperçois le feu rouge d'un autre bateau qui te fait face. De quel côté ce bateau te présente-t-il ?",
        options: ["Son côté tribord", "Son côté bâbord", "Son arrière", "Il n'y a pas moyen de savoir"],
        reponseIndex: 1,
        explication: "Le feu rouge signale le côté bâbord : c'est ce côté du bateau qui te fait face.",
      },
      {
        enonce: "Quel feu est visible à l'arrière d'un bateau, quelle que soit sa route ?",
        options: ["Le feu vert", "Le feu rouge", "Le feu blanc de poupe", "Le feu de tête de mât uniquement"],
        reponseIndex: 2,
        explication: "Le feu blanc de poupe est visible à l'arrière du bateau.",
      },
      {
        enonce: "Voir un seul feu de couleur suffit-il à avoir toute l'information sur un bateau croisé de nuit ?",
        options: ["Oui, la couleur suffit toujours", "Non, il faut aussi observer s'il se rapproche et sous quel angle", "Oui, mais seulement avec des jumelles", "Non, il faut d'abord l'appeler par VHF"],
        reponseIndex: 1,
        explication: "Voir un seul feu de couleur ne donne pas toute l'information : il faut aussi observer si le bateau se rapproche et sous quel angle.",
      },
    ],
  },
];
