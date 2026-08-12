"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useAngleDrag } from "@/lib/interactions/useAngleDrag";
import { allurePourCap, amurePourCap, distanceAuVent, ALLURES } from "@/lib/interactions/angle";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { SailboatDiagram } from "@/components/nautical-visuals";
import { INK, BRAND, SUCCESS, DANGER } from "@/components/nautical-visuals/tokens";

// Référence officielle de la skill "nautical-pedagogical-visuals" —
// voir .claude/skills/nautical-pedagogical-visuals/SKILL.md avant de
// modifier ce fichier ou d'en créer un nouveau du même genre.

const CX = 200;
const CY = 210;
const HULL_LENGTH = 190;

const CIBLES = ALLURES.filter((a) => a.id !== "face-au-vent");

export function AlluresExperience() {
  const { angle, dragging, svgRef, handlers } = useAngleDrag(20, { x: CX, y: CY });
  const [mode, setMode] = useState<"explorer" | "defi">("explorer");
  const [cible, setCible] = useState(() => CIBLES[Math.floor(Math.random() * CIBLES.length)]);
  const [reussi, setReussi] = useState(false);

  const allure = allurePourCap(angle);
  const amure = amurePourCap(angle);
  const d = distanceAuVent(angle);
  const enZoneInterdite = allure.id === "face-au-vent";

  // Bornée pour que la bôme reste toujours visuellement distincte du mât
  // (jamais quasi-colinéaire) sans pour autant dépasser la coque de façon
  // disproportionnée à vent arrière — voir SKILL.md "La voile et la bôme".
  const boomAngle = Math.min(72, Math.max(16, d * 0.75));
  const sign = amure === "babord" ? 1 : -1;

  const atteint = mode === "defi" && allure.id === cible.id;
  if (atteint && !reussi) setReussi(true);

  function nouveauDefi() {
    let next = cible;
    while (next.id === cible.id) next = CIBLES[Math.floor(Math.random() * CIBLES.length)];
    setCible(next);
    setReussi(false);
  }

  const message = useMemo(() => {
    if (enZoneInterdite) return "La voile ne peut pas porter : tu es dans le lit du vent.";
    if (allure.id === "vent-arriere") return "Le vent pousse directement par l'arrière.";
    if (allure.id === "pres") return "Au plus proche du vent, juste avant la zone interdite.";
    return null;
  }, [allure.id, enZoneInterdite]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-xl bg-surface-2 p-1">
        {(["explorer", "defi"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setReussi(false);
            }}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
              mode === m ? "bg-surface text-ink shadow-sm" : "text-ink-soft"
            }`}
          >
            {m === "explorer" ? "Explorer" : "Défi"}
          </button>
        ))}
      </div>

      {mode === "defi" && (
        <div className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
          <span className="text-sm text-ink">
            Objectif : place le bateau <strong>{cible.label.toLowerCase()}</strong>
          </span>
          {reussi && (
            <button onClick={nouveauDefi} className="text-brand-500 shrink-0">
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-brand-50 py-3 select-none">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full max-h-80 mx-auto touch-none cursor-grab active:cursor-grabbing"
          {...handlers}
        >
          {/* Zone de capture invisible : permet de glisser depuis n'importe où du canevas */}
          <rect x={0} y={0} width={400} height={400} fill="transparent" />

          {/* Cercle de manipulation */}
          <circle cx={CX} cy={CY} r={160} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 6" opacity={0.35} />

          {/* Lit du vent (zone interdite) */}
          <path
            d={`M${CX},${CY} L${CX - 160 * Math.sin((40 * Math.PI) / 180)},${CY - 160 * Math.cos((40 * Math.PI) / 180)} A160,160 0 0 1 ${CX + 160 * Math.sin((40 * Math.PI) / 180)},${CY - 160 * Math.cos((40 * Math.PI) / 180)} Z`}
            fill={INK}
            opacity={0.06}
          />

          <SailboatDiagram
            cx={CX}
            cy={CY}
            hullLength={HULL_LENGTH}
            headingDeg={angle}
            boomAngleDeg={boomAngle}
            boomSign={sign}
            mainsailEtat={enZoneInterdite ? "faseille" : "bon"}
            bowMarkerColor={enZoneInterdite ? DANGER : atteint ? SUCCESS : INK}
          />
        </svg>
      </div>

      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={allure.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xl font-semibold text-ink"
          >
            {allure.label}
          </motion.p>
        </AnimatePresence>
        {amure && (
          <p className="text-sm text-ink-soft mt-0.5">
            {amure === "tribord" ? "Tribord amure" : "Bâbord amure"}
          </p>
        )}
      </div>

      {!dragging && message && <FeedbackBanner tone={enZoneInterdite ? "warning" : "neutral"} titre={message} />}

      {atteint && <FeedbackBanner tone="success" titre="Bien joué !" detail={`Le bateau est bien ${cible.label.toLowerCase()}.`} />}

      <p className="text-center text-xs text-ink-soft">Fais glisser le bateau autour du vent.</p>
    </div>
  );
}
