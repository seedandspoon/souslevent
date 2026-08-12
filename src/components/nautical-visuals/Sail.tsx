import { motion } from "framer-motion";
import { ACCENT, BRAND, DANGER, INK, type Point } from "./tokens";

export type EtatVoile = "bon" | "freine" | "faseille";

/**
 * Surface de voile réactive — jamais deux traits. Le ventre (belly) change
 * réellement avec l'état pour que la relation vent → angle → comportement
 * se voie sans lire de théorie. Voir SKILL.md section "La voile et la bôme".
 *
 * Le guindant part d'un seul point (le mât) : en vue de dessus, un mât
 * vertical se projette en un point, jamais en un segment — la voile est
 * donc un triangle/coin qui part de ce point et s'ouvre vers la bôme, pas
 * un quadrilatère avec un bord de guindant qui aurait une longueur propre.
 */
export function Sail({ mast, boomEnd, etat, sign }: { mast: Point; boomEnd: Point; etat: EtatVoile; sign: 1 | -1 }) {
  const milieu = { x: (mast.x + boomEnd.x) / 2, y: (mast.y + boomEnd.y) / 2 };
  // Le ventre doit toujours bomber du côté de la bôme (sign) — jamais dans
  // une direction absolue fixe, sinon la voile bombe vers l'intérieur du
  // bateau côté tribord (bug corrigé ici).

  if (etat === "faseille") {
    const bellyOut = `M${mast.x},${mast.y} Q${milieu.x + sign * 20},${milieu.y} ${boomEnd.x},${boomEnd.y}`;
    const bellyIn = `M${mast.x},${mast.y} Q${milieu.x - sign * 20},${milieu.y} ${boomEnd.x},${boomEnd.y}`;
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
      d={`M${mast.x},${mast.y} Q${milieu.x + sign * belly},${milieu.y} ${boomEnd.x},${boomEnd.y} Z`}
      fill={color}
      opacity={0.7}
      stroke={INK}
      strokeWidth={1.25}
      strokeOpacity={0.5}
    />
  );
}
