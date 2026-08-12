import { motion } from "framer-motion";
import { ACCENT, BRAND, DANGER, INK, type Point } from "./tokens";
import type { EtatVoile } from "./Sail";

/**
 * Foc/génois — même grammaire que la grand-voile (voir Sail.tsx) : un
 * point fixe (l'amure, à la proue) et un point mobile (l'écoute), reliés
 * par une surface remplie. Pas de point de drisse représenté — il
 * n'ajoutait pas d'information utile, seulement un troisième coin à
 * interpréter. Ce qui doit se lire d'un coup d'œil : l'orientation (le
 * bord amure→écoute) indique tribord/bâbord et bordé/choqué ; le
 * gonflement (le côté arrondi) indique que la voile porte, pas qu'elle
 * faseille. Toujours pas de bôme : la chute flotte sans spar, seule
 * différence structurelle avec la grand-voile.
 */
export function Jib({ tack, clew, sign, etat }: { tack: Point; clew: Point; sign: 1 | -1; etat: EtatVoile }) {
  const milieu = { x: (tack.x + clew.x) / 2, y: (tack.y + clew.y) / 2 };

  if (etat === "faseille") {
    const bellyOut = `M${tack.x},${tack.y} Q${milieu.x + sign * 16},${milieu.y} ${clew.x},${clew.y}`;
    const bellyIn = `M${tack.x},${tack.y} Q${milieu.x - sign * 16},${milieu.y} ${clew.x},${clew.y}`;
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
      d={`M${tack.x},${tack.y} Q${milieu.x + sign * belly},${milieu.y} ${clew.x},${clew.y} Z`}
      fill={color}
      opacity={0.55}
      stroke={INK}
      strokeWidth={1.25}
      strokeOpacity={0.5}
    />
  );
}
