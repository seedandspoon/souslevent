// Données utilisateur : dynamiques, stockées en local (IndexedDB via Dexie).

export interface UserProgress {
  conceptId: string;
  // Algorithme SM-2 simplifié
  facteurFacilite: number; // 1.3 .. 2.5+
  intervalleJours: number;
  repetitions: number;
  derniereRevision: number; // timestamp
  prochaineRevision: number; // timestamp
  maitrise: number; // 0-100, indicatif pour l'UI
}

export interface QuizAttempt {
  id?: number;
  quizItemId: string;
  conceptIds: string[];
  date: number;
  correct: boolean;
  tempsReponseMs?: number;
}

export interface LessonCompletion {
  lessonId: string;
  dateCompletion: number;
}

export interface StreakState {
  id: string; // "singleton"
  dateDerniereActivite: string; // yyyy-mm-dd
  serieActuelle: number;
  record: number;
}

export interface UserProfileState {
  id: string; // "singleton"
  prenom: string;
  dateInscription: number;
  objectifQuotidienMinutes: number;
}
