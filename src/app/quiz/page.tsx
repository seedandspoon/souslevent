"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Sparkles, Shuffle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuestionView } from "@/components/quiz/QuestionView";
import { quizItems } from "@/content/quiz";
import { SKILL_META, SKILL_TAGS } from "@/lib/skills";
import { getQuizItemsForSkill, getQuizItemsForConcepts, shuffle } from "@/lib/quizSession";
import { enregistrerReponse } from "@/lib/progress";
import { useConceptsARevoir } from "@/lib/hooks";
import type { QuizItem } from "@/content/types";

const SESSION_SIZE = 8;

function SkillPicker({ onPick }: { onPick: (items: QuizItem[], titre: string) => void }) {
  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <h1 className="text-2xl font-semibold text-ink mb-1">Quiz</h1>
      <p className="text-sm text-ink-soft mb-6">QCM, vrai/faux, associations, scénarios...</p>

      <button
        onClick={() => onPick(shuffle(quizItems).slice(0, SESSION_SIZE), "Quiz aléatoire")}
        className="w-full mb-5"
      >
        <Card className="p-5 flex items-center gap-3 hover:border-brand-300 transition-colors">
          <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center shrink-0">
            <Shuffle size={18} className="text-accent" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-ink">Quiz aléatoire</p>
            <p className="text-xs text-ink-soft">Un mélange de toutes les notions vues</p>
          </div>
        </Card>
      </button>

      <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-2">Par thème</p>
      <div className="flex flex-col gap-2.5">
        {SKILL_TAGS.map((tag) => {
          const items = getQuizItemsForSkill(tag);
          const meta = SKILL_META[tag];
          return (
            <button
              key={tag}
              disabled={items.length === 0}
              onClick={() => onPick(shuffle(items).slice(0, SESSION_SIZE), meta.label)}
              className="disabled:opacity-40"
            >
              <Card className="p-4 flex items-center gap-3 hover:border-brand-300 transition-colors">
                <span className="text-xl">{meta.emoji}</span>
                <div className="text-left flex-1">
                  <p className="font-medium text-ink text-sm">{meta.label}</p>
                  <p className="text-xs text-ink-soft">{items.length} questions</p>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </main>
  );
}

function QuizRunner({ session, titre, onFinish }: { session: QuizItem[]; titre: string; onFinish: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const item = session[index];
  const isLast = index === session.length - 1;

  async function handleAnswer(correct: boolean, tempsMs: number) {
    setAnswered(true);
    if (correct) setScore((s) => s + 1);
    await enregistrerReponse(item.conceptIds, correct, tempsMs);
  }

  function next() {
    if (isLast) {
      onFinish(score);
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(false);
  }

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-10">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide">{titre}</p>
        <p className="text-xs text-ink-soft tabular-nums">
          {index + 1} / {session.length}
        </p>
      </div>

      <Card className="p-5">
        <QuestionView key={item.id} item={item} onAnswer={handleAnswer} />
      </Card>

      {answered && (
        <Button size="lg" className="w-full mt-5" onClick={next}>
          {isLast ? "Voir mon score" : "Continuer"}
        </Button>
      )}
    </main>
  );
}

function QuizSummary({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <main className="mx-auto max-w-lg px-4 pt-16 pb-10 text-center">
      <Sparkles className="mx-auto text-accent mb-4" size={36} />
      <p className="text-3xl font-semibold text-ink mb-1">
        {score} / {total}
      </p>
      <p className="text-ink-soft mb-8">{pct >= 70 ? "Bien joué !" : "Continue, ça vient !"}</p>
      <div className="flex flex-col gap-2.5">
        <Button size="lg" className="w-full" onClick={onRestart}>
          Nouveau quiz
        </Button>
        <Link href="/" className="text-sm text-ink-soft py-2">
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}

function QuizPageInner() {
  const searchParams = useSearchParams();
  const modeRevision = searchParams.get("mode") === "revision";
  const aReviser = useConceptsARevoir();

  const [session, setSession] = useState<QuizItem[] | null>(null);
  const [titre, setTitre] = useState("");
  const [resultat, setResultat] = useState<{ score: number; total: number } | null>(null);

  const revisionSession = useMemo(() => {
    if (!modeRevision) return null;
    const items = getQuizItemsForConcepts(aReviser.map((p) => p.conceptId));
    return shuffle(items).slice(0, SESSION_SIZE);
  }, [modeRevision, aReviser]);

  if (modeRevision && !session && !resultat) {
    if (revisionSession === null) return null;
    if (revisionSession.length === 0) {
      return (
        <main className="mx-auto max-w-lg px-4 pt-16 pb-10 text-center">
          <p className="text-ink-soft">Rien à réviser pour l&apos;instant. Continue le parcours pour découvrir de nouvelles notions.</p>
          <Link href="/apprendre" className="text-brand-500 font-medium mt-4 inline-block">
            Aller à Apprendre
          </Link>
        </main>
      );
    }
    setSession(revisionSession);
    setTitre("Révisions du jour");
    return null;
  }

  if (resultat) {
    return (
      <QuizSummary
        score={resultat.score}
        total={resultat.total}
        onRestart={() => {
          setSession(null);
          setResultat(null);
        }}
      />
    );
  }

  if (session) {
    return (
      <QuizRunner
        session={session}
        titre={titre}
        onFinish={(score) => setResultat({ score, total: session.length })}
      />
    );
  }

  return (
    <>
      <div className="mx-auto max-w-lg px-4 pt-5">
        <Link href="/" className="text-ink-soft inline-flex">
          <ChevronLeft size={22} />
        </Link>
      </div>
      <SkillPicker
        onPick={(items, t) => {
          setSession(items);
          setTitre(t);
        }}
      />
    </>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizPageInner />
    </Suspense>
  );
}
