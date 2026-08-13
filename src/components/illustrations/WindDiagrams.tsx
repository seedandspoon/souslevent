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

/**
 * Triangle des vitesses, pointe à queue : vent réel (O→P1) puis vent créé
 * par la vitesse du bateau (P1→P2, toujours dans l'axe du bateau — avancer
 * crée un vent contraire équivalent, quel que soit le vent réel) ; la
 * résultante vent apparent (O→P2) est ce que ressent réellement
 * l'équipage. Le bateau est décalé vers le bas (translate) sans toucher
 * TOP_BOAT_D, réutilisé tel quel par les autres schémas de ce fichier.
 */
export function WindApparentReal() {
  // Construction par parallélogramme plutôt que pointe-à-queue : les trois
  // vecteurs partagent leur origine O, chacun garde une pointe de flèche
  // bien à lui (jamais deux pointes au même endroit) — plus lisible qu'un
  // enchaînement où la pointe du vent vitesse et celle du vent apparent se
  // superposent exactement au même point.
  const O = { x: 290, y: 18 };
  const reel = { dx: -100, dy: 60 };
  const vitesse = { dx: 0, dy: 130 };
  const A = { x: O.x + reel.dx, y: O.y + reel.dy };
  const B = { x: O.x + vitesse.dx, y: O.y + vitesse.dy };
  const C = { x: O.x + reel.dx + vitesse.dx, y: O.y + reel.dy + vitesse.dy };

  return (
    <IllustrationFrame label="Le vent apparent combine le vent réel et le vent créé par la vitesse du bateau" viewBox="0 0 400 460">
      <ArrowDefs id="arrow-real" color={BRAND} />
      <ArrowDefs id="arrow-speed" color={INK} />
      <ArrowDefs id="arrow-app" color={ACCENT} />

      <g transform="translate(0, 230)">
        <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      </g>

      {/* Vent réel : le vent qu'on ressentirait à l'arrêt */}
      <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} stroke={BRAND} strokeWidth={4} markerEnd="url(#arrow-real)" />
      <Label x={A.x - 8} y={A.y - 10} fill={BRAND} anchor="end">Vent réel</Label>

      {/* Vent vitesse : le vent créé par le déplacement, toujours dans l'axe du bateau (ici vertical) */}
      <line x1={O.x} y1={O.y} x2={B.x} y2={B.y} stroke={INK} strokeWidth={3.5} markerEnd="url(#arrow-speed)" opacity={0.6} />
      <Label x={B.x + 10} y={B.y + 4} fill={INK} size={11} anchor="start" weight={500}>Vent vitesse</Label>

      {/* Vent apparent : résultante des deux, ce que ressent réellement l'équipage */}
      <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} stroke={ACCENT} strokeWidth={4} markerEnd="url(#arrow-app)" />
      <Label x={C.x - 12} y={C.y + 6} fill={ACCENT} anchor="end">Vent apparent</Label>
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
