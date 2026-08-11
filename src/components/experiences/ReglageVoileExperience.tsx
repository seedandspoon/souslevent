"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { DragSlider } from "@/components/interactive/DragSlider";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";

const INK = "var(--color-ink)";
const BRAND = "var(--color-brand-500)";
const ACCENT = "var(--color-accent)";
const DANGER = "var(--color-danger)";

const ALLURES_CHIPS = [
  { id: "pres", label: "Près", windAngle: 48 },
  { id: "travers", label: "Travers", windAngle: 90 },
  { id: "largue", label: "Largue", windAngle: 122 },
];

const CX = 200;
const MAST_TOP = { x: 200, y: 55 };
const MAST_BASE = { x: 200, y: 178 };
const BOOM_LEN = 92;
const TOLERANCE = 12;

function polarFromLeft(angleFromTop: number, radius: number) {
  const rad = (angleFromTop * Math.PI) / 180;
  return { x: CX - radius * Math.sin(rad), y: MAST_BASE.y - 15 - radius * Math.cos(rad) };
}

export function ReglageVoileExperience() {
  const [chipId, setChipId] = useState("travers");
  const [slider, setSlider] = useState(50);

  const chip = ALLURES_CHIPS.find((c) => c.id === chipId)!;
  const boomAngle = 6 + (slider / 100) * 78; // 6° (bordé) .. 84° (choqué)
  const optimal = chip.windAngle / 2;
  const ecart = boomAngle - optimal;

  const etat: "faseye" | "freine" | "bon" = ecart > TOLERANCE ? "faseye" : ecart < -TOLERANCE ? "freine" : "bon";

  const boomRad = (boomAngle * Math.PI) / 180;
  const boomEnd = { x: MAST_BASE.x + BOOM_LEN * Math.sin(boomRad), y: MAST_BASE.y + BOOM_LEN * Math.cos(boomRad) * 0.35 };
  const windPoint = polarFromLeft(chip.windAngle, 150);
  const windTip = { x: CX - 42, y: MAST_BASE.y - 55 };
  const windArrowDeg = (Math.atan2(windTip.y - windPoint.y, windTip.x - windPoint.x) * 180) / Math.PI + 90;

  const belly = etat === "bon" ? 30 : etat === "freine" ? 6 : 20;
  const sailColor = etat === "freine" ? DANGER : BRAND;

  const message = useMemo(() => {
    if (etat === "faseye")
      return { tone: "warning" as const, titre: "Pas assez bordée", detail: "La voile faseye : borde un peu plus pour qu'elle regonfle." };
    if (etat === "freine")
      return { tone: "error" as const, titre: "Trop bordée", detail: "La voile est plaquée et freine le bateau : choque un peu." };
    return { tone: "success" as const, titre: "Bon réglage", detail: "La voile est bien gonflée, le bateau avance efficacement." };
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

      <div className="rounded-2xl bg-brand-50 py-4">
        <svg viewBox="0 0 400 320" className="w-full max-h-72 mx-auto">
          {/* Vent */}
          <line x1={windPoint.x} y1={windPoint.y} x2={windTip.x} y2={windTip.y} stroke={BRAND} strokeWidth={3.5} />
          <path
            d={`M${windTip.x - 8},${windTip.y - 6} L${windTip.x + 8},${windTip.y - 6} L${windTip.x},${windTip.y + 8} Z`}
            fill={BRAND}
            transform={`rotate(${windArrowDeg} ${windTip.x} ${windTip.y})`}
          />

          {/* Mât */}
          <line x1={MAST_TOP.x} y1={MAST_TOP.y} x2={MAST_BASE.x} y2={MAST_BASE.y} stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
          {/* Bôme */}
          <line x1={MAST_BASE.x} y1={MAST_BASE.y} x2={boomEnd.x} y2={boomEnd.y} stroke={INK} strokeWidth={4} strokeLinecap="round" />

          {/* Voile */}
          {etat === "faseye" ? (
            <motion.path
              fill="none"
              stroke={ACCENT}
              strokeWidth={3}
              strokeLinecap="round"
              initial={false}
              animate={{
                d: [
                  `M${MAST_TOP.x},${MAST_TOP.y + 15} Q${MAST_TOP.x + 22},${(MAST_TOP.y + boomEnd.y) / 2} ${boomEnd.x},${boomEnd.y}`,
                  `M${MAST_TOP.x},${MAST_TOP.y + 15} Q${MAST_TOP.x - 22},${(MAST_TOP.y + boomEnd.y) / 2} ${boomEnd.x},${boomEnd.y}`,
                ],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
            />
          ) : (
            <path
              d={`M${MAST_TOP.x},${MAST_TOP.y + 15} Q${MAST_TOP.x + belly},${(MAST_TOP.y + boomEnd.y) / 2} ${boomEnd.x},${boomEnd.y} L${MAST_BASE.x},${MAST_BASE.y} Z`}
              fill={sailColor}
              opacity={0.7}
            />
          )}
        </svg>
      </div>

      <DragSlider value={slider} onChange={setSlider} leftLabel="Border" rightLabel="Choquer" tone="brand" />

      <FeedbackBanner tone={message.tone} titre={message.titre} detail={message.detail} />
    </div>
  );
}
