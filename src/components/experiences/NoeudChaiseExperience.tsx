"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { Rope, RopeEnd, DepthCrossing } from "@/components/nautical-visuals";

// Référence officielle de la skill "nautical-pedagogical-visuals" —
// voir .claude/skills/nautical-pedagogical-visuals/SKILL.md avant de
// modifier ce fichier ou d'en créer un nouveau du même genre. Ce nœud
// sert de cas de validation pour toute future représentation de nœud.
//
// Chaque étape est un dessin statique et complet — pas une animation de
// tracé : c'est plus proche d'un schéma qu'on trouve en ligne (une image
// fixe par étape) que d'une manipulation continue, qui s'est révélée trop
// difficile à suivre en pratique.

const DORMANT_D = "M150,20 L150,120";
const LOOP_WITH_TAIL_D = "M150,120 C185,128 185,168 150,160 C115,168 115,128 150,120 L150,180";
const THROUGH_LOOP_D = "M150,180 C172,165 172,130 150,112";
const AROUND_DORMANT_D = "M150,112 C176,102 176,76 150,66 C124,76 124,102 150,109";
const BACK_THROUGH_D = "M150,109 C130,125 130,160 150,180 L150,242";

const DORMANT_STYLE = { color: "var(--color-ink)", width: 4.5 };
const COURANT_STYLE = { color: "var(--color-accent)", width: 4 };

interface Step {
  titre: string;
  description: string;
  courantPaths: string[]; // tout le brin courant visible à cette étape, dessiné statiquement
  dormantCrossing?: boolean; // le dormant est croisé par-dessus par AROUND_DORMANT_D
  serrage?: boolean;
}

const STEPS: Step[] = [
  { titre: "Position initiale", description: "Le cordage pend, prêt à être façonné.", courantPaths: ["M150,120 L150,235"] },
  { titre: "Créer la première boucle", description: "Une boucle se forme sur le dormant.", courantPaths: [LOOP_WITH_TAIL_D] },
  {
    titre: "Passer l'extrémité dans la boucle",
    description: "Le courant remonte à travers la boucle.",
    courantPaths: [LOOP_WITH_TAIL_D, THROUGH_LOOP_D],
  },
  {
    titre: "Passer autour du dormant",
    description: "Il fait le tour du dormant : regarde bien, il passe devant.",
    courantPaths: [LOOP_WITH_TAIL_D, THROUGH_LOOP_D],
    dormantCrossing: true,
  },
  {
    titre: "Repasser dans la boucle",
    description: "Puis redescend dans la boucle de départ.",
    courantPaths: [LOOP_WITH_TAIL_D, THROUGH_LOOP_D, BACK_THROUGH_D],
    dormantCrossing: true,
  },
  {
    titre: "Serrer",
    description: "Le nœud se resserre : une boucle fixe qui ne glisse pas.",
    courantPaths: [LOOP_WITH_TAIL_D, THROUGH_LOOP_D, BACK_THROUGH_D],
    dormantCrossing: true,
    serrage: true,
  },
];

// Position y du bout libre (courant) à chaque étape, pour RopeEnd.
const BOUT_LIBRE_Y = [235, 180, 112, 109, 242, 242];

const ORDRE_CORRECT = [1, 2, 3, 4, 5];
const LABELS_CHECK = STEPS.map((s) => s.titre);

function VerificationFinale() {
  const [shuffled] = useState(() => {
    const idx = [...ORDRE_CORRECT];
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  });
  const [placed, setPlaced] = useState<number[]>([]);
  const [erreur, setErreur] = useState<number | null>(null);
  const termine = placed.length === ORDRE_CORRECT.length;

  function tap(stepIndex: number) {
    if (placed.includes(stepIndex) || termine) return;
    const attendu = ORDRE_CORRECT[placed.length];
    if (stepIndex === attendu) {
      setPlaced([...placed, stepIndex]);
      setErreur(null);
    } else {
      setErreur(stepIndex);
      setTimeout(() => setErreur(null), 450);
    }
  }

  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-semibold text-ink mb-1">À toi !</p>
      <p className="text-xs text-ink-soft mb-3">Touche les étapes dans le bon ordre, du début à la fin.</p>
      <div className="flex flex-col gap-2">
        {shuffled.map((stepIndex) => {
          const rang = placed.indexOf(stepIndex);
          const estPlacee = rang !== -1;
          return (
            <button
              key={stepIndex}
              onClick={() => tap(stepIndex)}
              disabled={estPlacee}
              className={clsx(
                "text-left text-sm rounded-lg border px-3 py-2.5 transition-colors flex items-center gap-2.5",
                estPlacee && "border-success bg-success-soft text-ink",
                !estPlacee && erreur === stepIndex && "border-danger bg-danger-soft text-ink",
                !estPlacee && erreur !== stepIndex && "border-border bg-surface hover:border-brand-300"
              )}
            >
              {estPlacee && (
                <span className="w-5 h-5 rounded-full bg-success text-white text-xs flex items-center justify-center shrink-0">
                  {rang + 1}
                </span>
              )}
              {LABELS_CHECK[stepIndex]}
            </button>
          );
        })}
      </div>
      {termine && (
        <div className="mt-3">
          <FeedbackBanner tone="success" titre="Bravo !" detail="Tu as reconstitué le mouvement du nœud de chaise." />
        </div>
      )}
    </div>
  );
}

export function NoeudChaiseExperience() {
  const [current, setCurrent] = useState(0);
  const [showCheck, setShowCheck] = useState(false);

  const step = STEPS[current];

  function goTo(index: number) {
    setCurrent(index);
    setShowCheck(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-brand-50 py-4">
        <AnimatePresence mode="wait">
          <motion.svg
            key={current}
            viewBox="0 0 300 280"
            className="w-full max-h-72 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {step.dormantCrossing ? (
              <DepthCrossing under={DORMANT_D} over={AROUND_DORMANT_D} underStyle={DORMANT_STYLE} overStyle={COURANT_STYLE} />
            ) : (
              <Rope d={DORMANT_D} role="dormant" />
            )}

            {step.courantPaths.map((d, i) => (
              <Rope key={i} d={d} role="courant" />
            ))}

            {!step.serrage && <RopeEnd at={{ x: 150, y: BOUT_LIBRE_Y[current] }} />}

            {step.serrage && (
              <g>
                <circle cx={230} cy={90} r={16} fill="var(--color-success)" />
                <path d="M223,90 L228,96 L238,84" stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </motion.svg>
        </AnimatePresence>
      </div>

      <div className="text-center">
        <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">
          Étape {current + 1} / {STEPS.length}
        </p>
        <p className="text-lg font-semibold text-ink">{step.titre}</p>
        <p className="text-sm text-ink-soft mt-0.5">{step.description}</p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => goTo(Math.max(0, current - 1))}
          disabled={current === 0}
          aria-label="Étape précédente"
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => goTo(Math.min(STEPS.length - 1, current + 1))}
          disabled={current === STEPS.length - 1}
          aria-label="Étape suivante"
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      {current === STEPS.length - 1 && !showCheck && (
        <Button size="lg" className="w-full" onClick={() => setShowCheck(true)}>
          <Check size={16} />À toi de vérifier
        </Button>
      )}

      {showCheck && <VerificationFinale />}
    </div>
  );
}
