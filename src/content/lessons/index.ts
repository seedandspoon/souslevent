import type { Lesson } from "../types";
import { level1Lessons } from "./level1";
import { level2Lessons } from "./level2";
import { level3Lessons } from "./level3";
import { level4Lessons } from "./level4";
import { level5Lessons } from "./level5";
import { level6Lessons } from "./level6";
import { level7Lessons } from "./level7";

export const lessons: Lesson[] = [
  ...level1Lessons,
  ...level2Lessons,
  ...level3Lessons,
  ...level4Lessons,
  ...level5Lessons,
  ...level6Lessons,
  ...level7Lessons,
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsForModule(moduleId: string): Lesson[] {
  return lessons.filter((l) => l.moduleId === moduleId).sort((a, b) => a.ordre - b.ordre);
}
