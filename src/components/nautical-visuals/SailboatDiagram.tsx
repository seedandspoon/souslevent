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
  // Le mât est un point unique : vu de dessus, un mât vertical se projette
  // en un point, jamais en un segment (un trait faisait croire à une pièce
  // qui a une longueur propre, ce qui n'a pas de sens dans cette vue).
  // La bôme pivote directement à ce point.
  const mast = hull.mastBase;
  const boomPivot = mast;
  // Longueur de bôme mesurée pour atteindre franchement vers la poupe
  // (proportion réaliste : le mât est à ~32% de la coque depuis la proue,
  // la bôme doit couvrir la majeure partie du reste vers l'arrière, sinon
  // l'arrière de la coque reste vide et l'ensemble mât+bôme paraît mal
  // placé — trop proche de la proue).
  const boomLen = hullLength * 0.59;
  const boomRad = (boomAngleDeg * Math.PI) / 180;
  const boomEnd = {
    x: boomPivot.x + boomSign * boomLen * Math.sin(boomRad),
    y: boomPivot.y + boomLen * Math.cos(boomRad),
  };

  // Le foc suit la même grammaire que la grand-voile : un point fixe
  // (l'amure, à la proue) et un point mobile (l'écoute) — pas de point de
  // drisse représenté, il n'apportait pas d'information utile. Le point
  // d'écoute est calculé par rapport au mât plutôt qu'en pivotant depuis
  // l'amure : sinon il reste collé à la proue et le foc paraît réduit à
  // deux points d'attache, sans voile visible entre eux. Il se règle (t)
  // comme la bôme — plus la grand-voile est choquée, plus l'écoute du foc
  // part vers l'arrière et vers l'extérieur — mais reste toujours en-deçà
  // de la bôme pour que les deux voiles ne se superposent pas.
  const jibTack = { x: hull.bow.x, y: hull.bow.y + hullLength * 0.04 };
  const t = Math.min(1, Math.max(0, (boomAngleDeg - 10) / 68));
  const jibClew = {
    x: mast.x + boomSign * hullLength * (0.06 + 0.2 * t),
    y: mast.y + hullLength * (0.05 + 0.09 * t),
  };

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

        {showJib && <Jib tack={jibTack} clew={jibClew} sign={boomSign} etat={jibEtat ?? mainsailEtat} />}

        <Sail mast={mast} boomEnd={boomEnd} etat={mainsailEtat} sign={boomSign} />
        <Boom from={boomPivot} to={boomEnd} />
        <circle cx={mast.x} cy={mast.y} r={5} fill="var(--color-ink)" />

        {bowMarkerColor && <circle cx={hull.bow.x} cy={hull.bow.y} r={6} fill={bowMarkerColor} />}
      </g>
    </>
  );
}
