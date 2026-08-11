import { INK, type Point } from "./tokens";

/**
 * La bôme doit se lire comme une pièce rigide, pas comme un axe
 * géométrique abstrait : trait épais à bouts arrondis + un filet clair au
 * centre pour suggérer un spar cylindrique.
 */
export function Boom({ from, to }: { from: Point; to: Point }) {
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="white"
        strokeOpacity={0.35}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
}
