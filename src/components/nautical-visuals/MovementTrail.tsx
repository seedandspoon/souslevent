import { motion, AnimatePresence } from "framer-motion";
import { ACCENT } from "./tokens";

/**
 * Arc de balayage transitoire pour une pièce qui vient de réagir à une
 * manipulation (ex. la bôme qui pivote). Usage ponctuel uniquement — ne
 * jamais laisser un MovementTrail affiché en permanence, voir la
 * taxonomie des mouvements dans SKILL.md. `visible` doit repasser à false
 * peu après le changement pour rester un signal, pas un décor.
 */
export function MovementTrail({ path, visible }: { path: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.path
          d={path}
          fill="none"
          stroke={ACCENT}
          strokeWidth={2}
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </AnimatePresence>
  );
}
