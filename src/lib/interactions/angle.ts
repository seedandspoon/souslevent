/** Angle en degrés (0 = haut, sens horaire) entre le centre et un point. */
export function angleFromCenter(cx: number, cy: number, px: number, py: number): number {
  const dx = px - cx;
  const dy = py - cy;
  const raw = (Math.atan2(dx, -dy) * 180) / Math.PI;
  return normalize360(raw);
}

export function normalize360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Distance angulaire jusqu'au vent (0 = face au vent, 180 = vent arrière), quelle que soit l'amure. */
export function distanceAuVent(headingDeg: number): number {
  const h = normalize360(headingDeg);
  return Math.min(h, 360 - h);
}

export type Amure = "babord" | "tribord" | null;

/** Amure portée pour un cap donné (0 = face au vent, vent fixe venant du haut). */
export function amurePourCap(headingDeg: number): Amure {
  const h = normalize360(headingDeg);
  if (h < 2 || h > 358 || Math.abs(h - 180) < 2) return null;
  return h < 180 ? "babord" : "tribord";
}

export interface AllureInfo {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const ALLURES: AllureInfo[] = [
  { id: "face-au-vent", label: "Face au vent", min: 0, max: 40 },
  { id: "pres", label: "Le près", min: 40, max: 55 },
  { id: "bon-plein", label: "Bon plein", min: 55, max: 80 },
  { id: "travers", label: "Travers", min: 80, max: 100 },
  { id: "largue", label: "Largue", min: 100, max: 140 },
  { id: "grand-largue", label: "Grand largue", min: 140, max: 170 },
  { id: "vent-arriere", label: "Vent arrière", min: 170, max: 180 },
];

export function allurePourCap(headingDeg: number): AllureInfo {
  const d = distanceAuVent(headingDeg);
  return ALLURES.find((a) => d >= a.min && d < a.max) ?? ALLURES[ALLURES.length - 1];
}
