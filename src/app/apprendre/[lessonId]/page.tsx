"use client";

import { useState } from "react";
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

export default function LessonPage() {
  const params = useParams<{ lessonId: string }>();
  const router = useRouter();
  const lesson = getLesson(params.lessonId);
  const dejaTerminee = useIsLessonComplete(params.lessonId ?? "");

  const [reponseIndex, setReponseIndex] = useState<number | null>(null);
  const [termine, setTermine] = useState(false);
  const completions = useLiveQuery(() => db.lessonCompletions.toArray(), [], []) ?? [];

  if (!lesson) notFound();

  const completedIds = completions.map((c) => c.lessonId);
  const prochaine = getNextLesson([...completedIds, lesson.id]);

  const aRepondu = reponseIndex !== null;
  const correct = lesson.questionInline ? reponseIndex === lesson.questionInline.reponseIndex : false;

  async function repondre(index: number) {
    if (aRepondu || !lesson?.questionInline) return;
    setReponseIndex(index);
    const bonneReponse = index === lesson.questionInline.reponseIndex;
    await enregistrerReponse(lesson.conceptIds, bonneReponse);
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

        {lesson.questionInline && (
          <Card className="p-5">
            <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-3">
              Vérifie ta compréhension
            </p>
            <p className="text-[15px] font-medium text-ink mb-4">{lesson.questionInline.enonce}</p>
            <div className="flex flex-col gap-2">
              {lesson.questionInline.options.map((option, i) => {
                const estBonneReponse = i === lesson.questionInline!.reponseIndex;
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
                {lesson.questionInline.explication}
              </div>
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
          <Button size="lg" className="w-full" onClick={terminerLecon} disabled={lesson.questionInline ? !aRepondu : false}>
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
