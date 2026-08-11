// Couleurs réglementaires réelles (balisage IALA région A), pas de couleurs
// arbitraires — voir SKILL.md section "Cartes, balisage, situations multi-bateaux".
const YELLOW = "#F2C438";
const BLACK = "#1A1A1A";
const RED = "#D9342B";
const GREEN = "#1E8F5F";

export type MarkerType = "cardinale-nord" | "cardinale-sud" | "laterale-babord" | "laterale-tribord" | "danger-isole";

function TrianglesCardinales({ x, y, orientation }: { x: number; y: number; orientation: "haut" | "bas" | "opposees" }) {
  const up = `M${x - 8},${y + 8} L${x},${y - 8} L${x + 8},${y + 8} Z`;
  const down = `M${x - 8},${y - 8} L${x},${y + 8} L${x + 8},${y - 8} Z`;
  if (orientation === "haut") return <path d={up} fill={BLACK} />;
  if (orientation === "bas") return <path d={down} fill={BLACK} />;
  return (
    <>
      <path d={up} fill={BLACK} />
      <path d={down} fill={BLACK} transform={`translate(0, 20)`} />
    </>
  );
}

/** Marque de balisage — forme et couleur suivent la convention réglementaire réelle. */
export function NavigationMarker({ type, x, y }: { type: MarkerType; x: number; y: number }) {
  switch (type) {
    case "laterale-babord":
      return <rect x={x - 10} y={y - 24} width={20} height={48} rx={3} fill={RED} />;
    case "laterale-tribord":
      return <path d={`M${x},${y - 24} L${x + 12},${y + 24} L${x - 12},${y + 24} Z`} fill={GREEN} />;
    case "cardinale-nord":
      return (
        <g>
          <rect x={x - 9} y={y - 24} width={18} height={48} fill={YELLOW} stroke={BLACK} strokeWidth={1} />
          <TrianglesCardinales x={x} y={y - 22} orientation="haut" />
        </g>
      );
    case "cardinale-sud":
      return (
        <g>
          <rect x={x - 9} y={y - 24} width={18} height={48} fill={YELLOW} stroke={BLACK} strokeWidth={1} />
          <TrianglesCardinales x={x} y={y + 6} orientation="bas" />
        </g>
      );
    case "danger-isole":
      return (
        <g>
          <rect x={x - 9} y={y - 24} width={18} height={48} fill={BLACK} />
          <rect x={x - 9} y={y - 24} width={18} height={12} fill={RED} />
          <circle cx={x} cy={y - 30} r={4} fill={BLACK} />
          <circle cx={x} cy={y - 38} r={4} fill={BLACK} />
        </g>
      );
  }
}
