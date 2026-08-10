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
      {/* Mât */}
      <line x1={190} y1={20} x2={190} y2={125} stroke={stroke("mat")} strokeWidth={is("mat") ? 6 : 4} strokeLinecap="round" />
      {/* Bôme */}
      <line x1={190} y1={128} x2={275} y2={128} stroke={stroke("bome")} strokeWidth={is("bome") ? 7 : 5} strokeLinecap="round" />
      {/* Grand-voile (silhouette légère) */}
      <path d="M191,25 L191,126 L272,126 Z" fill={BRAND} opacity={0.12} />
      {/* Foc (silhouette légère) */}
      <path d="M188,32 L188,138 L355,138 Z" fill={BRAND} opacity={0.08} />
      {/* Cockpit */}
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

      {/* Marqueurs proue / poupe */}
      <circle cx={362} cy={140} r={is("proue") ? 7 : 5} fill={is("proue") ? ACCENT : BRAND} />
      <circle cx={52} cy={140} r={is("poupe") ? 7 : 5} fill={is("poupe") ? ACCENT : BRAND} />

      {showLabels && (
        <>
          <Label x={368} y={200} anchor="end">Proue</Label>
          <Label x={46} y={200} anchor="start">Poupe</Label>
          <Label x={190} y={14}>Mât</Label>
          <Label x={232} y={145}>Bôme</Label>
          <Label x={290} y={100}>Cockpit</Label>
          <Label x={200} y={188}>Coque</Label>
          <Label x={150} y={108}>Pont</Label>
        </>
      )}
    </IllustrationFrame>
  );
}
