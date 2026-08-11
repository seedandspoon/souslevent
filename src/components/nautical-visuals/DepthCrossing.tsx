import { motion } from "framer-motion";
import { BACKDROP } from "./tokens";

interface CrossingStyle {
  color: string;
  width: number;
}

/**
 * Rend un croisement dessus/dessous lisible sans calcul d'intersection :
 * le brin "over" reçoit un halo de la couleur du fond, plus épais, dessiné
 * juste avant son propre trait — ce qui coupe visuellement le brin
 * "under" à l'endroit du croisement. Voir
 * .claude/skills/nautical-pedagogical-visuals/references/svg-techniques.md
 * section 4 pour le détail de la technique et ses limites (fond non uni).
 *
 * `animateOver` fait apparaître le brin du dessus (et son halo) par un
 * tracé progressif plutôt que statique — utile quand ce croisement est
 * précisément le mouvement qu'on montre à cette étape.
 */
export function DepthCrossing({
  under,
  over,
  underStyle,
  overStyle,
  backgroundColor = BACKDROP,
  animateOver = false,
  duration = 1,
  replayKey = 0,
}: {
  under: string;
  over: string;
  underStyle: CrossingStyle;
  overStyle: CrossingStyle;
  backgroundColor?: string;
  animateOver?: boolean;
  duration?: number;
  replayKey?: number | string;
}) {
  const haloWidth = overStyle.width + 6;

  return (
    <g>
      <path d={under} fill="none" stroke={underStyle.color} strokeWidth={underStyle.width} strokeLinecap="round" />
      {animateOver ? (
        <>
          <motion.path
            key={`halo-${replayKey}`}
            d={over}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={haloWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration, ease: "easeInOut" }}
          />
          <motion.path
            key={`over-${replayKey}`}
            d={over}
            fill="none"
            stroke={overStyle.color}
            strokeWidth={overStyle.width}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration, ease: "easeInOut" }}
          />
        </>
      ) : (
        <>
          <path d={over} fill="none" stroke={backgroundColor} strokeWidth={haloWidth} strokeLinecap="round" />
          <path d={over} fill="none" stroke={overStyle.color} strokeWidth={overStyle.width} strokeLinecap="round" />
        </>
      )}
    </g>
  );
}
