"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AlertTriangle } from "lucide-react";
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
// Deux modes, au choix en tête d'expérience (avant de commencer) :
//
// - « Guidé, étape par étape » (par défaut) : la barre avance par
//   segments qui s'arrêtent d'eux-mêmes aux deux moments qui comptent —
//   l'entrée dans le lit du vent, puis juste avant d'en ressortir de
//   l'autre bord. À chaque arrêt, une alerte couvre le dessin du bateau
//   et explique CE qu'il faut faire et POURQUOI ; il faut la toucher
//   pour la faire disparaître et retrouver le bateau — c'est ce geste
//   qui force à regarder le résultat avant d'agir, plutôt que de
//   tapoter des boutons sans lien avec ce qui se passe sur le schéma.
//   Aucune action n'est proposée pendant qu'un segment tourne : on
//   alterne strictement observer puis agir, jamais les deux en même
//   temps.
// - « Enchaîné, comme en vrai » : le comportement d'origine — un seul
//   « Je vire ! » lance toute la rotation d'un coup (8s, avec
//   accélération/décélération), et on gère l'écoute en même temps que
//   le bateau tourne, sans pause ni alerte. Plus proche du rythme réel
//   une fois la manœuvre bien comprise.
//
// Avant de pouvoir pousser la barre (dans les deux modes), deux taps
// distincts reproduisent le réflexe de sécurité du cycle annonce →
// confirmation → action (voir la leçon "La communication à bord") : on
// annonce « Paré à virer ? », on attend/donne la confirmation « Paré ! »,
// et seulement à ce moment-là « Je vire ! » devient possible.
//
// La grand-voile suit le cap automatiquement ; le génois suit sa propre
// progression (jibSignOverride) pour rester décorrélé de la barre — ce
// décalage possible rend l'erreur "génois resté à contre" visible si on
// ne le rebordait pas : au deuxième arrêt du mode guidé, le bateau a déjà
// changé d'amure mais le génois, lui, reste du côté d'avant tant qu'on
// n'a pas tapé "Attraper" — c'est exactement ce que l'alerte y explique.
//
// "Border" est décomposé en deux gestes distincts (border-main puis
// border/winch), chacun à plusieurs tractions/tours plutôt qu'un simple
// tap : de vraies sources de voile décrivent cette technique en deux
// temps — plusieurs tractions à la main pour reprendre le gros du mou
// rapidement, puis 2 à 3 tours de winch une fois l'écoute trop dure à
// tenir à la main (jamais enroulée autour du poignet — risque de brûlure
// ou pire si le génois tire d'un coup, seule source de risque identifiée
// qui manquait jusqu'ici dans cette manœuvre). Le génois reste faseille
// tout du long des deux étapes (voir jibEtat), il ne redevient "bon"
// qu'une fois le winch terminé.

const CX = 200;
const CY = 210;
const HULL_LENGTH = 190;
const DIAL_R = 160;
const PRES_ANGLE = 45;
const ZONE_INTERDITE_MAX = 40; // même borne que ALLURES "face-au-vent" (angle.ts)
const PAUSE_MARGE = 10; // les arrêts du mode guidé restent bien à l'intérieur de la zone, pas pile sur son bord
const TOLERANCE_ARRIVEE = 10;
const ROTATION_DUREE_MS = 8000; // durée du mode "Enchaîné" (rotation complète, 90°)
const MS_PAR_DEGRE = ROTATION_DUREE_MS / (PRES_ANGLE * 2);
const TOURS_WINCH = 3;
const TRACTIONS_MAIN = 3;

type StepId =
  | "route"
  | "annonce"
  | "confirmation"
  | "barre"
  | "taquet"
  | "choquer"
  | "attraper"
  | "border-main"
  | "border"
  | "bloquer"
  | "stabiliser";

interface StepDef {
  id: StepId;
  label: string;
}

const STEP_ORDER: StepDef[] = [
  { id: "route", label: "Vérifier que la route est dégagée" },
  { id: "annonce", label: "Annoncer : « Paré à virer ? »" },
  { id: "confirmation", label: "Attendre la confirmation : « Paré ! »" },
  { id: "barre", label: "Annoncer « Je vire ! » et pousser la barre sous le vent" },
  { id: "taquet", label: "Ouvrir le taquet de l'écoute bordée" },
  { id: "choquer", label: "Choquer l'écoute à la main" },
  { id: "attraper", label: "Attraper la nouvelle écoute" },
  { id: "border-main", label: "Border rapidement à la main" },
  { id: "border", label: "Terminer au winch (2 à 3 tours)" },
  { id: "bloquer", label: "Bloquer l'écoute dans son taquet" },
  { id: "stabiliser", label: "Stabiliser le cap sur la nouvelle amure" },
];

