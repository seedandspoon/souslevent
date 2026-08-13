"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useAngleDrag } from "@/lib/interactions/useAngleDrag";
import { allurePourCap, amurePourCap, distanceAuVent, ALLURES, type Amure } from "@/lib/interactions/angle";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { SailboatDiagram } from "@/components/nautical-visuals";
import { INK, BRAND, DANGER, polar } from "@/components/nautical-visuals/tokens";
import { enregistrerReponse } from "@/lib/progress";

// Concept testé par chaque allure du mode Défi — "face-au-vent" n'a pas
// de concept dédié (ce n'est pas une allure qu'on choisit, juste la zone
// interdite), donc pas de bouton associé à enregistrer.
const ALLURE_CONCEPT: Record<string, string> = {
  pres: "c-allure-pres",
  "bon-plein": "c-allure-bon-plein",
  travers: "c-allure-travers",
  largue: "c-allure-largue",
  "grand-largue": "c-allure-grand-largue",
  "vent-arriere": "c-allure-vent-arriere",
};

// Référence officielle de la skill "nautical-pedagogical-visuals" —
// voir .claude/skills/nautical-pedagogical-visuals/SKILL.md avant de
// modifier ce fichier ou d'en créer un nouveau du même genre.

const CX = 200;
const CY = 210;
const HULL_LENGTH = 190;
const DIAL_R = 160;

// Bornes angulaires entre deux allures (voir ALLURES dans angle.ts) —
// sert à placer des points de repère sur le cadran, et existent une fois
// pour chaque amure (d et 360-d).
const ALLURE_BOUNDARIES = [40, 55, 80, 100, 140, 170];

export function AlluresExperience() {
  const { angle, dragging, svgRef, handlers } = useAngleDrag(20, { x: CX, y: CY });
  const [mode, setMode] = useState<"explorer" | "defi">("explorer");
  const [selectedAllure, setSelectedAllure] = useState<string | null>(null);
  const [selectedAmure, setSelectedAmure] = useState<Amure>(null);

  const allure = allurePourCap(angle);
  const amure = amurePourCap(angle);
  const d = distanceAuVent(angle);
  const enZoneInterdite = allure.id === "face-au-vent";

  // Bornée pour que la bôme reste toujours visuellement distincte du mât
  // (jamais quasi-colinéaire) sans pour autant dépasser la coque de façon
  // disproportionnée à vent arrière — voir SKILL.md "La voile et la bôme".
  const boomAngle = Math.min(72, Math.max(16, d * 0.75));
  const sign = amure === "babord" ? 1 : -1;

  // À l'approche du vent arrière, le génois bascule progressivement du côté
  // opposé à la bôme (configuration "en ciseaux") — transition continue
  // entre le début du grand largue (140°) et le vent arrière (170°),
  // mêmes bornes que les points de repère du cadran.
  const jibOppositeAmount = Math.min(1, Math.max(0, (d - 140) / 30));

  // Dès que le bateau bouge, on efface les réponses pour forcer une
  // nouvelle observation plutôt que de garder un signal vert/rouge périmé.
  // Ajustement pendant le rendu plutôt qu'un effet, pour éviter un cycle de
  // rendu superflu (cf. https://react.dev/learn/you-might-not-need-an-effect).
  const [prevAngle, setPrevAngle] = useState(angle);
  if (angle !== prevAngle) {
    setPrevAngle(angle);
    setSelectedAllure(null);
    setSelectedAmure(null);
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
              setSelectedAllure(null);
              setSelectedAmure(null);
            }}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
              mode === m ? "bg-surface text-ink shadow-sm" : "text-ink-soft"
            }`}
          >
            {m === "explorer" ? "Explorer" : "Défi"}
          </button>
        ))}
      </div>

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
          <circle cx={CX} cy={CY} r={DIAL_R} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 6" opacity={0.35} />

          {/* Points de repère aux changements d'allure, une paire par borne (une par amure).
              Arrondis à 0.01 : Math.sin/cos peuvent différer d'un ULP entre le moteur JS du
              serveur (SSR) et celui du navigateur, ce qui suffit à déclencher un warning
              d'hydratation sur des coordonnées non arrondies. */}
          {ALLURE_BOUNDARIES.flatMap((b) =>
            [b, 360 - b].map((heading) => {
              const p = polar({ x: CX, y: CY }, heading, DIAL_R);
              const cx = Math.round(p.x * 100) / 100;
              const cy = Math.round(p.y * 100) / 100;
              return <circle key={heading} cx={cx} cy={cy} r={3.5} fill={INK} opacity={0.4} />;
            })
          )}

          {/* Lit du vent (zone interdite) */}
          <path
            d={`M${CX},${CY} L${CX - DIAL_R * Math.sin((40 * Math.PI) / 180)},${CY - DIAL_R * Math.cos((40 * Math.PI) / 180)} A${DIAL_R},${DIAL_R} 0 0 1 ${CX + DIAL_R * Math.sin((40 * Math.PI) / 180)},${CY - DIAL_R * Math.cos((40 * Math.PI) / 180)} Z`}
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
            bowMarkerColor={enZoneInterdite ? DANGER : INK}
            jibOppositeAmount={jibOppositeAmount}
          />
        </svg>
      </div>

      {mode === "explorer" && (
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
      )}

      {mode === "explorer" && !dragging && message && (
        <FeedbackBanner tone={enZoneInterdite ? "warning" : "neutral"} titre={message} />
      )}

      {mode === "defi" && (
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm text-ink-soft">
            Fais glisser le bateau, puis identifie l&apos;allure et l&apos;amure.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {ALLURES.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setSelectedAllure(a.id);
                  const concept = ALLURE_CONCEPT[allure.id];
                  if (concept) enregistrerReponse([concept], a.id === allure.id);
                }}
                className={clsx(
                  "text-sm font-medium py-2 px-3 rounded-lg border transition-colors",
                  selectedAllure === a.id
                    ? a.id === allure.id
                      ? "border-success bg-success-soft text-success"
                      : "border-danger bg-danger-soft text-danger"
                    : "border-border text-ink-soft"
                )}
              >
                {a.label}
              </button>
            ))}
          </div>

          {amure && (
            <div className="grid grid-cols-2 gap-2">
              {(["babord", "tribord"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setSelectedAmure(a);
                    enregistrerReponse([amure === "tribord" ? "c-amure-tribord" : "c-amure-babord"], a === amure);
                  }}
                  className={clsx(
                    "text-sm font-medium py-2 px-3 rounded-lg border transition-colors",
                    selectedAmure === a
                      ? a === amure
                        ? "border-success bg-success-soft text-success"
                        : "border-danger bg-danger-soft text-danger"
                      : "border-border text-ink-soft"
                  )}
                >
                  {a === "babord" ? "Bâbord amure" : "Tribord amure"}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {mode === "explorer" && <p className="text-center text-xs text-ink-soft">Fais glisser le bateau autour du vent.</p>}
    </div>
  );
}
