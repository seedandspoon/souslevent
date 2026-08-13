import { getHullGeometry } from "./SailboatHull";
import { SailboatHull } from "./SailboatHull";
import { WindIndicator } from "./WindIndicator";
import { Sail, type EtatVoile } from "./Sail";
import { Jib } from "./Jib";
import { Boom } from "./Boom";
import { MovementTrail } from "./MovementTrail";

/**
 * Le voilier de référence de l'application — coque, grand-voile ET
 * génois par défaut (voir SKILL.md, règle "le voilier de référence porte
 * deux voiles" ; le génois est la voile d'avant par défaut, plus grande
 * et plus courante que le foc — voir le glossaire pour la distinction).
 * Point d'entrée pour toute nouvelle expérience avec un bateau : compose
 * ce composant plutôt que réassembler les primitives à la main.
 *
 * Ni mât ni bôme dessinés séparément : seules les deux surfaces de voile
 * sont visibles. Leur propre bord (mât→bôme pour la GV, amure→écoute pour
 * le génois) porte déjà l'information d'orientation (tribord/bâbord,
 * bordé/choqué), et leur gonflement porte l'information de portance — un
 * spar ou un point en plus n'ajoutait rien à retenir.
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
  jibOppositeAmount = 0,
  jibSignOverride,
  showBoom = false,
  boomTrailVisible = false,
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
  /**
   * 0 = génois du même côté que la bôme (cas général). 1 = génois "en
   * ciseaux" du côté opposé (papillon/goose-wing, vent arrière) — le vent
   * poussant de face, écarter les deux voiles capte le vent symétriquement
   * plutôt que de laisser le génois masqué derrière la grand-voile.
   * Valeurs intermédiaires pour une transition continue plutôt qu'un
   * basculement brutal quand on approche le vent arrière.
   */
  jibOppositeAmount?: number;
  /**
   * Découple le côté du génois de `boomSign` : le génois suit sa propre
   * consigne au lieu de basculer automatiquement avec la bôme. Sert à
   * représenter un génois resté à contre le temps que l'équipier change
   * l'écoute pendant un virement — la grand-voile croise avec le cap, le
   * génois attend un geste explicite. Omettre pour le comportement par
   * défaut (génois lié à la bôme).
   */
  jibSignOverride?: 1 | -1;
  /**
   * Dessine la bôme comme un spar physique séparé (voir Boom.tsx). Reste
   * caché par défaut (le voilier de référence ne montre que les surfaces
   * de voile, voir SKILL.md) — à activer volontairement pour une
   * expérience qui isole la bôme comme objet d'étude (ex. l'empannage,
   * où sa course d'un bord à l'autre est le risque à comprendre).
   */
  showBoom?: boolean;
  /**
   * Arc de balayage transitoire (accent, s'efface) entre les deux
   * positions extrêmes de la bôme de part et d'autre de l'axe — signale
   * ponctuellement qu'elle vient de traverser (empannage). À repasser à
   * false peu après l'avoir affiché, jamais laissé permanent (voir
   * MovementTrail.tsx).
   */
  boomTrailVisible?: boolean;
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

  // Le génois suit la même grammaire que la grand-voile : un point fixe
  // (l'amure, à la proue) et un point mobile (l'écoute) — pas de point de
  // drisse représenté, il n'apportait pas d'information utile. Les deux
  // voiles étant généralement bordées au même angle l'une que l'autre,
  // l'écoute pivote depuis l'amure au MÊME angle que la bôme (boomRad) :
  // le bord amure→écoute du génois reste ainsi parallèle au bord mât→bôme
  // de la grand-voile à tout instant, au lieu de dériver indépendamment.
  //
  // Exception volontaire : à l'approche du vent arrière (jibOppositeAmount
  // > 0), le génois bascule progressivement du côté opposé à la bôme — la
  // configuration "en ciseaux" réelle en navigation. `jibSign` passe donc
  // en continu de `boomSign` (même côté) à `-boomSign` (côté opposé), avec
  // un point médian où le génois se retrouve carré dans l'axe.
  const t = Math.min(1, Math.max(0, (boomAngleDeg - 10) / 68));
  const jibSign = jibSignOverride ?? boomSign * (1 - 2 * jibOppositeAmount);
  const jibTack = { x: hull.bow.x, y: hull.bow.y + hullLength * 0.04 };
  const jibLen = hullLength * (0.32 + 0.18 * t);
  const jibClew = {
    x: jibTack.x + jibSign * jibLen * Math.sin(boomRad),
    y: jibTack.y + jibLen * Math.cos(boomRad),
  };

  // Trajectoire de la bôme d'un bord à l'autre, pour le sweep transitoire
  // (empannage) : les deux positions extrêmes sont symétriques par rapport
  // au mât, à la même distance (boomLen) — un arc qui bombe vers la poupe
  // (là où la bôme balaie réellement) suffit, pas besoin de connaître son
  // angle exact avant le passage.
  const boomTrailPath = `M${boomPivot.x + boomLen * Math.sin(boomRad)},${boomEnd.y} Q${boomPivot.x},${boomPivot.y + boomLen * 1.15} ${boomPivot.x - boomLen * Math.sin(boomRad)},${boomEnd.y}`;

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

        {showJib && <Jib tack={jibTack} clew={jibClew} sign={jibSign} etat={jibEtat ?? mainsailEtat} />}

        {showBoom && <Boom from={boomPivot} to={boomEnd} />}
        <Sail mast={mast} boomEnd={boomEnd} etat={mainsailEtat} sign={boomSign} />
        {showBoom && <MovementTrail path={boomTrailPath} visible={boomTrailVisible} />}

        {bowMarkerColor && <circle cx={hull.bow.x} cy={hull.bow.y} r={6} fill={bowMarkerColor} />}
      </g>
    </>
  );
}
