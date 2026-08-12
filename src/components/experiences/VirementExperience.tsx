"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useAngleDrag } from "@/lib/interactions/useAngleDrag";
import { amurePourCap, distanceAuVent, normalize360, type Amure } from "@/lib/interactions/angle";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { OrderedStepsCheck } from "@/components/interactive/OrderedStepsCheck";
import { Button } from "@/components/ui/Button";
import { SailboatDiagram } from "@/components/nautical-visuals";
import { BRAND, INK } from "@/components/nautical-visuals/tokens";

// Les mêmes étapes que la leçon "Le virement de bord" (Niveau 3), pour
// l'exercice « à toi de vérifier » après une manœuvre réussie.
const ETAPES_VIREMENT = [
  "Vérifier que la route est dégagée",
  "Annoncer : « Paré à virer ? »",
  "Pousser doucement la barre",
  "Passer face au vent",
  "Changer l'écoute du génois",
  "Stabiliser sur la nouvelle amure",
];

// Référence officielle de la skill "nautical-pedagogical-visuals" — voir
// .claude/skills/nautical-pedagogical-visuals/SKILL.md avant de modifier
// ce fichier. Le virement se joue en deux gestes distincts et volontai-
// rement découplés : la barre (glisser le bateau, la grand-voile suit
// automatiquement) et l'écoute de génois (un geste explicite de
// l'équipier, via jibSignOverride) — c'est ce décalage possible entre
// les deux qui rend visible l'erreur "génois resté à contre".

const CX = 200;
const CY = 210;
const HULL_LENGTH = 190;
const DIAL_R = 160;
const PRES_ANGLE = 45;
const ZONE_INTERDITE_MAX = 40; // même borne que ALLURES "face-au-vent" (angle.ts)
const TOLERANCE_ARRIVEE = 10;

function amureLabel(amure: Amure): string {
  return amure === "babord" ? "bâbord" : amure === "tribord" ? "tribord" : "";
}

function boomSignForHeading(headingDeg: number): 1 | -1 {
  return normalize360(headingDeg) < 180 ? 1 : -1;
}

type Phase = "pret" | "annonce" | "en-cours" | "reussi";

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
  const [phase, setPhase] = useState<Phase>("pret");
  const [showCheck, setShowCheck] = useState(false);

  const currentAmure = amurePourCap(heading);
  const enZoneInterdite = distanceAuVent(heading) < ZONE_INTERDITE_MAX;
  const genoisACcontre = currentAmure === targetAmure && jibSign === startJibSign;
  const arrivee =
    currentAmure === targetAmure && Math.abs(distanceAuVent(heading) - PRES_ANGLE) <= TOLERANCE_ARRIVEE;

  // Transition vers "reussi" ajustée pendant le rendu plutôt que dans un
  // effet (évite un cycle de rendu superflu) : dès que le bateau est
  // arrivé au près sur la nouvelle amure avec le génois du bon côté, la
  // manœuvre est terminée.
  if (phase === "en-cours" && arrivee && jibSign === targetJibSign) {
    setPhase("reussi");
  }

  const boomSign = boomSignForHeading(heading);
  const d = distanceAuVent(heading);
  const boomAngle = Math.min(72, Math.max(16, d * 0.75));
  const mainsailEtat = enZoneInterdite ? "faseille" : "bon";
  const jibEtat = enZoneInterdite || genoisACcontre ? "faseille" : "bon";

  function recommencer() {
    const nextSign = (startSign * -1) as 1 | -1;
    const nextStartHeading = -PRES_ANGLE * nextSign;
    const nextStartAmure = amurePourCap(nextStartHeading);
    setStartSign(nextSign);
    setHeading(nextStartHeading);
    setJibSign(nextStartAmure === "babord" ? 1 : -1);
    setPhase("pret");
    setShowCheck(false);
  }

  const message =
    phase === "en-cours"
      ? genoisACcontre
        ? { tone: "warning" as const, titre: "Le génois est resté à contre", detail: "Change l'écoute pour qu'il porte à nouveau de l'autre côté." }
        : enZoneInterdite
          ? { tone: "neutral" as const, titre: "Tu traverses le lit du vent", detail: "Les voiles faseillent : c'est normal ici, continue le mouvement." }
          : null
      : null;

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
          className={clsx("w-full max-h-80 mx-auto select-none", phase === "en-cours" && "touch-none cursor-grab active:cursor-grabbing")}
          {...(phase === "en-cours" ? handlers : {})}
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

      {phase === "pret" && (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-ink">Le bateau est au près, {amureLabel(startAmure)} amure. Tu vas virer de bord.</p>
          <Button onClick={() => setPhase("annonce")}>Paré à virer ?</Button>
        </div>
      )}

      {phase === "annonce" && (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-ink">« Paré ! » confirme l&apos;équipage.</p>
          <Button onClick={() => setPhase("en-cours")}>Je vire !</Button>
        </div>
      )}

      {phase === "en-cours" && (
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm text-ink-soft">Fais glisser le bateau pour le faire pivoter jusqu&apos;à l&apos;autre amure.</p>
          {message && <FeedbackBanner tone={message.tone} titre={message.titre} detail={message.detail} />}
          {genoisACcontre && (
            <Button variant="secondary" onClick={() => setJibSign(targetJibSign)}>
              Changer l&apos;écoute du génois
            </Button>
          )}
        </div>
      )}

      {phase === "reussi" && (
        <div className="flex flex-col gap-3">
          <FeedbackBanner
            tone="success"
            titre="Virement réussi !"
            detail={`Tu es maintenant ${amureLabel(targetAmure)} amure, au près.`}
          />
          {!showCheck && (
            <Button size="lg" className="w-full" onClick={() => setShowCheck(true)}>
              <Check size={16} />À toi de vérifier
            </Button>
          )}
          {showCheck && (
            <OrderedStepsCheck
              steps={ETAPES_VIREMENT}
              successDetail="Tu as reconstitué le virement de bord, du début à la fin."
            />
          )}
          <Button variant="secondary" onClick={recommencer}>
            Refaire un virement
          </Button>
        </div>
      )}

      {phase !== "pret" && phase !== "reussi" && (
        <button onClick={recommencer} className="text-center text-xs text-ink-soft underline underline-offset-2">
          Recommencer
        </button>
      )}
    </div>
  );
}
