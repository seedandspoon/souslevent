# Recettes techniques SVG

Compagnon de `SKILL.md` : comment coder concrètement chaque convention.
Écrit en React + TypeScript + Framer Motion, cohérent avec le reste du
codebase (`"use client"`, `motion.path`, tokens CSS via `var(--color-*)`).

## Sommaire

1. [Coque et orientation stable en rotation](#coque)
2. [Flèche de vent world-frame](#vent)
3. [Voile réactive](#voile)
4. [Croisement dessus/dessous (technique du halo)](#profondeur)
5. [Cordage dormant/courant](#cordage)
6. [Props des composants réutilisables](#composants)
7. [Pièges déjà rencontrés dans ce projet](#pieges)

---

## 1. Coque et orientation stable en rotation {#coque}

L'astuce n'est pas la rotation (un simple `transform="rotate(deg cx cy)"`
suffit) — c'est que la forme elle-même doit rester lisible comme "un
bateau qui pointe dans telle direction" à *n'importe quel* angle. Ça vient
uniquement de l'asymétrie du path : pointe nette d'un côté, base large et
plate de l'autre. Gabarit qui fonctionne bien (bateau pointant vers le
haut avant rotation) :

```tsx
// Proue en haut (pointe), poupe en bas (plate) — asymétrie ~2:1 en largeur
const HULL_D = "M200,120 L227,190 L221,252 Q200,266 179,252 L173,190 Z";
```

Points de vigilance :
- Le rapport pointe/largeur doit rester net même réduit sur mobile —
  teste à la taille d'affichage réelle, pas seulement zoomé dans l'éditeur.
- N'ajoute pas de marqueur de proue séparé (pastille, flèche) comme
  *seule* source de vérité sur l'orientation : c'est un bonus, pas un
  substitut à l'asymétrie de la coque. Si on masque ce marqueur, la forme
  doit encore se lire.
- Mât, bôme, cockpit se positionnent en coordonnées *locales* (bateau
  pointant vers le haut), puis c'est tout le groupe qui tourne — jamais
  l'inverse (ne recalcule pas les coordonnées à chaque angle).

```tsx
<g transform={`rotate(${headingDeg} ${cx} ${cy})`}>
  <path d={HULL_D} fill="none" stroke={INK} strokeWidth={3.5} />
  {/* mât, bôme, voile en coordonnées locales ici */}
</g>
```

## 2. Flèche de vent world-frame {#vent}

Erreur classique : dessiner la flèche de vent *à l'intérieur* du `<g>` qui
tourne avec le bateau. Elle doit être **hors** de ce groupe, en repère du
monde, pour rester stable pendant que le bateau pivote — c'est ce qui
permet de comprendre "le vent ne bouge pas, c'est le bateau qui change
d'angle par rapport à lui".

```tsx
<svg viewBox="0 0 400 400">
  {/* Vent : hors du groupe rotatif, toujours identique */}
  <line x1={cx} y1={18} x2={cx} y2={55} stroke={BRAND} strokeWidth={4} />
  <path d={`M${cx - 8},55 L${cx + 8},55 L${cx},70 Z`} fill={BRAND} />

  {/* Bateau : seul ce groupe tourne */}
  <g transform={`rotate(${headingDeg} ${cx} ${cy})`}>...</g>
</svg>
```

Largeur de trait minimum 3.5-4px, longueur suffisante pour qu'elle ne
puisse pas être confondue avec un détail du gréement.

## 3. Voile réactive {#voile}

La voile est un quad rempli entre le point de drisse (haut du mât), le
bout de bôme, et le point d'amure (bas du mât) — pas une ligne. Le
"ventre" (belly) est un point de contrôle de courbe de Bézier quadratique
qu'on déplace selon l'état :

```tsx
const belly = etat === "bon" ? 30 : etat === "freine" ? 6 : 20; // px d'offset
<path
  d={`M${mastTop.x},${mastTop.y} Q${mastTop.x + belly},${milieuY} ${boomEnd.x},${boomEnd.y} L${mastBase.x},${mastBase.y} Z`}
  fill={etat === "freine" ? DANGER : BRAND}
  opacity={0.7}
/>
```

Pour l'état "faseille", anime le contour (pas juste une opacité qui
clignote — un vrai flottement de bord donne bien plus l'intuition
physique) :

```tsx
<motion.path
  fill="none"
  stroke={ACCENT}
  strokeWidth={3}
  initial={false}
  animate={{
    d: [pathVersionA, pathVersionB], // deux courbes légèrement différentes
  }}
  transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
/>
```

Voir le piège correspondant en section 7 — ne jamais combiner un `d`
statique et un `animate.d` sur le même `motion.path`.

## 4. Croisement dessus/dessous — technique du halo {#profondeur}

C'est la technique la plus importante de tout ce document, et celle qui
manquait le plus dans les premières versions des nœuds. Elle ne nécessite
aucun calcul d'intersection : on triche visuellement en donnant au brin
du dessus un "halo" de la couleur du fond, plus épais que son propre
trait, dessiné juste avant lui. Là où le halo recouvre le brin du dessous,
ça crée une coupure nette — exactement l'effet "ce brin passe derrière".

```tsx
const BG = "var(--color-brand-50)"; // couleur du fond du canevas, pas du body

<svg>
  {/* 1. Le brin du dessous, en entier, sans coupure */}
  <path d={brinDessous} fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />

  {/* 2. Le halo du brin du dessus : même trajet, couleur du fond, plus épais */}
  <path d={brinDessus} fill="none" stroke={BG} strokeWidth={4 + 6} strokeLinecap="round" />

  {/* 3. Le vrai trait du brin du dessus, par-dessus son propre halo */}
  <path d={brinDessus} fill="none" stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
</svg>
```

Points de vigilance :
- Le halo doit utiliser la couleur *exacte* du fond visible à cet endroit
  (souvent `--color-brand-50`, pas `--color-surface` ni blanc) sinon la
  coupure laisse un liseré visible.
- Si le fond n'est pas uni sous ce point précis (dégradé, autre forme
  derrière), cette technique ne suffit plus — il faut alors découper le
  path du dessous en deux segments avec un vrai espace (gap) au point de
  croisement. Réserve ça aux cas où le halo échoue visuellement.
- Encapsule ce motif dans le composant `DepthCrossing` (section 6) plutôt
  que de le répéter à la main à chaque croisement.

## 5. Cordage dormant/courant {#cordage}

```tsx
const DORMANT_STYLE = { stroke: INK, strokeWidth: 4.5 };
const COURANT_STYLE = { stroke: ACCENT, strokeWidth: 4 };

// Embout du courant : un petit cercle plein à l'extrémité libre
<circle cx={boutLibre.x} cy={boutLibre.y} r={5} fill={ACCENT} />
```

Le dormant est légèrement *plus épais* que le courant (4.5 vs 4) en plus
d'être d'une autre couleur — la redondance forme+couleur aide, elle ne
remplace jamais la couleur seule (daltonisme, écrans mal calibrés en
plein soleil sur un bateau — un cas réel pour cette appli).

## 6. Props des composants réutilisables {#composants}

Esquisse d'API pour `src/components/nautical-visuals/` — à ajuster à
l'implémentation mais garde cette forme générale pour que toute nouvelle
expérience compose ces primitives de la même façon.

```tsx
// SailboatHull.tsx — coque seule, sert d'ancrage aux autres pièces
interface SailboatHullProps {
  cx: number; cy: number;
  headingDeg?: number;       // 0 = proue vers le haut
  highlight?: "coque" | "pont" | "cockpit";
}

// WindIndicator.tsx — toujours world-frame, ne jamais mettre dans un <g> qui tourne
interface WindIndicatorProps {
  x: number; y: number;      // point d'ancrage (haut de la flèche)
  length?: number;
  label?: boolean;           // affiche "Vent" en petit, redondant au visuel
}

// Sail.tsx
interface SailProps {
  mastTop: Point; mastBase: Point; boomEnd: Point;
  etat: "bon" | "freine" | "faseille";
}

// Boom.tsx — le spar physique, pas juste un trait
interface BoomProps { from: Point; to: Point; }

// Rope.tsx
interface RopeProps { d: string; role: "dormant" | "courant"; animate?: boolean; }

// RopeEnd.tsx
interface RopeEndProps { at: Point; }

// DepthCrossing.tsx — encapsule la technique du halo (section 4)
interface DepthCrossingProps {
  under: string;   // path du brin dessous
  over: string;     // path du brin dessus
  underStyle: PathStyle; overStyle: PathStyle;
  backgroundColor: string;
}

// MovementTrail.tsx — usage ponctuel seulement (voir taxonomie dans SKILL.md)
interface MovementTrailProps { path: string; visible: boolean; }

// NavigationMarker.tsx
interface NavigationMarkerProps {
  type: "cardinale-nord" | "cardinale-sud" | "laterale-bâbord" | "laterale-tribord" | "danger-isole";
  x: number; y: number;
}
```

## 7. Pièges déjà rencontrés dans ce projet {#pieges}

Ces trois bugs sont apparus concrètement en construisant les premières
expériences interactives. Ils ne sont pas hypothétiques — vérifie-les
explicitement à chaque nouveau diagramme animé/interactif.

**a. `motion.path` avec un `d` statique ET un `animate.d`.** Passer les
deux en même temps sur le même élément produit une erreur de rendu
(`attribute d: Expected moveto path command, "undefined"`) au premier
rendu, car Framer Motion prend le contrôle de l'attribut `d` et entre en
conflit avec la valeur statique. Solution : ne jamais mettre de `d`
statique sur un `motion.path` qui anime `d` — utilise `initial={false}`
et laisse `animate.d` définir la forme de départ.

**b. Zone de glissement SVG sans fond peint.** Un `<svg>` ou un `<g>` sans
remplissage (`fill="none"`) ne capte les événements pointer que sur les
traits/formes réellement peints — cliquer dans une zone "vide" du canevas
ne déclenche rien. Pour une interaction "glisse n'importe où sur le
canevas", ajoute un rectangle invisible en premier enfant :
`<rect x={0} y={0} width={W} height={H} fill="transparent" />` (`fill="none"`
ne marche PAS ici, il faut une vraie valeur de peinture même transparente).

**c. Une étape qui redessine exactement par-dessus un tracé déjà visible.**
Dans une animation en plusieurs étapes (ex. un nœud), si le nouveau
segment animé emprunte exactement le même chemin qu'un segment déjà
affiché à l'étape précédente, l'animation de tracé (`pathLength` 0→1) ne
produit aucun changement visible — rien ne semble bouger alors que le
code "fonctionne". Toujours vérifier à l'œil (pas seulement dans le code)
que chaque étape ajoute un tracé visuellement distinct ; décale légèrement
la courbe (quelques pixels suffisent) si un chevauchement est détecté.
