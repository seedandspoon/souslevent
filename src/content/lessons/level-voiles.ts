import type { Lesson } from "../types";

export const levelVoilesLessons: Lesson[] = [
  {
    id: "l-regler-les-voiles",
    moduleId: "module-voiles-1",
    ordre: 1,
    titre: "Régler les voiles",
    dureeMinutes: 6,
    resume: "La boucle à répéter à chaque réglage : regarder, régler, observer, corriger.",
    conceptIds: ["c-ecoute", "c-faseillement", "c-penon"],
    blocs: [
      {
        type: "texte",
        contenu:
          "Tu connais déjà les noms — écoute, drisse, winch. Le réglage de voile, c'est une compétence à part entière : ce n'est jamais une position qu'on règle une fois pour toutes, c'est une boucle qu'on répète tout le temps qu'on navigue, à chaque changement de vent ou d'allure.",
      },
      {
        type: "etapes",
        titre: "La boucle à chaque réglage",
        items: [
          "Regarder : observe la voile, son ventre, son bord d'attaque. Sur un vrai bateau, les penons — ces petits rubans fixés sur la voile — donnent le signal le plus fin : s'ils décrochent d'un côté, la voile n'est pas encore réglée.",
          "Régler : borde (tire l'écoute) ou choque (relâche) par petites touches, jamais d'un coup sec.",
          "Observer : la réaction immédiate — la voile se gonfle et le bateau accélère, ou au contraire elle faseille ou freine.",
          "Corriger : ajuste encore si besoin. Le bon réglage n'est jamais figé : il change avec le vent, avec l'allure, avec chaque risée.",
        ],
      },
      {
        type: "schema",
        illustration: "telltale-trim",
        legende: "Un penon qui flotte du côté au vent : pas assez bordée. Les deux qui collent : bien réglée. Un penon qui flotte du côté sous le vent : trop bordée.",
      },
      {
        type: "etapes",
        titre: "Reconnaître les 3 états d'une voile",
        items: [
          "Pas assez bordée, elle faseille : le bord d'attaque flotte et claque, la voile perd sa forme et ne porte plus.",
          "Bien réglée : le ventre est creux et régulier, le bateau avance à sa vitesse.",
          "Trop bordée, elle freine : la voile est plaquée, plate — elle ralentit le bateau au lieu de le propulser. Ce piège est moins visible qu'une voile qui faseille, et souvent moins repéré par un débutant.",
        ],
      },
      {
        type: "astuce",
        contenu:
          "Sur un vrai bateau : borde jusqu'à ce que la voile cesse de faseiller, puis choque tout doucement jusqu'à ce qu'elle recommence tout juste à faseiller au bord d'attaque. C'est exactement là qu'elle est réglée au plus fin — pas avant, pas après.",
      },
      {
        type: "erreurs",
        items: [
          "Régler une fois puis ne plus y toucher : le réglage optimal change à chaque variation de vent ou d'allure, il demande d'y revenir sans arrêt.",
          "Corriger trop fort d'un coup plutôt que par petites touches : on passe d'un excès à l'autre sans jamais se stabiliser sur le bon réglage.",
          "Se fier uniquement à la vitesse ressentie plutôt qu'à la forme de la voile : la voile elle-même reste le meilleur indicateur, avant même le ressenti.",
        ],
      },
    ],
    questionInline: {
      enonce: "La voile est plaquée, toute plate, et le bateau semble ralentir. Que fais-tu ?",
      options: ["Je borde encore plus", "Je choque un peu", "Je ne touche à rien, c'est déjà réglé", "Je change d'allure"],
      reponseIndex: 1,
      explication: "Une voile plaquée et plate freine le bateau : c'est le signe qu'elle est trop bordée, pas pas assez — il faut choquer, pas border.",
    },
  },
];
