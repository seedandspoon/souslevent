"use client";

import { useEffect } from "react";
import { getProfil } from "@/lib/progress";

// Crée le profil par défaut au premier lancement (écriture ponctuelle,
// hors de toute liveQuery Dexie qui doit rester en lecture seule).
export function EnsureProfile() {
  useEffect(() => {
    getProfil();
  }, []);

  return null;
}
