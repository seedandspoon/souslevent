import { BRAND, polar, type Point } from "./tokens";

/**
 * Flèche de vent — calculée en coordonnées polaires directement autour du
 * centre réel du bateau (`center`), jamais par rotation rigide de toute la
 * flèche autour d'un pivot distant : au-delà de ~90°, cette dernière
 * approche fait pointer la pointe à l'opposé du bateau (bug corrigé ici).
 * Seule la petite pointe de flèche (déjà positionnée à `head`) est
 * tournée sur elle-même pour s'orienter localement le long du fût.
 */
export function WindIndicator({
  center,
  angleDeg = 0,
  distance = 90,
  headGap = 24,
  label = true,
}: {
  center: Point;
  angleDeg?: number;
  distance?: number;
  headGap?: number;
  label?: boolean;
}) {
  const tail = polar(center, angleDeg, distance);
  const head = polar(center, angleDeg, headGap);
  // Le fût s'arrête un peu avant `head` pour laisser la place à la pointe.
  const shaftEnd = polar(center, angleDeg, headGap + 14);

  return (
    <g>
      <line x1={tail.x} y1={tail.y} x2={shaftEnd.x} y2={shaftEnd.y} stroke={BRAND} strokeWidth={4} strokeLinecap="round" />
      <path
        d={`M${head.x - 8},${head.y - 12} L${head.x + 8},${head.y - 12} L${head.x},${head.y + 4} Z`}
        fill={BRAND}
        transform={`rotate(${angleDeg} ${head.x} ${head.y})`}
      />
      {label && (
        <text
          x={tail.x}
          y={tail.y - 10}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fill={BRAND}
          fontFamily="var(--font-sans), sans-serif"
        >
          Vent
        </text>
      )}
    </g>
  );
}
