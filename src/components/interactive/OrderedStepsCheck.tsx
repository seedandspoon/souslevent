"use client";

import { useState } from "react";
import clsx from "clsx";
import { FeedbackBanner } from "./FeedbackBanner";

/**
 * Exercice « à toi de vérifier » : les étapes d'une manœuvre ou d'un nœud
 * sont mélangées, l'utilisateur les retrouve en les touchant dans le bon
 * ordre, avec un flash d'erreur si l'ordre n'est pas respecté. Née de la
 * vérification finale du nœud de chaise (NoeudChaiseExperience) puis
 * généralisée pour être réutilisée par les manœuvres (virement,
 * empannage...) — mêmes conventions d'interaction partout dans l'app.
 */
export function OrderedStepsCheck({
  steps,
  instructions = "Touche les étapes dans le bon ordre, du début à la fin.",
  successTitre = "Bravo !",
  successDetail,
}: {
  /** Libellés des étapes, déjà dans l'ordre correct. */
  steps: string[];
  instructions?: string;
  successTitre?: string;
  successDetail?: string;
}) {
  const [shuffled] = useState(() => {
    const idx = steps.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  });
  const [placed, setPlaced] = useState<number[]>([]);
  const [erreur, setErreur] = useState<number | null>(null);
  const termine = placed.length === steps.length;

  function tap(stepIndex: number) {
    if (placed.includes(stepIndex) || termine) return;
    const attendu = placed.length;
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
      <p className="text-xs text-ink-soft mb-3">{instructions}</p>
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
              {steps[stepIndex]}
            </button>
          );
        })}
      </div>
      {termine && (
        <div className="mt-3">
          <FeedbackBanner tone="success" titre={successTitre} detail={successDetail} />
        </div>
      )}
    </div>
  );
}
