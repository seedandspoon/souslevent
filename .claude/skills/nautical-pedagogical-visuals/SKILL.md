---
name: nautical-pedagogical-visuals
description: Visual language and SVG conventions for teaching sailing concepts to beginners in the souslevent app — boats, wind, sails, boom, rigging, allures, amures, maneuvers, ropes, knots, charts, buoyage, and multi-boat situations. Load this skill before writing or reviewing ANY nautical diagram, illustration, or interactive SVG experience in this codebase — including small tweaks to existing illustrations in src/components/illustrations/ or src/components/experiences/. Trigger on requests like "add an illustration for X", "the diagram is confusing", "build an interactive experience for [allure/manœuvre/nœud/règle de priorité]", "improve this schema", or any mention of drawing a boat, wind arrow, sail, rope, or knot. Also load it before touching anything in src/components/nautical-visuals/.
---

# Visualisation pédagogique nautique

## La règle fondamentale

**Le visuel doit être compris avant que le texte soit lu.** Le texte précise et
rassure ; il ne doit jamais être la seule voie de compréhension. Avant de
livrer un schéma ou une animation, applique ce test :

1. Cache tout le texte (titres, légendes, labels). Un débutant comprend-il
   ce qu'il regarde ?
2. Si c'est une animation, coupe le son/texte et ne montre que le mouvement.
   Comprend-il ce qui se déplace, et dans quel sens ?

Si la réponse est non aux deux, le schéma n'est pas fini — même s'il est
techniquement correct.

**Anti-pattern à surveiller activement** : résoudre un manque de clarté en
ajoutant une couleur, une flèche ou un label de plus. C'est le réflexe
naturel et c'est presque toujours le mauvais réflexe : ça transforme un
problème de représentation physique en un problème de mémorisation de
légende ("le trait rouge veut dire..."). Cherche d'abord une représentation
qui se comprend par sa forme même — la légende est un dernier recours, pas
une solution.

Ne choisis jamais une convention parce qu'elle est facile à coder en SVG
(une ligne droite, un simple croisement de traits) si elle n'est pas
immédiatement lisible. La difficulté d'implémentation ne doit jamais dicter
la pédagogie.

## Comment lire cette skill

Ce document couvre les principes et les conventions par élément. Pour la
recette technique précise (quel path SVG, quelle astuce de rendu) derrière
chaque convention, va voir `references/svg-techniques.md` — c'est le
compagnon "comment coder ça concrètement" de chaque règle ci-dessous.

## Palette et tokens

Réutilise les tokens existants (`src/app/globals.css`), n'en invente pas de
nouveaux :
- `--color-ink` : dormant, structure fixe du bateau (coque, mât), tout ce
  qui ne bouge pas pendant l'interaction.
- `--color-brand-500` / `--color-brand-300` : vent, éléments d'univers
  neutres.
- `--color-accent` : ce qui est *actif* — le courant d'un nœud, une pièce
  qu'on manipule, un avertissement doux (faseille).
- `--color-success` / `--color-danger` : uniquement pour un jugement
  (bon réglage / erreur), jamais pour distinguer deux parties neutres d'un
  même objet.

Règle de couleur : une couleur = un rôle constant dans toute l'app. Le
dormant est toujours `ink`, le courant est toujours `accent`, où qu'il
apparaisse. Ne réassigne jamais ces rôles au cas par cas.

## Taxonomie des mouvements — un traitement visuel par type

Le point 6 du brief original insistait : ne pas multiplier les flèches de
couleurs différentes sans système. Voici le système, à respecter partout :

| Ce qui bouge | Comment on le montre | Ne pas faire |
|---|---|---|
| Direction du vent (fait du monde, fixe) | Une flèche unique, épaisse, world-frame, toujours hors du groupe qui tourne | Des petites flèches ambiguës mêlées au bateau |
| Cap / orientation du bateau | La silhouette du bateau elle-même (proue pointue) — **pas de flèche séparée** | Ajouter une flèche "direction" en plus du bateau qui tourne déjà |
| Réaction d'une pièce à une manipulation (bôme qui pivote, voile qui se gonfle) | La pièce change réellement de forme/angle en direct, éventuellement un arc de balayage transitoire en accent qui s'efface | Une flèche permanente à côté de la pièce |
| Progression d'un cordage (nœud) | Le tracé qui se dessine progressivement (`pathLength` 0→1) EST la trajectoire | Une flèche superposée en plus du tracé animé |

