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
  windTipY,
  windLength = 52,
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
  windTipY?: number;
  windLength?: number;
  windAngleDeg?: number;
  bowMarkerColor?: string | null;
}) {
  const hull = getHullGeometry(cx, cy, hullLength);
  const mastTop = { x: hull.mastBase.x, y: hull.mastBase.y - hullLength * 0.2 };
  const boomLen = hullLength * 0.52;
  const boomRad = (boomAngleDeg * Math.PI) / 180;
  const boomEnd = {
    x: hull.mastBase.x + boomSign * boomLen * Math.sin(boomRad),
    y: hull.mastBase.y + boomLen * Math.cos(boomRad),
  };

  // Le point de drisse (head) est pris au niveau du pied de mât plutôt
  // qu'en haut : en vue de dessus, c'est la distance mât-proue qui donne
  // au guindant du foc sa vraie longueur (le "haut" du mât n'ajoute rien
  // en projection). Léger décalage sous le vent pour éviter un guindant
  // parfaitement confondu avec l'axe central du bateau.
  const jibHead = { x: hull.mastBase.x + boomSign * hullLength * 0.04, y: hull.mastBase.y };
  const jibTack = { x: hull.bow.x, y: hull.bow.y + hullLength * 0.09 };
  const jibFootLength = hullLength * 0.55;
  const jibAngleDeg = boomAngleDeg * 0.85;

  return (
    <>
      {showWind && (
        <WindIndicator tipX={cx} tipY={windTipY ?? cy - hullLength * 0.54} length={windLength} angleDeg={windAngleDeg} />
      )}

      <g transform={`rotate(${headingDeg} ${cx} ${cy})`}>
        <SailboatHull cx={cx} cy={cy} length={hullLength} />

        {showJib && (
          <Jib head={jibHead} tack={jibTack} footLength={jibFootLength} angleDeg={jibAngleDeg} sign={boomSign} etat={jibEtat ?? mainsailEtat} />
        )}

        <line x1={mastTop.x} y1={mastTop.y} x2={hull.mastBase.x} y2={hull.mastBase.y} stroke="var(--color-ink)" strokeWidth={4} strokeLinecap="round" />
        <Sail mastTop={mastTop} mastBase={hull.mastBase} boomEnd={boomEnd} etat={mainsailEtat} />
        <Boom from={hull.mastBase} to={boomEnd} />

        {bowMarkerColor && <circle cx={hull.bow.x} cy={hull.bow.y} r={6} fill={bowMarkerColor} />}
      </g>
    </>
  );
}
