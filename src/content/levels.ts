import type { Level, Module } from "./types";

export const levels: Level[] = [
  {
    id: "niveau-1",
    ordre: 1,
    titre: "Découvrir la voile",
    description: "Le bateau, le vent et les premiers repères.",
    icone: "⛵",
  },
  {
    id: "niveau-2",
    ordre: 2,
    titre: "Comprendre le bateau",
    description: "Les voiles, les cordages et les manœuvres du quotidien.",
    icone: "🧵",
  },
  {
    id: "niveau-3",
    ordre: 3,
    titre: "Manœuvrer",
    description: "Virer, empanner, réduire la toile.",
    icone: "🔄",
  },
  {
    id: "niveau-4",
    ordre: 4,
    titre: "Naviguer",
    description: "Cartes, caps, courants et marées.",
    icone: "🧭",
  },
  {
    id: "niveau-5",
    ordre: 5,
    titre: "Météo",
    description: "Lire le ciel, le vent et les prévisions.",
    icone: "🌦️",
  },
  {
    id: "niveau-6",
    ordre: 6,
    titre: "Sécurité",
    description: "Les bons réflexes en toutes circonstances.",
    icone: "🦺",
  },
  {
    id: "niveau-7",
    ordre: 7,
    titre: "Règles de navigation",
    description: "Priorités, croisements et balisage.",
    icone: "⚖️",
  },
];

export const modules: Module[] = [
  { id: "module-1-1", levelId: "niveau-1", ordre: 1, titre: "Les bases" },
  { id: "module-2-1", levelId: "niveau-2", ordre: 1, titre: "Voiles et cordages" },
  { id: "module-3-1", levelId: "niveau-3", ordre: 1, titre: "Virer, empanner, réduire la toile" },
  { id: "module-4-1", levelId: "niveau-4", ordre: 1, titre: "Cartes, caps et balisage" },
  { id: "module-5-1", levelId: "niveau-5", ordre: 1, titre: "Vent, ciel et prévisions" },
  { id: "module-6-1", levelId: "niveau-6", ordre: 1, titre: "Les bons réflexes" },
  { id: "module-7-1", levelId: "niveau-7", ordre: 1, titre: "Priorités et feux de navigation" },
];

export function getLevel(id: string): Level | undefined {
  return levels.find((l) => l.id === id);
}

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModulesForLevel(levelId: string): Module[] {
  return modules.filter((m) => m.levelId === levelId).sort((a, b) => a.ordre - b.ordre);
}
