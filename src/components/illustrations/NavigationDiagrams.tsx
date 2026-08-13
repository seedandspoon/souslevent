import { IllustrationFrame, Label, INK, BRAND, BRAND_SOFT, ACCENT, SUCCESS, DANGER } from "./shared";

const TOP_BOAT_D = "M200,55 L233,125 L226,195 Q200,212 174,195 L167,125 Z";

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
 * Balisage latéral en revenant vers le port (IALA région A) : les marques
 * sont dessinées avec les symboles de carte marine réels — rectangle
 * rouge pour une marque cylindrique (bâbord), triangle vert pour une
 * marque conique (tribord) — pas de simples ronds de couleur. Même
 * convention de couleur que le schéma tribord/bâbord du Niveau 1 (vert =
 * tribord, rouge = bâbord), réutilisée ici volontairement.
 */
export function BuoyageLateralDiagram() {
  return (
    <IllustrationFrame
      label="En revenant vers le port : les marques rouges cylindriques à bâbord (gauche), les marques vertes coniques à tribord (droite)"
      viewBox="0 0 400 300"
    >
      <ArrowDefs id="arrow-vers-port" color={BRAND} />

      <line x1={200} y1={222} x2={200} y2={64} stroke={BRAND} strokeWidth={2} strokeDasharray="3 5" opacity={0.6} markerEnd="url(#arrow-vers-port)" />
      <Label x={200} y={50} fill={BRAND} weight={700}>Port</Label>

      {/* Limites du chenal, qui se resserre en s'approchant du port */}
      <line x1={130} y1={230} x2={155} y2={55} stroke={INK} strokeWidth={1} strokeDasharray="2 5" opacity={0.25} />
      <line x1={270} y1={230} x2={245} y2={55} stroke={INK} strokeWidth={1} strokeDasharray="2 5" opacity={0.25} />

      {/* Marques rouges à bâbord (gauche) : cylindriques → rectangle */}
      <rect x={128} y={169} width={18} height={22} rx={2} fill={DANGER} />
      <rect x={140} y={89} width={18} height={22} rx={2} fill={DANGER} />
      <Label x={137} y={216} fill={DANGER} size={12} weight={700}>Bâbord</Label>

      {/* Marques vertes à tribord (droite) : coniques → triangle */}
      <path d="M263,169 L274,191 L252,191 Z" fill={SUCCESS} />
      <path d="M251,89 L262,111 L240,111 Z" fill={SUCCESS} />
      <Label x={263} y={216} fill={SUCCESS} size={12} weight={700}>Tribord</Label>

      {/* Bateau, cap vers le port */}
      <g transform="translate(200,252) scale(0.42) translate(-200,-130)">
        <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>
    </IllustrationFrame>
  );
}

/**
 * Cap (où pointe la proue) vs. route (le trajet réellement suivi) : les
 * deux flèches partagent la même origine (le bateau) mais divergent — le
 * cap en pointillé vers la destination visée, la route pleine, poussée de
 * côté par le courant, vers là où le bateau finit réellement. L'angle
 * entre les deux est la dérive.
 */
export function CapRouteDiagram() {
  const origine = { x: 170, y: 235 };
  return (
    <IllustrationFrame
      label="Le cap pointé (pointillé) et la route réellement suivie (pleine) divergent sous l'effet du courant : l'écart est la dérive"
      viewBox="0 0 400 300"
    >
      <ArrowDefs id="arrow-cap" color={BRAND_SOFT} />
      <ArrowDefs id="arrow-route" color={ACCENT} />
      <ArrowDefs id="arrow-courant" color={BRAND} />

      {/* Cap : où pointe la proue */}
      <line x1={origine.x} y1={origine.y} x2={origine.x} y2={45} stroke={BRAND_SOFT} strokeWidth={3} strokeDasharray="5 5" markerEnd="url(#arrow-cap)" />
      <circle cx={origine.x} cy={38} r={4} fill="none" stroke={BRAND_SOFT} strokeWidth={2} />
      <Label x={origine.x - 10} y={100} fill={BRAND_SOFT} anchor="end">Cap</Label>
      <Label x={origine.x} y={28} fill={BRAND_SOFT} size={10} weight={500}>Destination visée</Label>

      {/* Route : trajet réellement suivi, dévié par le courant */}
      <line x1={origine.x} y1={origine.y} x2={295} y2={70} stroke={ACCENT} strokeWidth={3.5} markerEnd="url(#arrow-route)" />
      <Label x={300} y={62} fill={ACCENT} anchor="start">Route réelle</Label>

      {/* Angle de dérive, entre les deux */}
      <path d="M170,195 A40,40 0 0 1 202,201" fill="none" stroke={INK} strokeWidth={1.5} opacity={0.6} />
      <Label x={214} y={210} fill={INK} size={11} weight={600}>Dérive</Label>

      {/* Courant : pousse le bateau de côté */}
      <line x1={95} y1={175} x2={135} y2={172} stroke={BRAND} strokeWidth={3} markerEnd="url(#arrow-courant)" />
      <line x1={95} y1={205} x2={135} y2={202} stroke={BRAND} strokeWidth={3} markerEnd="url(#arrow-courant)" />
      <Label x={85} y={190} fill={BRAND} size={11} weight={600} anchor="end">Courant</Label>

      {/* Bateau, à l'origine des deux trajectoires */}
      <g transform={`translate(${origine.x},${origine.y}) scale(0.42) translate(-200,-130)`}>
        <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>
    </IllustrationFrame>
  );
}

