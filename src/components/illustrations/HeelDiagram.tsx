import { IllustrationFrame, Label, INK, BRAND, ACCENT } from "./shared";

export function HeelDiagram() {
  return (
    <IllustrationFrame label="Le bateau gîte : il s'incline sous l'effet du vent" viewBox="0 0 400 200">
      {/* Ligne d'eau */}
      <line x1={20} y1={165} x2={380} y2={165} stroke={BRAND} strokeWidth={2} strokeDasharray="4 4" opacity={0.5} />
      {/* Verticale de référence (pointillé) */}
      <line x1={200} y1={165} x2={200} y2={30} stroke={INK} strokeWidth={1.5} strokeDasharray="3 5" opacity={0.35} />

      <g transform="rotate(18 200 165)">
        {/* Coque simplifiée */}
        <path
          d="M140,160 L260,160 Q280,160 265,175 L135,175 Q120,160 140,160 Z"
          fill="none"
          stroke={INK}
          strokeWidth={3}
        />
        {/* Mât incliné */}
        <line x1={200} y1={160} x2={200} y2={40} stroke={INK} strokeWidth={4} strokeLinecap="round" />
        {/* Voile */}
        <path d="M201,45 L201,158 L250,158 Z" fill={ACCENT} opacity={0.35} />
      </g>

      {/* Arc d'angle */}
      <path d="M200,105 A60,60 0 0 1 217,48" fill="none" stroke={ACCENT} strokeWidth={2.5} />
      <Label x={228} y={70} fill={ACCENT} size={13}>Gîte</Label>
    </IllustrationFrame>
  );
}
