import type { UserProgress } from "./types";

// Répétition espacée — variante simplifiée de l'algorithme SM-2.
// Une notion mal maîtrisée revient vite (quelques heures), une notion
// maîtrisée revient de plus en plus tard (jours, semaines, mois).

const JOUR_MS = 24 * 60 * 60 * 1000;
const EF_MIN = 1.3;
const EF_DEFAUT = 2.5;

export function creerProgressionInitiale(conceptId: string): UserProgress {
  const maintenant = Date.now();
  return {
    conceptId,
    facteurFacilite: EF_DEFAUT,
    intervalleJours: 0,
    repetitions: 0,
    derniereRevision: maintenant,
    prochaineRevision: maintenant,
    maitrise: 0,
  };
}

/**
 * Met à jour une progression après une réponse.
 * `qualite` va de 0 (échec total) à 5 (réponse immédiate et sûre) ;
 * pour un simple correct/incorrect, utiliser 4 et 1.
 */
export function reviser(
  progression: UserProgress,
  qualite: number
): UserProgress {
  const maintenant = Date.now();
  const q = Math.max(0, Math.min(5, qualite));

  let { facteurFacilite, intervalleJours, repetitions, maitrise } = progression;

  facteurFacilite = Math.max(
    EF_MIN,
    facteurFacilite + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  );

  if (q < 3) {
    repetitions = 0;
    intervalleJours = 0; // revient rapidement (le jour même)
    maitrise = Math.max(0, maitrise - 25);
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalleJours = 1;
    else if (repetitions === 2) intervalleJours = 6;
    else intervalleJours = Math.round(intervalleJours * facteurFacilite);
    maitrise = Math.min(100, Math.round(maitrise + (100 - maitrise) * 0.45));
  }

  const delaiMs = intervalleJours === 0 ? 8 * 60 * 60 * 1000 : intervalleJours * JOUR_MS;

  return {
    ...progression,
    facteurFacilite,
    intervalleJours,
    repetitions,
    derniereRevision: maintenant,
    prochaineRevision: maintenant + delaiMs,
    maitrise,
  };
}

export function estDue(progression: UserProgress, reference = Date.now()): boolean {
  return progression.prochaineRevision <= reference;
}

export function qualiteDepuisReponse(correct: boolean, tempsReponseMs?: number): number {
  if (!correct) return 1;
  if (tempsReponseMs && tempsReponseMs < 4000) return 5;
  return 4;
}