Principe général : si l'objet peut montrer son propre mouvement (en tournant,
en se dessinant, en changeant de forme), fais ça plutôt que d'ajouter un
symbole de mouvement à côté. Réserve la flèche aux faits du monde qui n'ont
pas de forme propre (le vent).

## Le bateau

Toujours reconnaissable comme voilier, orientation évidente même en
rotation, **sans dépendre du texte ni d'une flèche pour dire où est
l'avant**. La coque doit être visuellement asymétrique : proue en pointe
nette, poupe large et plate — cette asymétrie doit rester lisible à
n'importe quel angle de rotation, c'est elle qui porte l'information
d'orientation, pas une flèche annexe.

Parties à distinguer visuellement (pas seulement nommables) : coque, mât,
grand-voile, foc/génois, bôme, barre/safran. Voir la recette de coque et le
gabarit de proportions dans `references/svg-techniques.md`.

### Règle : le voilier de référence porte deux voiles

Le voilier pédagogique standard de l'application se représente **avec sa
grand-voile ET sa voile d'avant (foc/génois)**, pas une seule. C'est la
valeur par défaut de `SailboatDiagram` — ne dessine une seule voile que
lorsque la notion étudiée porte volontairement sur une voile précise
(ex. une leçon dédiée uniquement au réglage du foc). Dans tous les autres
cas, les deux voiles sont présentes, même si l'interaction ne permet de
régler que l'une des deux pour l'instant : la priorité est que
l'utilisateur apprenne sur la silhouette réelle d'un voilier, pas sur une
version simplifiée à une seule voile qui ne correspond à rien en
navigation.

Position relative, non négociable :
- **Grand-voile** : derrière le mât, le long de la bôme — le guindant
  colle au mât, la bordure colle à la bôme.
- **Foc/génois** : devant le mât, attaché à l'étai (le câble qui va du
  mât vers la proue) — jamais attaché à la bôme, qui n'appartient qu'à la
  grand-voile.

Les deux voiles doivent réagir ensemble et de façon cohérente au même
vent (voir section suivante) : c'est ce qui les fait lire comme deux
pièces d'un même bateau plutôt que comme deux formes ajoutées côte à
côte.

## Le vent

Une seule convention, partout dans l'app. Flèche épaisse (≥4px), longue,
qui se termine clairement à distance du bateau — jamais collée dessus. Elle
vit dans le repère du monde (en dehors du `<g>` qui tourne avec le bateau),
donc elle reste stable visuellement même quand le bateau pivote. Elle doit
communiquer à la fois *d'où* vient le vent et *vers où* il souffle par sa
seule forme (ligne + pointe), sans qu'on ait besoin de lire "Vent".

## La voile et la bôme

La voile est une **surface remplie**, jamais deux traits. Sa courbe (belly)
doit changer réellement selon l'état :
- bien réglée → ventre creux net, couleur pleine ;
- trop bordée → ventre plat/inversé, teinte qui tire vers l'alerte ;
- pas assez bordée → faseille, animation de flottement (oscillation légère
  du contour), couleur accent.

