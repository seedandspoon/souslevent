import { quizItems } from "@/content/quiz";
import { concepts } from "@/content/concepts";
import type { QuizItem } from "@/content/types";
import type { SkillTag } from "@/content/types";

export function getQuizItemsForSkill(tag: SkillTag): QuizItem[] {
  const idsForTag = new Set(concepts.filter((c) => c.skillTag === tag).map((c) => c.id));
  return quizItems.filter((q) => q.conceptIds.some((c) => idsForTag.has(c)));
}

export function getQuizItemsForConcepts(conceptIds: string[]): QuizItem[] {
  const set = new Set(conceptIds);
  return quizItems.filter((q) => q.conceptIds.some((c) => set.has(c)));
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
