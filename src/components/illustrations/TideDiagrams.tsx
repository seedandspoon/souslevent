import { IllustrationFrame, Label, INK, BRAND, BRAND_SOFT, ACCENT } from "./shared";

function ArrowDefs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <marker id={id} markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill={color} />
      </marker>
    </defs>
  );
}

/**
 * Courbe de marée : vive-eau (grande amplitude) et morte-eau (amplitude
 * réduite) partagent le même niveau moyen, pour montrer que le
 * coefficient change l'amplitude de l'oscillation, pas sa forme. Le
 * marnage est le repère vertical entre les deux niveaux (pleine mer /
 * basse mer) de la courbe vive-eau, matérialisé par des lignes de
 * référence horizontales plutôt qu'une mesure oblique.
 */
export function MarnageCoefficientDiagram() {
  return (
    <IllustrationFrame
      label="Le marnage est l'écart entre pleine mer et basse mer ; il est bien plus grand en vive-eau qu'en morte-eau"
      viewBox="0 0 400 260"
    >
      <ArrowDefs id="arrow-marnage" color={INK} />

      {/* Niveaux de référence de la marée vive-eau */}
      <line x1={30} y1={210} x2={370} y2={210} stroke={BRAND_SOFT} strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />
      <line x1={30} y1={50} x2={370} y2={50} stroke={BRAND_SOFT} strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />

      {/* Courbe morte-eau : amplitude réduite */}
      <path
        d="M40,165 C110,165 110,95 200,95 C290,95 290,165 360,165"
        fill="none"
        stroke={BRAND_SOFT}
        strokeWidth={2.5}
      />
      <Label x={335} y={88} fill={BRAND_SOFT} size={11} weight={600}>Morte-eau</Label>

      {/* Courbe vive-eau : grande amplitude */}
      <path
        d="M40,210 C110,210 110,50 200,50 C290,50 290,210 360,210"
        fill="none"
        stroke={ACCENT}
        strokeWidth={3}
      />
      <Label x={335} y={45} fill={ACCENT} size={11} weight={600}>Vive-eau</Label>

      <Label x={200} y={38} fill={INK} weight={700}>Pleine mer</Label>
      <Label x={40} y={228} fill={INK} size={11}>Basse mer</Label>
      <Label x={360} y={228} fill={INK} size={11} anchor="end">Basse mer</Label>

      {/* Marnage : repère vertical entre les deux niveaux de référence */}
      <line x1={108} y1={210} x2={108} y2={50} stroke={INK} strokeWidth={2} markerEnd="url(#arrow-marnage)" markerStart="url(#arrow-marnage)" />
      <Label x={118} y={130} fill={INK} size={12} weight={700} anchor="start">Marnage</Label>
    </IllustrationFrame>
  );
}

/**
 * Règle des douzièmes : la hauteur d'eau ne varie pas à vitesse
 * constante — 1, 2, 3, 3, 2, puis 1 douzième du marnage par heure-marée.
 * Les barres, courtes-courtes-hautes-hautes-courtes-courtes, rendent ce
 * rythme lisible d'un coup d'œil, sans qu'il soit besoin de lire les
 * fractions pour deviner où le niveau bouge le plus vite.
 */
export function DouziemesBarChart() {
  const douziemes = [1, 2, 3, 3, 2, 1];
  const baseY = 220;
  const unite = 46.5;
  const xs = [30, 90, 150, 210, 270, 330];

  return (
    <IllustrationFrame
      label="La hauteur d'eau varie par 1, 2, 3, 3, 2 puis 1 douzième du marnage, heure-marée par heure-marée"
      viewBox="0 0 400 260"
    >
      <line x1={20} y1={baseY} x2={380} y2={baseY} stroke={INK} strokeWidth={1.5} opacity={0.5} />

      {douziemes.map((n, i) => {
        const h = n * unite;
        return (
          <g key={i}>
            <rect x={xs[i]} y={baseY - h} width={40} height={h} fill={BRAND} opacity={0.28} stroke={INK} strokeWidth={1.5} />
            <Label x={xs[i] + 20} y={baseY - h - 8} fill={INK} size={12} weight={700}>{n}/12</Label>
            <Label x={xs[i] + 20} y={baseY + 22} fill={INK} size={11} weight={500}>{`H${i + 1}`}</Label>
          </g>
        );
      })}
    </IllustrationFrame>
  );
}

function CourantPanel({ cx, sens, label, detail }: { cx: number; sens: "flot" | "jusant" | "etale"; label: string; detail: string }) {
  return (
    <g>
      <path
        d={`M${cx - 50},40 L${cx - 28},54 L${cx - 8},32 L${cx + 16},48 L${cx + 50},36 L${cx + 50},8 L${cx - 50},8 Z`}
        fill={INK}
        opacity={0.16}
      />
      {sens === "flot" && (
        <line x1={cx} y1={175} x2={cx} y2={78} stroke={ACCENT} strokeWidth={4} markerEnd="url(#arrow-courant)" />
      )}
      {sens === "jusant" && (
        <line x1={cx} y1={70} x2={cx} y2={167} stroke={ACCENT} strokeWidth={4} markerEnd="url(#arrow-courant)" />
      )}
      {sens === "etale" && (
        <>
          <circle cx={cx} cy={122} r={5} fill="none" stroke={BRAND_SOFT} strokeWidth={2.5} />
          <circle cx={cx} cy={122} r={1.6} fill={BRAND_SOFT} />
        </>
      )}
      <Label x={cx} y={206} fill={INK} size={13} weight={700}>{label}</Label>
      <Label x={cx} y={222} fill={INK} size={10} weight={500}>{detail}</Label>
    </g>
  );
}

/**
 * Flot, jusant, étale : trois panneaux partageant le même repère (la
 * côte en haut, le large en bas) pour que seul le sens de la flèche
 * change d'un panneau à l'autre — la variable qui compte pédagogiquement
 * ici, pas la géographie du lieu.
 */
export function CourantMareeDiagram() {
  return (
    <IllustrationFrame
      label="Le flot porte vers la côte, le jusant vers le large ; l'étale est le bref moment où le courant s'annule entre les deux"
      viewBox="0 0 400 230"
    >
      <ArrowDefs id="arrow-courant" color={ACCENT} />
      <CourantPanel cx={68} sens="flot" label="Flot" detail="vers la côte" />
      <CourantPanel cx={200} sens="etale" label="Étale" detail="courant quasi nul" />
      <CourantPanel cx={332} sens="jusant" label="Jusant" detail="vers le large" />
    </IllustrationFrame>
  );
}
