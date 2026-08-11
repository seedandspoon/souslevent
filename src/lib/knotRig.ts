// Rig de cordage continu pour le prototype de nœud animé.
//
// Principe : le cordage (courant) est UN SEUL path, construit à partir de
// 7 segments cubiques nommés (a..g) + un segment final droit, dans un
// ordre fixe qui ne change jamais. Chaque segment a une forme finale
// (sa position une fois "noué") et un "revealStep" : le pas à partir
// duquel il prend sa forme finale. Avant ce pas, il est réduit à un
// point (longueur nulle) posé à l'endroit où s'arrête le dernier segment
// déjà formé — le cordage a alors juste l'air "pas encore façonné" à cet
// endroit, plutôt que de disparaître ou de sauter.
//
// Comme la structure de commandes (7 x C, puis 1 x L) est identique à
// chaque pas, on peut interpoler (lerp) directement les coordonnées
// entre deux pas consécutifs pour obtenir un vrai mouvement continu —
// à la fois pour le défilement manuel (scrub) et pour la lecture
// automatique. C'est ce qui distingue cette approche de la version
// précédente (segments indépendants qui apparaissaient un par un).

export interface Pt {
  x: number;
  y: number;
}

interface Segment {
  c1: Pt;
  c2: Pt;
  end: Pt;
}

const SEGMENT_ORDER = ["a", "b", "c", "d", "e", "f", "g"] as const;
type SegmentKey = (typeof SEGMENT_ORDER)[number];

const START: Pt = { x: 150, y: 140 };

// Forme finale (nœud serré) de chaque segment. Chaque étage occupe une
// bande verticale distincte pour rester lisible : la boucle (a,b) pend
// nettement sous le dormant, le passage dans la boucle (c,d) remonte
// juste au-dessus du dormant, le tour du dormant (e,f) chevauche
// délibérément sa pointe basse (c'est la démonstration dessus/dessous),
// et le retour (g) traverse à nouveau la boucle vers le bas — ce
// chevauchement-là est normal, un vrai nœud de chaise passe deux fois
// par la même boucle.
const FINAL: Record<SegmentKey, Segment> = {
  a: { c1: { x: 195, y: 150 }, c2: { x: 195, y: 205 }, end: { x: 150, y: 195 } }, // boucle, bord droit
  b: { c1: { x: 105, y: 205 }, c2: { x: 105, y: 150 }, end: { x: 150, y: 145 } }, // boucle, bord gauche (ferme la boucle)
  c: { c1: { x: 150, y: 155 }, c2: { x: 150, y: 170 }, end: { x: 150, y: 185 } }, // petit pont, entre dans la boucle
  d: { c1: { x: 175, y: 175 }, c2: { x: 175, y: 120 }, end: { x: 150, y: 100 } }, // remonte à travers la boucle, dépasse le dormant
  e: { c1: { x: 180, y: 88 }, c2: { x: 180, y: 55 }, end: { x: 150, y: 45 } }, // tour du dormant, lobe droit — chevauche le dormant
  f: { c1: { x: 120, y: 55 }, c2: { x: 120, y: 88 }, end: { x: 150, y: 105 } }, // tour du dormant, lobe gauche — referme le tour
  g: { c1: { x: 125, y: 130 }, c2: { x: 125, y: 190 }, end: { x: 150, y: 210 } }, // redescend à travers la boucle
};

// Pas (0-indexé) à partir duquel chaque segment prend sa forme finale.
const REVEAL_STEP: Record<SegmentKey, number> = { a: 1, b: 1, c: 2, d: 2, e: 3, f: 3, g: 4 };

// Position y du bout libre (queue droite finale) selon le pas courant —
// avant que "g" soit formé, la queue pend juste après le dernier segment
// façonné ; à partir du pas 4, elle prend sa longueur de repos définitive.
const TAIL_Y_AT_STEP = [380, 300, 130, 135, 270, 270];

export interface RopeFrame {
  segments: Record<SegmentKey, Segment>;
  tail: Pt;
}

function lerpPt(a: Pt, b: Pt, t: number): Pt {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function lerpSegment(a: Segment, b: Segment, t: number): Segment {
  return { c1: lerpPt(a.c1, b.c1, t), c2: lerpPt(a.c2, b.c2, t), end: lerpPt(a.end, b.end, t) };
}

/** Construit l'état exact du cordage à un pas entier (0..5). */
export function frameAtStep(step: number): RopeFrame {
  let tip = START;
  const segments = {} as Record<SegmentKey, Segment>;
  for (const key of SEGMENT_ORDER) {
    if (REVEAL_STEP[key] <= step) {
      segments[key] = FINAL[key];
      tip = FINAL[key].end;
    } else {
      segments[key] = { c1: tip, c2: tip, end: tip };
    }
  }
  const tailY = TAIL_Y_AT_STEP[Math.min(step, TAIL_Y_AT_STEP.length - 1)];
  return { segments, tail: { x: 150, y: tailY } };
}

/** Interpole en continu entre deux pas — alimente le scrub ET la lecture auto. */
export function frameAtProgress(progress: number, totalSteps: number): RopeFrame {
  const clamped = Math.max(0, Math.min(totalSteps - 1, progress));
  const lower = Math.floor(clamped);
  const upper = Math.min(totalSteps - 1, lower + 1);
  const t = clamped - lower;
  if (t === 0 || lower === upper) return frameAtStep(lower);

  const fLower = frameAtStep(lower);
  const fUpper = frameAtStep(upper);
  const segments = {} as Record<SegmentKey, Segment>;
  for (const key of SEGMENT_ORDER) {
    segments[key] = lerpSegment(fLower.segments[key], fUpper.segments[key], t);
  }
  return { segments, tail: lerpPt(fLower.tail, fUpper.tail, t) };
}

export function framePath(frame: RopeFrame): string {
  const parts = SEGMENT_ORDER.map((key) => {
    const s = frame.segments[key];
    return `C${s.c1.x},${s.c1.y} ${s.c2.x},${s.c2.y} ${s.end.x},${s.end.y}`;
  });
  return `M${START.x},${START.y} ${parts.join(" ")} L${frame.tail.x},${frame.tail.y}`;
}

export function frameTip(frame: RopeFrame): Pt {
  return frame.tail;
}

export const TOTAL_STEPS = TAIL_Y_AT_STEP.length; // 6 pas (0..5)
