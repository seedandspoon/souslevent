// Rôles de couleur constants — voir .claude/skills/nautical-pedagogical-visuals/SKILL.md
// Une couleur = un rôle, partout dans l'app. Ne pas réassigner au cas par cas.

export const INK = "var(--color-ink)"; // dormant, structure fixe
export const BRAND = "var(--color-brand-500)"; // vent, éléments neutres
export const BRAND_SOFT = "var(--color-brand-300)";
export const BACKDROP = "var(--color-brand-50)"; // fond des canevas — pour la technique du halo
export const ACCENT = "var(--color-accent)"; // courant, pièce active, avertissement doux
export const SUCCESS = "var(--color-success)";
export const DANGER = "var(--color-danger)";

export interface Point {
  x: number;
  y: number;
}

export function polar(center: Point, angleDeg: number, radius: number): Point {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: center.x + radius * Math.sin(rad), y: center.y - radius * Math.cos(rad) };
}
