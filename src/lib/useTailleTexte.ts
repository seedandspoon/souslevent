"use client";

import { useEffect, useState } from "react";
import { CLASSES_TAILLE_TEXTE, CLASSE_PAR_TAILLE, STORAGE_KEY, type TailleTexte } from "./textScale";

function appliquerAuDocument(taille: TailleTexte) {
  const racine = document.documentElement;
  racine.classList.remove(...CLASSES_TAILLE_TEXTE);
  const classe = CLASSE_PAR_TAILLE[taille];
  if (classe) racine.classList.add(classe);
}

// Lit l'état déjà posé sur <html> par le script anti-flash de layout.tsx
// (exécuté avant l'hydratation) plutôt que de relire le localStorage :
// c'est la source de vérité réellement affichée à l'écran.
function tailleActuelleDuDocument(): TailleTexte {
  const racine = document.documentElement;
  if (racine.classList.contains("text-scale-xl")) return "tres-grande";
  if (racine.classList.contains("text-scale-lg")) return "grande";
  return "normale";
}

export function useTailleTexte() {
  const [taille, setTailleState] = useState<TailleTexte>("normale");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture d'un état externe (DOM) posé avant hydratation, non dérivable au rendu
    setTailleState(tailleActuelleDuDocument());
  }, []);

  function setTaille(nouvelle: TailleTexte) {
    setTailleState(nouvelle);
    appliquerAuDocument(nouvelle);
    try {
      localStorage.setItem(STORAGE_KEY, nouvelle);
    } catch {
      // Stockage indisponible (navigation privée, quota) : le réglage
      // reste actif pour la session en cours, simplement pas mémorisé.
    }
  }

  return { taille, setTaille };
}