/**
 * Coupe latérale du mouillage : le point à faire passer est que la
 * chaîne traîne au fond sur une bonne longueur avant de remonter à
 * l'étrave, ce qui maintient une traction quasi horizontale sur l'ancre
 * (verifié : une chaîne trop courte tire l'ancre vers le haut au lieu de
 * la faire mordre). D'où le ratio longueur de chaîne / profondeur, plus
 * parlant en coupe qu'en vue de dessus.
 */
export function MouillageDiagram() {
  return (
    <IllustrationFrame label="La chaîne traîne au fond avant de remonter à l'étrave : elle tire l'ancre à l'horizontale, pas vers le haut" viewBox="0 0 400 260">
      {/* Colonne d'eau et fond */}
      <rect x={20} y={60} width={340} height={140} fill={BRAND} opacity={0.08} />
      <rect x={20} y={200} width={340} height={26} fill={INK} opacity={0.14} />
      <line x1={20} y1={60} x2={360} y2={60} stroke={BRAND} strokeWidth={2} />
      <line x1={20} y1={200} x2={360} y2={200} stroke={INK} strokeWidth={2} />

      {/* Bateau, vu de côté, flottant à la surface */}
      <path d="M225,66 L275,58 L282,74 L237,76 Z" fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={245} y={48} width={20} height={11} fill="none" stroke={INK} strokeWidth={2} />

      {/* Chaîne : traîne au fond avant de remonter à l'étrave */}
      <path d="M225,67 Q145,85 100,186 L70,199" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />

      {/* Ancre */}
      <circle cx={68} cy={191} r={3.5} fill="none" stroke={INK} strokeWidth={2} />
      <path d="M68,195 L68,212 M57,211 Q68,224 79,211" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />

      {/* Repère profondeur */}
      <line x1={340} y1={60} x2={340} y2={200} stroke={INK} strokeWidth={1.5} opacity={0.5} />
      <line x1={334} y1={60} x2={346} y2={60} stroke={INK} strokeWidth={1.5} opacity={0.5} />
      <line x1={334} y1={200} x2={346} y2={200} stroke={INK} strokeWidth={1.5} opacity={0.5} />
      <Label x={352} y={134} fill={INK} size={11} weight={600} anchor="start">Profondeur</Label>

      <Label x={230} y={168} fill={ACCENT} size={11} weight={600} anchor="middle">Chaîne ≈ 3 à 5 ×</Label>
      <Label x={230} y={182} fill={ACCENT} size={11} weight={600} anchor="middle">la profondeur</Label>

      <Label x={95} y={178} fill={INK} size={10} weight={500} anchor="middle">tire à l&apos;horizontale</Label>
    </IllustrationFrame>
  );
}

/**
 * Secteurs de visibilité des feux de navigation (vérifiés COLREG /
 * RIPAM : bâbord-tribord 112,5° chacun, poupe 135° — les trois se
 * complètent exactement en 360° — tête de mât 225° à l'avant, plus haute
 * et souvent absente sur un petit voilier à la voile, d'où l'arc en
 * pointillé à un rayon plus grand plutôt qu'un remplissage). Vue de
 * dessus, proue en haut.
 */
export function FeuxNavigationDiagram() {
  return (
    <IllustrationFrame
      label="Vu de dessus : feu vert à tribord, feu rouge à bâbord, feu blanc à la poupe, chacun visible seulement dans son secteur"
      viewBox="0 0 400 260"
    >
      {/* Secteur tribord : vert, de l'avant à 112,5° */}
      <path d="M200,150 L200,55 A95,95 0 0 1 287.8,186.4 Z" fill={SUCCESS} opacity={0.28} />
      {/* Secteur bâbord : rouge, de l'avant à 112,5° */}
      <path d="M200,150 L200,55 A95,95 0 0 0 112.2,186.4 Z" fill={DANGER} opacity={0.28} />
      {/* Secteur poupe : blanc, 135°, complète les deux autres à 360° */}
      <path d="M200,150 L287.8,186.4 A95,95 0 0 1 112.2,186.4 Z" fill={INK} opacity={0.14} />

      {/* Tête de mât : 225° à l'avant, plus haute, souvent absente à la voile */}
      <path d="M84.5,197.8 A125,125 0 1 1 315.5,197.8" fill="none" stroke={INK} strokeWidth={1.5} strokeDasharray="5 5" opacity={0.55} />

      <g transform="translate(200,150) scale(0.6) translate(-200,-133.5)">
        <path d={TOP_BOAT_D} fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      </g>

      <Label x={296} y={128} fill={SUCCESS} size={12} weight={700} anchor="start">Vert — tribord</Label>
      <Label x={104} y={128} fill={DANGER} size={12} weight={700} anchor="end">Rouge — bâbord</Label>
      <Label x={200} y={222} fill={INK} size={12} weight={700} anchor="middle">Blanc — poupe</Label>
      <Label x={200} y={16} fill={INK} size={10} weight={500} anchor="middle">Tête de mât (pointillé, souvent absente à la voile)</Label>
    </IllustrationFrame>
  );
}