type AlerteId = "entree" | "sortie";

const ALERTES: Record<AlerteId, { titre: string; detail: string }> = {
  entree: {
    titre: "Le bateau est dans le lit du vent",
    detail: "Le génois ne porte plus : il faseille. C'est le bon moment pour ouvrir le taquet, puis choquer l'écoute bordée.",
  },
  sortie: {
    titre: "Le génois est resté à contre",
    detail:
      "Le bateau a changé d'amure, mais le génois est resté du même côté : il faseille. Attrape vite la nouvelle écoute, borde-la à la main, puis termine au winch — avant de sortir du lit du vent, sinon il prend de la vitesse à contre.",
  },
};

function amureLabel(amure: Amure): string {
  return amure === "babord" ? "bâbord" : amure === "tribord" ? "tribord" : "";
}

function boomSignForHeading(headingDeg: number): 1 | -1 {
  return normalize360(headingDeg) < 180 ? 1 : -1;
}

// Accélère puis ralentit, comme une vraie poussée de barre plutôt qu'une
// rotation à vitesse constante.
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function VirementExperience() {
  const [startSign, setStartSign] = useState<1 | -1>(1);
  const startHeading = -PRES_ANGLE * startSign;
  const targetHeading = PRES_ANGLE * startSign;
  const startAmure = amurePourCap(startHeading);
  const targetAmure = amurePourCap(targetHeading);
  const startJibSign: 1 | -1 = startAmure === "babord" ? 1 : -1;
  const targetJibSign: 1 | -1 = targetAmure === "babord" ? 1 : -1;

  // Points d'arrêt du mode guidé : nettement à l'intérieur de la zone
  // interdite (pas pile sur son bord), une fois à l'entrée, une fois
  // juste avant la sortie de l'autre côté.
  const entreeHeading = -(ZONE_INTERDITE_MAX - PAUSE_MARGE) * startSign;
  const sortieHeading = (ZONE_INTERDITE_MAX - PAUSE_MARGE) * startSign;

  const [aideActivee, setAideActivee] = useState(true);
  const [heading, setHeading] = useState(startHeading);
  const [jibSign, setJibSign] = useState<1 | -1>(startJibSign);
  const [stepIndex, setStepIndex] = useState(0);
  const [virant, setVirant] = useState(false);
  const [alerte, setAlerte] = useState<AlerteId | null>(null);
  const [toursWinch, setToursWinch] = useState(0);
  const [tractionsMain, setTractionsMain] = useState(0);
  const rafRef = useRef<number | null>(null);
  const enregistre = useRef(false);

  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, []);

  const currentAmure = amurePourCap(heading);
  const enZoneInterdite = distanceAuVent(heading) < ZONE_INTERDITE_MAX;
  const arrivee = currentAmure === targetAmure && Math.abs(distanceAuVent(heading) - PRES_ANGLE) <= TOLERANCE_ARRIVEE;
  const step = STEP_ORDER[stepIndex]?.id;
  const termine = stepIndex >= STEP_ORDER.length;
  // En mode guidé, aucune action ne se propose pendant qu'un segment
  // tourne ou tant que l'alerte n'a pas été touchée — on alterne
  // strictement "on regarde" puis "on agit". En mode enchaîné, cette
  // valeur reste toujours fausse : les étapes redeviennent disponibles
  // en continu pendant l'unique rotation, comme avant.
  const enPause = aideActivee && (virant || alerte !== null);

  // Avancée automatique ajustée pendant le rendu plutôt que dans un effet
  // (évite un cycle de rendu superflu) : en mode enchaîné seulement,
  // l'étape "barre" se termine toute seule dès que le bateau entre dans
  // la zone interdite pendant l'unique rotation. En mode guidé, c'est le
  // segment animé lui-même qui pilote l'avancée (voir lancerBarre).
  if (!aideActivee && step === "barre" && enZoneInterdite) {
    setStepIndex(4);
  } else if (step === "stabiliser" && arrivee) {
    setStepIndex(11);
  }

  // Un virement réussi vaut comme une bonne réponse pour le concept
  // "virement de bord" : sans ça, réussir la manœuvre dix fois ne
  // changerait jamais le score de compétence "Manœuvres" du profil.
  useEffect(() => {
    if (termine && !enregistre.current) {
      enregistre.current = true;
      enregistrerReponse(["c-virement"], true);
    }
  }, [termine]);

  const boomSign = boomSignForHeading(heading);
  const d = distanceAuVent(heading);
  const boomAngle = Math.min(72, Math.max(16, d * 0.75));
  const mainsailEtat: EtatVoile = enZoneInterdite ? "faseille" : "bon";
  // Le génois est bien réglé au départ (bon), faseille dès qu'on l'a
  // choqué et jusqu'à ce qu'il soit rebordé — à la main puis au winch —
  // sur la nouvelle amure (étapes "attraper", "border-main" et "border" =
  // stepIndex 6 à 8), et faseille aussi ponctuellement si le bateau
  // pointe trop près du vent, quelle que soit l'écoute.
  const jibEtat: EtatVoile = enZoneInterdite || (stepIndex >= 6 && stepIndex < 9) ? "faseille" : "bon";

  function animerVers(depart: number, cible: number, onDone?: () => void) {
    setVirant(true);
    const duree = Math.max(400, Math.abs(cible - depart) * MS_PAR_DEGRE);
    const t0 = performance.now();
    function frame(now: number) {
      const t = Math.min(1, (now - t0) / duree);
      setHeading(depart + (cible - depart) * easeInOutCubic(t));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rafRef.current = null;
        setVirant(false);
        onDone?.();
      }
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  function lancerBarre() {
    if (virant) return;
    if (aideActivee) {
      animerVers(startHeading, entreeHeading, () => {
        setStepIndex(4);
        setAlerte("entree");
      });
    } else {
      animerVers(startHeading, targetHeading);
    }
  }

  function tirerLaMain() {
    const prochain = tractionsMain + 1;
    setTractionsMain(prochain);
    if (prochain >= TRACTIONS_MAIN) {
      setStepIndex(8);
    }
  }

  function tournerLaManivelle() {
    const prochain = toursWinch + 1;
    setToursWinch(prochain);
    if (prochain >= TOURS_WINCH) {
      setStepIndex(9);
      if (aideActivee) animerVers(sortieHeading, targetHeading);
    }
  }

  function recommencer() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setVirant(false);
    setAlerte(null);
    enregistre.current = false;
    const nextSign = (startSign * -1) as 1 | -1;
    const nextStartHeading = -PRES_ANGLE * nextSign;
    const nextStartAmure = amurePourCap(nextStartHeading);
    setStartSign(nextSign);
    setHeading(nextStartHeading);
    setJibSign(nextStartAmure === "babord" ? 1 : -1);
    setStepIndex(0);
    setToursWinch(0);
    setTractionsMain(0);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft text-center">
        Objectif : passer de <span className="font-medium text-ink">{amureLabel(startAmure)} amure</span> à{" "}
        <span className="font-medium text-ink">{amureLabel(targetAmure)} amure</span>, au près.
      </p>

      {stepIndex === 0 && (
        <div className="flex rounded-xl bg-surface-2 p-1">
          <button
            onClick={() => setAideActivee(true)}
            className={clsx(
              "flex-1 text-sm font-medium py-2 rounded-lg transition-colors",
              aideActivee ? "bg-surface text-ink shadow-sm" : "text-ink-soft"
            )}
          >
            Guidé, étape par étape
          </button>
          <button
            onClick={() => setAideActivee(false)}
            className={clsx(
              "flex-1 text-sm font-medium py-2 rounded-lg transition-colors",
              !aideActivee ? "bg-surface text-ink shadow-sm" : "text-ink-soft"
            )}
          >
            Enchaîné, comme en vrai
          </button>
        </div>
      )}

      <div className="rounded-2xl bg-brand-50 py-3 relative">
        <svg viewBox="0 0 400 400" className="w-full max-h-72 mx-auto select-none">
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

        {alerte && (
          <button
            onClick={() => setAlerte(null)}
            className="absolute inset-0 flex items-center justify-center p-5 rounded-2xl bg-ink/80 backdrop-blur-[1px] text-left"
          >
            <span className="block bg-surface rounded-xl p-4 max-w-[280px] shadow-lg">
              <span className="flex items-center gap-2 text-accent font-semibold text-sm mb-1.5">
                <AlertTriangle size={16} className="shrink-0" />
                {ALERTES[alerte].titre}
              </span>
              <span className="block text-sm text-ink-soft leading-relaxed">{ALERTES[alerte].detail}</span>
              <span className="block text-xs text-brand-500 font-medium mt-3">Touche pour continuer →</span>
            </span>
          </button>
        )}
      </div>

      <GuidedStepsProgress steps={STEP_ORDER} currentIndex={stepIndex} termine={termine} />

      {aideActivee && virant && <p className="text-center text-sm text-ink-soft">⛵ Le bateau tourne...</p>}

      {step === "route" && !enPause && (
        <Button className="w-full" onClick={() => setStepIndex(1)}>
          C&apos;est dégagé
        </Button>
      )}

      {step === "annonce" && !enPause && (
        <Button className="w-full" onClick={() => setStepIndex(2)}>
          Demander : « Paré à virer ? »
        </Button>
      )}

      {step === "confirmation" && !enPause && (
        <Button className="w-full" onClick={() => setStepIndex(3)}>
          Répondre : « Paré ! »
        </Button>
      )}

      {step === "barre" && (
        <Button className="w-full" onClick={lancerBarre} disabled={virant}>
          « Je vire ! » — Pousser la barre
        </Button>
      )}

      {step === "taquet" && !enPause && (
        <Button className="w-full" onClick={() => setStepIndex(5)}>
          Ouvrir le taquet
        </Button>
      )}

      {step === "choquer" && !enPause && (
        <Button
          className="w-full"
          onClick={() => {
            setStepIndex(6);
            if (aideActivee) animerVers(entreeHeading, sortieHeading, () => setAlerte("sortie"));
          }}
        >
          Choquer l&apos;écoute
        </Button>
      )}

      {step === "attraper" && !enPause && (
        <div className="flex flex-col items-center gap-2">
          <Button
            className="w-full"
            disabled={!aideActivee && currentAmure !== targetAmure}
            onClick={() => {
              setJibSign(targetJibSign);
              setStepIndex(7);
            }}
          >
            Attraper la nouvelle écoute
          </Button>
          {!aideActivee && currentAmure !== targetAmure && (
            <p className="text-xs text-ink-soft text-center">Continue à tourner jusqu&apos;à ce que le génois passe de l&apos;autre côté.</p>
          )}
        </div>
      )}

      {step === "border-main" && !enPause && (
        <div className="flex flex-col items-center gap-2">
          <Button className="w-full" onClick={tirerLaMain}>
            Tirer l&apos;écoute à la main
          </Button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TRACTIONS_MAIN }, (_, i) => (
              <span key={i} className={clsx("w-2 h-2 rounded-full", i < tractionsMain ? "bg-brand-500" : "bg-surface-2")} />
            ))}
          </div>
          <p className="text-xs text-ink-soft text-center">
            Main ouverte, jamais enroulée autour du poignet : si le génois tire d&apos;un coup, tu dois pouvoir lâcher.
          </p>
        </div>
      )}

      {step === "border" && !enPause && (
        <div className="flex flex-col items-center gap-2">
          <Button className="w-full" onClick={tournerLaManivelle}>
            <span className="inline-flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                style={{ transform: `rotate(${toursWinch * 130}deg)`, transition: "transform 200ms ease-out" }}
              >
                <circle cx="12" cy="12" r="7" />
                <line x1="12" y1="12" x2="19" y2="12" />
              </svg>
              Tourner la manivelle du winch
            </span>
          </Button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOURS_WINCH }, (_, i) => (
              <span key={i} className={clsx("w-2 h-2 rounded-full", i < toursWinch ? "bg-brand-500" : "bg-surface-2")} />
            ))}
          </div>
          <p className="text-xs text-ink-soft text-center">
            {toursWinch === 0 ? "Border demande de la force : plusieurs tours de winch." : `Encore ${TOURS_WINCH - toursWinch} tour${TOURS_WINCH - toursWinch > 1 ? "s" : ""}.`}
          </p>
        </div>
      )}

      {step === "bloquer" && !enPause && (
        <Button className="w-full" onClick={() => setStepIndex(10)}>
          Bloquer l&apos;écoute
        </Button>
      )}

      {step === "stabiliser" && !enPause && (
        <p className="text-center text-sm text-ink-soft">Le bateau termine sa rotation jusqu&apos;au près, sur la nouvelle amure.</p>
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
