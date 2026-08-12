import { getHullGeometry } from "./SailboatHull";
import { SailboatHull } from "./SailboatHull";
import { WindIndicator } from "./WindIndicator";
import { Sail, type EtatVoile } from "./Sail";
import { Jib } from "./Jib";
import { Boom } from "./Boom";

/**
 * Le voilier de référence de l'application — coque, mât, bôme,
 * grand-voile ET foc/génois par défaut (voir SKILL.md, règle "le voilier
 * de référence porte deux voiles"). Point d'entrée pour toute nouvelle
 * expérience avec un bateau : compose ce composant plutôt que
 * réassembler les primitives à la main.
 *
 * Tout est piloté par props pour rester réutilisable par les futures
 * expériences (virement, empannage, priorités...) : cap, angle de bôme,
 * côté sous le vent, état de chaque voile, angle/position du vent.
 */
export function SailboatDiagram({
  cx,
  cy,
  hullLength = 130,
  headingDeg,
  boomAngleDeg,
  boomSign,
  mainsailEtat,
  jibEtat,
  showJib = true,
  showWind = true,
  windDistance,
  windAngleDeg = 0,
  bowMarkerColor = null,
}: {
  cx: number;
  cy: number;
  hullLength?: number;
  headingDeg: number;
  boomAngleDeg: number;
  boomSign: 1 | -1;
  mainsailEtat: EtatVoile;
  jibEtat?: EtatVoile;
  showJib?: boolean;
  showWind?: boolean;
  windDistance?: number;
  windAngleDeg?: number;
  bowMarkerColor?: string | null;
}) {
  const hull = getHullGeometry(cx, cy, hullLength);
  const mastTop = { x: hull.mastBase.x, y: hull.mastBase.y - hullLength * 0.2 };
  // Le point de vit-de-mulet (pivot de la bôme) est décalé du mât d'un
  // petit écart fixe : le mât et la bôme sont dessinés dans la même
  // couleur (structure fixe), donc sans cet écart, une bôme presque
  // bordée (petit angle) se confond visuellement avec le mât — même si
  // l'angle est correct, la bôme cesse d'être identifiable comme une
  // pièce à part. L'écart reste lisible à n'importe quel angle de bôme.
  const boomPivot = { x: hull.mastBase.x + boomSign * hullLength * 0.05, y: hull.mastBase.y };
  // Longueur de bôme mesurée pour rester dans des proportions crédibles :
  // trop longue, elle dépasse largement le maître-bau même à angle modéré
  // et se lit comme disproportionnée par rapport à la coque.
  const boomLen = hullLength * 0.42;
  const boomRad = (boomAngleDeg * Math.PI) / 180;
  const boomEnd = {
    x: boomPivot.x + boomSign * boomLen * Math.sin(boomRad),
    y: boomPivot.y + boomLen * Math.cos(boomRad),
  };

  // Le foc reste toujours devant le mât, jamais dans la zone de la
  // grand-voile/bôme : point de drisse (head) proche du haut du mât plutôt
  // que du pied, guindant court et angle d'écoute freiné par rapport à la
  // bôme, pour que l'écoute (clew) ne balaie jamais aussi loin en arrière
  // que le point de vit-de-mulet — sinon les deux voiles se superposent
  // visuellement quel que soit l'angle (bug corrigé ici).
  const jibHead = { x: mastTop.x + boomSign * hullLength * 0.02, y: mastTop.y + hullLength * 0.06 };
  const jibTack = { x: hull.bow.x, y: hull.bow.y + hullLength * 0.12 };
  const jibFootLength = hullLength * 0.34;
  const jibAngleDeg = boomAngleDeg * 0.6;

  // Distance de la queue de la flèche au centre du bateau — assez loin
  // pour rester hors de la coque à n'importe quel angle de vent, voir
  // WindIndicator.tsx (calcul polaire autour de `center`, plus de pivot
  // distant fixe).
  const windTailDistance = windDistance ?? hullLength * 0.94;
  const windHeadGap = hullLength * 0.54;

  return (
    <>
      {showWind && (
        <WindIndicator center={{ x: cx, y: cy }} distance={windTailDistance} headGap={windHeadGap} angleDeg={windAngleDeg} />
      )}

      <g transform={`rotate(${headingDeg} ${cx} ${cy})`}>
        <SailboatHull cx={cx} cy={cy} length={hullLength} />

        {showJib && (
          <Jib head={jibHead} tack={jibTack} footLength={jibFootLength} angleDeg={jibAngleDeg} sign={boomSign} etat={jibEtat ?? mainsailEtat} />
        )}

        <line x1={mastTop.x} y1={mastTop.y} x2={hull.mastBase.x} y2={hull.mastBase.y} stroke="var(--color-ink)" strokeWidth={4} strokeLinecap="round" />
        <Sail mastTop={mastTop} mastBase={boomPivot} boomEnd={boomEnd} etat={mainsailEtat} sign={boomSign} />
        <Boom from={boomPivot} to={boomEnd} />

        {bowMarkerColor && <circle cx={hull.bow.x} cy={hull.bow.y} r={6} fill={bowMarkerColor} />}
      </g>
    </>
  );
}
