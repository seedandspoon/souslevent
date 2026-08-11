"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useAngleDrag } from "@/lib/interactions/useAngleDrag";
import { allurePourCap, amurePourCap, distanceAuVent, ALLURES } from "@/lib/interactions/angle";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";

const CX = 200;
const CY = 200;

const INK = "var(--color-ink)";
const BRAND = "var(--color-brand-500)";
const ACCENT = "var(--color-accent)";
const SUCCESS = "var(--color-success)";
const DANGER = "var(--color-danger)";

const HULL_LOCAL = "M200,128 L227,190 L221,252 Q200,266 179,252 L173,190 Z";

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

  const boomAngle = Math.min(80, Math.max(6, d * 0.85));
  const sign = amure === "babord" ? 1 : -1;
  const boomLen = 68;
  const mastPoint = { x: 200, y: 158 };
  const boomEnd = {
    x: mastPoint.x + sign * boomLen * Math.sin((boomAngle * Math.PI) / 180),
    y: mastPoint.y + boomLen * Math.cos((boomAngle * Math.PI) / 180),
  };
  const sailTip = { x: 200, y: 132 };

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
          <circle cx={CX} cy={CY} r={148} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 6" opacity={0.35} />

          {/* Vent, fixe */}
          <line x1={CX} y1={18} x2={CX} y2={55} stroke={BRAND} strokeWidth={4} />
          <path d={`M${CX - 8},55 L${CX + 8},55 L${CX},70 Z`} fill={BRAND} />
          <text x={CX} y={34} textAnchor="middle" fontSize={12} fontWeight={600} fill={BRAND}>
            Vent
          </text>

          {/* Lit du vent (zone interdite) */}
          <path
            d={`M${CX},${CY} L${CX - 148 * Math.sin((40 * Math.PI) / 180)},${CY - 148 * Math.cos((40 * Math.PI) / 180)} A148,148 0 0 1 ${CX + 148 * Math.sin((40 * Math.PI) / 180)},${CY - 148 * Math.cos((40 * Math.PI) / 180)} Z`}
            fill={INK}
            opacity={0.06}
          />

          {/* Groupe bateau + voile, tourne avec l'angle */}
          <g transform={`rotate(${angle} ${CX} ${CY})`}>
            <path d={HULL_LOCAL} fill="none" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
            <line x1={mastPoint.x} y1={mastPoint.y} x2={mastPoint.x} y2={mastPoint.y - 6} stroke={INK} strokeWidth={4} />

            {enZoneInterdite ? (
              <motion.path
                fill="none"
                stroke={ACCENT}
                strokeWidth={3}
                initial={false}
                animate={{
                  d: [
                    `M${sailTip.x},${sailTip.y} Q${mastPoint.x + 18},${mastPoint.y + 10} ${mastPoint.x},${mastPoint.y + 20} Q${mastPoint.x - 18},${mastPoint.y + 10} ${boomEnd.x},${boomEnd.y}`,
                    `M${sailTip.x},${sailTip.y} Q${mastPoint.x - 18},${mastPoint.y + 10} ${mastPoint.x},${mastPoint.y + 20} Q${mastPoint.x + 18},${mastPoint.y + 10} ${boomEnd.x},${boomEnd.y}`,
                  ],
                }}
                transition={{ duration: 0.35, repeat: Infinity, repeatType: "reverse" }}
              />
            ) : (
              <path
                d={`M${sailTip.x},${sailTip.y} Q${(sailTip.x + boomEnd.x) / 2 + sign * 14},${(sailTip.y + boomEnd.y) / 2} ${boomEnd.x},${boomEnd.y} L${mastPoint.x},${mastPoint.y} Z`}
                fill={BRAND}
                opacity={0.7}
              />
            )}

            <line x1={mastPoint.x} y1={mastPoint.y} x2={boomEnd.x} y2={boomEnd.y} stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
            <circle cx={CX} cy={130} r={5} fill={enZoneInterdite ? DANGER : atteint ? SUCCESS : INK} />
          </g>
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
