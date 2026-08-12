"use client";

import { useState } from "react";
import clsx from "clsx";
import { useAngleDrag } from "@/lib/interactions/useAngleDrag";
import { amurePourCap, distanceAuVent, normalize360, type Amure } from "@/lib/interactions/angle";
import { Button } from "@/components/ui/Button";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { SailboatDiagram } from "@/components/nautical-visuals";
import { BRAND, INK } from "@/components/nautical-visuals/tokens";
import type { EtatVoile } from "@/components/nautical-visuals/Sail";

// Référence officielle de la skill "nautical-pedagogical-visuals" — voir
// .claude/skills/nautical-pedagogical-visuals/SKILL.md avant de modifier
// ce fichier.
//
// La barre est le seul geste continu (glisser le bateau) : on l'amorce
// et on peut la corriger à tout instant. Tout le reste — annoncer, ouvrir
// le taquet, choquer, attraper la nouvelle écoute, border, bloquer — est
// un geste ponctuel (un tap), déclenché en regardant le bateau plutôt
// qu'en réglant un curseur détaché de ce qu'on voit : ça reproduit le vrai
// rythme de la manœuvre (barre en continu, gestes d'écoute au bon
// moment) plutôt qu'une succession d'étapes qui figent le bateau. La
// grand-voile suit le cap automatiquement ; le génois suit sa propre
// progression (jibSignOverride) pour rester décorrélé de la barre — ce
// décalage possible rend l'erreur "génois resté à contre" visible si on
// tourne sans gérer l'écoute.
//
// L'exercice de mémorisation "remets les étapes dans l'ordre" ne vit
// plus ici : il a été déplacé dans Quiz (voir qz-ordre-virement dans
// content/quiz.ts) pour servir de révision indépendante de la
// manipulation.

const CX = 200;
const CY = 210;
const HULL_LENGTH = 190;
const DIAL_R = 160;
const PRES_ANGLE = 45;
const ZONE_INTERDITE_MAX = 40; // même borne que ALLURES "face-au-vent" (angle.ts)
const TOLERANCE_ARRIVEE = 10;

type StepId = "route" | "annonce" | "barre" | "taquet" | "choquer" | "attraper" | "border" | "bloquer" | "stabiliser";

interface StepDef {
  id: StepId;
  label: string;
}

const STEP_ORDER: StepDef[] = [
  { id: "route", label: "Vérifier que la route est dégagée" },
  { id: "annonce", label: "Annoncer : « Paré à virer ? / Je vire ! »" },
  { id: "barre", label: "Pousser doucement la barre sous le vent" },
  { id: "taquet", label: "Ouvrir le taquet de l'écoute bordée" },
  { id: "choquer", label: "Choquer l'écoute à la main" },
  { id: "attraper", label: "Attraper la nouvelle écoute" },
  { id: "border", label: "Border à la main puis terminer au winch" },
  { id: "bloquer", label: "Bloquer l'écoute dans son taquet" },
  { id: "stabiliser", label: "Stabiliser le cap sur la nouvelle amure" },
];

function amureLabel(amure: Amure): string {
  return amure === "babord" ? "bâbord" : amure === "tribord" ? "tribord" : "";
}

function boomSignForHeading(headingDeg: number): 1 | -1 {
  return normalize360(headingDeg) < 180 ? 1 : -1;
}

