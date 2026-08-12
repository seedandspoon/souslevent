"use client";

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import clsx from "clsx";
import { Label, INK, BRAND, ACCENT } from "./shared";

const CX = 200;
const CY = 150;
const R = 92;
const VIEW_W = 400;
const VIEW_H = 300;

interface AllureBand {
  id: string;
  label: string;
  min: number;
  max: number;
  interdite?: boolean;
}

// Bandes en degrés, mesurées comme l'angle absolu entre le cap du bateau et l'axe du vent
// (0° = face au vent, 180° = vent arrière). Approximations pédagogiques, pas des seuils de régate.
const BANDS: AllureBand[] = [
  { id: "face-au-vent", label: "Face au vent", min: 0, max: 30, interdite: true },
  { id: "pres", label: "Au près", min: 30, max: 50 },
  { id: "bon-plein", label: "Bon plein", min: 50, max: 80 },
  { id: "travers", label: "Au travers", min: 80, max: 100 },
  { id: "largue", label: "Largue", min: 100, max: 135 },
  { id: "grand-largue", label: "Grand largue", min: 135, max: 160 },
  { id: "vent-arriere", label: "Vent arrière", min: 160, max: 180.01 },
];

function bandFor(absAngle: number): AllureBand {
  return BANDS.find((b) => absAngle >= b.min && absAngle < b.max) ?? BANDS[BANDS.length - 1];
}

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.sin(rad), y: CY - radius * Math.cos(rad) };
}

function forbiddenWedgePath() {
  const a = polar(-30, R);
  const b = polar(30, R);
  return `M${CX},${CY} L${a.x},${a.y} A${R},${R} 0 0 1 ${b.x},${b.y} Z`;
}

const DISCOVERABLE = BANDS.filter((b) => !b.interdite);

export function WindSimulator() {
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);
  const [heading, setHeading] = useState(110);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());

  const absAngle = Math.abs(heading);
  const band = bandFor(absAngle);
  const amure = heading > 3 ? "Bâbord amure" : heading < -3 ? "Tribord amure" : null;

  const updateFromPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((clientX - rect.left) / rect.width) * VIEW_W;
    const y = ((clientY - rect.top) / rect.height) * VIEW_H;
    const dx = x - CX;
    const dy = y - CY;
    const deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
    setHeading(deg);
    const b = bandFor(Math.abs(deg));
    if (!b.interdite) {
      setDiscovered((prev) => (prev.has(b.id) ? prev : new Set(prev).add(b.id)));
    }
  }, []);

  function onPointerDown(e: ReactPointerEvent<SVGSVGElement>) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPoint(e.clientX, e.clientY);
  }
  function onPointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (!draggingRef.current) return;
    updateFromPoint(e.clientX, e.clientY);
  }
  function onPointerUp() {
    draggingRef.current = false;
  }

  const toutTrouve = discovered.size >= DISCOVERABLE.length;

  return (
    <div className="rounded-xl bg-brand-50 py-4">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="Simulateur d'allures : fais glisser le bateau autour du cercle pour changer son cap par rapport au vent"
        className="w-full h-auto max-h-64 mx-auto touch-none cursor-grab select-none active:cursor-grabbing"
        style={{ color: "var(--color-brand-700)" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <path
          d={forbiddenWedgePath()}
          fill={band.interdite ? ACCENT : INK}
          opacity={band.interdite ? 0.22 : 0.08}
        />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={BRAND} strokeWidth={1.5} strokeDasharray="3 5" opacity={0.5} />

        <line x1={CX} y1={16} x2={CX} y2={CY - R - 6} stroke={BRAND} strokeWidth={4} />
        <path d={`M${CX - 7},${CY - R - 6} L${CX + 7},${CY - R - 6} L${CX},${CY - R + 8} Z`} fill={BRAND} />
        <Label x={CX} y={30} fill={BRAND}>
          Vent
        </Label>

        <g transform={`rotate(${heading} ${CX} ${CY})`}>
          <path
            d={`M${CX},${CY - 24} L${CX + 11},${CY + 16} L${CX},${CY + 7} L${CX - 11},${CY + 16} Z`}
            fill={ACCENT}
            stroke={INK}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <div className="px-4 mt-3 flex flex-col items-center gap-1 text-center min-h-[2.5rem] justify-center">
        <p className={clsx("text-sm font-semibold", band.interdite ? "text-accent" : "text-ink")}>
          {band.interdite ? "⚠️ Lit du vent : les voiles ne peuvent pas fonctionner ici" : band.label}
        </p>
        {amure && !band.interdite && <p className="text-xs text-ink-soft">{amure}</p>}
      </div>

      <div className="px-4 mt-3 flex flex-wrap justify-center gap-1.5">
        {DISCOVERABLE.map((b) => (
          <span
            key={b.id}
            className={clsx(
              "text-[11px] px-2 py-1 rounded-full border transition-colors",
              discovered.has(b.id)
                ? "bg-success-soft border-success text-ink"
                : "border-border text-ink-soft"
            )}
          >
            {discovered.has(b.id) && "✓ "}
            {b.label}
          </span>
        ))}
      </div>

      <p className="text-center text-xs mt-2.5" role="status">
        {toutTrouve ? (
          <span className="text-success font-medium">Bravo, tu as trouvé les {DISCOVERABLE.length} allures !</span>
        ) : (
          <span className="text-ink-soft">👆 Fais glisser le bateau pour découvrir les allures.</span>
        )}
      </p>
    </div>
  );
}
