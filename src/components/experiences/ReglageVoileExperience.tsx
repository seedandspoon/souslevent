"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { DragSlider } from "@/components/interactive/DragSlider";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { SailboatDiagram } from "@/components/nautical-visuals";

// Référence officielle de la skill "nautical-pedagogical-visuals" — voir
// .claude/skills/nautical-pedagogical-visuals/SKILL.md. Le voilier de
// référence porte grand-voile ET foc/génois par défaut ; ici, seul le
// réglage de la grand-voile est piloté par le curseur pour l'instant,
// mais les deux voiles doivent rester visibles et identifiables.

const ALLURES_CHIPS = [
  { id: "pres", label: "Près", windAngle: 48 },
  { id: "travers", label: "Travers", windAngle: 90 },
  { id: "largue", label: "Largue", windAngle: 122 },
];

const CX = 200;
const CY = 200;
const HULL_LENGTH = 130;
const TOLERANCE = 12;

export function ReglageVoileExperience() {
  const [chipId, setChipId] = useState("travers");
  const [slider, setSlider] = useState(50);

  const chip = ALLURES_CHIPS.find((c) => c.id === chipId)!;
  const boomAngle = 6 + (slider / 100) * 78; // 6° (bordé) .. 84° (choqué)
  const optimal = chip.windAngle / 2;
  const ecart = boomAngle - optimal;

  const etat: "faseille" | "freine" | "bon" = ecart > TOLERANCE ? "faseille" : ecart < -TOLERANCE ? "freine" : "bon";

  const message = useMemo(() => {
    if (etat === "faseille")
      return { tone: "warning" as const, titre: "Pas assez bordée", detail: "Les voiles faseillent : borde un peu plus pour qu'elles regonflent." };
    if (etat === "freine")
      return { tone: "error" as const, titre: "Trop bordée", detail: "La grand-voile est plaquée et freine le bateau : choque un peu." };
    return { tone: "success" as const, titre: "Bon réglage", detail: "Les voiles sont bien gonflées, le bateau avance efficacement." };
  }, [etat]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {ALLURES_CHIPS.map((c) => (
          <button
            key={c.id}
            onClick={() => setChipId(c.id)}
            className={clsx(
              "flex-1 text-sm font-medium py-2 rounded-lg border transition-colors",
              chipId === c.id ? "border-brand-500 bg-brand-50 text-brand-700" : "border-border text-ink-soft"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-brand-50 py-3">
        <svg viewBox="0 0 400 400" className="w-full max-h-80 mx-auto">
          <SailboatDiagram
            cx={CX}
            cy={CY}
            hullLength={HULL_LENGTH}
            headingDeg={0}
            boomAngleDeg={boomAngle}
            boomSign={1}
            mainsailEtat={etat}
            windTipY={70}
            windAngleDeg={-chip.windAngle}
          />
        </svg>
      </div>

      <DragSlider value={slider} onChange={setSlider} leftLabel="Border" rightLabel="Choquer" tone="brand" />

      <FeedbackBanner tone={message.tone} titre={message.titre} detail={message.detail} />
    </div>
  );
}