export function VirementExperience() {
  const [startSign, setStartSign] = useState<1 | -1>(1);
  const startHeading = -PRES_ANGLE * startSign;
  const targetHeading = PRES_ANGLE * startSign;
  const startAmure = amurePourCap(startHeading);
  const targetAmure = amurePourCap(targetHeading);
  const startJibSign: 1 | -1 = startAmure === "babord" ? 1 : -1;
  const targetJibSign: 1 | -1 = targetAmure === "babord" ? 1 : -1;

  const { angle: heading, setAngle: setHeading, svgRef, handlers } = useAngleDrag(startHeading, { x: CX, y: CY });
  const [jibSign, setJibSign] = useState<1 | -1>(startJibSign);
  const [stepIndex, setStepIndex] = useState(0);

  const currentAmure = amurePourCap(heading);
  const enZoneInterdite = distanceAuVent(heading) < ZONE_INTERDITE_MAX;
  const arrivee = currentAmure === targetAmure && Math.abs(distanceAuVent(heading) - PRES_ANGLE) <= TOLERANCE_ARRIVEE;
  const step = STEP_ORDER[stepIndex]?.id;
  const termine = stepIndex >= STEP_ORDER.length;

  // Avancée automatique ajustée pendant le rendu plutôt que dans un effet
  // (évite un cycle de rendu superflu) : seule l'étape "barre" se termine
  // toute seule, dès que le bateau entre dans la zone interdite. Toutes
  // les autres étapes attendent un tap — un geste ponctuel décidé en
  // regardant le bateau, pas un seuil physique automatique.
  if (step === "barre" && enZoneInterdite) {
    setStepIndex(3);
  } else if (step === "stabiliser" && arrivee) {
    setStepIndex(9);
  }

  const boomSign = boomSignForHeading(heading);
  const d = distanceAuVent(heading);
  const boomAngle = Math.min(72, Math.max(16, d * 0.75));
  const mainsailEtat: EtatVoile = enZoneInterdite ? "faseille" : "bon";
  // Le génois faseille tant qu'il n'a pas été choqué puis rebordé sur la
  // nouvelle amure (stepIndex >= 7 = étape "border" faite) ; entre-temps,
  // même s'il a déjà basculé de côté (jibSign === targetJibSign), il reste
  // "faseille" tant qu'on ne l'a pas rebordé.
  const jibEtat: EtatVoile = enZoneInterdite || jibSign === startJibSign || stepIndex < 7 ? "faseille" : "bon";

  const dragActif = stepIndex >= 2 && !termine;

  function recommencer() {
    const nextSign = (startSign * -1) as 1 | -1;
    const nextStartHeading = -PRES_ANGLE * nextSign;
    const nextStartAmure = amurePourCap(nextStartHeading);
    setStartSign(nextSign);
    setHeading(nextStartHeading);
    setJibSign(nextStartAmure === "babord" ? 1 : -1);
    setStepIndex(0);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft text-center">
        Objectif : passer de <span className="font-medium text-ink">{amureLabel(startAmure)} amure</span> à{" "}
        <span className="font-medium text-ink">{amureLabel(targetAmure)} amure</span>, au près.
      </p>

      <div className="rounded-2xl bg-brand-50 py-3">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className={clsx("w-full max-h-72 mx-auto select-none", dragActif && "touch-none cursor-grab active:cursor-grabbing")}
          {...(dragActif ? handlers : {})}
        >
          <rect x={0} y={0} width={400} height={400} fill="transparent" />
          <circle cx={CX} cy={CY} r={DIAL_R} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 6" opacity={0.35} />
          <path
            d={`M${CX},${CY} L${CX - DIAL_R * Math.sin((ZONE_INTERDITE_MAX * Math.PI) / 180)},${CY - DIAL_R * Math.cos((ZONE_INTERDITE_MAX * Math.PI) / 180)} A${DIAL_R},${DIAL_R} 0 0 1 ${CX + DIAL_R * Math.sin((ZONE_INTERDITE_MAX * Math.PI) / 180)},${CY - DIAL_R * Math.cos((ZONE_INTERDITE_MAX * Math.PI) / 180)} Z`}
            fill={INK}
            opacity={0.06}
          />
          <SailboatDiagram
            cx={CX}
            cy={CY}
            hullLength={HULL_LENGTH}
            headingDeg={heading}
            boomAngleDeg={boomAngle}
            boomSign={boomSign}
            mainsailEtat={mainsailEtat}
            jibEtat={jibEtat}
            jibSignOverride={jibSign}
          />
        </svg>
      </div>

      <ol className="flex flex-col gap-1">
        {STEP_ORDER.map((s, i) => {
          const fait = i < stepIndex || termine;
          const actif = i === stepIndex && !termine;
          return (
            <li
              key={s.id}
              className={clsx(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                fait && "text-ink-soft",
                actif && "bg-brand-50 text-ink font-medium",
                !fait && !actif && "text-ink-soft opacity-50"
              )}
            >
              <span
                className={clsx(
                  "w-5 h-5 rounded-full text-[11px] flex items-center justify-center shrink-0",
                  fait && "bg-success text-white",
                  actif && "bg-brand-500 text-white",
                  !fait && !actif && "bg-surface-2 text-ink-soft"
                )}
              >
                {fait ? "✓" : i + 1}
              </span>
              {s.label}
            </li>
          );
        })}
      </ol>

      {step === "route" && (
        <Button className="w-full" onClick={() => setStepIndex(1)}>
          C&apos;est dégagé
        </Button>
      )}

      {step === "annonce" && (
        <Button className="w-full" onClick={() => setStepIndex(2)}>
          Annoncer et virer
        </Button>
      )}

      {step === "barre" && (
        <p className="text-center text-sm text-ink-soft">Fais glisser le bateau pour pousser la barre sous le vent.</p>
      )}

      {step === "taquet" && (
        <Button className="w-full" onClick={() => setStepIndex(4)}>
          Ouvrir le taquet
        </Button>
      )}

      {step === "choquer" && (
        <Button className="w-full" onClick={() => setStepIndex(5)}>
          Choquer l&apos;écoute
        </Button>
      )}

      {step === "attraper" && (
        <div className="flex flex-col items-center gap-2">
          <Button
            className="w-full"
            disabled={currentAmure !== targetAmure}
            onClick={() => {
              setJibSign(targetJibSign);
              setStepIndex(6);
            }}
          >
            Attraper la nouvelle écoute
          </Button>
          {currentAmure !== targetAmure && (
            <p className="text-xs text-ink-soft text-center">Continue à tourner jusqu&apos;à ce que le génois passe de l&apos;autre côté.</p>
          )}
        </div>
      )}

      {step === "border" && (
        <Button className="w-full" onClick={() => setStepIndex(7)}>
          Border l&apos;écoute
        </Button>
      )}

      {step === "bloquer" && (
        <Button className="w-full" onClick={() => setStepIndex(8)}>
          Bloquer l&apos;écoute
        </Button>
      )}

      {step === "stabiliser" && (
        <p className="text-center text-sm text-ink-soft">Continue à tourner jusqu&apos;au près, sur la nouvelle amure.</p>
      )}

      {dragActif && step !== "barre" && step !== "stabiliser" && (
        <p className="text-center text-xs text-ink-soft">👆 Le bateau reste manipulable à tout moment.</p>
      )}

      {termine && (
        <div className="flex flex-col gap-3">
          <FeedbackBanner
            tone="success"
            titre="Virement réussi !"
            detail={`Tu es maintenant ${amureLabel(targetAmure)} amure, au près.`}
          />
          <Button onClick={recommencer}>Refaire un virement</Button>
        </div>
      )}

      {!termine && stepIndex > 0 && (
        <button onClick={recommencer} className="text-center text-xs text-ink-soft underline underline-offset-2">
          Recommencer
        </button>
      )}
    </div>
  );
}
