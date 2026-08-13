"use client";

import { useEffect, useRef, useState } from "react";
import { amurePourCap, distanceAuVent, normalize360, type Amure } from "@/lib/interactions/angle";
import { Button } from "@/components/ui/Button";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { GuidedStepsProgress } from "@/components/interactive/GuidedStepsProgress";
import { enregistrerReponse } from "@/lib/progress";
import { SailboatDiagram } from "@/components/nautical-visuals";
import { BRAND, INK } from "@/components/nautical-visuals/tokens";
import type { EtatVoile } from "@/components/nautical-visuals/Sail";

// Référence officielle de la skill "nautical-pedagogical-visuals" — voir
// .claude/skills/nautical-pedagogical-visuals/SKILL.md avant de modifier
// ce fichier.
//
// L'empannage change d'amure par le vent arrière, symétrique du virement
// (VirementExperience.tsx, même grammaire d'interaction : barre = tap qui
// lance une rotation animée — assez lente pour avoir le temps de suivre
// ce qui se passe —, gestes d'écoute = taps ponctuels décidés en
// regardant le bateau ; même réflexe de sécurité annonce → confirmation
// « Paré ! » → action avant de pouvoir lancer la barre). Ce qui change,
// c'est le risque : ici c'est la bôme qui traverse d'un bord à l'autre,
// pas le génois qui faseille. Deux conséquences dans l'interaction :
// - un geste supplémentaire AVANT de tourner (border la grand-voile vers
//   l'axe pour limiter la course de la bôme) — l'ordre inverse du
//   virement, où on ne touche l'écoute qu'après avoir commencé à tourner ;
// - la bôme est montrée comme un spar physique (showBoom), avec un sweep
//   transitoire (boomTrailVisible) et une bannière d'alerte au moment
//   précis où elle traverse, pour rendre le risque sensible plutôt que
//   seulement écrit.
//
// Le génois suit ici le côté de la bôme automatiquement via
// jibOppositeAmount (configuration "en ciseaux" à l'approche du vent
// arrière, voir SailboatDiagram) : contrairement au virement, il n'y a
// pas de geste dédié à lui faire traverser, la reprise ne porte que sur
// la grand-voile et un réglage final du génois.

const CX = 200;
const CY = 210;
const HULL_LENGTH = 190;
const DIAL_R = 160;
const ALLURE_ANGLE = 20; // écart au vent arrière (180°) au départ/à l'arrivée
const ZONE_BOME_MAX = 15; // demi-largeur de la zone où la bôme est en train de traverser
const TOLERANCE_ARRIVEE = 10;
const ROTATION_DUREE_MS = 8000;
const ALERTE_BOME_MS = 1300;

type StepId =
  | "prep-zone"
  | "border-avant"
  | "annonce"
  | "confirmation"
  | "barre"
  | "passage-bome"
  | "choquer-gv"
  | "reglage-genois"
  | "stabiliser";

interface StepDef {
  id: StepId;
  label: string;
}

const STEP_ORDER: StepDef[] = [
  { id: "prep-zone", label: "Vérifier que personne n'est sur la trajectoire de la bôme" },
  { id: "border-avant", label: "Border la grand-voile vers l'axe, pour limiter sa course" },
  { id: "annonce", label: "Annoncer : « Paré à empanner ? »" },
  { id: "confirmation", label: "Attendre la confirmation : « Paré ! »" },
  { id: "barre", label: "Annoncer « J'empanne ! » et amener le vent arrière" },
  { id: "passage-bome", label: "Rester baissé et à l'écart pendant que la bôme traverse" },
  { id: "choquer-gv", label: "Choquer la grand-voile de l'autre côté" },
  { id: "reglage-genois", label: "Régler le génois sur la nouvelle amure" },
  { id: "stabiliser", label: "Stabiliser le cap, vent arrière sur la nouvelle amure" },
];

function amureLabel(amure: Amure): string {
  return amure === "babord" ? "bâbord" : amure === "tribord" ? "tribord" : "";
}

function boomSignForHeading(headingDeg: number): 1 | -1 {
  return normalize360(headingDeg) < 180 ? 1 : -1;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function pointSurCadran(angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + DIAL_R * Math.sin(rad), y: CY - DIAL_R * Math.cos(rad) };
}

