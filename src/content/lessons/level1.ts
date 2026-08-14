import type { Lesson } from "../types";

export const level1Lessons: Lesson[] = [
  {
    id: "l1-parties-du-bateau",
    moduleId: "module-1-1",
    ordre: 1,
    titre: "Les parties du bateau",
    dureeMinutes: 4,
    resume: "Le vocabulaire de base pour se repérer à bord.",
    conceptIds: ["c-proue", "c-poupe", "c-coque", "c-pont", "c-mat", "c-bome", "c-cockpit"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Avant de naviguer, apprends à nommer chaque partie du bateau. À bord, un vocabulaire précis évite les malentendus — et parfois les gestes dangereux.",
      },
      { type: "schema", illustration: "boat-parts", legende: "Vue d'ensemble d'un voilier" },
      {
        type: "texte",
        contenu:
          "La proue est l'avant du bateau, la poupe est l'arrière. La coque est l'ensemble de la structure flottante. Le pont est la surface horizontale sur laquelle on se déplace. Le mât porte les voiles, la bôme est le tube horizontal qui tient le bas de la grand-voile. Le cockpit est l'espace où l'équipage barre et manœuvre.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre la proue (avant) et la poupe (arrière).",
          "Appeler le pont « le sol » : à bord, on dit le pont.",
          "Désigner la bôme comme « la barre horizontale du bas » : elle a un nom précis.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Comment appelle-t-on l'arrière du bateau ?",
        options: ["La proue", "La poupe", "L'étrave", "Le cockpit"],
        reponseIndex: 1,
        explication: "La poupe est l'arrière du bateau, à l'opposé de la proue.",
      },
      {
        enonce: "Comment appelle-t-on l'avant du bateau ?",
        options: ["La poupe", "La proue", "Le cockpit", "La coque"],
        reponseIndex: 1,
        explication: "La proue est l'avant du bateau.",
      },
      {
        enonce: "Quel est le nom du tube horizontal qui tient le bas de la grand-voile ?",
        options: ["Le mât", "La bôme", "Le pont", "Le cockpit"],
        reponseIndex: 1,
        explication: "La bôme est le tube horizontal qui tient le bas de la grand-voile ; le mât la soutient verticalement.",
      },
    ],
  },
  {
    id: "l1-vocabulaire-essentiel",
    moduleId: "module-1-1",
    ordre: 2,
    titre: "Le vocabulaire essentiel",
    dureeMinutes: 4,
    resume: "Quatre mots que tu vas entendre à chaque sortie.",
    conceptIds: ["c-gite", "c-cap", "c-equipage", "c-mouiller"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Certains mots reviennent en permanence à bord. Les connaître te permet de comprendre les consignes sans effort.",
      },
      {
        type: "texte",
        contenu:
          "La gîte est l'inclinaison du bateau sous l'effet du vent dans les voiles. Le cap est la direction visée, exprimée en degrés (0° au nord, 90° à l'est...). L'équipage désigne l'ensemble des personnes à bord. Mouiller signifie jeter l'ancre pour immobiliser le bateau.",
      },
      { type: "schema", illustration: "heel-angle", legende: "La gîte : le bateau penche sous le vent" },
      {
        type: "erreurs",
        items: [
          "Confondre le cap (direction visée) et la route (trajet réellement suivi, qui peut dériver).",
          "Penser que « mouiller » veut dire prendre l'eau : c'est jeter l'ancre.",
          "Utiliser « la gîte » pour parler de la vitesse : c'est l'inclinaison, pas la vitesse.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Le bateau penche fortement sous l'effet du vent. Comment appelle-t-on ce phénomène ?",
        options: ["La dérive", "La gîte", "Le ris", "L'abattée"],
        reponseIndex: 1,
        explication: "La gîte est l'inclinaison du bateau causée par la pression du vent dans les voiles.",
      },
      {
        enonce: "Que signifie « mouiller » ?",
        options: ["Prendre l'eau", "Jeter l'ancre pour immobiliser le bateau", "Changer de cap", "Réduire la voilure"],
        reponseIndex: 1,
        explication: "Mouiller signifie jeter l'ancre pour immobiliser le bateau.",
      },
      {
        enonce: "Quelle est la différence entre le cap et la route ?",
        options: [
          "Il n'y en a pas, ce sont des synonymes",
          "Le cap est la direction visée, la route est le trajet réellement suivi",
          "Le cap concerne la vitesse, la route la direction",
          "Le cap ne s'utilise qu'au moteur",
        ],
        reponseIndex: 1,
        explication: "Le cap est la direction visée (en degrés), la route est le trajet réellement suivi, qui peut différer sous l'effet du vent ou du courant.",
      },
    ],
  },
  {
    id: "l1-le-vent",
    moduleId: "module-1-1",
    ordre: 3,
    titre: "Le vent",
    dureeMinutes: 5,
    resume: "Vent réel, vent apparent : ce que le bateau ressent vraiment.",
    conceptIds: ["c-vent-reel", "c-vent-apparent", "c-lit-du-vent", "c-vent-force"],
    blocs: [
      {
        type: "texte",
        contenu:
          "En mer, on nomme toujours le vent par la direction d'où il vient — pas par la direction vers laquelle il souffle. Un « vent de nord-ouest » vient du nord-ouest.",
      },
      {
        type: "texte",
        contenu:
          "Le vent réel est celui que mesurerait un observateur immobile. Le vent apparent est celui que ressent réellement l'équipage : il combine le vent réel et le vent créé par le déplacement du bateau. C'est le vent apparent qui gonfle les voiles.",
      },
      { type: "schema", illustration: "wind-apparent-real", legende: "Le vent apparent combine vent réel et vent vitesse (créé par le déplacement du bateau)" },
      {
        type: "texte",
        contenu:
          "Le lit du vent est l'axe dans lequel souffle le vent. Face au vent, dans cet axe, les voiles ne peuvent pas fonctionner : le bateau ne peut pas avancer.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre la direction d'où vient le vent avec celle vers laquelle il souffle.",
          "Croire que le vent apparent est toujours identique au vent réel : il change avec la vitesse et le cap du bateau.",
          "Vouloir naviguer « dans le lit du vent » : les voiles ne portent pas face au vent.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce:
          "Un bateau immobile ressent un vent réel de 10 nœuds. Il se met à avancer face à ce vent à 5 nœuds. Que devient le vent apparent ?",
        options: ["Il diminue", "Il augmente", "Il reste identique", "Il change de sens"],
        reponseIndex: 1,
        explication:
          "En avançant face au vent, la vitesse du bateau s'ajoute à celle du vent réel : le vent apparent forcit.",
      },
      {
        enonce: "Comment nomme-t-on le vent en mer : par la direction d'où il vient, ou vers laquelle il souffle ?",
        options: ["Vers laquelle il souffle", "D'où il vient", "Cela dépend du pays", "Les deux indifféremment"],
        reponseIndex: 1,
        explication: "En mer, on nomme toujours le vent par la direction d'où il vient : un vent de nord-ouest vient du nord-ouest.",
      },
      {
        enonce: "Peut-on naviguer directement dans le lit du vent ?",
        options: ["Oui, c'est même la route la plus directe", "Non, les voiles n'y fonctionnent pas", "Oui, mais seulement avec le spinnaker", "Non, uniquement à cause du courant"],
        reponseIndex: 1,
        explication: "Face au vent, dans le lit du vent, les voiles ne peuvent pas fonctionner : le bateau ne peut pas avancer.",
      },
    ],
  },
  {
    id: "l1-tribord-babord",
    moduleId: "module-1-1",
    ordre: 4,
    titre: "Tribord et bâbord",
    dureeMinutes: 3,
    resume: "Une convention qui ne change jamais de sens.",
    conceptIds: ["c-tribord", "c-babord"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Tribord désigne le côté droit du bateau lorsqu'on regarde vers l'avant. Bâbord désigne le côté gauche. Contrairement à « droite » et « gauche », ces mots ne dépendent jamais du sens où l'on regarde : ils décrivent le bateau lui-même.",
      },
      {
        type: "schema",
        illustration: "port-starboard",
        legende: "Tribord à droite (feu vert), bâbord à gauche (feu rouge), vus vers l'avant",
      },
      {
        type: "astuce",
        contenu: "Moyen mnémotechnique : « bâbord » et « gauche » ont tous les deux plus de lettres que « tribord » et « droite »... pas vraiment. Le plus fiable : bâbord = rouge = comme un feu de stop, à gauche.",
      },
      {
        type: "erreurs",
        items: [
          "Dire « à droite » ou « à gauche » en pensant que c'est équivalent à bord : tribord et bâbord ne changent jamais, contrairement à droite/gauche qui dépendent de l'orientation de celui qui parle.",
          "Inverser les couleurs des feux de navigation (tribord = vert, bâbord = rouge).",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Tu es à l'arrière du bateau et tu regardes vers l'avant. De quel côté est tribord ?",
        options: ["À ta gauche", "À ta droite", "Cela dépend d'où tu regardes", "Il n'y a pas de tribord à l'arrière"],
        reponseIndex: 1,
        explication: "Tribord est toujours le côté droit du bateau quand on regarde vers l'avant, où que l'on se trouve à bord.",
      },
      {
        enonce: "Quelle couleur de feu de navigation correspond à tribord ?",
        options: ["Rouge", "Vert", "Blanc", "Jaune"],
        reponseIndex: 1,
        explication: "Tribord correspond au feu vert, bâbord au feu rouge.",
      },
      {
        enonce: "Tribord et bâbord dépendent-ils du sens dans lequel regarde la personne à bord ?",
        options: ["Oui, comme droite et gauche", "Non, ils désignent toujours le même côté du bateau", "Seulement en cas de vent fort", "Seulement si le bateau recule"],
        reponseIndex: 1,
        explication: "Contrairement à droite/gauche, tribord et bâbord décrivent le bateau lui-même : ils ne changent jamais, quel que soit le sens où l'on regarde.",
      },
    ],
  },
  {
    id: "l1-avant-arriere",
    moduleId: "module-1-1",
    ordre: 5,
    titre: "Avant, arrière et travers",
    dureeMinutes: 3,
    resume: "Se repérer autour du bateau, pas seulement à bord.",
    conceptIds: ["c-avant", "c-arriere", "c-travers-mot"],
    blocs: [
      {
        type: "texte",
        contenu:
          "L'avant et l'arrière désignent les zones proches de la proue et de la poupe. Le travers désigne ce qui se trouve perpendiculairement à l'axe du bateau, à 90°. On précise souvent le côté : « par le travers tribord ».",
      },
      { type: "schema", illustration: "fore-aft-beam", legende: "Avant, arrière et travers autour du bateau" },
      {
        type: "erreurs",
        items: [
          "Confondre « par le travers » avec « en face » : le travers est sur le côté, à 90°, pas devant.",
          "Oublier de préciser le côté (tribord ou bâbord) en désignant un objet par le travers.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Un autre bateau est repéré exactement sur ton côté droit, à 90° de l'axe de ton bateau. Où est-il ?",
        options: ["Par l'avant tribord", "Par le travers tribord", "Par l'arrière tribord", "Dans le lit du vent"],
        reponseIndex: 1,
        explication: "À 90° sur le côté droit, il est « par le travers tribord ».",
      },
      {
        enonce: "Que désigne le travers d'un bateau ?",
        options: ["Ce qui est devant", "Ce qui est perpendiculaire à l'axe du bateau, à 90°", "Ce qui est directement derrière", "La ligne de flottaison"],
        reponseIndex: 1,
        explication: "Le travers désigne ce qui se trouve perpendiculairement à l'axe du bateau, à 90°.",
      },
      {
        enonce: "Pourquoi précise-t-on souvent un côté en disant « par le travers tribord » ?",
        options: ["Parce que le mot travers seul ne veut rien dire", "Parce qu'il y a un travers de chaque côté du bateau, à 90°", "Parce que le travers change tout le temps", "Ce n'est jamais nécessaire de préciser"],
        reponseIndex: 1,
        explication: "Il existe un travers tribord et un travers bâbord, de part et d'autre du bateau : préciser le côté lève l'ambiguïté.",
      },
    ],
  },
  {
    id: "l1-amure",
    moduleId: "module-1-1",
    ordre: 6,
    titre: "L'amure",
    dureeMinutes: 4,
    resume: "De quel côté vient le vent ? Une notion clé pour la suite.",
    conceptIds: ["c-amure-tribord", "c-amure-babord"],
    blocs: [
      {
        type: "texte",
        contenu:
          "L'amure indique de quel côté du bateau vient le vent. Si le vent vient de tribord, le bateau est tribord amure (la grand-voile est alors bordée sur bâbord). Si le vent vient de bâbord, le bateau est bâbord amure.",
      },
      { type: "schema", illustration: "tack-diagram", legende: "Tribord amure : le vent vient de tribord" },
      {
        type: "texte",
        contenu:
          "Cette notion paraît abstraite au début, mais elle est essentielle : plus tard, elle déterminera qui doit s'écarter lors d'un croisement entre deux voiliers (Niveau 7 — Règles de navigation).",
      },
      {
        type: "erreurs",
        items: [
          "Confondre l'amure avec l'allure : l'amure indique le côté d'où vient le vent, l'allure indique l'angle du bateau par rapport au vent.",
          "Croire que l'amure change dès qu'on tourne, même sans changer le côté d'où vient le vent.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Le vent souffle de bâbord sur ton bateau. Quelle amure portes-tu ?",
        options: ["Tribord amure", "Bâbord amure", "Cela dépend de la voile utilisée", "Amure neutre"],
        reponseIndex: 1,
        explication: "Le bateau est nommé d'après le côté d'où vient le vent : ici, bâbord amure.",
      },
      {
        enonce: "Si le vent vient de tribord, de quel côté est bordée la grand-voile ?",
        options: ["Tribord", "Bâbord", "Au centre, ni tribord ni bâbord", "Cela ne dépend pas du vent"],
        reponseIndex: 1,
        explication: "Vent de tribord = tribord amure : la grand-voile est alors bordée côté bâbord.",
      },
      {
        enonce: "Quelle est la différence entre l'amure et l'allure ?",
        options: ["Ce sont deux mots pour la même chose", "L'amure indique le côté d'où vient le vent, l'allure l'angle du bateau par rapport au vent", "L'amure ne concerne que le génois", "L'allure ne s'applique qu'au moteur"],
        reponseIndex: 1,
        explication: "L'amure indique le côté d'où vient le vent (tribord ou bâbord), l'allure indique l'angle entre le bateau et le vent (près, travers, vent arrière...).",
      },
    ],
  },
  {
    id: "l1-les-allures",
    moduleId: "module-1-1",
    ordre: 7,
    titre: "Les allures",
    dureeMinutes: 6,
    resume: "L'angle entre le bateau et le vent change tout.",
    conceptIds: [
      "c-allure-pres",
      "c-allure-bon-plein",
      "c-allure-travers",
      "c-allure-largue",
      "c-allure-grand-largue",
      "c-allure-vent-arriere",
    ],
    blocs: [
      {
        type: "texte",
        contenu:
          "L'allure est l'angle entre la direction suivie par le bateau et la direction du vent réel. Chaque allure a un nom, du plus proche au plus éloigné du vent.",
      },
      { type: "schema", illustration: "points-of-sail-wheel", legende: "La rose des allures" },
      {
        type: "etapes",
        titre: "Les allures, du plus près au plus loin du vent",
        items: [
          "Le près : on navigue au plus proche possible du vent, juste à la limite du lit du vent.",
          "Le bon plein : un peu plus ouvert que le près, allure rapide et confortable.",
          "Le travers : le vent arrive perpendiculairement au bateau (90°).",
          "Le largue : le vent vient de l'arrière du travers.",
          "Le grand largue : encore plus ouvert, entre le largue et le vent arrière.",
          "Le vent arrière : le vent pousse le bateau directement par l'arrière (180°).",
        ],
      },
      {
        type: "erreurs",
        items: [
          "Penser qu'on peut naviguer face au vent : c'est le lit du vent, les voiles n'y fonctionnent pas.",
          "Confondre allure et amure : l'allure est l'angle au vent, l'amure est le côté d'où il vient.",
          "Croire que le vent arrière est toujours l'allure la plus rapide : le bon plein ou le largue sont souvent plus efficaces.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Le vent arrive perpendiculairement au bateau, sur le côté. Quelle allure est-ce ?",
        options: ["Le près", "Le travers", "Le grand largue", "Le vent arrière"],
        reponseIndex: 1,
        explication: "Un vent à 90° de l'axe du bateau correspond à l'allure du travers.",
      },
      {
        enonce: "Quelle allure correspond à naviguer au plus près possible du vent, sans être dans le lit du vent ?",
        options: ["Le vent arrière", "Le près", "Le grand largue", "Le travers"],
        reponseIndex: 1,
        explication: "Le près est l'allure la plus proche du vent, juste à la limite du lit du vent.",
      },
      {
        enonce: "Le vent arrière est-il toujours l'allure la plus rapide ?",
        options: ["Oui, toujours", "Non, le bon plein ou le largue sont souvent plus efficaces", "Oui, mais seulement au moteur", "Non, aucune allure n'est plus rapide qu'une autre"],
        reponseIndex: 1,
        explication: "Contrairement à une idée reçue, le vent arrière n'est pas toujours l'allure la plus rapide : le bon plein ou le largue le sont souvent davantage.",
      },
    ],
  },
  {
    id: "l1-les-voiles",
    moduleId: "module-1-1",
    ordre: 8,
    titre: "Les voiles",
    dureeMinutes: 4,
    resume: "Trois voiles, trois usages.",
    conceptIds: ["c-grand-voile-notion", "c-foc-notion", "c-spi-notion"],
    blocs: [
      {
        type: "texte",
        contenu:
          "La grand-voile est la voile principale, hissée le long du mât et de la bôme. Le génois est la voile d'avant par défaut sur la plupart des voiliers : elle recouvre en partie la grand-voile. Le foc est une voile d'avant plus petite, qui ne la recouvre pas.",
      },
      { type: "schema", illustration: "sails-overview", legende: "Grand-voile, génois/foc et spinnaker" },
      {
        type: "texte",
        contenu:
          "Le spinnaker (spi) est une voile ample et légère, utilisée aux allures portantes (grand largue, vent arrière) pour capter un maximum de vent lorsqu'il vient de l'arrière.",
      },
      {
        type: "erreurs",
        items: [
          "Confondre génois et foc : le génois est plus grand et recouvre une partie de la grand-voile.",
          "Croire que le spinnaker s'utilise au près : il est réservé aux allures portantes.",
        ],
      },
    ],
    questionsInline: [
      {
        enonce: "Quelle voile est la mieux adaptée pour naviguer vent arrière avec un maximum de toile ?",
        options: ["Le génois", "Le foc", "Le spinnaker", "La grand-voile seule"],
        reponseIndex: 2,
        explication: "Le spinnaker est conçu pour les allures portantes comme le vent arrière.",
      },
      {
        enonce: "Quelle est la principale différence entre le génois et le foc ?",
        options: ["Le foc est plus grand et recouvre la grand-voile", "Le génois est plus grand et recouvre en partie la grand-voile", "Ce sont deux noms pour la même voile", "Le foc ne s'utilise qu'au vent arrière"],
        reponseIndex: 1,
        explication: "Le génois est plus grand que le foc et recouvre en partie la grand-voile ; le foc, plus petit, ne la recouvre pas.",
      },
      {
        enonce: "À quelles allures utilise-t-on le spinnaker ?",
        options: ["Au près uniquement", "Aux allures portantes (grand largue, vent arrière)", "Au travers uniquement", "À toutes les allures indifféremment"],
        reponseIndex: 1,
        explication: "Le spinnaker est réservé aux allures portantes, où il capte un maximum de vent venant de l'arrière.",
      },
    ],
  },
];