Dans `SailboatDiagram` (le voilier de référence des expériences Allures et
Réglage d'une voile), ni le mât ni la bôme ne sont dessinés comme des
éléments à part — seules les deux surfaces de voile sont visibles.
Chaque voile porte déjà l'information à elle seule par son propre bord
(mât→bôme pour la GV, amure→écoute pour le foc, voir plus bas) : un spar
ou un point en plus n'ajoutait rien à retenir, seulement une pièce de
plus à interpréter. `Boom.tsx` (le spar physique, trait épais à bouts
arrondis) reste un composant réutilisable pour une future expérience qui
isolerait volontairement la bôme comme objet d'étude — mais ce n'est plus
le défaut du voilier de référence.

Vu de dessus, le mât est de toute façon un **point**, jamais un segment —
un mât vertical se projette en un point dans cette vue, un trait
laisserait croire à une pièce qui a sa propre longueur.

Le foc/génois suit la même grammaire que la grand-voile — un point fixe
(l'amure, à l'étai/la proue) et un point mobile (l'écoute) reliés par une
surface remplie — mais **sans point de drisse représenté** : un troisième
coin près du mât n'apporte pas d'information utile, seulement une forme
plus dure à lire. Ce qui doit rester lisible d'un coup d'œil pour les deux
voiles : l'orientation (le bord entre les deux points) indique tribord/
bâbord et bordé/choqué ; le gonflement (le côté arrondi) indique que la
voile porte plutôt qu'elle ne faseille. Les deux voiles changent d'état
(gonflée/faseille/trop bordée) ensemble et de façon cohérente quand le
bateau change de cap ou d'allure : c'est cette réaction commune au même
vent qui les fait comprendre comme deux pièces du même bateau.

## Profondeur — dessus / dessous

C'est le point le plus important pour les cordages et les nœuds, et le plus
souvent bâclé. Un simple croisement de deux traits ne dit rien sur lequel
passe devant. Utilise systématiquement la technique du "halo" (voir
`references/svg-techniques.md` pour le code) : le brin qui passe *dessous*
est coupé visuellement à l'endroit du croisement, via un trait de la
couleur du fond, plus épais, dessiné juste avant le brin du dessus. Aucun
calcul d'intersection manuel n'est nécessaire — c'est robuste sur n'importe
quelle courbe.

## Les cordages

Épaisseur généreuse (le cordage doit avoir une vraie présence, pas un trait
de contour). Deux rôles constants et jamais interchangés :
- **dormant** (partie fixe) : `ink`, légèrement plus terne/épais, se lit
  comme "structure".
- **courant** (bout qu'on manipule) : `accent`, avec une extrémité arrondie
  distincte (un petit embout) qui marque clairement où est le bout libre.

L'œil doit pouvoir suivre le cordage en continu du dormant jusqu'au bout du
courant, sans discontinuité de style en cours de route.

## Les nœuds

Chaque étape suit la même structure en trois temps :
1. **État initial** — le cordage tel qu'il est avant cette étape, statique.
2. **Mouvement** — le nouveau segment se dessine progressivement
   (`pathLength`), révélant la trajectoire du courant.
3. **Nouvelle position** — le résultat reste affiché, plein, avant l'étape
   suivante.

Les transitions dessus/dessous/autour/dans doivent être sans ambiguïté à
chaque étape — applique la technique de profondeur ci-dessus dès qu'un
brin passe près d'un autre, même brièvement. Un piège classique : faire
"bouger" un segment en le redessinant exactement là où un ancien segment
était déjà visible — le mouvement devient invisible. Vérifie toujours que
chaque étape ajoute un tracé visuellement distinct du precedent (décale
légèrement la courbe si nécessaire), sinon le principe "je vois le
mouvement" est cassé même si le code est correct.

Référence de validation : le nœud de chaise (`NoeudChaiseExperience.tsx`)
sert de cas de test pour toute nouvelle skill sur les nœuds — si un nouveau
nœud n'atteint pas sa clarté, la représentation n'est pas prête.

## Cartes, balisage, situations multi-bateaux (conventions courtes)

Ces écrans n'ont pas encore de composants dédiés, mais les mêmes principes
s'appliquent par anticipation :
- **Balisage** : la marque doit se distinguer de son environnement par sa
  forme et sa couleur réglementaire réelle (jamais une couleur arbitraire),
  et le côté "à laisser" doit se lire spatialement (la marque et la route du
  bateau doivent se croiser visuellement de façon non ambiguë), pas
  seulement par une flèche annotée.
- **Cartes** : le cap et la route sont deux tracés visuellement distincts
  dès qu'ils divergent (pointillé vs plein, par exemple) — jamais confondus
  dans un seul trait.
- **Situations multi-bateaux** : chaque bateau garde sa propre orientation
  lisible (règle du bateau ci-dessus) ; la priorité se lit en donnant un
  traitement visuel constant au bateau qui doit s'écarter (par exemple une
  variation d'opacité ou un halo d'alerte sur sa trajectoire) plutôt qu'en
  ajoutant un texte "doit s'écarter" à côté.

## Bibliothèque de composants réutilisables

Emplacement : `src/components/nautical-visuals/`. Toute nouvelle
expérience ou illustration nautique doit composer ces primitives plutôt que
redessiner un bateau/une voile/un vent en SVG brut à chaque fois — c'est ce
qui garantit que la convention reste cohérente dans le temps sans qu'il
faille relire cette skill à chaque diagramme.

- **`SailboatDiagram`** — le voilier complet et composable : coque, mât,
  bôme, grand-voile, foc, vent, tout piloté par props (cap, angle de
  bôme/côté sous le vent, état de chaque voile). **Point d'entrée par
  défaut pour toute nouvelle expérience avec un bateau** — compose les
  primitives ci-dessous plutôt que de les assembler à la main à chaque
  fois. Affiche les deux voiles par défaut (`showJib` à `false` pour les
  cas volontairement à une seule voile, voir règle ci-dessus).
- **`SailboatHull`** — coque + orientation (asymétrie proue/poupe), point
  d'ancrage pour mât et safran.
- **`WindIndicator`** — flèche de vent world-frame, longueur/angle en props.
- **`Sail`** — surface de grand-voile réactive (angle de bôme, état
  bon/trop-bordée/pas-assez-bordée en props → forme et couleur en découlent).
- **`Jib`** — surface de foc/génois réactive, même logique d'état que
  `Sail` mais géométrie propre (attaché à l'étai, devant le mât, pas de
  bôme).
- **`Boom`** — spar physique, pivote autour du point de mât.
- **`Rope`** — segment de cordage épais, `role="dormant" | "courant"`.
- **`RopeEnd`** — embout arrondi marquant un bout libre.
- **`DepthCrossing`** — enveloppe deux paths avec la technique du halo pour
  un croisement dessus/dessous propre.
- **`MovementTrail`** — arc de balayage transitoire pour une pièce qui vient
  de bouger (usage ponctuel, jamais permanent — voir taxonomie ci-dessus).
- **`NavigationMarker`** — marque de balisage (forme + couleur
  réglementaire en props).

Détails de props et exemples d'usage : `references/svg-techniques.md`.

## Cas existants dans le code

- `src/components/illustrations/BoatSide.tsx`, `WindDiagrams.tsx`,
  `PointsOfSailWheel.tsx`, `GearDiagrams.tsx`, `KnotDiagrams.tsx` — schémas
  statiques des leçons/nœuds. Corrects dans l'esprit (asymétrie de coque
  déjà présente, vent séparé du bateau) mais pré-datent cette skill : à
  faire migrer vers les composants ci-dessus progressivement, pas en
  urgence.
- `src/components/experiences/AlluresExperience.tsx` et
  `ReglageVoileExperience.tsx` — références officielles pour le voilier à
  deux voiles (`SailboatDiagram`). Regarde-les en premier pour un exemple
  vivant de chaque convention bateau/voiles/vent.
- `NoeudChaiseExperience.tsx` — un dessin statique et complet par étape
  (pas une animation de tracé), navigation Précédent/Suivant, plus
  l'exercice de vérification "À toi !". La version précédente animait le
  cordage en continu (tracé progressif + scrubbing) : jugée trop difficile
  à suivre, elle a été abandonnée au profit de cette version étape par
  étape. Le prototype `KnotPrototypeBowline.tsx`/`knotRig.ts` (cordage
  continu, contrôles Regarder/Comprendre/Faire) a été retiré du code pour
  la même raison — ne pas le recréer sans une nouvelle demande explicite.
