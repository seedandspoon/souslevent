import { IllustrationFrame, Label, INK, BRAND, ACCENT } from "./shared";

const CX = 200;
const CY = 145;
const R = 92;

function polar(angleDeg: number, radius = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.sin(rad), y: CY - radius * Math.cos(rad) };
}

const POINTS: { angle: number; label: string }[] = [
  { angle: 45, label: "Le près" },
  { angle: 60, label: "Bon plein" },
  { angle: 90, label: "Travers" },
  { angle: 120, label: "Largue" },
  { angle: 150, label: "Grand largue" },
  { angle: 180, label: "Vent arrière" },
];

function forbiddenWedge() {
  const a = polar(-40, R);
  const b = polar(40, R);
  return `M${CX},${CY} L${a.x},${a.y} A${R},${R} 0 0 1 ${b.x},${b.y} Z`;
}

export function PointsOfSailWheel() {
  return (
    <IllustrationFrame label="La rose des allures : l'angle entre le bateau et le vent" viewBox="0 0 400 290">
      <path d={forbiddenWedge()} fill={INK} opacity={0.08} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 5" opacity={0.5} />

      {POINTS.map((p) => {
        const pt = polar(p.angle);
        const labelPt = polar(p.angle, R + 26);
        return (
          <g key={p.angle}>
            <line x1={CX} y1={CY} x2={pt.x} y2={pt.y} stroke={ACCENT} strokeWidth={1} opacity={0.4} />
            <circle cx={pt.x} cy={pt.y} r={5} fill={ACCENT} />
            <Label
              x={labelPt.x}
              y={labelPt.y}
              anchor={p.angle < 90 ? "start" : p.angle > 90 ? "end" : "middle"}
              size={11.5}
            >
              {p.label}
            </Label>
          </g>
        );
      })}

      {/* Vent */}
      <line x1={CX} y1={12} x2={CX} y2={CY - R - 6} stroke={BRAND} strokeWidth={4} />
      <path d={`M${CX - 7},${CY - R - 6} L${CX + 7},${CY - R - 6} L${CX},${CY - R + 8} Z`} fill={BRAND} />
      <Label x={CX} y={26} fill={BRAND}>Vent</Label>

      {/* Petit bateau au centre, pointant face au vent */}
      <path d={`M${CX},${CY - 20} L${CX + 10},${CY + 14} L${CX},${CY + 6} L${CX - 10},${CY + 14} Z`} fill={INK} />
    </IllustrationFrame>
  );
}

export function QuizPointOfSailBeam() {
  const heading = 90; // Travers : cap perpendiculaire au vent
  return (
    <IllustrationFrame label="Un bateau et une flèche de vent : quelle allure ?" viewBox="0 0 400 290">
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 5" opacity={0.4} />

      {/* Vent, venant du haut */}
      <line x1={CX} y1={12} x2={CX} y2={CY - R - 6} stroke={BRAND} strokeWidth={4} />
      <path d={`M${CX - 7},${CY - R - 6} L${CX + 7},${CY - R - 6} L${CX},${CY - R + 8} Z`} fill={BRAND} />
      <Label x={CX} y={26} fill={BRAND}>Vent</Label>

      {/* Bateau orienté selon son cap */}
      <g transform={`rotate(${heading} ${CX} ${CY})`}>
        <path d={`M${CX},${CY - 26} L${CX + 14},${CY + 20} L${CX},${CY + 8} L${CX - 14},${CY + 20} Z`} fill={ACCENT} />
      </g>
    </IllustrationFrame>
  );
}
