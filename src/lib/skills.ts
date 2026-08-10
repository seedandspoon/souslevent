import type { SkillTag } from "@/content/types";

export const SKILL_META: Record<SkillTag, { label: string; emoji: string }> = {
  vent: { label: "Vent", emoji: "🌬️" },
  manoeuvres: { label: "Manœuvres", emoji: "⛵" },
  navigation: { label: "Navigation", emoji: "🧭" },
  securite: { label: "Sécurité", emoji: "⚓" },
  meteo: { label: "Météo", emoji: "🌦️" },
};

export const SKILL_TAGS: SkillTag[] = ["vent", "manoeuvres", "navigation", "securite", "meteo"];
