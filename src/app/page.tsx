"use client";

import Link from "next/link";
import { Anchor, ChevronRight, Flame, Sparkles, Wind } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SkillBar } from "@/components/ui/SkillBar";
import { LinkButton } from "@/components/ui/Button";
import {
  useProfile,
  useStreak,
  useConceptsARevoir,
  useLessonCompletions,
  useSkillScores,
  useGlobalProgressPercent,
} from "@/lib/hooks";
import { getNextLesson, getLessonPosition, getTotalConceptsCount } from "@/lib/curriculum";

function niveauLabel(pct: number) {
  if (pct < 15) return "Débutante";
  if (pct < 40) return "Apprentie";
  if (pct < 70) return "Intermédiaire";
  return "Confirmée";
}

export default function AccueilPage() {
  const profil = useProfile();
  const streak = useStreak();
  const aReviser = useConceptsARevoir();
  const completions = useLessonCompletions();
  const skills = useSkillScores();
  const totalConcepts = getTotalConceptsCount();
  const globalPct = useGlobalProgressPercent(totalConcepts);

  const completedIds = completions.map((c) => c.lessonId);
  const prochaineLecon = getNextLesson(completedIds);
  const position = prochaineLecon ? getLessonPosition(prochaineLecon.id) : null;

  const minutesRevision = Math.max(1, Math.round((aReviser.length * 45) / 60));

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink">
            Bonjour {profil.prenom || ""} <span aria-hidden>⛵</span>
          </h1>
          <p className="text-sm text-ink-soft mt-1">
            Ton objectif aujourd&apos;hui : {profil.objectifQuotidienMinutes} minutes
          </p>
        </div>
        {streak.serieActuelle > 0 && (
          <div className="flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1.5 text-accent font-semibold text-sm">
            <Flame size={16} className="fill-accent text-accent" />
            {streak.serieActuelle}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-4">
        {prochaineLecon && (
          <Link href={`/apprendre/${prochaineLecon.id}`}>
            <Card className="p-5 hover:border-brand-300 transition-colors">
              <div className="flex items-center justify-between text-xs font-medium text-brand-500 mb-2">
                <span className="uppercase tracking-wide">À continuer</span>
                {position && (
                  <span className="text-ink-soft">
                    Leçon {position.index + 1} / {position.total}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-ink">{prochaineLecon.titre}</p>
                  <p className="text-sm text-ink-soft mt-0.5">{prochaineLecon.resume}</p>
                </div>
                <ChevronRight className="text-brand-500 shrink-0" />
              </div>
            </Card>
          </Link>
        )}

        {aReviser.length > 0 && (
          <Link href="/quiz?mode=revision">
            <Card className="p-5 hover:border-brand-300 transition-colors">
              <div className="flex items-center gap-2 text-xs font-medium text-success mb-2 uppercase tracking-wide">
                <Sparkles size={14} />À réviser
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-ink">{aReviser.length} notions</p>
                  <p className="text-sm text-ink-soft mt-0.5">≈ {minutesRevision} min</p>
                </div>
                <ChevronRight className="text-ink-soft shrink-0" />
              </div>
            </Card>
          </Link>
        )}

        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-ink-soft uppercase tracking-wide">Ton niveau</span>
            <span className="text-sm font-semibold text-ink">{globalPct}%</span>
          </div>
          <p className="text-base font-semibold text-ink mb-3">{niveauLabel(globalPct)}</p>
          <ProgressBar value={globalPct} />
        </Card>

        {skills.length > 0 && (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-ink-soft uppercase tracking-wide">Compétences</span>
              <Link href="/profil" className="text-xs text-brand-500 font-medium">
                Voir tout
              </Link>
            </div>
            <div className="flex flex-col gap-3.5">
              {skills.map((s) => (
                <SkillBar key={s.tag} skill={s} />
              ))}
            </div>
          </Card>
        )}

        <LinkButton href="/simulateur" size="lg" variant="secondary" className="w-full justify-between">
          <span className="flex items-center gap-2">
            <Wind size={20} className="text-brand-500" />
            Simulateur des allures
          </span>
          <ChevronRight size={18} />
        </LinkButton>

        <LinkButton href="/bord" size="lg" variant="secondary" className="w-full justify-between">
          <span className="flex items-center gap-2">
            <Anchor size={20} className="text-brand-500" />
            Je suis à bord
          </span>
          <ChevronRight size={18} />
        </LinkButton>
      </div>
    </main>
  );
}
