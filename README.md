# Sous le vent — Apprendre la voile

Application web/mobile (PWA) pour apprendre la voile de manière progressive, ludique et concrète : leçons courtes, quiz variés, révisions espacées, nœuds, glossaire, et un mode « Je suis à bord » pour un accès ultra-rapide pendant une sortie en mer.

## Stack

- **Next.js 16** (App Router) + **TypeScript**, mobile-first
- **Tailwind CSS v4** pour le design system
- **Dexie (IndexedDB)** pour un stockage 100 % local, offline-first — aucune donnée utilisateur n'est envoyée à un serveur
- **PWA** installable, avec service worker pour un usage hors-ligne en mer
- Contenu pédagogique statique et versionné (`src/content`), pas de CMS en V1

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production
npm run lint    # ESLint
```

## Structure

```
src/
  app/            Écrans (App Router) : accueil, apprendre, quiz, bord, nœuds, glossaire, profil
  components/      Composants UI, illustrations SVG, quiz, leçons
  content/         Contenu pédagogique typé (niveaux, leçons, quiz, nœuds, glossaire, fiches)
  lib/             Moteur de révision espacée (SRS), stockage Dexie, logique de progression
```

## Contenu et périmètre du MVP

Le Niveau 1 (Découvrir la voile) est complet, avec un aperçu du Niveau 2. Les niveaux 3 à 7 (Manœuvrer, Naviguer, Météo, Sécurité, Règles de navigation) sont prévus dans la structure mais restent à rédiger.

Les contenus de sécurité, priorités et VHF sont volontairement simplifiés et signalés comme tels dans l'application : ils ne remplacent ni une formation encadrée, ni les textes réglementaires officiels.