export function EmpannageExperience() {
  const [startSign, setStartSign] = useState<1 | -1>(1);
  const startHeading = 180 - ALLURE_ANGLE * startSign;
  const targetHeading = 180 + ALLURE_ANGLE * startSign;
  const startAmure = amurePourCap(startHeading);
  const targetAmure = amurePourCap(targetHeading);

  const [heading, setHeading] = useState(startHeading);
  const [stepIndex, setStepIndex] = useState(0);
  const [empannant, setEmpannant] = useState(false);
  const [gvBordeeAvant, setGvBordeeAvant] = useState(false);
  const [alerteBome, setAlerteBome] = useState(false);
  const rafRef = useRef<number | null>(null);
  const alerteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dernierSigneBome = useRef(boomSignForHeading(startHeading));
  const enregistre = useRef(false);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (alerteTimeoutRef.current !== null) clearTimeout(alerteTimeoutRef.current);
    },
    []
  );

  const currentAmure = amurePourCap(heading);
  const distanceVentArriere = 180 - distanceAuVent(heading);
  const enZoneBome = distanceVentArriere < ZONE_BOME_MAX;
  const arrivee = currentAmure === targetAmure && Math.abs(distanceAuVent(heading) - (180 - ALLURE_ANGLE)) <= TOLERANCE_ARRIVEE;
  const step = STEP_ORDER[stepIndex]?.id;
  const termine = stepIndex >= STEP_ORDER.length;

  // Avancées automatiques ajustées pendant le rendu plutôt que dans un
  // effet (évite un cycle de rendu superflu) : l'étape "barre" se termine
  // dès que le bateau entre dans la zone où la bôme est en train de
  // traverser, et "passage-bome" se termine dès qu'il en ressort de
  // l'autre côté — aucune des deux ne demande de geste, seulement de
  // rester à l'écart le temps que ça passe.
  if (step === "barre" && enZoneBome) {
    setStepIndex(5);
  } else if (step === "passage-bome" && !enZoneBome && currentAmure === targetAmure) {
    setStepIndex(6);
  } else if (step === "stabiliser" && arrivee) {
    setStepIndex(9);
  }

  // Un empannage réussi vaut comme une bonne réponse pour le concept
  // "empannage" — même logique que le virement, voir VirementExperience.
  useEffect(() => {
    if (termine && !enregistre.current) {
      enregistre.current = true;
      enregistrerReponse(["c-empannage"], true);
    }
  }, [termine]);

  const boomSign = boomSignForHeading(heading);
  const d = distanceAuVent(heading);
  // Bordée vers l'axe pour limiter la course de la bôme, du geste de
  // préparation jusqu'à ce qu'on la choque explicitement de l'autre côté
  // (étape "choquer-gv" pas encore tapée) — sinon l'angle suit le cap
  // normalement.
  const gvTropBordee = gvBordeeAvant && stepIndex < 7;
  const boomAngle = gvTropBordee ? 14 : Math.min(72, Math.max(16, d * 0.75));
  // "freine" (trop bordée, rouge) tant qu'elle reste ramenée vers l'axe en
  // portant : montre que ça freine le bateau, pas seulement que c'est
  // "réglé différemment" — d'où l'intérêt de la choquer vite après le
  // passage. "faseille" prend le dessus pendant la traversée du lit du
  // vent arrière, où n'importe quel réglage flotte un instant.
  const mainsailEtat: EtatVoile = enZoneBome ? "faseille" : gvTropBordee ? "freine" : "bon";
  const jibEtat: EtatVoile = enZoneBome ? "faseille" : "bon";
  // Le génois ne passe "en ciseaux" que pendant la traversée du lit du
  // vent arrière (même zone que la bôme) : au départ et à l'arrivée
  // (20° de la panne), il reste du même côté que la bôme, sail pleine —
  // sinon il resterait figé à mi-bascule, quasi réduit à un fil, en
  // dehors de toute manœuvre.
  const jibOppositeAmount = Math.max(0, Math.min(1, 1 - distanceVentArriere / ZONE_BOME_MAX));

  function lancerEmpannage() {
    if (empannant) return;
    setEmpannant(true);
    const depart = startHeading;
    const cible = targetHeading;
    const t0 = performance.now();
    function frame(now: number) {
      const t = Math.min(1, (now - t0) / ROTATION_DUREE_MS);
      const nouveauCap = depart + (cible - depart) * easeInOutCubic(t);
      setHeading(nouveauCap);
      const signe = boomSignForHeading(nouveauCap);
      if (signe !== dernierSigneBome.current) {
        dernierSigneBome.current = signe;
        setAlerteBome(true);
        if (alerteTimeoutRef.current !== null) clearTimeout(alerteTimeoutRef.current);
        alerteTimeoutRef.current = setTimeout(() => setAlerteBome(false), ALERTE_BOME_MS);
      }
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rafRef.current = null;
        setEmpannant(false);
      }
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  function recommencer() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (alerteTimeoutRef.current !== null) clearTimeout(alerteTimeoutRef.current);
    rafRef.current = null;
    setEmpannant(false);
    setAlerteBome(false);
    enregistre.current = false;
    const nextSign = (startSign * -1) as 1 | -1;
    const nextStartHeading = 180 - ALLURE_ANGLE * nextSign;
    setStartSign(nextSign);
    setHeading(nextStartHeading);
    dernierSigneBome.current = boomSignForHeading(nextStartHeading);
    setStepIndex(0);
    setGvBordeeAvant(false);
  }

  const p1 = pointSurCadran(180 - ZONE_BOME_MAX);
  const p2 = pointSurCadran(180 + ZONE_BOME_MAX);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft text-center">
        Objectif : passer de <span className="font-medium text-ink">{amureLabel(startAmure)} amure</span> à{" "}
        <span className="font-medium text-ink">{amureLabel(targetAmure)} amure</span>, vent arrière.
      </p>

      <div className="rounded-2xl bg-brand-50 py-3 relative">
        <svg viewBox="0 0 400 400" className="w-full max-h-72 mx-auto select-none">
          <rect x={0} y={0} width={400} height={400} fill="transparent" />
          <circle cx={CX} cy={CY} r={DIAL_R} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 6" opacity={0.35} />
          <path d={`M${CX},${CY} L${p1.x},${p1.y} A${DIAL_R},${DIAL_R} 0 0 1 ${p2.x},${p2.y} Z`} fill={INK} opacity={0.06} />
          <SailboatDiagram
            cx={CX}
            cy={CY}
            hullLength={HULL_LENGTH}
            headingDeg={heading}
            boomAngleDeg={boomAngle}
            boomSign={boomSign}
            mainsailEtat={mainsailEtat}
            jibEtat={jibEtat}
            jibOppositeAmount={jibOppositeAmount}
            showBoom
            boomTrailVisible={alerteBome}
          />
        </svg>

        {alerteBome && (
          <div className="absolute inset-x-3 bottom-3">
            <FeedbackBanner tone="warning" titre="La bôme traverse !" detail="Reste baissé et à l'écart de sa course." />
          </div>
        )}
      </div>

      <GuidedStepsProgress steps={STEP_ORDER} currentIndex={stepIndex} termine={termine} />

      {step === "prep-zone" && (
        <Button className="w-full" onClick={() => setStepIndex(1)}>
          C&apos;est dégagé
        </Button>
      )}

      {step === "border-avant" && (
        <Button
          className="w-full"
          onClick={() => {
            setGvBordeeAvant(true);
            setStepIndex(2);
          }}
        >
          Border vers l&apos;axe
        </Button>
      )}

      {step === "annonce" && (
        <Button className="w-full" onClick={() => setStepIndex(3)}>
          Demander : « Paré à empanner ? »
        </Button>
      )}

      {step === "confirmation" && (
        <Button className="w-full" onClick={() => setStepIndex(4)}>
          Répondre : « Paré ! »
        </Button>
      )}

      {step === "barre" && (
        <Button className="w-full" onClick={lancerEmpannage} disabled={empannant}>
          « J&apos;empanne ! » — Amener le vent arrière
        </Button>
      )}

      {step === "passage-bome" && <p className="text-center text-sm text-ink-soft">La bôme traverse — reste à l&apos;écart, ça passe tout seul.</p>}

      {step === "choquer-gv" && (
        <Button className="w-full" onClick={() => setStepIndex(7)}>
          Choquer la grand-voile
        </Button>
      )}

      {step === "reglage-genois" && (
        <Button className="w-full" onClick={() => setStepIndex(8)}>
          Régler le génois
        </Button>
      )}

      {step === "stabiliser" && (
        <p className="text-center text-sm text-ink-soft">Le bateau termine sa rotation, vent arrière sur la nouvelle amure.</p>
      )}

      {termine && (
        <div className="flex flex-col gap-3">
          <FeedbackBanner
            tone="success"
            titre="Empannage réussi !"
            detail={`Tu es maintenant ${amureLabel(targetAmure)} amure, vent arrière.`}
          />
          <Button onClick={recommencer}>Refaire un empannage</Button>
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
