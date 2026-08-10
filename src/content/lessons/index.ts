import type { Lesson } from "../types";
import { level1Lessons } from "./level1";
import { level2Lessons } from "./level2";

export const lessons: Lesson[] = [...level1Lessons, ...level2Lessons];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsForModule(moduleId: string): Lesson[] {
  return lessons.filter((l) => l.moduleId === moduleId).sort((a, b) => a.ordre - b.ordre);
}
