"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { ProgressBar } from "@/components/ui/ProgressBar";

/**
 * Remplace la checklist toujours dépliée des manœuvres guidées (virement,
 * empannage) : sur téléphone, une liste de 9-10 étapes pousse le bouton
 * d'action hors de l'écran, sous le dessin du bateau — impossible de voir
 * les deux en même temps alors que c'est justement ce qu'on doit regarder
 * en même temps pendant la manœuvre. Par défaut, seules l'étape en cours
 * et une barre de progression sont visibles (quelques dizaines de pixels,
 * pas plusieurs centaines) ; la liste complète reste consultable d'un tap,
 * sans rien perdre du détail des étapes.
 */
export function GuidedStepsProgress<T extends { id: string; label: string }>({
  steps,
  currentIndex,
  termine,
}: {
  steps: T[];
  currentIndex: number;
  termine: boolean;
}) {
  const [ouvert, setOuvert] = useState(false);
  const pct = Math.round((Math.min(currentIndex, steps.length) / steps.length) * 100);
  const etapeActuelle = termine ? "Manœuvre terminée" : steps[currentIndex]?.label;

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOuvert((v) => !v)}
        className="flex items-center gap-3 text-left"
        aria-expanded={ouvert}
      >
        <span className="text-xs font-medium text-ink-soft whitespace-nowrap shrink-0">
          {termine ? steps.length : currentIndex + 1} / {steps.length}
        </span>
        <ProgressBar value={termine ? 100 : pct} height="h-1.5" className="flex-1" />
        <ChevronDown size={16} className={clsx("text-ink-soft shrink-0 transition-transform", ouvert && "rotate-180")} />
      </button>

      {!ouvert && <p className="text-sm font-medium text-ink">{etapeActuelle}</p>}

      {ouvert && (
        <ol className="flex flex-col gap-1 mt-1">
          {steps.map((s, i) => {
            const fait = i < currentIndex || termine;
            const actif = i === currentIndex && !termine;
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
                    "w-5 h-5 rounded-full text-[0.6875rem] flex items-center justify-center shrink-0",
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
      )}
    </div>
  );
}
