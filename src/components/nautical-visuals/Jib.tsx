import { motion } from "framer-motion";
import { ACCENT, BRAND, DANGER, INK, type Point } from "./tokens";
import type { EtatVoile } from "./Sail";

/**
 * Foc/génois — devant le mât, attaché à l'étai. Jamais un simple
 * triangle redimensionné de la grand-voile : géométrie propre (point
 * d'amure à la proue, point de drisse près du mât, point d'écoute libre
 * qui pivote), et pas de bôme puisque le foc n'en a pas. Voir SKILL.md
 * section "La voile et la bôme".
 *
 * Le point d'écoute (clew) est calculé par l'appelant (voir
 * SailboatDiagram) — il doit se trouver nettement en arrière du mât, pas
 * collé à la proue, sinon le foc paraît réduit à deux points (amure +
 * drisse) sans vraie voile entre les trois coins.
 */
export function Jib({
  head,
  tack,
  clew,
  sign,
  etat,
}: {
  head: Point;
  tack: Point;
  clew: Point;
  sign: 1 | -1;
  etat: EtatVoile;
}) {
  const milieu = { x: (head.x + clew.x) / 2, y: (head.y + clew.y) / 2 };

  if (etat === "faseille") {
    const bellyOut = `M${head.x},${head.y} Q${milieu.x + sign * 16},${milieu.y} ${clew.x},${clew.y}`;
    const bellyIn = `M${head.x},${head.y} Q${milieu.x - sign * 16},${milieu.y} ${clew.x},${clew.y}`;
    return (
      <motion.path
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={false}
        animate={{ d: [bellyOut, bellyIn] }}
        transition={{ duration: 0.28, repeat: Infinity, repeatType: "reverse" }}
      />
    );
  }

  const belly = etat === "bon" ? 26 : 5;
  const color = etat === "bon" ? BRAND : DANGER;
  return (
    <path
      d={`M${head.x},${head.y} Q${milieu.x + sign * belly},${milieu.y} ${clew.x},${clew.y} L${tack.x},${tack.y} Z`}
      fill={color}
      opacity={0.55}
      stroke={INK}
      strokeWidth={1.25}
      strokeOpacity={0.5}
    />
  );
}
