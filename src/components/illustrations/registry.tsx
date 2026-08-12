import type { ComponentType } from "react";
import { BoatSide } from "./BoatSide";
import { HeelDiagram } from "./HeelDiagram";
import { WindApparentReal, PortStarboard, ForeAftBeam, TackDiagram } from "./WindDiagrams";
import { PointsOfSailWheel, QuizPointOfSailBeam } from "./PointsOfSailWheel";
import { SailsOverview, MainsailParts, SheetHalyard, WinchDiagram, TillerWheel } from "./GearDiagrams";
import { KnotFigureEight, KnotBowline, KnotHalfHitch, KnotRoundTurn, KnotCleat } from "./KnotDiagrams";

const registry: Record<string, ComponentType> = {
  "boat-parts": () => <BoatSide showLabels />,
  "heel-angle": HeelDiagram,
  "wind-apparent-real": WindApparentReal,
  "port-starboard": PortStarboard,
  "fore-aft-beam": ForeAftBeam,
  "tack-diagram": TackDiagram,
  "points-of-sail-wheel": PointsOfSailWheel,
  "sails-overview": SailsOverview,
  "mainsail-parts": MainsailParts,
  "sheet-halyard": SheetHalyard,
  "winch-diagram": WinchDiagram,
  "tiller-wheel": TillerWheel,

  "quiz-point-of-sail-beam": QuizPointOfSailBeam,
  "quiz-boat-part-boom": () => <BoatSide highlight="bome" />,

  "knot-figure-eight": KnotFigureEight,
  "knot-bowline": KnotBowline,
  "knot-half-hitch": KnotHalfHitch,
  "knot-round-turn": KnotRoundTurn,
  "knot-cleat": KnotCleat,
};

export function Illustration({ id }: { id: string }) {
  const Component = registry[id];
  if (!Component) return null;
  return <Component />;
}
