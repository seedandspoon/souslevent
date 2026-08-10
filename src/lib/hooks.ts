"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db, PROFILE_ID } from "./db";
import { getScoresParCompetence, getStreak, getConceptsARevoir } from "./progress";
import { estDue } from "./srs";

export function useSkillScores() {
  return useLiveQuery(getScoresParCompetence, [], []) ?? [];
}

export function useStreak() {
  return (
    useLiveQuery(getStreak, [], { id: "singleton", dateDerniereActivite: "", serieActuelle: 0, record: 0 }) ?? {
      id: "singleton",
      dateDerniereActivite: "",
      serieActuelle: 0,
      record: 0,
    }
  );
}

export function useConceptsARevoir() {
  return useLiveQuery(getConceptsARevoir, [], []) ?? [];
}

export function useLessonCompletions() {
  return useLiveQuery(() => db.lessonCompletions.toArray(), [], []) ?? [];
}

export function useIsLessonComplete(lessonId: string) {
  const completions = useLessonCompletions();
  return completions.some((c) => c.lessonId === lessonId);
}

export function useAllProgress() {
  return useLiveQuery(() => db.progress.toArray(), [], []) ?? [];
}

export function useGlobalProgressPercent(totalConcepts: number) {
  const progress = useAllProgress();
  if (totalConcepts === 0) return 0;
  const somme = progress.reduce((acc, p) => acc + p.maitrise, 0);
  return Math.round(somme / totalConcepts);
}

const PROFILE_FALLBACK = { id: "singleton", prenom: "", dateInscription: 0, objectifQuotidienMinutes: 5 };

// Lecture seule : une liveQuery Dexie doit rester une transaction en lecture.
// La création du profil par défaut est faite une fois au démarrage (voir EnsureProfile).
export function useProfile() {
  return useLiveQuery(() => db.profile.get(PROFILE_ID), [], undefined) ?? PROFILE_FALLBACK;
}

export { estDue };
