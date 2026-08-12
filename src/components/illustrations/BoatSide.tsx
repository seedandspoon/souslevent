import { IllustrationFrame, Label, INK, BRAND, BRAND_SOFT, ACCENT } from "./shared";

const HULL_D = "M50,120 L340,120 Q368,120 368,133 Q368,150 320,172 L95,172 Q52,168 46,145 Z";

type PartId = "proue" | "poupe" | "coque" | "pont" | "mat" | "bome" | "cockpit";

export function BoatSide({
  highlight,
  showLabels = false,
}: {
  highlight?: PartId;
  showLabels?: boolean;
}) {
  const is = (p: PartId) => highlight === p;
  const fill = (p: PartId) => (is(p) ? ACCENT : "none");
  const stroke = (p: PartId) => (highlight && !is(p) ? BRAND_SOFT : INK);

  return (
    <IllustrationFrame label="Schéma d'un voilier vu de profil, avec ses parties principales">
      {/* Coque */}
      <path d={HULL_D} fill={fill("coque")} stroke={stroke("coque")} strokeWidth={3} strokeLinejoin="round" />
      {/* Pont (ligne du haut de la coque) */}
      <line x1={50} y1={120} x2={340} y2={120} stroke={is("pont") ? ACCENT : "transparent"} strokeWidth={6} />
      {/* Mât — à ~32% de la longueur depuis la proue (à gauche), proportion réaliste
          d'un sloop. Auparavant plus proche du centre, ce qui laissait trop peu de
          place devant pour le génois. */}
      <line x1={155} y1={20} x2={155} y2={125} stroke={stroke("mat")} strokeWidth={is("mat") ? 6 : 4} strokeLinecap="round" />
      {/* Bôme — part du mât vers la poupe (à droite), jamais vers la proue. */}
      <line x1={155} y1={128} x2={245} y2={128} stroke={stroke("bome")} strokeWidth={is("bome") ? 7 : 5} strokeLinecap="round" />
      {/* Grand-voile : derrière le mât, le long de la bôme (silhouette légère) */}
      <path d="M155,25 L155,126 L245,126 Z" fill={BRAND} opacity={0.12} />
      {/* Génois : devant le mât, vers la proue — jamais du même côté que la bôme */}
      <path d="M155,40 L155,120 L65,120 Z" fill={BRAND} opacity={0.08} />
      {/* Cockpit — à l'arrière, entre la bôme et la poupe */}
      <rect
        x={255}
        y={108}
        width={70}
        height={16}
        rx={8}
        fill={is("cockpit") ? ACCENT : "none"}
        stroke={stroke("cockpit")}
        strokeWidth={2.5}
      />

      {/* Marqueurs proue / poupe — la proue est à gauche, du même côté que le mât
          et le génois ; la poupe est à droite, du même côté que le cockpit. */}
      <circle cx={52} cy={140} r={is("proue") ? 7 : 5} fill={is("proue") ? ACCENT : BRAND} />
      <circle cx={362} cy={140} r={is("poupe") ? 7 : 5} fill={is("poupe") ? ACCENT : BRAND} />

      {showLabels && (
        <>
          <Label x={46} y={200} anchor="start">Proue</Label>
          <Label x={368} y={200} anchor="end">Poupe</Label>
          <Label x={155} y={14}>Mât</Label>
          <Label x={200} y={145}>Bôme</Label>
          <Label x={290} y={100}>Cockpit</Label>
          <Label x={200} y={188}>Coque</Label>
          <Label x={100} y={108}>Pont</Label>
        </>
      )}
    </IllustrationFrame>
  );
}
