import { IllustrationFrame, INK, BRAND, ACCENT } from "./shared";

const ROPE = { stroke: BRAND, width: 9 };

export function KnotFigureEight() {
  return (
    <IllustrationFrame label="Nœud de huit : forme un arrêt en bout de cordage" viewBox="0 0 300 240">
      <path
        d="M150,20 L150,55 C210,55 210,110 150,110 C90,110 90,165 150,165 C210,165 210,110 150,110"
        fill="none"
        stroke={ROPE.stroke}
        strokeWidth={ROPE.width}
        strokeLinecap="round"
      />
      <path d="M150,165 C90,165 90,220 150,220" fill="none" stroke={ROPE.stroke} strokeWidth={ROPE.width} strokeLinecap="round" />
      {/* petite coupure pour lisibilité du croisement */}
      <path d="M150,108 C150,109 150,110 150,111" stroke="var(--color-brand-50)" strokeWidth={ROPE.width + 4} />
    </IllustrationFrame>
  );
}

export function KnotBowline() {
  return (
    <IllustrationFrame label="Nœud de chaise : une boucle fixe qui ne se resserre pas" viewBox="0 0 300 260">
      <line x1={150} y1={20} x2={150} y2={95} stroke={ROPE.stroke} strokeWidth={ROPE.width} strokeLinecap="round" />
      <circle cx={150} cy={165} r={62} fill="none" stroke={ROPE.stroke} strokeWidth={ROPE.width} />
      <path d="M113,120 C130,100 170,100 178,122" fill="none" stroke={ROPE.stroke} strokeWidth={ROPE.width} strokeLinecap="round" />
      <path d="M178,122 C184,135 175,148 160,146" fill="none" stroke={ACCENT} strokeWidth={ROPE.width} strokeLinecap="round" />
      <circle cx={150} cy={110} r={7} fill={INK} opacity={0.15} />
    </IllustrationFrame>
  );
}

function Post() {
  return <rect x={128} y={30} width={44} height={180} rx={22} fill={INK} opacity={0.1} stroke={INK} strokeWidth={2} />;
}

export function KnotHalfHitch() {
  return (
    <IllustrationFrame label="Demi-clé : une boucle simple avec un croisement" viewBox="0 0 300 240">
      <Post />
      <path
        d="M90,110 C90,80 210,80 210,110 C210,132 165,125 165,150 C165,175 220,168 220,190"
        fill="none"
        stroke={ROPE.stroke}
        strokeWidth={ROPE.width}
        strokeLinecap="round"
      />
      <path d="M162,122 C165,124 165,127 163,129" stroke="var(--color-brand-50)" strokeWidth={ROPE.width + 4} />
    </IllustrationFrame>
  );
}

export function KnotRoundTurn() {
  return (
    <IllustrationFrame label="Tour mort et deux demi-clés : tient bien tout en restant facile à défaire" viewBox="0 0 300 260">
      <Post />
      <ellipse cx={150} cy={95} rx={42} ry={16} fill="none" stroke={ROPE.stroke} strokeWidth={ROPE.width} />
      <ellipse cx={150} cy={120} rx={42} ry={16} fill="none" stroke={ROPE.stroke} strokeWidth={ROPE.width} />
      <path
        d="M108,120 C90,150 210,150 195,175 C185,192 205,198 215,210"
        fill="none"
        stroke={ACCENT}
        strokeWidth={ROPE.width}
        strokeLinecap="round"
      />
      <path
        d="M195,175 C185,192 165,185 160,205 C156,222 200,222 215,235"
        fill="none"
        stroke={ACCENT}
        strokeWidth={ROPE.width}
        strokeLinecap="round"
      />
    </IllustrationFrame>
  );
}

export function KnotCleat() {
  return (
    <IllustrationFrame label="Nœud de taquet : rapide à faire et à larguer" viewBox="0 0 320 200">
      <rect x={60} y={85} width={200} height={22} rx={11} fill={INK} opacity={0.12} stroke={INK} strokeWidth={2} />
      <path d="M85,85 L75,45 Q70,35 80,35 L100,35 Q110,35 105,45 Z" fill={INK} opacity={0.12} stroke={INK} strokeWidth={2} />
      <path d="M235,85 L225,45 Q220,35 230,35 L250,35 Q260,35 255,45 Z" fill={INK} opacity={0.12} stroke={INK} strokeWidth={2} />

      <path
        d="M60,150 L90,60 L200,140 L220,55 L110,150"
        fill="none"
        stroke={ROPE.stroke}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M110,150 C130,165 150,150 160,165" fill="none" stroke={ACCENT} strokeWidth={7} strokeLinecap="round" />
    </IllustrationFrame>
  );
}
