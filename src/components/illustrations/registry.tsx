import type { ComponentType } from "react";
import { BoatSide } from "./BoatSide";
import { HeelDiagram } from "./HeelDiagram";
import { WindApparentReal, PortStarboard, ForeAftBeam, TackDiagram } from "./WindDiagrams";
import { PointsOfSailWheel, QuizPointOfSailBeam, QuizPointOfSailBonPlein, QuizPointOfSailGrandLargue } from "./PointsOfSailWheel";
import { SailsOverview, MainsailParts, SheetHalyard, WinchDiagram, TillerWheel, TelltaleTrimDiagram } from "./GearDiagrams";
import { KnotFigureEight, KnotBowline, KnotHalfHitch, KnotRoundTurn, KnotCleat } from "./KnotDiagrams";
import { EmpannageBoomSweep, VirementGeometrie, PriseDeRisDiagram } from "./ManeuverDiagrams";
import { BuoyageLateralDiagram, CapRouteDiagram, MouillageDiagram, FeuxNavigationDiagram } from "./NavigationDiagrams";
import { MarnageCoefficientDiagram, DouziemesBarChart, CourantMareeDiagram } from "./TideDiagrams";

const registry: Record<string, ComponentType> = {
  "boat-parts": () => <BoatSide showLabels />,
  "heel-angle": HeelDiagram,
  "wind-apparent-real": WindApparentReal,
  "port-starboard": PortStarboard,
  "fore-aft-beam": ForeAftBeam,
  "tack-diagram": TackDiagram,
  "empannage-boom-sweep": EmpannageBoomSweep,
  "virement-geometrie": VirementGeometrie,
  "prise-de-ris": PriseDeRisDiagram,
  "buoyage-lateral": BuoyageLateralDiagram,
  "cap-route": CapRouteDiagram,
  "mouillage-schema": MouillageDiagram,
  "feux-navigation": FeuxNavigationDiagram,
  "marnage-coefficient": MarnageCoefficientDiagram,
  "regle-douziemes": DouziemesBarChart,
  "courant-maree": CourantMareeDiagram,
  "points-of-sail-wheel": PointsOfSailWheel,
  "sails-overview": SailsOverview,
  "mainsail-parts": MainsailParts,
  "sheet-halyard": SheetHalyard,
  "winch-diagram": WinchDiagram,
  "tiller-wheel": TillerWheel,
  "telltale-trim": TelltaleTrimDiagram,

  "quiz-point-of-sail-beam": QuizPointOfSailBeam,
  "quiz-point-of-sail-bon-plein": QuizPointOfSailBonPlein,
  "quiz-point-of-sail-grand-largue": QuizPointOfSailGrandLargue,
  "quiz-boat-part-boom": () => <BoatSide highlight="bome" />,
  "quiz-boat-part-mat": () => <BoatSide highlight="mat" />,
  "quiz-boat-part-coque": () => <BoatSide highlight="coque" />,
  "quiz-boat-part-pont": () => <BoatSide highlight="pont" />,
  "quiz-boat-part-cockpit": () => <BoatSide highlight="cockpit" />,

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
