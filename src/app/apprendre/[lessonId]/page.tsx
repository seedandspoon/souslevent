"use client";

import { useEffect, useState } from "react";
import type { QuestionInline } from "@/content/types";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Check, Clock, PartyPopper, Hand, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { getLesson } from "@/content/lessons";
import { BlockRenderer } from "@/components/lessons/BlockRenderer";
import { Button, LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useIsLessonComplete } from "@/lib/hooks";
import { marquerLeconTerminee, enregistrerReponse } from "@/lib/progress";
import { getNextLesson, getAllLessonsOrdered } from "@/lib/curriculum";
import { LESSON_EXPERIENCE_LINKS } from "@/lib/experienceLinks";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";

function shuffle<T>(items: T[]): T[] {
  const copie = [...items];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const router = useRouter();
  const lesson = getLesson(params.lessonId);
  const dejaTerminee = useIsLessonComplete(params.lessonId ?? "");

  const questions: QuestionInline[] = lesson?.questionsInline ?? [];
  // Ordre identique au premier rendu serveur et client (pas de Math.random ici,
  // sous peine de désaccord d'hydratation) : le mélange n'a lieu qu'après le
  // montage, côté client uniquement.
  const [ordre, setOrdre] = useState(() => questions.map((_, i) => i));
  useEffect(() => {
    // Mélange volontairement différé au montage client (jamais pendant le
    // rendu, serveur ou client) : c'est la seule source de hasard de la
    // page, donc la seule à devoir être isolée de l'hydratation.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomisation intentionnelle, uniquement côté client
    setOrdre(shuffle(questions.map((_, i) => i)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);
  const [qPos, setQPos] = useState(0);
  const [reponseIndex, setReponseIndex] = useState<number | null>(null);
  const [termine, setTermine] = useState(false);
  const completions = useLiveQuery(() => db.lessonCompletions.toArray(), [], []) ?? [];

  if (!lesson) notFound();

  const completedIds = completions.map((c) => c.lessonId);
  const prochaine = getNextLesson([...completedIds, lesson.id]);

  const question = questions.length > 0 ? questions[ordre[qPos]] : null;
  const derniereQuestion = qPos === questions.length - 1;
  const aRepondu = reponseIndex !== null;
  const quizTermine = questions.length === 0 || (derniereQuestion && aRepondu);
  const correct = question ? reponseIndex === question.reponseIndex : false;

  async function repondre(index: number) {
    if (aRepondu || !question) return;
    setReponseIndex(index);
    const bonneReponse = index === question.reponseIndex;
    await enregistrerReponse(lesson!.conceptIds, bonneReponse);
  }

  function questionSuivante() {
    if (!derniereQuestion) {
      setQPos((p) => p + 1);
      setReponseIndex(null);
    }
  }

  async function terminerLecon() {
    if (!lesson) return;
    await marquerLeconTerminee(lesson.id, lesson.conceptIds);
    setTermine(true);
  }

  return (
    <main className="mx-auto max-w-lg pb-10">
      <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur px-4 pt-5 pb-3 flex items-center gap-3">
        <Link href="/apprendre" className="text-ink-soft hover:text-ink shrink-0">
          <ChevronLeft size={22} />
        </Link>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-ink-soft uppercase tracking-wide truncate">
            {getAllLessonsOrdered().findIndex((l) => l.id === lesson.id) + 1} / {getAllLessonsOrdered().length}
          </p>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-5">
        <header>
          <h1 className="text-2xl font-semibold text-ink">{lesson.titre}</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-ink-soft">
            <Clock size={14} />
            {lesson.dureeMinutes} min
            {dejaTerminee && !termine && (
              <span className="flex items-center gap-1 text-success font-medium ml-2">
                <Check size={14} /> Déjà vue
              </span>
            )}
          </div>
        </header>

        {lesson.blocs.map((bloc, i) => (
          <BlockRenderer key={i} bloc={bloc} />
        ))}

        {question && (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                Vérifie ta compréhension
              </p>
              <p className="text-xs font-medium text-ink-soft">
                {qPos + 1} / {questions.length}
              </p>
            </div>
            <p className="text-[15px] font-medium text-ink mb-4">{question.enonce}</p>
            <div className="flex flex-col gap-2">
              {question.options.map((option, i) => {
                const estBonneReponse = i === question.reponseIndex;
                const estSelectionnee = i === reponseIndex;
                return (
                  <button
                    key={i}
                    onClick={() => repondre(i)}
                    disabled={aRepondu}
                    className={clsx(
                      "text-left text-sm rounded-xl border px-4 py-3 transition-colors",
                      !aRepondu && "border-border hover:border-brand-300 bg-surface",
                      aRepondu && estBonneReponse && "border-success bg-success-soft text-ink",
                      aRepondu && estSelectionnee && !estBonneReponse && "border-danger bg-danger-soft text-ink",
                      aRepondu && !estSelectionnee && !estBonneReponse && "border-border opacity-50"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {aRepondu && (
              <div className={clsx("mt-4 rounded-xl p-3.5 text-sm leading-relaxed", correct ? "bg-success-soft text-ink" : "bg-danger-soft text-ink")}>
                <p className="font-semibold mb-1">{correct ? "Bonne réponse !" : "Pas tout à fait."}</p>
                {question.explication}
              </div>
            )}
            {aRepondu && !derniereQuestion && (
              <Button className="w-full mt-4" onClick={questionSuivante}>
                Question suivante
              </Button>
            )}
          </Card>
        )}

        {LESSON_EXPERIENCE_LINKS[lesson.id] && (
          <Link href={LESSON_EXPERIENCE_LINKS[lesson.id].href}>
            <div className="rounded-xl bg-brand-700 p-4 flex items-center gap-3 hover:opacity-95 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Hand size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/70">Maintenant que tu as lu la leçon</p>
                <p className="text-sm font-medium text-white">{LESSON_EXPERIENCE_LINKS[lesson.id].label}</p>
              </div>
              <ArrowRight size={16} className="text-white/70 shrink-0" />
            </div>
          </Link>
        )}

        {!termine ? (
          <Button size="lg" className="w-full" onClick={terminerLecon} disabled={!quizTermine}>
            Terminer la leçon
          </Button>
        ) : (
          <Card className="p-5 text-center">
            <PartyPopper className="mx-auto text-accent mb-2" size={28} />
            <p className="font-semibold text-ink mb-1">Leçon terminée</p>
            <p className="text-sm text-ink-soft mb-4">
              Elle reviendra en révision dans quelques jours pour ancrer la notion.
            </p>
            <div className="flex flex-col gap-2">
              {prochaine ? (
                <LinkButton href={`/apprendre/${prochaine.id}`} size="lg" className="w-full">
                  Leçon suivante
                </LinkButton>
              ) : (
                <LinkButton href="/apprendre" size="lg" className="w-full">
                  Retour au parcours
                </LinkButton>
              )}
              <Button variant="ghost" onClick={() => router.push("/apprendre")}>
                Retour au parcours
              </Button>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
