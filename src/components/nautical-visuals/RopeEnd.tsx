import { ACCENT, type Point } from "./tokens";

/** Embout arrondi marquant le bout libre (courant) d'un cordage. */
export function RopeEnd({ at, visible = true }: { at: Point; visible?: boolean }) {
  if (!visible) return null;
  return <circle cx={at.x} cy={at.y} r={5} fill={ACCENT} />;
}
