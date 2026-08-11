import { BRAND } from "./tokens";

/**
 * Flèche de vent — TOUJOURS à dessiner hors du <g> qui fait tourner le
 * bateau (repère du monde), sinon elle perd son rôle de référence stable.
 * Une seule convention dans toute l'app : épaisse, longue, séparée du
 * bateau. `angleDeg` = direction vers laquelle souffle le vent, 0 = vers
 * le bas (convention "0 = vent du haut" utilisée dans les expériences).
 */
export function WindIndicator({
  tipX,
  tipY,
  angleDeg = 0,
  length = 60,
  label = true,
}: {
  tipX: number;
  tipY: number;
  angleDeg?: number;
  length?: number;
  label?: boolean;
}) {
  return (
    <g transform={`rotate(${angleDeg} ${tipX} ${tipY})`}>
      <line x1={tipX} y1={tipY - length} x2={tipX} y2={tipY - 12} stroke={BRAND} strokeWidth={4} />
      <path d={`M${tipX - 8},${tipY - 12} L${tipX + 8},${tipY - 12} L${tipX},${tipY + 4} Z`} fill={BRAND} />
      {label && (
        <text
          x={tipX}
          y={tipY - length - 6}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fill={BRAND}
          fontFamily="var(--font-sans), sans-serif"
          transform={`rotate(${-angleDeg} ${tipX} ${tipY - length - 6})`}
        >
          Vent
        </text>
      )}
    </g>
  );
}
