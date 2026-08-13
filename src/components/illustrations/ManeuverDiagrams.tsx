import { IllustrationFrame, Label, INK, BRAND, BRAND_SOFT, ACCENT, DANGER } from "./shared";

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
 * Vue de dessus : la bôme balaie d'un bord à l'autre au moment où le
 * bateau passe par le vent arrière. Le point qui doit se lire d'un coup
 * d'œil, sans texte : la zone couverte par ce balayage (le triangle
 * rouge) part du mât et couvre toute la largeur derrière le bateau — pas
 * seulement un trait fin d'un bord à l'autre.
 */
export function EmpannageBoomSweep() {
  return (
    <IllustrationFrame label="La bôme balaie toute la largeur arrière du bateau en empannant" viewBox="0 0 400 260">
      <ArrowDefs id="arrow-vent-arriere" color={BRAND} />
      <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />

      {/* Vent arrière : vient de la poupe, pousse vers la proue */}
      <line x1={200} y1={245} x2={200} y2={216} stroke={BRAND} strokeWidth={4} markerEnd="url(#arrow-vent-arriere)" />
      <Label x={200} y={258} fill={BRAND}>Vent arrière</Label>

      {/* Zone balayée par la bôme : triangle plein depuis le mât, bulge vers la poupe */}
      <path d="M200,103 L111,119 Q200,216 289,119 Z" fill={DANGER} opacity={0.22} />
      <path d="M200,103 L111,119 Q200,216 289,119 Z" fill="none" stroke={DANGER} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.7} />

      {/* Bôme avant l'empannage (bordée, en pointillé, presque effacée) */}
      <line x1={200} y1={103} x2={111} y2={119} stroke={BRAND_SOFT} strokeWidth={4} strokeLinecap="round" strokeDasharray="2 5" />
      <Label x={95} y={110} fill={BRAND_SOFT} size={11} anchor="end">Avant</Label>

      {/* Bôme après l'empannage (bordée de l'autre côté, trait plein) */}
      <line x1={200} y1={103} x2={289} y2={119} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <Label x={297} y={110} fill={INK} size={11} anchor="start">Après</Label>

      <circle cx={200} cy={103} r={4} fill={INK} />

      <Label x={200} y={145} fill={DANGER} weight={700}>Zone balayée</Label>
      <Label x={200} y={40} fill={ACCENT} size={11} weight={500}>Personne ne doit s&apos;y trouver</Label>
    </IllustrationFrame>
  );
}
