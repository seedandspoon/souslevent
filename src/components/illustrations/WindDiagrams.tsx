import { IllustrationFrame, Label, INK, BRAND, ACCENT, DANGER, SUCCESS } from "./shared";

const TOP_BOAT_D = "M200,55 L233,125 L226,195 Q200,212 174,195 L167,125 Z";

function ArrowDefs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <marker id={id} markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill={color} />
      </marker>
    </defs>
  );
}

export function WindApparentReal() {
  return (
    <IllustrationFrame label="Le vent apparent combine le vent réel et la vitesse du bateau" viewBox="0 0 400 260">
      <ArrowDefs id="arrow-real" color={BRAND} />
      <ArrowDefs id="arrow-app" color={ACCENT} />
      <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <line x1={200} y1={95} x2={200} y2={135} stroke={INK} strokeWidth={2} opacity={0.5} />

      {/* Vent réel : vient d'en haut */}
      <line x1={200} y1={15} x2={200} y2={48} stroke={BRAND} strokeWidth={4} markerEnd="url(#arrow-real)" />
      <Label x={200} y={12} fill={BRAND}>Vent réel</Label>

      {/* Vitesse bateau : vers le bas */}
      <line x1={280} y1={200} x2={280} y2={240} stroke={INK} strokeWidth={3} markerEnd="url(#arrow-real)" opacity={0.55} />
      <Label x={280} y={253} fill={INK} size={11}>Vitesse du bateau</Label>

      {/* Vent apparent : résultante diagonale */}
      <line x1={200} y1={15} x2={260} y2={70} stroke={ACCENT} strokeWidth={4} markerEnd="url(#arrow-app)" />
      <Label x={295} y={55} fill={ACCENT}>Vent apparent</Label>
    </IllustrationFrame>
  );
}

export function PortStarboard() {
  return (
    <IllustrationFrame label="Tribord à droite (vert), bâbord à gauche (rouge), vus vers l'avant" viewBox="0 0 400 260">
      <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M200,55 L233,125 L226,195 L200,203 Z" fill={SUCCESS} opacity={0.28} />
      <path d="M200,55 L167,125 L174,195 L200,203 Z" fill={DANGER} opacity={0.28} />
      <line x1={200} y1={55} x2={200} y2={205} stroke={INK} strokeWidth={1.5} strokeDasharray="3 4" opacity={0.4} />

      <circle cx={260} cy={125} r={6} fill={SUCCESS} />
      <Label x={280} y={130} anchor="start" fill={SUCCESS}>Tribord</Label>
      <circle cx={140} cy={125} r={6} fill={DANGER} />
      <Label x={120} y={130} anchor="end" fill={DANGER}>Bâbord</Label>

      <Label x={200} y={40} fill={INK} size={11} weight={500}>Vue vers l&apos;avant</Label>
    </IllustrationFrame>
  );
}

export function ForeAftBeam() {
  return (
    <IllustrationFrame label="Avant, arrière et travers autour du bateau" viewBox="0 0 400 260">
      <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <line x1={30} y1={125} x2={370} y2={125} stroke={BRAND} strokeWidth={1.5} strokeDasharray="4 5" opacity={0.5} />

      <Label x={200} y={35} fill={BRAND}>Avant</Label>
      <Label x={200} y={235} fill={BRAND}>Arrière</Label>
      <Label x={330} y={120} fill={ACCENT}>Travers tribord</Label>
      <Label x={70} y={120} fill={ACCENT}>Travers bâbord</Label>
    </IllustrationFrame>
  );
}

export function TackDiagram() {
  return (
    <IllustrationFrame label="Tribord amure : le vent vient du côté tribord" viewBox="0 0 400 260">
      <ArrowDefs id="arrow-tack" color={ACCENT} />
      <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M191,60 L191,190 L226,195 L233,125 Z" fill={BRAND} opacity={0.18} />

      <line x1={330} y1={70} x2={240} y2={110} stroke={ACCENT} strokeWidth={4} markerEnd="url(#arrow-tack)" />
      <Label x={345} y={62} fill={ACCENT} anchor="end">Vent</Label>

      <circle cx={260} cy={125} r={6} fill={ACCENT} />
      <Label x={200} y={240} fill={INK} weight={700}>Tribord amure</Label>
    </IllustrationFrame>
  );
}
