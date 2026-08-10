"use client";

import { useState } from "react";
import { Flame, Trophy, GraduationCap, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SkillBar } from "@/components/ui/SkillBar";
import {
  useProfile,
  useStreak,
  useSkillScores,
  useLessonCompletions,
  useGlobalProgressPercent,
} from "@/lib/hooks";
import { getTotalConceptsCount, getAllLessonsOrdered } from "@/lib/curriculum";
import { setPrenom } from "@/lib/progress";

export default function ProfilPage() {
  const profil = useProfile();
  const streak = useStreak();
  const skills = useSkillScores();
  const completions = useLessonCompletions();
  const totalConcepts = getTotalConceptsCount();
  const globalPct = useGlobalProgressPercent(totalConcepts);
  const totalLessons = getAllLessonsOrdered().length;

  const [editing, setEditing] = useState(false);
  const [nom, setNom] = useState(profil.prenom);

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <h1 className="text-2xl font-semibold text-ink mb-6">Profil</h1>

      <Card className="p-5 mb-4">
        {editing ? (
          <div className="flex gap-2">
            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm"
              autoFocus
            />
            <button
              className="text-sm font-medium text-brand-500"
              onClick={async () => {
                await setPrenom(nom.trim());
                setEditing(false);
              }}
            >
              OK
            </button>
          </div>
        ) : (
          <button className="text-left" onClick={() => setEditing(true)}>
            <p className="text-xs text-ink-soft mb-0.5">Prénom</p>
            <p className="font-medium text-ink">{profil.prenom || "Ajouter ton prénom"}</p>
          </button>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="p-4">
          <Flame className="text-accent mb-2" size={20} />
          <p className="text-xl font-semibold text-ink">{streak.serieActuelle}</p>
          <p className="text-xs text-ink-soft">jours de série</p>
        </Card>
        <Card className="p-4">
          <Trophy className="text-accent mb-2" size={20} />
          <p className="text-xl font-semibold text-ink">{streak.record}</p>
          <p className="text-xs text-ink-soft">record de série</p>
        </Card>
      </div>

      <Card className="p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-ink-soft uppercase tracking-wide">Progression globale</span>
          <span className="text-sm font-semibold text-ink">{globalPct}%</span>
        </div>
        <ProgressBar value={globalPct} className="mb-3" />
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <GraduationCap size={15} />
          {completions.length} / {totalLessons} leçons terminées
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <p className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-4">Compétences</p>
        <div className="flex flex-col gap-4">
          {skills.map((s) => (
            <SkillBar key={s.tag} skill={s} />
          ))}
        </div>
      </Card>

      <Card className="p-4 flex gap-3 items-start bg-surface-2 border-none">
        <ShieldAlert size={16} className="text-ink-soft shrink-0 mt-0.5" />
        <p className="text-xs text-ink-soft leading-relaxed">
          Sous le vent est une application éducative. Elle ne remplace ni une formation encadrée, ni les
          documents réglementaires officiels — en particulier pour la sécurité, les priorités et les
          procédures d&apos;urgence, qui peuvent varier selon le pays ou le type de navigation.
        </p>
      </Card>
    </main>
  );
}
