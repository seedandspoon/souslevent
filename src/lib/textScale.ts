// Pas de "use client" ici : ce module est importé à la fois par
// layout.tsx (composant serveur, pour scriptAntiFlash) et par
// useTailleTexte.ts (composant client). Garder les deux séparés évite
// l'erreur "Attempted to call a client function from the server".

export type TailleTexte = "normale" | "grande" | "tres-grande";

export const STORAGE_KEY = "sv-taille-texte";

export const CLASSES_TAILLE_TEXTE = ["text-scale-lg", "text-scale-xl"];

export const CLASSE_PAR_TAILLE: Record<TailleTexte, string | null> = {
  normale: null,
  grande: "text-scale-lg",
  "tres-grande": "text-scale-xl",
};

export function scriptAntiFlash() {
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var c=t==="tres-grande"?"text-scale-xl":t==="grande"?"text-scale-lg":null;if(c)document.documentElement.classList.add(c);}catch(e){}})();`;
}
