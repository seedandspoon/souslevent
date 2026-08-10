import { levels, modules, getModulesForLevel } from "@/content/levels";
import { lessons, getLessonsForModule } from "@/content/lessons";
import { concepts } from "@/content/concepts";
import type { Lesson } from "@/content/types";

export function getAllLessonsOrdered(): Lesson[] {
  const ordered: Lesson[] = [];
  for (const level of [...levels].sort((a, b) => a.ordre - b.ordre)) {
    for (const mod of getModulesForLevel(level.id)) {
      ordered.push(...getLessonsForModule(mod.id));
    }
  }
  return ordered;
}

export function getNextLesson(completedLessonIds: string[]): Lesson | undefined {
  const completed = new Set(completedLessonIds);
  return getAllLessonsOrdered().find((l) => !completed.has(l.id));
}

export function getLessonPosition(lessonId: string): { index: number; total: number } {
  const all = getAllLessonsOrdered();
  return { index: all.findIndex((l) => l.id === lessonId), total: all.length };
}

export function getTotalConceptsCount(): number {
  return concepts.length;
}

export function getAvailableLevelsWithContent() {
  const levelIdsWithModules = new Set(modules.map((m) => m.levelId));
  return [...levels].sort((a, b) => a.ordre - b.ordre).map((l) => ({
    ...l,
    disponible: levelIdsWithModules.has(l.id),
  }));
}

export { levels, modules, lessons };
