import Dexie, { type EntityTable } from "dexie";
import type {
  UserProgress,
  QuizAttempt,
  LessonCompletion,
  StreakState,
  UserProfileState,
} from "./types";

class SousLeVentDB extends Dexie {
  progress!: EntityTable<UserProgress, "conceptId">;
  attempts!: EntityTable<QuizAttempt, "id">;
  lessonCompletions!: EntityTable<LessonCompletion, "lessonId">;
  streak!: EntityTable<StreakState, "id">;
  profile!: EntityTable<UserProfileState, "id">;

  constructor() {
    super("sous-le-vent");
    this.version(1).stores({
      progress: "conceptId, prochaineRevision",
      attempts: "++id, quizItemId, date",
      lessonCompletions: "lessonId, dateCompletion",
      streak: "id",
      profile: "id",
    });
  }
}

export const db = new SousLeVentDB();

export const STREAK_ID = "singleton";
export const PROFILE_ID = "singleton";
