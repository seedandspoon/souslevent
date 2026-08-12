import { motion } from "framer-motion";
import { ACCENT, INK } from "./tokens";

export type RopeRole = "dormant" | "courant";

const STYLE: Record<RopeRole, { color: string; width: number }> = {
  dormant: { color: INK, width: 4.5 },
  courant: { color: ACCENT, width: 4 },
};

/**
 * Segment de cordage. Le rôle (dormant/courant) est un contrat visuel
 * constant dans toute l'app — voir SKILL.md. `animate` déclenche un tracé
 * progressif (pathLength 0→1) pour montrer un mouvement plutôt qu'un
 * simple "avant/après" ; `replayKey` force le redémarrage de l'animation
 * (incrémente-le pour "rejouer").
 */
export function Rope({
  d,
  role,
  animate = false,
  duration = 1,
  replayKey = 0,
}: {
  d: string;
  role: RopeRole;
  animate?: boolean;
  duration?: number;
  replayKey?: number | string;
}) {
  const { color, width } = STYLE[role];

  if (!animate) {
    return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />;
  }

  return (
    <motion.path
      key={replayKey}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration, ease: "easeInOut" }}
    />
  );
}
