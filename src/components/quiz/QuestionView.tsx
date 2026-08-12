"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Timer } from "lucide-react";
import type { QuizItem } from "@/content/types";
import { Illustration } from "@/components/illustrations/registry";
import { OrderedStepsCheck } from "@/components/interactive/OrderedStepsCheck";
import { shuffle } from "@/lib/quizSession";

function ChoiceList({
  options,
  reponseIndex,
  onAnswer,
}: {
  options: string[];
  reponseIndex: number;
  onAnswer: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const repondu = selected !== null;

  return (
    <div className="flex flex-col gap-2">
      {options.map((option, i) => {
        const estBonne = i === reponseIndex;
        const estSelectionnee = i === selected;
        return (
          <button
            key={i}
            disabled={repondu}
            onClick={() => {
              setSelected(i);
              onAnswer(i === reponseIndex);
            }}
            className={clsx(
              "text-left text-sm rounded-xl border px-4 py-3.5 transition-colors",
              !repondu && "border-border hover:border-brand-300 bg-surface",
              repondu && estBonne && "border-success bg-success-soft text-ink",
              repondu && estSelectionnee && !estBonne && "border-danger bg-danger-soft text-ink",
              repondu && !estSelectionnee && !estBonne && "border-border opacity-45"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function VraiFauxChoices({ reponse, onAnswer }: { reponse: boolean; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const repondu = selected !== null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {[true, false].map((val) => {
        const estBonne = val === reponse;
        const estSelectionnee = val === selected;
        return (
          <button
            key={String(val)}
            disabled={repondu}
            onClick={() => {
              setSelected(val);
              onAnswer(val === reponse);
            }}
            className={clsx(
              "rounded-xl border py-5 text-base font-semibold transition-colors",
              !repondu && "border-border hover:border-brand-300 bg-surface",
              repondu && estBonne && "border-success bg-success-soft text-ink",
              repondu && estSelectionnee && !estBonne && "border-danger bg-danger-soft text-ink",
              repondu && !estSelectionnee && !estBonne && "border-border opacity-45"
            )}
          >
            {val ? "Vrai" : "Faux"}
          </button>
        );
      })}
    </div>
  );
}

function AssociationPairs({
  paires,
  onAnswer,
}: {
  paires: { gauche: string; droite: string }[];
  onAnswer: (correct: boolean) => void;
}) {
  const [gauches] = useState(() => shuffle(paires.map((p) => p.gauche)));
  const [droites] = useState(() => shuffle(paires.map((p) => p.droite)));
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [erreur, setErreur] = useState<string | null>(null);
  const [eutErreur, setEutErreur] = useState(false);
  const [termine, setTermine] = useState(false);

  function pickRight(droite: string) {
    if (!selectedLeft || matched.has(selectedLeft)) return;
    const attendue = paires.find((p) => p.gauche === selectedLeft)?.droite;
    if (attendue === droite) {
      const nouveauMatched = new Set(matched).add(selectedLeft);
      setMatched(nouveauMatched);
      setSelectedLeft(null);
      setErreur(null);
      if (nouveauMatched.size === paires.length) {
        setTermine(true);
        onAnswer(!eutErreur);
      }
    } else {
      setErreur(droite);
      setEutErreur(true);
      setTimeout(() => setErreur(null), 500);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {gauches.map((g) => {
            const estMatched = matched.has(g);
            const estSelectionnee = g === selectedLeft;
            return (
              <button
                key={g}
                disabled={estMatched || termine}
                onClick={() => setSelectedLeft(g)}
                className={clsx(
                  "text-left text-sm rounded-xl border px-3 py-3 transition-colors min-h-[52px]",
                  estMatched && "border-success bg-success-soft text-ink opacity-70",
                  !estMatched && estSelectionnee && "border-brand-500 bg-brand-50 text-ink",
                  !estMatched && !estSelectionnee && "border-border bg-surface hover:border-brand-300"
                )}
              >
                {g}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {droites.map((d) => {
            const estMatched = paires.some((p) => p.droite === d && matched.has(p.gauche));
            const estErreur = d === erreur;
            return (
              <button
                key={d}
                disabled={estMatched || termine}
                onClick={() => pickRight(d)}
                className={clsx(
                  "text-left text-sm rounded-xl border px-3 py-3 transition-colors min-h-[52px]",
                  estMatched && "border-success bg-success-soft text-ink opacity-70",
                  estErreur && "border-danger bg-danger-soft text-ink",
                  !estMatched && !estErreur && "border-border bg-surface hover:border-brand-300"
                )}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
      {!termine && <p className="text-xs text-ink-soft mt-3">Touche un élément à gauche, puis sa correspondance à droite.</p>}
    </div>
  );
}

export function QuestionView({ item, onAnswer }: { item: QuizItem; onAnswer: (correct: boolean, tempsMs: number) => void }) {
  const [debut] = useState(() => Date.now());
  const [repondu, setRepondu] = useState<{ correct: boolean } | null>(null);
  const [tempsRestant, setTempsRestant] = useState(20);

  const chronometre = item.type === "scenario" && item.chronometre;

  useEffect(() => {
    if (!chronometre || repondu) return;
    if (tempsRestant <= 0) {
      handleAnswer(false);
      return;
    }
    const t = setTimeout(() => setTempsRestant((v) => v - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempsRestant, repondu, chronometre]);

  function handleAnswer(correct: boolean) {
    if (repondu) return;
    setRepondu({ correct });
    onAnswer(correct, Date.now() - debut);
  }

  return (
    <div>
      {chronometre && !repondu && (
        <div className="flex items-center gap-1.5 text-accent text-xs font-semibold mb-3">
          <Timer size={14} />
          {tempsRestant}s
        </div>
      )}

      {item.type === "qcm" && (
        <>
          <p className="text-[15px] font-medium text-ink mb-4">{item.enonce}</p>
          <ChoiceList options={item.options} reponseIndex={item.reponseIndex} onAnswer={handleAnswer} />
        </>
      )}

      {item.type === "vrai-faux" && (
        <>
          <p className="text-[15px] font-medium text-ink mb-4">{item.enonce}</p>
          <VraiFauxChoices reponse={item.reponse} onAnswer={handleAnswer} />
        </>
      )}

      {item.type === "reconnaissance" && (
        <>
          <p className="text-[15px] font-medium text-ink mb-3">{item.enonce}</p>
          <div className="mb-4">
            <Illustration id={item.illustration} />
          </div>
          <ChoiceList options={item.options} reponseIndex={item.reponseIndex} onAnswer={handleAnswer} />
        </>
      )}

      {item.type === "scenario" && (
        <>
          <div className="rounded-xl bg-brand-50 p-4 mb-4">
            <p className="text-[15px] text-ink leading-relaxed">{item.situation}</p>
          </div>
          <ChoiceList options={item.options} reponseIndex={item.reponseIndex} onAnswer={handleAnswer} />
        </>
      )}

      {item.type === "association" && (
        <>
          <p className="text-[15px] font-medium text-ink mb-4">{item.enonce}</p>
          <AssociationPairs paires={item.paires} onAnswer={handleAnswer} />
        </>
      )}

      {item.type === "ordre-etapes" && (
        <>
          <p className="text-[15px] font-medium text-ink mb-4">{item.titre}</p>
          <OrderedStepsCheck steps={item.etapes} showSuccessBanner={false} onComplete={handleAnswer} />
        </>
      )}

      {repondu && (
        <div
          className={clsx(
            "mt-4 rounded-xl p-3.5 text-sm leading-relaxed",
            repondu.correct ? "bg-success-soft text-ink" : "bg-danger-soft text-ink"
          )}
        >
          <p className="font-semibold mb-1">{repondu.correct ? "Bonne réponse !" : "Pas tout à fait."}</p>
          {item.explication}
        </div>
      )}
    </div>
  );
}
