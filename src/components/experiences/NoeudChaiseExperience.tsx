"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Gauge, Check } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";

const INK = "var(--color-ink)";
const ACCENT = "var(--color-accent)";

const DORMANT = { d: "M150,20 L150,120", color: INK, width: 4.5 };
const TAIL_STRAIGHT = { d: "M150,120 L150,235", color: ACCENT, width: 4 };
const LOOP_WITH_TAIL = {
  d: "M150,120 C185,128 185,168 150,160 C115,168 115,128 150,120 L150,180",
  color: ACCENT,
  width: 4,
};
const THROUGH_LOOP = { d: "M150,180 C172,165 172,130 150,112", color: ACCENT, width: 4 };
const AROUND_DORMANT = {
  d: "M150,112 C176,102 176,76 150,66 C124,76 124,102 150,109",
  color: ACCENT,
  width: 4,
};
const BACK_THROUGH = { d: "M150,109 C130,125 130,160 150,180 L150,242", color: ACCENT, width: 4 };

type PathSpec = { d: string; color: string; width: number };

interface Step {
  titre: string;
  description: string;
  statiques: PathSpec[];
  animees: PathSpec[];
  serrage?: boolean;
}

const STEPS: Step[] = [
  {
    titre: "Position initiale",
    description: "Le cordage pend, prêt à être façonné.",
    statiques: [],
    animees: [DORMANT, TAIL_STRAIGHT],
  },
  {
    titre: "Créer la première boucle",
    description: "Une boucle se forme sur le dormant.",
    statiques: [DORMANT],
    animees: [LOOP_WITH_TAIL],
  },
  {
    titre: "Passer l'extrémité dans la boucle",
    description: "Le courant remonte à travers la boucle.",
    statiques: [DORMANT, LOOP_WITH_TAIL],
    animees: [THROUGH_LOOP],
  },
  {
    titre: "Passer autour du dormant",
    description: "Il fait le tour du dormant.",
    statiques: [DORMANT, LOOP_WITH_TAIL, THROUGH_LOOP],
    animees: [AROUND_DORMANT],
  },
  {
    titre: "Repasser dans la boucle",
    description: "Puis redescend dans la boucle de départ.",
    statiques: [DORMANT, LOOP_WITH_TAIL, THROUGH_LOOP, AROUND_DORMANT],
    animees: [BACK_THROUGH],
  },
  {
    titre: "Serrer",
    description: "Le nœud se resserre : une boucle fixe qui ne glisse pas.",
    statiques: [DORMANT, LOOP_WITH_TAIL, THROUGH_LOOP, AROUND_DORMANT, BACK_THROUGH],
    animees: [],
    serrage: true,
  },
];

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
  const [replayCount, setReplayCount] = useState(0);
  const [slow, setSlow] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const step = STEPS[current];
  const duration = slow ? 2.4 : 1;

  function goTo(index: number) {
    setCurrent(index);
    setReplayCount((c) => c + 1);
    setShowCheck(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-brand-50 py-4">
        <svg viewBox="0 0 300 280" className="w-full max-h-72 mx-auto">
          <motion.g
            key={step.serrage ? `tighten-${replayCount}` : "rope"}
            animate={step.serrage ? { scale: [1, 0.92, 1] } : {}}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: "150px 140px" }}
          >
            {step.statiques.map((p, i) => (
              <path key={`s-${i}`} d={p.d} fill="none" stroke={p.color} strokeWidth={p.width} strokeLinecap="round" />
            ))}
            {step.animees.map((p, i) => (
              <motion.path
                key={`a-${current}-${i}-${replayCount}`}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth={p.width}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration, ease: "easeInOut" }}
              />
            ))}
          </motion.g>
          {step.serrage && (
            <motion.g
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <circle cx={230} cy={90} r={16} fill="var(--color-success)" />
              <path d="M223,90 L228,96 L238,84" stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          )}
        </svg>
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
          onClick={() => setReplayCount((c) => c + 1)}
          aria-label="Rejouer"
        >
          <RotateCcw size={15} />
        </Button>
        <Button
          variant={slow ? "primary" : "secondary"}
          size="sm"
          onClick={() => setSlow((v) => !v)}
          aria-label="Ralenti"
        >
          <Gauge size={15} />
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
