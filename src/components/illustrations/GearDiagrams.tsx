import { IllustrationFrame, Label, INK, BRAND, ACCENT, BRAND_SOFT } from "./shared";

export function SailsOverview() {
  return (
    <IllustrationFrame label="Grand-voile, foc/génois et spinnaker" viewBox="0 0 400 210">
      <path d="M70,30 L70,150 L128,150 Z" fill={BRAND} opacity={0.25} stroke={INK} strokeWidth={2} />
      <Label x={99} y={175}>Grand-voile</Label>

      <path d="M195,60 L195,150 L237,150 Z" fill={BRAND} opacity={0.25} stroke={INK} strokeWidth={2} />
      <Label x={216} y={175}>Foc / génois</Label>

      <path d="M330,55 Q378,100 332,152 Q288,100 330,55 Z" fill={ACCENT} opacity={0.3} stroke={INK} strokeWidth={2} />
      <Label x={330} y={175}>Spinnaker</Label>
    </IllustrationFrame>
  );
}

export function MainsailParts() {
  return (
    <IllustrationFrame label="Guindant, bordure, chute et points de la grand-voile" viewBox="0 0 400 230">
      <path
        d="M210,25 L120,195 L295,195 Q315,110 210,25 Z"
        fill={BRAND}
        opacity={0.12}
        stroke={INK}
        strokeWidth={2.5}
      />
      {/* Lattes */}
      <line x1={165} y1={155} x2={270} y2={155} stroke={BRAND_SOFT} strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={183} y1={115} x2={260} y2={115} stroke={BRAND_SOFT} strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={198} y1={75} x2={245} y2={75} stroke={BRAND_SOFT} strokeWidth={1.5} strokeDasharray="4 3" />

      <circle cx={210} cy={25} r={5} fill={ACCENT} />
      <circle cx={120} cy={195} r={5} fill={ACCENT} />
      <circle cx={295} cy={195} r={5} fill={ACCENT} />

      <Label x={210} y={14}>Point de drisse</Label>
      <Label x={95} y={215} anchor="start">Point d&apos;amure</Label>
      <Label x={320} y={215} anchor="end">Point d&apos;écoute</Label>

      <Label x={150} y={110} anchor="end" fill={BRAND} size={12}>Guindant</Label>
      <Label x={205} y={210} fill={BRAND} size={12}>Bordure</Label>
      <Label x={290} y={100} anchor="start" fill={ACCENT} size={12}>Chute</Label>
    </IllustrationFrame>
  );
}

export function SheetHalyard() {
  return (
    <IllustrationFrame label="La drisse hisse la voile, l'écoute règle son angle" viewBox="0 0 400 240">
      {/* Mât */}
      <line x1={150} y1={210} x2={150} y2={30} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      {/* Bôme */}
      <line x1={150} y1={175} x2={270} y2={175} stroke={INK} strokeWidth={4} strokeLinecap="round" />

      {/* Drisse */}
      <line x1={160} y1={200} x2={160} y2={38} stroke={BRAND} strokeWidth={3} strokeDasharray="6 4" />
      <path d="M153,40 L167,40 L160,25 Z" fill={BRAND} />
      <Label x={160} y={16} fill={BRAND}>Drisse</Label>
      <Label x={160} y={225} fill={BRAND} size={11}>hisse la voile</Label>

      {/* Écoute */}
      <path d="M270,175 Q300,190 300,215" fill="none" stroke={ACCENT} strokeWidth={3} strokeDasharray="6 4" />
      <path d="M294,213 L306,215 L297,224 Z" fill={ACCENT} />
      <Label x={300} y={232} fill={ACCENT}>Écoute</Label>
      <Label x={340} y={195} fill={ACCENT} size={11} anchor="start">règle l&apos;angle</Label>
    </IllustrationFrame>
  );
}

export function WinchDiagram() {
  return (
    <IllustrationFrame label="Enrouler le cordage autour du winch dans le sens des aiguilles d'une montre" viewBox="0 0 400 220">
      <circle cx={200} cy={110} r={70} fill="none" stroke={INK} strokeWidth={3} />
      <circle cx={200} cy={110} r={54} fill="none" stroke={BRAND} strokeWidth={2} strokeDasharray="5 4" />
      <circle cx={200} cy={110} r={38} fill="none" stroke={BRAND} strokeWidth={2} strokeDasharray="5 4" />
      <circle cx={200} cy={110} r={8} fill={INK} />

      <path d="M255,60 A75,75 0 0 1 270,110" fill="none" stroke={ACCENT} strokeWidth={3.5} />
      <path d="M263,102 L272,113 L280,100" fill="none" stroke={ACCENT} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />

      <Label x={200} y={205}>Sens des aiguilles d&apos;une montre</Label>
    </IllustrationFrame>
  );
}

export function TillerWheel() {
  return (
    <IllustrationFrame label="Barre franche : sens inversé — Roue : sens direct" viewBox="0 0 400 200">
      {/* Barre franche */}
      <g>
        <circle cx={100} cy={100} r={6} fill={INK} />
        <line x1={100} y1={100} x2={50} y2={120} stroke={INK} strokeWidth={5} strokeLinecap="round" />
        <path d="M60,150 Q100,170 140,150" fill="none" stroke={ACCENT} strokeWidth={2.5} markerEnd="url(#th-arrow)" />
        <defs>
          <marker id="th-arrow" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill={ACCENT} />
          </marker>
        </defs>
        <Label x={100} y={30}>Barre franche</Label>
        <Label x={100} y={185} size={11} fill={ACCENT}>Sens inversé</Label>
      </g>

      {/* Roue */}
      <g>
        <circle cx={300} cy={100} r={35} fill="none" stroke={INK} strokeWidth={4} />
        <circle cx={300} cy={100} r={6} fill={INK} />
        <line x1={300} y1={65} x2={300} y2={135} stroke={INK} strokeWidth={2} />
        <line x1={267} y1={100} x2={333} y2={100} stroke={INK} strokeWidth={2} />
        <path d="M330,140 Q300,165 270,140" fill="none" stroke={BRAND} strokeWidth={2.5} markerEnd="url(#th-arrow2)" />
        <defs>
          <marker id="th-arrow2" markerWidth={7} markerHeight={7} refX={3.5} refY={3.5} orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill={BRAND} />
          </marker>
        </defs>
        <Label x={300} y={30}>Roue</Label>
        <Label x={300} y={185} size={11} fill={BRAND}>Sens direct</Label>
      </g>
    </IllustrationFrame>
  );
}
