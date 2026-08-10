"use client";

import Link from "next/link";
import { Check, Lock, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getAvailableLevelsWithContent } from "@/lib/curriculum";
import { getModulesForLevel } from "@/content/levels";
import { getLessonsForModule } from "@/content/lessons";
import { useLessonCompletions } from "@/lib/hooks";

export default function ApprendrePage() {
  const completions = useLessonCompletions();
  const completedIds = new Set(completions.map((c) => c.lessonId));
  const levels = getAvailableLevelsWithContent();

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <h1 className="text-2xl font-semibold text-ink mb-1">Apprendre</h1>
      <p className="text-sm text-ink-soft mb-6">Ton parcours, niveau par niveau.</p>

      <div className="flex flex-col gap-5">
        {levels.map((level) => {
          const modules = getModulesForLevel(level.id);
          const lessonsInLevel = modules.flatMap((m) => getLessonsForModule(m.id));
          const doneCount = lessonsInLevel.filter((l) => completedIds.has(l.id)).length;
          const pct = lessonsInLevel.length ? Math.round((doneCount / lessonsInLevel.length) * 100) : 0;

          return (
            <section key={level.id}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xl" aria-hidden>{level.icone}</span>
                <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-wide">
                  Niveau {level.ordre} — {level.titre}
                </h2>
              </div>

              {!level.disponible ? (
                <Card className="p-4 flex items-center gap-3 opacity-60">
                  <Lock size={16} className="text-ink-soft shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-ink">{level.description}</p>
                    <p className="text-xs text-ink-soft">Bientôt disponible</p>
                  </div>
                </Card>
              ) : (
                <Card className="p-2">
                  {lessonsInLevel.length > 1 && (
                    <div className="px-3 pt-2 pb-1">
                      <ProgressBar value={pct} height="h-1.5" />
                    </div>
                  )}
                  <ul>
                    {lessonsInLevel.map((lesson, i) => {
                      const done = completedIds.has(lesson.id);
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/apprendre/${lesson.id}`}
                            className={clsx(
                              "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors hover:bg-surface-2",
                              i > 0 && "mt-0.5"
                            )}
                          >
                            <span
                              className={clsx(
                                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
                                done ? "bg-success text-white" : "bg-surface-2 text-ink-soft"
                              )}
                            >
                              {done ? <Check size={14} /> : i + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-ink truncate">{lesson.titre}</p>
                              <p className="text-xs text-ink-soft">{lesson.dureeMinutes} min</p>
                            </div>
                            <ChevronRight size={16} className="text-ink-soft shrink-0" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
