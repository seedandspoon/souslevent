import { INK, ACCENT, type Point } from "./tokens";

export interface HullGeometry {
  bow: Point;
  stern: Point;
  mastBase: Point;
  cockpit: Point;
  length: number;
  width: number;
}

/**
 * Calcule la géométrie de coque (points d'ancrage pour mât, bôme, cockpit)
 * sans rien dessiner — permet à Sail/Boom de se positionner correctement
 * sans dupliquer les proportions à chaque appel.
 */
export function getHullGeometry(cx: number, cy: number, length = 132): HullGeometry {
  const width = length * 0.4;
  return {
    bow: { x: cx, y: cy - length / 2 },
    stern: { x: cx, y: cy + length / 2 },
    // Le pied de mât se place à ~32% de la longueur depuis la proue —
    // proportion réaliste d'un sloop, laissant assez de place devant pour
    // le foc et assez de coque derrière pour que la bôme atteigne
    // franchement vers la poupe (voir SailboatDiagram, longueur de bôme).
    mastBase: { x: cx, y: cy - length * 0.18 },
    cockpit: { x: cx, y: cy + length * 0.28 },
    length,
    width,
  };
}

function hullPath(cx: number, cy: number, length: number, width: number): string {
  const bow = { x: cx, y: cy - length / 2 };
  const shoulderY = cy - length / 2 + length * 0.28;
  const sternY = cy + length / 2 - length * 0.08;
  const sternFlatY = cy + length / 2;
  return [
    `M${bow.x},${bow.y}`,
    `L${cx + width / 2},${shoulderY}`,
    `L${cx + width * 0.44},${sternY}`,
    `Q${cx},${sternFlatY + 6} ${cx - width * 0.44},${sternY}`,
    `L${cx - width / 2},${shoulderY}`,
    "Z",
  ].join(" ");
}

/**
 * Coque de voilier vue de profil (top-down), proue en pointe / poupe plate.
 * Cette asymétrie porte à elle seule l'information d'orientation — elle doit
 * rester lisible à n'importe quel angle de rotation. Ne dessine que la
 * coque ; compose avec Sail/Boom/WindIndicator pour un bateau complet.
 * Voir .claude/skills/nautical-pedagogical-visuals/SKILL.md.
 */
export function SailboatHull({
  cx,
  cy,
  length = 132,
  highlightBow = false,
  highlightStern = false,
}: {
  cx: number;
  cy: number;
  length?: number;
  highlightBow?: boolean;
  highlightStern?: boolean;
}) {
  const { width, bow, stern } = getHullGeometry(cx, cy, length);
  return (
    <g>
      <path d={hullPath(cx, cy, length, width)} fill="none" stroke={INK} strokeWidth={3.5} strokeLinejoin="round" />
      {(highlightBow || highlightStern) && (
        <>
          <circle cx={bow.x} cy={bow.y} r={highlightBow ? 7 : 4} fill={highlightBow ? ACCENT : INK} />
          <circle cx={stern.x} cy={stern.y} r={highlightStern ? 7 : 4} fill={highlightStern ? ACCENT : INK} />
        </>
      )}
    </g>
  );
}
