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

/**
 * Géométrie du virement : le bateau tourne d'un cap bordé serré d'un
 * côté à un cap bordé serré de l'autre, en passant par le lit du vent
 * (la zone à ±45° de l'axe du vent où aucune voile ne porte — même angle
 * que la zone interdite du simulateur interactif). Les deux coques sont
 * décalées côte à côte, chacune tournant autour de son propre centre,
 * pour rester lisibles séparément : "Avant" en pointillé clair à droite,
 * "Après" pleine à gauche, leurs étraves convergeant vers le sommet du
 * lit du vent, reliées par une flèche courbe qui montre le sens du
 * pivotement.
 */
export function VirementGeometrie() {
  const avantCentre = { x: 255, y: 210 };
  const apresCentre = { x: 145, y: 210 };
  return (
    <IllustrationFrame label="Le bateau tourne d'un cap bordé serré à l'autre en passant par le lit du vent" viewBox="0 0 400 300">
      <ArrowDefs id="arrow-vent-lit" color={BRAND} />
      <ArrowDefs id="arrow-pivot" color={ACCENT} />

      {/* Vent : arrive du haut, vers le bas */}
      <line x1={200} y1={16} x2={200} y2={52} stroke={BRAND} strokeWidth={4} markerEnd="url(#arrow-vent-lit)" />
      <Label x={200} y={10} fill={BRAND}>Vent</Label>

      {/* Lit du vent : secteur à ±45° de l'axe du vent, sommet au niveau des étraves */}
      <path d="M200,175 L108,83 A130,130 0 0 1 292,83 Z" fill={BRAND} opacity={0.15} />
      <path d="M200,175 L108,83 A130,130 0 0 1 292,83 Z" fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.6} />
      <Label x={200} y={115} fill={BRAND} weight={700}>Lit du vent</Label>

      {/* Coque avant le virement : pointillé clair, cap bordé serré à droite */}
      <g transform={`translate(${avantCentre.x},${avantCentre.y}) rotate(-45) scale(0.55) translate(-200,-133.5)`}>
        <path d={TOP_BOAT_D} fill="none" stroke={BRAND_SOFT} strokeWidth={4} strokeLinejoin="round" strokeDasharray="3 6" />
      </g>
      <Label x={avantCentre.x + 32} y={244} fill={BRAND_SOFT} size={11} anchor="start">Avant</Label>

      {/* Coque après le virement : trait plein, cap bordé serré à gauche */}
      <g transform={`translate(${apresCentre.x},${apresCentre.y}) rotate(45) scale(0.55) translate(-200,-133.5)`}>
        <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>
      <Label x={apresCentre.x - 32} y={244} fill={INK} size={11} anchor="end">Après</Label>

      {/* Flèche de pivotement : montre le sens du passage par le lit du vent, étrave à étrave */}
      <path d="M224,180 Q200,142 178,180" fill="none" stroke={ACCENT} strokeWidth={2.5} strokeDasharray="1 5" strokeLinecap="round" markerEnd="url(#arrow-pivot)" />
    </IllustrationFrame>
  );
}

function PriseDeRisPanel({ cx, ris }: { cx: number; ris: boolean }) {
  const headY = ris ? 112 : 40;
  const clewX = cx + (ris ? 55 : 72);
  return (
    <g>
      <line x1={cx} y1={190} x2={cx} y2={38} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={cx} y1={190} x2={cx + 76} y2={190} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path
        d={`M${cx},${headY} L${cx},190 L${clewX},190 Z`}
        fill={BRAND}
        opacity={0.16}
        stroke={INK}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {ris && (
        <>
          <circle cx={cx} cy={headY} r={3.5} fill={ACCENT} />
          {[cx + 14, cx + 30, cx + 46].map((tx) => (
            <g key={tx}>
              <line x1={tx} y1={190} x2={tx} y2={203} stroke={BRAND_SOFT} strokeWidth={2.5} strokeLinecap="round" />
              <circle cx={tx} cy={203} r={2} fill={BRAND_SOFT} />
            </g>
          ))}
        </>
      )}
    </g>
  );
}

/**
 * Un ris pris : la grand-voile est plus courte (nouveau point de ris,
 * plus bas sur le guindant, accroché près du mât) et l'excédent de tissu
 * est replié et attaché le long de la bôme par les garcettes — pas
 * roulé en boule ni coupé. Le mât et la bôme restent à la même position
 * dans les deux panneaux pour que la réduction de voilure se voie par
 * comparaison directe.
 */
export function PriseDeRisDiagram() {
  return (
    <IllustrationFrame
      label="Un ris pris : la voile est plus courte, l'excédent replié et attaché le long de la bôme par les garcettes"
      viewBox="0 0 400 250"
    >
      <PriseDeRisPanel cx={60} ris={false} />
      <Label x={98} y={220} fill={INK} size={12} weight={700}>Avant</Label>

      <PriseDeRisPanel cx={260} ris />
      <Label x={278} y={100} fill={ACCENT} size={10} weight={600} anchor="start">Point de ris</Label>
      <Label x={278} y={220} fill={INK} size={12} weight={700}>1 ris pris</Label>
      <Label x={290} y={236} fill={BRAND_SOFT} size={9} weight={500} anchor="middle">excédent attaché</Label>
    </IllustrationFrame>
  );
}
