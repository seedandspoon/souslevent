import { motion } from "framer-motion";
import { ACCENT, BRAND, DANGER, type Point } from "./tokens";

export type EtatVoile = "bon" | "freine" | "faseille";

/**
 * Surface de voile réactive — jamais deux traits. Le ventre (belly) change
 * réellement avec l'état pour que la relation vent → angle → comportement
 * se voie sans lire de théorie. Voir SKILL.md section "La voile et la bôme".
 */
export function Sail({ mastTop, mastBase, boomEnd, etat }: { mastTop: Point; mastBase: Point; boomEnd: Point; etat: EtatVoile }) {
  const milieu = { x: (mastTop.x + boomEnd.x) / 2, y: (mastTop.y + boomEnd.y) / 2 };

  if (etat === "faseille") {
    const bellyOut = `M${mastTop.x},${mastTop.y} Q${milieu.x + 20},${milieu.y} ${boomEnd.x},${boomEnd.y}`;
    const bellyIn = `M${mastTop.x},${mastTop.y} Q${milieu.x - 20},${milieu.y} ${boomEnd.x},${boomEnd.y}`;
    return (
      <motion.path
        fill="none"
        stroke={ACCENT}
        strokeWidth={3}
        strokeLinecap="round"
        initial={false}
        animate={{ d: [bellyOut, bellyIn] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
      />
    );
  }

  const belly = etat === "bon" ? 30 : 6;
  const color = etat === "bon" ? BRAND : DANGER;
  return (
    <path
      d={`M${mastTop.x},${mastTop.y} Q${milieu.x + belly},${milieu.y} ${boomEnd.x},${boomEnd.y} L${mastBase.x},${mastBase.y} Z`}
      fill={color}
      opacity={0.7}
    />
  );
}
